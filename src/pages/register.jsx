import '../styles/register.css';
import Top from '../components/top';

export default function Register() {
    return (
        <div className="register-container">
            <Top />
            <h2>회원가입</h2>
            <input placeholder='이메일'></input>
            <input placeholder='비밀번호'></input>
            <input placeholder='비밀번호 확인'></input>
            <input placeholder='이름'></input>
            <button>회원가입</button>
        </div>
    )
}