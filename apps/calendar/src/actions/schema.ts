import { z } from "zod";

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
export const updateUserSchema = z.object({
  username: z.string().min(1).max(32),
});
