import { useState } from "react"
import grid from "../../assets/grid.png"
import grid4 from "../../assets/grid4.png"
import list from "../../assets/list.png"
import productStore from "../../Store/productStore.js"
import SingleProduct from "../SingleProduct"





const Products = () => {


    const { allProduct, setShowProduct } = productStore();



    const [sort, setSort] = useState("sort3");






    return (
        <div className="flex flex-col gap-5 my-10 mx-5 max-[770px]:mx-2 max-w-250">

            {/* sort */}
            <div className="flex flex-row justify-between ">
                {/* left */}
                <div className="flex flex-row gap-3 max-[770px]:hidden">
                    <button onClick={() => setSort("sort4")} className={`hover:cursor-pointer border-r-2 px-1 py-1 border-black/10 rounded-sm flex justify-center items-center ${sort === "sort4" ? "bg-red-300" : ""}`}><img className="h-6 w-6" src={grid4}></img></button>
                    <button onClick={() => setSort("sort3")} className={`hover:cursor-pointer border-r-2 px-1 py-1 border-black/10 rounded-sm flex justify-center items-center ${sort === "sort3" ? "bg-red-300" : ""}`}><img className="h-8 w-8" src={grid}></img></button>
                    <button onClick={() => setSort("sort2")} className={`hover:cursor-pointer border-r-2 px-1 py-1 border-black/10 rounded-sm flex justify-center items-center ${sort === "sort2" ? "bg-red-300" : ""}`}><img className="h-8 w-8" src={list}></img></button>

                </div>


                {/* Right */}
                <div className="flex flex-row gap-3">
                    <div className="flex flex-row gap-3 items-center ">
                        <h1 className="font-semibold">Show</h1>
                        <select onChange={(e) => setShowProduct(Number(e.target.value))} className="border border-black/30 px-3 py-1 rounded-sm text-sm cursor-pointer">
                            <option value={20}>20</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                            <option value={10000}>All</option>
                        </select>
                    </div>

                    {/* <div className="flex flex-row gap-3 items-center">

                        <select className="border cursor-pointer border-black/30 px-3 py-1 rounded-sm text-sm">
                            <option>Default Sorting</option>
                            <option>Sort by latest</option>
                            <option>Sort by price: low to high</option>
                            <option>Sort by price: high to low</option>

                        </select>
                    </div> */}


                </div>
            </div>



            {/* Product */}

            <div className={`grid ${sort === "sort3" ? "grid-cols-3" : sort === "sort2" ? "grid-cols-2" : sort === "sort4" ? "grid-cols-4" : ""} gap-y-5 max-[1310px]:grid-cols-2`}>
                {/* product card */}



                {
                    allProduct?.map((item) => (
                        <SingleProduct sort={sort} key={item?._id} product={item} />
                    ))
                }





            </div>




        </div>
    )
}

export default Products