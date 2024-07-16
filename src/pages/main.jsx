import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import { SmallTitle } from '../components/title';
import learningContent from '../data/learningContent';

export default function Main() {
    const navigate = useNavigate();

    const handleTopicClick = (topic) => {
        navigate(`/main/${encodeURIComponent(topic)}`);
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
            {
                learningContent.map(function (element, index) {
                    return (
                        <div className="topic-box" onClick={() => { handleTopicClick(element.topic) }}>{element.topic}</div>
                    )
                })
            }
        </div>
    )
}