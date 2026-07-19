import { useEffect } from "react";
import InvoiceStore from "../stores/InvoiceStore";
import SingleOrderPage from "./SingleOrderPage";
import { NavLink } from "react-router-dom";




const AllOrders = () => {


  const { AllInvoiceGetRequest, AllInvoice } = InvoiceStore();



  useEffect(() => {
    const fetchData = async () => {
      try {

        await AllInvoiceGetRequest();


      } catch (error) {
        console.log(error)

      }
    }; fetchData();
  }, [])



  return (
    <div className="w-full   ">
      <div className="min-h-screen w-full max-[426px]:w-105 bg-gray-200 py-10 px-10 max-[426px]:px-5">

        {/* box */}
        <div className="my-10 w-280 max-[426px]:w-105 flex justify-between max-[426px]:grid max-[426px]:grid-cols-2 max-[426px]:gap-y-10 flex-wrap">
          <div className="bg-green-800 w-40 h-30 shadow-xl flex flex-col items-center justify-center font-semibold  rounded-xl">

            <h3 style={{ textShadow: "0 0 10px rgba(83, 219, 89, 0.8), 0 0 10px rgba(255, 249, 91, 0.8)" }} className="text-white text-5xl shadow-4xl shadow-black" > {AllInvoice?.successOrder?.length + AllInvoice?.ongoingOrder?.length + AllInvoice?.cancleOrder?.length}</h3>


            <h5 className="text-white text-md">Total Order</h5>


          </div>


          <div className="bg-white border shadow-lg border-gray-400 w-40 h-30 flex flex-col items-center justify-center font-semibold rounded-xl">

            <h3 style={{ textShadow: "0 0 10px rgba(83, 219, 89, 0.8), 0 0 10px rgba(255, 249, 91, 0.8)" }} className=" text-5xl shadow-4xl shadow-black text-green-400 " > {AllInvoice?.successOrder?.length}</h3>
            <h5 className="text-black text-md">Success Order</h5>

          </div>


          <div className="bg-white border shadow-lg border-gray-400 w-40 h-30 flex flex-col items-center justify-center font-semibold  rounded-xl">

            <h3 className="text-black text-5xl shadow-4xl shadow-black" > {AllInvoice?.ongoingOrder?.length}</h3>
            <h5 className="text-black text-md">Ongoing Order</h5>

          </div>



          <div className="bg-white border shadow-lg border-gray-400 w-40 h-30 flex flex-col items-center justify-center font-semibold rounded-xl">

            <h3 className="text-red-700 text-5xl shadow-4xl shadow-black" > {AllInvoice?.cancleOrder?.length}</h3>
            <h5 className="text-black text-md">Cancle Order</h5>

          </div>



          <div className="bg-white border shadow-lg border-gray-400 w-40 h-30 flex flex-col items-center justify-center font-semibold rounded-xl">

            <h3 className="text-green-700 font-bold text-2xl" > {AllInvoice?.receivedPayment}</h3>
            <h5 className="text-black text-md">Received Payment</h5>

          </div>



          <div className="bg-white border shadow-lg  border-gray-400 w-40 h-30 flex flex-col items-center justify-center font-semibold rounded-xl">

            <h3 className="text-yellow-700 text-2xl shadow-4xl shadow-black" > {AllInvoice?.paymentDeu}</h3>
            <h5 className="text-black text-md">Ongoing Payment</h5>

          </div>




        </div>


        {/* Ongoing order */}

        <div className="w-280 max-[426px]:w-90 ">
          <div className="flex flex-row gap-2">
            <h1 className="text-xl my-2 font-semibold">Ongoing Order</h1>
            <h1 className="text-xl my-2 font-semibold text-green-800">{AllInvoice?.ongoingOrder?.length}</h1>

          </div>

          {/* table */}
          <div className="bg-gray-300/30 max-h-150 w-300 max-[426px]:w-90 shadow-xl border border-gray-400 overflow-x-auto pb-5 rounded-sm no-scrollbar">




            {/* Table heading*/}
            <div className="flex bg-white w-400 border-b border-black/30 py-5 shadow-md sticky top-0">
              <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Date</h3>
              <h3 className="text-md text-black  font-semibold w-30 border-r flex justify-center">View</h3>
              <h3 className="text-md text-black  font-semibold w-60 border-r flex justify-center">Order No.</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Name</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Phone</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer City</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Delivery Status</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Payment Status</h3>
              <h3 className="text-md text-black  font-semibold w-30  flex justify-center">Total</h3>
            </div>


            {/* Table Row */}
            {
              AllInvoice?.ongoingOrder?.map((item) => {
                return (
                  <div>
                    <div key={item?._id} className="flex bg-gray-300/30 w-400 py-2 hover:bg-green-200 cursor-pointer">
                      <h3 className="text-[12px] text-black w-40 border-r border-black/20 flex justify-center">{new Date(item?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>
                      <NavLink to={`/all-orders/single-order/${item?._id}`} className="text-md text-blue-800 underline  font-semibold w-30 border-r border-black/20 flex justify-center">View</NavLink>
                      <h3 className="text-md text-black   w-60 border-r border-black/20 flex justify-center">{item?.order_number}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.FirstName}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.Phone}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.City}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.deliver_status}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.payment_status}</h3>
                      <h3 className="text-md text-black   w-30  flex justify-center">{item?.payable}</h3>
                    </div>

                  </div>
                )

              })
            }

          </div>
        </div>






        {/* Success Order */}

        <div className="my-20">
          <div className="flex flex-row gap-2">
            <h1 className="text-xl my-2 font-semibold">Success Order</h1>
            <h1 className="text-xl my-2 font-semibold text-green-800">{AllInvoice?.successOrder?.length}</h1>

          </div>

          {/* table */}
          <div className="bg-gray-300/30 max-h-150 no-scrollbar w-300 max-[426px]:w-90  shadow-xl border border-gray-400  overflow-x-auto  pb-5 rounded-sm">




            {/* Table heading*/}
            <div className="flex bg-white w-400 border-b border-black/30 py-5 shadow-md sticky top-0">
              <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Date</h3>
              <h3 className="text-md text-black  font-semibold w-30 border-r flex justify-center">View</h3>
              <h3 className="text-md text-black  font-semibold w-60 border-r flex justify-center">Order No.</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Name</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Phone</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer City</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Delivery Status</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Payment Status</h3>
              <h3 className="text-md text-black  font-semibold w-30  flex justify-center">Total</h3>
            </div>


            {/* Table Row */}
            {
              AllInvoice?.successOrder?.map((item) => {
                return (
                  <div>
                    <div key={item?._id} className="flex  w-400 py-2 hover:bg-green-200 cursor-pointer">
                      <h3 className="text-[12px] text-black w-40 border-r border-black/20 flex justify-center">{new Date(item?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>
                      <NavLink to={`/all-orders/single-order/${item?._id}`} className="text-md text-blue-800 underline  font-semibold w-30 border-r border-black/20 flex justify-center">View</NavLink>
                      <h3 className="text-md text-black   w-60 border-r border-black/20 flex justify-center">{item?.order_number}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.FirstName}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.Phone}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.City}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.deliver_status}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.payment_status}</h3>
                      <h3 className="text-md text-black   w-30  flex justify-center">{item?.payable}</h3>
                    </div>

                  </div>
                )

              })
            }

          </div>

        </div>





        {/* Cancle Order */}

        <div className="my-20">
          <div className="flex flex-row gap-2">
            <h1 className="text-xl my-2 font-semibold">Cancel Order</h1>
            <h1 className="text-xl my-2 font-semibold text-red-800">{AllInvoice?.cancleOrder?.length}</h1>

          </div>

          {/* table */}
          <div className="bg-gray-300/30 max-h-150 w-300 max-[426px]:w-90  no-scrollbar shadow-xl border border-gray-400  overflow-x-auto  pb-5 rounded-sm">




            {/* Table heading*/}
            <div className="flex bg-white w-400 border-b border-black/30 py-5 shadow-md sticky top-0">
              <h3 className="text-md text-black  font-semibold w-40 border-r flex justify-center">Date</h3>
              <h3 className="text-md text-black  font-semibold w-30 border-r flex justify-center">View</h3>
              <h3 className="text-md text-black  font-semibold w-60 border-r flex justify-center">Order No.</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Name</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer Phone</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Customer City</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Delivery Status</h3>
              <h3 className="text-md text-black  font-semibold w-50 border-r flex justify-center">Payment Status</h3>
              <h3 className="text-md text-black  font-semibold w-30  flex justify-center">Total</h3>
            </div>


            {/* Table Row */}
            {
              AllInvoice?.cancleOrder?.map((item) => {
                return (
                  <div>
                    <div key={item?._id} className="flex  w-400 py-2 hover:bg-green-200 cursor-pointer">
                      <h3 className="text-[12px] text-black w-40 border-r border-black/20 flex justify-center">{new Date(item?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>
                      <NavLink to={`/all-orders/single-order/${item?._id}`} className="text-md text-blue-800 underline  font-semibold w-30 border-r border-black/20 flex justify-center">View</NavLink>
                      <h3 className="text-md text-black   w-60 border-r border-black/20 flex justify-center">{item?.order_number}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.FirstName}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.Phone}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.cus_detailes?.City}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.deliver_status}</h3>
                      <h3 className="text-md text-black   w-50 border-r border-black/20 flex justify-center">{item?.payment_status}</h3>
                      <h3 className="text-md text-black   w-30  flex justify-center">{item?.payable}</h3>
                    </div>

                  </div>
                )

              })
            }

          </div>

        </div>




      </div>

    </div >
  )
}

export default AllOrders;