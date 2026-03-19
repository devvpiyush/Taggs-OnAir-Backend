// External Modules
import express from "express";

// Local Modules
import { handleUnLogin, getMe } from "../controllers/auth.controller.js";
import {
  ValidatePassword,
  ValidateUsername,
} from "../validators/auth.validator.js";
import { notRequireAuth, requireAuth } from "../utils/jwt_requirence.util.js";
import handleValidate from "../middlewares/validate.middleware.js";

const AuthRouter = express.Router();

// GET Requests Handling
AuthRouter.get("/me", requireAuth, getMe);

// POST Requests Handling
AuthRouter.post(
  "/un/login",
  notRequireAuth,
  ValidateUsername,
  ValidatePassword,
  handleValidate,
  handleUnLogin,
);

export default AuthRouter;
