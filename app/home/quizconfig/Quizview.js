'use client';

import "./Quizview.css";
import cancel from "@/app/Images/exit.png";

export default function Quizview({qns, close}) {

    return(
        <div className="popbg">
            {console.log(qns)}
            <div className="qviewbox">
                <div className="qviewhead">
                    <h2 >Questions </h2>
                </div>
                <div className="qviewbody">
                    <h3>Total Questions : {qns.length}</h3>
                    <div className="qviewqns">
                        {qns.map((qn, index) => (
                        <div className="qnbox" key={index}>
                            <p><b>Q. </b>{qn.question}</p>
                            <p><b>A.</b>{qn.A} &nbsp; <b>B.</b>{qn.B} &nbsp; <b>C.</b>{qn.C} &nbsp; <b>D.</b>{qn.D}</p>
                            <p><b>Correct Ans : </b>{qn.answer} &nbsp; <b>Marks(+/-) : </b>{qn.correctmark} / {qn.wrongmark}</p>
                        </div>
                        ))}
                    </div>
                    <button onClick={() => close(false)}>
                        <span>
                        <img 
                            src={cancel.src} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> Close
                        </span>
                    </button>
                </div>
                
            </div>
        </div>
    )
}