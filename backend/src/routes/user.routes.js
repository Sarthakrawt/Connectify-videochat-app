import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.use(protectRoute)

userRouter.get("/",  getRecommendedUsers)

userRouter.get("/friends", getMyFriends)

userRouter.post("/friend-request/:id", sendFriendRequest )

userRouter.put("/friend-request/:id/accept", acceptFriendRequest );

userRouter.get("/friend-request", getFriendRequest )

userRouter.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default userRouter;
