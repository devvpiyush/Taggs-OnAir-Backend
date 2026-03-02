// Local Modules
import otpModel from "../models/otp.model.js";
import UserModel from "../models/user.model.js";
import { sendEmailOtp } from "../services/mail.service.js";
import { createOTP, hashOTP, saveOTP } from "../utils/otp.util.js";

export const checkUsername = async (req, res, next) => {
  try {
    const result = await UserModel.findOne({ username: req.body.username });

    if (result) {
      return res.status(200).json({
        isSuccess: false,
        signal: "YELLOW",
        code: "USERNAME_UNAVAILABLE",
        message: "Username is Unavailable.",
        meta: { username: req.body.username },
      });
    }

    return res.status(200).json({
      isSuccess: true,
      signal: "GREEN",
      code: "USERNAME_AVAILABLE",
      message: "Username is Available.",
      meta: { username: req.body.username },
    });
  } catch (error) {
    throw Error(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const email = req.body.email;
  try {
    const mongoFind = await UserModel.findOne({ email }).lean();

    if (mongoFind) {
      return res.status(200).json({
        isSuccess: false,
        signal: "YELLOW",
        code: "EMAIL_EXISTS",
        message: "Email already exists.",
        meta: { email },
      });
    }

    const mongoDelete = await otpModel.deleteMany({
      email,
      purpose: "EMAIL_VERIFICATION",
    });
    console.log(mongoDelete);

    const OTP = createOTP();

    const OTP_HASH = await hashOTP(OTP);

    await saveOTP("EMAIL_VERIFICATION", email, OTP_HASH);

    await sendEmailOtp(email, OTP);

    return res.status(200).json({
      isSuccess: true,
      signal: "GREEN",
      code: "OTP_SENT",
      message: "OTP sent to the email.",
      meta: { email },
    });
  } catch (error) {
    console.log(error);
  }
};
