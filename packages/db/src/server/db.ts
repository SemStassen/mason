import { serverEnv } from "@mason/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const client = postgres(serverEnv.PUBLIC_SUPABASE_URL, {
  prepare: false,
});
export const db = drizzle({ client: client, schema: schema });
