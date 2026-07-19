import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../Helpers/Config.js";



const CartStore = create((set) => ({

    CartCreateLoading: false,
    CartCreateRequest: async ({ data, file }) => {



        try {
            set({ CartCreateLoading: true });


            const formData = new FormData();

            //Text data Add
            Object.keys(data || {}).forEach((key) => {

                formData.append(key, data[key]);
            });


            //file add
            if (file) {
                Object.keys(file).forEach((key) => {
                    formData.append(key, file[key]);
                });
            }






            const res = await axios.post(baseURL + "/create-cart", formData, {
                withCredentials: true,
                credentials: "include",

            });



            if (res?.data?.success === true) {
                set({ CartCreateLoading: false });
                toast.success(res?.data?.message);

                return true;
            } else {
                set({ CartCreateLoading: false });
                toast.error(res?.data?.message);

                return false;
            }

        } catch (error) {
            console.log(error);
            set({ CartCreateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },

    totalCart: null,
    allCart: [],
    cartGetLoading: false,
    cartGetRequest: async () => {
        try {

            set({ cartGetLoading: true });

            const res = await axios.get(baseURL + `/read-cart`, {

                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ totalCart: res?.data?.Data?.[0]?.totalCount?.[0]?.count });
                set({ allCart: res?.data?.Data?.[0]?.product });
                set({ cartGetLoading: false });
                // toast.success(res?.data?.message);
                return true;

            } else {
                toast.error(res?.data?.message);
                set({ cartGetLoading: false });
                return false;
            }



        } catch (error) {
            console.log(error);
            set({ cartGetLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                // toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },




    cartUpdateLoading: false,
    cartUpdateRequest: async ({ cart_id, data }) => {
        try {

            set({ cartUpdateLoading: true });
            const res = await axios.put(baseURL + `/update-cart/${cart_id}`, data, {
                withCredentials: true,
                credentials: "include",

            });


            if (res?.data?.success === true) {
                set({ cartUpdateLoading: false });
                toast.success(res?.data?.message);
                return true;


            } else {
                set({ cartUpdateLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ cartUpdateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },



    cartRemoveLoading: false,
    cartRemoveRequest: async (_id) => {
        try {

            set({ cartRemoveLoading: true });
            const res = await axios.delete(baseURL + `/delete-cart/${_id}`, {
                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ cartRemoveLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ cartRemoveLoading: false });
                toast.success(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ cartRemoveLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    }
}));



export default CartStore;