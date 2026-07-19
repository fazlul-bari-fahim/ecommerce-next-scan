import mongoose from "mongoose";

const categoryModelSchema = mongoose.Schema({
    category_name:{type:String, required:true, unique:true},
    category_image:{type:String, required:true, default:null}
},{
    timeStamps:true,
    versionKey:false,
});

const categoryModel = mongoose.model("Category", categoryModelSchema);
export default categoryModel;