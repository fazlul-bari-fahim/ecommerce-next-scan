import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import tokenHelper from "../utility/tokenHelper.js";




const options = {
    maxAge: process.env.Cookie_Expire_Time,
    httpOnly: false,
    sameSite: "none",
    secure: true,

};

// Create admin
const register = async (req, res) => {

    try {
        const { email, password } = req.body;

         const isUser = await Admin.find({email});
        
                if(isUser.length>0){
                    return res.status(500).json({
                        success:false,
                        message:"You already registered !"
                    })
                };
        const data = await Admin.create({ email, password });

        return res.status(201).json({
            success: true,
            message: "Admin Created Successfully",
            Data: data,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong"
        });

    }
};


// Login

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });

        if (!user)
            return res.status(200).json({
                success: false,
                message: "Email not register"
            })

        const isMatch = await bcrypt.compare(password, user.password);
       

        if (!isMatch) return res.status(200).json({
            success: false,
            message: "Password not matched"
        })

        if (isMatch) {
            const token = tokenHelper.EncodedToken(user.email, user._id.toString());

            // set cookie

            res.cookie("A_token", token, options);

            res.status(200).json({
                success: true,
                message: "Login successfull",
                user: {
                    id: user._id,
                    email: user.email,
                },
                token: token,
            })
        };

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "something went wrong"
        })

    }

};

// Admin

const admin = async (req, res) => {

    try {

        const email = req.headers.email;
        const matchStage = {
            $match:{email},
        };


        const project = {
            $project:{
                password:0,
            },
        };

       const data = await Admin.aggregate([matchStage, project]);


       res.status(200).json({
        success:true,
        message:"Admin found successfully",
        data:data,
       })
        
    } catch (error) {

        res.status(500).json({
            success:false,
            error:error.toString(),
            message:"No admin found"
        })
        
    }

}

// Admin verify

const adminVerify = async(req, res)=>{

    try {

        res.status(200).json({
            success:true
        })
        
    } catch (error) {

        return res.status(401).json({
            success:false,
            error:error.toString(),
            message:"No token found"
        })
        
    }
};


// Logout

const logOut = async (req, res)=>{

    try {
        
        res.clearCookie("A_token");

        res.status(200).json({
            success:true,
            message:"Successfully logout"
        })

    } catch (error) {

        return res.status(500).json({

            success:false,
            error:error.toString(),
            message:"Try again later"
        })
        
    }
}


// Admin Update 

const update = async (req, res)=>{
    try {

        const {email, password} = req.body;
        const _id = req.headers._id;
       

        const updateData = {email}

        const user = await Admin.findOne({ email, _id});


        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        };


        if(password){
            const hashedPassword = await bcrypt.hash(password,10);
            updateData.password = hashedPassword;
        };

        const updateAdmin = await Admin.findByIdAndUpdate(_id, updateData, {
            new:true,
        });


        const token = await tokenHelper.EncodedToken(updateAdmin?.email, updateAdmin?._id.toString());
        res.cookie("A_token",token, options);

        res.status(200).json({
            success:true,
            message:"User updated successfully",
            data :updateAdmin,
        })
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            error:error.toString(),
            message:"Try again later"
        })
        
    }
}

const adminController = { register, login,  admin, adminVerify, logOut, update};
export default adminController;

