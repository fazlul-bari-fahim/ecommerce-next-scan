import { NavLink, useNavigate } from "react-router-dom";
import adminStore from "../stores/adminStore";
import logout from "../assets/logout.png"




const SideBarForMobile = () => {


    const { adminLogoutRequest } = adminStore();

    const navigate = useNavigate();


    const handleLogout = async () => {
        await adminLogoutRequest();
        navigate("/login");
    };



    return (
        <div>

            {/* for mobile view */}

            <div className=" bg-[#ed1c23] h-25 fixed bottom-0 left-0 right-0 w-full overflow-x-auto shadow-xl border border-[#e1e1e3] ">
                <div className=" shadow-xl border border-[#e1e1e3] w-max flex flex-row items-center">



                    {/* menu */}
                    <div className=" whitespace-nowrap">
                        <ul className="flex items-center flex-row w-auto text-white">
                            <NavLink to={'/'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                Dashboard
                            </NavLink>

                            <NavLink to={'/create-product'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center  px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30 font-bold" : ""}`}>
                                Create Product
                            </NavLink>


                            <NavLink to={'/all-products'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                All Products
                            </NavLink>


                            <NavLink to={'/category'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center  px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                Category
                            </NavLink>



                            <NavLink to={'/brand'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center  px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                Brand
                            </NavLink>


                            <NavLink to={'/all-orders'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center  px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                All Orders
                            </NavLink>






                            <NavLink to={'profile'} className={({ isActive }) => `w-40 h-20  text-md flex items-center justify-center  px-1 border-r-2 hover:cursor-pointer ${isActive ? "bg-white/30  font-bold" : ""}`}>
                                Profile
                            </NavLink>

                            <button onClick={() => handleLogout()} className="w-40 h-20 gap-3 bg-red-800 text-md flex items-center justify-center px-1 border-r-2 hover:cursor-pointer">

                                <img className=" bottom-2 h-4 w-4" src={logout}></img>
                                Logout
                            </button>






                        </ul>
                    </div>

                    {/* Log out */}





                </div>
            </div>


        </div>
    )
}

export default SideBarForMobile;