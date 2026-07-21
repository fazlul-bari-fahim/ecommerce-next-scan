import logo from "../assets/logo.png"
import cart from "../assets/grocery-store.png"
import user from "../assets/user.png"
import search from "../assets/search (1).png"
import call from "../assets/phone-call.png"
// import heart from "../assets/heart.png"
import category from "../assets/category.png"
import downArrow from "../assets/caret-down.png"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import CartStore from "../Store/CartStore"
import ProductCategoryStore from "../Store/ProductCategoryStore.js"
import productStore from "../Store/productStore.js"
import { fileURL } from "../Helpers/Config.js"



const Navbar = ({ setCartPopup }) => {


    const navigate = useNavigate();

    const { cartGetRequest, totalCart } = CartStore();
    const { navbarallCategory, navbargetAllCategoryRequest, allCategory } = ProductCategoryStore();

    const [department, setDepartment] = useState(false);




    const [keyword, setKeyword] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);
    const searchRef = useRef(null);


    const { searchSuggestion, searchSuggestionRequest, } = productStore();




    const handleSearch = () => {
        if (!keyword.trim()) return;

        setShowSuggestion(false);
        navigate(`/all-products?keyword=${encodeURIComponent(keyword)}`);
    };



    useEffect(() => {
        if (!keyword.trim()) {
            setShowSuggestion(false);
            return;
        }

        const timer = setTimeout(() => {
            searchSuggestionRequest(keyword);
            setShowSuggestion(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [keyword]);



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target)
            ) {
                setShowSuggestion(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);








    useEffect(() => {
        const fetchData = async () => {

            try {

                await cartGetRequest();
                await navbargetAllCategoryRequest(4, 1)


            } catch (error) {
                console.log(error);

            }
        }; fetchData();
    }, [])





    return (
        <div className="flex flex-col justify-center py-5 gap-3 items-center  w-full  bg-[#fef8fc]">
            <div className="bg-[#ed1d24] flex items-center justify-between px-10 max-[376px]:px-5 w-300 max-[1025px]:w-230   max-[770px]:w-180 max-[376px]:w-90 max-[426px]:w-100 max-[321px]:w-75  h-25 rounded-2xl">

                {/* Logo */}
                <div className="flex justify-center items-center">
                    <img className="h-15  w-15 max-[426px]:h-12 max-[426px]:w-12" src={logo}></img>
                    <h1 className="font-bold text-2xl max-[1023px]:hidden">Next Scan</h1>
                </div>

                {/* search bar section */}

                <div ref={searchRef} className="flex relative flex-col">
                    {/* search bar */}
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => {
                            if (keyword.trim()) {
                                setShowSuggestion(true);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        placeholder="Search products..."
                        className="h-10 w-80  max-[361px]:mr-5 max-[1070px]:w-60 max-[705px]:w-40 max-[321px]:w-30 bg-white rounded-lg shadow-inner outline-none shadow-black/30 px-2 py-2"
                    />

                    {
                        showSuggestion && (

                            <div className="absolute top-11 w-full bg-white rounded-lg border shadow-lg z-50">

                                {
                                    searchSuggestion.map((item) => (

                                        <div
                                            key={item._id}
                                            onClick={() => {
                                                setKeyword(item.title);
                                                setShowSuggestion(false);
                                                navigate(`/single-products/${item._id}`);
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-200/70 border border-black/10 cursor-pointer"
                                        >

                                            <img
                                                src={`http://localhost:5000/api/v1/get-file/${item.big_image}`}
                                                className="w-12 h-12 object-cover rounded"
                                            />

                                            <div>

                                                <h3 className="font-medium">
                                                    {item.title}
                                                </h3>

                                                <p className="text-red-700 font-semibold">
                                                    {item.discount_price}
                                                </p>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                        )}
                    <div onClick={handleSearch} className="h-10 w-15 max-[426px]:w-8 bg-black rounded-r-lg absolute left-75 max-[1070px]:left-50 max-[705px]:left-30 max-[426px]:left-32 max-[321px]:left-25 flex justify-center items-center">
                        <img className="h-6 w-6" src={search}></img>
                    </div>

                    {/* Category */}
                    <ul className="flex gap-5 text-[12px] max-[705px]:text-[8px] max-[705px]:gap-2 max-[321px]:hidden mt-3">
                        {
                            navbarallCategory?.map((item) => (
                                <NavLink to={`/category-products/${item?._id}`} key={item?._id} className="text-white font-orbitron border-r-2 pr-3">{item?.category_name}</NavLink>

                            ))
                        }
                    </ul>

                </div>


                {/* call number */}
                <div className="border-2 border-white h-15 w-50 max-[930px]:w-35 max-[705px]:w-25 max-[705px]:h-10 max-[585px]:hidden  rounded-lg flex justify-between items-center px-2 py-2">
                    <div>
                        <img className="h-8 w-8 max-[930px]:w-5 max-[930px]:h-5 max-[705px]:h-3 max-[705px]:w-3" src={call}></img>

                    </div>
                    <div className="felx flex-col items-center justify-center px-1 py-1">
                        <h1 className="text-white text-sm font-bold max-[930px]:text-[10px] max-[705px]:text-[6px]">Need Help? Call Us:</h1>
                        <h1 className="text-white text-md max-[930px]:text-[10px] max-[705px]:text-[7px]">+88013-4545 4565</h1>
                    </div>

                </div>



                {/* Cart Icon */}
                <div className="flex gap-8 max-[930px]:gap-4 max-[725px]:gap-4 max-[490px]:gap-3 relative">
                    <button className="cursor-pointer" onClick={() => navigate("/dashboard-profile")}><img className="h-8 w-8 max-[930px]:h-5 max-[930px]:w-5" src={user}></img></button>
                    {/* <img className="h-8 w-8 max-[930px]:h-5 max-[930px]:w-5" src={heart}></img> */}
                    {/* <div className="bg-black h-5 w-5 rounded-full absolute left-20 max-[930px]:left-12 max-[930px]:bottom-3 bottom-5 flex justify-center items-center">
                    <p className="text-white font-bold ">0</p>

                </div> */}


                    <button onClick={() => setCartPopup(true)}>
                        <img className="h-8 w-8 max-[930px]:h-5 max-[930px]:w-5 cursor-pointer" src={cart}></img>
                    </button>
                    <div className="bg-black h-5 w-5 rounded-full absolute left-21 max-[930px]:left-12 max-[725px]:left-12 bottom-5 max-[930px]:bottom-3 flex justify-center items-center">
                        <p className="text-white font-bold ">{totalCart ?? 0}</p>

                    </div>

                </div>




            </div>

            <div className="bg-black  flex justify-between max-[321px]:justify-center items-center px-5 w-300 max-[1025px]:w-230 max-[770px]:w-180 max-[426px]:w-100 max-[376px]:w-90 max-[321px]:w-75   h-15 rounded-2xl">

                {/* department */}
                <div onClick={() => setDepartment(!department)} className="bg-white max-[321px]:hidden  cursor-pointer h-10 w-60 max-[885px]:w-50 max-[750px]:w-20  rounded-md flex items-center px-2 justify-between">
                    <div className="bg-black  h-7 w-7 rounded-sm flex justify-center items-center">
                        <img className="h-5 w-5" src={category}></img>

                    </div>

                    <h3 className="max-[750px]:hidden">All Department</h3>

                    <img className="h-5 w-5" src={downArrow}></img>

                    <div className="relative">
                        {
                            department ?

                                <div className="absolute top-10 right-0 max-[426px]:-right-40 w-60 flex flex-col  h-auto   bg-white rounded-lg border shadow-lg z-50">
                                    {
                                        allCategory?.map((item) => {
                                            return (
                                                <NavLink onClick={() => setDepartment(false)} to={`/category-products/${item?._id}`} className="flex gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2">
                                                    <img className="h-7" src={`${fileURL}/${item?.category_image}`}></img>
                                                    <div>{item?.category_name}</div>

                                                </NavLink>
                                            )
                                        })
                                    }


                                </div>

                                :
                                <div></div>

                        }
                    </div>


                </div>


                {/* Navbar */}
                <div>
                    <ul className="text-black flex gap-8 text-md max-[788px]:text-[13px] max-[575px]:text-[12px] max-[928px]:gap-3 max-[805px]:gap-1 ">
                        <li><NavLink className={({ isActive }) => `px-2 py-1 ${isActive ? "font-bold text-white border-b border-white" : "text-white font-semibold "}`} to={"/"}>Home</NavLink></li>
                        <li><NavLink className={({ isActive }) => `px-2 py-1 ${isActive ? "font-bold text-white border-b border-white" : "text-white font-semibold "}`} to={"/all-products"}>All Products</NavLink></li>
                        <li ><NavLink className={({ isActive }) => `px-2 py-1 ${isActive ? "font-bold text-white border-b border-white" : "text-white font-semibold "}`} to={"/contact"}>Contact</NavLink></li>
                    </ul>
                </div>

                <div className="bg-white max-[426px]:hidden  h-10 w-50 max-[845px]:w-40 max-[630px]:w-25 rounded-xl flex justify-center items-center">
                    <h3 className="text-black text-xl font-bold max-[630px]:text-[12px]">Sale! 30% OFF!</h3>

                </div>


            </div>



        </div>
    )
}

export default Navbar;











