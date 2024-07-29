import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BigCircle, SmallCircle } from './components/circle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div className="background-circle-container">
      <BigCircle />
      <BigCircle />
      <BigCircle />
      <BigCircle />
      <BigCircle />
      <BigCircle />
      <SmallCircle />
      <SmallCircle />
      <SmallCircle />
      <SmallCircle />
    </div>
  </React.StrictMode>
);

reportWebVitals();
