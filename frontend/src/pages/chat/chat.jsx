import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat.css';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { getTopic } from '../../api/learning_content_api';
import Portal from '../../components/Portal';
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { FaArrowsAltV } from "react-icons/fa";
import { GiClick } from "react-icons/gi";

export default function Chat() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [profile, setProfile] = useState(true);
  const [isTutorial, setIsTutorial] = useState(false);
  const [count, setCount] = useState(4);

  const handleTopicClick = (topic) => {
    navigate('/study/chat/question', { state: { topic } });
  };

  const handleTutorialClick = () => {
    setIsTutorial(!isTutorial);
    setCount(4);
  }
  
  const handleCountClick = () => {
    setCount(prevCount => prevCount - 1); 
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
        <p 
          onClick={()=>handleTutorialClick()}
          style={{ color: isTutorial ? 'white' : '#000AFF' }}>
          <AiOutlineQuestionCircle size={20} /> 앱 사용법 보기
        </p>
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
      
      {isTutorial && count > 0 &&
        <Portal>
          <div className="main-tutorial">

            {/* 첫번째 튜토리얼 */}
            {count === 4 && (
              <div className="main-page">
                <div 
                  className="background"
                  onClick={()=>handleCountClick()}
                >
                  <div className="main-RowBox mainBox1">
                    <div className="Icon mainIcon1" />
                    <p>
                      <MdOutlineSubdirectoryArrowRight size={35}/>
                      나의 정보를 볼 수 있는 화면이에요!
                    </p>
                  </div>
                </div>
              </div>  
            )}

            {/* 두번째 튜토리얼 */}
            {count === 3 && (
              <div className="main-page">
                <div 
                  className="background"
                  onClick={()=>handleCountClick()}
                >
                  <div className="main-RowBox mainBox2">
                    <p>
                      학습 주제를 고를 수 있는 화면이에요!
                    </p>
                    <div className="Icon mainIcon2" />
                  </div>    
                </div>
              </div>
            )}

            {/* 세번째 튜토리얼 */}
            {count === 2 && (
              <div className="main-page">
                <div 
                  className="background3"
                  onClick={()=>handleCountClick()}  
                >
                  <div className="main-RowBox mainBox3">
                    <p>
                      <FaArrowsAltV size={35} />
                      화면을 위아래로 움직여보세요!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 네번째 튜토리얼 */}
            {count === 1 && (
              <div className="main-page">
                <div 
                  className="background"
                  onClick={()=> {
                    handleCountClick();
                    setIsTutorial(false);                    
                  }}
                >
                  <div className="main-RowBox mainBox4">
                    <p>
                      '일상'을 눌러볼까요?
                    </p>
                    <div className="Icon mainIcon4">
                      <GiClick size={45} color='black'/>  
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Portal>
      }

      
    </div>
  );
}
