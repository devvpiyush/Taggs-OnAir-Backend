// Exernal Modules
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load Enviornment Variables
dotenv.config();

export const transportMail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

export const sendEmailOtp = async (email, OTP) => {
  const mail = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your OTP for Email Verification`,
    html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Your OTP Code</h2>
          <p style="font-size: 24px; font-weight: bold;">${OTP}</p>
          <p>This OTP is valid for 15 minutes.</p>
        </div>
      `,
  };

  await transportMail.sendMail(mail);

  return {
    isSuccess: true,
    code: "OTP_SENT",
    message: "OTP Sent Successfully!",
  };
};
