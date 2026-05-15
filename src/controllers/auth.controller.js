// External Modules
import pick from "lodash/pick.js";

// Local Modules
import UserModel from "../models/user.model.js";
import AppError from "../classes/AppError.class.js";
import asyncHandler from "../utils/asyncHandler.util.js";
import { findUser, verifyPassword } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../utils/jwt.util.js";

const handleLogin = async (req, res, next) => {
  // 1. Find the User
  const User = await findUser(req.body.usernameOrEmail);

  if (User.flag === "RED" || User.code === "NOT_FOUND")
    return next(
      new AppError(
        "Cannot found any account associated with this username or email.",
        "USER_NOT_FOUND",
        404,
      ),
    );

  // 2. Verify the Passwords
  const passwordVerificationResult = await verifyPassword(
    req.body.password,
    User.password,
  );

  if (
    passwordVerificationResult.flag === "RED" ||
    passwordVerificationResult.code === "INCORRECT_PASSWORD"
  ) {
    return next(
      new AppError(
        "The entered password is incorrect.",
        "PASSWORD_INCORRECT",
        401,
      ),
    );
  }

  // 3. Generate JsonWebToken
  const token = generateToken({ _id: User._id });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Days
  });

  return res.status(200).json({
    isSuccess: true,
    code: "LOGIN_SUCCESS",
    message: "You are logged in successfully!",
  });
};

const getMe = asyncHandler(async (req, res, next) => {
  const decoded = verifyToken(req.cookies.token);

  const result = await UserModel.findOne({ _id: decoded._id }).select(
    "-_id username name profilePictureUrl isVerified dateOfBirth age",
  );

  const MinimalUserData = pick(result, [
    "username",
    "name",
    "profilePictureUrl",
    "isVerified",
    "age",
  ]);

  return res.status(200).json({
    isSuccess: true,
    code: "GOT_YOU",
    message: "Got your Profile.",
    meta: { data: MinimalUserData },
  });
});

export default { handleLogin, getMe };
