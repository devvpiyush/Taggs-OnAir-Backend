// External Modules
import express from "express";

// Local Modules
import { handleLogin, getMe } from "../controllers/auth.controller.js";
import { notRequireAuth, requireAuth } from "../utils/jwt_requirence.util.js";

const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", requireAuth, getMe);

// POST Requests Handling
AuthRouter.post("/login", notRequireAuth, handleLogin);

export default AuthRouter;
