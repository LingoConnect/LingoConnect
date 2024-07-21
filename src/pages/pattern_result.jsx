import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/pattern_result.css';
import { SmallTitle } from '../components/title';


export default function PatternResult() {
    const navigate = useNavigate();
    const { topic } = useParams();
    const [feedback, setFeedback] = useState([
        '자신의 생각이나 느낌을 말할 때 그 이유를 충분히 설명하지 않는 경우가 많습니다. 자신의 의견에 대해 구체적인 이유를 덧붙이면 좋습니다!',
        '질문에 대해 단답형으로 대답하는 경향이 있습니다. 대답을 할 때 두세 문장 이상으로 대답해보는 연습을 해보아요!',
        '구체적인 예시를 들지 않고 추상적으로 설명하는 경우가 많습니다. 구체적인 상황이나 예시를 들어 설명해보아요!'])
    
    const [index, setIndex] = useState(0);    
    
    return (
        <div className="PatternResult-container">
            <img
                className="PatternResult-back"
                src={process.env.PUBLIC_URL + '/img/arrow.png'}
                onClick={()=>navigate('/mypage/pattern')}/>
            <div className="PatternResult-navbar">
                <SmallTitle />
            </div>

            <div className="PatternResult-main">
                <h4>자주 하는 실수(패턴) 분석</h4>
                <p>{topic}</p>
            </div>

            <div className="PatternResult-index">
                <p>{index+1}/3</p>
            </div>
            <div className="PatternResult-card">
                <ResultCard index={index} setIndex={setIndex} feedback={feedback} />
            </div>
            
            <div className="PatternResult-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} />
            </div>

        </div>
    )
}

function ResultCard({index, setIndex, feedback}) {
    return (
        <div className="resultcard-container">

            <div className="resultcard-left">
                {
                    (index != 0) &&
                    <h4 onClick={(e)=>{
                            if (index>0) {
                                setIndex(index-1);
                            }
                            e.stopPropagation();                
                    }}>&lt;</h4>
                }
            </div>
            <div className="resultcard-card">
                <img src={process.env.PUBLIC_URL + '/img/light.png'} />
                <h4>{feedback[index]}</h4>
            </div>
            <div className="resultcard-right">
                {
                    (index !=2) &&
                    <h4 onClick={(e)=>{
                            if (index<3) {
                                setIndex(index+1);
                            }
                            e.stopPropagation();                
                    }}>&gt;</h4>
                }    
            </div>
        </div>
    )
}