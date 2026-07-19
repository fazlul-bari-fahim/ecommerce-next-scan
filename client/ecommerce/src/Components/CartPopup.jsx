import { useEffect, useState } from "react";
import Cart from "./Cart";
import Total from "./Total";
import CartStore from "../Store/CartStore";
import emptycart from "../assets/cart.png"
import back from "../assets/back.png"
import { useNavigate } from "react-router-dom";







const CartPopup = ({ setCartPopup }) => {


    const { cartGetRequest, totalCart, allCart } = CartStore();


    const [getCartRequest, setgetCartRequest] = useState(false);


    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await cartGetRequest();

                if (result === true) {
                    setgetCartRequest(false);
                }

            } catch (error) {
                console.log(error);

            }
        }; fetchData();
    }, [getCartRequest])








    return (
        <div>

            <div className="bg-white h-screen w-100 border border-gray-400 rounded-xl shadow-2xl  px-5 pb-5 flex flex-col justify-between">

                <div className="flex justify-between border-b py-5">
                    <h1 className="text-xl font-semibold">Product Review</h1>
                    <button onClick={() => setCartPopup(false)} className="text-lg cursor-pointer font-semibold border px-3 rounded-sm bg-gray-50">Close</button>
                </div>

                {/* Cart */}
                <div className=" h-screen overflow-y-auto scrollbar-none">
                    {
                        allCart.length ?
                            <Cart getCartRequest={setgetCartRequest} totalCart={totalCart} allCart={allCart} />
                            :
                            <div className="flex flex-col pt-5 justify-center items-center">
                                <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
                                <img className="h-50" src={emptycart}></img>
                                <button onClick={() => navigate("/all-products")} className="bg-red-700 cursor-pointer w-40 py-1 text-white flex justify-center items-center gap-2"><img className="h-5" src={back}></img>Back to Shop</button>
                            </div>

                    }



                </div>



                <Total allCart={allCart} refferURL={"checkout"} btntext={"Confirm Your Order"} />






            </div>
        </div>
    )
}

export default CartPopup