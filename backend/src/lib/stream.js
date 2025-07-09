import {StreamChat} from "stream-chat"
import dotenv from "dotenv"

dotenv.config();

const apiKey = process.env.STREM_API_KEY;
// console.log(apiKey);
const apiSecret = process.env.STREM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream Api key or Secret is missing")
}


    const streamClient = StreamChat.getInstance(apiKey, apiSecret);
    
    export const upsertStreamUser = async (userData)=>{
        try{
            
            await streamClient.upsertUsers([userData]);
            return userData;
            
        }catch(error){
                console.error("Error upserting Stream user :", error);
            }
    }

export const generateStreamToken = (userId)=>{
    try {
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.log("Error in getStreamToken :", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}