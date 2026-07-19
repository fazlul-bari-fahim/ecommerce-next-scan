import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"
import InvoiceStore from "../Store/InvoiceStore";
import logo from "../assets/logo.png"
import jsPDF from "jspdf";
import { toPng } from "html-to-image";



const Invoice = () => {

    const id = useParams();
    const _id = id?.id;


    const { InvoiceGetRequest, InvoiceData } = InvoiceStore();


    useEffect(() => {
        const fetchData = async () => {
            try {

                await InvoiceGetRequest({ _id });

            } catch (error) {
                console.log(error)

            }
        }; fetchData();
    }, []);



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
        <div className="w-full">
            <div className="min-h-screen bg-gray-300 max-[850px]:w-260  max-[426px]:w-280   flex flex-col justify-center items-center py-30">

                <div className="my-10">


                    <button onClick={downloadPDF} className="text-xl bg-gray-100 px-3 py-2 rounded-sm border border-black/30 cursor-pointer hover:bg-gray-200 transition-all active:scale-75 duration-500 shadow-md">Download Receipt</button>
                </div>



                {/* Invoice */}
                <div ref={invoiceRef} className="bg-white  flex flex-col justify-between w-[210mm] h-[297mm] max-[]: shadow-lg">


                    <div>

                        {/* header */}
                        <div className="bg-black w-full h-2">

                        </div>
                        <div className="bg-[#ed1c23] w-full h-50 flex flex-col items-center">
                            <img className="h-20 w-20" src={logo}></img>
                            <h3 className="font-semibold text-xl">Next Scan</h3>
                            <h3 className="font-semibold text-xl text-white">E-commerce store</h3>
                            <div className="flex gap-5 mt-2">
                                <h4 className="text-white text-md border-r px-2">01327-XXX XXX</h4>
                                <h4 className="text-white text-md border-r px-2">support@nextscan.com</h4>
                                <h4 className="text-white text-md">10/B Panthoport, Dhaka-1200</h4>
                            </div>

                        </div>


                        {/* Order */}

                        <div className="flex flex-col items-center  w-full px-10 border-b-2 border-dashed py-10">
                            <h3 className="text-xl font-semibold">ORDER RECEIPT</h3>
                            <div className="flex justify-between items-center">
                                <div className="w-90 mt-8">
                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm"  >Order Number:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.order_number}</h3>
                                    </div>


                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Date:</h3>
                                        <h3 className="text-[11px]">{new Date(InvoiceData?.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}</h3>
                                    </div>

                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Payment Status:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.payment_status}</h3>
                                    </div>

                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Delivery Status:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.deliver_status}</h3>
                                    </div>
                                </div>




                                <div className="w-90 mt-8 ">
                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">subtotal:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.subtotal}</h3>
                                    </div>


                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Discount:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.discount}</h3>
                                    </div>

                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Vat:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.vat}</h3>
                                    </div>


                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Delivery Charge:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.shipping}</h3>
                                    </div>

                                    <div className="flex">
                                        <h3 className="w-40 font-semibold text-sm">Payable:</h3>
                                        <h3 className="text-[11px]">{InvoiceData?.payable}</h3>
                                    </div>
                                </div>



                            </div>
                        </div>



                        {/* Product */}
                        <div className="flex flex-col items-center bg-gray-200 w-full px-10 border-b-2 border-dashed py-10">
                            <h3 className="text-xl font-semibold">Product Information</h3>
                            <div className="w-full mt-8">
                                {/* heading */}
                                <div className="flex border-t border-b py-1 ">
                                    <h3 className="text-md font-semibold w-100">Product</h3>
                                    <h3 className="text-md font-semibold w-40">Quantity</h3>
                                    <h3 className="text-md font-semibold w-40">Total</h3>
                                </div>

                                {/* Data */}
                                {
                                    InvoiceData?.product_details?.map((product) => (
                                        <div className="flex  py-1 px-1">
                                            <h3 className="text-md font-semibold w-100">{product?.title}</h3>
                                            <h3 className="text-md font-semibold w-40">{product?.qty}</h3>
                                            <h3 className="text-md font-semibold w-40">{Number(product?.discount_price) * Number(product?.qty)}</h3>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>


                        {/* Billing */}
                        <div className="flex flex-col items-center  w-full px-10 border-b-2 border-dashed py-10">
                            <h3 className="text-xl font-semibold">Customer Information</h3>
                            <div className="w-full mt-8">
                                <div className="flex">
                                    <h3 className="w-40 font-semibold">Name:</h3>
                                    <h3>{InvoiceData?.cus_detailes?.FirstName}</h3>
                                </div>


                                <div className="flex">
                                    <h3 className="w-40 font-semibold">Phone:</h3>
                                    <h3>{InvoiceData?.cus_detailes?.Phone}</h3>
                                </div>

                                <div className="flex">
                                    <h3 className="w-40 font-semibold">Email:</h3>
                                    <h3>{InvoiceData?.cus_detailes?.Email}</h3>
                                </div>

                                <div className="flex">
                                    <h3 className="w-40 font-semibold">Address:</h3>
                                    <h3>{InvoiceData?.cus_detailes?.Address}</h3>
                                </div>

                                <div className="flex">
                                    <h3 className="w-40 font-semibold">City:</h3>
                                    <h3>{InvoiceData?.cus_detailes?.City}</h3>
                                </div>
                            </div>
                        </div>


                        <div className="flex my-5 justify-center items-center">
                            <h1 className="text-lg">Thank you for shopping with us!</h1>


                        </div>
                    </div>

                    <div className="bg-black h-2">

                    </div>



                </div>


            </div>
        </div>

    )
}

export default Invoice