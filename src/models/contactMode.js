import mongoose from "mongoose";



const contactModelSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, {
    timeStamps: true,
    versionKey: false,

});


const contactModel = mongoose.model("Contact", contactModelSchema);
export default contactModel;





