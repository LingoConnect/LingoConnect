import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { getTopic } from '../api/learning_content_api';

export default function Main() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [profile, setProfile] = useState(true);

  const handleTopicClick = (topic) => {
    navigate(`/main/${topic}`);
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await getTopic();
      if (response.status === 200) {
        setTopics(response.data);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="main-container">
      <div className="main-navbar">
        {profile === true ? (
          <div className="main-profile-box">
            <div className="main-profile-pic">
              <div className="main-profile-icon">
                <img src={process.env.PUBLIC_URL + '/img/deco.png'} alt="" />
                <p>●</p>
              </div>
              <div className="main-profile-img">
                <img src={process.env.PUBLIC_URL + '/img/이루매.jpeg'} alt="프로필" />
              </div>
            </div>
            <div className="main-profile-dc">
              <p>초보</p>
              <h4>링구</h4>
              <h6>학습성취도:0%&nbsp;&nbsp;|&nbsp;&nbsp;내 발음 점수: 0</h6>
            </div>
            <div className="main-profile-link">
              <h4 onClick={() => navigate('/mypage')}>MY</h4>
              <div className="main-profile-link_fold" onClick={() => setProfile(false)}>
                <p>접기&nbsp;▲</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="main-profile-foldbox">
            <p onClick={() => setProfile(true)}>펼치기&nbsp;▼</p>
          </div>
        )}
      </div>

      <div className="main-tutorial-button">
        <p><AiOutlineQuestionCircle size={20} /> 앱 사용법 보기</p>
      </div>

      <div className="main-topic">
        <div className="main-topic-title">
          <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="" />
          <h4>학습할 주제를 선택하세요!</h4>
        </div>
        {topics.map(function (element, index) {
          return (
            <div
              className="main-topic-box"
              onClick={() => {
                handleTopicClick(element.topic);
              }}
            >
              <img
                src={element.image_url}
                className="main-topic-box-img"
                loading="lazy"
                alt="주제 사진"
              />
              <h4>{element.topic}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
