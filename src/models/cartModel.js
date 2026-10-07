import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema(
    {

        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        size: {
            type: String,
            default: "No",
        },


        price: {
            type: Number,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },
    },
    {
        _id: true,
    }
);


const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        guest_id: {
            type: String,
            default: null,
        },

        items: {
            type: [cartItemSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);


const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;