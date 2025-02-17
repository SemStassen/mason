import { zValidator } from "@hono/zod-validator";
import { db } from "@mason/db/server/db";
import { userPreferencesTable } from "@mason/db/server/schema";
import { Hono } from "hono";
import { z } from "zod";
import type { Env } from "..";

export const userPreferencesApi = new Hono<Env>();

userPreferencesApi.patch("/", async (c) => {
  const { session, supabase } = c.var;
  const updates = await c.req.json();

  console.log(updates);

  db.update(userPreferencesTable).set(updates);

  return c.json({});
});
