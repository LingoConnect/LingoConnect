import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/chat_pattern_practice.css';
import { getMyPattern } from '../../../api/mypage_api';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function PatternPractice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic } = location.state || {};
  // const [index, setIndex] = useState(0);
  const [pattern, setPattern] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMyFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await getMyPattern();
        if (response.status === 200) {
          setPattern(response.data);
        }
      } catch (error) {
        console.error('Error fetching pattern:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyFeedback();
  }, []);

  return (
    <div className="PatternResult-container">
      <div className="PatternResult-back" onClick={() => navigate(-1)}>
        <FaArrowLeftLong size={30} color="#746745" />
      </div>

      <div className="PatternResult-main">
        <h4>자주 하는 실수(패턴) 분석</h4>
        <p>{topic}</p>
      </div>

      {/* <div className="PatternResult-index">
        <p>
          {index + 1}/{patterns.length}
        </p>
      </div> */}

      {/* <div className="PatternResult-card">
        <ResultCard index={index} setIndex={setIndex} />
      </div> */}

      <div className="PatternResult-card">
        <ResultCard pattern={pattern} isLoading={isLoading} />
      </div>

      <div className="PatternResult-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="" />
      </div>
    </div>
  );
}

function ResultCard({ pattern, isLoading }) {
  return (
    <div className="resultcard-container">
      {/* 왼쪽으로 넘김 */}
      {/* <div className="resultcard-left">
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
      </div> */}

      {/* 카드 내용 */}
      <div className="resultcard-card">
        <img src={process.env.PUBLIC_URL + '/img/light.png'} alt="" />
        {isLoading && (
          <div className="loading-box">
            <p>"답변을 분석하고 있습니다!"</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        <h4>{pattern}</h4>
      </div>

      {/* 오른쪽으로 넘김 */}
      {/* <div className="resultcard-right">
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
      </div> */}
    </div>
  );
}
