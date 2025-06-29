'use client';

import "./QuizCreate.css";
import { useRouter } from 'next/navigation';
import done from "@/app/Images/done.gif";

export default function QuizCreate() {
    const router = useRouter();
    return(
        <div className="qcreatebg">
            <div className="qcreatebox">
                <div className="qcreatehead">
                    <h1 style={{"margin" : "0px 215px"}}>Quiz Creation</h1>
                </div>
                <img src={done.src}/>
                <h3>Quiz has been Created Successfully</h3>
                <div className="qcreatebottom">
                    <button onClick={() => router.push('/home')} >Done</button>
                    <button onClick={() => router.push('/home/quizdash')}>Go to Quiz</button>
                </div>
            </div>
        </div>
    )
}