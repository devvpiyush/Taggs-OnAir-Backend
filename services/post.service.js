// Local Modules
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";

export const findCreator = async (creatorId) => {
  const creator = await UserModel.findById(creatorId)
    .select("username name profilePictureUrl accountStatus isVerified")
    .lean();

  return creator;
};

export const createThread = async (
  caption,
  creatorId,
  creatorUsername,
  creatorName,
  creatorProfilePictureUrl,
  creatorAccountStatus,
  isCreatorVerified,
) => {
  await PostModel.create({
    caption,
    creator: {
      creatorId,
      creatorUsername,
      creatorName,
      creatorProfilePictureUrl,
      creatorAccountStatus,
      isCreatorVerified,
    },
  });

  return;
};

export const fetchFeed = async (maxAmount, userId) => {
  const results = await PostModel.find({
    isDeleted: false,
    "creator.creatorAccountStatus": "active",
   "creator.creatorId": { $ne: userId},
  })
    .sort({ score: -1, createdAt: -1 })
    .limit(maxAmount)
    .select(
      "caption type creator viewsCount likesCount commentsCount createdAt",
    )
    .lean();

  return results;
};
