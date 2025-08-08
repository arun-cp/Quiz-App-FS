'use client';

import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import "./Home.css";
import quizstart from "../Images/quizstart.png";
import quizsetup from "../Images/quizsetup.png";

export default function Home() {
  const router = useRouter();
    return(
        <motion.div className="homebody"
			initial={{ opacity: 0, y: 70 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 2,
				delay: 1,
				ease: [0, 0.71, 0.2, 1.01],
			}} >
			<div onClick={() => router.push('/home/quizconfig')}> 
				<span style={{display : "block"}}><img src={quizsetup.src}></img><h2>Setup Quiz</h2></span>
			</div><br/>
			<div onClick={() => router.push('/home/quizdash')}>
				<span style={{display : "block"}}><img src={quizstart.src}></img><h2>Start Quiz</h2></span>
			</div>
      	</motion.div>
    )

}