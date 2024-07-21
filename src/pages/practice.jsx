import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback, getAudioFeedback } from '../api/ai_api';
import { getSubQuestion } from '../api/learning_content_api';

export default function Practice() {
    const { topic, question, id } = useParams();
    const navigate = useNavigate();
    const [answerInput, setAnswerInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [Questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [activeMicButton, setActiveMicButton] = useState(true);
    const [activeStopButton, setActiveStopButton] = useState(false);
    const [activeSendButton, setActiveSendButton] = useState(false);
    const [stream, setStream] = useState(null);
    const [media, setMedia] = useState(null);
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setActiveMicButton(true);
        setActiveStopButton(false);
        setActiveSendButton(false);
    }, []);

    useEffect(() => {
        const fetchSubQuestion = async () => {
            const response = await getSubQuestion({ topic, id });
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
    }, [answerInput, currentQuestionIndex, Questions.length]);

    const startRecording = async () => {
        setIsRecording(true);
        setActiveMicButton(false);
        setActiveStopButton(true);
        setActiveSendButton(false);

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            if (!audioCtx.audioWorklet) {
                console.error("AudioWorklet is not supported in this browser");
                return;
            }

            await audioCtx.audioWorklet.addModule(process.env.PUBLIC_URL + '/analyser-processor.js');
            const analyser = new AudioWorkletNode(audioCtx, 'analyser-processor');
            setAnalyser(analyser);

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            setStream(stream);
            setMedia(mediaRecorder);

            const source = audioCtx.createMediaStreamSource(stream);
            setSource(source);

            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            mediaRecorder.start();

            analyser.port.onmessage = (event) => {
                if (event.data === 'check') {
                    setOnRec(false);
                }
            };

        } catch (error) {
            console.error('Error accessing microphone:', error);
            setIsRecording(false);
            setActiveMicButton(true);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    };

    const stopRecording = async () => {
        if (!media || !stream) return;

        media.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
        };

        media.stop();
        stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        if (analyser && source) {
            analyser.disconnect();
            source.disconnect();
        }

        onSubmitAudioFile();

        setIsRecording(false);
        setActiveMicButton(false);
        setActiveStopButton(false);
        setActiveSendButton(true);
    };

    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
            console.log(URL.createObjectURL(audioUrl));

            // 오디오 파일 서버에 전송하는 로직 추가
            // try {
            //     const question = Questions[currentQuestionIndex];
            //     const formData = new FormData();
            //     formData.append('sound', sound);
            //     const response = await getAudioFeedback({topic, question, formData});
            //     if (response.status === 200) {
            //         const data = await response.json();
            //         console.log(data);
            //         setScoreData(data);
            //     } else {
            //         console.log("error");
            //     }
            // } catch (error) {
            //     console.error('Error:', error);
            // }
        }
        // File 생성자를 사용해 파일로 변환
        const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
        console.log(sound); // File 정보 출력
    }, [audioUrl]);

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
                setFeedbacks([...feedbacks, { feedback: response.data }]);
                setAnswers([...answers, answerInput]);
                setAnswerInput('');
                setFeedback('');
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
                                <div className="practice-chat-answer">
                                    <p className="answer-box">{answers[index]}</p>
                                    <div className="feedback-box">
                                        <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
                                        <p>{feedbacks[index].feedback}</p>
                                    </div>
                                    <div className="score-box">
                                        {/* <p>{feedbacks[index].score}</p> */}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))
                }
                {
                    currentQuestionIndex === Questions.length &&
                    <div className="practice-finish">
                        <p>준비된 질문은 여기까지에요.</p>
                        <p><span onClick={() => navigate("/main")}>마이페이지</span>에서 저장된 피드백들을 반복적으로 학습해보아요!</p>
                        <h4 onClick={() => navigate(`/main/${topic}/${question}/result`)}>❗피드백 보기❗</h4>
                    </div>
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
                            src={process.env.PUBLIC_URL + '/img/stop.png'}
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