import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Top from '../components/top';

export default function Login() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(true);

    return (

        <div className="login-container">
            <div className="login-top">
                <Top />
            </div>
            <div className="login-login">
                <div className="login-back" onClick={() => navigate("/")}>
                    <img src={process.env.PUBLIC_URL + '/img/arrow.png'} />
                </div>
                <div className="login-submit">
                    <h2>로그인</h2>
                    <input placeholder='이메일'></input>
                    <input placeholder='비밀번호'></input>
                    <button>로그인</button>
                    <h4>또는</h4>
                    <div className="login-submit-icon">
                        <button onClick={() => { window.open("https://google.com") }}>
                            <img src={process.env.PUBLIC_URL + '/img/google.png'} />
                        </button>
                        <button onClick={() => { window.open("https://chat.com") }}>
                            <img src={process.env.PUBLIC_URL + '/img/chat.png'} />
                        </button>
                        <button onClick={() => { window.open("https://twitter.com") }}>
                            <img src={process.env.PUBLIC_URL + '/img/twitter.png'} />
                        </button>
                    </div>
                </div>
            </div>
            {
                modal && <Modal setModal={setModal} />
            }
        </div>

    )
}

export function Modal({ setModal }) {
    const navigate = useNavigate();
    return (
        <div className="guest-modal">
            <p>현재 로그인 기능이 준비 중입니다.</p>
            <p>잠시만 기다려 주시면 감사하겠습니다.</p>
            <p style={{marginTop: '15px'}}>입장하기 버튼을 클릭하시면,</p>
            <p>비회원으로 입장하실 수 있습니다.</p>
            <div>
                <button onClick={() => navigate('/main')}>입장하기</button>
                <button onClick={() => setModal(false)}>닫기</button>
            </div>
        </div>
    )
}