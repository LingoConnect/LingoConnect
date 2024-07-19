import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { SmallTitle } from '../components/title';
import { test_topics } from './data_test';
import { getTopic } from '../api/learning_content_api';

export default function MainTest() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    const handleTopicClick = (topic) => {
        navigate(`/main/${topic}`);
    }

    useEffect(() => {
        const fetchTopics = async () => {
            const response = await getTopic();
            if (response.status === 200) {
                console.log(response.data);
                setTopics(response.data);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="main-container">
            <div className="main-navbar">
                <SmallTitle />
                <div className="main-profile-box">
                    <div className="main-profile-pic">
                        <div className="main-profile-icon">
                            <img src={process.env.PUBLIC_URL + '/img/deco.png'} />
                            <p>●</p>
                        </div>
                        <div className="main-profile-img">
                            <img src={process.env.PUBLIC_URL + '/img/profile.png'}/>
                        </div>
                    </div>
                    <div className="main-profile-dc">
                        <p>배지(등급)</p>
                        <h4>김한솔</h4>
                        <h6>학습성취도:60%&nbsp;&nbsp;|&nbsp;&nbsp;내 발음 점수: 4.3</h6>
                    </div>
                    <div className="main-profile-link" onClick={()=>navigate("/main")}>
                        <p>●</p>
                        <p>●</p>
                        <p>●</p>
                    </div>
                </div>
            </div>

            <div className="main-topic">
                <div className="main-topic-title">
                    <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
                    <h4>학습할 주제를 선택하세요!</h4>
                </div>
                {
                    test_topics.map(function (element, index) {
                        return (
                            <div
                                className="main-topic-box"
                                onClick={() => { handleTopicClick(element.topic) }}
                            >
                                <img
                                    src={process.env.PUBLIC_URL + element.imgUrl}
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