import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { sendVerificationEmail } from "./sendEmail";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { generateEmailOTP } from "./user.utils";

const createUser = async (user: IUser): Promise<IUser> => {
  //set verify time
  user.verificationCodeExpires = new Date(Date.now() + 59 * 1000);
  // Generate OTP and set expiration
  user.verificationCode = await generateEmailOTP();

  const result = await User.create(user);

  // Send verification email to the user's email address
  sendVerificationEmail(result);

  await result.save();

  return result;
};

const verifyEmail = async (
  email: string,
  code: string
): Promise<IUser | null> => {
  console.log("insider service", email, code);
  const user = await User.findOne({ email });

  if (!user) {
    // throw new Error("user does not exists.");
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (user.verificationCode !== code) {
    throw new Error("Verification code does not match.");
  }
  if (user.verificationCodeExpires! < new Date()) {
    throw new Error("Verification code has expired.");
  }

  user.emailVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;

  await user.save();

  return user;
};

export const UserService = {
  createUser,
  verifyEmail,
};
