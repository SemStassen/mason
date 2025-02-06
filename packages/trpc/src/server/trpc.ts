import { serverEnv } from "@mason/env";
import { TRPCError, initTRPC } from "@trpc/server";
import type { createContext } from "./context";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createContext>().create({
  //   transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    if (serverEnv.MODE === "development") {
      console.error("TRPC Error:", {
        message: error.message,
        code: error.code,
        path: shape.data.path,
        type: shape.data?.code,
      });
    }
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure.use(
  // LOGGING
  async (opts) => {
    const result = await opts.next();

    if (serverEnv.MODE === "development") {
      console.log(`--- Status: ${result.ok ? "succes" : "failure"} ---`);
      console.log(`--- Context: ${opts.ctx} ---`);
      console.log(`--- Path: ${opts.path}, Type: ${opts.type} ---`);
    }

    return result;
  },
);
export const authenticatedProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      session: ctx.session,
    },
  });
});
