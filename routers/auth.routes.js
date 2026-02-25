// External Modules
import express from "express";

// Local Modules
import { checkUsernameAvailibility } from "../controllers/auth.controller.js";
import { UsernameValidator } from "../validators/auth.validator.js";

const AuthRouter = express.Router();

// POST Routes
AuthRouter.post(
  "/check/username/availability",
  UsernameValidator,
  checkUsernameAvailibility,
);

export default AuthRouter;
