import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/practice.css';
import { test_subquestions, test_feedback } from './data_test';
import { getSubQuestion } from '../api/learning_content_api';

export default function PracticeTest() {
    const { topic, question } = useParams();
    const test_questions = [question, ...test_subquestions]
    const [answerInput, setAnswerInput] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [activeMicButton, setActiveMicButton] = useState(true);
    const [activeStopButton, setActiveStopButton] = useState(false);
    const [activeSendButton, setActiveSendButton] = useState(false);

    useEffect(() => {

        if (answerInput.trim() === '') {
            setActiveSendButton(false);
        } else {
            setActiveSendButton(true);
        }

        if (currentQuestionIndex + 1 === test_questions.length ) {
            setActiveMicButton(false);
            setActiveStopButton(false);
            setActiveSendButton(false);
        }

    }, [answerInput, topic, question, currentQuestionIndex]);

    const handleFeedback = async () => {
        if (answerInput.trim() !== '') {
            setAnswers([...answers, answerInput]);
            setAnswerInput('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setActiveMicButton(true);
            setActiveStopButton(false);
        }
    }

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
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
                <h4>주제: {topic}</h4>
            </div>

            <div className="practice-chat">
                {test_questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                    <React.Fragment key={index}>
                        <AIChat question={question} />
                        {index < answers.length && (
                            <>
                                <p className="answer-box">{answers[index]}</p>
                                <p className="feedback-box">{test_feedback[index].feedback}<br></br>{test_feedback[index].score}</p>
                            </>
                        )}
                    </React.Fragment>
                ))}
                {
                    currentQuestionIndex + 1 === test_questions.length && <p>준비된 질문은 여기까지에요. 마이페이지에서 저장된 피드백들을 반복적으로 학습해보아요!</p>
                }
            </div>

            <div className="practice-input">
                <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
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
