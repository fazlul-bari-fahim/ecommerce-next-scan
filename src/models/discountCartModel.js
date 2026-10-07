import mongoose from "mongoose";


const discountCardSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    month: {
        type: String,
    },

    day: {
        type: String,
    },

    year: {
        type: String,
    },

}, {
    timestamps: true,
});


const DiscountCardModel = mongoose.model(
    "DiscountCard",
    discountCardSchema
);


export default DiscountCardModel;