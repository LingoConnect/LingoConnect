import { useNavigate } from 'react-router-dom';
import '../../styles/chat.css';
import { test_topics } from './tutorial_data';

export default function TutorialChat() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="main-navbar">
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
            <h4>MY</h4>
          </div>
          <div className="main-profile-link_fold">
            <p>&#60;</p>
          </div>
        </div>
      </div>

      <div className="main-topic" style={{ marginTop: '5vh' }}>
        <div className="main-topic-title">
          <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="" />
          <h4>학습할 주제를 선택하세요!</h4>
        </div>

        <div className="main-topic-box" onClick={() => navigate('/tutorial/chat/practice')}>
          <img
            src={process.env.PUBLIC_URL + '/img/학교.jpg'}
            className="main-topic-box-img"
            loading="lazy"
            alt="주제 사진"
          />
          <h4>학교</h4>
        </div>

        {test_topics.map((element, index) => (
          <div className="main-topic-box" key={index}>
            <img
              src={process.env.PUBLIC_URL + element.imgUrl}
              className="main-topic-box-img"
              loading="lazy"
              alt="주제 사진"
            />
            <h4>{element.topic}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
