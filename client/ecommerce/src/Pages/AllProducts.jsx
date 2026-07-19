import CategoryProduct from "../Components/AllProductPage/CategoryProduct"
import LaptopDeal from "../Components/AllProductPage/LaptopDeal"
import PageSection from "../Components/AllProductPage/PageSection"
import Product from "../Components/AllProductPage/Product"



const AllProducts = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div>
        <PageSection />
        <LaptopDeal />
        <CategoryProduct />
        <Product />


      </div>

    </div>
  )
}

export default AllProducts