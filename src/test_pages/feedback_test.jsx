import { useNavigate } from 'react-router-dom';
import '../styles/feedback.css';
import { SmallTitle } from '../components/title';
import { test_topics } from './data_test';

export default function FeedbackTest() {
    const navigate = useNavigate();

    const handleTopicClick = (topic) => {
        navigate(`/mypage/feedback/${topic}`);
    }

    return (
        <div className="feedback-container">
            <img
                className="feedback-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage')} />
            <div className="feedback-navbar">
                <SmallTitle />
            </div>

            <div className="feedback-main">
                <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
                <h4>피드백 모아보기</h4>
            </div>

            <div className="feedback-list">

            </div>



        </div>
    )
}