import airpod from "../../assets/airpod.png"
import larrow from "../../assets/left-arrow.png"
import rarrow from "../../assets/right-arrow.png"
import rarrowwhite from "../../assets/right-arrowwhite.png"
import greenheadphone from "../../assets/headphonegreen.png"
import microphone from "../../assets/microphone.png"
import drone from "../../assets/drone.png"
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
          <div className="h-120 w-300    bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${drone})` }}>


            <h3 className="text-lg text-black">Aerial Innovation</h3>
            <h1 className="text-3xl max-[905px]:text-2xl max-[769px]:text-xl">Explore the World from Above</h1>
            <div className="bg-black h-1 w-50"></div>
            <h2 className="text-gray-600 text-lg w-90">Capture breathtaking aerial photos and videos with powerful drones built for adventure and creativity.</h2>
            <button className="bg-black h-8 w-40 text-white font-bold rounded-lg flex flex-row justify-between items-center px-8">Discover <img className="h-5 w-5" src={rarrowwhite}></img></button>


          </div>
        </div>






        <div className="flex shrink-0 w-full  justify-center items-center snap-center">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${airpod})` }}>


            <h3 className="text-lg text-red-600">Experience Sound</h3>
            <h1 className="text-4xl max-[905px]:text-2xl max-[769px]:text-xl">Freedom with Airpods</h1>
            <div className="bg-red-600 h-1 w-50"></div>
            <h2 className="text-gray-600 text-lg">Unleash Wireless Sound Freedom.</h2>
            <button className="bg-red-600 h-8 w-40 text-white font-bold rounded-lg flex flex-row justify-between items-center px-8">Discover <img className="h-5 w-5" src={rarrowwhite}></img></button>


          </div>
        </div>




        <div className="flex shrink-0 w-full  justify-center items-center snap-center ">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${greenheadphone})` }}>


            <h3 className="text-lg text-black">Premium Audio Collection</h3>
            <h1 className="text-2xl max-[905px]:text-2xl max-[769px]:text-xl">Hear Every Beat in Perfect Clarity</h1>
            <div className="bg-black h-1 w-50"></div>
            <h2 className="text-gray-00 text-md w-90">Experience immersive sound quality.</h2>
            <button className="bg-black h-8 w-40 text-white font-bold rounded-lg flex flex-row justify-between items-center px-8">Discover <img className="h-5 w-5" src={rarrowwhite}></img></button>


          </div>
        </div>



        <div className="flex shrink-0 w-full  justify-center items-center snap-center ">
          <div className="h-120 w-300 bg-center bg-cover rounded-2xl border border-black/20 shadow-inner shadow-black/50 flex flex-col justify-center px-50  gap-3 max-[769px]:w-230 max-[426px]:w-180 max-[376px]:ml-15 max-[321px]:ml-35" style={{ backgroundImage: `url(${microphone})` }}>


            <h3 className="text-lg text-[#680303]">Professional Audio Gear</h3>
            <h1 className="text-3xl text-white">Capture Every Sound with Precision</h1>
            <div className="bg-[#680303] h-1 w-50"></div>
            <h2 className="text-gray-300 text-md w-90">Record crystal-clear vocals and professional-quality audio with microphones designed for creators, streamers, and musicians.</h2>
            <button className="bg-[#680303] h-8 w-40 text-white font-bold rounded-lg flex flex-row justify-between items-center px-8">Discover <img className="h-5 w-5" src={rarrowwhite}></img></button>


          </div>
        </div>




      </div>
    </div>
  )
}

export default FreedomWithAirpods