import adminRegister from "../../assets/adminRegister.jpg"
import profile from "../../assets/profile.png"

import { useState } from "react"
import adminStore from "../../stores/adminStore"
import { NavLink } from "react-router-dom"







const AdminRegister = () => {
  const {adminRegisterRequest, adminRegisterLoading} = adminStore();

  
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit =async (e)=> {
    e.preventDefault();
    
   adminRegisterRequest({
      email,
      password
    });
    
  };

  return (
    <div className="bg-[#5f017b] h-screen flex items-center justify-center">

        <div className="bg-white/30 h-120 w-180 shadow-lg shadow-[white]/50 rounded-xl border-white/30 border-2 flex flex-row items-center">


          {/* left */}
        {/* image */}
        <div>
            <img className="h-118 w-90 border-2 border-white rounded-lg" src={adminRegister}></img>
        </div>


        {/* Right */}

        <div className="flex flex-col items-center justify-center h-full w-90">
          <div className="flex flex-col gap-3 pb-5">
            <img src={profile} className="h-25 w-25 border-3 border-white rounded-full"></img>
            <h1 className="text-3xl text-white font-bold">Sign Up</h1>
        
          </div>


          <div>

            <form className="flex flex-col" onSubmit={handleSubmit}>    

              <label htmlFor="email" className="text-xl text-white font-bold">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-3 w-70 border-white rounded-lg bg-white/50 py-1 shadow-lg shadow-white/40 px-3" placeholder="Enter your email"/>   

              <label htmlFor="pass" className="text-xl text-white font-bold">Password</label>
              <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} className="border-3 w-70 border-white rounded-lg bg-white/50 py-1 shadow-lg shadow-white/40 px-3" placeholder="Type your password"/> 

            <button type="submit" value="Register" className="bg-white py-1 rounded-md font-bold cursor-pointer mt-7" disabled={adminRegisterLoading}>
            {adminRegisterLoading ? "Registering...":"Register"}
            </button>
            </form>
            <p className="text-white pt-3 px-3">Have an account? <NavLink to={"/login"} className="hover:text-blue-400 hover:font-bold hover:underline">Sign in</NavLink> now.</p>


          </div>
        
        
        
        
        </div>

        

        
        

       
        </div>

    </div>
  )
}

export default AdminRegister;


