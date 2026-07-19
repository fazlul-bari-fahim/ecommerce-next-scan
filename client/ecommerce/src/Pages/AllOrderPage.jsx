import { useEffect } from "react"
import InvoiceStore from "../Store/InvoiceStore";
import { useNavigate } from "react-router-dom";



const AllOrderPage = () => {


    const { AllInvoiceGetRequest, AllInvoice } = InvoiceStore();


    const navigate = useNavigate();
    console.log(AllInvoice)


    useEffect(() => {
        const fetchData = async () => {

            await AllInvoiceGetRequest();

        }; fetchData();
    }, []);




    return (
        <div className="w-full">
            <div className="min-h-screen w-full bg-gray-200 max-[850px]:w-260 max-[426px]:w-280 py-20 px-10 ">


                {/* table */}
                <div className="bg-white h-auto w-250   flex flex-col   py-5 rounded-sm">

                    {/* Table heading*/}
                    <div className="flex bg-white max-w-250 border-b border-black/30 pb-3 shadow-md">

                        <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Date</h3>
                        <h3 className="text-md text-black  font-semibold w-60 border-r flex justify-center">Order No.</h3>
                        <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Billing Name</h3>
                        <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Delivery Status</h3>
                        <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Payment Status</h3>
                        <h3 className="text-md text-black  font-semibold w-20  border-r flex justify-center">Total</h3>
                        <h3 className="text-md text-black  font-semibold w-50 flex justify-center">Download Receipt</h3>
                    </div>



                    {/* Table Data */}

                    {
                        AllInvoice?.map((item) => (
                            <div>

                                <div className="flex bg-gray-100 max-w-300 py-2 cursor-pointer  hover:bg-green-100  pb-3 " >
                                    <h3 className="text-[12px] text-gray-800 w-40 border-r border-black/20 flex justify-center">{new Date(item?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>
                                    <h3 className="text-md text-gray-800 w-60 border-r border-black/20 flex justify-center"><button className="hover:text-blue-900 hover:font-bold cursor-pointer hover:underline" onClick={() => { navigate(`/dashboard-profile/invoice/${item?._id}`) }}>{item?.order_number}</button></h3>
                                    <h3 className="text-md text-gray-800 w-40 border-r border-black/20 flex justify-center">{item?.cus_detailes?.FirstName}</h3>
                                    <h3 className={`text-md text-gray-800 w-40 border-r  border-black/20 flex justify-center ${item?.deliver_status === "process" ? "text-green-500 font-semibold" : item?.deliver_status === "delivered" ? "text-green-900 font-semibold" : item?.deliver_status === "cancle" ? "text-red-700 font-semibold" : ""}`}>{item?.deliver_status}</h3>
                                    <h3 className={`text-md text-gray-800 w-40 border-r border-black/20 flex justify-center ${item?.payment_status === "success" ? "text-green-900 font-bold" : item?.payment_status === "cancle" ? "text-red-700 font-semibold" : ""}`}>{item?.payment_status}</h3>
                                    <h3 className="text-md text-gray-800 w-20  border-r border-black/20 flex justify-center">{item?.payable}</h3>
                                    <h3 className="text-md text-gray-800 w-50 flex justify-center"><button onClick={() => { navigate(`/dashboard-profile/invoice/${item._id}?download=true`); }} className="border border-black/20 px-2 py-1 text-sm rounded-sm bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-500 active:scale-80">Download Receipt</button></h3>
                                </div>

                            </div>
                        ))
                    }




                </div>




            </div>

        </div >
    )
}

export default AllOrderPage