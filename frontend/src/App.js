import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Select from './pages/select';
import Expression from './pages/expression/expression';
import ExpressionPractice from './pages/expression/expression_practice';
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
import Error from './pages/error';
import { SmallTitle, BigTitle } from './components/title';
import { FaRegFaceGrinBeam, FaHashtag } from 'react-icons/fa6';
import { CgProfile, CgClipboard } from 'react-icons/cg';
import { TbMessage2Exclamation, TbLogout } from 'react-icons/tb';
import { PiQuestionBold } from 'react-icons/pi';
import { FaUserFriends } from "react-icons/fa";

export const GlobalContext = createContext();

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';
  const isTutorialPage =
    location.pathname === '/tutorial/chat' ||
    location.pathname === '/tutorial/chat/practice' ||
    location.pathname === '/tutorial/mypage/chat-review' ||
    location.pathname === '/tutorial/mypage/chat-pattern';
  const [menuOpen, setMenuOpen] = useState(false);
  const isNoNavPage =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/study/expression/practice' ||
    location.pathname === '/study/chat/practice' ||
    location.pathname === '/tutorial/chat/practice';
  const toggleMenu = () => {
    if (!isTutorialPage) {
      setMenuOpen(!menuOpen);
    }
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const [isStudyVisible, setIsStudyVisible] = useState(false);
  const toggleStudy = () => {
    setIsStudyVisible(!isStudyVisible);
  }

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
                  className="navbar-study"
                  onClick={() => toggleStudy()}
                  style={{
                    justifyContent:'space-between',
                    marginBottom: isStudyVisible ? '1%' : '3%'
                  }}
                >
                  <div className="navbar-studymenu">
                    <FaHashtag size={30} color="#746745" />
                    <h4>메인 화면</h4>
                  </div>
                  {isStudyVisible ? <p>-</p> : <p>+</p>}
                </li>
                {isStudyVisible &&                
                  <div className='navbar-studymenu-list'>
                    <li onClick={()=>{navigate('/study/expression'); toggleMenu();}}>
                      <FaRegFaceGrinBeam size={20} color='#746745' />
                      <span>표현 학습</span>
                    </li>
                    <li onClick={()=>{navigate('/study/chat'); toggleMenu();}}>
                      <FaUserFriends size={17} color='#7466745' />
                      <span>소통 연습</span>
                    </li>
                  </div>
                }
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

          {/* 마이페이지용 */}
          {isMyPage && (
            <div className="navbar-mypage">
              <p>마이페이지</p>
              <SmallTitle />
            </div>
          )}
          {/* 튜토리얼용 */}
          {isTutorialPage && (
            <div className="navbar-tutorial">
              <div className="navbar-blank1" />
              <h4>튜토리얼</h4>
              <p onClick={() => navigate('/study/chat')}>튜토리얼 나가기</p>
            </div>
          )}
          {/* 원래용 */}
          {!isMyPage && !isTutorialPage && (
            <div className="navbar-no-mypage">
              <div className="navbar-blank2" />
              <SmallTitle />
              <div className="navbar-blank3" />
            </div>
          )}
        </div>
      )}

      <div className="content-container" onClick={closeMenu}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/study" element={<Select />} />
          <Route path="/study/expression" element={<Expression />} />
          <Route path="/study/expression/practice" element={<ExpressionPractice />} />
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
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [globalScores, setGlobalScores] = useState([]);

  return (
    <GlobalContext.Provider value={{ globalScores, setGlobalScores }}>
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
