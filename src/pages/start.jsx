import '../styles/start.css';
import { BigTitle } from '../components/title';

export default function Start() {
    return (
        <div className='start-container'>
            <BigTitle />
            <div style={{ margin: '3%' }}>
                <h3>Lingo conntect</h3>
                <h3>언어 학습을 통한 사회적 연결</h3>
            </div>
            <img src={process.env.PUBLIC_URL + '/img/mummy.png'}></img>
            {/* <img src={process.env.PUBLIC_URL + '/img/cat.png'}></img> */}
            <div className="start-button-box">
                <button>로그인</button>
                <button>회원가입</button>
                <div className="search-box">
                    <p>아이디 찾기</p>
                    <span>|</span>
                    <p>비밀번호 찾기</p>
                </div>
            </div>
        </div>
    )
}