import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: "https://connectify-videochat-app.onrender.com/api",
    withCredentials: true,// send cookie
})
