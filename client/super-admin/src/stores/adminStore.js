import axios from "axios";
import { create } from "zustand";
import { baseURL } from "../helpers/config";
import toast from "react-hot-toast";


const adminStore = create((set) => ({
    // Admin-registar 
    adminRegisterLoading: false,
    adminRegisterRequest: async (data) => {
        try {
            set({ adminRegisterLoading: true });

            const res = await axios.post(`${baseURL}/admin-register`, data, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ adminRegisterLoading: false });
                toast.success(res?.data?.message);
                window.location.href = "/super-admin/login"
                return true;
            } else {
                set({ adminRegisterLoading: false });
                toast.error("Try later");
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

    // Admin-login
    adminLoginLoading: false,
    adminLoginRequest: async (data) => {
        try {
            set({ adminLoginLoading: true });
            const res = await axios.post(`${baseURL}/admin-login`, data, {
                withCredentials: true,
                credentials: "include",
            });
            console.log("Backend", res)

            if (res?.data?.success === true) {
                set({ adminLoginLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ adminLoginLoading: false });
                toast.error(res?.data?.message);
            }

        } catch (error) {
            console.log(error);
            set({ adminLoginLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }
        }
    },


    // Admin-verify

    adminVerifyRequest: async () => {
        try {
            await axios.get(baseURL + `/admin-verify`, {
                withCredentials: true,
                credentials: "include",
            });
            return true;

        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                window.location.href = "/super-admin/login";
            }
            toast.error("something went wrong");
            return false;


        }
    },

    // Admin

    admin: null,
    adminRequest: async () => {
        try {
            const res = await axios.get(baseURL + `/admin`, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ admin: res?.data?.data });
                return true;
            }

        } catch (error) {
            console.log(error);
            toast.error("Try again later");
            return false;

        }
    },



    // Admin-update
    adminUpdateLoading: false,
    adminUpdateRequest: async (data) => {
        try {
            set({ adminUpdateLoading: true })
            const res = await axios.put(baseURL + `/admin-update`, data, {
                withCredentials: true,
                credentials: "include",
            });
            if (res?.data?.success === true) {
                set({ adminUpdateLoading: false });
                toast.success(res?.data?.message);
                return true;

            } else {
                set({ adminUpdateLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ adminUpdateLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }
    },



    //Admin-logout
    adminLogoutRequest: async () => {
        try {
            const res = await axios.get(baseURL + `/admin-logout`, {
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

export default adminStore;