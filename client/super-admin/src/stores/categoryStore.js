import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../helpers/config";


const categoryStore = create((set) => ({

    // Create Category

    createCategoryLoading: false,
    createCategoryRequest: async ({ data, file }) => {
        try {
            set({ createCategoryLoading: true });

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

            const res = await axios.post(baseURL + `/category-create`, formData, {
                withCredentials: true,
                credentiasls: "include",
            })

            if (res?.data?.success === true) {
                set({ createCategoryLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ createCategoryLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createCategoryLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },

    // get all category
    totalCategory: null,
    allCategory: null,
    getAllCategoryLoading: false,
    getAllCategoryRequest: async (per_page, page_no) => {
        try {

            set({ getAllCategoryLoading: true });
            const res = await axios.get(baseURL + `/all-category/${per_page}/${page_no}`, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ getAllCategoryLoading: false });
                // toast.success(res?.data?.message);
                set({ totalCategory: res?.data?.data?.totalCount?.[0]?.count });
                set({ allCategory: res?.data?.data?.categories });
                return true;
            } else {
                set({ getAllCategoryLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createCategoryLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },

    // Single category

    singleCategory: null,
    singleCategoryLoading: false,
    singleCategoryRequest: async (id) => {
        try {

            set({ singleCategoryLoading: true });
            const res = await axios.get(baseURL + `/single-category/${id}`, {
                withCredentials: true,
                credentiasls: "include",
            });

            if (res?.data?.succes === true) {
                set({ singleCategoryLoading: false });
                set({ singleCategory: res?.data?.Data });
                // toast.success(res?.data?.message);
                return res?.data?.Data;
            } else {
                set({ singleCategoryLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createCategoryLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },

    // Delete Category
    deleteCategoryRequest: async (id) => {
        try {

            const res = await axios.delete(baseURL + `/delete-category/${id}`, {
                withCredentials: true,
                credentiasls: "include",
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
            set({ createCategoryLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },

    // Update Category
    updateData: null,
    updateCategoryLoading: false,
    updateCategoryRequest: async (id, { data, file }) => {
        try {
            set({ updateCategoryLoading: true });

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



            const res = await axios.put(baseURL + `/update-category/${id}`, formData, {
                withCredentials: true,
                credentiasls: "include",
            });




            if (res?.data?.success === true) {
                set({ updateCategoryLoading: false });
                set({ updateData: res?.data?.Data });
                toast.success(res?.data?.message);
                return true;
            } else {
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createCategoryLoading: false });
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



export default categoryStore;