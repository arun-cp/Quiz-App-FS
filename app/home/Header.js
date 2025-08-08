import "./Header.css";
import headimg from "../Images/headimg.png";
import logout from "../Images/logout.png";
import { motion } from "motion/react";
import user from "../Images/user.png";
import { useContext , useEffect } from "react";
import DashboardContext from "@/app/globcontext";
import Qlogin from "./Qlogin";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header() {
    const { login, setlogin } =  useContext(DashboardContext);
    const { data: session , status} = useSession(); 

    function sign() {
        if(session)
            signOut({ callbackUrl: "/" })
        else
            setlogin(true)
    }

    return(
        <motion.div className="headmain"
            initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                delay: 1,
                ease: [0, 0.71, 0.2, 1.01],
            }} >
            {login ? <Qlogin /> : null }
            <div className="headbody">
                <img src={headimg.src}></img>
                <div>
                    {session ? <h3><span><img src={user.src} alt="Cart Icon" style={{ width: '15px', height: 'auto' }} />{session.user.name}</span></h3> : null}
                    <button onClick={sign}>
                    <span>
                        <img 
                            src={session != null ? logout.src : user.src} 
                            alt="Cart Icon" 
                            style={{ width: '15px', height: 'auto' }} /> {session ? "Log Out" : "Log In"} 
                    </span>
                    </button>
                </div>
            </div>

        </motion.div>
    )
}