import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/chat_question.css';
import { getMainQuestion } from '../../api/learning_content_api';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function ChatQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || {};
  const [mainQuestions, setMainQuestions] = useState([]);

  const handleQuestionClick = (element) => {
    const question = element.question;
    const id = element.mainQuestionId;
    navigate('/study/chat/practice', { state: { topic, id, question } });
  };

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
    <div className="question-container">
      <div className="question-back" onClick={() => navigate(-1)}>
        <FaArrowLeftLong size={30} color="#746745" />
      </div>

      <div className="question-box">
        <div className="question-box-title">
          <div className="question-box-title-row1">
            <h4>{topic}</h4>
          </div>
          <div className="question-box-title-row2">
            <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
            <h4>연습할 질문을 선택하세요!</h4>
          </div>
        </div>

        {mainQuestions.map((element, index) => {
          return (
            <div
              key={element.mainQuestionId}
              className="question-box-list-q"
              onClick={() => handleQuestionClick(element)}
            >
              <div className="q-question">
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
