import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { test_mainquestions } from '../data/learningContent';
import '../styles/question.css';
import { SmallTitle } from '../components/title';
import { getMainQuestion } from '../api/learning_content_api';

export default function Question() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [mainQuestions, setMainQuestions] = useState([]);

    const handleQuestionClick = (question) => {
        navigate(`/main/${topic}/${question}`);
    }

    useEffect(() => {
        const fetchMainQuestion = async () => {
            const response = await getMainQuestion({ topic });
            if (response.status === 200) {
                console.log(response.data);
                setMainQuestions(response.data.question);
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
                    //테스트 코드(mainQuestions로 수정)
                    mainQuestions.map((element, index) => {
                        return (
                            <div
                                className="question-box-list-q"
                                onClick={() => handleQuestionClick(element)}>
                                <div className="q-question">
                                    <h4>{index + 1}.&nbsp;</h4>
                                    <h5>{element}</h5>
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