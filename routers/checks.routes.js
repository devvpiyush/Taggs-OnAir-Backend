// External Modules
import express from "express";

// Local Modules
import { ValidateUsername } from "../validators/auth.validator.js";
import handleValidate from "../middlewares/validate.middleware.js";
import { checkUsername } from "../controllers/checks.controller.js";

const ChecksRouter = express.Router();

// POST Routes
ChecksRouter.post("/username", ValidateUsername, handleValidate, checkUsername);

export default ChecksRouter;
