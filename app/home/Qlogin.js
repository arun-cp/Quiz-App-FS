'use client';

import "./Qlogin.css";
import { useRouter } from 'next/navigation';
import done from "@/app/Images/done.gif";
import { useContext, useState } from "react";
import { signIn } from "next-auth/react";
import DashboardContext from "../globcontext";

export default function Qlogin() {
    const { login, setlogin } = useContext(DashboardContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
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

    return(
        <div className="qloginbg">
            <div className="qloginbox">
                <div className="qloginhead">
                    <h2 style={{"margin" : "0px 215px"}}>Login as Admin</h2>
                </div>
                <div className="qloginbody">
                    <form onSubmit={handleSubmit}>
                        <h4>Please Login with Credentials</h4>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className="qloginbtn">
                            <button type="button" onClick={() => setlogin(false)}>Cancel</button>
                            <button type="submit">Login</button>
                        </div>
                        {error ? <p>Invalid Username or Password</p> : null}
                    </form>
                </div>
            </div>
        </div>
    )
}