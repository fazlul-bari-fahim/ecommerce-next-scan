import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserStore from "../Store/UserStore";

const UserLogin = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLoginLoading, userLoginRequest } = UserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await userLoginRequest({
            email,
            password,
        });

        if (result === true) {
            navigate("/dashboard-profile")
        }
    };







    return (
        <div>
            <div className=" h-screen flex justify-center items-center">

                <div className="border border-gray-300 shadow-xl  w-150 h-100 px-10 py-15 flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-4xl font-semibold">Login Here </h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="someone@gamil.com" className="border w-80 h-8 px-2 py-1" type="text" />
                        <input id="password" value={password} placeholder="#hkAl!@k&7" onChange={(e) => setPassword(e.target.value)} className="border w-80 h-8 px-2 py-1" type="password" />
                        <button type="submit" className="bg-black text-white py-1 hover:bg-black/80 cursor-pointer">{userLoginLoading ? "Logining..." : "Login"}</button>

                    </form>
                    <div>
                        <h1>New to the Platfrom ? <Link to="/dashboard-profile/register" className="text-blue-700 border-b">Register</Link></h1>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserLogin