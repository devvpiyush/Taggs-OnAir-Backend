// Local Modules
import userModel from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.util.js";

export const checkUsername = catchAsync(async (req, res, next) => {
  const username = req.body.username;

  const result = await userModel.findOne({ username }).lean();

  if (result) {
    return res.status(200).json({
      isSuccess: true,
      code: "USERNAME_UNAVAILABLE",
      message: "Username is Unavailable.",
      meta: { username },
    });
  } else {
  }

  return res.status(200).json({
    isSuccess: true,
    code: "USERNAME_AVAILABLE",
    message: "Username is Available.",
    meta: { username },
  });
});
