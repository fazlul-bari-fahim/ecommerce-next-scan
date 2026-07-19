import edit from "../assets/editing.png"
import Delete from "../assets/delete.png"
import categoryStore from "../stores/categoryStore"
import { useEffect, useState } from "react"


const Category = () => {


  const {
    createCategoryRequest,
    createCategoryLoading,
    getAllCategoryRequest,
    totalCategory,
    allCategory,
    updateCategoryRequest,
    deleteCategoryRequest
  } = categoryStore();


  const [category_name, setCategoryName] = useState("");
  const [category_image, setCategoryImage] = useState(null);
  const [editCategory, setEditCategory] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);






  const handleSubmit = async (e) => {

    e.preventDefault();
    const result = await createCategoryRequest({
      data: {
        category_name
      },
      file: {
        category_image
      },
    });

    if (result === true) {
      await getAllCategoryRequest(100, 1);
    }
  };


  const handleUpdate = async (e) => {

    e.preventDefault();
    const result = await updateCategoryRequest(
      selectedId,
      {
        data: {
          category_name
        },
        file: {
          category_image
        },

      });
    if (result === true) {
      await getAllCategoryRequest(100, 1);
      setEditCategory(false)
    }


  };


  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await deleteCategoryRequest(
      deleteId,
    );
    if (result === true) {
      await getAllCategoryRequest(100, 1);
      setDeletePopup(false)
    }


  };







  useEffect(() => {
    const fetchData = async () => {
      try {

        await getAllCategoryRequest(100, 1);




      } catch (error) {
        console.log(error);

      }
    }; fetchData();
  }, [])






  return (
    <div className="bg-[#e4e4e4]  min-h-screen flex  pt-20 max-[426px]:mb-30 flex-col items-center max-[849px]:items-start max-[849px]:px-5 gap-10 pb-20">
      <h1 className="text-4xl font-bold max-[849px]:text-2xl max-[426px]:text-md">Create Product Category</h1>

      {/* Create  */}
      <div className="h-80 w-145 max-[426px]:w-80  bg-white  transition-colors duration-500 rounded-lg shadow-xl flex flex-col items-center justify-center py-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-[426px]:gap-3">
          <div className="flex max-[426px]:flex-col  gap-2">
            <label htmlFor="categoryName" className="text-2xl max-[426px]:text-md text-black font-semibold">Category Name</label>
            <input id="categoryName" value={category_name} onChange={(e) => setCategoryName(e.target.value)} className="border-2 border-black/30 rounded-md px-2 py-1 w-88 max-[426px]:w-65 bg-white h-12  focus:outline-4 focus:outline-[#ed1c23]/30" type="text" />

          </div>

          <div className="flex max-[426px]:flex-col gap-2">
            <label htmlFor="categoryImage" className="text-2xl text-black font-semibold">Category Image</label>
            <input id="categoryImage" onChange={(e) => setCategoryImage(e.target.files[0])} className="border flex max-[426px]:w-65 justify-center items-center px-2 py-1  h-10 border-black/50  text-lg bg-gray-200 hover:cursor-pointer" type="file" />

          </div>
          <button type="submit" className="text-xl bg-black hover:bg-gray-900 transition-all active:scale-90 duration-300  text-white font-bold shadow shadow-black/40 hover:cursor-pointer py-2 rounded-md">{createCategoryLoading ? "Creating..." : "Create"}</button>


        </form>
      </div>




      {/* All Category Show */}

      <div className="flex flex-col max-[849px]:w-140 max-[426px]:w-80 gap-3">

        <div className="flex  flex-row  justify-between">
          <h1 className="text-xl font-bold px-3 max-[426px]:hidden">All Category:</h1>
          <h1 className="text-xl font-bold px-3 flex flex-row gap-3 max-[426px]:text-[18px]">Total Category: <p className="text-green-600 font-semibold">{totalCategory}</p> </h1>
        </div>


        {
          allCategory?.map((item) => (
            <div key={item._id} className="bg-white max-[849px]:w-140 max-[426px]:w-80 group-hover:bg-red-400 hover:bg-[#c7c7c7] transition-colors duration-500  hover:cursor-pointer h-15 w-280 rounded-lg shadow-xl flex flex-row items-center px-10 max-[426px]:px-4 gap-10 justify-between">
              <div className="flex flex-row items-center gap-10 max-[426px]:gap-5">
                <h1 className="text-2xl w-60 max-[426px]:w-30 font-bold max-[426px]:text-[15px]">{item.category_name}</h1>
                <div className="bg-gray-400/40 h-10 max-[426px]:h-5 rounded-lg flex justify-center items-center">
                  <img className="h-7 w-7" src={`http://localhost:5000/api/v1/get-file/${item.category_image}`}></img>
                </div>


              </div>


              <div className=" flex flex-row gap-10">
                {/* Edit */}
                <button onClick={() => { setEditCategory(true), setCategoryName(item.category_name), setCategoryImage(item.category_image), setSelectedId(item._id) }} >
                  <img className="h-7 w-7 hover:cursor-pointer" title="Edit" src={edit}></img>

                </button>

                {/* Delete */}
                <button onClick={() => { setDeletePopup(true), setDeleteId(item._id) }} className="group">
                  <img className="h-7 w-7 hover:cursor-pointer" title="Delete" src={Delete}></img>

                </button>
              </div>

            </div>
          ))
        }





      </div>






      {/* Edit Category popup */}
      {
        editCategory && (


          <div className="fixed bg-black/90 inset-0 flex justify-center items-center z-50 ">

            <form onSubmit={handleUpdate} className="bg-[#ed1c23]  hover:bg-[#ed1c23]/80 transition-colors duration-500 h-90 w-80 px-8 py-5 rounded-2xl flex flex-col gap-6">
              <div className="flex flex-col gap-3 text-white">
                <label htmlFor="category_name" className="text-xl font-semibold">Category Name :</label>
                <input id="category_name" value={category_name} type="text" onChange={(e) => setCategoryName(e.target.value)} className="bg-white text-black h-10 rounded-2xl shadow-inner shadow-black/50 px-5 focus:outline-3 focus:outline-[#ffffff]" />
              </div>


              <div className="flex flex-col gap-3">
                <label htmlFor="category_image" className="text-xl font-semibold text-white">Category Image :</label>
                <input id="category_image" type="file" onChange={(e) => setCategoryImage(e.target.files[0])} className="bg-white h-10 rounded-2xl border border-black/50 px-5 focus:outline-3 focus:outline-[#ffffff] pt-2 text-md hover:cursor-pointer" />
              </div>

              <button type="submit" className=" bg-[#fe8110] border border-[#ffcda1] hover:bg-[#e66b00] h-10 text-white font-semibold text-xl rounded-2xl hover:cursor-pointer">Update</button>
              <button onClick={() => setEditCategory(false)} className=" bg-[#f7dcc5] border border-[#ffcda1] hover:bg-[#caaf98] h-10 text-black font-semibold text-xl rounded-2xl hover:cursor-pointer">Close</button>

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

export default Category



