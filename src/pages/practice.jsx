import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/practice.css';
import { getFeedback } from '../api/chat_api';

export default function Practice() {
    const { topic, question } = useParams();
    const [answerInput, setAnswerInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const decodedTopic = decodeURIComponent(topic);
    const decodedQuestion = decodeURIComponent(question);

    const handleFeedback = async () => {
        if (answerInput.trim() !== '') {
            const gptTitle = "주제: " + decodeURIComponent(topic) + "\n";
            const gptQuestion = "친구: " + decodeURIComponent(question) + "\n";
            const gptUserAnswer = "사용자: " + answerInput;
            console.log(gptTitle, gptQuestion, gptUserAnswer);
            const response = await getFeedback({ gptTitle, gptQuestion, gptUserAnswer });
            if (response.status === 200) {
                console.log(response.data);
                setFeedback(response.data);
            } else {
                alert("error");
            }
        }
    }

    return (
        <div className="practice-container">
            <div>{decodedTopic}</div>
            <div className="question">{decodedQuestion}</div>
            <div className="answer">{answerInput}</div>
            <div className="feecback">feedback</div>
            <input onChange={(event) => setAnswerInput(event.target.value)}></input>
            <button onClick={handleFeedback}>전송</button>
        </div>
    )
}