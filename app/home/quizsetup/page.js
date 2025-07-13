"use client"

import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import "./Quizsetup.css";
import del from "@/app/Images/delete.png";
import create from "@/app/Images/create.png";
import exit from "@/app/Images/exit.png";
import add from "@/app/Images/add.png";
import edit from "@/app/Images/edit.png";
import QuizCreate from "./QuizCreate";

function Quizsetupsearch() {
    const searchParams = useSearchParams();
    const exam = JSON.parse(decodeURIComponent(searchParams.get("exam")));
    const router = useRouter();
    const [qns, setqns] = useState([]);
    const [qctrl, setqctrl] = useState(false);
    const [valid, setvalid] = useState("");
    const xamname = useRef(null);
    const xamtime = useRef(null);
    const qs = useRef({
        "id" : null,
        "question": null,
        "A": null,
        "B": null,
        "C": null,
        "D": null,
        "answer": null,
        "correctmark": null,
        "wrongmark": null
    })

    useEffect(() => {
        if (exam) {
            setqns(exam.qstns);
            if (xamname.current) xamname.current.value = exam.exam;
            if (xamtime.current) xamtime.current.value = exam.time;
        }
    }, [searchParams]);

    async function postexam(xam) {
        const resp = await fetch('/api/postexam', {
            method : 'POST',
            body : JSON.stringify(xam),
            headers : {
                'Content-Type': 'application/json'
            } 
        });
        const data = await resp.json();
        console.log(data);
    }

    async function patchexam(xam) {
        const resp = await fetch('/api/patchexam', {
            method : 'PATCH',
            body : JSON.stringify(xam),
            headers : {
                'Content-Type': 'application/json'
            } 
        });
        const data = await resp.json();
        console.log(data);
    }

    function addexam() {
        if(xamname.current.value === "" || xamtime.current.value === "" || qns.length == 0)
            setvalid("Please Fill all fields");
        else {
            setvalid("");
            let total = 0;
            for(let x=0 ; x<qns.length ; x++) {
                total = total + qns[x].correctmark; 
            }
            const xam = {
                xmid : Math.floor(1000 + Math.random() * 9000),
                exam : xamname.current.value,
                time : xamtime.current.value,
                totmark : total,
                del : false,
                qstns : qns
            }
            if(exam){
                const delxam = { ...exam, del: true };
                patchexam(delxam);
            }
            postexam(xam);
            setqctrl(true);
        }
    }

    function addqstn(e) {
        e.preventDefault();
        setvalid("");
        console.log(qs.current.value)
        const newqn = {
            id : Math.floor(1000 + Math.random() * 9000),
            question: qs.current.question.value,
            A: qs.current.A.value,
            B: qs.current.B.value,
            C: qs.current.C.value,
            D: qs.current.D.value,
            answer : qs.current.answer.value,
            correctmark: parseInt(qs.current.correctmark.value, 10),
            wrongmark: parseInt(qs.current.wrongmark.value, 10)
        };
        console.log(newqn)
        setqns([...qns, newqn]);
        console.log(qns)
    }

    function editqstn(qn) {
        qs.current.question.value = qn.question;
        qs.current.A.value = qn.A;
        qs.current.B.value = qn.B;
        qs.current.C.value = qn.C;
        qs.current.D.value = qn.D;
        qs.current.answer.value = qn.answer;
        qs.current.correctmark.value = qn.correctmark;
        qs.current.wrongmark.value = qn.wrongmark;
        delqstn(qn.id);
    }

    function delqstn(delid) {
        setqns(qns.filter(qn => delid !== qn.id))
    }

    return(
        <div className="setupbody">
            {console.log(exam)}
            <div className="setupleft">
                {qctrl ? <QuizCreate edit={exam} /> : null}
                <h3>Setup Quiz Window</h3>
                <hr/>
                <form onSubmit={addqstn}>
                    <div className="inputcontain">
                        <label>Question :</label>
                        <textarea style={{"height" : "70px"}} placeholder="Enter Question" type="text" ref={(ip) => (qs.current.question = ip)} required />
                    </div>
                    <div className="inputcontain">
                        <label>Option A : </label>
                        <input type="text" placeholder="A" ref={(ip) => (qs.current.A = ip)} defaultValue="" required />
                    </div>
                    <div className="inputcontain">
                        <label>Option B : </label>
                        <input type="text" placeholder="B" ref={(ip) => (qs.current.B = ip)} required />
                    </div>
                    <div className="inputcontain">
                        <label>Option C : </label>
                        <input type="text" placeholder="C" ref={(ip) => (qs.current.C = ip)} required />
                    </div>
                    <div className="inputcontain">
                        <label>Option D : </label>
                        <input type="text" placeholder="D" ref={(ip) => (qs.current.D = ip)} required />
                    </div>
                    <div className="inputcontain">
                        <label>Correct Answer : </label>
                        <select ref={(ip) => (qs.current.answer = ip)} defaultValue="" required>
                            <option value="" disabled>Select Option</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <div className="inputcontain">
                        <label>Correct Answer Mark : </label>
                        <input type="number" placeholder="+ Positive Mark" ref={(ip) => (qs.current.correctmark = ip)} required />
                        <label>Wrong Answer Mark : </label>
                        <input type="number" placeholder="- Negative Mark" ref={(ip) => (qs.current.wrongmark = ip)} required />
                    </div>
                    <button type="submit">
                        <span>
                        <img 
                            src={add.src} 
                            alt="Cart Icon" 
                            style={{ width: '16px', height: 'auto' }} />Add Question
                        </span>
                    </button>
                </form>
            </div>
            <div className="setupright">
                <div className="setuprightbox">
                    <h3>Questions </h3>
                    <hr/>
                    {qns.map((qn, index) => (
                        <div className="sqbox" key={index}>
                            <div>
                                <p><b>Q. </b>{qn.question}</p> 
                                <p><b>A.</b>{qn.A} &nbsp; <b>B.</b>{qn.B} &nbsp; <b>C.</b>{qn.C} &nbsp; <b>D.</b>{qn.D}</p> 
                                <p><b>Correct Ans : </b>{qn.answer} &nbsp; <b>Marks(+/-) : </b>{qn.correctmark} / {qn.wrongmark}</p>
                            </div>
                            <div >    
                                <button onClick={() => delqstn(qn.id)}>
                                    <span><img style={{"width" : "95%", "height" : "auto"} } src={del.src} /> </span>
                                </button>
                                <button onClick={() => editqstn(qn)}>
                                    <span><img style={{"width" : "95%", "height" : "auto"} } src={edit.src} /> </span>
                                </button>
                            </div>    
                        </div>
                    ))}
                </div>
                <div className="setuprightbottom">
                    <div>
                        <label>Exam Name :</label>
                        <input type="text" placeholder="Enter Exam Name" ref={xamname} required />
                    </div>
                    <div>
                        <label>Time :</label>
                        <input type="number" placeholder="Enter Time in minutes" ref={xamtime} required />
                    </div>
                    <button onClick={() => router.push('/home')}>
                        <span>
                        <img 
                            src={exit.src} 
                            alt="Cart Icon" 
                            style={{ width: '16px', height: 'auto' }} />Cancel
                        </span>
                    </button>
                    <button onClick={addexam}>
                        <span>
                        <img 
                            src={create.src} 
                            alt="Cart Icon" 
                            style={{ width: '16px', height: 'auto' }}/>Create Quiz
                        </span>
                    </button>
                </div>
                {valid === "" ? "" : alert(valid)}  
            </div>
        </div>
    )
}

export default function Quizsetup() {
  return (
    <Suspense>
      <Quizsetupsearch />
    </Suspense>
  )
}