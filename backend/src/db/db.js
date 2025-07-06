import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${(await conn).connection.host}`)
    } catch (error) {
        console.log("Error in MongoDb", error);
        process.exit(1);
    }
}