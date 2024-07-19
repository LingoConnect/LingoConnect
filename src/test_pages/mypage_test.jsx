import { useNavigate } from "react-router-dom";
import '../styles/mypage.css';
import { SmallTitle } from '../components/title';

export default function MyPage() {
    const navigate = useNavigate();

    return (
        <div className="mypage-container">
            <div className="mypage-navbar">
                <SmallTitle />
                <div className="mypage-profile-box">
                    <div className="mypage-profile-top">
                        <img src={process.env.PUBLIC_URL + '/img/deco.png'} />
                        <p>배지(등급)</p>
                    </div>
                    <div className="mypage-profile-img">
                        <img src={process.env.PUBLIC_URL + '/img/profile.png'}/>        
                    </div>
                    <div className="mypage-profile-dc">
                        <div className="mypage-dcbox">
                            <p>학습성취도</p>
                            <p>60%</p>
                        </div>
                        <div className="mypage-dcbox">
                            <p>내 발음 점수</p>
                            <p>4.3 / 5</p>
                        </div>
                        <div className="mypage-dcbox" onClick={navigate('/mypage/mybadge')}>
                            <p>획득한</p>
                            <p>배지 모음</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mypage-feedback">
                
            </div>
            <div className="mypage-pattern">

            </div>
        </div>

    )
}