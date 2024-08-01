import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat_pattern_practice.css';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function TutorialPatternPractice() {
  const navigate = useNavigate();
  const pattern =
    '질문에 대해 단답형으로 대답하는 경향이 있습니다. 대답을 할 때 두세 문장 이상으로 대답해보는 연습을 해보아요!';
  const [index, setIndex] = useState(0);
  const patternTutorial = [
    '이 페이지에서는 주제별로 피드백들을 분석해서 자주하는 실수를 보여줘요.', 
    '마찬가지로 마이페이지의 실수 분석 메뉴에서 볼 수 있답니다.', 
    '앱 사용법 설명은 여기서 마칠게요!',
    '메인 화면에서 언제든지 다시 설명을 볼 수 있어요.',
    '그럼 이제 메인 화면으로 돌아가서 즐거운 학습을 시작해봅시다!'
  ]

  return (
    <div className="PatternResult-container">
      <div className="PatternResult-back">
        <FaArrowLeftLong size={30} color="#746745" />
      </div>

      <div className="PatternResult-main">
        <h4>자주 하는 실수(패턴) 분석</h4>
        <p className={index < 2 ? 'tutorial-main' : ''}>학교</p>
      </div>

      <div className="PatternResult-card" style={{ marginTop: '8vh' }}>
        <ResultCard index={index} pattern={pattern} />
      </div>

      <div className="PatternResult-img">
        <img
          src={process.env.PUBLIC_URL + '/img/mummy.png'}
          alt=""
          onClick={() => navigate('/tutorial/mypage/chat-review')}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <Modal index={index} setIndex={setIndex} patternTutorial={patternTutorial} />
      <div className="tutorial-overlay" />
    </div>
  );
}

function ResultCard({ index, pattern }) {
  return (
    <div className="resultcard-container">
      <div className={index < 2 ? 'resultcard-card tutorial-main' : 'resultcard-card'}>
        <img src={process.env.PUBLIC_URL + '/img/light.png'} alt="" />
        <h4>{pattern}</h4>
      </div>
    </div>
  );
}

function Modal({ index, setIndex, patternTutorial }) {
  const navigate = useNavigate();

  return (
    <div className="tutorialModal pattern-modal" style={{ bottom: '20px' }}>
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="튜토리얼" />
      <h4>{patternTutorial[index]}</h4>
      {index < 4 && <p onClick={() => setIndex(index + 1)}>다음 &gt;</p>}
      {index === 4 && (
        <p onClick={() => navigate('/study/chat')} style={{ color: 'rgb(0,10,255)' }}>
          메인으로
        </p>
      )}
    </div>
  );
}
