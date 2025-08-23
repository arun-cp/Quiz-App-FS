import atempt from "@/app/Images/atempt.png";
import loader from "@/app/Images/loading.gif";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import QuizConfirm from "./QuizConfirm";
import "./QuizExam.css";

export default function QuiZExam({Exam, load}) {
    const [ qstartctrl, setqstartctrl ] = useState(false);
    const [ indx, setindx ] = useState(null);
    const router = useRouter();

    function clickedexam(index) {
        setindx(index);
        setqstartctrl(true);
        console.log(Exam[indx])
    }

    return(
        <div className="dashexam">
            {qstartctrl ? <QuizConfirm xam={Exam[indx]} index={indx} close={setqstartctrl}/> : null} 
            <h3>Available Exams</h3>
            <hr/>
            <div className="examflex">
                {load ? <img src={loader.src} alt="img" style={{ width: '7%', height: 'auto', display: 'block', margin: 'auto' }} /> : null}
                {Exam.map((xam, index) => {
                    if(!xam.del){
                        return(
                            <div className="flexcont" key={index}>
                                <h2>{xam.exam}</h2>
                                <h3>{xam.qstns.length} Questions</h3>
                                <button onClick={() => clickedexam(index)}>
                                    <span>
                                        <img src={atempt.src} alt="Cart Icon" style={{ width: '18px', height: 'auto' }} /> Attempt Exam
                                    </span>
                                </button>
                            </div>
                        )
                    }}
                )}
            </div>
        </div>
    )
}