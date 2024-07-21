import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { test_mainquestions } from '../test_pages/data_test';
import '../styles/feedback_question.css';
import { SmallTitle } from '../components/title';


export default function FeedbackQuestion() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [isLatest, setIsLatest] = useState(true);

    const handleQuestionClick = (question) => {
        navigate (`/mypage/feedback/${topic}/${question}`)
    }

    return(
        <div className="feedbackquestion-container">
            <img
                className="feedbackquestion-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage/feedback')}/>
            <div className="feedbackquestion-navbar">
                <SmallTitle />
            </div>
            <div className="feedbackquestion-main">
                <h4>피드백 모아보기</h4>
                <p>{topic}</p>
            </div>
            <div className="feedbackquestion-order">
                {isLatest == true ?
                    <p onClick={()=>setIsLatest(false)}>최신순 ∨</p> : <p onClick={()=>setIsLatest(true)}>오래된 순 ∨</p>
                }
            </div>

            <div className="feedbackquestion-list">
                {
                    test_mainquestions.map((element, index) => {
                        return (
                            <div 
                                className="feedbackquestion-list-q"
                                onClick={()=> handleQuestionClick(element)}>
                                <div className="fq-question">
                                    <h4>{index+1}.&nbsp;</h4>
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