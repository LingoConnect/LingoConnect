import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Question from './pages/question';
import Practice from './pages/practice/practice';
import MyPage from './pages/mypage/mypage';
import Feedback from './pages/mypage/feedback';
import FeedbackQuestion from './pages/mypage/feedback_question';
import FeedbackResult from './pages/mypage/feedback_result';
import PatternResult from './pages/mypage/pattern_result';
import { SmallTitle, BigTitle } from './components/title';
import { FaHashtag } from 'react-icons/fa6';
import { CgProfile, CgClipboard } from 'react-icons/cg';
import { TbMessage2Exclamation, TbLogout } from 'react-icons/tb';
import { PiQuestionBold } from 'react-icons/pi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNoNavPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    /^\/main\/[^/]+\/[^/]+\/[^/]+$/.test(location.pathname);
  const isMyPage = location.pathname === '/mypage';
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      {!isNoNavPage && (
        <div className="navbar">
          <input id="menuicon" type="checkbox" checked={menuOpen} onChange={toggleMenu} />
          <label className="menu-button" htmlFor="menuicon">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </label>

          {/* 햄버거 버튼 토글 시 메뉴바 */}
          <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <div className="navbar-menu-top">
              <BigTitle />
              <ul className="navbar-menu-toplist">
                <li
                  onClick={() => {
                    navigate('/main');
                    toggleMenu();
                  }}
                >
                  <FaHashtag size={30} color="#746745" />
                  <h4>메인 화면</h4>
                </li>
                <li
                  onClick={() => {
                    navigate('/mypage');
                    toggleMenu();
                  }}
                >
                  <CgProfile size={30} color="#746745" />
                  <h4>마이페이지</h4>
                </li>
                <li
                  onClick={() => {
                    navigate('/mypage/feedback');
                    toggleMenu();
                  }}
                >
                  <TbMessage2Exclamation size={30} color="#746745" />
                  <h4>나의 피드백</h4>
                </li>
                <li
                  onClick={() => {
                    navigate('/mypage/pattern');
                    toggleMenu();
                  }}
                >
                  <CgClipboard size={30} color="#746745" />
                  <h4>나의 패턴 분석</h4>
                </li>
              </ul>
            </div>

            <div className="navbar-menu-bottom">
              <ul className="navbar-menu-bottomlist">
                <li>
                  <PiQuestionBold size={30} color="#746745" />
                  <h4>앱 사용법 보기</h4>
                </li>
                <li
                  onClick={() => {
                    navigate('/');
                    toggleMenu();
                  }}
                >
                  <TbLogout size={30} color="#746745" />
                  <h4>로그아웃</h4>
                </li>
              </ul>
            </div>
          </div>

          {isMyPage === true ? (
            <div className="navbar-mypage">
              <p>마이페이지</p>
              <SmallTitle />
            </div>
          ) : (
            <div className="navbar-no-mypage">
              <div className="navbar-blank1" />
              <SmallTitle />
              <div className="navbar-blank2" />
            </div>
          )}
        </div>
      )}

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/main" element={<Main />} />
        <Route path="/main/:topic" element={<Question />} />
        <Route path="/main/:topic/:id/:question" element={<Practice />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/mypage/feedback"
          element={<Feedback path="feedback" title="피드백 모아보기" />}
        />
        <Route path="/mypage/feedback/:topic" element={<FeedbackQuestion />} />
        <Route path="/mypage/feedback/:topic/:id/:question" element={<FeedbackResult />} />
        <Route
          path="/mypage/pattern"
          element={<Feedback path="pattern" title="자주 하는 실수(패턴) 분석" />}
        />
        <Route path="/mypage/pattern/:topic" element={<PatternResult />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router>
  );
}

export default App;
