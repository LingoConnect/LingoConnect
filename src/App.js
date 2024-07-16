import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Start from './pages/start';
import Login from './pages/login';
import Register from './pages/register';
import Main from './pages/main';
import Question from './pages/question';
import Practice from './pages/practice';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/question" element={<Question />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;