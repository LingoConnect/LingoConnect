import '../styles/login.css';
import Top from '../components/top';

export default function Login() {
    return (
        <div className="login-container">
            <Top />
            <h2>로그인</h2>
            <input placeholder='이메일'></input>
            <input placeholder='비밀번호'></input>
            <button>로그인</button>
        </div>
    )
}