import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat_review_practice.css';
import { AIChat, UserChat, AIFeedback, ScoreBox } from './tutorial_chat_practice';
import {
  test_mainquestions,
  test_subquestions,
  test_feedback,
  test_score_feedbacks,
  test_answers,
} from './tutorial_data';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function TutorialReviewResult() {
  const [index, setIndex] = useState(0);
  const [reviewTutorial] = useState(['이 페이지에서는 친구와 나눴던 대화를 다시 볼 수 있어요.', '마이페이지의 피드백 모아보기 페이지에서도 볼 수 있답니다!'])

  return (
    <div className="feedbackresult-container">
      <div className="feedbackresult-back">
        <FaArrowLeftLong size={30} color="#746745" />
      </div>
      <div className="feedbackresult-main">
        <h4>피드백 모아보기</h4>
        <p>학교</p>
        <h4>Q. 가장 좋아하는 과목이 뭐야?</h4>
      </div>

      <div className="feedbackresult-box">
        <AIChat questions={test_mainquestions[0]} />
        <div className="practice-chat-answer">
          <UserChat answers={test_answers[0]} />
          <AIFeedback feedbacks={test_feedback[0]} />
          <ScoreBox scores={test_feedback[0]} score_feedbacks={test_score_feedbacks[0]} />
        </div>
        <AIChat questions={test_subquestions[0]} />
        <div className="practice-chat-answer">
          <UserChat answers={test_answers[1]} />
          <AIFeedback feedbacks={test_feedback[1]} />
          <ScoreBox scores={test_feedback[1]} score_feedbacks={test_score_feedbacks[1]} />
        </div>
      </div>
      <Modal index={index} setIndex={setIndex} reviewTutorial={reviewTutorial} />
    </div>

  );
}

function Modal({index, setIndex, reviewTutorial}) {
  const navigate = useNavigate();

  return (
      <div className="tutorialModal review-modal">
          <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="튜토리얼" />
          <h4>{reviewTutorial[index]}</h4>
          <p 
              onClick={()=> {
                if(index === 0) {setIndex(index+1)}
                else if(index === 1) {navigate('/tutorial/mypage/chat-pattern')}
              }}
          >다음 &gt;</p>
      </div>
  )
}