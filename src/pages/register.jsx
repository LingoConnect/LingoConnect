import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/register.css';
import Top from '../components/top';

export default function Register() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    return (
        <div className="register-container">
            <div className="register-top">
                <Top />
            </div>
            <div className="register-register">
                <div className="register-back" onClick={()=> navigate("/")}>
                    <img src={process.env.PUBLIC_URL + '/img/arrow.png'} />
                </div>
                <div className="register-submit">
                    <h2>회원가입</h2>
                    <input placeholder='이메일'></input>
                    <input 
                        placeholder='비밀번호'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input 
                        placeholder='비밀번호 확인'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {(password!=confirmPassword) && (confirmPassword!='') &&
                        <p className="error-password">비밀번호가 일치하지 않습니다.</p>
                    }
                    <input placeholder='이름'></input>
                    <button>회원가입</button>
                </div>
            </div>
        </div>
    )
}