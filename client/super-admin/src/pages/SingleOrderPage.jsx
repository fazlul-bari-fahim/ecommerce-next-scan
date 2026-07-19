import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import InvoiceStore from "../stores/InvoiceStore";
import { fileURL } from "../helpers/config";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const SingleOrderPage = () => {


    const Navigate = useNavigate();

    const id = useParams();
    const _id = id?.id;


    const { InvoiceGetRequest, InvoiceData, InvoiceUpdateLoading, InvoiceUpdateRequest } = InvoiceStore();




    const [paymentStatus, setPaymentStatus] = useState();
    const [deliveryStatus, setDeliveryStatus] = useState();



    const handleSubmit = async (e) => {
        e.preventDefault();



        const result = await InvoiceUpdateRequest({
            data: {
                deliver_status: deliveryStatus,
                payment_status: paymentStatus,

            },
            _id: _id,
        });


        if (result) {
            await InvoiceGetRequest({ _id })
        }



    };




    useEffect(() => {
        const fetchData = async () => {
            await InvoiceGetRequest({ _id })


        }; fetchData();
    }, []);



    useEffect(() => {
        if (InvoiceData) {
            setPaymentStatus(InvoiceData?.payment_status);
            setDeliveryStatus(InvoiceData?.deliver_status);
        }
    }, [InvoiceData]);






    // Invoice controll

    const invoiceRef = useRef();


    const downloadPDF = async () => {
        if (!invoiceRef.current) return;

        const dataUrl = await toPng(invoiceRef.current, {
            cacheBust: true,
            pixelRatio: 3,
        });

        const pdf = new jsPDF("p", "mm", "a4");

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

        pdf.save(`Invoice-${InvoiceData?.order_number}.pdf`);
    };



    useEffect(() => {
        if (
            InvoiceData?.order_number &&
            new URLSearchParams(location.search).get("download") === "true"
        ) {
            downloadPDF();
        }
    }, [InvoiceData]);










    return (
        <div>

            <div onClick={() => downloadPDF()} className="bg-gray-200 h-atuo py-20 w-full  flex flex-col justify-center items-center shadow-xl shadow-black">


                <button className="bg-white py-2 px-3 mb-10 border border-gray-400 rounded-sm  shadow-lg  cursor-pointer transition-all active:scale-90 duration-500">Download Order Copy</button>




                {/* Order Details */}
                <div ref={invoiceRef} className="bg-white w-[210mm] h-[297mm] border border-gray-300">



                    {/* header */}
                    <div className="bg-black w-full h-2">

                    </div>
                    <div className="bg-[#ed1c23] w-full h-35 flex flex-col items-center">
                        <h3 className="font-semibold text-xl mt-5">Next Scan</h3>
                        <h3 className="font-semibold text-xl text-white">E-commerce store</h3>
                        <div className="flex gap-5 mt-2">
                            <h4 className="text-white text-md border-r px-2">01327-XXX XXX</h4>
                            <h4 className="text-white text-md border-r px-2">support@nextscan.com</h4>
                            <h4 className="text-white text-md">10/B Panthoport, Dhaka-1200</h4>
                        </div>

                    </div>

                    {/* Info section */}

                    <div className="flex flex-row w-full justify-between px-10 py-5">

                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Date:</h3>
                                <h3 className="text-sm">{new Date(InvoiceData?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>

                            </div>

                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Update:</h3>
                                <h3 className="text-sm">{new Date(InvoiceData?.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Order Number:</h3>
                                <h3 className="text-sm">{InvoiceData?.order_number}</h3>

                            </div>



                        </div>



                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">VAT:</h3>
                                <h3 className="text-sm">{InvoiceData?.vat}</h3>

                            </div>
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Paybale:</h3>
                                <h3 className="text-sm">{InvoiceData?.subtotal}</h3>

                            </div>
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Discount:</h3>
                                <h3 className="text-sm">{InvoiceData?.discount}</h3>

                            </div>

                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Shipping Charge:</h3>
                                <h3 className="text-sm">{InvoiceData?.shipping}</h3>

                            </div>








                        </div>

                    </div>




                    {/* Shipping & Billing */}

                    <div className="flex flex-row w-full justify-between px-10 py-5 border-dashed border-2 border-gray-400 ">

                        <div className="flex flex-col">
                            <h3 className="text-md font-semibold">Billing Info</h3>
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">First Name:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.FirstName}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">First Name:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.LastName}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Phone:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.Phone}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Phone:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.Email}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Address:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.Address}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">City:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.City}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Division:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.Division}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Zip Code:</h3>
                                <h3 className="text-sm">{InvoiceData?.cus_detailes?.Zip}</h3>

                            </div>









                        </div>



                        <div className="flex flex-col">
                            <h3 className="text-md font-semibold">Shipping Info</h3>
                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">First Name:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillFirstName}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">First Name:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillLastName}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Phone:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillPhone}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Address:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillAddress}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">City:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillCity}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Division:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillDivision}</h3>

                            </div>



                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Zip Code:</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.BillZip}</h3>

                            </div>


                            <div className="flex gap-2">
                                <h3 className="text-sm font-semibold">Shipping :</h3>
                                <h3 className="text-sm">{InvoiceData?.ship_details?.shipping}</h3>

                            </div>










                        </div>

                    </div>



                    {/*  */}

                    <div className="flex flex-col w-full justify-between px-10 py-5 ">



                        {/* Heading */}
                        <div className="w-full flex border-b pb-2 border-gray-400 shadow">
                            <h3 className="text-md font-semibold w-20 flex justify-center">Image</h3>
                            <h3 className="text-md font-semibold w-40 flex justify-center">Name</h3>
                            <h3 className="text-md font-semibold w-20 flex justify-center">Size</h3>
                            <h3 className="text-md font-semibold w-20 flex justify-center">Color</h3>
                            <h3 className="text-md font-semibold w-20 flex justify-center">Quantity</h3>
                            <h3 className="text-md font-semibold w-30 flex justify-center">Brand</h3>
                            <h3 className="text-md font-semibold w-30 flex justify-center">Category</h3>
                            <h3 className="text-md font-semibold w-20 flex justify-center">Price</h3>

                        </div>


                        {/* data */}

                        {
                            InvoiceData?.product_details?.map((item) => (
                                <div className="w-full h-20  flex items-center py-2 border-b border-gray-300">
                                    <div className="w-20">
                                        <img src={`${fileURL}/${item?.big_image}`} className="text-md font-semibold h-15 flex justify-center"></img>

                                    </div>
                                    <h3 className="text-[12px] w-40 flex justify-center">{item?.title}</h3>
                                    <h3 className="text-md w-20 flex justify-center">{item?.size}</h3>
                                    <h3 className="text-md w-20 flex justify-center"> <h4 className={`w-8 h-8 rounded-full border `} style={{ backgroundColor: item?.color }}></h4> </h3>
                                    <h3 className="text-md w-20 flex justify-center">{item?.qty}</h3>
                                    <h3 className="text-md w-30 flex justify-center">{item?.brand?.brand_name}</h3>
                                    <h3 className="text-md w-30 flex justify-center">{item?.category?.category_name}</h3>
                                    <h3 className="text-md w-20 flex justify-center">Price</h3>

                                </div>
                            ))
                        }


                        {/* Update  */}
                        <form onSubmit={handleSubmit} className="w-full border-t mt-10 py-3 flex items-end gap-10">
                            <div>
                                <h3 className="text-lg font-semibold">Delivery Status</h3>
                                <select value={deliveryStatus} onChange={(e) => setDeliveryStatus(e.target.value)} className="border px-2 py-1 mt-2 cursor-pointer">
                                    <option value="pending">pending</option>
                                    <option value="process">process</option>
                                    <option value="delivered">delivered</option>
                                    <option value="cancel">cancel</option>
                                </select>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Payment Status</h3>
                                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="border px-2 py-1 mt-2 cursor-pointer">
                                    <option value="cashon">cashon</option>
                                    <option value="success">success</option>
                                    <option value="cancel">cancel</option>
                                </select>
                            </div>

                            <button type="submit" className="text-lg font-semibold bg-black text-white h-10 px-3 rounded-sm cursor-pointer hover:bg-gray-900 transition-all active:scale-75 duration-300">{InvoiceUpdateLoading ? "Updateing..." : "Update"}</button>

                        </form>









                    </div>


                </div>


                <button onClick={() => Navigate("/all-orders")} className="bg-white cursor-pointer px-3 py-2 mt-5 text-lg border border-gray-400 rounded-lg shadow-lg hover:bg-gray-200/10 ">Back to Order Page</button>

            </div>

        </div>
    )
}

export default SingleOrderPage