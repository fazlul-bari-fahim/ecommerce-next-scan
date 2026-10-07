import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../Helpers/Config.js";


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










}));

export default contactStore;