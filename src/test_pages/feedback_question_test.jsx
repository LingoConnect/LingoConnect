import { useNavigate } from 'react-router-dom';
import '../styles/feedback_question.css';
import { SmallTitle } from '../components/title';
import { test_topics } from './data_test';




export default function FeedbackQuestionTest() {
    const navigate = useNavigate();

    const handleQuestionClick = (topic, question) => {
        navigate (`/mypage/feedback/${topic}/${question}`)
    }

    return(
        <div className="feedbackquestion-container">
            <img
                className="feedbackquestion-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}/>
            <div className="feedbackquestion-navbar">
                <SmallTitle />
            </div>
        </div>
    )
}