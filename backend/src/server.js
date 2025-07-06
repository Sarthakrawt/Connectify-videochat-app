import express from "express"
import dotenv from "dotenv"
import app from "./utils/app/app.js";
import { connectDB } from "./db/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("app is listiong on this port ")

})
}
).catch((error)=>{
    console.log("error at connecting to server" , error)

}
)
