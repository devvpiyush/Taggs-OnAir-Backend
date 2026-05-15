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
        "https://res.cloudinary.com/dtgta9nbo/image/upload/v1775106730/No_Profile_Picture_Icon_Tiktok_snc7gr.jpg",
    },
    accountVisibility: {
      type: String,
      lowercase: true,
      enum: ["private", "public"],
      default: "public",
    },
    accountType: {
      type: String,
      lowercase: true,
      enum: ["personal"],
      default: "personal",
    },
    identity: {
      type: String,
      lowercase: true,
      enum: ["normal"],
      default: "normal",
    },
    accountStatus: {
      type: String,
      lowercase: true,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastActiveAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    threadsCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Virtuals
UserSchema.virtual("age").get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
});

export default mongoose.model("User", UserSchema);
