'use client';

import "./QuizConfirm.css";
import start from "@/app/Images/submit.png";
import cancel from "@/app/Images/exit.png";
import quizstart from "@/app/Images/quizstart.png";
import { useRouter } from 'next/navigation';
import { useRef } from "react";

export default function QuizConfirm({xam, index, close}) {
    const router = useRouter();
    const cname = useRef("");
    function startexam(e) {
        e.preventDefault();
        const name = cname.current.value;
        router.push(`/home/quizdash/quizstart?cname=${encodeURIComponent(name)}&xamindex=${index}`);
    }

    return(
        <div className="popbg">
            <div className="qconfrmbox">
                <div className="qconfrmbody">
                    <img src={quizstart.src}></img>
                    <h1>{xam.exam}</h1>
                    <h3>Total Questions : {xam.qstns.length}</h3>
                    <h3>Total Mark : {xam.totmark}</h3>
                    <h3>Time : {xam.time} mins</h3>
                </div>
                <div className="qconfrmfoot">
                    <form onSubmit={startexam}>
                        <input placeholder="Enter your Name" ref={cname} required></input>
                        <button type="submit">
                            <span>
                            <img 
                                src={start.src} 
                                alt="Cart Icon" 
                                style={{ width: '15px', height: 'auto' }} /> Start Exam
                            </span>
                        </button>
                        <button onClick={() => close(false)}>
                            <span>
                            <img 
                                src={cancel.src} 
                                alt="Cart Icon" 
                                style={{ width: '15px', height: 'auto' }} /> Cancel
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}