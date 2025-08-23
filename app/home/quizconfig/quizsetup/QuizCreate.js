'use client';

import "./QuizCreate.css";
import { useRouter } from 'next/navigation';
import done from "@/app/Images/done.gif";
import tick from "@/app/Images/tick.png";
import goto from "@/app/Images/sign.png";

export default function QuizCreate({xam}) {
    const router = useRouter();
    return(
        <div className="popbg">
            <div className="qcreatebox">
                <img src={done.src}/>
                <h2>{xam}</h2>
                <h3>Quiz has been Created Successfully</h3>
                <div className="qcreatebottom">
                    <button onClick={() => router.push('/home/quizconfig') } >
                        <span><img src={tick.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Done</span>
                    </button>
                    <button onClick={() => router.push('/home/quizdash')}>
                        <span><img src={goto.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Go To Quiz</span>
                    </button>
                </div>
            </div>
        </div>
    )
}