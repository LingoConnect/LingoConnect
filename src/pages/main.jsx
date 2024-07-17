import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { SmallTitle } from '../components/title';
import learningContent from '../data/learningContent';

export default function Main() {
    const navigate = useNavigate();

    const handleTopicClick = (topic) => {
        const encodedTopic = encodeURIComponent(topic);
        navigate(`/main/${encodedTopic}`);
    }

    return (
        <div className="main-container">
            <div className="main-navbar">
                <SmallTitle />
                <div className="profile-box">
                    <p>name</p>
                    <p>name</p>
                    <p>name</p>
                </div>
            </div>

            <div className="main-topic">
                <div className="main-topic-title">
                    <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
                    <h4>학습할 주제를 선택하세요!</h4>
                </div>
                {
                    learningContent.map(function (element, index) {
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