import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/practice.css';
import { test_subquestions, test_feedback } from './data_test';

const App = forwardRef((props, ref) => {
    const { topic, question } = useParams();
    const test_questions = [question, ...test_subquestions];
    const [answerInput, setAnswerInput] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [activeMicButton, setActiveMicButton] = useState(true);
    const [activeStopButton, setActiveStopButton] = useState(false);
    const [activeSendButton, setActiveSendButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setActiveMicButton(true);
        setActiveStopButton(false);
        setActiveSendButton(false);
    }, []);

    useEffect(() => {
        if (answerInput.trim() === '') {
            setActiveSendButton(false);
        } else {
            setActiveSendButton(true);
        }

        if (currentQuestionIndex === test_questions.length) {
            setActiveMicButton(false);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }
    }, [answerInput, topic, question, currentQuestionIndex]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentQuestionIndex, ref]);

    const handleFeedback = async () => {
        if (answerInput.trim() !== '') {
            setAnswers([...answers, answerInput]);
            setAnswerInput('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setActiveMicButton(true);
            setActiveStopButton(false);
        }
    };

    const startRecording = () => {
        setActiveMicButton(false);
        setActiveStopButton(true);
        setActiveSendButton(false);
        setAnswerInput("사용자가 뭔가를 말함");
    };

    const stopRecording = async () => {
        setActiveMicButton(false);
        setActiveStopButton(false);
    };

    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <img
                    src={process.env.PUBLIC_URL + '/img/arrow.png'}
                    onClick={() => navigate(`/main/${topic}`)}
                    alt="arrow"
                />
                <h4>주제: {topic}</h4>
            </div>

            <div className="practice-chat">
                {test_questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                    <React.Fragment key={index}>
                        <AIChat question={question} />
                        {index < answers.length && (
                            <div className="practice-chat-answer">
                                <UserChat index={index} answers={answers} />
                                <AIFeedback index={index} test_feedback={test_feedback} />
                                <ScoreBox index={index} test_feedback={test_feedback} />
                            </div>
                        )}
                    </React.Fragment>
                ))}
                {currentQuestionIndex === test_questions.length && (
                    <div className="practice-finish">
                        <p>준비된 질문은 여기까지에요.</p>
                        <p>
                            <span onClick={() => navigate("/main")}>마이페이지</span>
                            에서 저장된 피드백들을 반복적으로 학습해보아요!
                        </p>
                        <h4 onClick={() => navigate(`/main/${topic}/${question}/result`)}>❗피드백 보기❗</h4>
                    </div>
                )}
                <div ref={ref} />
            </div>

            <div className="practice-input">
                <input
                    value={answerInput}
                    onChange={(event) => setAnswerInput(event.target.value)}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            handleFeedback();
                        }
                    }}
                />
                <div className="practice-input-send">
                    <button onClick={activeMicButton ? startRecording : undefined}>
                        <img
                            style={activeMicButton ? {} : { opacity: '0.5' }}
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="mic"
                        />
                    </button>
                    <button onClick={activeStopButton ? stopRecording : undefined}>
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

export function AIFeedback({ index, test_feedback }) {
    return (
        <div className="feedback-box">
            <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
            <p>{test_feedback[index].feedback}</p>
        </div>
    );
}

export function ScoreBox({ index, test_feedback }) {
    return (
        <div className="score-box">
            <p>{test_feedback[index].score}</p>
        </div>
    );
}

export default function PracticeTest() {
    const messageEndRef = useRef(null);

    return (
        <App ref={messageEndRef} test_subquestions={test_subquestions} test_feedback={test_feedback} />
    );
}
