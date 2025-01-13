import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(1, {
    message: "Password must be at least 6 characters long",
  }),
  address: z.string({ required_error: "Please enter your address" }),
  phone: z.coerce
    .number({
      invalid_type_error: "Phone number must be in number",
      required_error: "Phone number is required",
    })
    .min(11, { message: "Phone number must have 11 digits" }),
});
