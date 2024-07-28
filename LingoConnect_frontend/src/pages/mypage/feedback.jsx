import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/feedback.css';
import { SmallTitle } from '../../components/title';
import { getTopic } from '../../api/learning_content_api';

export default function Feedback({ path, title }) {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);

    const handleTopicClick = (topic) => {
        navigate(`/mypage/${path}/${topic}`);
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
        <div className="feedback-container">
            <img
                className="feedback-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={() => navigate('/mypage')} />
            <div className="feedback-navbar">
                <SmallTitle />
            </div>

            <div className="feedback-main">
                <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
                <h4>{title}</h4>
            </div>

            <div className="feedback-list">
                {
                    topics.map((element) => {
                        return (
                            <div className="feedback-list-box">
                                <img
                                    src={element.image_url}
                                    onClick={() => { handleTopicClick(element.topic) }} />
                                <h4 onClick={() => { handleTopicClick(element.topic) }}>{element.topic}</h4>
                            </div>
                        )
                    })
                }
                <div className="feedback-list-box-transparent" />
                <div className="feedback-list-box-transparent" />
            </div>
        </div>
    )
}