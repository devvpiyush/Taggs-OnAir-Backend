// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/auth.controller.js";
import AuthCheck from "../utils/jwt_requirence.util.js";

const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", AuthCheck.requireAuth, controller.getMe);

// POST Requests Handling
AuthRouter.post("/login", AuthCheck.notRequireAuth, controller.handleLogin);

export default AuthRouter;
