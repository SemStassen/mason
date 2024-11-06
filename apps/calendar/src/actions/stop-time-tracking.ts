"use server";

import { stopTimeTracking } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { stopTimeTrackingSchema } from "./schema";

export const stopTimeTrackingAction = authActionClient
  .schema(stopTimeTrackingSchema)
  .metadata({
    name: "stop-time-tracking",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await stopTimeTracking(supabase, data.uuid, {
      stopped_at: data.stoppedAt,
    });

    revalidateTag(`time_entries_${user.uuid}`);
  });
