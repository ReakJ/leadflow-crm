import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["manager", "member"], {
    message: "Please select a valid role.",
  }),
});