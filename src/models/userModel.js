import mongoose from "mongoose";
import bcrypt from "bcrypt";



const userModelSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    address: { type: String },
    city: { type: String },
    phone: { type: String },
    post_Code: { type: String },
    state: { type: String },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});


userModelSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});




const userModel = mongoose.model("User", userModelSchema);
export default userModel;