import { z } from "zod";

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
export const updateUserSchema = z.object({
  first_name: z.string().min(2).max(32),
  last_name: z.string().min(2).max(32).optional(),
});
