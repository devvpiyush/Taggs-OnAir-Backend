// External Modules
import mongoose from "mongoose";

const FollowSchema = mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["requested", "followed"],
    },
  },
  { timestamps: true },
);

// Indexing
FollowSchema.index({ followerId: 1, followingId: 1 });

export default mongoose.model("Follow", FollowSchema);
