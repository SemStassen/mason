"use server";

import { updateTimeEntry, updateUser } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { createOrUpdateTimeEntrySchema } from "./schema";

export const updateTimeEntryAction = authActionClient
  .schema(createOrUpdateTimeEntrySchema)
  .metadata({
    name: "update-time-entry",
  })
  .action(
    async ({ parsedInput: { uuid, ...data }, ctx: { user, supabase } }) => {
      console.log(data);
      await updateTimeEntry(supabase, uuid, {
        project_uuid: data.projectUuid,
        started_at: data.startedAt,
        stopped_at: data.stoppedAt,
        note: data.note,
      });

      revalidateTag(`time_entries_${user.uuid}`);
    },
  );
