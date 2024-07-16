import React from 'react';
import { useParams } from 'react-router-dom';
import learningContent from '../data/learningContent';
import '../styles/question.css';
import { SmallTitle } from '../components/title';

export default function Question() {
    const { topic } = useParams();
    const topicData = learningContent.find(t => t.topic === decodeURIComponent(topic));
    return (
        <div className="question-container">
            <div className="question-navbar">
                <SmallTitle />
            </div>
            {
                topicData.questions.map(function (question, index) {
                    return (
                        <div>{question}</div>
                    )
                })
            }
        </div>
    )
}