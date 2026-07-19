import { Link } from "react-router-dom"
import { fileURL } from "../Helpers/Config.js"



const SingleProduct = ({ product, sort }) => {





  return (
    <div>

      <Link to={`/single-products/${product?._id}`} key={product?._id} >
        <div className={`${sort === "sort3" ? "h-100 w-80" : sort === "sort4" ? "h-130" : sort === "sort2" ? "h-100 w-120" : "h-100 w-80    max-[380px]:w-35 "} flex flex-col justify-start items-center border border-black/30 shadow-md relative max-[990px]:w-80 max-[770px]:w-65 max-[426px]:w-50 max-[376px]:w-45 max-[321px]:w-38 max-[830px]:h-130 max-[426px]:h-90`}>
          <div className="bg-red-600  px-2 py-1 rounded-2xl absolute top-2 left-3 border border-black/20">
            <h4 className="text-white">Hot Sale</h4>
          </div>
          <div className="  bg-[#f3f1f1] w-full flex justify-center items-center">
            <img className="h-50 max-[426px]:h-35 w-auto" src={`${fileURL}/${product?.big_image}`}></img>
          </div>

          <div className="flex flex-col px-5 py-2">
            <h1 className="text-lg font-bold max-[426px]:text-sm max-[380px]:text-[12px]">{product?.title?.length > 40
              ? `${product.title.slice(0, 40)}...`
              : product?.title}</h1>
            <h3 className="text-[15px] text-gray-500 max-[380px]:text-[10px]">{product?.remark}</h3>
            <strike className="text-red-700/70 font-bold text-lg max-[380px]:text-[15px]">{product?.regular_price}</strike>
            <h2 className="text-red-700 font-bold text-2xl max-[380px]:text-lg">{product?.discount_price}</h2>

          </div>
        </div>

      </Link >


    </div >
  )
}

export default SingleProduct