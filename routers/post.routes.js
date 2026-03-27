// External Modules
import express from "express";

// Local Modules
import { create } from "../controllers/post.controller.js";
import { checkCaption } from "../validators/post.validator.js";
import validationResult from "../middlewares/validate.middleware.js";

const PostRouter = express.Router();

// POST Requests Handling
PostRouter.post("/new/create", checkCaption, validationResult, create);

export default PostRouter;
