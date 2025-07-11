import { FriendRequest } from "../modules/friend-request.module.js";
import { User } from "../modules/users.modules.js";

async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId);
            
        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne: currentUserId}},
                {_id: {$nin: currentUser.friends }},
                // {isOnboarded: true}
            ]
        })
       return res.status(200).json(recommendedUsers)
    } catch (error) {
        console.log("error in getRecommendedUssers : ", error.message);
        res.status(500).json({message: "internal Server Error"})
    }
}

async function getMyFriends(req, res){
    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");
       return  res.status(200).json(user.friends);
    } catch (error) {
         console.log("error in getMyFriends : ", error.message);
        res.status(500).json({message: "internal Server Error"})
    }
}

async function sendFriendRequest(req, res){
   try {
     const myId = req.user.id;
     const {id: recipientId}= req.params;
 
     if(myId === recipientId){
         return res.status(400).json({message: "you can't send friend request to yourself"})
     }
 
     const recipient = await User.findById(recipientId)
 
     if(!recipient){
         return res.status(404).json({message: "you are already firends with the user"})
     }
 
     const existingUser = await FriendRequest.findOne({
         $or : [
             {sender: myId, recipient: recipientId},
             {sender: recipientId, recipient: myId}
         ]
     })
 
     if(existingUser){
         return res.status(400)
         .json({message: "A Friend request already exists btw you and this user"})
     }
     
     const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId,
     })
    return res.status(201).json(friendRequest)
   } catch (error) {
    console.error("Error in sendFriendRequest contorller", error.message);
    res.status(500).json("server Error")
   }

}

async function acceptFriendRequest(req, res){
   try {
     const {id: requestId} = req.params;
     const friendRequest = await FriendRequest.findById(requestId);
     if(!friendRequest){
         return res.status(404).json({message: "Friend request not found"});
     }
 
     if(friendRequest.recipient.toString() !== req.user.id){
         return res.status(403).json({message: "You are not authorized to accept this request"});
     }
 
     friendRequest.status = "accepted";
     await friendRequest.save();
 
     await User.findByIdAndUpdate(friendRequest.sender,{
         $addToSet:{friends: friendRequest.recipient},
     });
 
     await User.findByIdAndUpdate(friendRequest.recipient,{
         $addToSet:{friends: friendRequest.sender},
     });
 
    return res.status(200).json({message: "Friend request accepted"});
 
 
   } catch (error) {
    console.log("Error at acceptRequest controler : ", error.message);
    res.status(500).json({message: "Server Error"})
   }
}

async function getFriendRequest(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage");
       
        const acceptedReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "accepted",
        }).populate("recipient","fullName profilePic");
          
       
       return res.status(200).json({incomingReqs, acceptedReqs});
        
    } catch (error) {
        console.log("Error in getFriendRequests controller", error.message);
        res.status(500).json({message:"Internal server Error"})
    }
}

async function getOutgoingFriendReqs(req, res){
try {
    const outgoingReqs = await FriendRequest.find({
        sender: req.user.id,
        status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    return res.status(200).json(outgoingReqs);
} catch (error) {
     console.log("Error in outgoingReqest controller", error.message);
        res.status(500).json({message:"Internal server Error"})
}
}


export {
    getMyFriends,
    sendFriendRequest,
    getRecommendedUsers,
    getFriendRequest,
    getOutgoingFriendReqs,
    acceptFriendRequest

}