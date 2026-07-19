import { useEffect, useState } from "react";
import productStore from "../../Store/productStore.js"
import SingleProduct from "../SingleProduct.jsx"
import { NavLink } from "react-router-dom";
import qrpayment from "../../assets/qr-payment.png"




export const ProductSection = () => {


  const { productGetLoading, allProduct, productGetRequest, totalProduct } = productStore();


  const [pageNo, setPageNo] = useState(1);
  const perPage = 16;
  const totalPage = Math.ceil(totalProduct / perPage);






  useEffect(() => {
    const fetchData = async () => {
      try {

        await productGetRequest({
          category_id: 0,
          brand_id: 0,
          remark: 0,
          keyword: 0,
          per_page: perPage,
          page_no: pageNo,
        });







      } catch (error) {
        console.log(error);

      }
    }; fetchData();
  }, [pageNo]);








  return (
    <div className="flex flex-col justify-center items-center px-8 max-[426px]:px-0 gap-10">
      {/* text */}
      <div className="flex flex-col items-center  gap-5 my-20">
        <h1 className="text-4xl font-bold max-[380px]:text-sm">New Arrival Products</h1>
        <div className="flex gap-3 justify-center items-center">
          <div className="bg-black border-t w-20"></div>
          <div className="bg-red-600">
            <img className="h-8 " src={qrpayment}></img>
          </div>
          <div className="bg-black border-t w-20"></div>
        </div>
      </div>



      <div className="grid grid-cols-4    max-[1025px]:grid-cols-3 max-[769px]:grid-cols-2" >

        {/* product */}
        {
          allProduct?.map((item) => (
            <NavLink className=" rounded-lg flex" key={item?._id} to={`/single-products/${item?._id}`}>
              <SingleProduct productGetLoading={productGetLoading} product={item} />
            </NavLink>
          ))
        }




      </div>

      {/* pagenation */}

      {
        totalProduct > perPage && (
          <div className="w-full flex justify-center items-center">
            <div className="flex gap-10 max-[380px]:w-70 bg-gray-200 px-8 max-[380px]:px-3 py-3 max-[380px]:py-2 shadow-inner shadow-black/50 rounded-3xl max-[380px]:rounded-sm">
              <button onClick={() => {
                if (pageNo > 1) {
                  setPageNo(pageNo - 1);
                }
              }} className="bg-black text-white w-20  shadow-md text-sm max-[380px]:text-[10px] max-[380px]:px-2 rounded-sm cursor-pointer hover:bg-black/90 transition-all active:scale-95 duration-75">Previous</button>
              <div className="flex gap-5 cursor-pointer">

                <div className=" h-8 w-auto rounded-full flex gap-3 justify-center items-center text-xl font-semibold" >{Array.from({ length: totalPage }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setPageNo(page)}
                      className={`h-8 w-8 rounded-full flex justify-center items-center font-semibold transition-all ${pageNo === page
                        ? "bg-black text-white"
                        : " text-black hover:bg-gray-300"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}</div>
              </div>
              <button onClick={() => {

                if (totalPage > pageNo) {
                  setPageNo(pageNo + 1)
                }

              }} className="bg-black text-white w-20 shadow-md text-sm max-[380px]:text-[10px] max-[380px]:py-1 rounded-sm cursor-pointer hover:bg-black/90 transition-all active:scale-95 duration-75">Next</button>
            </div>

          </div>
        )


      }
    </div >
  )
}
