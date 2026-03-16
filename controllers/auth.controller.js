// External Modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pick from "lodash/pick.js";

// Local Modules
import UserModel from "../models/user.model.js";
import AppError from "../classes/AppError.class.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const handleLogin = asyncHandler(async (req, res, next) => {
  const result = await UserModel.findOne({
    $or: [
      { email: req.body.emailOrUsername },
      { username: req.body.emailOrUsername },
    ],
  })
    .select("+password")
    .lean();

  if (!result) {
    return next(
      new AppError(
        "Cannot found any account associated with this username or email.",
        "USER_NOT_FOUND",
        404,
      ),
    );
  }

  const verifyPassword = await bcrypt.compare(
    req.body.password,
    result.password,
  );

  if (!verifyPassword) {
    return next(
      new AppError(
        "The entered Password is incorrect.",
        "PASSWORD_INCORRECT",
        401,
      ),
    );
  }

  const MinimalUserData = pick(result, [
    "name",
    "isVerified",
    "profilePictureUrl",
  ]);

  const NewAuthToken = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  res.cookie("AuthToken", NewAuthToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Days
  });

  return res.status(200).json({
    isSuccess: true,
    data: MinimalUserData,
  });
});
