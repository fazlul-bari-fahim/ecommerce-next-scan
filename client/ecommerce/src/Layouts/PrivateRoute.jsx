import { useEffect, useState } from "react"
import UserStore from "../Store/UserStore";
import { getToken } from "../Helpers/Helper.js";
import { Navigate } from "react-router-dom";




const PrivateRoute = ({ children }) => {


    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);


    const { userVerifyRequest } = UserStore();


    useEffect(() => {
        (async () => {
            try {

                await userVerifyRequest();
                const result = getToken();



                if (result) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }

            } catch (error) {
                console.log(error);
                setIsLogin(false);

            } finally {
                setLoading(false);

            }
        })();
    }, [userVerifyRequest]);


    if (loading) {
        return <></>
    }



    return isLogin ? children : <Navigate to="/dashboard-profile/login" />
}

export default PrivateRoute