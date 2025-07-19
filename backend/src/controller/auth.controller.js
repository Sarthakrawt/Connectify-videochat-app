import { upsertStreamUser } from '../lib/stream.js';
import{ User }from '../modules/users.modules.js'
import jwt from "jsonwebtoken"
const signup = async(req,res)=>{
const {email, password , fullName} = req.body;

try {
    if(!email || !password || !fullName){
        return res.status(400).json({message: "All fields are required"})
    }
    if(password.length < 6){
        return res.status(400).json({message : "password must be at least 6 characters"})
    }
    const emailRegx = /^[^/[+[+/[^/]+$/;
    if(!emailRegx.test(email)){
        return res.status(400).json({message: "Innnvalid email format"})
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "email already exists, pls use diffrent one"})
    }
    const idx = Math.floor(Math.random()*100)+1;
    const randomAvatar= `https://i.pravatar.cc/150?img=${idx}`;

    const newUser = await User({
        email,
        fullName,
        password,
        profilePic:randomAvatar,
       
    })
    newUser.save();
     
   try {
     await upsertStreamUser({
         id: newUser._id.toString(),
         name: newUser.fullName,
         image: newUser.profilePic || ""
     })
    //  console.log("Stream user created for " + newUser.fullName)
   } catch (error) {
    console.log("Error creating Stream user: ", error)
   }
    const token = jwt.sign({userId : newUser._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 *60 * 1000,
        httpOnly: true,
        sameSite: "none",
         secure:true
    })
    res.status(201).json({success: true , user: newUser })
} catch (error) {
    console.log("error in signup controller", error);
   return res.status(500).json({message: "internal error", error})
}

}

async function login(req,res ){
    try {
        const {email , password} = req.body;

         console.log("working 100%", email , password);
        if(!email || !password){
            return res.status(400).json({message: "All fields are requried"})
        }
        const user = await User.findOne({email});
        // console.log(user);
        if(!user){
           return res.status(401).json({message: "Invalid email or password"})
        }

        const isPasswordCorrect = await user.matchPassword(password);
       if(!isPasswordCorrect){
        return res.status(401).json({message: "Invalid email or password"})
       }

       const token = jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{
        expiresIn : "7d",
       })
       res.cookie("jwt", token, {
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
        sameSite: "none" ,
        secure: true
       })
      return res.status(200).json({success: true, user})
    } catch (error) {
        console.log("Error at login" , error.message);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

function logout(req, res){
    res.clearCookie("jwt")
   return res.status(200).json({success: true, message: "Logout successfull"})
}

async function onboard(req,res){
try {
    const userId  = req.user._id;

    const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
    if(!fullName || !nativeLanguage || !learningLanguage || !location){

        return res.status(400).json({
            message:"all field are provided",
            missingFields: [
                !fullName && "fullName",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !location && "location"
            ]
        })
    }
    const updatedUser = await User.findByIdAndUpdate(userId, {
        ...req.body,
        isOnboarded: true,

    },{new: true})
    if(!updatedUser){
        return res.status(404).json({message: "User not found"})

    }
   try {
     await upsertStreamUser({
         id: updatedUser._id.toString(),
         name: updatedUser.fullName,
         image: updatedUser.profilePic || "",
     })
    //  console.log(`Stream user updated after onboarding for ${updatedUser.nativeLanguage}`)
   } catch (error) {
    console.log("Error updating Stream user during onboarding: ", error.message)
   }

     res.status(200).json({success: true, user: updatedUser})
} catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({message: "Internal onBoard Error"})
}
}


export {
    signup,
    login,
    logout,
    onboard
}
