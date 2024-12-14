import { startTimeTracking } from "@mason/supabase/mutations";
import { z } from "zod";
import { authenticatedProcedure, router } from "../trpc";

const currentlyTrackingTimeEntryRouter = router({
  get: authenticatedProcedure
    .input(
      z.object({
        projectUuid: z.string(),
        startedAt: z.string().datetime(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { supabase, session } = ctx;

      startTimeTracking(supabase, {
        project_uuid: input.projectUuid,
        started_at: input.startedAt,
      });
    }),
});

export { currentlyTrackingTimeEntryRouter };
