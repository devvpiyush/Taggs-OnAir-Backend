// External Modules
import express from "express";

// Local Modules
import {
  ValidateEmail,
  ValidateOtp,
  ValidateUsername,
} from "../validators/auth.validator.js";
import {
  createTemporaryUser,
  saveTempEmail,
  onBoard,
  verifyEmail,
  resend,
} from "../controllers/auth.controller.js";
import { verifyTempAuthToken } from "../middlewares/jwt.middleware.js";
import handleValidate from "../middlewares/validate.middleware.js";

const AuthRouter = express.Router();

// GET Requests
AuthRouter.get("/onboard", onBoard);
AuthRouter.get("/resend", verifyTempAuthToken, resend);

// POST Requests
AuthRouter.post(
  "/temp/create",
  ValidateUsername,
  handleValidate,
  createTemporaryUser,
);
AuthRouter.post(
  "/temp/email",
  ValidateEmail,
  handleValidate,
  verifyTempAuthToken,
  saveTempEmail,
);
AuthRouter.post(
  "/temp/verify/email",
  ValidateOtp,
  handleValidate,
  verifyTempAuthToken,
  verifyEmail,
);

export default AuthRouter;
