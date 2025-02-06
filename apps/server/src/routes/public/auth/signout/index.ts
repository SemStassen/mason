import { createServerClient } from "@mason/db/server/supabase-client";
import { Hono } from "hono";

export const signoutApi = new Hono();

signoutApi.get("/", async (c) => {
  const supabase = createServerClient(c.req, c.res);

  supabase.auth.signOut();

  c.redirect("/login");
});
