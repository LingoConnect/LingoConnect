import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback } from '../api/chat_api';
import { test_subquestions, test_feedback } from '../data/learningContent';
import { getSubQuestion } from '../api/learning_content_api';

export default function Practice() {
    const { topic, question } = useParams();
    const [answerInput, setAnswerInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [Questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const handleFeedback = async () => {
        if (answerInput.trim() !== '') {
            const currentQuestion = test_subquestions[currentQuestionIndex];
            const gptTitle = "주제: " + topic + "\n";
            const gptQuestion = "친구: " + currentQuestion + "\n";
            const gptUserAnswer = "사용자: " + answerInput;
            console.log(gptTitle, gptQuestion, gptUserAnswer);

            // const response = await getFeedback({ gptTitle, gptQuestion, gptUserAnswer });
            // if (response.status === 200) {
            //     console.log(response.data);
            //     setFeedbacks([...feedbacks, response.data]);
            //     setAnswers([...answers, answerInput]);
            //     setAnswerInput('');
            //     setFeedback('');
            //     setCurrentQuestionIndex(currentQuestionIndex + 1);
            // } else {
            //     alert("error");
            // }
            
            // 테스트 코드(삭제할 예정)
            setFeedbacks(test_feedback);
            setAnswers([...answers, answerInput]);
            setAnswerInput('');
            setFeedback('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);

        }
    }

    useEffect(() => {
        const fetchSubQuestion = async () => {
            const response = await getSubQuestion({ topic });
            if (response.status === 200) {
                console.log(response.data);
                const questionList = [question, ...response.data]
                setQuestions(questionList);
            }
        };
        fetchSubQuestion();
    }, [topic, question]);

    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
                <h4>주제: {topic}</h4>
            </div>

            <div className="practice-chat">
                {test_subquestions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                    <React.Fragment key={index}>
                        <AIChat question={question} />
                        {index < answers.length && (
                            <>
                                <p className="answer-box">{answers[index]}</p>
                                <p className="feedback-box">{feedbacks[index]}</p>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className="practice-input">
                <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
                <div className="practice-input-send">
                    <button>
                        <img src={process.env.PUBLIC_URL + '/img/mic.png'} alt="mic" />
                    </button>
                    <button onClick={handleFeedback}>
                        <img src={process.env.PUBLIC_URL + '/img/send.png'} alt="send" />
                    </button>
                </div>
            </div>
        </div>
    )
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
