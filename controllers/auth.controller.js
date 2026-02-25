// External Modules
import { validationResult } from "express-validator";

// Local Modules
import UserModel from "../models/user.model.js";

export const checkUsernameAvailibility = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: validationErrors[0],
    });
  }

  try {
    const searchForUsername = await UserModel.countDocuments({
      username: req.body.username,
    });

    if (searchForUsername > 0) {
      return res.status(200).json({
        isSuccess: true,
        message: "Username Unavailable.",
      });
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Username is Available.",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
