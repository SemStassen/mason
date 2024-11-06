"use server";

import { updateTimeEntry } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { updateTimeEntrySchema } from "./schema";

export const updateTimeEntryAction = authActionClient
  .schema(updateTimeEntrySchema)
  .metadata({
    name: "update-time-entry",
  })
  .action(
    async ({ parsedInput: { uuid, ...data }, ctx: { user, supabase } }) => {
      await updateTimeEntry(supabase, uuid, {
        project_uuid: data.projectUuid,
        started_at: data.startedAt,
        stopped_at: data.stoppedAt,
        note: data.note,
      });

      revalidateTag(`time_entries_${user.uuid}`);
    },
  );
