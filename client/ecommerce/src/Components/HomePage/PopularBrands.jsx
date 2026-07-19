import { useEffect } from "react";
import brandStore from "../../Store/brandStore"
import { fileURL } from "../../Helpers/Config.js";








const PopularBrands = () => {


  const { getBrandRequest, getBrandLoading, allBrand } = brandStore();



  useEffect(() => {
    const fetchData = async () => {
      try {

        await getBrandRequest(100, 1)

      } catch (error) {
        console.log(error);

      }
    }; fetchData();
  }, []);






  return (
    <div className="flex flex-col justify-center items-center mt-10 mb-20 gap-5">
      <h1 className="text-xl my-10 bg-red-600 px-4 py-1 text-white">Popular Brands</h1>


      <div className="grid grid-cols-6 max-[1025px]:grid-cols-5 max-[769px]:grid-cols-4 max-[620px]:grid-cols-3 max-[426px]:grid-cols-2 gap-10 mx-5">

        {
          getBrandLoading ? "Brand Loading..." : allBrand?.map((item) => (
            <div className="flex flex-col items-center gap-5" key={item?._id}>
              <img className="h-40 max-[321px]:h-20 overflow-hidden bg-center bg-cover shadow shadow-black " src={`${fileURL}/${item?.brand_image}`}></img>
              <h3 className="text-xl font-bold">{item?.brand_name}</h3>

            </div>
          ))
        }

      </div>
    </div>
  )
}

export default PopularBrands