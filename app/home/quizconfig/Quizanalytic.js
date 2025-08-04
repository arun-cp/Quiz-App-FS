'use client';

import "./Quizanalytic.css";
import cancel from "@/app/Images/exit.png";
import analy from "@/app/Images/analytics.png";
import not from "@/app/Images/not.png";
import { useState } from "react";

export default function Quizanalytic({xam, result, close}) {
    const [ xmresult, setxmresult ] = useState(null);
    const res = result.filter((rs) => rs.xamid == xam.xmid);
    console.log(res);

    return(
        <div className="qanalybg">
            <div className="qanalybox">
                <div className="qanalyhead">
                    <h2>Analytics</h2>
                </div>
                <div className="qanalybody">
                    <div className="xmdetail">
                        <div>
                            <h3>Exam : {xam.exam}</h3>
                            <h3>Total Mark : {xam.totmark}</h3>
                        </div>
                        <div>
                            <h3>Time : {xam.time} mins</h3>
                            <h3>Count : {res.length}</h3>
                        </div>
                        <img src={analy.src} alt="Cart Icon" />
                    </div>
                    <div className="qrs">
                        {res.length == 0 ? <p style={{ textAlign : "center"}}>No Attendees available</p> : null}
                        {res.map((rs, index) => (
                        <div className="rsbox" key={index}>
                            <div>
                                <h4>Name :{rs.cname}</h4>
                                <h4>Score : {rs.markobt}/{rs.marktot}</h4>
                            </div>
                            <div className="rscirc">
                                <h4>{(rs.markobt/rs.marktot)*100 > 0 ? Math.round((rs.markobt/rs.marktot)*100) : 0}%</h4>
                            </div>
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