import type { SupabaseClient } from "@mason/db/server/supabase-client";
import type { Session } from "@mason/db/server/types";
import { Hono } from "hono";
import type { RequestIdVariables } from "hono/request-id";
import { authMiddleware } from "../../libs/middlewares/auth";
import { gatekeeperApi } from "./gatekeeper";
import { userPreferencesApi } from "./user-preferences";

export type Env = {
  Variables: RequestIdVariables & {
    session: Session;
    supabase: SupabaseClient;
  };
};

export const v1Api = new Hono<Env>();

/**
 * Middlewares
 */
v1Api.use(authMiddleware);

v1Api.route("/gatekeeper", gatekeeperApi);
v1Api.route("/user-preferences", userPreferencesApi);
