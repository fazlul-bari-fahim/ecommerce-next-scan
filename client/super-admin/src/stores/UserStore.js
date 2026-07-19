import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { baseURL } from "../helpers/config";




const UserStore = create((set) => ({

    userData: [],
    userGetLoading: false,
    userGetRequest: async () => {

        try {

            set({ userGetLoading: true });

            const res = await axios.get(baseURL + `/all-user`, {



                withCredentials: true,
                credentials: "include",

            });


            if (res?.data?.success === true) {
                set({ userGetLoading: false });
                set({ userData: res?.data?.Data });
                // toast.success(res?.data?.message);
                return true
            } else {

                set({ userGetLoading: false });
                toast.error(res?.data?.message);
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

}));


export default UserStore;