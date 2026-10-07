import mongoose from "mongoose";

const ParentcategoryModelSchema = new mongoose.Schema({

    parentcategory_name: { type: String, required: true, unique: true },
    parentcategory_image: { type: String, required: true, default: null }

}, {
    timestamps: true,
    versionKey: false,
});

const ParentcategoryModel = mongoose.model("Parentcategory", ParentcategoryModelSchema);
export default ParentcategoryModel;
