// External Modules
import pick from "lodash/pick.js";
import jwt from "jsonwebtoken"

// Local Modules
import UserModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.util.js";

export const handleSearch = asyncHandler(async (req, res, next) => {
const decoded = jwt.decode(req.cookies.AuthToken, process.env.JWT_SECRET);

  const results = await UserModel.find({
    $or: [{ username: { $regex: req.query.query } }],
_id: {$ne:decoded._id}}
  }).select("username name isVerified profilePictureUrl");

  const MinimalResultsData = results.map((result) =>
    pick(result, ["username", "name", "isVerified", "profilePictureUrl"]),
  );

  return res.status(200).json({
    isSuccess: true,
    meta: { query: req.query.query, results: MinimalResultsData },
  });
});
