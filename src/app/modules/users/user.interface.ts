import { Model } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
  photo: string;
  emailVerified: boolean;
  verificationCode: string | null;
  verificationCodeExpires: Date | null;
  role: "super_admin" | "admin" | "user";
  needsPasswordChange: boolean;
  passwordChangedAt: Date;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<
    Pick<IUser, "email" | "password" | "role" | "needsPasswordChange">
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
};
