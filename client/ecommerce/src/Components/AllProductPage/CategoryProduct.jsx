import { useEffect, useRef } from "react"
import { fileURL } from "../../helpers/config";
import ProductCategoryStore from "../../Store/ProductCategoryStore";
import { NavLink } from "react-router-dom";




const CategoryProduct = () => {

    const scrollRef = useRef(null);
    const { getAllCategoryRequest, allCategory, getAllCategoryLoading } = ProductCategoryStore();


    useEffect(() => {
        const fetchData = async () => {

            try {
                await getAllCategoryRequest(10, 1)

            } catch (error) {
                console.log(error)
            }

        }; fetchData();
    }, []);





    const handleWheel = (e) => {
        e.preventDefault();
        scrollRef.current.scrollLeft += e.deltaY;
    };
    return (
        <div>
            <div ref={scrollRef} onWheel={handleWheel} className="flex flex-row w-330 max-[1025px]:w-260 max-[770px]:w-195 max-[426px]:w-100 max-[376px]:w-90 max-[321px]:w-80 cursor-grabbing mb-5 mt-10 px-10 gap-10 overflow-x-auto snap-x scrollbar-none ">
                {/* Category Card */}
                <div className="flex flex-col gap-2 shrink-0">
                    <h1 className="bg-[#eaeaea] h-18 w-18 flex justify-center items-center rounded-full border border-black/20 font-bold">ALL</h1>
                    <h4 className="font-semibold">Shop All</h4>

                </div>


                <div className="flex flex-col gap-2 shrink-0">
                    <h1 className="bg-[#d8fde0] h-18 w-18 flex justify-center items-center rounded-full border border-black/20 font-bold text-green-600">NEW</h1>
                    <h4 className="font-semibold">New Arrivals</h4>

                </div>


                <div className="flex flex-col gap-2  items-center shrink-0">
                    <h1 className="bg-[#fdd8d8] h-18 w-18 flex justify-center items-center rounded-full border border-black/20 font-bold text-red-600">SALE</h1>
                    <h4 className="font-semibold">Sale</h4>

                </div>


                {
                    getAllCategoryLoading ? "Category Loading..." : allCategory?.map((item) => (
                        <NavLink to={`/category-products/${item?._id}`} key={item?._id} className="flex flex-col gap-2  items-center shrink-0">
                            <div className=" h-18 w-18 flex justify-center items-center rounded-full border border-black/20">
                                <img className="h-15 w-auto" src={`${fileURL}/${item?.category_image}`}></img>

                            </div>


                            <h4 className="font-semibold">{item?.category_name}</h4>

                        </NavLink>
                    ))
                }






            </div>
        </div>
    )
}

export default CategoryProduct