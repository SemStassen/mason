import { TRPCError } from "@trpc/server";
import { authenticatedProcedure, publicProcedure, router } from "../trpc";

const authRouter = router({
  callback: publicProcedure.query(async ({ ctx }) => {
    const { req, res, supabase } = ctx;

    // Get code from request
    const code = req.query.code as string;

    if (!code) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
    }

    // ! Very hacky way to redirect using TRPC. Do not try to do this!
    res.setHeader("Location", "/");
    res.statusCode = 302;
  }),
  signOut: authenticatedProcedure.query(async ({ ctx }) => {
    const { supabase } = ctx;

    supabase.auth.signOut();
  }),
});

export { authRouter };
