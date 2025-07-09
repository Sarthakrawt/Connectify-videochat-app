
import { axiosInstance } from "./axios.js";
const signup = async(signupData)=>{
          
            try {
                 const response = await axiosInstance.post("/auth/signup",signupData);
                 
                 return response.data;
               
            } catch (error) {
                console.log(error.response.data.message)
                throw error.response?.data.message 
            }
        }
const getAuthUser = async()=>{
   try {
     const res = await axiosInstance.get("/auth/me");
     return res.data;
   } catch (error) {
    console.log("Error in getAuthUser" , error);
    return null
   }
}

const completeOnboarding = async(userData)=>{
    const response = await axiosInstance.post("/auth/onboarding",userData);
    return response.data;
}
    

const login = async(loginData)=>{
    const res = await axiosInstance.post("/auth/login",loginData)
    return res.data;
}

const logout = async()=>{
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

const getOutgoingFriendReqs = async()=>{
   try {
     const res = await axiosInstance.get("/users/outgoing-friend-requests")
     return res.data;
   } catch (error) {
    console.log("error at getOutgoingfriendReq", error)
   }
}

const getRecommendedUsers = async()=> {
   try {
     const res = await axiosInstance.get("/users");
     return res.data;
   } catch (error) {
    console.log("error at getRecommended", error)
   }
}
const getUserFriends = async()=>{
  try {
      const res = await axiosInstance.get("/users/friends");
      console.log(res.data)
      return res.data;
  } catch (error) {
    console.log("error at getUserFriends", error)
  }
}

const sendFriendRequest = async(userId)=>{
    try {
        const res = await axiosInstance.post(`/users/friend-request/${userId}`)
       
        return res.data;
    } catch (error) {
        console.log("error at sendFriendReq", error)
    }
}

const acceptFriendRequest = async(userId)=>{
 try {
   const res = await axiosInstance.put(`/users/friend-request/${userId}/accept`)
   return res.data;
 } catch (error) {
  console.log("Error at acceptFs" , error);
 }
}

const getFriendRequests = async()=>{
 
   const res = await axiosInstance.get("/users/friend-request")
   
   return res.data;
 
}


const getStreamToken = async() =>{
 try {
   const res = await axiosInstance.get("/chat/token")
   console.log(res.data)
   return res.data
 } catch (error) {
  console.log("error occur at get StreamToken ", error);
 }
}
    export {
            signup,
            getAuthUser,
            completeOnboarding,
            login,
            logout,
            sendFriendRequest,
            getOutgoingFriendReqs,
            getUserFriends,
            getRecommendedUsers,
            acceptFriendRequest,
            getFriendRequests,
            getStreamToken
        };

