import { useEffect, useState } from "react"
import adminStore from "../stores/adminStore";
import { Navigate } from "react-router-dom";
import { getToken } from "../helpers/helper";


const PrivateRoute = ({children}) => {

    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const {adminVerifyRequest} = adminStore();

    useEffect(()=>{
        (async ()=>{
            try {
                await adminVerifyRequest();
                const result = getToken();
               

                if(result){
                    setIsLogin(true);
                }else{
                    setIsLogin(false);
                }
                
            } catch (error) {
                console.log(error);
                setIsLogin(false);
                
            }finally{
                setLoading(false);
            }
        })();
    },[adminVerifyRequest]);

    if(loading){
        return <></>
    }

  return isLogin ? children : <Navigate to="/login"/>
}




// const privateRoute = ({children}) => {

//     const [isLogin, setIsLogin] = useState(false);
//     const [loading, setLoading] = useState(true);

//     const {adminVerifyRequest} = adminStore();

//     useEffect(()=>{
//         const checkAuth = async ()=>{
//             try {
//                 const res = await adminVerifyRequest();

//                 if(res){
//                     setIsLogin(true);
//                 }else{
//                     setIsLogin(false);
//                 }
                
//             } catch (error) {
//                 console.log(error);
//                 setIsLogin(false);
                
//             }finally{
//                 setLoading(false);
//             }
//         };
//     checkAuth();
//     },[adminVerifyRequest]);

//     if(loading){
//         return <div>Loading...</div>
//     }

//   return isLogin ? children : <Navigate to='/login'/>
// }

export default PrivateRoute