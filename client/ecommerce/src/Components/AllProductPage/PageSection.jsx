import { NavLink, useNavigate } from "react-router-dom"
import larrow from "../../assets/left-arrow.png"




const PageSection = () => {

  const navigate = useNavigate();



  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-[#ececec] w-300 max-[1025px]:w-250 max-[769px]:w-180 max-[426px]:w-100  max-[380px]:w-90 max-[321px]:hidden flex justify-between px-5 py-3 my-3">
        <div className="flex flex-row gap-3 ">
          <NavLink className="font-semibold flex flex-row gap-3 items-center" to="/">Home <img className="h-3 w-3 rotate-180" src={larrow}></img> </NavLink>
          <h5 className="text-gray-500">Shop</h5>

        </div>



        <div>
          <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black hover:cursor-pointer flex flex-row items-center gap-2"><img className="h-3 w-3" src={larrow}></img> Return to Previous Page</button>

        </div>

      </div>
    </div>
  )
}

export default PageSection