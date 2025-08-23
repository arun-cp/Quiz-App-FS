'use client';

import back from "@/app/Images/back.png";
import create from "@/app/Images/create.png";
import qn from "@/app/Images/qn.png";
import analy from "@/app/Images/analyic.png";
import del from "@/app/Images/delete.png";
import edit from "@/app/Images/edit.png";
import loader from "@/app/Images/loading.gif";
import DashboardContext from '@/app/globcontext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import "./QuizConfig.css";
import Quizview from "./Quizview";
import Quizanalytic from "./Quizanalytic";
import Qlogin from "../Qlogin";
import { useSession } from "next-auth/react";

export default function QuizConfig() {
    const { Exam, setExam } =  useContext(DashboardContext);
    const [ result , setresult ] = useState([]);
    const [ clkexam, setclkexam ] = useState(null);
    const [ qviewctrl, setqviewctrl ] = useState(false);
    const [ qanalyticctrl, setanalyticctrl ] = useState(false);
    const [ load, setload ] = useState(false);
    const router = useRouter();
    
    async function getdata(){
        setExam([]);
        setload(true);
        try {
            const res1 = await fetch('/api/getexam');
            const res2 = await fetch('/api/getresult');
            const data1 = await res1.json();
            const data2 = await res2.json();
            setExam(data1)
            setresult(data2)
        } catch (err) {
            setError('Failed to fetch');
        } finally {
            setload(false); 
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const { data: session } = useSession();
    if (!session) 
        return <Qlogin/>;

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

    async function deleteexam(index) {
        const delxam = { ...Exam[index], del: true };
        await patchexam(delxam);
        getdata();
    }

    function clickedanaly(xam) {
        setclkexam(xam);
        setanalyticctrl(true);
    } 

    function clickedview(xam) {
        setclkexam(xam);
        setqviewctrl(true);
    } 

    return(
        <div className="configbody">
            <div className="configtop">
                <h2>Exam Configuration</h2>
                <div>
                    <button onClick={() => router.push('/home')}>
                        <span>
                        <img 
                            src={back.src} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> Back
                        </span>
                    </button>
                    <button onClick={() => router.push('/home/quizconfig/quizsetup')}>
                        <span>
                        <img 
                            src={create.src} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> Create Quiz
                        </span>
                    </button>
                </div>
            </div>
            <div className="configexam">
                {qviewctrl ? <Quizview qns={clkexam.qstns} close={setqviewctrl} /> : null}
                {qanalyticctrl ? <Quizanalytic xam={clkexam} result={result} close={setanalyticctrl}/> : null}
                <h3>Available Exams</h3>
                <hr/>
                {load ? <img src={loader.src} alt="img" style={{ width: '7%', height: 'auto', display: 'block', margin: 'auto' }} /> : null}
                {Exam.map((xam, index) => {
                    if(!xam.del) {
                        return (
                            <div className="xambox" key={index}>
                                <div>
                                    <h3>Exam : {xam.exam}</h3>
                                    <h3>Id : {xam.xmid}</h3>
                                    <h3>Time : {xam.time} mins</h3>
                                </div>
                                <div>
                                    <h3>No of Questions : {xam.qstns.length}</h3>
                                    <h3>Total Mark : {xam.totmark}</h3>
                                </div>
                                <div className="xamboxbtn">
                                    <button onClick={() => clickedanaly(xam)}>
                                        <span>
                                            <img
                                                src={analy.src} 
                                                alt="alt" 
                                                style={{ width: '16px', height: 'auto' }} /> Analytics
                                        </span>
                                    </button>
                                    <button onClick={() => router.push(`/home/quizconfig/quizsetup?exam=${encodeURIComponent(JSON.stringify(xam))}`)}>
                                        <span>
                                            <img
                                                src={edit.src} 
                                                alt="alt" 
                                                style={{ width: '16px', height: 'auto' }} /> Edit Exam
                                        </span>
                                    </button>
                                    <button onClick={() => clickedview(xam)}>
                                        <span>
                                            <img
                                                src={qn.src} 
                                                alt="alt" 
                                                style={{ width: '16px', height: 'auto' }} /> Questions
                                        </span>
                                    </button>
                                    <button onClick={() => deleteexam(index)}>
                                        <span>
                                            <img
                                                src={del.src} 
                                                alt="alt" 
                                                style={{ width: '16px', height: 'auto' }} /> Delete Exam
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            
        </div>
    )
}

