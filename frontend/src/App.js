import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Chat from './pages/chat/chat';
import ChatQuestion from './pages/chat/chat_question';
import ChatPractice from './pages/chat/chat_practice';
import MyPage from './pages/mypage/mypage';
import ChatReview from './pages/mypage/chat/chat_review';
import ChatReviewQuestion from './pages/mypage/chat/chat_review_question';
import ChatReviewPractice from './pages/mypage/chat/chat_review_practice';
import ChatPatternPractice from './pages/mypage/chat/chat_pattern_practice';
import TutorialChat from './pages/tutorial/tutorial_chat';
import TutorialChatPractice from './pages/tutorial/tutorial_chat_practice';
import TutorialReviewResult from './pages/tutorial/tutorial_chat_review_practice';
import TutorialPatternPractice from './pages/tutorial/tutorial_chat_pattern_practice';
import { SmallTitle, BigTitle } from './components/title';
import { FaHashtag } from 'react-icons/fa6';
import { CgProfile, CgClipboard } from 'react-icons/cg';
import { TbMessage2Exclamation, TbLogout } from 'react-icons/tb';
import { PiQuestionBold } from 'react-icons/pi';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';
  const [menuOpen, setMenuOpen] = useState(false);
  const isNoNavPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/study/chat/practice' ||
    location.pathname === '/tutorial/chat/practice';
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
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
                    navigate('/study/chat');
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
                    navigate('/mypage/chat-review');
                    toggleMenu();
                  }}
                >
                  <TbMessage2Exclamation size={30} color="#746745" />
                  <h4>나의 피드백</h4>
                </li>
                <li
                  onClick={() => {
                    navigate('/mypage/chat-pattern');
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
                <li
                  onClick={() => {
                    navigate('/tutorial/chat');
                    toggleMenu();
                  }}
                >                  
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

      <div className="content-container" onClick={closeMenu}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/study/chat" element={<Chat />} />
          <Route path="/study/chat/question" element={<ChatQuestion />} />
          <Route path="/study/chat/practice" element={<ChatPractice />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/mypage/chat-review"
            element={<ChatReview path="chat-review/question" title="피드백 모아보기" />}
          />
          <Route path="/mypage/chat-review/question" element={<ChatReviewQuestion />} />
          <Route path="/mypage/chat-review/practice" element={<ChatReviewPractice />} />
          <Route
            path="/mypage/chat-pattern"
            element={<ChatReview path="chat-pattern/practice" title="자주 하는 실수(패턴) 분석" />}
          />
          <Route path="/mypage/chat-pattern/practice" element={<ChatPatternPractice />} />

          <Route path="/tutorial/chat" element={<TutorialChat />} />
          <Route path="/tutorial/chat/practice" element={<TutorialChatPractice />} />
          <Route path="/tutorial/mypage/chat-review" element={<TutorialReviewResult />} />
          <Route path="/tutorial/mypage/chat-pattern" element={<TutorialPatternPractice />} />
        </Routes>
      </div>
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
