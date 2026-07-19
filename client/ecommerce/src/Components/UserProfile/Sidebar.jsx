import { NavLink, useNavigate } from "react-router-dom"
import user from "../../assets/user (1).png"
import order from "../../assets/booking.png"
import UserStore from "../../Store/UserStore"

const Sidebar = () => {

    const { userLogoutRequest } = UserStore();

    const navigate = useNavigate();

    const logoutHandle = async () => {
        const result = await userLogoutRequest();
        if (result) {
            navigate("/")



        }

    };


    return (
        <div>
            <div className="bg-white border border-gray-100 shadow-lg w-50 max-[426px]:w-30 h-full flex flex-col justify-start px-5 py-10">
                <ul className="flex flex-col gap-3">
                    <NavLink to="/dashboard-profile" end className={({ isActive }) => ` text-lg font-semibold ${isActive ? "rounded-r-xl border-l-4 border-red-600 bg-gray-200" : "border-l-4 border-white"} `}><li className="flex gap-2 px-2 items-center py-2 "><img className="h-5" src={user}></img><h3 className="max-[426px]:hidden">Profile</h3></li></NavLink>
                    <NavLink to="/dashboard-profile/all-orders" className={({ isActive }) => ` text-lg font-semibold ${isActive ? "rounded-r-xl border-l-4 border-red-600 bg-gray-200" : "border-l-4 border-white"} `}><li className="flex  gap-2 px-2 items-center py-2"><img className="h-5" src={order}></img><h3 className="max-[426px]:hidden">All Order</h3></li></NavLink>




                </ul>
                <button onClick={() => logoutHandle()} className="bg-red-600 rounded-sm text-white font-semibold py-1 shadow-md hover:bg-red-800 cursor-pointer mt-50 transition-all active:scale-75 duration-500">Logout</button>

            </div>
        </div>
    )
}

export default Sidebar