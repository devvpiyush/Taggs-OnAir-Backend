// Local Modules
import UserModel from "../models/user.model.js";
import PostModel from "../models/post.model.js";

export const findCreator = async (creatorId) => {
  try {
    const creator = await UserModel.findById(creatorId)
      .select("username name profilePictureUrl accountStatus isVerified")
      .lean();

    return creator;
  } catch (err) {
    return err;
  }
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
  try {
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

    if (
      await UserModel.findOneAndUpdate(
        { _id: creatorId },
        { $inc: { threadsCount: 1 } },
      )
    ) {
      return;
    }
  } catch (err) {
    return err;
  }
};

export const fetchFeed = async (maxAmount, userId) => {
  try {
    const results = await PostModel.find({
      isDeleted: false,
      "creator.creatorAccountStatus": "active",
      "creator.creatorId": { $ne: userId },
    })
      .sort({ score: -1, createdAt: -1 })
      .limit(maxAmount)
      .select(
        "caption type creator viewsCount likesCount commentsCount createdAt",
      )
      .lean();

    return results;
  } catch (err) {
    return err;
  }
};
