// External Modules
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 21,
    },
    name: { type: String, trim: true, default: "", maxlength: 30 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 254,
    },
    password: { type: String, required: true, select: false },
    bio: { type: String, trim: true, default: "", maxlength: 160 },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "other"],
    },
    profilePictureUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dtgta9nbo/image/upload/v1771600413/Type_Icon_Size_XS_Online_Indicator_None_v8znol.svg",
    },
    accountVisibility: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
    accountType: { type: String, enum: ["Personal"], default: "Personal" },
    identity: { type: String, enum: ["Normal"], default: "Normal" },
    accountStatus: {
      type: String,
      enum: ["Active", "Suspended", "Deleted"],
      default: "Active",
    },
    lastSeen: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
