import { z } from "zod";

const createUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  photo: z.string().url().optional(),
  emailVerified: z.boolean(),
  verificationCode: z.string().nullable(),
  verificationCodeExpires: z.date().nullable(),
  role: z.enum(["super_admin", "admin", "user"]),
  needsPasswordChange: z.boolean(),
  passwordChangedAt: z.date(),
});

export const UserValidation = {
  createUser,
};
