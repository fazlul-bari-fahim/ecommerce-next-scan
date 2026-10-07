import DiscountCardModel from "../models/discountCartModel.js";

// Create
const create = async (req, res) => {

    try {

        const {
            firstName,
            email,
            phone,
            month,
            day,
            year,
        } = req.body;


        // Required field check
        if (!firstName || !email || !phone) {

            return res.status(400).json({
                success: false,
                message: "First name, email and phone are required.",
            });

        }


        // Check existing email
        const existingData = await DiscountCardModel.findOne({
            email: email,
        });


        if (existingData) {

            return res.status(400).json({
                success: false,
                message: "This email is already subscribed.",
            });

        }


        // Create subscriber
        const data = await DiscountCardModel.create({

            firstName,
            email,
            phone,

            month,
            day,
            year,

        });


        return res.status(200).json({

            success: true,
            message: "Successfully subscribed for 10% discount.",
            Data: data,

        });


    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something went wrong.",
            error: error.message,

        });

    }

};


// Get all subscribers
const get = async (req, res) => {

    try {

        const data = await DiscountCardModel.find();

        return res.status(200).json({

            success: true,
            message: "Discount subscribers fetched successfully.",
            Data: data,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something went wrong.",
            error: error.message,

        });

    }

};


// Delete subscriber
const DiscountCarddelete = async (req, res) => {

    try {

        const id = req.params.id;

        const data = await DiscountCardModel.findByIdAndDelete(id);


        if (!data) {

            return res.status(404).json({

                success: false,
                message: "Subscriber not found.",

            });

        }


        return res.status(200).json({

            success: true,
            message: "Subscriber removed.",
            Data: data,

        });


    } catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something went wrong.",
            error: error.message,

        });

    }

};


const DiscountCardController = {
    create,
    get,
    DiscountCarddelete
};


export default DiscountCardController;