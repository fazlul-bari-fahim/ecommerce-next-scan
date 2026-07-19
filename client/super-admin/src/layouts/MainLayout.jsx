import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
import SideBarForMobile from "../components/SideBarForMobile.jsx";


const MainLayout = () => {
  return (

    <div className="flex flex-row h-screen w-full">
      {/* Sidebar */}
      <div className="h-screen max-[427px]:hidden">
        <Sidebar />
      </div>
      {/* Right side */}
      <div className="flex flex-col flex-1">
        <Navbar />



        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

        <div className=" min-[426px]:hidden">
          <SideBarForMobile />
        </div>





      </div>
    </div>




  );
};

export default MainLayout;