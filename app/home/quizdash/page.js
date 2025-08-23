'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import DashboardContext from '@/app/globcontext';
import QuizExam from "./QuizExam";
import QuizResult from "./QuizResult";
import "./QuizDash.css";

export default function QuizDash() {
    const { Exam, setExam } =  useContext(DashboardContext);
    const [ result , setresult ] = useState([]);
    const [ select , setselect ] = useState("xam");
    const [ load, setload ] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
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
        getdata();
    }, [])

    return(
        <div className="dashbody">
            <div className="dashtop">
                <h2>Dashboard</h2>
                <div className="dashnav">
                    <div className={select == "xam" ? "active" : undefined} onClick={() => setselect("xam")}>
                        <h3>Exam</h3>
                    </div>
                    <div className={select == "res" ? "active" : undefined} onClick={() => setselect("res")}>
                        <h3>Result</h3>
                    </div>
                </div>
            </div>
            {select == "xam" ? <QuizExam Exam={Exam} load={load} /> : <QuizResult result={result} load={load} />}
        </div>
    )
}

