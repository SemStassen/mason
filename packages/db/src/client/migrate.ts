import type { PGlite } from "@electric-sql/pglite";
import m1 from "./migrations/0000_client.sql?raw";

async function migrate(pg: PGlite) {
  // Check if there are any tables already in the DB
  // This logic has to become more rigid later
  const tables = await pg.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`,
  );
  if (tables.rows.length === 0) {
    await pg.exec(m1);
  }
}

export { migrate };
