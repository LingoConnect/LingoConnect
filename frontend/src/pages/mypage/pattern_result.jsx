import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/pattern_result.css';
import { SmallTitle } from '../../components/title';
import { getMyPattern } from '../../api/mypage_api';

const test_mypage_pattern = [
  [
    '자신의 생각이나 느낌을 말할 때 그 이유를 충분히 설명하지 않는 경우가 많습니다. 자신의 의견에 대해 구체적인 이유를 덧붙이면 좋습니다!',
    '질문에 대해 단답형으로 대답하는 경향이 있습니다. 대답을 할 때 두세 문장 이상으로 대답해보는 연습을 해보아요!',
    '구체적인 예시를 들지 않고 추상적으로 설명하는 경우가 많습니다. 구체적인 상황이나 예시를 들어 설명해보아요!',
  ],
  [
    '잘했어요! 왜 체육이 가장 좋았는지 이유까지 설명해서 상대방이 더 잘 이해할 수 있도록 했네요',
    '간단하게라도 이유를 말해주면  대화가 더 흥미로워질 수 있어요. 예를 들어, ‘그냥 좋아’ 대신 ‘그냥 색칠하는 게 재미있어서 좋아’라고 하면 더 좋아요.',
  ],
];

export default function PatternResult() {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [index, setIndex] = useState(0);
  const [patterns, setPatterns] = useState('');

  useEffect(() => {
    const fetchMyFeedback = async () => {
      const response = await getMyPattern({ topic });
      if (response.status === 200) {
        setPatterns(response.data);
      }
    };
    fetchMyFeedback();
  }, [topic]);

  return (
    <div className="PatternResult-container">
      <img
        className="PatternResult-back"
        src={process.env.PUBLIC_URL + '/img/arrow.png'}
        onClick={() => navigate('/mypage/pattern')}
        alt="뒤로가기 버튼"
      />
      <div className="PatternResult-navbar">
        <SmallTitle />
      </div>

      <div className="PatternResult-main">
        <h4>자주 하는 실수(패턴) 분석</h4>
        <p>{topic}</p>
      </div>

      <div className="PatternResult-index">
        <p>
          {index + 1}/{patterns.length}
        </p>
      </div>
      <div className="PatternResult-card">
        <ResultCard index={index} setIndex={setIndex} />
      </div>

      <div className="PatternResult-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="" />
      </div>
    </div>
  );
}

function ResultCard({ index, setIndex }) {
  return (
    <div className="resultcard-container">
      <div className="resultcard-left">
        {index !== 0 && (
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
      <div className="resultcard-card">
        <img src={process.env.PUBLIC_URL + '/img/light.png'} alt="" />
        <h4>{test_mypage_pattern[1][index]}</h4>
      </div>
      <div className="resultcard-right">
        {index !== test_mypage_pattern[1].length - 1 && (
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
  );
}
