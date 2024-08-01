import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { HiSpeakerWave } from 'react-icons/hi2';
import {
    test_mainquestions,
    test_subquestions,
    test_feedback,
    test_score_feedbacks,
    test_answers,
} from './tutorial_data';
export default function TutorialChatPractice() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const practiceTutorial = [
        {
            index: 0,
            content: '친구가 질문을 했네요! 스피커 모양을 눌러 소리를 들을 수 있어요.',
            top: '',
            bottom: '70px',
        },
        {
            index: 1,
            content: '오른쪽 아래에 보이는 마이크 버튼을 눌러 소리내어 답할 수 있어요!',
            top: '',
            bottom: '70px',
        },
        {
            index: 2,
            content: '대답이 끝나면 마이크 버튼 옆의 네모 버튼을 눌러 녹음을 멈춰요.',
            top: '',
            bottom: '70px',
        },
        {
            index: 3,
            content: '그리고 이 화살표 버튼을 눌러 답변을 전송해요. 이번엔 제가 대신 답변할게요.',
            top: '',
            bottom: '70px',
        },
        {
            index: 4,
            content: '답변하면 답변에 대한 피드백과 발음 평가 점수가 나와요!',
            top: '70px',
            bottom: '',
        },
        {
            index: 5,
            content: '질문에 계속해서 답을 해볼까요?',
            top: '70px',
            bottom: '',
        },
        {
            index: 6,
            content: '학습이 끝났어요!',
            top: '70px',
            bottom: '',
        },
        {
            index: 7,
            content: '아래의 깜빡거리는 버튼을 눌러봅시다.',
            top: '',
            bottom: '50%',
        },
    ];
    const bottomRef = useRef(null);
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [index]);
    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
                <h4>주제: 학교</h4>
            </div>
            <div className="practice-chat">
                <AIChat index={index} questions={test_mainquestions[0]} />
                {index > 3 && (
                    <div className="practice-chat-answer">
                        <UserChat answers={test_answers[0]} />
                        <AIFeedback index={index} feedbacks={test_feedback[0]} />
                        <ScoreBox
                            index={index}
                            scores={test_feedback[0]}
                            score_feedbacks={test_score_feedbacks[0]}
                        />
                    </div>
                )}
                {index > 4 && <AIChat index={index} questions={test_subquestions[0]} />}
                {index > 5 && (
                    <>
                        <div className="practice-chat-answer">
                            <UserChat answers={test_answers[1]} />
                            <AIFeedback index={index} feedbacks={test_feedback[1]} />
                            <ScoreBox
                                index={index}
                                scores={test_feedback[1]}
                                score_feedbacks={test_score_feedbacks[1]}
                            />
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
                                    <h4
                                        className={index === 7 ? 'tutorial-practice-box' : ''}
                                        onClick={() => navigate('/tutorial/mypage/chat-review')}
                                    >
                                        피드백 보기
                                    </h4>
                                    <h4>나가기</h4>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div ref={bottomRef} />
            </div>
            <div className="practice-input">
                <input />
                <div className="practice-input-send">
                    <button>
                        <img
                            className={index === 1 ? 'tutorial-button' : ''}
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="mic"
                        />
                    </button>
                    <button>
                        <img
                            className={index === 2 ? 'tutorial-button' : ''}
                            src={process.env.PUBLIC_URL + '/img/stop.png'}
                            alt="stop"
                        />
                    </button>
                    <button>
                        <img
                            className={index === 3 ? 'tutorial-button' : ''}
                            src={process.env.PUBLIC_URL + '/img/send.png'}
                            alt="send"
                        />
                    </button>
                </div>
            </div>
            <Modal index={index} setIndex={setIndex} practiceTutorial={practiceTutorial} />
        </div>
    );
}
export function AIChat({ index, questions }) {
    return (
        <div className="ai-chat">
            <div className="ai-chat-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="mummy" />
                <p />
            </div>
            <div className="ai-chat-dialogue">
                <h4>{questions}</h4>
                <HiSpeakerWave
                    className={index === 0 ? 'aichat-audio-player tutorial-audio' : 'custom-audio-player'}
                />
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
export function AIFeedback({ index, feedbacks }) {
    return (
        <div className="feedback-box">
            <div style={{ height: '4rem' }} />
            <p className={index === 4 ? 'tutorial-score' : ''}>{feedbacks.feedback}</p>
        </div>
    );
}
export function ScoreBox({ index, scores, score_feedbacks }) {
    return (
        <div className={index === 4 ? 'score-box tutorial-score' : 'score-box'}>
            <p>{scores.score}</p>
            <p>{score_feedbacks}</p>
        </div>
    );
}
function Modal({ index, setIndex, practiceTutorial }) {
    return (
        <div
            className="tutorialModal practice-modal"
            style={{ top: practiceTutorial[index].top, bottom: practiceTutorial[index].bottom }}
        >
            <img src={process.env.PUBLIC_URL + '/img/cat.png'} alt="튜토리얼" />
            <h4>{practiceTutorial[index].content}</h4>
            <p
                onClick={() => {
                    if (index !== 7) {
                        setIndex(index + 1);
                    }
                }}
                style={{ color: index === 7 ? 'white' : 'black' }}
            >
                다음 &gt;
            </p>
        </div>
    );
}
