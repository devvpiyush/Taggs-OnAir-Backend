// External Modules
import express from "express";

// Local Modules
import {
  ValidateUsername,
  ValidateEmail,
} from "../validators/auth.validator.js";
import handleValidate from "../middlewares/validate.middleware.js";
import {
  checkUsername,
  verifyEmail,
} from "../controllers/checks.controller.js";

const ChecksRouter = express.Router();

// POST Routes
ChecksRouter.post("/username", ValidateUsername, handleValidate, checkUsername);
ChecksRouter.post("/email", ValidateEmail, handleValidate, verifyEmail);

export default ChecksRouter;
