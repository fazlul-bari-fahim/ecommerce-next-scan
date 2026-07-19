import mongoose from "mongoose";



const hotDealSchema = new mongoose.Schema({
    product_id: { type: String, unique: true }
}, {
    timestamps: true,
    versionKey: false,
});


const HotDealModel = mongoose.model("HotDeal", hotDealSchema);
export default HotDealModel;