import '../styles/start.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { BigTitle } from '../components/title';
import { BigCircle, MiddleCircle, SmallCircle } from '../components/circle';


export default function Start() {
    return (
        <div className='start-container'>

            <div className="start-title">
                <BigTitle />
                <div className="start-subtitle">
                    <h3>Lingo conntect</h3>
                    <h3>언어 학습을 통한 사회적 연결</h3>
                </div>
            </div>
            <img src={process.env.PUBLIC_URL + '/img/mummy.png'}></img>
            {/* <img src={process.env.PUBLIC_URL + '/img/cat.png'}></img> */}
            <div className="start-button-box">
                <Link to="/login">
                    <button>로그인</button>
                </Link>
                <Link to="/register">
                    <button>회원가입</button>
                </Link>
                <div className="search-box">
                    <p>&nbsp;&nbsp;아이디 찾기</p>
                    <span>|</span>
                    <p>비밀번호 찾기</p>
                </div>
                <div className="guest-login">
                    <Link to="/main">                    
                        <p>비회원으로 로그인</p>
                    </Link>
                </div>
            </div>

            <div className='start-circle-container'>
                <BigCircle />
                <MiddleCircle />
                <MiddleCircle />
                <MiddleCircle />
                <MiddleCircle />
                <MiddleCircle />
                <SmallCircle />
                <SmallCircle />
                <SmallCircle />
            </div>
        </div>
    )
}