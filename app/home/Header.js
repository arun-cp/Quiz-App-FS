import "./Header.css";
import headimg from "../Images/headimg.png";

export default function Header() {
    return(
        <div className="headmain">
            <img src={headimg.src}></img>
        </div>
    )
}