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
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const initialQuestion = '그림을 보고 그림을 묘사해주세요';
  const [initialImg, setInitialImg] = useState('');

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchRandomImg = async () => {
      try {
        const response = await getRandomImage({ topic });
        if (response && response.status === 200) {
          setInitialImg(response.data);
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

      const response1 = await getImageAnalysis({
        prompt: answerInput,
        imageUrl: images[images.length - 1],
      });

      if (response1 && response1.status === 200) {
        console.log('Analysis Response:', response1.data);
        const newQuestion =
          response1.data === true
            ? '잘했어요! 계속해서 그림을 보고 그림을 묘사해보세요.'
            : '답변이 그림과 연관성이 적습니다. 다음 그림에는 더 집중해서 대답해 보세요!';
        setQuestions([...questions, newQuestion]);

        await fetchNewImage();
      } else {
        console.error('Image analysis failed:', response1);
      }
    } catch (error) {
      console.error('Error during image analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewImage = async () => {
    try {
      setIsLoading(true);

      const response2 = await getImage({ prompt: answerInput });
      if (response2 && response2.status === 200) {
        const imgList = [...images, response2.data];
        setImages(imgList);
      } else {
        console.error('Image generation failed:', response2);
      }

      setAnswers([...answers, answerInput]);
      setAnswerInput('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        <AIChat question={initialQuestion} />
        {initialImg && <AIExpressionImage expressionImgUrl={initialImg} />}
        {questions.map((question, index) => (
          <React.Fragment key={index}>
            <div className="practice-chat-answer">
              <UserChat index={index} answers={answers} />
            </div>
            <AIChat question={question} />
            {images[index] && <AIExpressionImage expressionImgUrl={images[index]} />}
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
            <p>"이미지를 생성하고 있어요!"</p>
            <div className="loading-spinner"></div>
          </div>
        )}
        <div style={{ width: '100%', height: '100px' }}></div>
        <div ref={bottomRef} />
      </div>

      <div className="practice-input">
        <input value={answerInput} onChange={(event) => setAnswerInput(event.target.value)} />
        <div className="practice-input-send">
          <button onClick={analyzeImage}>
            <img src={process.env.PUBLIC_URL + '/img/send.png'} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AIChat({ question }) {
  return (
    <div className="ai-chat">
      <div className="ai-chat-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
        <p />
      </div>
      <div className="ai-chat-dialogue">
        <h4>{question}</h4>
      </div>
    </div>
  );
}

export function UserChat({ index, answers }) {
  return (
    <div className="answer-box">
      {answers.length > index ? <p>{answers[index]}</p> : <p>응답 없음</p>}
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
