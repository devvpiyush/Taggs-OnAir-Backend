// External Modules
import { Resend } from "resend";
import dotenv from "dotenv";

// Loading Enviornment Variables
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
  try {
    const data = await resend.emails.send({
      from: "Taggs.in <noreply@taggs.in>",
      to,
      subject,
      html,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("EMAIL_SEND_FAILED");
  }
}