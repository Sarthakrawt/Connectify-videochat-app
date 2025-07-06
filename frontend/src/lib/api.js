
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
    const res = await axiosInstance.get("/users/outgoing-friend-requests")
    return res.data;
}

const getRecommendedUsers = async()=> {
    const res = await axiosInstance.get("/users/");
    return res.data;
}
const getUserFriends = async()=>{
    const res = await axiosInstance.get("/users/friends");
    return res.data;
}

const sendFriendRequest = async(userId)=>{
    const res = await axiosInstance.post(`/users/friend-request/${userId}`)
    return res.data;
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
        };

