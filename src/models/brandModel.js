import mongoose from "mongoose";
const brandModelSchema = new mongoose.Schema({
    brand_name:{type:String,required:true, unique:true},
    brand_image:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false,
});



const brandModel = mongoose.model("Brand",brandModelSchema);
export default brandModel;