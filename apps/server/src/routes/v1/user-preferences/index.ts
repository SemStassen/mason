import { Hono } from "hono";
import type { Env } from "..";

export const userPreferencesApi = new Hono<Env>();

userPreferencesApi.patch("/", async (c) => {
  const { session, supabase } = c.var;
  const updates = await c.req.json();

  return c.json({});
});
