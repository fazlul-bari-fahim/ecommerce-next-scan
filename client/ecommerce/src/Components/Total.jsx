import { Link } from "react-router-dom"
import cartCalculation from "../Helpers/Calculation";

const Total = ({ btntext, refferURL, allCart, onOrder }) => {



    const calculation = cartCalculation(allCart);


    return (
        <div className="flex flex-col gap-5 ">
            {/* Total */}
            <div className="w-full flex flex-col gap-1  border border-gray-300 min-h-30 mt-5 rounded-lg px-4 py-2">
                <div className="flex text-sm flex-row justify-between"><h3>Subtotal</h3><h3>{calculation?.subtotal}</h3></div>
                <div className="flex text-sm flex-row justify-between border-b border-gray-400 pb-2 text-green-800 font-semibold"><h3>Discount</h3><h3 className="flex">-<p>{calculation?.discount}</p></h3></div>
                <div className="flex text-sm flex-row justify-between  font-semibold"><h3>After Discount</h3><h3>{calculation?.afterDiscount}</h3></div>
                <div className="flex text-sm flex-row justify-between"><h3>Vat</h3><h3>{calculation?.vat}</h3></div>
                <div className="flex text-sm flex-row justify-between"><h3>Delivery Charge</h3><h3>{calculation?.shipping}</h3></div>
                <div className="flex text-md font-bold pt-2 border-t flex-row justify-between"><h3>Total</h3><h3>{calculation?.total}</h3></div>



            </div>

            {/* Checkout button */}
            <Link onClick={onOrder} to={`/${refferURL}`} className="bg-black hover:bg-red-800 text-white py-2 font-semibold rounded-sm flex justify-center hover:bg-[#5f017b]/90 transition-all active:scale-95 duration-200">{btntext}</Link>

        </div>
    )
}

export default Total