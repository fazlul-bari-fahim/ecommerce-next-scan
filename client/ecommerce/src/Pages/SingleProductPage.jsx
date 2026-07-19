import { Link, useNavigate, useParams } from "react-router-dom";
import productStore from "../Store/productStore.js";
import { fileURL } from "../helpers/config";
import rating1 from "../assets/rating1.png"
import rating2 from "../assets/rating2.png"
import rating3 from "../assets/rating3.png"
import rating4 from "../assets/rating4.png"
import rating5 from "../assets/rating5.png"
import arrow from "../assets/right-arrow.png"
import { useEffect, useState } from "react";
import CartPopup from "../Components/CartPopup.jsx";
import { AnimatePresence, motion } from "framer-motion"
import CartStore from "../Store/CartStore.js";
import { getToken } from "../Helpers/Helper.js";
import UserStore from "../Store/UserStore.js";


const SingleProductPage = () => {


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // or "smooth"
        });
    }, []);




    const [description, setDescription] = useState(false);
    const [features, setFeatures] = useState(false);
    const [details, setDetails] = useState(false);
    const [longDes, setLongDes] = useState(true);
    const [review, setReview] = useState(false);
    const [cartPopup, setCartPopup] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const id = useParams();

    const { singleProductRequest, singleProduct } = productStore();
    const [color, setcolor] = useState("");
    const [size, setsize] = useState("");
    const [qty, setqty] = useState(1);

    const [loginPopup, setLoginPopup] = useState(false);


    const [selectedItem, setSelectedItem] = useState(null);


    const { CartCreateRequest } = CartStore();



    const AddToCartHandle = async (item) => {

        try {
            setSelectedItem(item);
            const token = getToken();

            if (token === true) {
                const result = await CartCreateRequest({
                    data: {
                        product_id: item?._id,
                        title: item?.title,
                        color: color,
                        size: size,
                        qty: qty,
                        discount_price: item?.discount_price,
                        regular_price: item?.regular_price,


                    },
                    file: {
                        big_image: item?.big_image,

                    }

                });
                if (result === true) {

                    setCartPopup(true);

                    return;
                }
            } else {
                setLoginPopup(true);

            }

        } catch (error) {
            console.log(error);
        }

    };

    const navigate = useNavigate();
    const ByNowHandle = async (item) => {

        try {
            setSelectedItem(item);
            const token = getToken();

            if (token === true) {
                const result = await CartCreateRequest({
                    data: {
                        product_id: item?._id,
                        title: item?.title,
                        color: color,
                        size: size,
                        qty: qty,
                        discount_price: item?.discount_price,
                        regular_price: item?.regular_price,


                    },
                    file: {
                        big_image: item?.big_image,

                    }

                });
                if (result === true) {

                    setCartPopup(true);
                    navigate("/checkout")

                    return;
                }
            } else {
                setLoginPopup(true);

            }

        } catch (error) {
            console.log(error);
        }

    };



    useEffect(() => {
        if (singleProduct?.length > 0) {
            setPreviewImage(singleProduct[0].big_image);
        }
    }, [singleProduct]);










    useEffect(() => {
        const fetchData = async () => {
            try {

                await singleProductRequest(id);


            } catch (error) {
                console.log(error);
            }
        }; fetchData();
    }, []);



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userLoginLoading, userLoginRequest } = UserStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await userLoginRequest({
            email,
            password,
        });

        if (result === true) {
            setLoginPopup(false);
            if (selectedItem) {
                AddToCartHandle(selectedItem);
            }

        }


    };







    return (
        <div>

            {/* Single Product */}
            <div className="my-20 mx-20 max-[426px]:mx-5">
                {
                    singleProduct?.map((item) => (
                        <div key={item?._id} className="flex flex-col">
                            <div className="flex flex-row gap-5">
                                {/* short image */}
                                <div className="flex flex-col gap-5">
                                    <img onMouseEnter={() => setPreviewImage(item.image1)} className="h-30 max-[850px]:h-15 w-auto hover:border-2 hover:cursor-pointer" src={`${fileURL}/${item?.image1}`}></img>
                                    <img onMouseEnter={() => setPreviewImage(item.image2)} className="h-30 max-[850px]:h-15 w-auto hover:border-2 hover:cursor-pointer" src={`${fileURL}/${item?.image2}`}></img>
                                    <img onMouseEnter={() => setPreviewImage(item.image3)} className="h-30 max-[850px]:h-15 w-auto hover:border-2 hover:cursor-pointer" src={`${fileURL}/${item?.image3}`}></img>
                                    <img onMouseEnter={() => setPreviewImage(item.image4)} className="h-30 max-[850px]:h-15 w-auto hover:border-2 hover:cursor-pointer" src={`${fileURL}/${item?.image4}`}></img>

                                </div>


                                {/* Big image */}
                                <div>
                                    <img className="h-200 max-[850px]:h-80 shadow-xl" src={`${fileURL}/${previewImage || item?.big_image}`}></img>
                                </div>



                                {/* Info */}
                                <div className="ml-5  max-w-130 flex flex-col gap-2 max-[426px]:hidden">
                                    <h1 className="text-3xl  leading-10 font-semibold max-[850px]:text-sm">{item?.title}</h1>
                                    <h3 className="text-gray-600 text-sm font-semibold max-[850px]:text-[12px]">{item?.remark}</h3>
                                    <p className="text-sm max-[850px]:text-[12px]">{item?.sub_title}</p>
                                    <strike className="text-2xl font-semibold text-red-700 max-[850px]:text-[14px]">{item?.regular_price}</strike>
                                    <h3 className="text-4xl font-bold max-[850px]:text-2xl">{item?.discount_price}</h3>





                                    {/* Color */}
                                    <div className="mt-8 max-[850px]:mt-3">


                                        <h3 className="text-md font-bold max-[850px]:text-[12px]">Select Color</h3>
                                        <div className="flex gap-3 mt-3">



                                            {
                                                item?.color?.[0]?.split(",")?.map((clr, index) => (
                                                    <label key={index} className="cursor-pointer">
                                                        <input value={clr} onChange={() => setcolor(clr)} type="radio" name="color" className="hidden peer" />

                                                        <div className="w-9 h-9 max-[850px]:w-6 max-[850px]:h-6 rounded-full flex items-center justify-center peer-checked:ring-2 peer-checked:ring-black">
                                                            <div className="w-8 h-8 max-[850px]:h-5 max-[850px]:w-5 rounded-full border-2 border-black/30 " style={{ backgroundColor: clr }}></div>
                                                        </div>
                                                    </label>
                                                ))
                                            }


                                        </div>




                                    </div>



                                    {/* Select Size */}
                                    <div className="mt-8 max-[850px]:mt-3">
                                        <h3 className="text-md font-bold max-[850px]:text-[12px]">Select Size</h3>
                                        <div className="flex gap-3 mt-3 max-[850px]:mt-2">



                                            {
                                                item?.size?.[0]?.split(",")?.map((siz, index) => (
                                                    <label key={index} className="cursor-pointer">
                                                        <input value={siz} onChange={() => setsize(siz)} name="size" type="radio" className="hidden peer" />
                                                        <div className=" w-15 h-8 max-[850px]:h-8 peer-checked:ring-2 border-black/10 border-2 flex justify-center items-center rounded-sm shadow-lg">
                                                            <h3>{siz}</h3>

                                                        </div>

                                                    </label>
                                                ))
                                            }









                                        </div>
                                    </div>


                                    {/* Quantity */}
                                    <div className="mt-8 max-[850px]:hidden">
                                        <h3 className="text-md font-bold">Quantity</h3>
                                        <div className="border-2 border-black/20 h-8 w-30 mt-3 rounded-sm shadow flex flex-row justify-between items-center">
                                            <button onClick={() => setqty(qty + 1)} className="text-lg font-bold border-r-2 border-black/10 px-3 hover:cursor-pointer">+</button>
                                            <div className="text-lg font-bold ">{qty}</div>
                                            <button onClick={() => qty > 0 && setqty(qty - 1)} className="text-lg font-bold border-l-2 border-black/10 px-3 hover:cursor-pointer">-</button>

                                        </div>

                                    </div>


                                    {/* Button */}
                                    <div className="flex flex-row mt-8 gap-5 max-[850px]:hidden">

                                        <button onClick={() => { AddToCartHandle(item) }} className="border-2 border-black/80  h-12 w-50 hover:cursor-pointer font-semibold bg-black text-white transition-all active:scale-95 duration-200 hover:bg-gray-900 ">Add to Cart</button>
                                        <button onClick={() => ByNowHandle(item)} className=" h-12 w-50 hover:cursor-pointer font-semibold bg-red-600 hover:bg-red-800 transition-all active:scale-95 duration-200 text-white">Buy Now</button>


                                    </div>


                                    {/* Rating */}
                                    <div className="mt-8 max-[850px]:hidden">
                                        <h3 className="text-md font-bold">Customer Rating</h3>
                                        <div className="my-5">
                                            <img className="h-8 w-auto" src={rating5}></img>

                                        </div>

                                    </div>



                                    {/* service we provide */}
                                    <div className="relative max-[850px]:hidden">
                                        <button onClick={() => description ? setDescription(false) : setDescription(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                            <div className="flex items-center justify-between ">
                                                <h1 className="text-md font-bold">Service We Provide</h1>
                                                <img className={`h-4  ${description ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                            </div>
                                            {
                                                description && (
                                                    <div className="py-3 px-3 text-left">
                                                        <h3>{item?.service_we_provide}

                                                        </h3>
                                                    </div>
                                                )
                                            }
                                        </button>

                                    </div>

                                    {/* Features */}
                                    <div className="relative max-[850px]:hidden">
                                        <button onClick={() => features ? setFeatures(false) : setFeatures(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                            <div className="flex items-center justify-between ">
                                                <h1 className="text-md font-bold">Features</h1>
                                                <img className={`h-4  ${features ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                            </div>
                                            {
                                                features && (
                                                    <div className="py-3 px-3 text-left">
                                                        <h3>{item?.features}

                                                        </h3>
                                                    </div>
                                                )
                                            }
                                        </button>

                                    </div>

                                    {/* Details */}
                                    <div className="relative max-[850px]:hidden">
                                        <button onClick={() => details ? setDetails(false) : setDetails(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                            <div className="flex items-center justify-between ">
                                                <h1 className="text-md font-bold">Product Details</h1>
                                                <img className={`h-4  ${details ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                            </div>
                                            {
                                                details && (
                                                    <div className="py-3 px-3 text-left">
                                                        <h3>{item?.short_description}
                                                        </h3>
                                                    </div>
                                                )
                                            }
                                        </button>

                                    </div>







                                </div>


                            </div >




                            {/*info for tab & mobile  */}

                            <div div className="mt-8 min-[426px]:hidden" >


                                <h1 className="text-3xl  leading-10 font-semibold max-[850px]:text-sm">{item?.title}</h1>
                                <h3 className="text-gray-600 text-sm font-semibold max-[850px]:text-[12px]">{item?.remark}</h3>
                                <p className="text-sm max-[850px]:text-[12px]">{item?.sub_title}</p>
                                <strike className="text-2xl font-semibold text-red-700 max-[850px]:text-[14px]">{item?.regular_price}</strike>
                                <h3 className="text-4xl font-bold max-[850px]:text-2xl">{item?.discount_price}</h3>




                            </div>


                            {/* Color */}
                            <div className="mt-8 min-[426px]:hidden max-[850px]:mt-3">


                                <h3 className="text-md font-bold max-[850px]:text-[12px]">Select Color</h3>
                                <div className="flex gap-3 mt-3">



                                    {
                                        item?.color?.[0]?.split(",")?.map((clr, index) => (
                                            <label key={index} className="cursor-pointer">
                                                <input value={clr} onChange={() => setcolor(clr)} type="radio" name="color" className="hidden peer" />

                                                <div className="w-9 h-9 max-[850px]:w-6 max-[850px]:h-6 rounded-full flex items-center justify-center peer-checked:ring-2 peer-checked:ring-black">
                                                    <div className="w-8 h-8 max-[850px]:h-5 max-[850px]:w-5 rounded-full border-2 border-black/30 " style={{ backgroundColor: clr }}></div>
                                                </div>
                                            </label>
                                        ))
                                    }


                                </div>




                            </div>



                            {/* Select Size */}
                            <div className="mt-8 min-[426px]:hidden max-[850px]:mt-3">
                                <h3 className="text-md font-bold max-[850px]:text-[12px]">Select Size</h3>
                                <div className="flex gap-3 mt-3 max-[850px]:mt-2">



                                    {
                                        item?.size?.[0]?.split(",")?.map((siz, index) => (
                                            <label key={index} className="cursor-pointer">
                                                <input value={siz} onChange={() => setsize(siz)} name="size" type="radio" className="hidden peer" />
                                                <div className=" w-15 h-8 max-[850px]:h-8 peer-checked:ring-2 border-black/10 border-2 flex justify-center items-center rounded-sm shadow-lg">
                                                    <h3>{siz}</h3>

                                                </div>

                                            </label>
                                        ))
                                    }









                                </div>
                            </div>




                            {/* Quantity fot tab & mobile*/}
                            <div className="mt-8 min-[849px]:hidden">
                                <h3 className="text-md font-bold">Quantity</h3>
                                <div className="border-2 border-black/20 h-8 w-30 mt-3 rounded-sm shadow flex flex-row justify-between items-center">
                                    <button onClick={() => setqty(qty + 1)} className="text-lg font-bold border-r-2 border-black/10 px-3 hover:cursor-pointer">+</button>
                                    <div className="text-lg font-bold ">{qty}</div>
                                    <button onClick={() => qty > 0 && setqty(qty - 1)} className="text-lg font-bold border-l-2 border-black/10 px-3 hover:cursor-pointer">-</button>

                                </div>

                            </div>


                            {/* Button fot tab & mobile*/}
                            <div className="flex flex-row mt-8 gap-5 min-[849px]:hidden">

                                <button onClick={() => { AddToCartHandle(item) }} className="border-2 border-black/80  h-12 w-50 hover:cursor-pointer font-semibold bg-black text-white transition-all active:scale-95 duration-200 hover:bg-gray-900 ">Add to Cart</button>
                                <button onClick={() => ByNowHandle(item)} className=" h-12 w-50 hover:cursor-pointer font-semibold bg-red-600 hover:bg-red-800 transition-all active:scale-95 duration-200 text-white">Buy Now</button>


                            </div>



                            {/* Rating  fot tab & mobile*/}
                            <div className="mt-8 min-[849px]:hidden">
                                <h3 className="text-md font-bold">Customer Rating</h3>
                                <div className="my-5">
                                    <img className="h-8 w-auto" src={rating5}></img>

                                </div>

                            </div>



                            {/* service we provide for tab & mobile*/}
                            <div className="relative min-[849px]:hidden">
                                <button onClick={() => description ? setDescription(false) : setDescription(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                    <div className="flex items-center justify-between ">
                                        <h1 className="text-md font-bold">Service We Provide</h1>
                                        <img className={`h-4  ${description ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                    </div>
                                    {
                                        description && (
                                            <div className="py-3 px-3 text-left">
                                                <h3>{item?.service_we_provide}

                                                </h3>
                                            </div>
                                        )
                                    }
                                </button>

                            </div>

                            {/* Features for tab & mobile*/}
                            <div className="relative min-[849px]:hidden">
                                <button onClick={() => features ? setFeatures(false) : setFeatures(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                    <div className="flex items-center justify-between ">
                                        <h1 className="text-md font-bold">Features</h1>
                                        <img className={`h-4  ${features ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                    </div>
                                    {
                                        features && (
                                            <div className="py-3 px-3 text-left">
                                                <h3>{item?.features}

                                                </h3>
                                            </div>
                                        )
                                    }
                                </button>

                            </div>

                            {/* Details for tab & mobile*/}
                            <div className="relative min-[849px]:hidden">
                                <button onClick={() => details ? setDetails(false) : setDetails(true)} className="border-black/10 border-t-2 py-3 px-5 w-full hover:cursor-pointer hover:bg-gray-100">
                                    <div className="flex items-center justify-between ">
                                        <h1 className="text-md font-bold">Product Details</h1>
                                        <img className={`h-4  ${details ? "rotate-270" : "rotate-90"}`} src={arrow}></img>

                                    </div>
                                    {
                                        details && (
                                            <div className="py-3 px-3 text-left">
                                                <h3>{item?.short_description}
                                                </h3>
                                            </div>
                                        )
                                    }
                                </button>

                            </div>



                            {/* Long Description */}
                            <div className="mt-15 border-b-2  border-black/30 ">
                                <div className="flex gap-15">
                                    <button onClick={() => { setLongDes(true), setReview(false) }} className={` text-xl pb-3 cursor-pointer ${longDes ? "text-black font-bold border-b-3" : "text-gray-600"}`}>Description</button>
                                    <button onClick={() => { setLongDes(false), setReview(true) }} className={` text-xl pb-3 cursor-pointer ${review ? "text-black font-bold border-b-2" : "text-gray-600"}`}>Reviews</button>
                                </div>


                            </div>




                            {/* Description */}
                            {
                                longDes && (
                                    <div className="px-3 py-3 text-left whitespace-pre-wrap">
                                        {item?.description}
                                    </div>
                                )
                            }{
                                review && (
                                    <div className="px-3 py-3 text-left flex gap-10">
                                        <div className="mt-8 max-w-100">
                                            <h1 className="text-xl font-semibold">Customer Reviews</h1>

                                            {/* Reviews */}
                                            <div className="mt-8 bg-gray-100 rounded-sm px-5 py-5">
                                                <div className="flex  gap-5">
                                                    <h3 className="text-xl font-semibold">Alex John</h3>
                                                    <img className="h-8 max-[850px]:h-5" src={rating5}></img>
                                                </div>
                                                <h5>customer1@gmail.com</h5>
                                                <p className="font-semibold text-gray-700 px-3 py-3 rounded-sm">
                                                    Excellent sound quality with deep bass and crystal-clear audio. Very comfortable for long listening sessions.

                                                </p>
                                            </div>

                                            <div className="mt-8 bg-gray-100 rounded-sm px-5 py-5">
                                                <div className="flex  gap-5">
                                                    <h3 className="text-xl font-semibold">Alex John</h3>
                                                    <img className="h-8 max-[850px]:h-5" src={rating5}></img>
                                                </div>
                                                <h5>customer1@gmail.com</h5>
                                                <p className="font-semibold text-gray-700 px-3 py-3 rounded-sm">
                                                    Excellent sound quality with deep bass and crystal-clear audio. Very comfortable for long listening sessions.

                                                </p>
                                            </div>

                                            <div className="mt-8 bg-gray-100 rounded-sm px-5 py-5">
                                                <div className="flex  gap-5">
                                                    <h3 className="text-xl font-semibold">Alex John</h3>
                                                    <img className="h-8 max-[850px]:h-5" src={rating5}></img>
                                                </div>
                                                <h5>customer1@gmail.com</h5>
                                                <p className="font-semibold text-gray-700 px-3 py-3 rounded-sm">
                                                    Excellent sound quality with deep bass and crystal-clear audio. Very comfortable for long listening sessions.

                                                </p>
                                            </div>




                                        </div>



                                        <form className=" py-10 px-8 max-[850px]:px-3 w-full border-l-2 border-black/30 bg-gray-50">

                                            <h3 className="text-xl font-semibold border-b-2 w-full max-[850px]:w-90 h-10">Add a Review</h3>

                                            <div className="mt-8">
                                                <h4 className="text-lg text-gray-500">Your Rating</h4>
                                                <div className="flex gap-5 my-2 max-[850px]:flex-col">
                                                    <label className="cursor-pointer">
                                                        <input name="rating" className="hidden peer" type="radio" />
                                                        <img className="h-7 peer-checked:border-b-2 peer-checked:border-yellow-400 " src={rating1}></img>
                                                    </label>



                                                    <label className="cursor-pointer">
                                                        <input name="rating" className="hidden peer" type="radio" />
                                                        <img className="h-7  peer-checked:border-b-2 peer-checked:border-yellow-400 " src={rating2}></img>
                                                    </label>



                                                    <label className="cursor-pointer">
                                                        <input name="rating" className="hidden peer" type="radio" />
                                                        <img className="h-7 peer-checked:border-b-2 peer-checked:border-yellow-400 " src={rating3}></img>
                                                    </label>



                                                    <label className="cursor-pointer">
                                                        <input name="rating" className="hidden peer" type="radio" />
                                                        <img className="h-7 peer-checked:border-b-2 peer-checked:border-yellow-400 " src={rating4}></img>
                                                    </label>


                                                    <label className="cursor-pointer">
                                                        <input name="rating" className="hidden peer" type="radio" />
                                                        <img className="h-7 peer-checked:border-b-2 peer-checked:border-yellow-400 k" src={rating5}></img>
                                                    </label>







                                                </div>

                                                <h4 className="text-lg text-gray-500 mt-3">Name</h4>
                                                <input className=" border-2 max-[850px]:w-80 max-[426px]:w-40  border-black/30 w-130  focus:border-0 px-3 h-8 rounded-sm mt-3" type="text" />


                                                <h4 className="text-lg text-gray-500 mt-3">Email</h4>
                                                <input className=" border-2 max-[850px]:w-80 max-[426px]:w-40 border-black/30 w-130 focus:border-0 px-3 h-8 rounded-sm mt-3" type="text" />



                                                <h4 className="text-lg text-gray-500 mt-3">Your Review</h4>
                                                <textarea className=" border-2 max-[850px]:w-80 max-[426px]:w-40 border-black/30 w-130  focus:border-0 px-3 h-80 rounded-sm mt-3" type="text"></textarea>


                                            </div>
                                            <button className="bg-amber-400 py-3 px-3 mt-5 text-white rounded-sm  shadow hover:cursor-pointer">Give a Review</button>



                                        </form>

                                    </div>

                                )
                            }
                        </div>


                    ))
                }
            </div >



            {/* Related Product */}
            < div >

            </div >


            {/* CartPopup */}
            < AnimatePresence >
                {
                    cartPopup && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className="fixed top-2 right-3 z-50 shadow-xl shadow-black"
                        >
                            <CartPopup setCartPopup={setCartPopup} />
                        </motion.div>
                    )
                }
            </AnimatePresence >

            {/* Login PopUp */}

            {
                loginPopup && (
                    <div className=" fixed inset-0 bg-black/60 flex justify-center items-center">
                        <div className="bg-white h-120 rounded-sm border border-gray-400 w-180 flex flex-col justify-between items-center gap-5">
                            {/* close */}
                            <div className="flex justify-between w-full py-5 px-10">
                                <div></div>
                                <button onClick={() => setLoginPopup(false)} className="bg-black text-white px-2 rounded-sm cursor-pointer hover:bg-gray-900">X</button>
                            </div>

                            <div className=" flex flex-col gap-5 mb-30">

                                <h1 className="text-2xl font-semibold">Please Login First</h1>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="someone@gamil.com" className="border w-80 h-8 px-2 py-1" type="text" />
                                    <input id="password" value={password} placeholder="#hkAl!@k&7" onChange={(e) => setPassword(e.target.value)} className="border w-80 h-8 px-2 py-1" type="password" />
                                    <button type="submit" className="bg-black text-white py-1 hover:bg-black/80 cursor-pointer">{userLoginLoading ? "Logining..." : "Login"}</button>

                                </form>
                                <div>
                                    <h1>New to the Platfrom ? <Link to="/dashboard-profile/register" className="text-blue-700 border-b">Register</Link></h1>
                                </div>



                            </div>

                        </div>

                    </div>
                )
            }

        </div >
    )
}

export default SingleProductPage