import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback, getAudioFeedback } from '../api/ai_api';
import { getSubQuestion } from '../api/learning_content_api';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

export default function Practice() {
    const { topic, question } = useParams();
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
    const navigate = useNavigate();
    const [recorder, setRecorder] = useState(null);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setActiveMicButton(true);
        setActiveStopButton(false);
        setActiveSendButton(false);
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

        if (currentQuestionIndex === Questions.length) {
            setActiveMicButton(false);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    }, [answerInput, currentQuestionIndex, Questions.length]);

    const startRecording = async () => {
        setIsRecording(true);
        setActiveMicButton(false);
        setActiveStopButton(true);
        setActiveSendButton(false);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioRecorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/wav',
            recorderType: StereoAudioRecorder,
            desiredSampRate: 16000
        });
        audioRecorder.startRecording();
        setRecorder(audioRecorder);
    };

    const stopRecording = async () => {
        if (recorder) {
            recorder.stopRecording(async () => {
                const audioBlob = recorder.getBlob();
                const arrayBuffer = await audioBlob.arrayBuffer();
                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                const wav = toWav(audioBuffer);
                const wavFile = new File([wav], 'sound.wav', { type: 'audio/wav' });

                onSubmitAudioFile(wavFile);

                setIsRecording(false);
                setActiveMicButton(false);
                setActiveStopButton(false);
                setActiveSendButton(true);
            });
        }
    };

    const onSubmitAudioFile = useCallback(async (audioFile) => {
        if (audioFile) {
            const formdata = new FormData();
            formdata.append('sound', audioFile);

            console.log('FormData object created.');
            console.log('FormData contains: ', formdata.get('sound'));

            // 오디오 파일 서버에 전송
            // try {
            //     const question = Questions[currentQuestionIndex];
            //     const formData = formdata.get('sound');
            //     const response = await getAudioFeedback({topic, question, formData})
            //     if (response.status === 200) {
            //         const data = await response.json();
            //          console.log(data);
            //         setScoreData(data);
            //     } else {
            //         console.log("error");
            //     }
            // } catch (error) {
            //     console.error('Error:', error);
            // }

        } else {
            console.log('no audio');
        }
    }, []);


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
                                        <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
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
                        <p >준비된 질문은 여기까지에요.</p>
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

// Utility function to convert AudioBuffer to WAV format
function toWav(audioBuffer) {
    const numOfChan = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];

    let offset = 0;
    let pos = 0;

    function writeString(str) {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(pos + i, str.charCodeAt(i));
        }
    }

    writeString('RIFF');
    view.setUint32(pos + 4, length - 8, true);
    writeString('WAVE');
    writeString('fmt ');
    view.setUint32(pos + 16, 16, true);
    view.setUint16(pos + 20, 1, true);
    view.setUint16(pos + 22, numOfChan, true);
    view.setUint32(pos + 24, sampleRate, true);
    view.setUint32(pos + 28, sampleRate * 2 * numOfChan, true);
    view.setUint16(pos + 32, numOfChan * 2, true);
    view.setUint16(pos + 34, 16, true);
    writeString('data');
    view.setUint32(pos + 40, length - pos - 44, true);

    for (let i = 0; i < numOfChan; i++) {
        channels.push(audioBuffer.getChannelData(i));
    }

    while (pos < length) {
        for (let i = 0; i < numOfChan; i++) {
            const sample = Math.max(-1, Math.min(1, channels[i][pos / (numOfChan * 2)]));
            view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            pos += 2;
        }
    }

    return buffer;
}
