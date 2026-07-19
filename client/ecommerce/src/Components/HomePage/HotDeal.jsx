import hotdeals from "../../assets/hot-deal.png"
import hero8 from "../../assets/hero8.png"
import { useEffect, useState } from "react"
import HotDealStore from "../../Store/HotDealStore"
import { fileURL } from "../../Helpers/Config.js"
import { NavLink } from "react-router-dom"




const HotDeal = () => {

    const { getHotDealProduct, getHotDealRequest } = HotDealStore();



    useEffect(() => {
        const fetchData = async () => {
            await getHotDealRequest();

        };
        fetchData();

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
        <div>
            <div className="my-30 flex flex-col justify-center items-center gap-5">

                <h1 className="text-5xl font-bold">Hot Deals</h1>
                <img className="h-10 w-10" src={hotdeals}></img>
                <div className="h-100  w-7xl max-[1150px]:w-250 max-[945px]:w-230 max-[880px]:w-210 max-[825px]:w-200 max-[769px]:w-190 max-[710px]:w-170 max-[630px]:w-150 max-[530px]:w-120 max-[426px]:w-100 max-[380px]:w-95 max-[321px]:w-80 bg-white flex flex-col items-center mt-80 relative" style={{ backgroundImage: `url(${hero8})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="h-100 max-[530px]:h-70 w-280  max-[1150px]:w-250 max-[945px]:w-230 max-[880px]:w-210 max-[825px]:w-200 max-[769px]:w-190 max-[710px]:w-170 max-[630px]:w-150 max-[530px]:w-100 max-[380px]:w-95 max-[321px]:w-80 flex flex-row bg-gray-100 absolute border border-black/30 bottom-70">
                        {/* Card */}
                        {
                            getHotDealProduct?.map((item) => {
                                return (
                                    <NavLink to={`/single-products/${item?.[0]?._id}`} kye={item?.[0]?._id} className="w-70 h-100 max-[530px]:w-25 max-[530px]:h-70 max-[380px]:w-24 max-[321px]:w-22  border cursor-pointer border-black/30 flex flex-col justify-between items-center ">
                                        <div className="h-50 max-[321px]:h-40 w-full bg-gray-200 flex justify-center items-center">
                                            <img className="h-40 max-[530px]:h-25 max-[321px]:h-20 " src={`${fileURL}/${item?.[0]?.big_image}`}></img>
                                        </div>
                                        <div className="h-50 py-5 px-5 max-[530px]:px-0 max-[426px]:w-15 max-[530px]:text-center">
                                            <h3 className="text-sm  font-bold max-[530px]:w-25 max-[426px]:w-20 max-[530px]:text-[10px] max-[321px]:w-15">{item?.[0]?.title?.length > 30 ? `${item?.[0]?.title.slice(0, 30)}...` : item?.[0]?.title}</h3>
                                            <h3 className="text-[10px] text-gray-500 font-bold max-[710px]:hidden">{item?.[0]?.sub_title}</h3>
                                            <strike className="text-lg text-red-800/70 max-[530px]:text-sm max-[321px]:text-[12px]">{item?.[0]?.regular_price}</strike>
                                            <p className="text-2xl font-bold text-red-700 max-[530px]:text-[15px] max-[321px]:text-[12px]">{item?.[0]?.discount_price}</p>


                                        </div>
                                    </NavLink>
                                )

                            })
                        }




                    </div>




                    <div className="flex gap-8 max-[426px]:gap-3">
                        {/* time */}
                        <div className="mt-50 flex flex-col gap-3 items-center">
                            <div className="h-30 w-30 max-[630px]:h-20 max-[630px]:w-20 max-[426px]:w-15 max-[426px]:h-15 bg-red-600 rounded-full  flex justify-center items-center">
                                <h1 className="text-3xl text-white">{String(timeLeft.days).padStart(2, "0")}</h1>
                            </div>
                            <h1 className="text-gray-200 text-xl">DAYS</h1>
                        </div>


                        <div className="mt-50 flex flex-col gap-3 items-center">
                            <div className="h-30 w-30 max-[630px]:h-20 max-[630px]:w-20 max-[426px]:w-15 max-[426px]:h-15 bg-red-600 rounded-full  flex justify-center items-center">
                                <h1 className="text-3xl text-white">{String(timeLeft.hours).padStart(2, "0")}</h1>
                            </div>
                            <h1 className="text-gray-200 text-xl">HOURS</h1>
                        </div>


                        <div className="mt-50 flex flex-col gap-3 items-center">
                            <div className="h-30 w-30 max-[630px]:h-20 max-[630px]:w-20 max-[426px]:w-15 max-[426px]:h-15 bg-red-600 rounded-full  flex justify-center items-center">
                                <h1 className="text-3xl text-white">{String(timeLeft.minutes).padStart(2, "0")}</h1>
                            </div>
                            <h1 className="text-gray-200 text-xl">MINS</h1>
                        </div>


                        <div className="mt-50 flex flex-col gap-3 items-center">
                            <div className="h-30 w-30 max-[630px]:h-20 max-[630px]:w-20 max-[426px]:w-15 max-[426px]:h-15 bg-red-600 rounded-full  flex justify-center items-center">
                                <h1 className="text-3xl text-white">{String(timeLeft.seconds).padStart(2, "0")}</h1>
                            </div>
                            <h1 className="text-gray-200 text-xl">SECS</h1>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default HotDeal