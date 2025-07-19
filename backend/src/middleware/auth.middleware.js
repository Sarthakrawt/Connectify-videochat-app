import jwt, { decode } from "jsonwebtoken"
import {User} from "../modules/users.modules.js"


export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if(!token){
            return res.status(401).json({message : "Unauthorized - No Token provided "})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(process.env.JWT_SECRET_KEY);
        // console.log(token)
        // console.log(decoded);
        if(!decoded){
            return res.status(401).json({message: "Unauthorized - User decoded not found"})
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json("Unauthorized - User not found")
        }
        req.user = user;
        
        next();
    } catch (error) {
        console.log("Error at authentication :",error)
        res.status(500).json({message: "Internal server error"})
    }
}
