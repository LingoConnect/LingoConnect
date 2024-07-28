import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/result.css';

export default function Result() {
    const navigate = useNavigate();
    const { topic, question } = useParams();
    
    return (
        <div className="result-container">
            <div className="result-navbar">
                <h4>주제: {topic}</h4>
                <h4>{question}?</h4>
            </div>

            <div className="result-done">
                <h4>학습 완료!</h4>
            </div>

            <div className="result-feedback">
                <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
                <h4>피드백 결과</h4>
            </div>

            <div className="result-score">
                <h4>발음 평가 점수</h4>
            </div>

            <div 
                className="result-close"
                onClick={()=>navigate(`/main/${topic}`)}>
                <h4>닫기</h4>
            </div>
        </div>

    )
}