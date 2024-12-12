import { z } from "zod";

export const patchUserSchema = z.object({ username: z.string().optional() });
export const patchUserPreferencesSchema = z.object({
  weekStartsOnMonday: z.boolean().optional(),
  uses24HourClock: z.boolean().optional(),
});
