// External Modules
import express from "express";

// Local Modules
import handleValidate from "../middlewares/validate.middleware.js";
import { ValidateUsername } from "../validators/auth.validator.js";
import { checkUsername } from "../controllers/check.controller.js";

const CheckRouter = express.Router();

// GET Requests
CheckRouter.post("/username", ValidateUsername, handleValidate, checkUsername);

export default CheckRouter;
