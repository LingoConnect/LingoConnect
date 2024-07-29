import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/chat_review_practice.css';
import { AIChat, UserChat, AIFeedback } from '../../chat/chat_practice';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { getMyFeedback } from '../../../api/mypage_api';

export default function ReviewResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const { topic, id, question } = location.state || {};
  const [myFeedback, setMyFeedback] = useState([]);

  useEffect(() => {
    const fetchMyFeedback = async () => {
      const response = await getMyFeedback({ topic, id });
      if (response.status === 200) {
        setMyFeedback(response.data);
      }
    };
    fetchMyFeedback();
  }, [topic, id]);

  return (
    <div className="feedbackresult-container">
      <div className="feedbackresult-back" onClick={() => navigate(-1)}>
        <FaArrowLeftLong size={30} color="#746745" />
      </div>
      <div className="feedbackresult-main">
        <h4>피드백 모아보기</h4>
        <p>{topic}</p>
        <h4>Q. {question}?</h4>
      </div>

      <div className="feedbackresult-index">
        <div className="feedbackresult-index-left">
          {index > 1 && (
            <h4
              onClick={(e) => {
                if (index > 0) {
                  setIndex(index - 1);
                }
                e.stopPropagation();
              }}
            >
              &lt;
            </h4>
          )}
        </div>
        <div className="feedbackresult-index-middle">
          <p
            onClick={() => {
              if (index > 1) {
                setIndex(index - 1);
              }
            }}
          >
            {index}
          </p>
          <p>{index + 1}</p>
          <p onClick={() => setIndex(index + 1)}>{index + 2}</p>
        </div>
        <div className="feedbackresult-index-right">
          {index !== 10 && (
            <h4
              onClick={(e) => {
                if (index < 100) {
                  setIndex(index + 1);
                }
                e.stopPropagation();
              }}
            >
              &gt;
            </h4>
          )}
        </div>
      </div>

      <div className="feedbackresult-box">
        {myFeedback.map((element, index) => {
          return (
            <>
              <AIChat question={element.question} />
              <UserChat index={index} answers={element.answer} />
              <AIFeedback index={index} feedback={element.feedback} />
            </>
          );
        })}
      </div>
    </div>
  );
}
