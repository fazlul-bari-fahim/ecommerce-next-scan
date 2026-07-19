import hero1 from "../../assets/hero2.png"
import hero4 from "../../assets/hero4.png"
import hero5 from "../../assets/hero5.png"
import store from "../../assets/store.png"
import delivery from "../../assets/fast-delivery (1).png"
import insurance from "../../assets/insurance.png"
import payment from "../../assets/credit-card.png"
import { useEffect, useState } from "react"
import HotDealStore from "../../Store/HotDealStore"
import { fileURL } from "../../Helpers/Config.js"
import { NavLink } from "react-router-dom"



const Hero = () => {


  const [herosec, setHerosec] = useState("hero1");



  const { getHotDealProduct, getHotDealRequest } = HotDealStore();

  const [currentHotDeal, setCurrentHotDeal] = useState(0);

  const reverseIndex = getHotDealProduct.length - 1 - currentHotDeal;



  useEffect(() => {
    if (!getHotDealProduct?.length) return;

    const interval = setInterval(() => {
      setCurrentHotDeal((prev) => (prev + 1) % getHotDealProduct.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [getHotDealProduct]);



  useEffect(() => {
    const fetchData = async () => {
      await getHotDealRequest();

    };
    fetchData();

  }, []);




  useEffect(() => {
    const slides = ["hero1", "hero2", "hero3"];

    const interval = setInterval(() => {
      setHerosec((current) => {
        const currentIndex = slides.indexOf(current);
        const nextIndex = (currentIndex + 1) % slides.length;
        return slides[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  // count down 

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });





  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      // Start date (change this to your desired starting point)
      const startDate = new Date("2026-07-10T00:00:00");

      // 3 days in milliseconds
      const cycle = 3 * 24 * 60 * 60 * 1000;

      // Time passed since start date
      const elapsed = now - startDate;

      // Time remaining until next 3-day cycle
      const remaining = cycle - (elapsed % cycle);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);









  return (
    <div className="px-10 my-10 max-[1285px]:px-2 flex flex-col justify-center items-center">

      {/* 1st section */}
      <div className="flex flex-row max-[1219px]:flex-col  justify-between max-[1219px]:justify-center items-center gap-8 max-[1285px]:gap-2 ">

        <div>
          {
            herosec === "hero1" && (
              <div className="h-110 w-200 max-[700px]:w-150 max-[770px]:w-180 max-[426px]:w-105 max-[380px]:w-90 max-[321px]:w-80 border border-black/30 px-10 py-20 flex flex-col gap-5" style={{ backgroundImage: `url(${hero1})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="flex gap-3">
                  <div className="bg-red-600 w-1 h-50">

                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-semibold w-80 max-[380px]:w-70 max-[426px]:text-[20px]">SoundBox Pro Wireless Bluetooth Speaker</h1>
                    <h1 className="text-lg font-semibold text-black/40 max-[426px]:text-[12px]">Experience powerful sound with deep bass</h1>
                    <button className="bg-red-600 w-30 h-10 text-white font-semibold">Shop Now</button>
                  </div>
                </div>
                <div className="flex gap-5 justify-center mt-13">
                  <button onClick={() => setHerosec("hero1")} className="h-5 w-5 bg-red-600 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero2")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero3")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                </div>
              </div>
            )
          }

          {
            herosec === "hero2" && (
              <div className=" h-110 w-200 max-[770px]:w-180 max-[426px]:w-105 max-[380px]:w-90  border max-[321px]:w-80 border-black/30 px-10 py-20 flex flex-col gap-5" style={{ backgroundImage: `url(${hero4})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="flex gap-3">
                  <div className="bg-red-600 w-1 h-50">

                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-semibold w-80 max-[380px]:w-70 max-[426px]:text-[20px]">Latest Gadgets Collection</h1>
                    <h1 className="text-lg font-semibold text-black/40 max-[426px]:text-[12px]">Discover innovative technology</h1>
                    <button className="bg-red-600 w-30 h-10 text-white font-semibold">Shop Now</button>
                  </div>
                </div>
                <div className="flex gap-5 justify-center mt-13">
                  <button onClick={() => setHerosec("hero1")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero2")} className="h-5 w-5 bg-red-600 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero3")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                </div>
              </div>
            )
          }

          {
            herosec === "hero3" && (
              <div className=" h-110 w-200 max-[770px]:w-180 max-[426px]:w-105 max-[380px]:w-90  max-[321px]:w-80 border border-black/30 px-10 py-20 flex flex-col gap-5" style={{ backgroundImage: `url(${hero5})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="flex gap-3">
                  <div className="bg-red-600 w-1 h-50">

                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-semibold w-80 max-[380px]:w-70 max-[426px]:text-[20px]">Never Run Out of Power</h1>
                    <h1 className="text-lg font-semibold text-black/40 max-[426px]:text-[12px]">Compact design, massive capacity</h1>
                    <button className="bg-red-600 w-30 h-10 text-white font-semibold">Shop Now</button>
                  </div>
                </div>
                <div className="flex gap-5 justify-center mt-13">
                  <button onClick={() => setHerosec("hero1")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero2")} className="h-5 w-5 bg-gray-50 rounded-full cursor-pointer"></button>
                  <button onClick={() => setHerosec("hero3")} className="h-5 w-5 bg-red-600 rounded-full cursor-pointer"></button>
                </div>
              </div>
            )
          }
        </div>



        <div className="flex">
          {
            getHotDealProduct?.length > 0 && (
              <NavLink to={`/single-products/${getHotDealProduct[currentHotDeal]?.[0]?._id}`} className="border border-black/30 w-100 h-110 max-[770px]:w-90 max-[426px]:w-50  max-[380px]:w-40 flex flex-col cursor-pointer items-center py-5 px-3 bg-gray-100">
                <img className=" h-50 w-auto" src={`${fileURL}/${getHotDealProduct[currentHotDeal]?.[0]?.big_image}`}></img>
                {/* Time */}

                <div className="flex justify-center gap-5 max-[535px]:gap-3 w-full  py-3 mt-3 bg-red-600 border-2 border-black">
                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.days).padStart(2, "0")}</h3>
                    <h3 className="text-gray-300 max-[535px]:text-[8px]">DAYS</h3>
                  </div>

                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.hours).padStart(2, "0")}</h3>
                    <h3 className="text-gray-300 max-[535px]:text-[8px]">HOURS</h3>
                  </div>

                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.minutes).padStart(2, "0")}</h3>
                    <h3 className="text-gray-300 max-[535px]:text-[8px]">MINS</h3>
                  </div>

                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.seconds).padStart(2, "0")}</h3>
                    <h3 className="text-gray-300 max-[535px]:text-[8px]">SECS</h3>
                  </div>

                </div>
                <NavLink to={`/single-products/${getHotDealProduct[currentHotDeal]?.[0]?._id}`} className="mt-2  px-5">
                  <h3 className="text-md font-semibold max-[535px]:text-[12px]">{getHotDealProduct[currentHotDeal]?.[0]?.title?.length > 10 ? `${getHotDealProduct[currentHotDeal]?.[0]?.title.slice(0, 30)}...` : getHotDealProduct[currentHotDeal]?.[0]?.title}</h3>
                  <h4 className="text-red-600 font-semibold text-xl">{getHotDealProduct[currentHotDeal]?.[0]?.discount_price}</h4>
                </NavLink>

              </NavLink>
            )
          }


          <div className="min-[1219px]:hidden">
            {
              getHotDealProduct?.length > 0 && (
                <NavLink to={`/single-products/${getHotDealProduct[reverseIndex]?.[0]?._id}`} className="border border-black/30 w-100 max-[770px]:w-90 max-[426px]:w-50 max-[380px]:w-40 h-110 max-[671px]:w-80 max-[580px]:w-70 max-[535px]:w-50 flex flex-col cursor-pointer items-center py-5 px-3 bg-gray-100">
                  <img className=" h-50 w-auto" src={`${fileURL}/${getHotDealProduct[reverseIndex]?.[0]?.big_image}`}></img>
                  {/* Time */}

                  <div className="flex justify-center gap-5 max-[535px]:gap-2 w-full  py-3 mt-3 bg-red-600 border-2 border-black">
                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.days).padStart(2, "0")}</h3>
                      <h3 className="text-gray-300 max-[535px]:text-[8px]">DAYS</h3>
                    </div>

                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.hours).padStart(2, "0")}</h3>
                      <h3 className="text-gray-300 max-[535px]:text-[8px]">HOURS</h3>
                    </div>

                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.minutes).padStart(2, "0")}</h3>
                      <h3 className="text-gray-300 max-[535px]:text-[8px]">MINS</h3>
                    </div>

                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-white max-[535px]:text-[8px]">{String(timeLeft.seconds).padStart(2, "0")}</h3>
                      <h3 className="text-gray-300 max-[535px]:text-[8px]">SECS</h3>
                    </div>

                  </div>
                  <NavLink to={`/single-products/${getHotDealProduct[reverseIndex]?.[0]?._id}`} className="mt-2  px-5">
                    <h3 className="text-md max-[535px]:text-[12px] font-semibold">{getHotDealProduct[reverseIndex]?.[0]?.title?.length > 10 ? `${getHotDealProduct[reverseIndex]?.[0]?.title.slice(0, 30)}...` : getHotDealProduct[reverseIndex]?.[0]?.title}</h3>
                    <h4 className="text-red-600 font-semibold text-xl">{getHotDealProduct[reverseIndex]?.[0]?.discount_price}</h4>
                  </NavLink>

                </NavLink>
              )
            }
          </div>
        </div>
      </div>


      {/* 2nd section */}

      <div className="h-auto w-full bg-[#ececec] py-10 my-10 px-5 grid grid-cols-4 max-[769px]:grid-cols-2 max-[426px]:grid-cols-1 items-center gap-5">

        <div className="h-35 w-auto px-5 border border-red-500/30 shadow-lg shadow-red-600/20 bg-white flex flex-row justify-start items-center gap-5 rounded-lg ">
          <div className="bg-red-600/70 px-3 py-3 rounded-md">
            <img className="h-8 w-8" src={store}></img>
          </div>

          <div>
            <h1 className="text-md">Open new stores in your city</h1>

          </div>
        </div>

        <div className="h-35 w-auto px-5 border border-red-500/30 shadow-lg shadow-red-600/20 bg-white flex flex-row justify-start items-center gap-5 rounded-lg ">
          <div className="bg-red-600/70 px-3 py-3 rounded-md">
            <img className="h-8 w-auto" src={delivery}></img>
          </div>

          <div>
            <h1 className="text-md">Free fast express delivery with tracking</h1>

          </div>
        </div>


        <div className="h-35 w-auto px-5 border border-red-500/30 shadow-lg shadow-red-600/20 bg-white flex flex-row justify-start items-center gap-5 rounded-lg">
          <div className="bg-red-600/70 px-3 py-3 rounded-md">
            <img className="h-8 w-auto" src={insurance}></img>
          </div>

          <div>
            <h1 className="text-md">Equipment loose and damage insurance</h1>

          </div>
        </div>

        <div className="h-35 w-auto px-5 border border-red-500/30 shadow-lg shadow-red-600/20 bg-white flex flex-row justify-start items-center gap-5 rounded-lg">
          <div className="bg-red-600/70 px-3 py-3 rounded-md">
            <img className="h-8 w-auto" src={payment}></img>
          </div>

          <div>
            <h1 className="text-md">Installment without overpayments</h1>

          </div>
        </div>












      </div>


    </div >
  )
}

export default Hero