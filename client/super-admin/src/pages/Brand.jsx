import edit from "../assets/editing.png"
import Delete from "../assets/delete.png"
import { useEffect, useState } from "react"
import brandStore from "../stores/brandStore"


const Brand = () => {



  const { createBrandRequest, getBrandRequest, allBrand, totalBrand, updateBrandRequest, deleteBrandRequest } = brandStore();

  const [brand_name, setBrand_name] = useState("");
  const [brand_image, setBrand_image] = useState("");
  const [brandEdit, setBrandEdit] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);





  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createBrandRequest({
      data: {
        brand_name

      },
      file: {
        brand_image
      }
    });
    if (result === true) {
      await getBrandRequest(10000, 1)
    }

  };



  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await updateBrandRequest(brandId, {
      data: {
        brand_name
      },
      file: {
        brand_image
      }
    });

    if (result) {
      await getBrandRequest(10000, 1);
      setBrandEdit(false);
    }
  };



  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await deleteBrandRequest(brandId);
    if (result === true) {
      await getBrandRequest(10000, 1);
      setDeletePopup(false);
    }

  }





  useEffect(() => {
    const fetchData = async () => {
      try {
        await getBrandRequest(10, 1)

      } catch (error) {
        console.log(error)

      }
    }; fetchData();
  }, [])






  return (
    <div className="bg-[#e4e4e4] max-[426px]:px-5 max-[426px]:pb-30 min-h-screen flex  pt-20 flex-col items-center max-[426px]:items-start gap-10 pb-15">
      <h1 className="text-4xl font-bold max-[426px]:text-[18px] ">Create Product Brand</h1>

      {/* Create  */}
      <div className="h-80 w-150 max-[426px]:w-80  bg-white rounded-lg shadow-xl flex flex-col items-center justify-center py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-[426px]:gap-5">
          <div className="flex max-[426px]:flex-col  gap-2">
            <label htmlFor="brand_name" className="text-2xl max-[426px]:text-md">Brand Name:</label>
            <input id="brand_name" value={brand_name} onChange={(e) => setBrand_name(e.target.value)} className="border-2 border-black/80 rounded-md px-2 py-1 w-78 max-[426px]:w-65" type="text" />

          </div>

          <div className="flex max-[426px]:flex-col gap-2">
            <label htmlFor="brand_image" className="text-2xl max-[426px]:text-md">Brand Image</label>
            <input id="brand_image" onChange={(e) => setBrand_image(e.target.files[0])} className="border max-[426px]:w-65 hover:cursor-pointer flex justify-center items-center px-2 py-1 bg-gray-200 " type="file" />

          </div>
          <button type="submit" className="text-xl bg-black hover:bg-gray-900 transition-all active:scale-90 duration-300 text-white font-bold shadow shadow-black/40 hover:cursor-pointer py-2 rounded-md">Create</button>


        </form>
      </div>

      <div className="flex flex-col gap-3">

        <div className="flex flex-row justify-between px-3">
          <h1 className="text-xl font-bold px-3 max-[426px]:hidden">All Brand:</h1>
          <h1 className="text-xl font-bold px-3 flex  gap-5">Total Brand:<p className="text-green-600">{totalBrand}</p></h1>
        </div>


        {
          allBrand?.map((item) => (
            <div key={item?._id} className="bg-white hover:bg-gray-300 transition-colors duration-500 hover:cursor-pointer h-15 w-280 max-[426px]:w-80 rounded-lg shadow-xl flex flex-row items-center px-10 max-[426px]:px-4 gap-10 justify-between">
              <div className="flex flex-row max-[426px]:items-center gap-10 max-[426px]:gap-3">
                <h1 className="text-2xl font-bold w-60 max-[426px]:w-25 max-[426px]:text-[15px]">{item?.brand_name}</h1>
                <div className="bg-gray-400/40 h-10 w-12 rounded-lg flex justify-center items-center">
                  <img className="h-7 w-7" src={`http://localhost:5000/api/v1/get-file/${item?.brand_image}`}></img>
                </div>


              </div>


              <div className=" flex flex-row gap-10">
                {/* Edit */}
                <button title="Edit" onClick={() => { setBrandEdit(true), setBrandId(item?._id), setBrand_name(item?.brand_name), setBrand_image(item?.brand_image) }}>
                  <img className="h-7 w-7 hover:cursor-pointer" src={edit}></img>

                </button>

                {/* Delete */}
                <button onClick={() => { setBrandId(item?._id), setDeletePopup(true) }} title="Delete">
                  <img className="h-7 w-7 hover:cursor-pointer" src={Delete}></img>

                </button>
              </div>

            </div>
          ))
        }





      </div>



      {/* Edit Brand Popup */}

      {
        brandEdit && (


          <div className="fixed bg-black/90 inset-0 flex justify-center items-center z-50 ">

            <form onSubmit={handleUpdate} className="bg-[#ed1c23] hover:bg-[#ed1c23]/80 transition-colors duration-500 h-90 w-80 px-8 py-5 rounded-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-white">
                <label htmlFor="brand_name" className="text-xl font-semibold">Brand Name :</label>
                <input id="brand_name" value={brand_name} type="text" onChange={(e) => setBrand_name(e.target.value)} className="bg-white text-black h-10 rounded-2xl shadow-inner shadow-black/50 px-5 focus:outline-3 focus:outline-[#ffffff]" />
              </div>


              <div className="flex flex-col gap-3">
                <label htmlFor="brand_image" className="text-xl font-semibold text-white">Brand Image :</label>
                <input id="brand_image" type="file" onChange={(e) => setBrand_image(e.target.files[0])} className="bg-white h-10 rounded-2xl border border-black/50 px-5 focus:outline-3 focus:outline-[#ffffff] pt-2 text-md hover:cursor-pointer" />
              </div>

              <button type="submit" className=" bg-[#fe8110] border border-[#ffcda1] hover:bg-[#e66b00] h-10 text-white font-semibold text-xl rounded-2xl hover:cursor-pointer">Update</button>
              <button onClick={() => setBrandEdit(false)} className=" bg-[#f7dcc5] border border-[#ffcda1] hover:bg-[#caaf98] h-10 text-black font-semibold text-xl rounded-2xl hover:cursor-pointer">Close</button>

            </form>
          </div>


        )

      }






      {/* Delete Popup */}
      {
        deletePopup && (
          <form onSubmit={handleDelete} className="fixed bg-black/90 inset-0 flex justify-center items-center">

            <div className="bg-red-400  h-30 w-80 flex flex-col gap-3 justify-center items-center px-4 py-2 rounded-lg">
              <h1 className="text-lg font-semibold">Are you sure you want to remove this category?</h1>
              <div className="flex flex-row w-full justify-between">
                <button onClick={() => setDeletePopup(false)} className="bg-[#fe8110] hover:bg-[#c56007] px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">Close</button>
                <button type="submit" className="bg-[#ff0707] hover:bg-[#8a0202]  px-3 py-1 rounded-sm shadow text-white border hover:cursor-pointer">Delete</button>

              </div>
            </div>

          </form>

        )
      }












    </div>
  )
}

export default Brand