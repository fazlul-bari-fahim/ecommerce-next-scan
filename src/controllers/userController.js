
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import tokenHelper from "../utility/tokenHelper.js";






const options = {
    maxAge: process.env.Cookie_Expire_Time,
    httpOnly: false,
    sameSite: "none",
    secure: true,

};


//  User Register


const register = async (req, res) => {

    try {

        const { email, password } = req.body;


        const isUser = await userModel.find({ email });

        if (isUser.length > 0) {
            return res.status(500).json({
                success: false,
                message: "Email already registered!"
            })
        };

        const user = await userModel.create({ email, password });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            Data: user,
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Please try again later"
        })

    }

};



// User Login

const login = async (req, res) => {
    console.log(req)

    try {

        const { email, password } = req.body;
        console.log(email, password)

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "Email not found"
            })
        };
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(200).json({
                success: false,
                message: "Please enter a correct password",

            })
        };

        if (isMatch) {
            const token = tokenHelper.EncodedToken(user.email, user._id.toString());

            res.cookie("U_token", token, options);

            res.status(200).json({
                success: true,
                message: "Login successfully",
                user: {
                    id: user._id,
                    email: user.email,
                },
                token: token,
            });
        }



    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Please try again later",
            error: error.toString()
        })

    }
};



// Get User

const user = async (req, res) => {

    try {
        const email = req.headers.email;
        const matchStage = {
            $match: { email },

        };


        const project = {
            $project: {
                password: 0,
            },
        };

        const data = await userModel.aggregate([matchStage, project]);
        res.status(200).json({
            success: true,
            data: data[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong."
        })

    }
};


// User Verify

const userVerify = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            message: "Valid User"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong"
        })

    }
};


//  User logout

const logout = async (req, res) => {
    try {

        res.clearCookie("U_token");

        res.status(200).json({
            success: true,
            message: "Logout successfully",

        })

    } catch (error) {


        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};

// User update

const update = async (req, res) => {



    try {

        const email = req.headers.email;
        const _id = req.headers._id;


        const {
            first_name,
            last_name,
            address,
            city,
            phone,
            post_Code,
            state,
            password
        } = req.body;


        const updateData = {
            first_name,
            last_name,
            address,
            city,
            phone,
            post_Code,
            state,
            email,
        };



        const user = await userModel.findOne({ email, _id });



        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found"
            })
        };

        if (password) {
            const hashedpassword = await bcrypt.hash(password, 10);
            updateData.password = hashedpassword;
        }



        const userData = await userModel.findByIdAndUpdate(_id, updateData, {
            returnDocument: "after",
        });



        const token = tokenHelper.EncodedToken(userData?.email, userData?._id.toString());

        res.cookie("U_token", token, options);
        res.status(200).json({
            success: true,
            message: "Update data successfully",
            user: {
                id: userData._id,
                email: userData.email,
                updateData: updateData,
            },
            token: token,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.toString(),
        })

    }
};



// All user

const Alluser = async (req, res) => {
    try {

        const allUser = await userModel.find();

        return res.status(200).json({
            success: true,
            message: "User fatched successfully",
            Data: allUser,
        })



    } catch (error) {
        console.log(error);

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        })

    }
};





const userController = { register, login, user, userVerify, logout, update, Alluser };
export default userController;