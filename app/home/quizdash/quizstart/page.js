'use client';

import "./QuizStart.css";
import { useState , useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardContext from '@/app/globcontext';
import QuizOver from "./QuizOver";
import next from "@/app/Images/next.png";
import back from "@/app/Images/back.png";
import exit from "@/app/Images/exit.png";
import submit from "@/app/Images/submit.png";
import xmsubmit from "@/app/Images/xmsubmit.png";
import exam from "@/app/Images/examicon.png";
import user from "@/app/Images/usericon.png";
import time from "@/app/Images/clockicon.png";
import answ from "@/app/Images/answered.png";

export default function QuizStart() {
    const searchParams = useSearchParams();
    const xamindex = searchParams.get('xamindex');
    const cname = searchParams.get('cname');
    const router = useRouter();
    const { Exam, setExam } =  useContext(DashboardContext);
    const [qovercntrl, setqovercntrl] = useState(false);
    const [qindex, setqindex] = useState(0);
    const [clickedans, setclickedans] = useState("");
    const [decision, setdecison] = useState([]);
    const [dispres, setdispres] = useState({});
    const [timeLeft, setTimeLeft] = useState(Exam[xamindex].time * 60); 

    useEffect(() => {
        if (timeLeft <= 0) {
            evaluate();
            return;
        }
        else if (qovercntrl == true)
            return;
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    async function postresult(qdetails) {
        const result = {
            ...qdetails,
            resdec : decision,
            xamname : Exam[xamindex].exam,
            xamid : Exam[xamindex].xmid,
            cname : cname
        }
        console.log(result);
        const resp = await fetch('/api/postresult', {
            method : 'POST',
            body : JSON.stringify(result),
            headers : {
                'Content-Type': 'application/json'
            } 
        });
        const data = await resp.json();

        console.log(data);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return(
            <>{minutes}:{secs < 10 ? "0" : ""}{secs}</>
        );
    };

    function qbtnctrl(btn) {
        setclickedans("");
        setqindex(btn);
    }

    function qnavctrl(dir) {
        if(dir == 0) {
            setclickedans("");
            setqindex(qindex-1);
        }
        else if(dir == 1) {
            setclickedans("");
            setqindex(qindex+1);
        }
    }
    
    function qsubmit() {
        let flag = false , evalt = null;
        if(clickedans == ""){
            alert("Please click on an answer")
            return
        }
        if(clickedans == Exam[xamindex].qstns[qindex].answer)
            evalt = true;
        else
            evalt = false;
        const newdec = decision.map((dec) => {
            if(dec.indx == qindex){
                dec.res = evalt;
                dec.chosen = clickedans;
                flag =true;
            }
            return(dec);
        })
        if(flag){
            setdecison(newdec);
        }
        else {
            const dec = {
                indx : qindex,
                res : evalt,
                chosen : clickedans,
                ans : Exam[xamindex].qstns[qindex].answer,
                cmark : Exam[xamindex].qstns[qindex].correctmark,
                wmark : Exam[xamindex].qstns[qindex].wrongmark
            }
            setdecison([...decision, dec]);
        }
        console.log(decision);
    }

    function evaluate() {
        let markobt = 0, correctno = 0, wrongno = 0;
        for (let i = 0; i < decision.length; i++) {
            if (decision[i].res === true) {
                markobt += decision[i].cmark;
                correctno += 1;
            } else if (decision[i].res === false) {
                markobt += decision[i].wmark;
                wrongno += 1;
            }
        }

        const qdetails = {
            totalno : Exam[xamindex].qstns.length, 
            marktot : Exam[xamindex].totmark,
            markobt : markobt,
            correctno : correctno,
            wrongno : wrongno
        };

        setdispres(qdetails);
        setqovercntrl(true);
        postresult(qdetails);
        console.log(qdetails); 
    }

    return(
        <div className="qstartbody">
            {qovercntrl ? <QuizOver  qdetails={dispres} /> : null}
            <div className="qstartleft">
                <div className="qdetails">
                    <span>
                        <img src={user.src} alt="alt" style={{ width: '30px', height: 'auto' }} />
                        <h2>{cname}</h2>
                    </span>
                    <span>
                        <img src={exam.src} alt="alt" style={{ width: '30px', height: 'auto' }} />
                        <h2>{Exam[xamindex].exam}</h2>
                    </span>
                    <span>
                        <img src={time.src} alt="alt" style={{ width: '30px', height: 'auto' }} />
                        <h2>{formatTime(timeLeft)}</h2>
                    </span>
                </div>
                <div className="qbox">
                    <h5>Question No : {qindex + 1}/{Exam[xamindex].qstns.length} | Correct Answer : {Exam[xamindex].qstns[qindex].correctmark} | Wrong Answer : {Exam[xamindex].qstns[qindex].wrongmark}</h5>
                    <h2>{Exam[xamindex].qstns[qindex].question}</h2>
                    <div className="qoption">
                        <input type="radio" name="quiz" value="A" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "A"} />
                        <label>{Exam[xamindex].qstns[qindex].A}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="B" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "B"} />
                        <label>{Exam[xamindex].qstns[qindex].B}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="C" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "C"} />
                        <label>{Exam[xamindex].qstns[qindex].C}</label><br/>
                    </div>

                    <div className="qoption">
                        <input type="radio" name="quiz" value="D" onChange={(event) => setclickedans(event.target.value)} 
                        checked={clickedans === "D"} />
                        <label>{Exam[xamindex].qstns[qindex].D}</label><br/>
                    </div><br/>

                    <button onClick={() => qnavctrl(1)} disabled={qindex == Exam[xamindex].qstns.length - 1}>
                        <span>Next
                            <img 
                                src={next.src} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />
                        </span>
                    </button>
                    <button onClick={qsubmit} >
                        <span>
                            <img 
                                src={submit.src} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Submit
                        </span>
                    </button>
                    <button onClick={() => qnavctrl(0)} disabled={qindex == 0}>
                        <span>
                            <img 
                                src={back.src} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Previous
                        </span>
                    </button>
                    {decision.map((dec) => {
                        if(dec.indx === qindex)
                            return(<h4>Submitted Ans : {dec.chosen}</h4>)
                    })}
                </div>
                <div className="qdetails" style={{justifyContent : "right"}}>
                    <button onClick={() => router.push('/home/quizdash')}>
                        <span>
                            <img 
                                src={exit.src} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Quit Exam
                        </span>
                    </button>
                    <button onClick={evaluate} >
                        <span>
                            <img 
                                src={xmsubmit.src} 
                                alt="alt" 
                                style={{ width: '16px', height: 'auto' }} />Submit Exam
                        </span>
                    </button>
                </div>
            </div>
            <div className="qstartright">
                <div className="qtime">
                    <h2>Question Navigator</h2>
                    <span>
                        <img src={answ.src} alt="alt" style={{ width: '30px', height: 'auto' }} />
                        <h2>{decision.length}/{Exam[xamindex].qstns.length}</h2>
                    </span>
                </div>
                <div className="qnav">
                    {Exam[xamindex].qstns.map((qn, index) => {
                        let btnclass = "navbtn";
                        decision.map((dec) => {
                            if(dec.indx === index)
                                btnclass += " atmpt";
                        })
                        if(qindex == index)
                            btnclass += " current"
                        return(
                            <button className={btnclass} onClick={() => qbtnctrl(index)}><h3>{index +1}</h3></button>    
                        )
                    })}
                </div>
            </div>
        </div>
    )
}