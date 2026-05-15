// External Modules
import pick from "lodash/pick.js";
import jwt from "jsonwebtoken";

// Local Modules
import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const searchAccounts = asyncHandler(async (req, res, next) => {
  const decoded = jwt.decode(req.cookies.token, process.env.JWT_SECRET);

  const results = await UserModel.find({
    _id: { $ne: decoded._id },
    accountStatus: "active",
    $or: [{ username: { $regex: req.query.query } }],
  })
    .sort({ isVerified: -1, lastActiveAt: -1 })
    .select("-_id username name isVerified profilePictureUrl");

  return res.status(200).json({
    isSuccess: true,
    code: "SEARCHED_SUCCESSFULLY",
    message: "Searched Accounts Successfully.",
    meta: { query: req.query.query, data: results },
  });
});

export default { searchAccounts };
