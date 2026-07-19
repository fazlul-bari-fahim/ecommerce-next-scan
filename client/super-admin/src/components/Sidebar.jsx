import { NavLink, useNavigate } from "react-router-dom";
import logoLight from "../assets/logolight.png"
import { ChevronLeft } from "lucide-react";
import logout from "../assets/logout.png"
import adminStore from "../stores/adminStore";



function Sidebar() {


  const { adminLogoutRequest } = adminStore();

  const navigate = useNavigate();


  const handleLogout = async () => {
    await adminLogoutRequest();
    navigate("/login");
  };


  return (
    <div>
      {/* for desktop & tab view */}
      <div className="bg-[#ed1c23]  h-screen w-40 shadow-xl border border-[#e1e1e3] flex flex-col items-center">

        {/* logo */}
        <div>
          <img className="h-25 w-25" src={logoLight}></img>
        </div>

        {/* menu */}
        <div className="pt-5 w-auto">
          <ul className="flex items-center flex-col gap-3 w-auto text-white">
            <NavLink to={'/'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />Dashboard
            </NavLink>

            <NavLink to={'/create-product'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30 font-bold" : ""}`}>
              <ChevronLeft />Create Product
            </NavLink>


            <NavLink to={'/all-products'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />All Products
            </NavLink>


            <NavLink to={'/category'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />Category
            </NavLink>



            <NavLink to={'/brand'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />Brand
            </NavLink>


            <NavLink to={'/all-orders'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />All Orders
            </NavLink>






            <NavLink to={'profile'} className={({ isActive }) => `w-40 text-md max-[1000px]:text-sm flex flex-row items-center justify-start gap-1 py-1 px-1  rounded-lg hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
              <ChevronLeft />Profile
            </NavLink>






          </ul>
        </div>

        {/* Log out */}

        <div className="relative pt-30">
          <img className="absolute left-30 bottom-2 h-4 w-4" src={logout}></img>

          <button onClick={() => handleLogout()} className="h-8 w-40 rounded-lg bg-red-800 text-white font-bold hover:cursor-pointer shadow-md shadow-black/40 hover:bg-red-600"> Logout</button>


        </div>



      </div>


    </div>
  )
}

export default Sidebar;