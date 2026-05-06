// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/follow.controller.js";
import AuthCheck from "../utils/jwt_requirence.util.js";

const FollowRouter = express.Router();

// POST Requests Handling
FollowRouter.post(
  "/follow/:followingId",
  AuthCheck.requireAuth,
  controller.handleFollow,
);

export default FollowRouter;
