import FreedomWithAirpods from "../Components/HomePage/FreedomWithAirpods"
import Hero from "../Components/HomePage/Hero"
import HotDeal from "../Components/HomePage/HotDeal"
import OurAdvantage from "../Components/HomePage/OurAdvantage"
import PopularBrands from "../Components/HomePage/PopularBrands"
import PopularCategories from "../Components/HomePage/PopularCategories"
import { ProductSection } from "../Components/HomePage/ProductSection"
import RecentLunched from "../Components/HomePage/RecentLunched"
import Review from "../Components/HomePage/Review"

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      {/* Hero */}
      <Hero />
      <PopularCategories />
      <ProductSection />
      <FreedomWithAirpods />
      <OurAdvantage />
      <HotDeal />
      <RecentLunched />
      <PopularBrands />
      <Review />



    </div>
  )
}

export default HomePage