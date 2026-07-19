import { KeyRound, Mail } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import adminStore from "../../stores/adminStore";
import { IsEmpty } from "../../helpers/helper";
import { useState } from "react";
import { toast } from "react-hot-toast";


const AdminLogin = () => {

  const navigate = useNavigate();

  const { adminLoginLoading, adminLoginRequest } = adminStore();
  const [data, setData] = useState({ email: "", password: "" });


  const userSubmit = async (e) => {
    e.preventDefault();         // This stops the page from reloading.  Normally when you click submit: browser reload

    if (data?.email.length === 0) {

      return toast.error("Email is required")

    } else if (data?.password.length === 0) {
      return toast.error("Password is required");
    }


    const res = await adminLoginRequest(data);



    if (res) {
      navigate("/")
    }
  }





  return (
    <div className="bg-[url('/src/assets/white3d.jpg')] bg-cover bg-center h-screen flex justify-center items-center">


      {/* Box */}
      <div className="min-[426px]:bg-[url('/src/assets/HOMe.png')] max-[426px]:bg-white h-120 w-200 max-[426px]:w-70 max-[426px]:h-80 max-[426px]:rounded-2xl max-[426px]:pr-8 max-[769px]:w-148 rounded-sm border border-[#ed1d24] shadow-2xl shadow-[#ed1d24] flex flex-row justify-start items-center" >

        {/* left */}
        <div className=" h-120 w-100 max-[769px]:w-124 max-[426px]:hidden">

        </div>

        {/* Right */}
        <div className="h-120 w-100 max-[769px]:w-124 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-[#ed1d24] mb-8 max-[769px]:ml-5">Admin Login </h1>
          <form className="relative flex flex-col  gap-2">
            <label htmlFor="email"><Mail className="text-[#ed1d24] absolute top-4 left-50" /></label>
            <input onChange={(e) => setData({ ...data, email: e.target.value })} type="eamil" id="email" placeholder="Enter your email" className="max-[769px]:ml-8 border-2 border-[#ed1d24] placeholder:text-[#ed1d24]  py-2 px-2 rounded-xl w-60 max-[769px]:w-50 focus:ring-red-300 focus:outline-none  focus:border-red-500 focus:ring-3 " />

            <label htmlFor="pasword"><KeyRound className="text-[#ed1d24] absolute top-20 left-50" /></label>
            <input onChange={(e) => setData({ ...data, password: e.target.value })} type="password" id="pasword" placeholder="Type your password" className="max-[769px]:ml-8 border-2 border-[#ed1d24] placeholder:text-[#ed1d24]  py-2 px-2 rounded-xl w-60 max-[769px]:w-50 focus:ring-red-300 focus:outline-none  focus:border-red-500 focus:ring-3" />

            <button disabled={adminLoginLoading}  // Button will be disabled (not clickable) when loading is true
              onClick={userSubmit} type="submit" className="btn bg-[#ed1d24] text-white text-lg w-60 max-[769px]:w-50 max-[769px]:ml-8 rounded-lg mt-5 cursor-pointer">
              {
                adminLoginLoading ? "Logining..." : "Login"
              }
            </button>

          </form>
          <p className="pt-3 text-gray-700">No account? <NavLink className="hover:text-blue-600 hover:underline" to={"/register"}>Sign up</NavLink>  now.</p>
          <div>




          </div>


        </div>

      </div>




    </div>
  )
}

export default AdminLogin