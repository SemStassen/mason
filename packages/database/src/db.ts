import { type PgliteDatabase, drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

const db = drizzle({
  connection: {
    database: "mason",
  },
  schema: schema,
});

export type Client = PgliteDatabase<typeof schema>;
export { db };
