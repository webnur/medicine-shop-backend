import nodemailer from "nodemailer";
import config from "../../../config";
import { IUser } from "../users/user.interface";

// Assuming the IUser interface is in models/User.ts

// Configure the transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: config.email,
    pass: config.appPass,
  },
});

export const sendVerificationEmail = async (user: IUser) => {
  console.log("userData", user);
  console.log("sendVerificationEmail", user.verificationCode);

  const verificationUrl = `${config.resetlink}code=${user.verificationCode}&email=${user.email}`;

  const mailOptions = {
    from: config.email,
    to: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    html: `<h2>Code: ${user.verificationCode}</h2><p>Please verify your email by clicking the following link:</p><p><a href="${verificationUrl}">${verificationUrl}</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// export async function sendEmail(to: string, html: string) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       user: config.email,
//       pass: config.appPass,
//     },
//   });

//   await transporter.sendMail({
//     from: config.email, // sender address
//     to, // list of receivers
//     subject: "Reset Password Link", // Subject line
//     html, // html body
//   });
// }
