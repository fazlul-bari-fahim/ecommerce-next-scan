import image from "../assets/image.png"
import images from "../assets/image-gallery.png"
import { useEffect, useState } from "react"
import categoryStore from "../stores/categoryStore"
import brandStore from "../stores/brandStore"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import productStore from "../stores/productStore"
import createProduct from "../assets/product-design.png"



const CreateProduct = () => {


  const { getAllCategoryRequest, allCategory } = categoryStore();
  const { getBrandRequest, allBrand } = brandStore();
  const { productCreateLoading, productCreateRequest } = productStore();
  const navigate = useNavigate();



  const [title, setTitle] = useState("");
  const [sub_title, setsub_title] = useState("");
  const [service_we_provide, setservice_we_provide] = useState("");
  const [features, setfeatures] = useState("");
  const [category_id, setcategory_id] = useState("");
  const [brand_id, setbrand_id] = useState("");
  const [short_description, setshort_description] = useState("");
  const [regular_price, setregular_price] = useState("");
  const [discount_price, setdiscount_price] = useState("");
  const [size, setsize] = useState([]);
  const [color, setcolor] = useState([]);
  const [is_discount, setis_discount] = useState("");
  const [remark, setremark] = useState("");
  const [stock, setstock] = useState("");
  const [description, setdescription] = useState("");
  const [big_image, setbig_image] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [image4, setimage4] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [priceError, setPriceError] = useState("");



  const handleRegularPrice = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      setregular_price(value);
      setPriceError("");
    } else {
      setPriceError("Only numbers are allowed.");
    }
  };




  const handleDiscountPrice = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      setdiscount_price(value);
      setPriceError("");
    } else {
      setPriceError("Only numbers are allowed.");
    }
  };



  const addColor = () => {
    if (!color.includes(selectedColor)) {
      setcolor([...color, selectedColor]);
    }
  };

  const removeColor = (index) => {
    setcolor(color.filter((_, i) => i !== index));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await productCreateRequest({
      data: {
        title: title,
        sub_title: sub_title,
        service_we_provide: service_we_provide,
        features: features,
        category_id: category_id,
        brand_id: brand_id,
        short_description: short_description,
        regular_price: regular_price,
        discount_price: discount_price,
        size: size,
        color: color,
        is_discount: is_discount,
        remark: remark,
        stock: stock,
        description: description,
      },
      file: {
        big_image: big_image,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4
      }
    });

    if (result === true) {
      navigate("/all-products")
    }
  };





  const handleSizeChange = (e) => {
    const value = e.target.value;

    if (e.target.checked) {
      setsize([...size, value]);
    } else {
      setsize(size.filter((item) => item !== value));
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {

        await getAllCategoryRequest(100, 1);
        await getBrandRequest(100, 1);

      } catch (error) {
        console.log(error)

      }
    }; fetchData();

  }, [])






  return (
    <div className="bg-gray-200 w-auto min-h-screen px-5 flex flex-col items-center justify-center">

      <div className="bg-white w-250 max-[849px]:w-150 max-[426px]:w-80 max-[426px]:mb-30 max-h-500 max-[849px]:max-h-800  rounded-2xl shadow shadow-black/30 my-20 py-10 px-10">

        <div className="flex items-center gap-8">
          <div className="px-2 py-2 rounded-xl  bg-black">
            <img className="h-10 " src={createProduct}></img>
          </div>
          <h1 className="text-2xl mb-5">Add Product</h1>
        </div>

        <form onSubmit={handleSubmit}>

          {/* 1st section */}
          <div className="flex flex-row max-[849px]:flex-col gap-10">
            {/* Img section */}
            <div>

              {/* long img */}
              <div className="flex flex-col gap-2 relative mt-5">
                <h3 htmlFor="big_image">Add Image</h3>
                <p className="text-[10px] text-red-700">Image Should be Square & Remove background for a cleaner and more professional product display. Only JPEG, JPG, and PNG image formats are allowed.</p>
                <input id="big_image" onChange={(e) => setbig_image(e.target.files[0])} type="file" className="bg-black/10 h-90  hover:cursor-pointer w-110 max-[426px]:w-60 border-dotted border-black border-3  rounded-2xl pt-75 pl-30 max-[426px]:pl-7" />
                <img className="h-10 w-10 absolute top-90 max-[426px]:top-85 left-18 max-[426px]:left-25" src={image}></img>
                <img className="h-40 w-40 absolute top-30 left-35 max-[426px]:left-10" src={images}></img>



              </div>

              {/* Short img */}
              <div className="grid grid-cols-4 max-[426px]:grid-cols-2 max-[849px]:w-110 max-[426px]:w-80 max-[426px]:gap-y-5 justify-between py-10 ">

                <div className="relative">
                  <label htmlFor="image1">

                  </label>
                  <input id="image1" onChange={(e) => setimage1((e.target.files[0]))} className="border-2 h-20 w-20 text-black pt-15 px-2 text-[9px] hover:cursor-pointer border-dashed border-black  rounded-lg bg-black/10 " type="file" />
                  <img className="h-8 w-8 absolute top-5 left-6 border-black  z-10 " src={image}></img>

                </div>

                <div htmlFor="image2" className="relative">
                  <input id="image2" onChange={(e) => setimage2(e.target.files[0])} className="border-2 h-20 w-20 text-black pt-15 px-2 text-[9px] hover:cursor-pointer border-dashed border-black  rounded-lg bg-black/10 " type="file" />
                  <img className="h-8 w-8 absolute top-5 left-6 border-black  z-10 " src={image}></img>

                </div>


                <div htmlFor="image3" className="relative">
                  <input id="image3" onChange={(e) => setimage3(e.target.files[0])} className="border-2 h-20 w-20 text-black pt-15 px-2 text-[9px] hover:cursor-pointer border-dashed border-black rounded-lg bg-black/10 " type="file" />
                  <img className="h-8 w-8 absolute top-5 left-6 border-black  z-10 " src={image}></img>

                </div>

                <div htmlFor="image4" className="relative">
                  <input id="image4" onChange={(e) => setimage4(e.target.files[0])} className="border-2 h-20 w-20 text-black pt-15 px-2 text-[9px] hover:cursor-pointer border-dashed border-black  rounded-lg bg-black/10 " type="file" />
                  <img className="h-8 w-8 absolute top-5 left-6 border-black  z-10 " src={image}></img>

                </div>

              </div>
              <div className=" flex flex-col gap-3">
                {/* Remark & stock */}
                <div className="flex flex-row max-[426px]:flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="remark">Remark:</label>
                    <input id="remark" value={remark} onChange={(e) => setremark(e.target.value)} type="text" className="border px-2 h-8 w-70 max-[426px]:w-50 border-black shadow-inner shadow-black/20 focus:outline-0 py-1 rounded-md bg-white" />
                  </div>


                  <div className="flex flex-col gap-2">
                    <label htmlFor="stock">Stock:</label>
                    <input id="stock" value={stock} onChange={(e) => setstock(e.target.value)} type="number" className="border px-2 h-8 w-30 py-1 rounded-md border-black shadow-inner shadow-black/30 bg-white focus:outline-0" />
                  </div>

                </div>

                {/* Discount */}

                <div className="flex flex-row gap-3">
                  <h3 htmlFor="is_discount">Is Discount:</h3>
                  <select id="is_discount" value={is_discount} onChange={(e) => setis_discount(e.target.value)} className=" border border-black cursor-pointer focus:outline-0 h-8 w-15 px-1 py-1 rounded-md bg-white ">
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>



                </div>
              </div>

            </div>


            {/* Info section */}

            <div className="flex flex-col gap-3">
              {/* Title */}
              <div className="flex flex-col gap-3">
                <label htmlFor="title" className="text-2xl">Product Title:</label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-10 border-black  bg-white border-2 shadow-inner shadow-black/30 focus:outline-0  w-110 max-[849px]:w-130 max-[426px]:w-60  rounded-md px-2 py-2" type="text" />
              </div>



              {/* subtitle */}
              <div className="flex flex-col ">
                <label htmlFor="sub_title " className="text-lg font-semibold">Subtitle:</label>
                <input type="text" id="sub_title" value={sub_title} onChange={(e) => setsub_title(e.target.value)} className="border-2 border-black bg-white shadow-inner shadow-black/30 focus:outline-0 px-2 py-2  rounded-lg mt-3" />
              </div>


              {/* Brand & Category */}
              <div className="flex flex-row max-[426px]:flex-col gap-3">

                {/* Brand */}
                <div className="flex flex-col gap-2 ">

                  <label htmlFor="brand_id">Select your brand /</label>
                  <select id="brand_id" value={brand_id} onChange={(e) => setbrand_id(e.target.value)} className="bg-white px-1 py-1 border border-black rounded-md hover:cursor-pointer">

                    <option value={""}>Choose a brand</option>
                    {
                      allBrand?.map((item) => (
                        <option key={item?._id} value={item?._id}>{item?.brand_name}</option>
                      ))
                    }


                  </select>
                  <NavLink to={"/brand"} className="text-[12px] pl-3 underline text-blue-400">Create new brand</NavLink>

                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">

                  <label htmlFor="category_id">Select your category</label>
                  <select id="category_id" value={category_id} onChange={(e) => setcategory_id(e.target.value)} className=" bg-white rounded-lg border-black hover:cursor-pointer px-1 py-1 border">
                    <option value={""}>Choose a category</option>
                    {
                      allCategory?.map((item) => (
                        <option value={item?._id} key={item?._id}>{item?.category_name}</option>

                      ))
                    }
                  </select>
                  <NavLink to={"/category"} className="text-[12px] pl-3 underline text-blue-400">Create new category</NavLink>



                </div>


              </div>


              {/* Price */}
              <div className="flex flex-col gap-5">

                <div className="flex flex-row max-[426px]:flex-col gap-2">
                  <label htmlFor="regular_price" className="w-25">Regular Price</label>
                  <input id="regular_price" onChange={handleRegularPrice} value={regular_price} className="border-2 bg-white px-2 border-black shadow-inner shadow-black/30 focus:outline-0     py-1 rounded-md" type="text" />


                </div>
                {priceError && (
                  <span className="text-red-500 text-sm">{priceError}</span>
                )}

                <div className="flex flex-row max-[426px]:flex-col gap-2">
                  <label htmlFor="discount_price" className="w-25">Offer Price</label>
                  <input id="discount_price" value={discount_price} onChange={handleDiscountPrice} className="border-2 bg-white border-black shadow-inner shadow-black/30 focus:outline-0 rounded-md  px-2  py-1 " type="text" />
                </div>

              </div>

              {/* Size */}
              <h3>Select product Size:</h3>
              <div className="flex flex-col gap-2">
                <h5 className="text-sm font-semibold">For Clothing item:</h5>
                <div className="flex max-[426px]:grid max-[426px]:grid-cols-4 gap-3 relative">


                  <div>
                    <label htmlFor="size" className="absolute top-2 left-3">S</label>
                    <input type="checkbox" id="size" value="S" checked={size.includes("S")} onChange={handleSizeChange} className="h-10 w-10   hover:cursor-pointer accent-black border-2 " />
                  </div>




                  <div>
                    <label htmlFor="size" className="absolute top-2 left-16 max-[426px]:left-19">M</label>
                    <input type="checkbox" id="size" value="M" checked={size.includes("M")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>


                  <div>
                    <label htmlFor="size" className="absolute top-2 left-30 max-[426px]:left-35">L</label>
                    <input type="checkbox" id="size" value="L" checked={size.includes("L")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>




                  <div>
                    <label htmlFor="size" className="absolute top-2 left-42 max-[426px]:left-51">Xl</label>
                    <input type="checkbox" id="size" value="Xl" checked={size.includes("Xl")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>





                  <div>
                    <label htmlFor="size" className="absolute top-2 max-[426px]:top-16 left-54 max-[426px]:left-3">2Xl</label>
                    <input type="checkbox" id="size" value="2Xl" checked={size.includes("2Xl")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>


                  <div>
                    <label htmlFor="size" className="absolute top-2 left-67 max-[426px]:top-16 max-[426px]:left-18">3Xl</label>
                    <input type="checkbox" id="size" value="3Xl" checked={size.includes("3Xl")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>


                  <div>
                    <label htmlFor="size" className="absolute top-2 left-80 max-[426px]:top-16 max-[426px]:left-33">4Xl</label>
                    <input type="checkbox" id="size" value="4Xl" checked={size.includes("4Xl")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>


                  <div>
                    <label htmlFor="size" className="absolute top-2 left-93 max-[426px]:top-15 max-[426px]:left-50  max-[426px]:text-[12px]  max-[426px]:w-3">5XL</label>
                    <input type="checkbox" id="size" value="5XL" checked={size.includes("5XL")} onChange={handleSizeChange} className="h-10 w-10 hover:cursor-pointer accent-black border-2 " />
                  </div>



                </div>
              </div>







              {/* Color */}
              <label htmlFor="color">Choose product color:</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="h-12 w-16 cursor-pointer"
                />

                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Add Color
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {color.map((color, index) => (
                  <div key={index} className="relative">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color }}
                    />

                    <button
                      type="button"
                      onClick={() => removeColor(index)}
                      className="absolute -top-2 -right-2 cursor-pointer w-5 h-5 bg-red-500 text-white rounded-full text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button type="submit" className="bg-black h-8 rounded-md text-white shadow shadow-black hover:cursor-pointer">{

                productCreateLoading ? "Creating... Product" : "Create Product"

              }</button>

            </div>

          </div>

          {/* 2nd section */}
          <div className="pt-10 pb-10 flex flex-col gap-3">

            <div className="flex max-[426px]:flex-col gap-3 items-center">
              <h3 htmlFor="service_we_provide">Support &  Service You Provide :</h3>
              <p className="text-red-800 text-[12px]">Please keep your suggestion within 80 words</p>
            </div>
            <textarea id="service_we_provide" value={service_we_provide} onChange={(e) => setservice_we_provide(e.target.value)} className=" border-2 px-3 py-3 bg-white rounded-md border-black shadow-inner shadow-black/30 focus:outline-0" rows="5" cols="123" />


            <div className="flex max-[426px]:flex-col gap-3 items-center">
              <h3 htmlFor="features">Features :</h3>
              <p className="text-red-800 text-[12px]">Please keep your text within 80 words</p>
            </div>
            <textarea id="features" value={features} onChange={(e) => setfeatures(e.target.value)} className=" border-2 px-3 py-3 rounded-md border-black bg-white shadow-inner shadow-black/30 focus:outline-0" rows="5" cols="123" />


            <div className="flex max-[426px]:flex-col gap-3 items-center">
              <h3 htmlFor="short_description">Product Details</h3>
              <p className="text-red-800 text-[12px]">Please keep your text within 80 words</p>
            </div>
            <textarea id="short_description" value={description} onChange={(e) => setdescription(e.target.value)} className=" border-2 px-3 py-3 rounded-md bg-white border-black shadow-inner shadow-black/30 focus:outline-0" rows="5" cols="123" />


            <h3 htmlFor="description">Long Description :</h3>
            <textarea id="description" value={short_description} onChange={(e) => setshort_description(e.target.value)} className=" border-2 px-3 py-3 rounded-md bg-white border-black shadow-inner shadow-black/30 focus:outline-0" rows="20" cols="123" />

          </div>

        </form>

      </div>

    </div>
  )
}

export default CreateProduct