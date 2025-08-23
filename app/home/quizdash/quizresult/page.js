'use client';

import { Suspense } from 'react'
import { useContext, useEffect, useState } from 'react';
import DashboardContext from '@/app/globcontext';
import wrong from "@/app/Images/wrong.png";
import correct from "@/app/Images/correct.png";
import exit from "@/app/Images/exit.png";
import "./QuizResult.css";
import { useRouter, useSearchParams } from 'next/navigation';

function QuizResultSearch() {
    const router = useRouter();
    const { Exam, setExam } =  useContext(DashboardContext);
    const searchParams = useSearchParams();
    const result = JSON.parse(decodeURIComponent(searchParams.get("result")));
    const xamindex = Exam.findIndex((exam) => exam.xmid === result.xamid);
    console.log(xamindex)

    return(
        <div className="resultbody">
            <div className="restop">
                <h2>Result Dashboard</h2>
                <button onClick={() => router.push('/home/quizdash')} >
                    <span>
                        <img 
                            src={exit.src} 
                            alt="alt" 
                            style={{ width: '16px', height: 'auto' }} /> Exit
                    </span>
                </button>
            </div>
            <div className="resmain">
                <div className="rma">
                    <h3>Name : {result.cname}</h3>
                    <h3>Exam : {result.xamname}</h3>
                    <h3>Marks : {result.markobt} / {result.marktot}</h3>
                </div>
                <div className="rmb">
                    <h3>Total Questions : {result.totalno}</h3>
                    <h3>Correct No : {result.correctno}</h3>
                    <h3>Wrong No : {result.wrongno}</h3>
                </div>
                <div className="circ">
                    <h2>{(result.markobt/result.marktot)*100 > 0 ? Math.round((result.markobt/result.marktot)*100) : 0}%</h2>
                </div>
            </div>
            <div className="resdet">
                <h3>Detailed View </h3>
                <hr/>
                {Exam[xamindex].qstns.map((qn, index) => {
                    let decision = null;
                    for(let i=0 ; i<result.resdec.length ; i++) {
                        if(index === result.resdec[i].indx)
                            decision = result.resdec[i];
                    }
                    return(
                        <div className="resqn" key={index}>
                            <div className="rqa">
                                <p><b>Q.</b>{qn.question}</p> 
                                <p><b>A.</b>{qn.A} &nbsp; <b>B.</b>{qn.B}</p>
                                <p><b>C.</b>{qn.C} &nbsp; <b>D.</b>{qn.D}</p> 
                                <p><b>Correct Ans : </b>{qn.answer} &nbsp; <b>Marks(+/-) : </b>{qn.correctmark} / {qn.wrongmark}</p>
                            </div>
                            <div className="rqb">
                                <img src={(decision ? decision.res === true ? correct.src : wrong.src : null)}/>
                                {decision ? <h5>{decision.res === true ? decision.cmark  : decision.wmark} Mark</h5> : null}
                                {console.log(decision)}
                            </div>    
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function QuizResult() {
  return (
    <Suspense>
      <QuizResultSearch />
    </Suspense>
  )
}