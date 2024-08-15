import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelper";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { User } from "../users/user.model";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // If user does not exist or password is incorrect
  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user does not exist");
  }

  // checking verify user
  if (isUserExist.emailVerified === false) {
    throw new ApiError(httpStatus.NOT_FOUND, "please verify your email");
  }
  // Check if user exists and password is correct
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password mismatch");
  }

  // If user exists and password is correct, return the user object with the token and refresh token

  const { email: userEmail, role, needsPasswordChange } = isUserExist;
  // TODO: generate token and refresh token here
  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // refresh token
  const refreshToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const getSingleUser = async (email: string) => {
  console.log("service email");
  const user = await User.isUserExist(email);
  //   const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

export const AuthService = {
  loginUser,
  getSingleUser,
};
