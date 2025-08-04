'use client';

import { useRouter } from 'next/navigation';
import "./Home.css";
import quizstart from "../Images/quizstart.png";
import quizsetup from "../Images/quizsetup.png";

export default function Home() {
  const router = useRouter();
    return(
        <div className="homebody" >
                <div onClick={() => router.push('/home/quizconfig')}> 
                  <span style={{display : "block"}}><img src={quizsetup.src}></img><h2>Setup Quiz</h2></span>
                </div><br/>
                <div onClick={() => router.push('/home/quizdash')}>
                  <span style={{display : "block"}}><img src={quizstart.src}></img><h2>Start Quiz</h2></span>
                </div>
            </div>
    )

}