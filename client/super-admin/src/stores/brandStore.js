import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../helpers/config";


const brandStore = create((set) => ({


    // Create Brand
    createBrandLoading: false,
    createBrandRequest: async ({ data, file }) => {
        try {

            set({ createBrandLoading: true });

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




            const res = await axios.post(baseURL + `/brand-create`, formData, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ createBrandLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ createBrandLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            set({ createBrandLoading: false });
            return false

        }

    },

    // get all brand

    totalBrand: null,
    allBrand: null,
    getBrandLoading: false,
    getBrandRequest: async (per_page, page_no) => {
        try {

            set({ getBrandLoading: true });

            const res = await axios.get(baseURL + `/all-brand/${per_page}/${page_no}`, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ getBrandLoading: false });
                set({ totalBrand: res?.data?.data?.totalCount?.[0]?.count });
                set({ allBrand: res?.data?.data?.brand });
                // toast.success(res?.data?.message);
                return true;
            } else {
                set({ getBrandLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ getBrandLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }
        }
    },


    // Single Brand
    singleBrand: null,
    singleBrandLoading: false,
    singleBrandRequet: async (id) => {
        try {

            set({ singleBrandLoading: true });

            const res = await axios.get(baseURL + `/single-brand/${id}`, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ singleBrandLoading: false });
                set({ singleBrand: res?.data?.Data })
                // toast.success(res?.data?.success);
                return res?.data?.Data;

            } else {
                set({ singleBrandLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ singleBrandLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }
        }
    },


    // Update Brand

    updateBrandLoading: false,
    updateBrandRequest: async (id, { data, file }) => {
        try {
            set({ updateBrandLoading: true });

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

            const res = await axios.put(baseURL + `/update-brand/${id}`, formData, {

                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ updateBrandLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ updateBrandLoading: true });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ adminRegisterLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },


    // Delete Brand

    deleteBrandRequest: async (id) => {
        try {

            const res = await axios.delete(baseURL + `/delete-brand/${id}`, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                toast.success(res?.data?.message);
                return true;
            } else {
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ updateBrandLoading: false });
            toast.error("Something went wrong");
            return false;

        }
    },




}));

export default brandStore;