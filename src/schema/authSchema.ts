import { z } from "zod";

export const createUserValidationSchema = z.object({
  name: z.string({ required_error: "Please Provide a valid name" }),
  image: z.string().optional(),
  email: z.string({ required_error: "Please Provide a valid email" }).email(),
  password: z
    .string({ required_error: "Password must be contain 6 Character" })
    .min(6),
  phone: z
    .string({ required_error: "Please Provide a valid phone number" })
    .min(10),
  address: z.string({ required_error: "Please Provide a valid address" }),
});
