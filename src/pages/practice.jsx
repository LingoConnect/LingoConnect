import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback, getAudioFeedback } from '../api/chat_api';
import { getSubQuestion } from '../api/learning_content_api';

export default function Practice() {
    const { topic, question } = useParams();
    const [answerInput, setAnswerInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [Questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [audioFeedback, setAudioFeedback] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [activeMicButton, setActiveMicButton] = useState(true);
    const [activeStopButton, setActiveStopButton] = useState(false);
    const [activeSendButton, setActiveSendButton] = useState(false);
    const audioContextRef = useRef(null);
    const processorRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        setCurrentQuestionIndex(0);
    }, []);

    useEffect(() => {
        const fetchSubQuestion = async () => {
            const response = await getSubQuestion({ topic });
            if (response.status === 200) {
                const subQuestionList = response.data.map(element => element.question);
                const questionList = [question, ...subQuestionList];
                setQuestions(questionList);
            }
        };
        fetchSubQuestion();
    }, [topic, question]);

    useEffect(() => {
        if (answerInput.trim() === '') {
            setActiveSendButton(false);
        } else {
            setActiveSendButton(true);
        }

        if (currentQuestionIndex + 1 === Questions.length) {
            setActiveMicButton(false);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    }, [answerInput, currentQuestionIndex, Questions.length]);

    const startRecording = async () => {
        try {
            setIsRecording(true);
            setActiveMicButton(false);
            setActiveStopButton(true);
            setActiveSendButton(false);
    
            // 오디오 컨텍스트 생성 및 설정
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            await audioContextRef.current.audioWorklet.addModule(process.env.PUBLIC_URL + '/audio-processor.js');
            const processorNode = new AudioWorkletNode(audioContextRef.current, 'audio-processor');
            processorRef.current = processorNode;
    
            // 사용자 미디어 가져오기
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(processorNode);
    
            processorNode.port.onmessage = (event) => {
                console.log('Received message from AudioWorkletProcessor:', event.data); // 디버깅용 로그
                if (Array.isArray(event.data)) {
                    audioChunksRef.current = new Int16Array(event.data);
                    console.log('1 Audio chunks:', audioChunksRef.current);
                }
            };
    
        } catch (error) {
            console.error('Error starting recording:', error);
            setIsRecording(false);
            setActiveMicButton(true);
            setActiveStopButton(false);
        }
    };
    
    const stopRecording = async () => {
        setIsRecording(false);
        setActiveMicButton(true);
        setActiveStopButton(false);
    
        if (processorRef.current) {
            processorRef.current.port.postMessage('flush');
    
            // flush 메시지가 처리될 때까지 대기
            const waitForFlush = new Promise((resolve) => {
                processorRef.current.port.onmessage = (event) => {
                    if (Array.isArray(event.data)) {
                        audioChunksRef.current = new Int16Array(event.data);
                        console.log('1 Audio chunks:', audioChunksRef.current);
                        resolve();
                    }
                };
            });
    
            await waitForFlush;
    
            processorRef.current.disconnect();
            audioContextRef.current.close();
        }
    
        console.log('2 Audio chunks:', audioChunksRef.current); // 디버깅용 로그
    
        // 오디오 청크 사용
        const int16Array = new Int16Array(audioChunksRef.current);
        console.log('Converted Int16Array:', Array.from(int16Array));
    
        // const requestData = {
        //     audioData: Array.from(int16Array)
        // };
    
        // const response = await getAudioFeedback(requestData);
        // if (response.status === 200) {
        //     console.log(response.data);
        //     setAudioText(response.data.text);
        //     setAudioFeedback(response.data.score);
        // } else {
        //     alert("error");
        // }
    };
    
    // 전송 버튼 누를 때 실행
    const handleFeedback = async () => {
        if (answerInput.trim() !== '') {
            const currentQuestion = Questions[currentQuestionIndex];
            const gptTitle = "주제: " + topic + "\n";
            const gptQuestion = "친구: " + currentQuestion + "\n";
            const gptUserAnswer = "사용자: " + answerInput;
            console.log(gptTitle, gptQuestion, gptUserAnswer);

            const response = await getFeedback({ gptTitle, gptQuestion, gptUserAnswer });
            if (response.status === 200) {
                console.log(response.data);
                setFeedbacks([...feedbacks, { feedback: response.data, score: audioFeedback }]);
                setAnswers([...answers, answerInput]);
                setAnswerInput('');
                setFeedback('');
                setAudioFeedback('');
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setActiveMicButton(true);
                setActiveStopButton(false);
            } else {
                alert("error");
            }
        }
    };

    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
                <h4>주제: {topic}</h4>
            </div>

            <div className="practice-chat">
                {
                    Questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                        <React.Fragment key={index}>
                            <AIChat question={question} />
                            {index < answers.length && (
                                <>
                                    <p className="answer-box">{answers[index]}</p>
                                    <p className="feedback-box">{feedbacks[index].feedback}<br></br>{feedbacks[index].score}</p>
                                </>
                            )}
                        </React.Fragment>
                    ))
                }
                {
                    currentQuestionIndex + 1 === Questions.length && <p>준비된 질문은 여기까지에요. 마이페이지에서 저장된 피드백들을 반복적으로 학습해보아요!</p>
                }
            </div>

            <div className="practice-input">
                <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
                <div className="practice-input-send">
                    <button onClick={activeMicButton ? startRecording : undefined} disabled={isRecording}>
                        <img
                            style={activeMicButton ? {} : { opacity: '0.5' }}
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="mic"
                        />
                    </button>
                    <button onClick={activeStopButton ? stopRecording : undefined} disabled={!isRecording}>
                        <img
                            style={activeStopButton ? {} : { opacity: '0.5' }}
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="stop"
                        />
                    </button>
                    <button onClick={activeSendButton ? handleFeedback : undefined}>
                        <img
                            style={activeSendButton ? {} : { opacity: '0.5' }}
                            src={process.env.PUBLIC_URL + '/img/send.png'}
                            alt="send"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

function AIChat({ question }) {
    return (
        <div className="ai-chat">
            <div className="ai-chat-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
                <p />
            </div>
            <div className="ai-chat-dialogue">
                <h4>{question}</h4>
            </div>
        </div>
    );
}
