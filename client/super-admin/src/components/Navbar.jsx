
import { NavLink } from "react-router-dom"
import accoutImage from "../assets/account.png"
import nightMode from "../assets/night-mode.png"

const Navbar = () => {
  return (
    <div className="bg-[#f7f7f7] w-full h-12 flex items-center justify-between px-10 shadow-md">
      <div className="flex items-center">

      </div>


      {/* profile & dark mode icon */}

      <div className="flex flex-row items-center justify-between w-25">
        <img src={nightMode} className="h-8 w-8"></img>
        <NavLink to={"/profile"}><img src={accoutImage} className="h-7 w-7 cursor-pointer"></img></NavLink>
      </div>



    </div>
  )
}

export default Navbar