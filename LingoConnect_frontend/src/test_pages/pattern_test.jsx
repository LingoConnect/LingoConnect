import { useNavigate } from 'react-router-dom';

import '../styles/pattern.css';
import { SmallTitle } from '../components/title';
import { test_topics } from './data_test';

export default function PatternTest() {
    const navigate = useNavigate();

    const handleTopicClick = (topic) => {
        navigate(`/mypage/pattern/${topic}`);
    }

    return (
        <div className="pattern-container">
            <img
                className="pattern-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage')} />
            <div className="pattern-navbar">
                <SmallTitle />
            </div>

            <div className="pattern-main">
                <img src={process.env.PUBLIC_URL + '/img/cat.png'} />
                <h4>자주 하는 실수(패턴) 분석</h4>
            </div>

            <div className="pattern-list">
                {
                    test_topics.map(function(element) {
                        return (
                            <div className="pattern-list-box">
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