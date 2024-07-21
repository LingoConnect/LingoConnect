import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { SmallTitle } from '../components/title';
import { getTopic } from '../api/learning_content_api';

export default function Main() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [profile, setProfile] = useState(true);

    const handleTopicClick = (topic) => {
        navigate(`/main/${topic}`);
    }

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
                <SmallTitle />
                {profile == true ?
                    (<div className="main-profile-box">
                        <div className="main-profile-pic">
                            <div className="main-profile-icon">
                                <img src={process.env.PUBLIC_URL + '/img/deco.png'} />
                                <p>●</p>
                            </div>
                            <div className="main-profile-img">
                                <img src={process.env.PUBLIC_URL + '/img/profile.png'} />
                            </div>
                        </div>
                        <div className="main-profile-dc">
                            <p>배지(등급)</p>
                            <h4>김한솔</h4>
                            <h6>학습성취도:60%&nbsp;&nbsp;|&nbsp;&nbsp;내 발음 점수: 4.3</h6>
                        </div>
                        <div className="main-profile-link">
                            <h4 onClick={() => navigate("/mypage")}>MY</h4>
                            <div
                                className="main-profile-link_fold"
                                onClick={() => setProfile(false)}>
                                <p>접기&nbsp;▲</p>
                            </div>
                        </div>
                    </div>)
                    : (<div className="main-profile-foldbox">
                        <p onClick={() => setProfile(true)}>펼치기&nbsp;▼</p>
                    </div>)
                }
            </div>

            <div className="main-topic">
                <div className="main-topic-title">
                    <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
                    <h4>학습할 주제를 선택하세요!</h4>
                </div>
                {
                    topics.map(function (element, index) {
                        return (
                            <div
                                className="main-topic-box"
                                onClick={() => { handleTopicClick(element.topic) }}
                            >
                                <img
                                    src={element.image_url}
                                    className="main-topic-box-img"
                                    loading="lazy"
                                />
                                <h4>{element.topic}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}