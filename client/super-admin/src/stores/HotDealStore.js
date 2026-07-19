import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helpers/config";
import toast from "react-hot-toast";



const HotDealStore = create((set) => ({


    createHotDealLoading: false,
    createHotDealRequest: async (data) => {

        try {

            set({ createHotDealLoading: true });
            const res = await axios.post(baseURL + `/hotdeal-create`, data, {

                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ createHotDealLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {
                set({ createHotDealLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createHotDealLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }


    },


    getHotDealdata: [],
    getHotDealLoading: false,
    getHotDealRequest: async () => {

        try {

            set({ getHotDealLoading: true });
            const res = await axios.get(baseURL + `/hotdeal-get`, {

                withCredentials: true,
                credentials: "include",

            });


            if (res?.data?.success === true) {
                set({ getHotDealLoading: false });
                set({ getHotDealdata: res?.data?.Data })
                // toast.success(res?.data?.message);
                return true;

            } else {
                set({ getHotDealLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ getHotDealLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }


    },


    deleteHotDealLoading: false,
    deleteHotDealRequest: async (id) => {

        try {

            set({ deleteHotDealLoading: true });
            const res = await axios.delete(baseURL + `/hotdeal-delete/${id}`, {

                withCredentials: true,
                credentials: "include",

            });


            if (res?.data?.success === true) {
                set({ deleteHotDealLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {
                set({ deleteHotDealLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ deleteHotDealLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }


    },






}));


export default HotDealStore;