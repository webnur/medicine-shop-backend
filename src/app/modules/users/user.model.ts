import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email: string) {
        // Simple email validation regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    validate: {
      validator: function (password: string) {
        // Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        );
      },
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
    },
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
    // validate: {
    //   validator: function (photo: string) {
    //     // Ensure the photo is stored in a static directory
    //     return /^\/static\/images\/.*$/.test(photo);
    //   },
    //   message: "Photo must be stored in a static directory",
    // },
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    default: null,
  },
  verificationCodeExpires: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ["super_admin", "admin", "user"],
    default: "user",
  },
  needsPasswordChange: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: {
    type: Date,
    default: null,
  },
});

// exist user
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne(
    { email },
    { email: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

// // // user password matches
// UserSchema.statics.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

// UserSchema.methods.changedPasswordAfterJwtIssued = function (
//   jwtTimestamp: number
// ) {
//   console.log({ jwtTimestamp }, "hi");
// };

// // hashing passwords
// UserSchema.pre("save", async function (next) {
//   // hashing user password
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bycrypt_salt_rounds)
//   );

//   if (!user.needsPasswordChange) {
//     user.passwordChangedAt = new Date();
//   }

//   next();
// });

export const User = model<IUser, UserModel>("User", UserSchema);
