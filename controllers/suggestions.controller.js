// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import UserModel from "../models/user.model.js";
import AppError from "../classes/AppError.class.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const suggests = asyncHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);

  const suggestions = await UserModel.find({
    _id: { $ne: decoded._id },
    accountStatus: "active",
  })
    .limit(5)
    .select("name username profilePictureUrl isVerified")
    .sort({ followersCount: 1 })
    .lean();

  return res.status(200).json({
    isSuccess: true,
    code: "SUGGESTIONS_FETCHED",
    message: "Suggestions are fetched.",
    data: suggestions,
  });
});

export default { suggests };
