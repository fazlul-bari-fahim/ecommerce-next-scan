import Products from "./Products"
import ProductSidebar from "./ProductSidebar"

const Product = () => {





  return (
    <div>

      <div className="flex flex-row w-full">


        {/* sidebar */}
        <div>
          <ProductSidebar />
        </div>



        {/* Product page */}
        <div>
          <Products />
        </div>
      </div>



    </div>
  )
}

export default Product