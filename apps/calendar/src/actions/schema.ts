import { z } from "zod";

export type UpdateUserSchemaType = z.input<typeof updateUserSchema>;
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Must be atleast 3 characters long",
    })
    .max(32, {
      message: "Maximum of 32 characters allowed",
    }),
});

export type UpdateUserPreferencesSchemaType = z.input<
  typeof updateUserPreferencesSchema
>;
export const updateUserPreferencesSchema = z.object({
  weekStartsOnMonday: z.boolean(),
  uses24HourClock: z.boolean(),
});

export type UpdateTimeEntrySchemaType = z.input<typeof updateTimeEntrySchema>;
export const updateTimeEntrySchema = z
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

export type StartTimeTrackingSchemaType = z.input<
  typeof startTimeTrackingSchema
>;
export const startTimeTrackingSchema = z.object({
  projectUuid: z.string(),
  startedAt: z.string().datetime({ offset: true }),
});

export const stopTimeTrackingSchema = z.object({
  uuid: z.string(),
  stoppedAt: z.string().datetime({ offset: true }),
});
