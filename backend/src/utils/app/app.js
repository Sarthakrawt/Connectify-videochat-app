import express from 'express'
import router from '../../routes/auth.routes.js';
import userRouter from '../../routes/user.routes.js';
import chatRouter from '../../routes/chat.routes.js';
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express();
console.log("cors is working")
app.use(cors({
    origin: "https://connectify-videochat-app.vercel.app",
    credentials: true
}))
app.options("*", cors({
  origin: "https://connectify-videochat-app.vercel.app",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

export default app;
