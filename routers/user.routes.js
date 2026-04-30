// External Modules
import express from "express";

// Local Modules
import UserController from "../controllers/user.controller.js";

const UserRouter = express.Router();

// GET Requests Handling
UserRouter.get("/id/:username", UserController.fetch);

export default UserRouter;
