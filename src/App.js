import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Question from './pages/question';
import Practice from './pages/practice';
import MainTest from './test_pages/main_test';
import QuestionTest from './test_pages/question_test';
import PracticeTest from './test_pages/practice_test';
import ResultTest from './test_pages/result_test';
import MyPage from './test_pages/mypage_test';

function App() {
  return (
    <div className="container">
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 백엔드 서버 사용할 때 활성화하세요 */}
          {/* <Route path="/main" element={<Main />} />
          <Route path="/main/:topic" element={<Question />} />
          <Route path="/main/:topic/:question" element={<Practice />} /> */}

          {/* 백엔드 서버 사용하지 않을 때 활성화하세요 */}
          <Route path="/main" element={<MainTest />} />
          <Route path="/main/:topic" element={<QuestionTest />} />
          <Route path="/main/:topic/:question" element={<PracticeTest />} />
          <Route path="/main/:topic/:question/result" element={<ResultTest />} />
          <Route path="/mypage" element={<MyPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;