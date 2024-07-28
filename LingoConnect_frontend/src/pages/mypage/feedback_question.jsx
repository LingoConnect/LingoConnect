import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/feedback_question.css';
import { SmallTitle } from '../../components/title';
import { getMainQuestion } from '../../api/learning_content_api';

export default function FeedbackQuestion() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [isLatest, setIsLatest] = useState(true);
    const [mainQuestions, setMainQuestions] = useState([]);

    const handleQuestionClick = (element) => {
        const question = element.question;
        const id = element.mainQuestionId;
        navigate(`/mypage/feedback/${topic}/${id}/${question}`);
    }

    useEffect(() => {
        const fetchMainQuestion = async () => {
            const response = await getMainQuestion({ topic });
            if (response.status === 200) {
                setMainQuestions(response.data);
            }
        };
        fetchMainQuestion();
    }, [topic]);

    return (
        <div className="feedbackquestion-container">
            <img
                className="feedbackquestion-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={() => navigate('/mypage/feedback')} />
            <div className="feedbackquestion-navbar">
                <SmallTitle />
            </div>
            <div className="feedbackquestion-main">
                <h4>피드백 모아보기</h4>
                <p>{topic}</p>
            </div>
            <div className="feedbackquestion-order">
                {isLatest == true ?
                    <p onClick={() => setIsLatest(false)}>최신순 ∨</p> : <p onClick={() => setIsLatest(true)}>오래된 순 ∨</p>
                }
            </div>

            <div className="feedbackquestion-list">
                {
                    mainQuestions.map((element, index) => {
                        return (
                            <div
                                className="feedbackquestion-list-q"
                                onClick={() => handleQuestionClick(element)}>
                                <div className="fq-question">
                                    <h4>{index + 1}.&nbsp;</h4>
                                    <h5>{element.question}</h5>
                                </div>
                                <p>{element.difficulty}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}