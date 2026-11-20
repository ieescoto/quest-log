import { z } from "zod";

export const ProfileSchema = z.object({
  username: z.string().min(1, "Username is required").max(10, "Username must be at most 10 characters"),
  avatar: z.enum(["🧙", "🛡️", "🏹", "🧝", "🐉"]).optional()
});

export type ProfileFormFields = z.infer<typeof ProfileSchema>;