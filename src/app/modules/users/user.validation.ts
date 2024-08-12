// import crypto from "crypto";
// import { IUser } from "./user.interface";

// export const generateVerificationCode = (user: IUser) => {
//   const verificationCode = crypto.randomBytes(3).toString("hex"); // 6-digit hex code
//   user.verificationCode = verificationCode;
//   user.verificationCodeExpires = new Date(Date.now() + 59 * 1000); // 59 seconds from now
// };
