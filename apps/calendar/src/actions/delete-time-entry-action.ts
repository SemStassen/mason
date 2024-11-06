"use server";

import { deleteTimeEntry } from "@mason/supabase/mutations";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { authActionClient } from "./safe-action";

export const deleteTimeEntryAction = authActionClient
  .schema(
    z.object({
      uuid: z.string(),
    }),
  )
  .metadata({
    name: "update-time-entry",
  })
  .action(async ({ parsedInput: data, ctx: { user, supabase } }) => {
    await deleteTimeEntry(supabase, data.uuid);

    revalidateTag(`time_entries_${user.uuid}`);
  });
