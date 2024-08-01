import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/mypage.css';
import Top from '../../components/top';
import { getTopic } from '../../api/learning_content_api';
import { AiOutlinePicture } from 'react-icons/ai';
import { getMyInfo } from '../../api/mypage_api';

export default function MyPage() {
  const [topics, setTopics] = useState([]);
  const [picture, setPicture] = useState(false);
  const [studyRatio, setStudyRatio] = useState(0);

  const handlePictureClick = () => {
    setPicture(!picture);
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

  return (
    <div className="mypage-container">
      <div className="mypage-navbar">
        <Top />
        <div className="mypage-profile-box">
          <div className="mypage-profile-top">
            <img src={process.env.PUBLIC_URL + '/img/deco.png'} alt="" />
            <p>초보</p>
          </div>
          <div className="mypage-profile-img">
            <img
              onClick={() => handlePictureClick()}
              src={process.env.PUBLIC_URL + '/img/이루매.jpeg'}
              alt="프로필"
            />
          </div>
          <div className="mypage-profile-name">
            <h4>링구</h4>
          </div>
        </div>
        <div className="mypage-profile-dc">
          <div className="mypage-dcbox">
            <p>학습성취도</p>
            <p>{formattedRatio}%</p>
          </div>
          <div className="mypage-dcbox">
            <p>내 발음 점수</p>
            <p>0 / 5</p>
          </div>
          <div className="mypage-dcbox">
            <p>획득한</p>
            <p>배지 모음</p>
          </div>
        </div>
        <div className="mypage-feedback">
          <MyFeedbackBox
            title="피드백 모아보기"
            navigate_url="/mypage/chat-review"
            topics={topics}
          />
          <MyFeedbackBox
            title="자주 하는 실수(패턴) 분석"
            navigate_url="/mypage/chat-pattern"
            topics={topics}
          />
        </div>
      </div>

      {picture && (
        <div className="mypage-picture-container">
          <PictureModal handlePictureClick={handlePictureClick} />
        </div>
      )}
    </div>
  );
}

function MyFeedbackBox({ title, navigate_url, topics }) {
  const navigate = useNavigate();

  return (
    <div className="mypage-feedback-container">
      <div className="mypage-feedback-top">
        <p>• {title}</p>
        <img
          src={process.env.PUBLIC_URL + '/img/plus.png'}
          onClick={() => navigate(`${navigate_url}`)}
          alt="더보기 버튼"
        />
      </div>
      <div className="mypage-feedback-box">
        {topics.slice(0, 3).map((topic) => {
          return (
            <div className="mypage-feedback-topic">
              <img src={topic.image_url} alt="주제 사진" />
              {topic.topic.length > 7 ? (
                <div className="mypage-feedback-topic-long">
                  <h4>{topic.topic.slice(0, 7)}</h4>
                  <h4>{topic.topic.slice(7)}</h4>
                </div>
              ) : (
                <h4>{topic.topic}</h4>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PictureModal({ handlePictureClick }) {
  return (
    <div className="mypage-picture-setting">
      <h4 className="mypage-picture-setting-title">
        <AiOutlinePicture size={33} />
        프로필 사진 설정
      </h4>
      <div className="mypage-picture-setting-list">
        <h4>사진 찍기</h4>
        <h4>앨범에서 사진 선택</h4>
        <h4 style={{ marginBottom: '0' }}>기본 이미지 적용</h4>
      </div>
      <div className="mypage-picture-setting-close">
        <p onClick={() => handlePictureClick()}>닫기</p>
      </div>
    </div>
  );
}
