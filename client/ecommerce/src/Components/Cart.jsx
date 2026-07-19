import { fileURL } from "../helpers/config";
import CartStore from "../Store/CartStore";



const Cart = ({ allCart, getCartRequest }) => {




    const { cartRemoveLoading, cartRemoveRequest, cartUpdateRequest, cartGetRequest } = CartStore();


    const removeCart = async (_id) => {

        const result = await cartRemoveRequest(_id);
        if (result === true) {
            getCartRequest(true);

        }

    };



    const increaseQty = async (item) => {



        const result = await cartUpdateRequest({
            cart_id: item._id,
            data: {
                product_id: item?.product_id,
                qty: 1,
                inc: true,
            },


        });
        if (result) {
            cartGetRequest();

        }

    };



    const decreaseQty = async (item) => {


        if (item.qty <= 1) return;


        const result = await cartUpdateRequest({
            cart_id: item._id,
            data: {
                product_id: item?.product_id,
                qty: 1,
                inc: false,
            },
        });


        if (result) {
            cartGetRequest();
        }


    };






    return (
        <div>
            {
                allCart?.map((item) => (
                    <div key={item?._id} className="flex gap-2 w-full border border-gray-300 min-h-30 mt-5 rounded-lg px-1 py-3">
                        {/* left */}
                        <div className="px-2 py-2 min-w-25">
                            <img className="h-25 w-auto" src={`${fileURL}/${item?.big_image}`}></img>

                        </div>

                        {/* right */}
                        <div>
                            <h3 className="text-sm">{item?.title}</h3>
                            <h5 className="text-[10px] font-semibold">Category</h5>
                            <div className="flex gap-3">
                                <h5 className="text-[12px] font-semibold flex gap-2">Size:<p>{item?.size}</p></h5>
                                <h5 className="text-[12px] font-semibold flex gap-2">Color:<div className={`h-4 w-4 rounded-full`} style={{ backgroundColor: item?.color }}></div></h5>
                            </div>
                            <h5 className="text-md text-green-900 font-bold">{item?.discount_price}</h5>


                            {/* button */}
                            <div className="mt-2 flex flex-row justify-between pr-3 ">
                                <button type="button" onClick={() => removeCart(item?._id)} className="text-red-600 font-semibold cursor-pointer hover:text-red-700">{cartRemoveLoading ? "Removing..." : "Remove"}</button>

                                <div className="border flex  gap-3 rounded-sm">
                                    <button type="button" onClick={() => increaseQty(item)} className="px-3 cursor-pointer border-r">+</button>
                                    <h4>{item?.qty}</h4>
                                    <button type="button" onClick={() => decreaseQty(item)} className="px-3 cursor-pointer border-l">-</button>
                                </div>
                            </div>

                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default Cart;