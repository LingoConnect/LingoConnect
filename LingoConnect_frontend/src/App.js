import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Question from './pages/question';
import Practice from './pages/practice';
import Result from './pages/result';
import MyPage from './pages/mypage';
import Feedback from './pages/feedback';
import FeedbackQuestion from './pages/feedback_question';
import FeedbackResult from './pages/feedback_result';
import Pattern from './pages/pattern';
import PatternResult from './pages/pattern_result';
import MainTest from './test_pages/main_test';
import QuestionTest from './test_pages/question_test';
import PracticeTest from './test_pages/practice_test';
import ResultTest from './test_pages/result_test';
import MyPageTest from './test_pages/mypage_test';
import FeedbackTest from './test_pages/feedback_test';
import FeedbackQuestionTest from './test_pages/feedback_question_test';
import FeedbackResultTest from './test_pages/feedback_result_test';
import PatternTest from './test_pages/pattern_test';
import PatternResultTest from './test_pages/pattern_result_test';

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
          <Route path="/main/:topic/:id/:question" element={<Practice />} />
          <Route path="/main/:topic/:question/result" element={<Result />} />
          <Route path="/mypage" element={<MyPage />} /> 
          <Route path="/mypage/feedback" element={<Feedback />} />
          <Route path="/mypage/feedback/:topic" element={<FeedbackQuestion />} />
          <Route path="/mypage/feedback/:topic/:question" elemnt={<FeedbackResult />} />         
          <Route path="/mypage/pattern" element={<Pattern />} /> 
          <Route path="/mypage/pattern/:topic" element={<PatternResult />} /> */}

          {/* 백엔드 서버 사용하지 않을 때 활성화하세요 */}
          <Route path="/main" element={<MainTest />} />
          <Route path="/main/:topic" element={<QuestionTest />} />
          <Route path="/main/:topic/:question" element={<PracticeTest />} />
          <Route path="/main/:topic/:question/result" element={<ResultTest />} />
          <Route path="/mypage" element={<MyPageTest />} />
          <Route path="/mypage/feedback" element={<FeedbackTest />} />
          <Route path="/mypage/feedback/:topic" element={<FeedbackQuestionTest />} />
          <Route path="/mypage/feedback/:topic/:question" element={<FeedbackResultTest />} />         
          <Route path="/mypage/pattern" element={<PatternTest />} /> 
          <Route path="/mypage/pattern/:topic" element={<PatternResultTest />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;