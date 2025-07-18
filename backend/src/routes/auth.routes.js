import { Router } from "express";
import { signup ,login , logout, onboard} from "../controller/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
const router = Router();

router.route("/signup").post(
    signup
)

router.route("/login").post( 
    login
)

router.post("/logout",  
    logout
)
router.post("/onboarding", protectRoute, onboard)

router.get("/me", protectRoute,(req,res)=>{
   try{
        res.status(200).json({success:true, user: req.user});
   }catch(error){
       console.log("Error at get method", error)}
} )


export default router;
