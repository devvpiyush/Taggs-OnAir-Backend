// Local Modules
import UserModel from "../models/user.model.js";

export const checkUsername = async (req, res, next) => {
  try {
    const result = await UserModel.findOne({
      username: req.body.username,
    }).lean();

    if (result) {
      return res.status(200).json({
        isSuccess: false,
        signal: "YELLOW",
        code: "USERNAME_UNAVAILABLE",
        message: "Username is Unavailable.",
        meta: { username: req.body.username },
      });
    }

    return res.status(200).json({
      isSuccess: true,
      signal: "GREEN",
      code: "USERNAME_AVAILABLE",
      message: "Username is Available.",
      meta: { username: req.body.username },
    });
  } catch (error) {
    throw Error(error);
  }
};
