// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/connectivity.controller.js";
import AuthCheck from "../utils/jwt_requirence.util.js";

const ConnectivityRouter = express.Router();

// GET Requests Handling
ConnectivityRouter.get(
  "/suggestions",
  AuthCheck.requireAuth,
  controller.suggest,
);

export default ConnectivityRouter;
