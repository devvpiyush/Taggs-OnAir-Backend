// Local Modules
import UserModel from "../models/user.model.js";
import AppError from "../classes/AppError.class.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const fetch = asyncHandler(async (req, res, next) => {
  const param = req.params.username;

  if (!param) return next(new AppError("Username is required to search.", 400));

  const result = await UserModel.findOne({
    username: param,
    accountStatus: "active",
  }).select(
    "-_id identity username name bio profilePictureUrl accountVisibility accountType isVerified postsCount threadsCount followersCount followingCount",
  );

  if (!result)
    return next(
      new AppError("Profile not found associated with this username.", 404),
    );

  return res.status(200).json({
    isSuccess: true,
    code: "PROFILE_FOUND",
    message: "Profile Found.",
    meta: {
      data: result,
    },
  });
});

export default { fetch };
