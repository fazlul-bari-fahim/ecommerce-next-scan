import settings from "../../assets/settings.png"
import best from "../../assets/shield.png"
import bonus from "../../assets/bonus.png"
import deliver from "../../assets/delivery.png"
import fulldeliver from "../../assets/fast-delivery.png"
import services from "../../assets/customer-service.png"
import fastdelivery from "../../assets/express.png"
import accptance from "../../assets/check.png"



const OurAdvantage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 my-20 items-center">
                <h1 className="text-xl bg-red-600 px-4 py-1 text-white">Our Advantages</h1>

            </div>
            <div className="my-10 grid grid-cols-4 max-[769px]:grid-cols-2 max-[426px]:grid-cols-1 gap-7">

                <div className="bg-red-600  h-20 w-70 max-[1025px]:w-60 max-[426px]:hidden  flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <div className="h-15 w-15 flex justify-center items-center">
                        <img className="h-7 w-auto" src={settings}></img>
                    </div>
                    <h3 className="text-white text-lg">Fee-Free Installment</h3>
                </div>

                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60  flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={best}></img>
                    <h3 className="text-white">Best Price Guarantee</h3>
                </div>


                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60 max-[426px]:hidden flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={bonus}></img>
                    <h3 className="text-white">Bonus Program</h3>
                </div>


                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60  flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={deliver}></img>
                    <h3 className="text-white">Pickup in 12 hours</h3>
                </div>


                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60 max-[426px]:hidden flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={fulldeliver}></img>
                    <h3 className="text-white">Convenient Delivery</h3>
                </div>

                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60  flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={services}></img>
                    <h3 className="text-white">24/7 suport & services</h3>
                </div>

                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60 max-[426px]:text-sm flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={fastdelivery}></img>
                    <h3 className="text-white">Express Delivery in 3 days</h3>
                </div>


                <div className="bg-red-600 h-20 w-70 max-[1025px]:w-60 max-[426px]:hidden flex flex-row justify-start items-center px-3 gap-3 rounded-lg">
                    <img className="h-7 w-auto" src={accptance}></img>
                    <h3 className="text-white">Equipment and Acceptance</h3>
                </div>


            </div>
        </div>
    )
}

export default OurAdvantage

