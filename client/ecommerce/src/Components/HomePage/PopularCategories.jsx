import { useEffect, useRef } from "react";


import rightarrow from "../../assets/arrow-right.png"
import ProductCategoryStore from "../../Store/ProductCategoryStore";
import { fileURL } from "../../Helpers/Config.js";
import { NavLink } from "react-router-dom";





const PopularCategories = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };




  const { getAllCategoryRequest, allCategory } = ProductCategoryStore();


  useEffect(() => {
    const fetchData = async () => {
      try {

        await getAllCategoryRequest(100, 1)



      } catch (error) {
        console.log(error);

      }

    };
    fetchData();
  }, []);












  return (
    <div className="w-full flex flex-col items-center relative py-5">
      {/* text */}
      <div className="flex flex-col mb-10">
        <h1 className="text-xl my-10 bg-red-600 px-4 py-1 text-white">Popular Categories</h1>

      </div>

      {/* Button */}
      <button className="absolute top-80 left-10 hover:cursor-pointer h-auto w-auto bg-white rounded-full" onClick={scrollLeft}><img className="h-10 w-auto rotate-180" src={rightarrow}></img></button>
      <button className="absolute top-80 left-320 max-[1325px]:left-310 max-[1282px]:left-300 max-[1235px]:left-280 max-[1160px]:left-250 max-[1026px]:left-240 max-[955px]:left-200 max-[830px]:left-180 max-[740px]:left-150 max-[635px]:left-130 max-[555px]:left-110 max-[426px]:left-90 max-[321px]:left-60  hover:cursor-pointer h-auto w-auto bg-white rounded-full" onClick={scrollRight}><img className="h-10 w-auto" src={rightarrow}></img></button>



      <div ref={scrollRef} className="h-80   w-full gap-2 flex py-5 overflow-x-auto scroll-smooth scrollbar-none">

        {/* Category */}
        {

          allCategory?.map((item) => (
            <NavLink to={`/category-products/${item?._id}`} key={item?._id} className="bg-[#f6f6f6] border border-black/20 shadow-lg shadow-black/30 min-w-80  rounded-2xl py-5 flex flex-col justify-center items-center">
              <img className="h-30 w-auto" src={`${fileURL}/${item.category_image}`}></img>
              <h1 className="text-2xl text-black">{item?.category_name}</h1>


            </NavLink>
          ))
        }



      </div>
    </div>

  );
};

export default PopularCategories;









