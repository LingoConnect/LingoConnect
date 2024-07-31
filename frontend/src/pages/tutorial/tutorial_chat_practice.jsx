import { useNavigate } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { HiOutlineLightBulb } from 'react-icons/hi';
import {
  test_mainquestions,
  test_subquestions,
  test_feedback,
  test_score_feedbacks,
  test_answers,
} from './tutorial_data';

export default function TutorialChatPractice() {
  const navigate = useNavigate();

  return (
    <div className="practice-container">
      <div className="practice-navbar">
        <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
        <h4>주제: 학교</h4>
      </div>

      <div className="practice-chat">
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
        <div className="practice-finish">
          <div className="practice-finish-top">
            <HiOutlineLightBulb size={40} color="#FF2E00" />
            <p>학습 완료!</p>
          </div>
          <div className="practice-finish-middle">
            <p>준비한 질문은 여기까지에요.</p>
            <p style={{ color: '#FF2E00' }}>위에서 한 대화 내용을 한 번 더 검토해 봅시다!</p>
          </div>
          <div className="practice-finish-bottom">
            <p>그리고</p>
            <p>
              <span style={{ color: '#FF2E00' }}>마이페이지</span>에서 저장된 피드백들을
            </p>
            <p>반복적으로 학습해보아요!</p>

            <div className="practice-finish-bottom-link">
              <h4 onClick={() => navigate('/tutorial/mypage/chat-pattern')}>피드백 보기</h4>
              <h4>나가기</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="practice-input">
        <input />
        <div className="practice-input-send">
          <button>
            <img src={process.env.PUBLIC_URL + '/img/mic.png'} alt="mic" />
          </button>
          <button>
            <img src={process.env.PUBLIC_URL + '/img/stop.png'} alt="stop" />
          </button>
          <button>
            <img src={process.env.PUBLIC_URL + '/img/send.png'} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AIChat({ questions }) {
  return (
    <div className="ai-chat">
      <div className="ai-chat-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
        <p />
      </div>
      <div className="ai-chat-dialogue">
        <h4>{questions}</h4>
      </div>
    </div>
  );
}

export function UserChat({ answers }) {
  return (
    <div className="answer-box">
      <p>{answers}</p>
    </div>
  );
}

export function AIFeedback({ feedbacks }) {
  return (
    <div className="feedback-box">
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
      <p>{feedbacks.feedback}</p>
    </div>
  );
}

export function ScoreBox({ scores, score_feedbacks }) {
  return (
    <div className="score-box">
      <p>{scores.score}</p>
      <p>{score_feedbacks}</p>
    </div>
  );
}
