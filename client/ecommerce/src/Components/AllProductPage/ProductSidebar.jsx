import { useEffect, useState } from "react";
import search from "../../assets/magnifying-glass.png"
import ProductCategoryStore from "../../Store/ProductCategoryStore";
import brandStore from "../../Store/brandStore";
import productStore from "../../Store/productStore.js";
import { useSearchParams } from "react-router-dom";



const ProductSidebar = () => {



    const { getBrandRequest, allBrand, getBrandLoading, totalBrand } = brandStore();
    const { getAllCategoryRequest, allCategory, getAllCategoryLoading, totalCategory } = ProductCategoryStore();
    const { productGetRequest, showProduct } = productStore();
    const [categoryId, setCategoryId] = useState("0");
    const [brandId, setbrandId] = useState("0");
    const [showCategory, setShowCategory] = useState(10);
    const [showBrand, setShowBrand] = useState(5);




    const perpage = showProduct;



    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "0";




    useEffect(() => {
        const fetchData = async () => {
            await productGetRequest({
                category_id: categoryId,
                brand_id: brandId,
                remark: 0,
                keyword: keyword,
                per_page: perpage,
                page_no: 1,
            });

        }; fetchData();
    }, [showProduct, categoryId, brandId, keyword]);







    useEffect(() => {
        const fetchData = async () => {

            try {

                await getAllCategoryRequest(showCategory, 1);
                await getBrandRequest(showBrand, 1);


            } catch (error) {
                console.log(error)
            }

        }; fetchData();
    }, [showCategory, showBrand]);



    return (
        <div className="flex flex-col gap-5 my-10">





            {/* Filter by price */}
            {/* <div className="w-70  mx-3 px-5 py-5 h-auto rounded-lg flex flex-col gap-3">

                <label className="text-xl font-semibold">Filter By Price</label>


                <label htmlFor="price" className="flex flex-col gap-2">
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"1000"} />100 tk - 1000 tk</li>
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"5000"} />1000 tk - 5000 tk</li>
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"10000"} />5000 tk - 10,000 tk</li>
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"50000"} />10,000 tk - 50,000 tk</li>
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"100000"} />50,000 tk - 1,00,000 tk</li>
                    <li className="flex flex-row gap-3 items-center"><input onChange={(e) => setPrice(e.target.value)} className="h-4 w-4" type="radio" name="price" value={"500000"} />1,00,000 tk - 5,00,000 tk</li>
                </label>


            </div> */}




            {/* All Category */}
            <div className="w-70 max-[770px]:w-60 max-[670px]:hidden bg-[#f3f3f3ce] mx-3 px-5 py-5 h-auto rounded-lg flex flex-col gap-3 border border-black/5">


                <div className="flex justify-between">

                    <h1 className="text-xl font-semibold">All Categories</h1>
                    <h1 className="text-xl font-semibold">{totalCategory}</h1>

                </div>

                {/* search bar */}
                <div className="relative">

                    <input className="bg-white h-8 w-60 max-[770px]:w-50 max-[670px]:w-40 shadow-inner shadow-black/20 border border-black/20 rounded-md outline-0 px-2" placeholder="Find a category" />
                    <img className="h-5 w-5 absolute top-2 right-3" src={search}></img>
                </div>

                <ul className="flex flex-col gap-2">

                    {/* list */}
                    <li className="flex flex-col gap-3 justify-between">
                        <label htmlFor="category" className="flex gap-3 items-center"><input name="category" value={0} onChange={(e) => setCategoryId(e.target.value)} className="h-4 w-4 cursor-pointer accent-red-700 " type="radio" />All</label>
                        {
                            getAllCategoryLoading ? "Category Loading..." : allCategory?.map((item) => (
                                <label key={item?._id} htmlFor="category" className="flex gap-3 items-center">
                                    <input name="category" value={item?._id} onChange={(e) => setCategoryId(e.target.value)} className="h-4 w-4 cursor-pointer accent-red-700 " type="radio" />
                                    {item?.category_name}
                                </label>
                            ))
                        }
                    </li>

                    {
                        showCategory === 10 ?
                            <div className="flex w-full justify-center items-center">
                                <button onClick={() => setShowCategory(500)} className="bg-white border border-gray-400 mt-3 w-30 cursor-pointer shadow-sm transition-all active:scale-75 duration-200">Show More</button>


                            </div> :
                            <div className="flex w-full justify-center items-center">
                                <button onClick={() => setShowCategory(10)} className="bg-white border border-gray-400 mt-3 w-30 cursor-pointer shadow-sm transition-all active:scale-75 duration-200">Show Less</button>

                            </div>
                    }


                </ul>


            </div>





            {/* All Brand */}
            <div className="w-70 max-[770px]:w-60 max-[670px]:hidden bg-[#f3f3f3ce] mx-3 px-5 py-5 h-auto rounded-lg flex flex-col gap-3 border border-black/5">


                <div className="flex justify-between">

                    <h1 className="text-xl font-semibold">All Brands</h1>
                    <h1 className="text-xl font-semibold">{totalBrand}</h1>

                </div>

                {/* search bar */}
                <div className="relative">

                    <input className="bg-white h-8 w-60 max-[770px]:w-50 max-[670px]:w-40 shadow-inner shadow-black/20 border border-black/20 rounded-md outline-0 px-2" placeholder="Find a category" />
                    <img className="h-5 w-5 absolute top-2 right-3" src={search}></img>
                </div>

                <ul className="flex flex-col gap-2">

                    {/* list */}
                    <li className="flex flex-col gap-3 justify-between">
                        <label htmlFor="brand" className="flex gap-3 items-center"><input name="brand" value={0} onChange={(e) => setbrandId(e.target.value)} className="h-4 w-4 cursor-pointer accent-red-700 " type="radio" />All</label>
                        {
                            getBrandLoading ? "Brand Loading..." : allBrand?.map((item) => (
                                <label htmlFor="brand" className="flex gap-3 items-center">
                                    <input key={item?._id} name="brand" value={item?._id} onChange={(e) => setbrandId(e.target.value)} className="h-4 w-4 cursor-pointer accent-red-700 " type="radio" />
                                    {item?.brand_name}
                                </label>
                            ))
                        }
                    </li>

                    {
                        showBrand === 5 ?
                            <div className="flex w-full justify-center items-center">
                                <button onClick={() => setShowBrand(500)} className="bg-white border border-gray-400 mt-3 w-30 cursor-pointer shadow-sm transition-all active:scale-75 duration-200">Show More</button>


                            </div> :
                            <div className="flex w-full justify-center items-center">
                                <button onClick={() => setShowBrand(5)} className="bg-white border border-gray-400 mt-3 w-30 cursor-pointer shadow-sm transition-all active:scale-75 duration-200">Show Less</button>

                            </div>
                    }


                </ul>


            </div>




        </div>
    )
}

export default ProductSidebar