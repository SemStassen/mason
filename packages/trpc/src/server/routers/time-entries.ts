import { updateTimeEntry } from "@mason/supabase/mutations";
import { getTimeEntriesByRangeQuery } from "@mason/supabase/queries";
import { z } from "zod";
import { patchTimeEntrySchema } from "../../schema";
import { authenticatedProcedure, router } from "../trpc";

const timeEntriesRouter = router({
  get: authenticatedProcedure
    .input(
      z.object({
        from: z.string().datetime(),
        to: z.string().datetime(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { supabase, session } = ctx;

      const timeEntries = await getTimeEntriesByRangeQuery(supabase, {
        userUuid: session.user.id,
        from: input.from,
        to: input.to,
      });

      return timeEntries.data;
    }),
  patch: authenticatedProcedure
    .input(patchTimeEntrySchema)
    .mutation(async ({ ctx, input }) => {
      const { supabase, session } = ctx;

      await updateTimeEntry(supabase, input.uuid, {
        project_uuid: input.projectUuid,
        started_at: input.startedAt,
        stopped_at: input.stoppedAt,
        note: input.note,
      });
    }),
});

export { timeEntriesRouter };
