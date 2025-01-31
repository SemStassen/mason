import type { Session } from "@mason/db/server/types";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { authMiddleware } from "../../libs/middlewares/auth";

type Env = {
  Variables: {
    session: Session | null;
  };
};

export const api = new Hono<Env>();

/**
 * Middlewares
 */

api.use("/*", authMiddleware);

api.patch("/user-preferences", async (c) => {});
