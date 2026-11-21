import { z } from "zod";
import {getTodayLocal} from "../functions/getDate"

export const QuestSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(60, "Title cannot exceed 60 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description cannot exceed 300 characters"),
  category: z.enum(
    ["exploration", "combat", "adventure", "study"],
    "Invalid category",
  ),
  difficulty: z.enum(["easy", "medium", "hard", "epic"], "Invalid difficulty"),
  deadline: z.string().refine((value)=>{
    if(!value) return true
    return value >= getTodayLocal()
  },"Deadline can't be a date before today"),
});

export type QuestFormFields = z.infer<typeof QuestSchema>;
