import React, { useRef, forwardRef } from 'react';
import '../../styles/chat_practice.css';
import { HiOutlineLightBulb } from 'react-icons/hi';

const ChatPracticeContent = forwardRef((_, ref) => {
  return (
    <div className="practice-container">
      <div className="practice-navbar">
        <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
        <h4>주제: 운동</h4>
      </div>

      <div className="practice-chat">
        {Questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <React.Fragment key={index}>
            <AIChat question={question} />
            {index < answers.length && (
              <div className="practice-chat-answer">
                <UserChat index={index} answers={answers} />
                <AIFeedback index={index} feedbacks={feedbacks} />
                {score.trim() !== '' && <ScoreBox index={index} feedbacks={feedbacks} />}
              </div>
            )}
          </React.Fragment>
        ))}
        {currentQuestionIndex === Questions.length && (
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
                <h4 onClick={() => navigate('/mypage/chat-review')}>피드백 보기</h4>
                <h4 onClick={() => navigate(-1)}>나가기</h4>
              </div>
            </div>
          </div>
        )}
        <div ref={ref} />
      </div>

      <div className="practice-input">
        <input
          value={answerInput}
          onChange={(event) => setAnswerInput(event.target.value)}
          onKeyUp={(event) => {
            if (answerInput.trim() !== '') {
              if (event.key === 'Enter') {
                handleFeedback();
              }
            }
          }}
        />
        <div className="practice-input-send">
          <button onClick={activeMicButton ? startRecording : undefined}>
            <img
              style={activeMicButton ? { opacity: '1' } : { opacity: '0.3' }}
              src={process.env.PUBLIC_URL + '/img/mic.png'}
              alt="mic"
            />
          </button>
          <button onClick={activeStopButton ? stopRecording : undefined}>
            <img
              style={activeStopButton ? { opacity: '1' } : { opacity: '0.3' }}
              src={process.env.PUBLIC_URL + '/img/stop.png'}
              alt="stop"
            />
          </button>
          <button onClick={activeSendButton ? handleFeedback : undefined}>
            <img
              style={activeSendButton ? { opacity: '1' } : { opacity: '0.3' }}
              src={process.env.PUBLIC_URL + '/img/send.png'}
              alt="send"
            />
          </button>
        </div>
      </div>

      {audioUrl && (
        <div className="practice-audio">
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
});

export function AIChat({ question }) {
  return (
    <div className="ai-chat">
      <div className="ai-chat-img">
        <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
        <p />
      </div>
      <div className="ai-chat-dialogue">
        <h4>{question}?</h4>
      </div>
    </div>
  );
}

export function UserChat({ index, answers }) {
  return (
    <div className="answer-box">{answers && answers.length > 0 && <p>{answers[index]}</p>}</div>
  );
}

export function AIFeedback({ index, feedbacks }) {
  return (
    <div className="feedback-box">
      <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="cat" />
      {feedbacks && feedbacks.length > 0 && <p>{feedbacks[index].feedback}</p>}
    </div>
  );
}

export function ScoreBox({ index, feedbacks }) {
  return (
    <div className="score-box">
      {feedbacks && feedbacks.length > 0 && <p>{feedbacks[index].score}</p>}
    </div>
  );
}

export default function TutorialChatPractice() {
  const messageEndRef = useRef(null);

  return <ChatPracticeContent ref={messageEndRef} />;
}
