import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Question from './pages/question';
import Practice from './pages/practice/practice';
import Result from './pages/practice/result';
import MyPage from './pages/mypage/mypage';
import Feedback from './pages/mypage/feedback';
import FeedbackQuestion from './pages/mypage/feedback_question';
import PatternResult from './pages/mypage/pattern_result';

function App() {
  return (
    <div className="container">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/main" element={<Main />} />
          <Route path="/main/:topic" element={<Question />} />
          <Route path="/main/:topic/:id/:question" element={<Practice />} />
          <Route path="/main/:topic/:question/result" element={<Result />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/mypage/feedback"
            element={<Feedback path="feedback" title="피드백 모아보기" />}
          />
          <Route path="/mypage/feedback/:topic" element={<FeedbackQuestion />} />
          <Route
            path="/mypage/pattern"
            element={<Feedback path="pattern" title="자주 하는 실수(패턴) 분석" />}
          />
          <Route path="/mypage/pattern/:topic" element={<PatternResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
