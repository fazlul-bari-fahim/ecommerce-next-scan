import edit from "../assets/editing.png"
import Delete from "../assets/delete.png"

import { useEffect, useState } from "react"
import productStore from "../stores/productStore"
import { useNavigate } from "react-router-dom"
import hoatDeal from "../assets/hot-deal.png"
import hoatDealBlack from "../assets/hot-sale.png"
import HotDeal from "../components/HotDeal"
import HotDealStore from "../stores/HotDealStore"
import RemoveHotDeals from "../components/RemoveHotDeals"


const AllProducts = () => {


  const { productGetRequest, allProduct, totalProduct, deleteProductRequest, deleteProductLoading } = productStore();
  const { getHotDealRequest, getHotDealdata } = HotDealStore();
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Hot Deal
  const [hotDeal, setHotDeal] = useState(false);
  const [hotDealId, setHotDealId] = useState("");
  const [removehotDeal, setRemoveHotDeal] = useState(false);





  const Navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      try {

        await productGetRequest({
          category_id: 0,
          brand_id: 0,
          remark: 0,
          keyword: 0,
          per_page: 10000,
          page_no: 1,


        });

        await getHotDealRequest();



      } catch (error) {
        console.log(error);

      }
    };
    fetchData();
  }, []);








  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await deleteProductRequest(
      deleteId,
    );

    if (result === true) {
      await productGetRequest({
        category_id: 0,
        brand_id: 0,
        remark: 0,
        keyword: 0,
        per_page: 10000,
        page_no: 1,


      });
      setDeletePopup(false);
    }


  }



  return (
    <div className="bg-[#e4e4e4] max-[426px]:mb-10 max-[426px]:w-105 w-auto min-h-screen flex  justify-center">

      <div className="flex flex-col mt-10">

        <div className="flex flex-row justify-between my-3 mx-5">
          <h1 className="text-xl font-semibold">All Products:</h1>
          <h1 className="text-xl font-semibold flex flex-row gap-3">Total Products:<h3 className="text-lg font-semibold text-green-600">{totalProduct}</h3></h1>
        </div>
        <table className="bg-white h-auto mb-20 w-270 max-[426px]:w-95 rounded-lg shadow shadow-black  flex gap-5 flex-col px-8 py-8 ">

          <thead>
            <tr className="flex">
              <th className="w-30 flex justify-center max-[426px]:hidden">Category</th>
              <th className="w-80  flex justify-center max-[426px]:hidden">Title</th>
              <th className="w-30  flex justify-center ">Image</th>
              <th className="w-30  flex justify-center max-[426px]:hidden">Brand</th>
              <th className="w-20 flex  justify-center">Stock</th>
              <th className="w-30  flex justify-center">Price</th>
              <th className="w-40  flex justify-center">Manage</th>
            </tr>
          </thead>



          <tbody className="flex flex-col gap-5">

            {/* 1st */}


            {
              allProduct?.map((item) => (

                <tr key={item?._id} className="flex bg-gray-300/50 hover:bg-gray-300/80 hover:cursor-pointer  px-3 py-2 rounded-lg items-center">
                  <td className="w-30 flex max-[426px]:hidden">{item?.category?.category_name}</td>
                  <td className="w-80  flex justify-center max-[426px]:hidden">{item?.title}</td>
                  <td className="w-30  flex justify-center"><img className="h-10" src={`http://localhost:5000/api/v1/get-file/${item?.big_image}`}></img></td>
                  <td className="w-30  flex justify-center max-[426px]:hidden">F&S Fahion</td>
                  <td className="w-20 flex justify-center text-green-600 font-bold">{item?.stock}</td>
                  <td className="w-30  flex justify-center">{item?.regular_price}</td>
                  <td className="w-40  flex items-center justify-center">
                    <div className="flex gap-5">
                      <button title={`${getHotDealdata?.find((items) => items?.product_id === item?._id) ? "Remove it from Hot Deal" : "Make it Hot Deal"}`}
                        onClick={() => getHotDealdata?.find((items) => items.product_id === item?._id)
                          ?
                          (
                            setRemoveHotDeal(true),
                            setHotDealId(item?._id)
                          )

                          :
                          (
                            setHotDeal(true),
                            setHotDealId(item?._id)
                          )
                        }>

                        <img className="h-7 w-7 hover:cursor-pointer" src={getHotDealdata?.find((items) => items.product_id === item._id) ? hoatDeal : hoatDealBlack}></img>


                      </button>
                      <button title="Make Edit" onClick={() => Navigate(`/edit-product/${item?._id}`)}><img className="h-5 w-5 hover:cursor-pointer" src={edit}></img></button>
                      <button title="Delete" onClick={() => { setDeletePopup(true), setDeleteId(item?._id) }}><img className="h-5 w-5 hover:cursor-pointer" src={Delete}></img></button>
                    </div>
                  </td>
                </tr>

              ))
            }



          </tbody>





        </table>



      </div>



      {
        deletePopup && (
          <form onSubmit={handleDelete} className="fixed bg-black/90   inset-0 flex justify-center items-center">

            <div className="bg-red-400  h-30 w-80 flex flex-col gap-3 justify-center items-center px-4 py-2 rounded-lg">
              <h1 className="text-lg font-semibold">Are you sure you want to remove this product ?</h1>
              <div className="flex flex-row w-full justify-between">
                <button onClick={() => { setDeletePopup(false) }} className="bg-[#fe8110] hover:bg-[#c56007] px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">Close</button>
                <button type="submit" className="bg-[#ff0707] hover:bg-[#8a0202] px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">{deleteProductLoading ? "Deleting..." : "Delete"}</button>

              </div>
            </div>

          </form>
        )
      }

      {/* create hot deal */}

      {
        hotDeal && (

          <div className="fixed bg-black/90 inset-0 flex justify-center items-center">

            <HotDeal setHotDeal={setHotDeal} hotDealId={hotDealId} />
          </div>

        )
      }


      {/* remove hot deal */}


      {
        removehotDeal && (

          <div className="fixed bg-black/90 inset-0 flex justify-center items-center">

            <RemoveHotDeals setRemoveHotDeal={setRemoveHotDeal} hotDealId={hotDealId} />
          </div>

        )
      }







    </div >
  )
}

export default AllProducts