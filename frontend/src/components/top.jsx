import '../styles/top.css'
import { SmallTitle } from './title';
import { MiddleCircle, SmallCircle } from '../components/circle';

export default function Top() {
    return (
        <>
            <div className="top-container">
                <div className="top-circle-container">
                    <MiddleCircle />
                    <MiddleCircle />
                    <SmallCircle />
                    <SmallCircle />
                </div>
            </div>
            <div className="top-logo">
                <SmallTitle />
            </div>
        </>
    )
}