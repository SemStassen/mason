import { updateUser } from "@mason/supabase/mutations";
import { getUserQuery } from "@mason/supabase/queries";
import { patchUserSchema } from "../../schema";
import { authenticatedProcedure, router } from "../trpc";

const userRouter = router({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    const { supabase, session } = ctx;

    const user = await getUserQuery(supabase, session.user.id);

    return {
      username: user.data?.username,
      email: user.data?.email,
    };
  }),
  patch: authenticatedProcedure
    .input(patchUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { supabase } = ctx;

      await updateUser(supabase, {
        username: input.username,
      });
    }),
});

export { userRouter };
