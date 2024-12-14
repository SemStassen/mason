import { z } from "zod";

export const patchUserSchema = z.object({ username: z.string().optional() });
export const patchUserPreferencesSchema = z.object({
  weekStartsOnMonday: z.boolean().optional(),
  uses24HourClock: z.boolean().optional(),
});

export const patchTimeEntrySchema = z
  .object({
    uuid: z.string(),
    projectUuid: z.string(),
    startedAt: z.string().datetime({ offset: true }),
    stoppedAt: z.string().datetime({ offset: true }),
    note: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (new Date(val.startedAt) > new Date(val.stoppedAt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time can't be before start time",
        path: ["stoppedAt"],
      });
    }
  });
