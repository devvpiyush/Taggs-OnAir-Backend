// External Modules
import bcrypt from "bcrypt";

// Local Modules
import OTPModel from "../models/otp.model.js";
import catchAsync from "../utils/catchAsync.util.js";

export const generateOTP = (length = 4) => {
  let OTP = "";

  for (let i = 0; i < length; i++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
};

export const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

export const verifyOTP = async (otp, hash) => {
  return await bcrypt.compare(otp, hash);
};

export const saveOTP = catchAsync(async (purpose, email, otp) => {
  const res = await OTPModel.create({
    email,
    otp,
    purpose,
  });
  return res;
});
