import "./Header.css";
import headimg from "../Images/headimg.png";
import home from "../Images/home.png";
import user from "../Images/user.png";
import config from "../Images/config.png";
import { useContext , useEffect } from "react";
import DashboardContext from "@/app/globcontext";
import { useRouter } from "next/navigation";
import Qlogin from "./Qlogin";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Header() {
    const { login, setlogin } =  useContext(DashboardContext);
    const { data: session , status} = useSession(); 
    const router = useRouter();

    function sign() {
        if(session)
            signOut({ callbackUrl: "/" })
        else
            setlogin(true)
    }

    return(
        <div className="headmain">
            {login ? <Qlogin /> : null }
            <div className="headbody">
                <img src={headimg.src}></img>
                <div>
                    <button onClick={() => router.push('/') }>
                        <span>
                            <img src={home.src} alt="C" style={{ width: '16px', height: 'auto' }} />Home
                        </span>
                    </button>
                    <button onClick={() => router.push('/home/quizconfig') }>
                        <span>
                            <img src={config.src} alt="C" style={{ width: '16px', height: 'auto' }} />Configure Quiz
                        </span>
                    </button>
                    <button onClick={sign}>
                        <span>
                            <img src={user.src} alt="C" style={{ width: '16px', height: 'auto' }} />{session ? session.user.name : "Sign In"} 
                        </span>
                    </button>
                </div>
            </div>

        </div>
    )
}