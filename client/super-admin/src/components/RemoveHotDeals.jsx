import alert from "../assets/alert.png"
import HotDealStore from "../stores/HotDealStore";



const RemoveHotDeals = ({ setRemoveHotDeal, hotDealId }) => {

    const { deleteHotDealRequest, getHotDealRequest } = HotDealStore();

    const handleRemove = async () => {
        const result = await deleteHotDealRequest(hotDealId);
        console.log(result);
        if (result) {
            setRemoveHotDeal(false);
            await getHotDealRequest();

        }

    };
    return (

        <div className="bg-white h-80 w-150 flex flex-col justify-center items-center">
            <img className="h-20" src={alert}></img>
            <h3 className="text-xl font-bold mt-5">Are you sure remove this product from Hot Deal ?</h3>
            <div className="w-100 mt-5 flex justify-between">
                <button onClick={() => setRemoveHotDeal(false)} className="bg-red-400 w-20 h-8 text-white font-semibold border-red-600 border shadow-lg rounded-sm cursor-pointer hover:bg-red-900">Close</button>
                <button onClick={() => handleRemove()} className="bg-green-400 w-20 h-8 text-white font-semibold border-green-600 border shadow-lg rounded-sm cursor-pointer hover:bg-green-900">Confirm</button>
            </div>
        </div>

    )
}

export default RemoveHotDeals