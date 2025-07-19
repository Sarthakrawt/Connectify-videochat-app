import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: "https://render.com/docs/web-services#port-bindingi",
    withCredentials: true,// send cookie
})
