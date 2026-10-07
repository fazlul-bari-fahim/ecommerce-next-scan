import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../helpers/config";



const contactStore = create((set) => ({


    // Create contact
    createContactLoading: false,
    createContactRequest: async ({ data }) => {
        try {

            set({ createContactRequest: true });






            const res = await axios.post(baseURL + `/contact-create`, data, {
                withCredentials: true,
                credentials: "include",
            });

            if (res?.data?.success === true) {
                set({ createContactLoading: false });
                toast.success(res?.data?.message);
                return true;
            } else {
                set({ createContactLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ createContactRequest: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }

        }

    },





    totalContact: null,
    allContact: null,
    getContactLoading: false,
    getContactRequest: async (per_page, page_no) => {

        try {

            set({ getContactLoading: true });

            const res = await axios.get(baseURL + `/allcontact/${per_page}/${page_no}`, {
                withCredentials: true,
                credentials: "include",
            });


            if (res?.data?.success === true) {
                set({ getContactLoading: false });
                set({ totalContact: res?.data?.data?.[0]?.totalCount?.[0]?.count });
                set({ allContact: res?.data?.data?.[0]?.contact });
                // toast.success(res?.data?.message);
                return true;
            } else {
                set({ getContactLoading: false });
                toast.error(res?.data?.message);
                return false;
            }

        } catch (error) {
            console.log(error);
            set({ getContactLoading: false });
            if (error.response) {
                // Backend error (400, 404, 500...)
                toast.error(error.response.data.message);
            } else {
                // Network error
                toast.error("Oops! Something went wrong");
            }
        }
    },




    // Delete Contact
    deleteContactLoading: false,

    deleteContactRequest: async (id) => {

        try {

            set({ deleteContactLoading: true });

            const res = await axios.delete(baseURL + `/delete-contact/${id}`, {
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
            set({ deleteContactLoading: false });
            toast.error("Something went wrong");
            return false;

        }
    },







}));

export default contactStore;