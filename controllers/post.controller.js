// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import asyncHandler from "../utils/asyncHandler.util.js";
import PostModel from "../models/post.model.js";

export const create = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);

  const createPost = await PostModel.create({
    caption: req.body.caption,
    postedBy: decoded._id,
  });

  return res.status(201).json({
    isSuccess: true,
    code: "POST_CREATED",
    message: "Post created Successfully!",
    meta: { type: "thread" },
  });
});
