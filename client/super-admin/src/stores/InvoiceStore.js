import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../helpers/config";



const InvoiceStore = create((set) => ({

    orderID: null,
    InvoiceCreateLoading: false,
    InvoiceCreateRequest: async (data, navigate) => {







        try {
            set({ InvoiceCreateLoading: true });


            const res = await axios.post(baseURL + `/create-order`, data, {

                withCredentials: true,
                credentials: "include",
            });



            if (res?.data?.success === true) {
                set({ InvoiceCreateLoading: false });
                set({ orderID: res?.data?.Data?._id })
                toast.success(res?.data?.message);

                navigate("/thankyou")
                return true;

            } else if (res?.data?.success === false) {
                set({ InvoiceCreateLoading: false });
                toast.error(res?.data?.message);
                return false;


            }

        } catch (error) {
            console.log(error);

            set({ InvoiceCreateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },



    InvoiceUpdateLoading: false,
    InvoiceUpdateRequest: async ({ _id, data }) => {


        try {

            set({ InvoiceUpdateLoading: true });

            const res = await axios.put(baseURL + `/update-order/${_id}`, data, {


                withCredentials: true,
                credentials: "include",

            });





            if (res?.data?.success === true) {
                set({ InvoiceUpdateLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {

                set({ InvoiceUpdateLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ InvoiceUpdateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }


        }

    },


    InvoiceData: [],
    InvoiceGetLoading: false,
    InvoiceGetRequest: async ({ _id }) => {

        try {

            set({ InvoiceGetLoading: true });

            const res = await axios.get(baseURL + `/getsingle-order/${_id}`, {


                withCredentials: true,
                credentials: "include",

            });



            if (res?.data?.success === true) {
                set({ InvoiceGetLoading: false });
                set({ InvoiceData: res?.data?.Data })
                // toast.success(res?.data?.message);
                return true;

            } else {

                set({ InvoiceGetLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ InvoiceGetLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }


        }

    },


    AllInvoice: [],
    AllInvoiceGetLoading: false,
    AllInvoiceGetRequest: async () => {



        try {

            set({ AllInvoiceGetLoading: true });

            const res = await axios.get(baseURL + `/get-all-order`, {


                withCredentials: true,
                credentials: "include",

            });




            if (res?.data?.success === true) {
                set({ AllInvoiceGetLoading: false });
                set({ AllInvoice: res?.data?.Data });
                // toast.success(res?.data?.message);
                return true;

            } else {

                set({ AllInvoiceGetLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ AllInvoiceGetLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }


        }


    },



    DownloadInvoiceRequest: async (_id) => {
        try {
            const response = await axios.get(
                `${baseURL}/invoice/${_id}`,
                {
                    responseType: "blob",
                    withCredentials: true,
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", `Invoice-${_id}.pdf`);

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    },







}));


export default InvoiceStore;