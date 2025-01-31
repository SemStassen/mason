import { createServerClient } from "@mason/db/server/supabase-client";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (context, next) => {
  const supabase = createServerClient(context.req, context.res);

  await supabase.auth.getUser();

  // Get the session token
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
  }

  context.set("session", session);

  await next();
});
