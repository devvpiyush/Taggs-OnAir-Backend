// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/user.controller.js";

const UserRouter = express.Router();

// GET Requests Handling
UserRouter.get("/id/:username", controller.fetch);

export default UserRouter;
