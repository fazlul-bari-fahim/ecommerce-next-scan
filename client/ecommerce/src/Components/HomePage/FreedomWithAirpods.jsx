import herotwo from "../../assets/herotwo.png"
import larrow from "../../assets/left-arrow.png"
import rarrow from "../../assets/right-arrow.png"
import herothree from "../../assets/herothree.png"
import herofour from "../../assets/herofour.png"
import heroone from "../../assets/heroone.png"
import { useRef } from "react"




const FreedomWithAirpods = () => {


  const scrollRef = useRef(null);

  const scrollleft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",

    })
  };


  const scrollReight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",

    })
  }














  return (
    <div className="relative w-full my-10 overflow-hidden max-[426px]:hidden">

      <button className="hover:bg-white hover:border top-60 h-10 w-10 absolute left-50 max-[1270px]:left-10 max-[426px]:left-0 mx-3 my-2 rounded-full hover:cursor-pointer" onClick={scrollleft}><img className="h-8 w-8  " src={larrow}></img></button>
      <button className="hover:bg-white hover:border top-60 h-10 w-10 absolute left-300 max-[1270px]:left-290 max-[1215px]:left-280 max-[1110px]:left-270 max-[1025px]:left-230 max-[769px]:left-170 max-[650px]:left-150 max-[590px]:left-130 max-[530px]:left-110 max-[460px]:left-90 max-[426px]:left-80 max-[321px]:left-50 mx-3 my-2 rounded-full hover:cursor-pointer flex justify-center items-center" onClick={scrollReight}><img className="h-8 w-8 " src={rarrow}></img></button>

      <div ref={scrollRef} className="h-auto w-full flex flex-row gap-20  items-center my-10 overflow-x-auto scrollbar-none snap-x snap-mandatory">





        <div className="flex shrink-0 w-full  justify-center items-center snap-center">
          <div className="h-120 w-300    bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${heroone})` }}>




          </div>
        </div>






        <div className="flex shrink-0 w-full  justify-center items-center snap-center">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${herotwo})` }}>




          </div>
        </div>




        <div className="flex shrink-0 w-full  justify-center items-center snap-center ">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${herothree})` }}>




          </div>
        </div>



        <div className="flex shrink-0 w-full  justify-center items-center snap-center ">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${herofour})` }}>



          </div>
        </div>




      </div>
    </div>
  )
}

export default FreedomWithAirpods