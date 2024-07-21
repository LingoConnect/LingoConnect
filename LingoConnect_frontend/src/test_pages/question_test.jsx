import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { test_mainquestions } from './data_test';
import '../styles/question.css';
import { SmallTitle } from '../components/title';
import { getMainQuestion } from '../api/learning_content_api';

export default function QuestionTest() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [mainQuestions, setMainQuestions] = useState([]);

    const handleQuestionClick = (question) => {
        const id = 1;
        navigate(`/main/${topic}/${question}`);
    }

    useEffect(() => {
        const fetchMainQuestion = async () => {
            const response = await getMainQuestion({ topic });
            if (response.status === 200) {
                console.log(response.data);
                setMainQuestions([response.data.question]);
            }
        };
        fetchMainQuestion();
    }, []);

    return (
        <div className="question-container">
            <div className="question-navbar">
                <SmallTitle />
            </div>

            <div className="question-back" onClick={() => navigate('/main')}>
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} />
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
                    test_mainquestions.map((element, index) => {
                        return (
                            <div
                                className="question-box-list-q"
                                onClick={() => handleQuestionClick(element)}>
                                <div className="q-question">
                                    <h4>{index + 1}.&nbsp;</h4>
                                    <h5>{element}</h5>
                                </div>
                                <p>초급</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}