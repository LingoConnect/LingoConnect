import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/error.css';

const Error = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/');
  };
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <p>URL을 확인해주세요.</p>
      <button onClick={handleHomeButton}>처음으로</button>
    </div>
  );
};

export default Error;
