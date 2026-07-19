import mongoose from "mongoose";

const invoiceModelSchema = new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId, require:true},
    product_id:{type:mongoose.Schema.Types.ObjectId, require:true},
    invoice_id:{type:mongoose.Schema.Types.ObjectId, require:true},
    product_name:{type:String, required:true},
    qty:{type:Number, required:true},
    price:{type:Number, required:true},
    color:{type:String, required:true},
    size:{type:String, required:true},
},{
    timestamps:true,
    size:false,
});

const invoiceModel = mongoose.model("ProductInvoice", invoiceModelSchema);
export default invoiceModel;