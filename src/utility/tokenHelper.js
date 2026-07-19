import JWT from "jsonwebtoken";

const EncodedToken = (email,_id)=>{
    const Key = process.env.JWT_KEY;
    const Expire = process.env.JWT_EXPIRES_IN;
    const Payload = {email,_id}

    return JWT.sign(Payload,Key, {expiresIn:Expire})
};


const DecodeToken = (token)=>{
    try {
        
    const Key = process.env.JWT_KEY;
    const Decode = JWT.verify(token, Key);  
    return Decode;


    } catch (error) {
        return null
    }
};


const tokenHelper = {EncodedToken, DecodeToken}

export default tokenHelper;