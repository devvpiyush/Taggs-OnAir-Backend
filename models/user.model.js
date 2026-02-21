// External Modules
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 21,
    },
    name: { type: String, trim: true, default: "", maxLength: 30 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 254,
    },
    password: { type: String, required: true, select: false },
    bio: { type: String, trim: true, default: "", maxLength: 160 },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
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
    lastSeen: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model(UserSchema, "User");
