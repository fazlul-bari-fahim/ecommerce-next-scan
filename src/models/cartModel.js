import mongoose from "mongoose";


const cartModleSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    big_image: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    qty: { type: Number, required: true, min: [0, "Quantity cannot be less than 0"] },
    discount_price: { type: Number },
    regular_price: { type: Number },
}, {
    timestamps: true,
    versionKey: false,
});


const cartModel = mongoose.model("Cart", cartModleSchema);
export default cartModel;