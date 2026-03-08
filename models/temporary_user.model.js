// External Modules
import mongoose from "mongoose";

const TemporaryUser = mongoose.Schema(
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
    name: { type: String, default: "" },
    dateOfBirth: { type: Date, default: Date.now() },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Indexes
TemporaryUser.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

export default mongoose.model("Temporary_User", TemporaryUser);
