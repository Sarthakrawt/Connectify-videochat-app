import { generateStreamToken } from "../lib/stream.js";
async function getStreamToken(req,res){
    try{
        const token = generateStreamToken(req.user.id);
        console.log("running")
        res.status(200).json({token});
    }catch(error){
        console.log("Error in getStreamToken : " , error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export {
    getStreamToken
}