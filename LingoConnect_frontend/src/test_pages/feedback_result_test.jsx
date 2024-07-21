import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/feedback_result.css';
import { test_subquestions, test_feedback } from './data_test';
import { SmallTitle } from '../components/title';
import { AIChat, UserChat, AIFeedback, ScoreBox } from './practice_test';

export default function FeedbackResultTest() {
    const [answers, setAnswers] = useState(['수학이 제일 좋아']);
    const { topic, question } = useParams();
    const navigate = useNavigate();

    
    return (
        <div className="feedbackresult-container">
            <img
                className="feedbackresult-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage/feedback')}/>
            <div className="feedbackresult-navbar">
                <SmallTitle />
            </div>
            <div className="feedbackresult-main">
                <h4>피드백 모아보기</h4>
                <p>{topic}</p>
                <h4>Q. {question}?</h4>
            </div>

            {/* <div className="feedbackresult-index">
                여러 개의 대화를 페이지네이션으로 ?
            </div> */}

            <div className="feedbackresult-box">
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} test_feedback={test_feedback} />
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} test_feedback={test_feedback} />
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} test_feedback={test_feedback} />
            </div>

            <div className="result-box-gradient">
                <p></p>
            </div>
            <div className="result-box-under">
                <p></p>
            </div>
        </div>
    )
}