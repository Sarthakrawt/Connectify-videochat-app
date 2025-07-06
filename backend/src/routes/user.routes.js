import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controller/user.controller";

const router = express.Router();

router.use(protectRoute)

router.get("/",  getRecommendedUsers)

router.get("/friends", getMyFriends)

router.post("/friend-request/:id", sendFriendRequest )

router.put("/friend-request/:id/accept", acceptFriendRequest );

router.get("/friend-request", getFriendRequest )

router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
