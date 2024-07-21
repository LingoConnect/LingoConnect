import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/mypage.css';
import Top from '../components/top';


export default function MyPageTest() {
    const navigate = useNavigate();
    const [list, setList] = useState([
        {
            subject: "피드백 모아보기",
            url: "/mypage/feedback"
        },
        {
            subject: "자주 하는 실수(패턴) 분석",
            url: "/mypage/pattern"
        }])

    return (
        <div className="mypage-container">
            <div className="mypage-navbar">
                <div className="mypage-top">
                    <Top />
                    <div className="mypage-top-link">
                        <img
                            src={process.env.PUBLIC_URL + '/img/arrow.png'}
                            onClick={() => navigate('/main')} />
                        <h4>마이페이지</h4>
                    </div>
                </div>
                <div className="mypage-profile-box">
                    <div className="mypage-profile-top">
                        <img src={process.env.PUBLIC_URL + '/img/deco.png'} />
                        <p>배지(등급)</p>
                    </div>
                    <div className="mypage-profile-img">
                        <img src={process.env.PUBLIC_URL + '/img/profile.png'} />
                    </div>
                    <div className="mypage-profile-name">
                        <h4>김한솔</h4>
                    </div>
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
                    <div className="mypage-dcbox">
                        <p>획득한</p>
                        <p>배지 모음</p>
                    </div>
                </div>
                <div className="mypage-feedback">
                    {
                        list.map(function (element) {
                            return (
                                <MyFeedbackBox element={element} />
                            )
                        })
                    }
                </div>
            </div>


        </div>

    )
}

function MyFeedbackBox({ element }) {
    const navigate = useNavigate();

    return (
        <div className="mypage-feedback-container">
            <div className="mypage-feedback-top">
                <p>• {element.subject}</p>
                <img 
                    src={process.env.PUBLIC_URL + '/img/plus.png'}
                    onClick={() => navigate(`${element.url}`)} />
            </div>
            <div className="mypage-feedback-box">
                <div className="mypage-feedback-topic">
                    <img 
                        src={process.env.PUBLIC_URL + '/img/일상.jpg'} />
                    <h4>일상</h4>
                </div>
                <div className="mypage-feedback-topic">
                    <img src={process.env.PUBLIC_URL + '/img/학교.jpg'} />
                    <h4>학교</h4>
                </div>
                <div className="mypage-feedback-topic">
                    <img src={process.env.PUBLIC_URL + '/img/음식.jpg'} />
                    <h4>음식</h4>
                </div>
            </div>
        </div>
    )
}