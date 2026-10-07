import { NavLink, Outlet } from "react-router-dom"
import logo from "../assets/logo.jpeg"
import Sidebar from "../Components/UserProfile/Sidebar"




const UserLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <div className="h-20 shadow-lg w-full bg-[#a8823b] max-[850px]:w-310 px-5 flex justify-between max-[426px]:justify-start max-[426px]:gap-8 items-center">
                <img className="h-18 rounded-full" src={logo}></img>
                <div className="w-80 flex justify-between">
                    <NavLink className="text-white font-bold" to="/">HOME</NavLink>
                    <NavLink className="text-white font-bold" to="/all-products">All PRODUCT</NavLink>
                    <NavLink className="text-white font-bold" to="/contact">CONTACT</NavLink>
                </div>


                <div>

                </div>


            </div>

            <div className="flex w-full">
                <Sidebar />
                <Outlet />

            </div>
        </div>
    )
}

export default UserLayout