import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/practice.css';
import { getFeedback, getAudioFeedback } from '../../api/ai_api';
import { getSubQuestion } from '../../api/learning_content_api';

const PracticeContent = forwardRef((_, ref) => {
    const { topic, question, id } = useParams();
    const navigate = useNavigate();
    const [answerInput, setAnswerInput] = useState('');
    const [score, setScore] = useState('');

    const [Questions, setQuestions] = useState([]); //전체 질문 리스트
    const [answers, setAnswers] = useState([]); //전체 답변 리스트
    const [feedbacks, setFeedbacks] = useState([]); //전체 피드백 리스트

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [activeMicButton, setActiveMicButton] = useState(true);
    const [activeStopButton, setActiveStopButton] = useState(false);
    const [activeSendButton, setActiveSendButton] = useState(false);

    const [onRec, setOnRec] = useState(true); //녹음 기능 사용 여부

    const [stream, setStream] = useState(null);
    const [media, setMedia] = useState(null);
    const [source, setSource] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    useEffect(() => {

        setCurrentQuestionIndex(0);
        setActiveStopButton(false);
        setActiveSendButton(false);

        const fetchSubQuestion = async () => {
            try {
                const response = await getSubQuestion({ topic, id });
                if (response.status === 200) {
                    const subQuestionList = response.data.map(element => element.question);
                    const questionList = [question, ...subQuestionList];
                    setActiveMicButton(true);
                    setQuestions(questionList);
                }
            } catch (error) {
                console.error('Error fetching sub-questions:', error);
            }
        };
        fetchSubQuestion();

    }, []);

    useEffect(() => {
        if (currentQuestionIndex !== Questions.length) { //마지막 질문이 아닐 때
            if (answerInput.trim() === '') {
                setActiveSendButton(false);
            } else {
                setActiveSendButton(true);
            }
        }
        else { //마지막 질문일 때
            setActiveMicButton(false);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    }, [answerInput, currentQuestionIndex]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentQuestionIndex, ref]);

    // 마이크 버튼을 누를 때
    const startRecording = async () => {
        setOnRec(true);
        setActiveMicButton(false);
        setActiveStopButton(true);
        setActiveSendButton(false);

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
                latencyHint: 'interactive'
            });

            if (!audioCtx.audioWorklet) {
                console.error("AudioWorklet is not supported in this browser");
                return;
            }

            await audioCtx.audioWorklet.addModule(process.env.PUBLIC_URL + '/analyser-processor.js');
            const analyserNode = new AudioWorkletNode(audioCtx, 'analyser-processor');
            analyserNode.smoothingTimeConstant = 0.3;

            const compressor = audioCtx.createDynamicsCompressor();
            compressor.threshold.setValueAtTime(-50, audioCtx.currentTime);
            compressor.knee.setValueAtTime(40, audioCtx.currentTime);
            compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
            compressor.attack.setValueAtTime(0, audioCtx.currentTime);
            compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false
                }
            });
            const mediaRecorder = new MediaRecorder(stream);
            setStream(stream);
            setMedia(mediaRecorder);

            const sourceNode = audioCtx.createMediaStreamSource(stream);
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1000, audioCtx.currentTime);

            sourceNode.connect(compressor);
            compressor.connect(filter);
            filter.connect(analyserNode);
            analyserNode.connect(audioCtx.destination);

            mediaRecorder.start();

            analyserNode.port.onmessage = (event) => {
                if (event.data === 'check') {
                    setOnRec(true);
                }
            };

        } catch (error) {
            console.error('Error accessing microphone:', error);
            setActiveMicButton(true);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    };

    // 녹음 중지 버튼을 누를 때
    const stopRecording = async () => {
        if (!media || !stream) return;

        media.ondataavailable = function (e) {
            const audioData = e.data;
            setAudioUrl(URL.createObjectURL(audioData));
        };

        media.stop();
        stream.getAudioTracks().forEach(track => track.stop());

        if (analyser && source) {
            analyser.disconnect();
            source.disconnect();
        }

        setActiveMicButton(false);
        setActiveStopButton(false);
        setActiveSendButton(true);
    };

    // 전송 버튼을 누를 때
    const handleFeedback = async () => {

        if (onRec === true) {
            if (audioUrl) {
                try {
                    const response = await fetch(audioUrl);
                    const blob = await response.blob();
                    const sound = new File([blob], "soundBlob.wav", { lastModified: new Date().getTime(), type: "audio/wav" });

                    const question = Questions[currentQuestionIndex];
                    const formData = new FormData();
                    formData.append('audio', sound);

                    const audioResponse = await getAudioFeedback(formData);
                    if (audioResponse.status === 200) {
                        const data = await audioResponse.json();
                        console.log(data);
                    } else {
                        console.log("Error:", audioResponse.status);
                    }
                } catch (error) {
                    console.error('Error submitting audio file:', error);
                }
            }
            setOnRec(false);
        }
        
        const currentQuestion = Questions[currentQuestionIndex];
        const gptTitle = "주제: " + topic + "\n";
        const gptQuestion = "친구: " + currentQuestion + "\n";
        const gptUserAnswer = "사용자: " + answerInput;
        console.log(gptTitle, gptQuestion, gptUserAnswer);

        const response = await getFeedback({ gptTitle, gptQuestion, gptUserAnswer });
        if (response.status === 200) {
            console.log(response.data);
            setFeedbacks([...feedbacks, { feedback: response.data, score: score }]);
            setAnswers([...answers, answerInput]);
            setScore('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setActiveMicButton(true);
            setActiveStopButton(false);
        } else {
            alert("error");
        }
        setAnswerInput('');
    };

    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" onClick={() => navigate(-1)} />
                <h4>주제: {topic}</h4>
            </div>

            <div className="practice-chat">
                {
                    Questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                        <React.Fragment key={index}>
                            <AIChat question={question} />
                            {index < answers.length && (
                                <div className="practice-chat-answer">
                                    <UserChat index={index} answers={answers} />
                                    <AIFeedback index={index} feedbacks={feedbacks} />
                                    {
                                        score.trim() !== '' && <ScoreBox index={index} feedbacks={feedbacks} />
                                    }
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
                        <h4 onClick={() => navigate(`/mypage/feedback`)}>❗마이페이지 피드백 모아보기❗</h4>
                    </div>
                }
                <div ref={ref} />
            </div>

            <div className="practice-input">
                <input
                    value={answerInput}
                    onChange={(event) => setAnswerInput(event.target.value)}
                    onKeyUp={(event) => {
                        if (answerInput.trim() !== '') {
                            if (event.key === 'Enter') {
                                handleFeedback();
                            }

                        }
                    }}
                />
                <div className="practice-input-send">
                    <button onClick={activeMicButton ? startRecording : undefined}>
                        <img
                            style={activeMicButton ? {} : { opacity: '0.3' }}
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="mic"
                        />
                    </button>
                    <button onClick={activeStopButton ? stopRecording : undefined}>
                        <img
                            style={activeStopButton ? {} : { opacity: '0.3' }}
                            src={process.env.PUBLIC_URL + '/img/stop.png'}
                            alt="stop"
                        />
                    </button>
                    <button onClick={activeSendButton ? handleFeedback : undefined}>
                        <img
                            style={activeSendButton ? {} : { opacity: '0.3' }}
                            src={process.env.PUBLIC_URL + '/img/send.png'}
                            alt="send"
                        />
                    </button>
                </div>
            </div>

            {audioUrl && (
                <div className="practice-audio">
                    <audio controls src={audioUrl}></audio>
                </div>
            )}
        </div>
    );
});

export function AIChat({ question }) {
    return (
        <div className="ai-chat">
            <div className="ai-chat-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
                <p />
            </div>
            <div className="ai-chat-dialogue">
                <h4>{question}?</h4>
            </div>
        </div>
    );
}

export function UserChat({ index, answers }) {
    return (
        <div className="answer-box">
            <p>{answers[index]}</p>
        </div>
    );
}

export function AIFeedback({ index, feedbacks }) {
    return (
        <div className="feedback-box">
            <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
            <p>{feedbacks[index].feedback}</p>
        </div>
    );
}

export function ScoreBox({ index, feedbacks }) {
    return (
        <div className="score-box">
            <p>{feedbacks[index].score}</p>
        </div>
    );
}

export default function Practice() {
    const messageEndRef = useRef(null);

    return (
        <PracticeContent ref={messageEndRef} />
    );
}