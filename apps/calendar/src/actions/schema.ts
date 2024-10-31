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
});

export type CreateOrUpdateTimeEntrySchemaType = z.input<
  typeof createOrUpdateTimeEntrySchema
>;
export const createOrUpdateTimeEntrySchema = z
  .object({
    uuid: z.string(),
    projectUuid: z.string(),
    startedAt: z.string().datetime({ offset: true }),
    stoppedAt: z.string().datetime({ offset: true }),
    note: z.string(),
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
