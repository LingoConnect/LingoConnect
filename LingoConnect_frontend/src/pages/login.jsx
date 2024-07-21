import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Top from '../components/top';

export default function Login() {
    const navigate = useNavigate();

    return (
        
        <div className="login-container">
            <div className="login-top">
                <Top />
            </div>
            <div className="login-login">
                <div className="login-back" onClick={() => navigate("/")}>
                    <img src={process.env.PUBLIC_URL + '/img/arrow.png'} />
                </div>
                <div className="login-submit">
                    <h2>로그인</h2>
                    <input placeholder='이메일'></input>
                    <input placeholder='비밀번호'></input>
                    <button>로그인</button>
                    <h4>또는</h4>
                    <div className="login-submit-icon">
                        <button onClick={()=> {window.open("https://google.com")}}>
                            <img src={process.env.PUBLIC_URL + '/img/google.png'} />
                        </button>
                        <button onClick={()=> {window.open("https://chat.com")}}>
                            <img src={process.env.PUBLIC_URL + '/img/chat.png'} />
                        </button>
                        <button onClick={()=> {window.open("https://twitter.com")}}>
                            <img src={process.env.PUBLIC_URL + '/img/twitter.png'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}