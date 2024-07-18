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
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/main/:topic" element={<Question />} />
          <Route path="/main/:topic/:question" element={<Practice />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;