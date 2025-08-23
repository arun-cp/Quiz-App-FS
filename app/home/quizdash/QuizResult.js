import atempt from "@/app/Images/atempt.png";
import loader from "@/app/Images/loading.gif";
import { useRouter } from 'next/navigation';
import "./QuizResult.css";

export default function QuizResult({result, load}) {
    const router = useRouter();
    
    return(
        <div className="dashresult">
            <h3>Results</h3>
            <hr/>
            {load ? <img src={loader.src} alt="img" style={{ width: '7%', height: 'auto', display: 'block', margin: 'auto' }} /> : null}
            <div className="resultflex">
                {result.map((res, index) => (
                    <div className="rflexcont" key={index}>
                        <h2>{res.cname}</h2>
                        <h3>{res.xamname} </h3>
                        <h3>{(res.markobt/res.marktot)*100 > 0 ? Math.round((res.markobt/res.marktot)*100) : 0 } %</h3>
                        {console.log(res)}
                        <button onClick={() => router.push(`/home/quizdash/quizresult?result=${encodeURIComponent(JSON.stringify(res))}`)} >
                            <span>
                                <img src={atempt.src} alt="Cart Icon" style={{ width: '18px', height: 'auto' }} /> View Details
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}