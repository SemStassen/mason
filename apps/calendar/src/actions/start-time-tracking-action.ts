"use server";

import { startTimeTracking } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { startTimeTrackingSchema } from "./schema";

export const startTimeTrackingAction = authActionClient
  .schema(startTimeTrackingSchema)
  .metadata({
    name: "start-time-tracking",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await startTimeTracking(supabase, {
      project_uuid: data.projectUuid,
      started_at: data.startedAt,
    });

    revalidateTag(`time_entries_${user.uuid}`);
  });
