// External Modules
import express from "express";

// Local Modules
import controller from "../controllers/post.controller.js";
import { checkCaption } from "../validators/post.validator.js";
import validationResult from "../middlewares/validate.middleware.js";

const PostRouter = express.Router();

// GET Requests Handling
PostRouter.get("/feed", controller.initialLoad);

// POST Requests Handling
PostRouter.post(
  "/new/create",
  checkCaption,
  validationResult,
  controller.create,
);

export default PostRouter;
