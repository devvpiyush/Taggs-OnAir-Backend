// External Modules
import express from "express";

// Local Modules
import AuthController from "../controllers/auth.controller.js";
import AuthCheck from "../utils/jwt_requirence.util.js";

const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", AuthCheck.requireAuth, AuthController.getMe);

// POST Requests Handling
AuthRouter.post("/login", AuthCheck.notRequireAuth, AuthController.handleLogin);

export default AuthRouter;
