// External Modules
import express from "express";

// Local Modules
import PostController from "../controllers/post.controller.js";
import { checkCaption } from "../validators/post.validator.js";
import validationResult from "../middlewares/validate.middleware.js";

const PostRouter = express.Router();

// GET Requests Handling
PostRouter.get("/feed", PostController.initialLoad);

// POST Requests Handling
PostRouter.post(
  "/new/create",
  checkCaption,
  validationResult,
  PostController.create,
);

export default PostRouter;
