import { useNavigate } from 'react-router-dom';
import '../../styles/chat_pattern_practice.css';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function TutorialPatternPractice() {
  const navigate = useNavigate();
  const pattern = '질문에 대해 단답형으로 대답하는 경향이 있습니다. 대답을 할 때 두세 문장 이상으로 대답해보는 연습을 해보아요!';

  return (
    <div className="PatternResult-container">
      <div className="PatternResult-back" onClick={() => navigate(-1)}>
        <FaArrowLeftLong size={30} color="#746745" />
      </div>

      <div className="PatternResult-main">
        <h4>자주 하는 실수(패턴) 분석</h4>
        <p>학교</p>
      </div>

      <div className="PatternResult-card" style={{marginTop: '8vh'}}>
        <ResultCard pattern={pattern} />
      </div>

      <div className="PatternResult-img">
        <img 
          src={process.env.PUBLIC_URL + '/img/mummy.png'} 
          alt="" 
          onClick={()=>navigate('/tutorial/mypage/chat-review')}
          style={{cursor:'pointer'}}
        />
      </div>
    </div>
  );
}

function ResultCard({ pattern }) {
  return (
    <div className="resultcard-container">
      <div className="resultcard-card">
        <img src={process.env.PUBLIC_URL + '/img/light.png'} alt="" />
        <h4>{pattern}</h4>
      </div>
    </div>
  );
}
