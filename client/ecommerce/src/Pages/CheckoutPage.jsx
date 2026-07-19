import logo from "../assets/logo.png"
import check from "../assets/check1.png"
import checkout from "../assets/secure-payment.png"
import Cart from "../Components/Cart"
import Total from "../Components/Total"
import cod from "../assets/cash-on-delivery.png"
import { useEffect, useState } from "react"
import CartStore from "../Store/CartStore"
import emptycart from "../assets/cart.png"
import back from "../assets/back.png"
import InvoiceStore from "../Store/InvoiceStore"
import cartCalculation from "../Helpers/Calculation"
import BillingInformation from "../Components/CheckoutPage/BillingInformation"
import { useNavigate } from "react-router-dom"


const CheckoutPage = () => {


    const { cartGetRequest, totalCart, allCart } = CartStore();
    const calculation = cartCalculation(allCart);


    const navigate = useNavigate();



    const { InvoiceCreateRequest } = InvoiceStore();
    const [getCartRequest, setgetCartRequest] = useState(false);




    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [division, setdivision] = useState("");
    const [city, setcity] = useState("");
    const [zip, setzip] = useState("");

    // cus detailes

    const cusDetailes = {
        FirstName: first_name,
        LastName: last_name,
        Email: email,
        Phone: phone,
        Address: address,
        Division: division,
        City: city,
        Zip: zip
    };




    const [billing, setBilling] = useState(true);
    const [billingInfo, setBillingInfo] = useState({
        shipping: "shipping on billing information",

    });













    const [payment, setPayment] = useState("");


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
    }, [getCartRequest]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await InvoiceCreateRequest({
                data: {

                    product_details: allCart,
                    cus_detailes: cusDetailes,
                    ship_details: billingInfo,
                    payable: calculation?.total,
                    subtotal: calculation?.subtotal,
                    discount: calculation?.discount,
                    vat: calculation?.vat,
                    shipping: calculation?.shipping,
                    payment_status: payment,





                },

            },
                navigate

            );



        } catch (error) {
            console.log(error);

        }





    };












    return (
        <div>
            <div>
                {/* header */}
                <div className="bg-[#ed1d24] h-20 w-full max-[426px]:w-115 mb-2 px-20 max-[850px]:px-2 flex items-center justify-between">
                    <img className="h-20 max-[850px]:h-15 " src={logo}></img>

                    <div className="flex ">
                        <div className="flex items-center">
                            <div className="bg-white/90 border-2 border-white px-2 py-2 rounded-full flex justify-between items-center mr-3">
                                <img className="h-3 w-3" src={check}></img>
                            </div>
                            <h3 className="text-white font-semibold">Cart</h3>
                            <div className="bg-white h-px w-15 max-[850px]:grid-cols-2 max-[426px]:grid-cols-1 "></div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-white/90 border-2 border-white px-2 py-2 rounded-full flex justify-between items-center mr-3">
                                <img className="h-3 w-3" src={check}></img>
                            </div>
                            <h3 className="text-white font-semibold">Review</h3>
                            <div className="bg-white h-px w-15"></div>
                        </div>


                        <div className="flex items-center">
                            <div className="bg-white/90 border-2 border-white px-2 py-2 rounded-full flex justify-center items-center mr-3">
                                <p className="h-3 w-3 flex justify-center items-center">3</p>
                            </div>
                            <h3 className="text-white font-semibold">Checkout</h3>

                        </div>

                    </div>
                </div>

                <form onSubmit={handleSubmit} className="px-10  max-[850px]:px-5 py-5  h-auto grid grid-cols-3  gap-30 max-[850px]:gap-10 max-[850px]:grid-cols-2 max-[426px]:grid-cols-1">

                    {/* Shipping Information */}
                    <div className="border-r w-110  max-[850px]:w-90 max-[426px]:w-100  border-gray-300 max-[426px]:border-white">
                        <div>
                            <div className="flex gap-3 items-center">
                                <div className="bg-black px-1 py-1 rounded-lg flex items-center justify-center">
                                    <img className="h-12" src={checkout}></img>
                                </div>
                                <h1 className="text-3xl font-semibold">Checkout</h1>

                            </div>
                        </div>
                        <h1 className="text-lg max-[850px]:w-80 max-[426px]:w-100 font-semibold mt-5 border-b pb-2 shadow-md">Billing Information</h1>

                        <div className="flex flex-col  gap-5 mt-5 h-120 overflow-y-auto pr-10 scrollbar-none">
                            <div className="flex justify-between  max-[426px]:w-100">
                                <div className="flex flex-col gap-1">

                                    <label className="text-lg flex font-semibold text-black/50">First Name <p className="text-red-800 text-xl">*</p></label>

                                    <input type="text" placeholder="Enter your first name" value={first_name} onChange={(e) => setfirst_name(e.target.value)} className="w-45 h-9 px-2 py-2 max-[850px]:w-35 max-[426px]:w-45 border-2 border-black/20 focus:outline-0" />
                                </div>




                                <div className="flex flex-col gap-1">

                                    <label className="text-lg flex font-semibold text-black/50">Last Name <p className="text-red-800 text-xl">*</p></label>

                                    <input type="text" placeholder="Enter your last name" value={last_name} onChange={(e) => setlast_name(e.target.value)} className="w-45  h-9 px-2 py-2 max-[850px]:w-35 max-[426px]:w-45 border-2 border-black/20 focus:outline-0" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">Email Address <p className="text-red-800 text-xl">*</p></label>

                                <input type="text" placeholder="Enter your Email" value={email} onChange={(e) => setemail(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                            </div>

                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">Phone Number<p className="text-red-800 text-xl">*</p></label>

                                <input type="text" placeholder="Enter your Phone Number" value={phone} onChange={(e) => setphone(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                            </div>

                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">Full Address<p className="text-red-800 text-xl">*</p></label>

                                <input type="text" placeholder="Enter your full Address" value={address} onChange={(e) => setaddress(e.target.value)} className="w-100 h-9 max-[850px]:w-80 max-[426px]:w-100 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                            </div>

                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">Division</label>

                                <select value={division} onChange={(e) => setdivision(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-10 px-2 py-2 cursor-pointer border-2  border-black/20 focus:outline-0" >
                                    <option value="">--Select Division--</option>
                                    <option value="Dhaka">Dhaka Division</option>
                                    <option value="Chattogram">Chattogram Division</option>
                                    <option value="Rajshahi">Rajshahi Division</option>
                                    <option value="Khulna">Khulna Division</option>
                                    <option value="Barishal">Barishal Division</option>
                                    <option value="Sylhet">Sylhet Division</option>
                                    <option value="Rangpur">Rangpur Division</option>
                                    <option value="Mymensingh">Mymensingh Division</option>
                                </select>
                            </div>


                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">City</label>

                                <select value={city} onChange={(e) => setcity(e.target.value)} className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-10  px-2 cursor-pointer py-2 border-2 border-black/20 focus:outline-0" >
                                    <option value="">--Select City--</option>
                                    <option value="Bagerhat">Bagerhat</option>
                                    <option value="Bandarban">Bandarban</option>
                                    <option value="Barguna">Barguna</option>
                                    <option value="Barishal">Barishal</option>
                                    <option value="Bhola">Bhola</option>
                                    <option value="Bogura">Bogura</option>
                                    <option value="Brahmanbaria">Brahmanbaria</option>
                                    <option value="Chandpur">Chandpur</option>
                                    <option value="Chattogram">Chattogram</option>
                                    <option value="Chuadanga">Chuadanga</option>
                                    <option value="Cox's Bazar">Cox's Bazar</option>
                                    <option value="Cumilla">Cumilla</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Dinajpur">Dinajpur</option>
                                    <option value="Faridpur">Faridpur</option>
                                    <option value="Feni">Feni</option>
                                    <option value="Gaibandha">Gaibandha</option>
                                    <option value="Gazipur">Gazipur</option>
                                    <option value="Gopalganj">Gopalganj</option>
                                    <option value="Habiganj">Habiganj</option>
                                    <option value="Jamalpur">Jamalpur</option>
                                    <option value="Jashore">Jashore</option>
                                    <option value="Jhalokathi">Jhalokathi</option>
                                    <option value="Jhenaidah">Jhenaidah</option>
                                    <option value="Joypurhat">Joypurhat</option>
                                    <option value="Khagrachhari">Khagrachhari</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Kishoreganj">Kishoreganj</option>
                                    <option value="Kurigram">Kurigram</option>
                                    <option value="Kushtia">Kushtia</option>
                                    <option value="Lakshmipur">Lakshmipur</option>
                                    <option value="Lalmonirhat">Lalmonirhat</option>
                                    <option value="Madaripur">Madaripur</option>
                                    <option value="Magura">Magura</option>
                                    <option value="Manikganj">Manikganj</option>
                                    <option value="Meherpur">Meherpur</option>
                                    <option value="Moulvibazar">Moulvibazar</option>
                                    <option value="Munshiganj">Munshiganj</option>
                                    <option value="Mymensingh">Mymensingh</option>
                                    <option value="Naogaon">Naogaon</option>
                                    <option value="Narail">Narail</option>
                                    <option value="Narayanganj">Narayanganj</option>
                                    <option value="Narsingdi">Narsingdi</option>
                                    <option value="Natore">Natore</option>
                                    <option value="Netrokona">Netrokona</option>
                                    <option value="Nilphamari">Nilphamari</option>
                                    <option value="Noakhali">Noakhali</option>
                                    <option value="Pabna">Pabna</option>

                                    <option value="Panchagarh">Panchagarh</option>
                                    <option value="Patuakhali">Patuakhali</option>
                                    <option value="Pirojpur">Pirojpur</option>
                                    <option value="Rajbari">Rajbari</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Rangamati">Rangamati</option>
                                    <option value="Rangpur">Rangpur</option>
                                    <option value="Satkhira">Satkhira</option>
                                    <option value="Shariatpur">Shariatpur</option>
                                    <option value="Sherpur">Sherpur</option>
                                    <option value="Sirajganj">Sirajganj</option>
                                    <option value="Sunamganj">Sunamganj</option>
                                    <option value="Sylhet">Sylhet</option>
                                    <option value="Tangail">Tangail</option>
                                    <option value="Thakurgaon">Thakurgaon</option>
                                </select>
                            </div>




                            <div className="flex flex-col gap-1">

                                <label className="text-lg flex font-semibold text-black/50">Zip-code</label>

                                <input type="text" value={zip} onChange={(e) => setzip(e.target.value)} placeholder="Enter your Area post/Zip code" className="w-100 max-[850px]:w-80 max-[426px]:w-100 h-9 px-2 py-2 border-2 border-black/20 focus:outline-0" />
                            </div>

                            <div className="flex gap-5 mt-3">
                                <input type="checkbox" value="shippingonbillingaddress" checked={billing} onChange={(e) => { setBilling(e.target.checked) }} className="h-5 w-5 border cursor-pointer accent-black" />

                                <label>Shipping on Billing Address</label>
                            </div>



                            {
                                !billing && (
                                    <BillingInformation setBillingInfo={setBillingInfo} billing={billing} />

                                )
                            }






                        </div>
                    </div>


                    {/* Review your cart */}
                    <div className="pt-5 ">
                        <h1 className="text-xl font-semibold pb-4 border-b border-gray-400">Review Your Cart</h1>
                        <div className="h-120 overflow-y-auto pt-2 scrollbar-none">
                            {
                                allCart.length ?
                                    <Cart getCartRequest={setgetCartRequest} totalCart={totalCart} allCart={allCart} />
                                    :

                                    <div className="flex flex-col pt-5 justify-center items-center">
                                        <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
                                        <img className="h-80" src={emptycart}></img>
                                        <button type="button" onClick={() => navigate("/all-products")} className="bg-red-700 cursor-pointer w-40 py-1 text-white flex justify-center items-center gap-2"><img className="h-5" src={back}></img>Back to Shop</button>
                                    </div>
                            }
                        </div>
                    </div>

                    {/* Total */}
                    <div className="w-80 mb-20 max-[850px]:w-180 max-[426px]:w-100">
                        <h1 className="text-xl font-semibold pb-4 border-b border-gray-400 ">Confirm Your Order</h1>
                        <h3 className="text-[12px] mt-3">Select your payment Method</h3>
                        <div className="mt-3 flex flex-col gap-3">
                            <label htmlFor="cashon" className="cursor-pointer">
                                <input name="payment" id="cashon" type="radio" value="cashon" checked={payment === "cashon"} onChange={(e) => setPayment(e.target.value)} className="hidden peer" />
                                <h4 value="cashon" className="border border-gray-400 flex items-center px-5 rounded-lg h-15 peer-checked:border-[#5f017b] peer-checked:border-2 peer-checked:shadow-[0_0_10px_rgba(95,1,123,0.4)]   gap-3"><img className="h-10" src={cod}></img>Cash on Delivery</h4>
                            </label>
















                        </div>


                        <Total onOrder={handleSubmit} allCart={allCart} btntext={"Place Your Order"} />
                    </div>



                </form>
            </div>
        </div>
    )
}

export default CheckoutPage