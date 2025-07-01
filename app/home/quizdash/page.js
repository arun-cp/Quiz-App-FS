'use client';

import back from "@/app/Images/back.png";
import create from "@/app/Images/create.png";
import atempt from "@/app/Images/atempt.png";
import loader from "@/app/Images/loading.gif";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import DashboardContext from '@/app/globcontext';
import QuizConfirm from "./QuizConfirm";
import "./QuizDash.css";

export default function QuizDash() {
    const { Exam, setExam } =  useContext(DashboardContext);
    const [ result , setresult ] = useState([]);
    const [ qstartctrl, setqstartctrl ] = useState(false);
    const [ load, setload ] = useState(false);
    const [ indx, setindx ] = useState(null);
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
    }, [setExam])

    function clickedexam(index) {
        setindx(index);
        setqstartctrl(true);
        console.log(Exam[indx])
    }

    return(
        <div className="dashbody">
            <div className="dashtop">
                <button onClick={() => router.push('/home')}>
                    <span>
                    <img 
                        src={back.src} 
                        alt="Cart Icon" 
                        style={{ width: '15px', height: 'auto' }} /> Back
                    </span>
                </button>
                <button onClick={() => router.push('/home/quizsetup')}>
                    <span>
                    <img 
                        src={create.src} 
                        alt="Cart Icon" 
                        style={{ width: '15px', height: 'auto' }} /> Create Quiz
                    </span>
                </button>
            </div>
            <div className="dashexam">
                {qstartctrl ? <QuizConfirm xam={Exam[indx]} index={indx} close={setqstartctrl}/> : null} 
                <h3>Available Exams</h3>
                <hr/>
                {load ? <img src={loader.src} alt="img" style={{ width: '7%', height: 'auto', display: 'block', margin: 'auto' }} /> : null}
                <div className="examflex">
                    {Exam.map((xam, index) => (
                        <div className="flexcont" key={index}>
                            <h2>{xam.exam}</h2>
                            <h3>{xam.qstns.length} Questions</h3>
                            <button onClick={() => clickedexam(index)}>
                                <span>
                                <img 
                                    src={atempt.src} 
                                    alt="Cart Icon" 
                                    style={{ width: '18px', height: 'auto' }} /> Attempt Exam
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashresult">
                <h3>Results</h3>
                <hr/>
                {load ? <img src={loader.src} alt="img" style={{ width: '7%', height: 'auto', display: 'block', margin: 'auto' }} /> : null}
                <div className="resultflex">
                    {result.map((res, index) => (
                        <div className="rflexcont" key={index}>
                            <h2>{res.cname}</h2>
                            <h3>{res.xamname} </h3>
                            <h3>{(res.markobt/res.marktot)*100 > 0 ? Math.round((res.markobt/res.marktot)*100) : 0 } %</h3>
                            {console.log(res)}
                            <button onClick={() => router.push(`/home/quizdash/quizresult?result=${encodeURIComponent(JSON.stringify(res))}`)} >
                                <span>
                                <img 
                                    src={atempt.src} 
                                    alt="Cart Icon" 
                                    style={{ width: '18px', height: 'auto' }} /> View Details
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}