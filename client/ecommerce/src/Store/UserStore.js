import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../Helpers/Config.js";
import toast from "react-hot-toast";



const UserStore = create((set) => ({



    userCreateLoading: false,
    userCreateRequest: async (data) => {

        try {

            set({ userCreateLoading: true });
            const res = await axios.post(baseURL + "/user-register", data, {
                withCredentials: true,
                credentials: "include",
            });
            console.log("Data", res?.data);

            if (res?.data?.success === true) {
                set({ userCreateLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {
                set({ userCreateLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ userCreateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },




    userLoginLoading: false,
    userLoginRequest: async (data) => {
        try {

            set({ userLoginLoading: true });
            const res = await axios.post(baseURL + "/user-login", data, {
                withCredentials: true,
                credentials: "include",

            });

            if (res?.data?.success === true) {
                set({ userLoginLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {
                set({ userLoginLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ userLoginLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },


    userVerifyRequest: async () => {
        try {
            await axios.get(baseURL + `/user-verify`, {
                withCredentials: true,
                credentials: "include",
            });
            return true;

        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                window.location.href = "/dashboard-profile/login";
            } toast.error("Something went wrong");
            return false;

        }
    },



    userUpdateData: [],
    userUpdateLoading: false,
    userUpdateRequest: async (data) => {

        try {


            set({ userUpdateLoading: true });

            const res = await axios.put(baseURL + `/user-update`, data, {
                withCredentials: true,
                credentials: "include",

            });


            if (res?.data?.success === true) {
                set({ userUpdateLoading: false });
                set({ userUpdateData: res?.data?.user?.updateData })
                toast.success(res?.data?.message);
                return true;
            } else {

                set({ userUpdateLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ userUpdateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }


        }

    },



    userData: null,
    userGetLoading: false,
    userGetRequest: async () => {

        try {


            set({ userGetLoading: true });

            const res = await axios.get(baseURL + `/user`, {
                withCredentials: true,
                credentials: "include",

            });




            if (res?.data?.success === true) {
                set({ userGetLoading: false });
                set({ userData: res?.data?.data })
                // toast.success(res?.data?.message);
                return true;
            } else {

                set({ userGetLoading: false });
                // toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ userGetLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },



    userLogoutLoading: false,
    userLogoutRequest: async () => {

        try {


            set({ userLogoutLoading: true });

            const res = await axios.get(baseURL + `/user-logout`, {
                withCredentials: true,
                credentials: "include",

            });




            if (res?.data?.success === true) {
                set({ userLogoutLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {

                set({ userLogoutLoading: false });
                toast.error(res?.data?.message);
                return false;

            }

        } catch (error) {
            console.log(error);
            set({ userLogoutLoading: false });
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



export default UserStore;