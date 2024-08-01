import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/chat_review_question.css';
import { getMyFeedback } from '../../../api/mypage_api';
import { getMainQuestion } from '../../../api/learning_content_api';

export default function ReviewQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || {};
  const [totalMainQuestions, setTotalMainQuestions] = useState([]);
  const [mainQuestions, setMainQuestions] = useState([]);
  const [getFeedback, setGetFeedback] = useState([]);

  const handleQuestionClick = (element) => {
    const filteredFeedback = getFeedback.filter(
      (feedback) => feedback.topQuestionId === element.mainQuestionId
    );
    const selectedMainQuestion = element.question;
    navigate('/mypage/chat-review/practice', { state: { filteredFeedback, selectedMainQuestion } });
  };

  useEffect(() => {
    const fetchMainQuestion = async () => {
      const total_response = await getMainQuestion({ topic });
      if (total_response.status === 200) {
        setTotalMainQuestions(total_response.data);
      }

      const feedback_response = await getMyFeedback({ topic });
      if (feedback_response.status === 200) {
        setGetFeedback(feedback_response.data);
      }
    };

    fetchMainQuestion();
  }, [topic]);

  useEffect(() => {
    const filteredMainQuestions = totalMainQuestions.filter((mainQuestion) =>
      getFeedback.some((feedback) => feedback.topQuestionId === mainQuestion.mainQuestionId)
    );
    setMainQuestions(filteredMainQuestions);
  }, [totalMainQuestions, getFeedback]);

  return (
    <div className="feedbackquestion-container">
      <div className="feedbackquestion-main">
        <h4>피드백 모아보기</h4>
        <p>{topic}</p>
      </div>
      <div className="feedbackquestion-list">
        {mainQuestions.map((element, index) => {
          return (
            <div className="feedbackquestion-list-q" onClick={() => handleQuestionClick(element)}>
              <div className="fq-question">
                <h4>{index + 1}.&nbsp;</h4>
                <h5>{element.question}</h5>
              </div>
              <p>{element.difficulty}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
