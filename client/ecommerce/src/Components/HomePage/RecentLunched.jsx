import { useEffect } from "react";
import productStore from "../../Store/productStore.js";
import { fileURL } from "../../Helpers/Config.js";
import { NavLink } from "react-router-dom";
import qrpayment from "../../assets/qr-payment.png"





const RecentLunched = () => {



    const { recentproductGetLoading, recentallProduct, recentproductGetRequest } = productStore();







    useEffect(() => {
        console.log("RecentLunched mounted");
        const fetchData = async () => {
            try {

                await recentproductGetRequest({
                    category_id: 0,
                    brand_id: 0,
                    remark: 0,
                    keyword: 0,
                    per_page: 12,
                    page_no: 1,
                });







            } catch (error) {
                console.log(error);

            }
        }; fetchData();
    }, []);




    return (
        <div className="flex flex-col justify-center items-center bg-[#ececec] w-full">
            {/* text */}
            <div className="flex flex-col justify-center gap-5 items-center my-20">
                <h1 className="text-4xl font-bold">Recently Lunched</h1>
                <div className="flex gap-3 justify-center items-center">
                    <div className="bg-black border-t w-20"></div>
                    <div className="bg-red-600">
                        <img className="h-8 " src={qrpayment}></img>
                    </div>
                    <div className="bg-black border-t w-20"></div>
                </div>
            </div>



            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 bg-white">

                {/* product */}
                {
                    recentproductGetLoading ? "Product Loading..." : recentallProduct?.map((item) => (
                        <NavLink key={item._id} to={`/single-products/${item?._id}`}>
                            <div className=" h-50 w-100 max-[380px]:w-93 max-[321px]:w-80 hover:cursor-pointer flex flex-row gap-1 border border-black/30 ">
                                <div className="flex w-35 h-full justify-center items-center bg-[#f3f1f1]">
                                    <img className="h-25 w-auto" src={`${fileURL}/${item?.big_image}`}></img>
                                </div>

                                <div className="w-65 px-3 flex flex-col gap-1 justify-center hover:bg-red-800 group">
                                    <h1 className="text-[13px] font-bold group-hover:text-white">{item?.title}</h1>
                                    <h3 className="text-[13px] text-gray-500 group-hover:text-gray-100">{item?.remark}</h3>
                                    <strike className="text-red-700/50 text-[12px] font-bold group-hover:text-white">{item?.discount_price}</strike>
                                    <h2 className="text-red-700  text-xl  font-bold group-hover:text-white">{item?.regular_price}</h2>

                                </div>

                            </div>
                        </NavLink>

                    ))
                }







            </div>



            <div className="h-20 bg-[#ececec]">

            </div>
        </div>
    )
}

export default RecentLunched