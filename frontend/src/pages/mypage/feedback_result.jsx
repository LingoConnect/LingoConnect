import React, {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/feedback_result.css';
import { AIChat, UserChat, AIFeedback } from '../practice/practice';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function FeedbackResult() {
    const [answers, setAnswers] = useState(['수학이 제일 좋아']);
    const [feedbacks, setFeedbacks] = useState(['잘했어요!']);
    const [index, setIndex] = useState(1);
    const { topic, question } = useParams();
    const navigate = useNavigate();

    
    return (
        <div className="feedbackresult-container">
            <div 
                className="feedbackresult-back"
                onClick={() => navigate(-1)}
            >
                <FaArrowLeftLong size={30} color='#746745' />
            </div>
            <div className="feedbackresult-main">
                <h4>피드백 모아보기</h4>
                <p>{topic}</p>
                <h4>Q. {question}?</h4>
            </div>

            <div className="feedbackresult-index">
                <div className="feedbackresult-index-left">
                    {
                        (index > 1) &&
                        <h4 onClick={(e)=>{
                                if (index>0) {
                                    setIndex(index-1);
                                }
                                e.stopPropagation();                
                        }}>&lt;</h4>
                    }
                </div>
                <div className="feedbackresult-index-middle">
                    <p onClick={()=>{
                        if (index>1){
                            setIndex(index-1)
                        }
                    }}>{index}</p>
                    <p>{index+1}</p>
                    <p onClick={()=>setIndex(index+1)}>{index+2}</p>
                </div>
                <div className="feedbackresult-index-right">
                    {
                        (index != 10) &&
                        <h4 onClick={(e)=>{
                                if (index<100) {
                                    setIndex(index+1);
                                }
                                e.stopPropagation();                
                        }}>&gt;</h4>
                    } 
                </div>
            </div>

            <div className="feedbackresult-box">
                {/* <h5>{index+1}</h5> */}
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} feedbacks={feedbacks} />
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} feedbacks={feedbacks} />
                <AIChat question={question} />
                <UserChat index={0} answers={answers} />
                <AIFeedback index={0} feedbacks={feedbacks} />  
            </div>
{/* 
            <div className="result-box-gradient">
                <p></p>
            </div>
            <div className="result-box-under">
                <p></p>
            </div> */}
        </div>
    )
}