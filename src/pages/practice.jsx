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
            <div className="practice-navbar">
                <img src={process.env.PUBLIC_URL + '/img/arrow.png'} />
                <h4>{decodedQuestion}</h4>
            </div>

            <div className="practice-chat">
                <AIChat />
                <AIChat />
                <AIChat />
                <AIChat />
                <AIChat />
            </div>
            
            <div className="practice-input">
                <input onChange={(event) => setAnswerInput(event.target.value)} />
                <div className="practice-input-send">
                    <button>
                        <img src={process.env.PUBLIC_URL + '/img/mic.png'} />
                    </button>
                    <button onClick={handleFeedback}>
                        <img src={process.env.PUBLIC_URL + '/img/send.png'} />
                    </button>
                </div>
            </div>
        </div>
    )
}

function AIChat() {
    const { topic, question } = useParams();
    const decodedQuestion = decodeURIComponent(question);

    return (
        <div className="ai-chat">
            <div className="ai-chat-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
                <p/>
            </div>
            <div className="ai-chat-dialogue">
                <h4>{decodedQuestion}</h4>
            </div>
        </div>
    )
}


{/* <div className="practice-container">
    <div>{decodedTopic}</div>
    <div className="question">{decodedQuestion}</div>
    <div className="answer">{answerInput}</div>
    <div className="feedback">feedback</div>
    <input onChange={(event) => setAnswerInput(event.target.value)}></input>
    <button onClick={handleFeedback}>전송</button>
</div> */}