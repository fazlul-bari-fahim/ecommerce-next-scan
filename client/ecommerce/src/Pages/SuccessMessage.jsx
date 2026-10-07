import tick from "../assets/tick.png"
import arrow from "../assets/arrow.png"
import { useNavigate } from "react-router-dom"


const SuccessMessage = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen">
            <div className="bg-green-200 flex flex-col gap-3 justify-center items-center px-3 py-4 rounded-2xl shadow-lg border-3 border-green-500 w-130">
                <div className="flex gap-5">
                    <img className="h-15 w-15" src={tick}></img>

                </div>
                <h1 className="text-2xl font-semibold">Thank You for Contacting Us!</h1>
                <h3 className="w-100 text-[12px] text-center">We have received your request and our support team will review it as soon as possible. One of our representatives will get back to you shortly.</h3>
                <button onClick={() => navigate("/all-products")} className="bg-green-800 hover:bg-green-900 text-white px-3 py-2 font-semibold rounded-xl cursor-pointer shadow-xl flex justify-center items-center gap-2"><img className="h-4 rotate-180" src={arrow}></img> Continue Shopping</button>
            </div>
        </div>
    )
}

export default SuccessMessage
