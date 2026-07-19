import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helpers/config";
import toast from "react-hot-toast";



const productStore = create((set) => ({

    // create


    productCreateLoading: false,
    productCreateRequest: async ({ data, file }) => {

        try {

            set({ productCreateLoading: true });
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
            };




            const res = await axios.post(baseURL + `/product-create`, formData, {
                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ productCreateLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ productCreateLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ productCreateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }





        }

    },





    totalProduct: null,
    allProduct: null,
    productGetLoading: false,
    productGetRequest: async ({ category_id, brand_id, remark, keyword, per_page, page_no }) => {
        try {

            set({ productGetLoading: true });

            const res = await axios.get(baseURL + `/all-products/${category_id}/${brand_id}/${remark}/${keyword}/${per_page}/${page_no}`, {
                withCredentials: true,
                credentials: "include",
            });


            if (res?.data?.success === true) {
                set({ productGetLoading: false });
                set({ allProduct: res?.data?.data?.[0]?.products });
                set({ totalProduct: res?.data?.data?.[0]?.totalCount?.[0]?.count });
                // toast.success(res?.data?.message);
                return true;


            } else {

                set({ productGetLoading: false });
                toast.error(res?.data?.message)
                return false;

            }

        } catch (error) {


            console.log(error);
            set({ productGetLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },



    // Single Product

    // single Product
    singleProduct: null,
    singleProductLoading: false,
    singleProductRequest: async ({ id }) => {
        try {

            set({ singleProductLoading: true });
            const res = await axios.get(baseURL + `/single-products/${id}`, {
                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ singleProductLoading: false });
                // toast.success(res?.data?.message);
                set({ singleProduct: res?.data?.data });
                return true;
            } else {
                set({ singleProductLoading: false });
                toast.error(res?.data?.message);

                return false;
            }


        } catch (error) {


            console.log(error);
            set({ singleProductLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },




    //  Update Product

    productUpdateLoading: false,
    productUpdateRequest: async ({ data, file, id }) => {


        try {

            set({ productCreateLoading: true });
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
            };




            const res = await axios.put(baseURL + `/update-products/${id}`, formData, {
                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ productUpdateLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ productUpdateLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {




            console.log(error);
            set({ productUpdateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }





        }

    },





    deleteProductLoading: false,
    deleteProductRequest: async (deleteId) => {

        try {
            set({ deleteProductLoading: true });

            const res = await axios.delete(baseURL + `/delete-products/${deleteId}`, {
                withCredentials: true,
                credentials: "include",
            });

            console.log(res)

            if (res?.data?.success === true) {
                set({ deleteProductLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ deleteProductLoading: false });
                toast.success(res?.data?.message);
            }

        } catch (error) {
            console.log(error);
            set({ deleteProductLoading: false });
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



export default productStore;