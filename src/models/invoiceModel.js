import mongoose from "mongoose";

const invoiceModelSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    order_number: { type: String, unique: true, required: true },
    payable: { type: String, required: true },
    cus_detailes: { type: Object, required: true },
    ship_details: { type: Object, required: true },
    product_details: { type: Array, required: true },
    // tran_id: { type: String, required: true },
    // val_id: { type: String, required: true },
    deliver_status: {
        type: String,
        required: true,
        enum: ["pending", "process", "delivered", "cancel"],
        default: "pending",
    },
    payment_status: {
        type: String,
        required: true,
        enum: ["cashon", "success", "cancel"],
        default: "cashon",
    },
    discount: { type: String, required: true },
    vat: { type: String, required: true },
    shipping: { type: String, required: true },
    subtotal: { type: String, required: true }

}, {
    timestamps: true,
    versionKey: false
});

const paymentModel = mongoose.model("Invoice", invoiceModelSchema);
export default paymentModel;