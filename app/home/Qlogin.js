'use client';

import "./Qlogin.css";
import { useRouter } from 'next/navigation';
import log from "../Images/login.png";
import sign from "../Images/sign.png";
import exit from "../Images/exit.png";
import { useContext, useState } from "react";
import { signIn } from "next-auth/react";
import DashboardContext from "../globcontext";

export default function Qlogin() {
    const { login, setlogin } = useContext(DashboardContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    async function handleSubmit(e){
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        if (res.ok) {
            console.log("Success");
            setError(false);
            setlogin(false);
            console.log(login);
        } else {
            setError(true);
        }
    };

    function cancel(){
        if(login)
            setlogin(false);
        else
            router.back();
    }

    return(
        <div className="popbg">
            <div className="qloginbox">
                <img src={log.src} />
                <div className="qlogincont">
                    <form onSubmit={handleSubmit}>
                        <h2>Admin Login</h2>
                        <p>Please Login with Credentials</p>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error ? <p style={{color : "red"}}>Invalid Username or Password</p> : null}
                        <div className="qloginbtn">
                            <button type="button" onClick={cancel}>
                                <span><img src={exit.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Cancel</span>
                            </button>
                            <button type="submit">
                                <span><img src={sign.src} alt="alt" style={{ width: '15px', height: 'auto' }} />Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}