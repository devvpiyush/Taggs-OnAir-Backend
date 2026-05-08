// External Modules
import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    type: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["thread", "post"],
      default: "thread",
    },
    creator: {
      creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      creatorUsername: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minlength: 3,
        maxlength: 21,
      },
      creatorName: { type: String, trim: true, required: true, maxlength: 30 },
      creatorProfilePictureUrl: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/dtgta9nbo/image/upload/v1775106730/No_Profile_Picture_Icon_Tiktok_snc7gr.jpg",
      },
      isCreatorVerified: { type: Boolean, default: false },
      creatorAccountStatus: {
        type: String,
        lowercase: true,
        enum: ["active", "suspended", "deleted"],
        default: "active",
      },
    },
    caption: { type: String, trim: true, default: "", maxlength: 1850 },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    savesCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    reportsCount: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Indexes
PostSchema.index({ score: -1 });

// Virtuals
// PostSchema.virtual("score").get(function () {
//   const views = Math.max(this.viewsCount, 1);

//   const likeRate = this.likesCount / views;
//   const commentRate = this.commentsCount / views;
//   const saveRate = this.savesCount / views;
//   const shareRate = this.sharesCount / views;
//   const reportRate = this.reportsCount / views;

//   const score =
//     0.1 * likeRate +
//     0.25 * commentRate +
//     0.25 * saveRate +
//     0.3 * shareRate -
//     0.2 * reportRate;

//   return Math.max(0, Math.min(1, score));
// });

export default mongoose.model("Post", PostSchema);
