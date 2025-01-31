import { IdbFs, PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { migrate } from "./migrate";

// We don't need to extenstions here, because this instance is only used for the migration
// It is extended in db.tsx
// Also see: https://pglite.dev/docs/multi-tab-worker
worker({
  async init() {
    const pg = await PGlite.create({
      fs: new IdbFs("mason"),
      relaxedDurability: true,
    });
    // Migrate the database to the latest schema
    await migrate(pg);
    return pg;
  },
});
