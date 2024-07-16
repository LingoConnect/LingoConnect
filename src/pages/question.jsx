import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import learningContent from '../data/learningContent';
import '../styles/question.css';
import { SmallTitle } from '../components/title';

export default function Question() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const topicData = learningContent.find(t => t.topic === decodeURIComponent(topic));

    const handleQuestionClick = (question) => {
        const encodedQuestion = encodeURIComponent(question);
        navigate(`/practice/${topic}/${encodedQuestion}`);
    }

    return (
        <div className="question-container">
            <div className="question-navbar">
                <SmallTitle />
            </div>
            {
                topicData.questions.map(function (question, index) {
                    return (
                        <div onClick={() => handleQuestionClick(question)}>{question}</div>
                    )
                })
            }
        </div>
    )
}