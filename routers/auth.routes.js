// External Modules
import express from "express";

// Local Modules
import { handleLogin } from "../controllers/auth.controller.js";
import { ValidatePassword } from "../validators/auth.validator.js";
import { notRequireAuth } from "../utils/jwt_requirence.util.js";
import handleValidate from "../middlewares/validate.middleware.js";

const AuthRouter = express.Router();

// POST Requests Handling
AuthRouter.post(
  "/login",
  notRequireAuth,
  ValidatePassword,
  handleValidate,
  handleLogin,
);

export default AuthRouter;
