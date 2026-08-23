import { z } from "zod";

const leadSources = [
  "Website",
  "Referral",
  "LinkedIn",
  "Facebook",
  "Instagram",
  "Cold Call",
  "Email Campaign",
  "Other",
];

export const createLeadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  email: z
    .email("Invalid email address."),
  
  phone: z
    .string()
    .trim()
    .optional(),

  company: z
    .string()
    .trim()
    .optional(),

source: z
  .string()
  .refine(
    (value) => leadSources.includes(value),
    "Please select a valid lead source."
  ),
})

export const updateLeadSchema = createLeadSchema;