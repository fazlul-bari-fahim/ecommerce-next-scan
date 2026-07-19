import hotdealicon from "../assets/hot-deal.png"
import HotDealStore from "../stores/HotDealStore";



const HotDeal = ({ setHotDeal, hotDealId }) => {



    const { createHotDealRequest, getHotDealRequest } = HotDealStore();

    const createHotDeal = async () => {
        const result = await createHotDealRequest({ data: hotDealId });

        if (result) {
            setHotDeal(false);
            await getHotDealRequest();
        }

    };



    return (
        <div className="bg-white h-80 w-150 flex flex-col justify-center items-center">
            <img className="h-10" src={hotdealicon}></img>
            <h4 className="text-md font-semibold">🔥 Hot Deal Alert! 🔥</h4>


            <p className="w-80 text-justify text-[9px] text-red-400">Enable for Hot Deal to boost your product sales. A countdown timer will be displayed, creating urgency and encouraging customers to purchase before the offer expires. This helps your product sell faster than regular listings.</p>
            <p className="text-red-600 text-[9px] font-semibold">Maximum 4 products</p>

            <h3 className="text-xl font-bold mt-5">Are you sure Add this product on Hot Deal ?</h3>
            <div className="w-100 mt-5 flex justify-between">
                <button onClick={() => { setHotDeal(false) }} className="bg-red-400 w-20 h-8 text-white font-semibold border-red-600 border shadow-lg rounded-sm cursor-pointer hover:bg-red-900">Close</button>
                <button onClick={() => createHotDeal()} className="bg-green-400 w-20 h-8 text-white font-semibold border-green-600 border shadow-lg rounded-sm cursor-pointer hover:bg-green-900">Confirm</button>
            </div>
        </div>
    )
}

export default HotDeal