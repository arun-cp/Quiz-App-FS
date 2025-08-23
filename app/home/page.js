'use client';

import { useRouter } from 'next/navigation';
import { motion } from "motion/react";
import "./Home.css";
import quizstart from "../Images/quizstart.png";
import homimg from "../Images/homeimg.png";
import quizsetup from "../Images/quizsetup.png";
import about from "../Images/about.png";
import start from "../Images/start.png";
import setup from "../Images/setup.png";

export default function Home() {
  const router = useRouter();
    return(
        <motion.div className="homebody" initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }}transition={{duration: 2,delay: 1,ease: [0, 0.71, 0.2, 1.01] }} >
			<div className="homeleft">
				<h1>Master Every Quiz in One Click</h1>
				<p>Create and play quizzes like never before. Fun, fast, and built for everyone</p>
				<p>Join for Free</p>
				<div className="homebtn">
					<button onClick={() => router.push('/home/quizconfig')}>
						<span><img src={setup.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Setup Quiz</span>
					</button>
					<button onClick={() => router.push('/home/quizdash')}>
						<span><img src={start.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Start Quiz</span>
					</button>
				</div>
				<div className="homecont">
					<div>
						<img src={about.src} style={{ width: '25%', height: 'auto' }} />
						<h3>About Us</h3>
						<p>QuizMaster is your one-stop solution for creating, hosting, and enjoying quizzes.
          					Whether for fun, learning, or competition, our platform makes it easy and engaging.</p>
					</div>
					<div>
						<img src={quizstart.src} style={{ width: '25%', height: 'auto' }} />
						<h3>Quiz Start</h3>
						<p>Ready to test your knowledge? Jump right in and challenge yourself with exciting quizzes.
							Track your score, beat the timer, and see how you rank among other participants!</p>
					</div>
					<div>
						<img src={quizsetup.src} style={{ width: '25%', height: 'auto' }} />
						<h3>Quiz Setup</h3>
						<p>Design your quiz in just a few clicks! Add multiple type question,
							and customize timer. Whether it’s for learning or fun, 
							our intuitive setup makes quiz creation effortless.</p>
					</div>
				</div>
			</div>
			<img src={homimg.src} />
      	</motion.div>
    )

}