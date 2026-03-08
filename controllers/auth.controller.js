// External Modules
import jwt from "jsonwebtoken";

// Local Modules
import { OTP as OTP_Template } from "../templates/email.js";
import catchAsync from "../utils/catchAsync.util.js";

import { generateToken } from "../utils/jwt.util.js";
import { generateOTP, hashOTP, saveOTP, verifyOTP } from "../utils/otp.util.js";
import { sendEmail } from "../services/email.service.js";

import TemporaryUserModel from "../models/temporary_user.model.js";
import userModel from "../models/user.model.js";
import otpModel from "../models/otp.model.js";

export const onBoard = catchAsync(async (req, res, next) => {
  if (!req.cookies.TempAuthToken) {
    return res.status(200).json({
      isSuccess: true,
      code: "TEMPORARY_AUTH_TOKEN_NOT_FOUND",
      message: "Cannot found Temporary Auth Token.",
    });
  }

  const decoded = jwt.verify(req.cookies.TempAuthToken, process.env.JWT_SECRET);

  const mongoData = await TemporaryUserModel.findOne({
    _id: decoded._id,
  })
    .select("username email name dateOfBirth")
    .lean();

  return res.status(200).json({
    isSuccess: true,
    code: "TEMPORARY_AUTH_TOKEN_FOUND",
    message: "Temporary Auth Token Found.",
    meta: {
      username: mongoData.username,
      email: mongoData.email,
      name: mongoData.name,
      dateOfBirth: mongoData.dateOfBirth,
    },
  });
});

export const createTemporaryUser = catchAsync(async (req, res, next) => {
  const username = req.body.username;

  await TemporaryUserModel.deleteMany({ username }).lean();

  const mongoSave = await TemporaryUserModel.create({
    username,
  });

  const TempAuthToken = generateToken(mongoSave._id, 15);

  res.cookie("TempAuthToken", TempAuthToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 15, // 15 Minutes
  });

  return res.status(200).json({
    isSuccess: true,
    code: "TEMPORARY_USER_CREATED",
    message: "Temporary User is Created.",
    meta: { username: mongoSave?.username },
  });
});

export const saveTempEmail = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const decoded = jwt.verify(req.cookies.TempAuthToken, process.env.JWT_SECRET);

  // Check if any other email exists
  const mongoFind = await userModel.findOne({ email }).lean();
  if (mongoFind) {
    return res.status(200).json({
      isSuccess: false,
      code: "EMAIL_EXISTS",
      message: "Email already exists.",
      meta: { email },
    });
  }

  // Delete all Previous OTPs
  await otpModel.deleteMany({
    email,
    purpose: "EMAIL_VERIFICATION",
  });

  const OTP = generateOTP();

  const OTP_HASH = await hashOTP(OTP);

  await saveOTP("EMAIL_VERIFICATION", email, OTP_HASH);

  await sendEmail({
    to: email,
    subject: "Your Taggs OTP",
    html: OTP_Template(OTP),
  });

  // Update Temporary User's email
  await TemporaryUserModel.updateOne({ _id: decoded._id }, { email });

  return res.status(200).json({
    isSuccess: true,
    code: "OTP_SENT",
    message: "OTP sent successfully!",
    meta: { email },
  });
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  const OTP = req.body.otp;
  const decoded = jwt.verify(req.cookies.TempAuthToken, process.env.JWT_SECRET);

  const mongod = await TemporaryUserModel.findOne({ _id: decoded._id }).lean();

  const mongo = await otpModel.findOne({ email: mongod.email }).lean();

  if (mongo.attemptsYet > 4) {
    return res.status(429).json({
      isSuccess: false,
      code: "OTP_ATTEMPTS_EXCEED",
      message: "OTP Attempts are Exceeded.",
    });
  }

  const verify = await verifyOTP(OTP, mongo.otp);

  if (!verify) {
    await otpModel
      .updateOne({ email: mongod?.email }, { $inc: { attemptsYet: 1 } })
      .lean();
    return res.status(200).json({
      isSuccess: false,
      code: "INVALID_OTP",
      message: "OTP is Invalid.",
    });
  }

  return res.status(200).json({
    isSuccess: true,
    code: "OTP_VERIFIED",
    message: "OTP is Verified Successfully.",
  });
});

export const resend = catchAsync(async (req, res, next) => {
  const decoded = jwt.verify(req.cookies.TempAuthToken, process.env.JWT_SECRET);

  const mongod = await TemporaryUserModel.findOne({ _id: decoded._id }).lean();

  // Delete all Previous OTPs
  await otpModel.deleteMany({
    email: mongod.email,
    purpose: "EMAIL_VERIFICATION",
  });

  const OTP = generateOTP();

  const OTP_HASH = await hashOTP(OTP);

  await saveOTP("EMAIL_VERIFICATION", mongod.email, OTP_HASH);

  await sendEmail({
    to: mongod.email,
    subject: "Your OTP for Verification!",
    html: OTP_Template(OTP),
  });

  return res.status(200).json({
    isSuccess: true,
    code: "OTP_RESENT",
    message: "OTP resent successfully!",
    meta: { email: mongod.email },
  });
});
