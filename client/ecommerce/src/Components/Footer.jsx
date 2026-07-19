import copyright from "../assets/copyright.png"
import logo from "../assets/logo.png"
import fb from "../assets/facebook.png"
import youtube from "../assets/youtube.png"
import insta from "../assets/instagram.png"
import twit from "../assets/twitter.png"
import { NavLink } from "react-router-dom"
import ProductCategoryStore from "../Store/ProductCategoryStore"




const Footer = () => {

    const { navbarallCategory } = ProductCategoryStore();



    return (
        <div className="bg-black w-full h-auto px-8 py-8">

            {/* 1st section */}
            <div className="flex flex-row gap-20 my-5 max-[680px]:flex-col">

                {/* 1seciton */}

                <div className="flex flex-row gap-25">


                    <div className="flex flex-col gap-3">
                        {/* logo */}

                        <img className="h-40 w-40 " src={logo}>
                        </img>
                        <h3 className="text-white/50">Call Us 24/7</h3>
                        <h1 className="text-white text-2xl">+8801453-526 120</h1>
                        <h2 className="text-white/90 text-xl"> 215 Multiplan, Elephent Road, Dhaka</h2>
                        <h3 className="text-lg text-gray-300 underline">contact@gocart.com</h3>
                        <div className="flex flex-row gap-8">
                            <img className="h-8 w-8" src={fb}></img>
                            <img className="h-8 w-8" src={youtube}></img>
                            <img className="h-8 w-8" src={insta}></img>
                            <img className="h-8 w-8" src={twit}></img>

                        </div>


                    </div>



                    {/* 2section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xl text-white/60">Categories</h3>

                        {
                            navbarallCategory?.map((item) => {

                                return (
                                    <NavLink to={`/category-products/${item?._id}`} key={item?._id} className="text-xl text-white hover:underline hover:text-[#fe8110]">{item?.category_name}</NavLink>

                                )
                            })
                        }
                    </div>
                </div>





                {/* 2section */}
                <div className="w-full h-110">
                    <iframe
                        className="rounded-lg"
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.956025477763!2d90.38296581058205!3d23.73870057858942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8c78b718c03%3A0x85f0047e17dda266!2sMultiplan%20Computer%20City%20Center%2C%20341%20New%20Elephant%20Rd%2C%20Dhaka%201205!5e1!3m2!1sen!2sbd!4v1780558434604!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>



            {/* 2nd section */}
            <div className=" flex flex-row border-t-2 border-white  justify-center items-center  py-8 h-20 px-8">
                <div className="flex flex-row items-center gap-5">
                    <h2 className="text-white text-lg max-[426px]:text-[10px]">Copyright</h2> <img className="h-7 w-7 max-[426px]:w-5 max-[426px]:h-5" src={copyright}></img> <h2 className=" text-white text-lg max-[426px]:text-[10px]">2026 Go Cart. Created By MERN</h2>
                </div>
            </div>

        </div>
    )
}

export default Footer