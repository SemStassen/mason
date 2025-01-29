import { env } from "@mason/env";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./base-schema";

const client = postgres(env.DATABASE_URL);
const db = drizzle(client, { schema });

export type Client = PostgresJsDatabase<typeof schema>;
export { db };
