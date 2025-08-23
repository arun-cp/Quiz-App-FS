'use client';

import { useRouter } from 'next/navigation';
import "./QuizOver.css";
import done from "@/app/Images/qres.png";
import tick from "@/app/Images/tick.png";

export default function QuizOver({qdetails}) {
    const router = useRouter();
    return(
        <div className="popbg">
            <div className="qoverbox">
                <div className="qoverhead">
                    <h1 style={{"margin" : "0px 215px"}}>Quiz Results</h1>
                </div>
                <img src={done.src}/>
                <div className="qoverdet">
                    {console.log(qdetails)}
                    <h3>Score : {qdetails.markobt} / {qdetails.marktot}</h3>
                    <h3>Percentage : {(qdetails.markobt/qdetails.marktot)*100 > 0 ? Math.round((qdetails.markobt/qdetails.marktot)*100) : 0} %</h3>
                    <h3>No of Questions : {qdetails.totalno}</h3>
                    <h3>Correct Answers : {qdetails.correctno}</h3>
                    <h3>Wrong Answers : {qdetails.wrongno}</h3>
                    <h3>Unattended : {qdetails.totalno - (qdetails.correctno + qdetails.wrongno)}</h3>
                </div>
                <button onClick={() => router.push('/home/quizdash')}>
                    <span><img src={tick.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Done</span>
                </button>
            </div>
        </div>
    )
}