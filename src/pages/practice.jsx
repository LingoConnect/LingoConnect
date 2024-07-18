import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback, getAudioFeedback } from '../api/chat_api';
import { getSubQuestion } from '../api/learning_content_api';

export default function Practice() {
    const { topic, question } = useParams();
    const [answerInput, setAnswerInput] = useState('');
    const [audioText, setAudioText] = useState('');
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
    const audioChunksRef = useRef([]);
    const audioContextRef = useRef(null);
    const processorRef = useRef(null);

    useEffect(() => {
        setCurrentQuestionIndex(0)
    }, [])

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

        const fetchSubQuestion = async () => {
            const response = await getSubQuestion({ topic });
            if (response.status === 200) {
                const subQuestionList = response.data.map(element => element.question);
                const questionList = [question, ...subQuestionList];
                setQuestions(questionList);
            }
        };
        fetchSubQuestion();
    }, [answerInput, topic, question, currentQuestionIndex]);

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
    }

    const startRecording = () => {
        setIsRecording(true);
        setActiveMicButton(false);
        setActiveStopButton(true);
        setActiveSendButton(false);
        // navigator.mediaDevices.getUserMedia({ audio: true })
        //     .then(stream => {
        //         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        //         const input = audioContextRef.current.createMediaStreamSource(stream);
        //         processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

        //         processorRef.current.onaudioprocess = e => {
        //             const inputData = e.inputBuffer.getChannelData(0);
        //             const buffer = new ArrayBuffer(inputData.length * 2);
        //             const outputData = new DataView(buffer);

        //             for (let i = 0; i < inputData.length; i++) {
        //                 let s = Math.max(-1, Math.min(1, inputData[i]));
        //                 outputData.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        //             }

        //             audioChunksRef.current.push(new Int16Array(buffer));
        //         };

        //         input.connect(processorRef.current);
        //         processorRef.current.connect(audioContextRef.current.destination);

        //         setTimeout(() => {
        //             processorRef.current.disconnect();
        //             input.disconnect();
        //             setIsRecording(false);
        //         }, 5000);
        //     });
    };

    const stopRecording = async () => {

        setActiveMicButton(false);
        setActiveStopButton(false);

        // const audioData = audioChunksRef.current.reduce((acc, chunk) => {
        //     acc.push(...chunk);
        //     return acc;
        // }, []);

        // const int16Array = new Int16Array(audioData);

        // const requestData = {
        //     short: 0,
        //     char: "string",
        //     int: 0,
        //     long: 0,
        //     float: 0,
        //     double: 0,
        //     direct: true,
        //     readOnly: true,
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
                    <button onClick={activeStopButton ? stopRecording : undefined} disabled={!audioChunksRef.current.length}>
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
    )
}
