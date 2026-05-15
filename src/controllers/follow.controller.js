// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import UserModel from "../models/user.model.js";
import FollowModel from "../models/follow.model.js";
import AppError from "../classes/AppError.class.js";
import asyncHandler from "../utils/asyncHandler.util.js";

const handleFollow = asyncHandler(async (req, res, next) => {
  // Constants
  const decoded = jwt.decode(req.cookies.token);
  const followingId = req.params.followingId;

  const check = await FollowModel.findOne({
    followerId: decoded,
    followingId: followingId,
  }).lean();

  if (check !== null) {
    return res.status(200).json({
      isSuccess: false,
      code: "RELATIONSHIP_EXISTS",
      message: "Relationship already exists.",
      meta: { status: check?.status },
    });
  }

  const accountCheck = await UserModel.findById(followingId).select(
    "-_id accountVisibility",
  );

  if (accountCheck.accountVisibility === "public") {
    const createRequest = await FollowModel.create({
      followerId: decoded,
      followingId: followingId,
      status: "followed",
    });

    if (createRequest) {
      const updateFollowersCount = await UserModel.findByIdAndUpdate(
        createRequest?.followingId,
        { $inc: { followersCount: 1 } },
      );

      if (updateFollowersCount) {
        const updateFollowingCount = await UserModel.findByIdAndUpdate(
          createRequest?.followerId,
          { $inc: { followingCount: 1 } },
        );
      }
    }

    return res.status(200).json({
      isSuccess: true,
      code: "FOLLOWED",
      message: "Relationship established.",
      meta: { status: "followed" },
    });
  }

  const createPrivateRequest = await FollowModel.create({
    followerId: decoded,
    followingId: followingId,
    status: "requested",
  });

  return res.status(200).json({
    isSuccess: true,
    code: "REQUESTED_TO_FOLLOW",
    message: "Requested to follow.",
    meta: { status: "requested" },
  });
});

export default { handleFollow };
