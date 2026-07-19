
import tokenHelper from "../utility/tokenHelper.js"


const authVerificationAdmin = (req, res, next)=>{
    const token = req.cookies["A_token"];
    const decoded = tokenHelper.DecodeToken(token);

    if(decoded === null){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }else{
        const email = decoded["email"];
        const _id = decoded["_id"];


        req.headers.email = email;
        req.headers._id = _id;

        next();
    }
};


export default authVerificationAdmin;