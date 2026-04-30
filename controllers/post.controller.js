// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import asyncHandler from "../utils/asyncHandler.util.js";
import PostModel from "../models/post.model.js";

const create = asyncHandler(async (req, res, next) => {
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

const initialLoad = asyncHandler(async (req, res, next) => {
  const fetchPosts = await PostModel.find({ isDeleted: false })
    .sort({ score: -1, createdAt: -1 })
    .limit(8)
    .populate("postedBy", "profilePictureUrl username name isVerified")
    .select("caption type viewsCount likesCount commentsCount createdAt");

  return res.status(200).json({
    isSuccess: true,
    code: "POSTS_FETCHED",
    message: "Posts fetched Successfully!",
    meta: { data: fetchPosts },
  });
});

export default { create, initialLoad };
