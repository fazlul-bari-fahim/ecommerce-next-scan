import logo from "../assets/logo.png"
import check from "../assets/check1.png"
import { Link, NavLink } from "react-router-dom"
import checked from "../assets/checked.png"
import location from "../assets/location-pin.png"
import InvoiceStore from "../Store/InvoiceStore"
import { useEffect } from "react"
import { fileURL } from "../helpers/config"






const ThankYouPage = () => {

    const { orderID, InvoiceGetRequest, InvoiceData } = InvoiceStore();

    const _id = orderID;
    console.log(InvoiceData);


    useEffect(() => {
        const fetchData = async () => {

            await InvoiceGetRequest({ _id })

        };
        fetchData();

    }, []);

    const subTotal = Number(InvoiceData?.subtotal);
    const vat = Number(InvoiceData?.vat);
    const discount = Number(InvoiceData?.discount);

    const afterDiscount = (subTotal + vat) - discount;







    return (
        <div>
            <div>
                {/* header */}
                <div className="bg-[rgb(237,29,36)] h-20 w-full mb-2 px-20 max-[426px]:px-2 flex items-center justify-between">
                    <img className="h-20 max-[426px]:h-15" src={logo}></img>

                    <div className="flex gap-5 max-[426px]:gap-3 text-white font-semibold">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/all-products"}>Shop</Link>
                        <Link to={"/contact"}>Contact</Link>
                    </div>

                    <div className="flex ">



                        <div className="flex items-center max-[376px]:hidden">
                            <div className="bg-green-500/90 border-2 border-white px-2 py-2 rounded-full flex justify-between items-center mr-3">
                                <img className="h-3 w-3 max-[426px]:h-2 max-[426px]:w-2" src={check}></img>
                            </div>
                            <h3 className="text-white font-semibold max-[426px]:text-sm">Order Created Successfully</h3>

                        </div>







                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-3 mt-5">
                    <img src={checked}></img>
                    <h1 className="text-4xl max-[426px]:text-xl">Thank you for Your Order!</h1>
                    <p className="text-lg max-[426px]:text-sm max-[321px]:w-50">Your Order has been received and is being processed</p>


                    <div className="border py-2 px-7 rounded-lg border-gray-500/30 shadow-lg flex flex-col justify-center items-center gap-2">
                        <h3 className="text-gray-500 text-lg">Order Number</h3>

                        <div className="flex gap-3">
                            <p className="text-sm">{InvoiceData?.order_number}</p>
                        </div>
                    </div>

                    <NavLink to={"/dashboard-profile/all-orders"} className="border border-gray-300 px-8 py-3 rounded-sm mt-5 bg-green-200">View Your Order</NavLink>


                    {/* Order */}
                    <div className="border h-auto w-150 max-[426px]:w-100 max-[321px]:w-80 my-10 rounded-sm border-gray-400/30 shadow-md px-5 py-3">
                        <h2 className="text-lg border-b pb-2 border-gray-300">Order Summary</h2>

                        {/* Product */}
                        {/* card */}
                        <div className=" py-3 px-3">
                            {
                                InvoiceData?.product_details?.map((item) => {

                                    return (
                                        <div key={item} className="flex gap-3 justify-between border-b py-2 border-gray-400">
                                            {/* img */}
                                            <div className="flex gap-3">
                                                <img className="h-20" src={`${fileURL}/${item?.big_image}`}></img>

                                                {/* info */}
                                                <div>
                                                    <h3 className="font-semibold max-[321px]:text-[12px]">{item?.title}</h3>
                                                    <h3 className="font-semibold text-sm text-gray-500">{item?.category?.category_name}</h3>
                                                    <div className="flex gap-2 mt-2">
                                                        <h3 className=" text-sm text-black">Qty :</h3>
                                                        <p>{item?.qty}</p>


                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <h4 className="text-lg font-semibold">{item?.regular_price}</h4>
                                            </div>
                                        </div>
                                    )



                                })
                            }










                        </div>

                        {/* total */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold">Subtotal</h3>
                                <h3 className="text-sm font-semibold">{InvoiceData?.subtotal}</h3>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold">Vat</h3>
                                <h3 className="text-sm font-semibold">{InvoiceData?.vat}</h3>
                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold text-green-800">Discount</h3>
                                <h3 className="text-sm font-semibold text-green-800">{InvoiceData?.discount}</h3>
                            </div>


                            <div className="flex justify-between border-t pt-2 border-gray-400">
                                <h3 className="text-sm font-semibold">After Discount</h3>
                                <h3 className="text-sm font-semibold">{afterDiscount}</h3>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold">Delivery Charge</h3>
                                <h3 className="text-sm font-semibold">{InvoiceData?.shipping}</h3>
                            </div>

                            <div className="flex justify-between border-t border-gray-500 pt-2">
                                <h3 className="text-xl font-bold ">Total</h3>
                                <h3 className="text-xl font-bold ">{InvoiceData?.payable}</h3>
                            </div>


                        </div>

                    </div>


                    {/* Billing Details */}
                    <div className="border h-auto w-150 max-[426px]:w-100 max-[321px]:w-80 my-10 rounded-sm border-gray-400/30 shadow-md px-5 py-3">
                        <h2 className="text-lg border-b pb-2 border-gray-300">Billing Details</h2>

                        {/* Product */}
                        <div className=" py-3 px-3 text-gray-700">
                            <div className="flex gap-2 py-3">
                                <img className="h-5" src={location}></img>
                                <h3 className="font-semibold text-black">Shipping to</h3>
                            </div>
                            <div className="px-5">
                                <h3>{InvoiceData?.cus_detailes?.FirstName}</h3>
                                <h3>{InvoiceData?.cus_detailes?.Email}</h3>
                                <h3>{InvoiceData?.cus_detailes?.Phone}</h3>
                                <h3>{InvoiceData?.cus_detailes?.Address}</h3>
                                <h3>{InvoiceData?.cus_detailes?.Division}</h3>
                                <h3>{InvoiceData?.cus_detailes?.City}</h3>
                                <h3>{InvoiceData?.cus_detailes?.Zip}</h3>
                            </div>






                        </div>



                    </div>




                    {/* Shipping Details */}
                    <div className="border h-auto w-150 max-[426px]:w-100 max-[321px]:w-80 my-10 rounded-sm border-gray-400/30 shadow-md px-5 py-3">
                        <h2 className="text-lg border-b pb-2 border-gray-300">Shipping Details</h2>

                        {/* Product */}
                        <div className=" py-3 px-3 text-gray-700">
                            <div className="flex gap-2 py-3">
                                <img className="h-5" src={location}></img>
                                <h3 className="font-semibold text-black">Shipping to</h3>
                            </div>
                            <div className="px-5">

                                {
                                    InvoiceData?.ship_details?.shipping ?
                                        <div> <h3>{InvoiceData?.ship_details?.shipping}</h3></div>
                                        :
                                        <div>

                                            <h3>{InvoiceData?.ship_details?.BillFirstName}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillLastName}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillPhone}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillAddress}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillDivision}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillCity}</h3>
                                            <h3>{InvoiceData?.ship_details?.BillZip}</h3>


                                        </div>
                                }

                            </div>






                        </div>



                    </div>
                </div>


            </div>
        </div>
    )
}

export default ThankYouPage