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
    postedBy: { type: mongoose.Types.ObjectId, required: true },
    caption: { type: String, trim: true, default: "", maxlength: 850 },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    savesCount: { type: Number, default: 0 },
    sharesCount: { type: Number, default: 0 },
    reportsCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Post", PostSchema);
