// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import asyncHandler from "../utils/asyncHandler.util.js";
import {
  findCreator,
  createThread,
  fetchFeed,
} from "../services/post.service.js";

const create = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);

  // Find Creator's Info
  const creator = await findCreator(decoded._id);

  // Create Thread (if)
  await createThread(
    req.body.caption,
    creator._id,
    creator.username,
    creator.name,
    creator.profilePictureUrl,
    creator.accountStatus,
    creator.isVerified,
  );

  return res.status(201).json({
    isSuccess: true,
    code: "POST_CREATED",
    message: "Post created Successfully!",
    meta: { type: "thread" },
  });
});

const initialLoad = asyncHandler(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.AuthToken, process.env.JWT_SECRET);

  // Fetch Feed
  const results = await fetchFeed(10, decoded._id);

  return res.status(200).json({
    isSuccess: true,
    code: "POSTS_FETCHED",
    message: "Posts fetched Successfully!",
    data: { results },
  });
});

export default { create, initialLoad };
