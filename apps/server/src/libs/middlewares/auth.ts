import { createServerClient } from "@mason/db/server/supabase-client";
import { createMiddleware } from "hono/factory";
import { MasonApiError } from "../errors";

export const authMiddleware = createMiddleware(async (context, next) => {
  const supabase = createServerClient(context.req, context.res);

  await supabase.auth.getUser();

  // Get the session token
  const {
    error,
    data: { session },
  } = await supabase.auth.getSession();

  // Check for errors
  // NOTE: Very important to throw here,
  // this is our main way of authenticating users!!!
  if (error) {
    throw new MasonApiError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
    });
  }

  context.set("session", session);
  context.set("supabase", supabase);

  await next();
});
