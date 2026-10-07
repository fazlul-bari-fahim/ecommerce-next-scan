import copyright from "../assets/copyright.png"
import logo from "../assets/logo.jpeg"
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

                <div className="flex flex-row gap-25 max-[376px]:gap-5">


                    <div className="flex flex-col gap-3">
                        {/* logo */}

                        <img className="h-40 w-40 " src={logo}>
                        </img>
                        <h3 className="text-white/50">Call Us 24/7</h3>
                        <h1 className="text-white text-2xl">+8801453-526 120</h1>
                        <h2 className="text-white/90 text-xl"> Molibazar trade center,Mitford, Dhaka.</h2>
                        <h3 className="text-lg text-gray-300 underline">nlmcrockerys@gmail.com</h3>
                        <div className="flex flex-row gap-8">

                            <div>
                                <img className="h-8 w-8" src={fb}></img>
                                <a href="https://www.facebook.com/nlmcrockerys" className="text-white">view</a>
                            </div>
                            <div>
                                <img className="h-8 w-8" src={youtube}></img>
                                <a href="https://www.facebook.com/nlmcrockerys" className="text-white">view</a>
                            </div>
                            <div>
                                <img className="h-8 w-8" src={insta}></img>
                                <a href="https://www.facebook.com/nlmcrockerys" className="text-white">view</a>
                            </div>
                            <div>
                                <img className="h-8 w-8" src={twit}></img>
                                <a href="https://www.facebook.com/nlmcrockerys" className="text-white">view</a>
                            </div>

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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.9170854357767!2d90.3981281!3d23.714654799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9a81835e95f%3A0xf4c17b92a7ae0a26!2sMoulvibazar%20Trade%20Centre!5e0!3m2!1sen!2sbd!4v1786908006721!5m2!1sen!2sbd"
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
                    <h2 className="text-white text-lg max-[426px]:text-[10px]">Copyright</h2> <img className="h-7 w-7 max-[426px]:w-5 max-[426px]:h-5" src={copyright}></img> <h2 className=" text-white text-lg max-[426px]:text-[10px]">2026 nlm crockery. Created By MERN</h2>
                </div>
            </div>

        </div>
    )
}

export default Footer