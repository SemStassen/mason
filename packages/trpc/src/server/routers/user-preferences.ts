import { updateUserPreferences } from "@mason/supabase/mutations";
import { getUserPreferencesQuery } from "@mason/supabase/queries";
import { patchUserPreferencesSchema } from "../../schema";
import { authenticatedProcedure, router } from "../trpc";

const userPreferencesRouter = router({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    const { supabase, session } = ctx;

    const userPreferences = await getUserPreferencesQuery(
      supabase,
      session.user.id,
    );

    return {
      weekStartsOnMonday: userPreferences.data?.weekStartsOnMonday,
      uses24HourClock: userPreferences.data?.uses24HourClock,
    };
  }),
  patch: authenticatedProcedure
    .input(patchUserPreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      const { supabase } = ctx;

      await updateUserPreferences(supabase, {
        week_starts_on_monday: input.weekStartsOnMonday,
        uses_24_hour_clock: input.uses24HourClock,
      });
    }),
});

export { userPreferencesRouter };
