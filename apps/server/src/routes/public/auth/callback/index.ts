import { createServerClient } from "@mason/db/server/supabase-client";
import { Hono } from "hono";
import { MasonApiError } from "../../../../libs/errors";

export const callbackApi = new Hono();

callbackApi.get("/", async (c) => {
  const code = c.req.query("code");

  if (!code) {
    throw new MasonApiError({
      code: "BAD_REQUEST",
      message: "Missing code parameter.",
    });
  }

  const supabase = createServerClient(c.req, c.res);

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    throw new MasonApiError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to exchange code for session.",
    });
  }

  return c.redirect("/");
});
