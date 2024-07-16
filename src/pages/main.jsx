import '../styles/main.css';
import { SmallTitle } from '../components/title';

export default function Main() {
    return (
        <div className="main-container">
            <div className="main-navbar">
                <SmallTitle />
                <div className="profile-box">
                    <p>name</p>
                    <p>name</p>
                    <p>name</p>
                </div>
            </div>
        </div>
    )
}