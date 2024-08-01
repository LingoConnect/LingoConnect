import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat_practice.css';
import { HiOutlineLightBulb } from 'react-icons/hi';
import {
    test_mainquestions,
    test_subquestions,
    test_feedback,
    test_answers,
} from '../tutorial/tutorial_data';
import { AIChat, UserChat, AIFeedback} from '../tutorial/tutorial_chat_practice';

export default function ExpressionPractice() {
    const navigate = useNavigate();
    const bottomRef = useRef(null);
    const expressionImgUrl = ['/img/expression/computer1.png', '/img/expression/computer2.png'];

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="practice-container">
            <div className="practice-navbar">
                <div className="practice-navbar-left">
                    <img src={process.env.PUBLIC_URL + '/img/arrow.png'} alt="arrow" />
                    <h4>주제: 학교</h4>
                </div>
            </div>
            <div className="practice-chat">
                <AIChat questions={test_mainquestions[0]} />
                <AIExpressionImage  index={0} expressionImgUrl={expressionImgUrl} />
                    <div className="practice-chat-answer">
                        <UserChat answers={test_answers[0]} />
                        <AIFeedback feedbacks={test_feedback[0]} />
                    </div>
                <AIChat questions={test_subquestions[0]} />
                <AIExpressionImage index={1} expressionImgUrl={expressionImgUrl} />
                        <div className="practice-chat-answer">
                            <UserChat answers={test_answers[1]} />
                            <AIFeedback feedbacks={test_feedback[1]} />
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
                                    <h4>피드백 보기</h4>
                                    <h4 onclick={()=>navigate('/study/expression')}>나가기</h4>
                                </div>
                            </div>
                        </div>
                <div ref={bottomRef} />
            </div>
            <div className="practice-input">
                <input />
                <div className="practice-input-send">
                    <button>
                        <img
                            src={process.env.PUBLIC_URL + '/img/mic.png'}
                            alt="mic"
                        />
                    </button>
                    <button>
                        <img
                            src={process.env.PUBLIC_URL + '/img/stop.png'}
                            alt="stop"
                        />
                    </button>
                    <button>
                        <img
                            src={process.env.PUBLIC_URL + '/img/send.png'}
                            alt="send"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

function AIExpressionImage({index, expressionImgUrl}) {
    return (
        <div className="ai-expression-img">
            <img src={process.env.PUBLIC_URL + expressionImgUrl[index]} />
        </div>
    )
}