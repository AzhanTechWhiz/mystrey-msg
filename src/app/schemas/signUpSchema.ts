import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(6, "username must be at least 6 characters")
  .max(20, "username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "username not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email address" }),
  password: z.string().min(6, "password must be at least 6 characters"),
});
