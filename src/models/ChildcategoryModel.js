import mongoose from "mongoose";

const ChildcategoryModelSchema = new mongoose.Schema({
    parentcategory_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    childcategory_name: { type: String, required: true, unique: true },
    childcategory_image: { type: String, required: true, default: null }
}, {
    timestamps: true,
    versionKey: false,
}

)

const childcategoryModel = mongoose.model("childcategory", ChildcategoryModelSchema);
export default childcategoryModel;

