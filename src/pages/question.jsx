import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import learningContent from '../data/learningContent';
import '../styles/question.css';
import { SmallTitle } from '../components/title';

export default function Question() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const topicData = learningContent.find(t => t.topic === decodeURIComponent(topic));

    const handleQuestionClick = (question) => {
        const encodedQuestion = encodeURIComponent(question);
        navigate(`/practice/${topic}/${encodedQuestion}`);
    }

    return (
        <div className="question-container">
            <div className="question-navbar">
                <SmallTitle />
            </div>

            <div className="question-box">
                <div className="question-box-title">
                    <div className="question-box-title-row1">
                        <h4>{topic}</h4>
                    </div>
                    <div className="question-box-title-row2">
                        <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
                        <h4>연습할 질문을 선택하세요!</h4>
                    </div>
                </div>

                {
                    topicData.questions.map(function (question, index) {
                        return (
                            <div
                                className="question-box-list-q"
                                onClick={() => handleQuestionClick(question)}
                            >
                                <div className="q-question">
                                    <h4>{index + 1}.&nbsp;</h4>
                                    <h5>{question}</h5>
                                </div>
                                {(index <= 3) && <p>초급</p>}
                                {(index > 3) && (index <= 6) && <p>중급</p>}
                                {(index > 6) && <p>고급</p>}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}