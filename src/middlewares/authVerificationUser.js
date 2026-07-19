import tokenHelper from "../utility/tokenHelper.js";

const authVerificationUser =async (req, res, next)=>{

   

        const token = await req.cookies["U_token"];
        const decoded = tokenHelper.DecodeToken(token);

        if(decoded === null){
            return res.status(404).json({
                success:false,
                message:"Invalid token"
            })
        }else{

            const email = decoded["email"];
            const _id = decoded["_id"];

            req.headers.email = email;
            req.headers._id = _id;
        }

        next()


        
  
};

export default authVerificationUser;