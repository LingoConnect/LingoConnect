import { useNavigate } from 'react-router-dom';
import '../styles/feedback.css';
import { SmallTitle } from '../components/title';
import { test_topics } from '../test_pages/data_test';

export default function Feedback() {
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
                {
                    test_topics.map(function(element) {
                        return (
                            <div className="feedback-list-box">
                                <img 
                                    src={process.env.PUBLIC_URL + element.imgUrl}
                                    onClick={()=> { handleTopicClick(element.topic)}} />
                                <h4>{element.topic}</h4>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}