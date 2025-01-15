import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name" }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
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

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const AddServiceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Service Name must be less than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Service Description must be less than 500 characters" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  duration: z.coerce
    .number({ invalid_type_error: "Duration must be a number" })
    .positive({ message: "Duration must be greater than 0" }),
  isDeleted: z.boolean(),
});
