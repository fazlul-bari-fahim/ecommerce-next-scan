import { useEffect, useState } from "react";
import adminStore from "../stores/adminStore";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const { adminVerifyRequest } = adminStore();

    useEffect(() => {

        const checkAuth = async () => {

            try {

                const result = await adminVerifyRequest();



                if (result === true) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }

            } catch (error) {

                console.log("Private Route Error:", error);
                setIsLogin(false);

            } finally {

                setLoading(false);

            }
        };

        checkAuth();

    }, [adminVerifyRequest]);


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }


    return isLogin
        ? children
        : <Navigate to="/login" replace />;
};

export default PrivateRoute;