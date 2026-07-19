import express from "express"; //Express.js হলো Node.js-এর জন্য একটা ফ্রেমওয়ার্ক।
const app = express();              // Express দিয়ে একটা server app বানানো হলো।
import rateLimit from "express-rate-limit";       // Rate Limiting = এক ইউজার কতবার request করতে পারবে তা সীমা দেওয়া Hacker যেন বারবার request পাঠিয়ে সার্ভার ক্র্যাশ না করতে পারে
import helmet from "helmet";                       // Security header যোগ করে Browser কে বলে দেয় কী safe, কী না
import mongoSanitize from "express-mongo-sanitize";    // MongoDB Injection Attack থেকে বাঁচায়
import hpp from "hpp";                                 // HTTP Parameter Pollution থেকে বাঁচায়
import path from "path"                            // Node.js এর built-in module File / folder path ঠিকভাবে বানানো
import cors from "cors";                               // CORS = Cross-Origin Resource Sharing / Frontend (React) এক domain এ / Backend অন্য domain এ / ❌ Browser request block করে / 🛡️ cors() এটা allow করে
import cookieParser from "cookie-parser";             // Browser থেকে পাঠানো cookie পড়ার জন্য
import mongoose from "mongoose";                      // MongoDB এর সাথে connect করার জন্য
import dotenv from "dotenv";                         // .env ফাইল থেকে secret data পড়ার জন্য
import router from "./src/routes/api.js";

dotenv.config();                                        // .env ফাইল চালু করা


//  Connect to MongoDB 

let URL = "mongodb+srv://ecommercepro1:ecommercePro123@blog-pro.d4ifzoj.mongodb.net/";
         

let option = {
    user:process.env.DB_USER,
    pass:process.env.DB_PASS,
    autoIndex:true,                         // MongoDB automatic index বানাবে কি না
    serverSelectionTimeoutMS:50000,         // MongoDB কতক্ষণ অপেক্ষা করবে server খুঁজে পাওয়ার জন্য (1 second = 1000 milliseconds)
};




mongoose.connect(URL,option).then((res)=>{ 
    console.log("Database Connected");
})
.catch((err)=>{
    console.log(err)
});


mongoose.set("strictQuery",false);      // { name: "Rahim", salary: 50000 } কিন্তু salary field তো database এ নেই 😵 /MongoDB বলবে: ✔️ “ঠিক আছে, যেটা আছে সেটা দিয়েই search করি”



// Global Middlewares

app.use(cookieParser());                    // Browser থেকে আসা cookie read করতে পারে
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3001"],
        credentials:true,           // Cookie / token send করার permission
    })
);

app.use(
    helmet.contentSecurityPolicy({              //  app কে hack থেকে protect করে
        useDefaults:true,
        directives:{
            "img-src":["'self'","https:data:"]
        },
    })
);


app.use(hpp());


app.use(express.json({limit:"50mb"}));          // Frontend থেকে JSON data আসে: Max JSON size = 50MB
app.use(express.urlencoded({limit:"50mb"}));        // Form data কে: parse করে

app.use(mongoSanitize());
const limiter = rateLimit({windowMs:15*60*1000, max:3000});  // 3000 requests per 15 minute / 15 মিনিটে: এক user max 3000 request
app.use(limiter);

app.use("/api/v1", router);
app.use("/api/v1/get-file", express.static("src/uploads"));     // uploads folder এর file browser এ দেখাতে দেয়


// Server frontend
// app.use(
//     "/super-admin",         // /super-admin দিয়ে ঢুকলে Express যাবে: client/super-admin/dist:  http://localhost:5000/super-admin Super Admin frontend লোড হবে
//     express.static(path.join(__dirname,"client","super-admin", "dist"),{
//         index:false, // importan! prevents riderect 301 Redirect কোরো না, আমি নিজে handle করবো
//     })
// );
// app.get("/super-admin/*", (req,res)=> {
//     res.sendFile(
//         path.resolve(__dirname, "client", "super-admin", "dist","index.html")
//     );
// });


// app.use(express.static(path.join(__dirname, "client","ecommerce","dist")));
// app.get("*",function(req,res){
//     res.sendFile(
//         path.resolve(__dirname,"client","ecommerce","dist","index.html")
//     );
// });






export default app;