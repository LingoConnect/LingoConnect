import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { getImage, getImageAnalysis, getRandomImage } from '../../api/ai_api';

export default function ExpressionPractice() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const location = useLocation();
  const { topic } = location.state || {};
  const [answerInput, setAnswerInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const [images, setImages] = useState([]);
  const [questions, setQuestions] = useState(['그림을 보고 그림을 묘사해주세요']);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchRandomImg = async () => {
      try {
        const response = await getRandomImage({ topic });
        if (response && response.status === 200) {
          console.log(response.data);
          setImages([response.data]);
        }
      } catch (error) {
        console.error('Error fetching random images:', error);
      }
    };
    fetchRandomImg();
  }, [topic]);

  const analyzeImage = async () => {
    try {
      setIsLoading(true);
      setIsAnswerSubmitted(true);

      // 사용자 입력을 먼저 answers에 추가
      setAnswers((prevAnswers) => [...prevAnswers, answerInput]);
      setAnswerInput('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // 가장 최근 이미지의 URL을 사용하여 분석
      const imageUrl = images[images.length - 1];

      const response1 = await getImageAnalysis({
        prompt: answerInput,
        imageUrl: imageUrl, // 올바른 imageUrl 전달
      });

      if (response1 && response1.status === 200) {
        console.log('Analysis Response:', response1.data);

        // API 응답에 따른 질문 선택
        let newQuestion;
        if (response1.data === true) {
          newQuestion = '잘했어요! 계속해서 그림을 보고 그림을 묘사해보세요.';
        } else if (response1.data === false) {
          newQuestion = '조금 더 설명해주세요.';
        } else {
          // response1.data가 예상치 못한 데이터일 경우에 대한 기본 처리
          newQuestion = '응답을 이해하지 못했습니다. 다시 시도해주세요.';
        }

        // 새 질문을 추가하고 렌더링
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        console.log(questions);

        await fetchNewImage();
      } else {
        console.error('Image analysis failed:', response1);
      }
    } catch (error) {
      console.error('Error during image analysis:', error);
    } finally {
      setIsLoading(false);
      setIsAnswerSubmitted(false);
    }
  };

  const fetchNewImage = async () => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response2 = await getImage({ prompt: answerInput });
      if (response2 && response2.status === 200) {
        const imgList = [...images, response2.data];
        setImages(imgList);
      } else {
        console.error('Image generation failed:', response2);
      }
    } catch (error) {
      console.error('Error fetching new images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="practice-container">
      <div className="practice-navbar">
        <img
          src={process.env.PUBLIC_URL + '/img/arrow.png'}
          alt="arrow"
          onClick={() => navigate(-1)}
        />
        <h4>주제: {topic}</h4>
      </div>

      <div className="practice-chat">
        <AIChat index={0} questions={questions} />
        {images[0] && <AIExpressionImage expressionImgUrl={images[0]} />}
        {answers.map((answer, index) => (
          <React.Fragment key={index}>
            <div className="practice-chat-answer">
              <UserChat answer={answer} />
            </div>
            {index + 1 === answers.length ? (
              <>
                {!isAnswerSubmitted && !isLoading && (
                  <AIChat index={index + 1} questions={questions} />
                )}
                {!isAnswerSubmitted && !isLoading && images[index + 1] && (
                  <AIExpressionImage expressionImgUrl={images[index + 1]} />
                )}
              </>
            ) : (
              <>
                <AIChat index={index + 1} questions={questions} />
                {images[index + 1] && <AIExpressionImage expressionImgUrl={images[index + 1]} />}
              </>
            )}
          </React.Fragment>
        ))}

        {currentQuestionIndex >= 4 && (
          <div className="practice-finish">
            <div className="practice-finish-top">
              <HiOutlineLightBulb size={40} color="#FF2E00" />
              <p>학습 완료!</p>
            </div>
            <div className="practice-finish-middle">
              <p>5번 중 3번을 성공했어요!</p>
              <p style={{ color: '#FF2E00' }}>위에서 한 대화 내용을 한 번 더 검토해 봅시다!</p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="loading-box">
            <p>"답변을 분석하는 중이에요!"</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        <div style={{ width: '100%', height: '100px' }}></div>
        <div ref={bottomRef} />
      </div>

      <div className="practice-input">
        <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
        <div className="practice-input-send">
          <button onClick={analyzeImage} disabled={isLoading || isAnswerSubmitted}>
            <img src={process.env.PUBLIC_URL + '/img/send.png'} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AIChat({ index, questions = [] }) {
  const questionText = questions[index] || '질문이 없습니다.';
  return (
    <div className="ai-chat">
      <div className="ai-chat-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
        <p />
      </div>
      <div className="ai-chat-dialogue">
        <h4>{questionText}</h4>
      </div>
    </div>
  );
}

export function UserChat({ answer }) {
  return (
    <div className="answer-box">
      <p>{answer}</p>
    </div>
  );
}

function AIExpressionImage({ expressionImgUrl }) {
  return (
    <div className="ai-expression-img">
      <img src={expressionImgUrl} alt="expression" />
    </div>
  );
}
