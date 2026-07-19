import mongoose from "mongoose";


const fileModelSchema = new mongoose.Schema({
    filename:{type:String}
},{
    timestamps:true,
    versionKey:false,
});

const fileModel = mongoose.model("File", fileModelSchema);
export default fileModel;