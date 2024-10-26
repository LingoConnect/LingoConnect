import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { getTopic } from '../../api/learning_content_api';
import { getMyInfo } from '../../api/mypage_api';
import { GlobalContext } from '../../App';

export default function Chat() {
  const { globalScores } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [profile, setProfile] = useState(true);
  const [studyRatio, setStudyRatio] = useState(0);

  const handleTopicClick = (topic) => {
    navigate('/study/chat/question', { state: { topic } });
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

  useEffect(() => {
    if (topics.length === 0) return;

    const fetchStudyRatio = async () => {
      const get_ratio = await getMyInfo(topics);
      setStudyRatio(get_ratio);
    };

    fetchStudyRatio();
  }, [topics]);

  const formattedRatio = studyRatio.toFixed(2);
  const totalScore = globalScores.reduce((acc, score) => acc + score, 0);
  const averageScore = totalScore / globalScores.length;
  const formattedScore = averageScore.toFixed(2);

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
              <h6>
                학습성취도:&nbsp;{formattedRatio}%&nbsp;&nbsp;|&nbsp;&nbsp;내 발음 점수:&nbsp;
                {formattedScore !== 'NaN' ? formattedScore : 0}점
              </h6>
            </div>
            <div className="main-profile-link">
              <h4 onClick={() => navigate('/mypage')}>MY</h4>
            </div>
            <div className="main-profile-link_fold" onClick={() => setProfile(false)}>
              <p>&#60;</p>
            </div>
          </div>
        ) : (
          <div className="main-profile-link_fold" onClick={() => setProfile(true)}>
            <p>&#62;</p>
          </div>
        )}
      </div>

      <div className="main-tutorial-button">
        <h4>소통 연습</h4>
        <p onClick={() => navigate('/tutorial/chat')}>
          <AiOutlineQuestionCircle size={20} /> 앱 사용법 보기
        </p>
      </div>

      <div className="main-topic">
        <div className="main-topic-title">
          <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="" />
          <h4>학습할 주제를 선택하세요!</h4>
        </div>
        {topics.map(function (element) {
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
