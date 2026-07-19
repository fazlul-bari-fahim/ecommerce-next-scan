import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AdminModelSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true

    },
    password:{
        type:String,
        required:true,

    }
},{
    timestamps:true,
    versionKey:false,
}
);



// Password Hashing
AdminModelSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // password changed হলে হ্যাশ হবে
  this.password = await bcrypt.hash(this.password, 10);
});





const Admin = mongoose.model("Admin",AdminModelSchema);
export default Admin;