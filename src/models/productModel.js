import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sub_title: { type: String, required: true },
    service_we_provide: { type: String, required: true },
    features: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    brand_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    short_description: { type: String, required: true },
    regular_price: { type: String, required: true },
    discount_price: { type: String },
    size: {
        type: [String],
        default: []
    },
    color: {

        type: [String],
        default: []
    },
    is_discount: { type: String },
    remark: { type: String },
    stock: { type: Number },
    description: { type: String, required: true },
    big_image: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    image3: { type: String, required: true },
    image4: { type: String, required: true },


}, {
    timestamps: true,
    versionKey: false,
});

const productsModel = mongoose.model("Product", productModelSchema);
export default productsModel;