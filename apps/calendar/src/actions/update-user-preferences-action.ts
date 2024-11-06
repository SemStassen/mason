"use server";

import { updateUserPreferences } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateUserPreferencesSchema } from "./schema";

export const updateUserPreferencesAction = authActionClient
  .schema(updateUserPreferencesSchema)
  .metadata({
    name: "update-user-preferences",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await updateUserPreferences(supabase, {
      week_starts_on_monday: data.weekStartsOnMonday,
      uses_24_hour_clock: data.uses24HourClock,
    });

    revalidateTag(`user_preferences_${user.uuid}`);
  });
