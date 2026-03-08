// External Modules
import mongoose from "mongoose";

const OTP_Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 254,
    },
    otp: { type: String, required: true, index: true },
    purpose: {
      type: String,
      enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET"],
      default: "EMAIL_VERIFICATION",
    },
    attemptsYet: { type: Number, default: 0 },
    expiresAt: {
      type: Date,
      required: true,
      index: { expire: 0 },
      default: new Date(Date.now() + 15 * 60 * 1000),
    },
  },
  { timestamps: true },
);

export default mongoose.model("OTP", OTP_Schema);
