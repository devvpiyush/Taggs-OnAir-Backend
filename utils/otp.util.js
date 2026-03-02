// External Modules
import bcrypt from "bcrypt";

// Local Modules
import OTPModel from "../models/otp.model.js";

export const createOTP = (length = 6) => {
  let OTP = "";

  for (let i = 0; i < length; i++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
};

export const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 10);
};

export const saveOTP = async (purpose, email, otp) => {
  try {
    const res = await OTPModel.create({
      email,
      otp,
      purpose,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
