import { useNavigate } from 'react-router-dom';
import '../styles/select.css';

export default function Select() {
    const navigate = useNavigate();

    return (
        <div className="select-container">
            <div className="select-img">
                <img src={process.env.PUBLIC_URL + '/img/mummy.png'} alt="선택"/>
            </div>
            <div className="select-dc">
                <h4>반가워! 난 링구야!</h4>
                <h4>우리 같이 즐겁게 언어 학습을 해보자!</h4>
                <h4>학습할 항목을 선택해 볼래?</h4>
            </div>
            <div className="select-link">
                <p 
                    className="select-link-select"
                    onClick={()=>navigate('/study/expression')}
                >표현 학습</p>
                <p
                    className="select-link-select"
                    onClick={()=>navigate('/study/chat')}
                >소통 연습</p>
            </div>
        </div>
    )
}