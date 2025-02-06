import { PGliteProvider } from "@electric-sql/pglite-react";
import { type SyncNamespaceObj, electricSync } from "@electric-sql/pglite-sync";
import { type LiveNamespace, live } from "@electric-sql/pglite/live";
import { PGliteWorker } from "@electric-sql/pglite/worker";
import { drizzle } from "drizzle-orm/pglite";
import PGWorker from "./pglite-worker.js?worker";
import * as schema from "./schema";
import { startSync } from "./sync";

// NOTE: I would prefer using makePGliteProvider here. However that does not seem to properly pass the pg instance to the context.
// The context import works fine however

export type PGliteWithExtenstions = PGliteWorker & {
  live: LiveNamespace;
  sync: SyncNamespaceObj;
};

export const pg = await PGliteWorker.create(new PGWorker(), {
  extensions: {
    live,
    sync: electricSync(),
  },
});

// await startSync(pg);

// Note: There is a type-error because this is a PGlite-worker instead of a normal PGlite instance
export const db = drizzle({ client: pg, schema: schema });

export const MasonPGliteProvider = ({
  children,
}: { children: React.ReactNode }) => {
  return <PGliteProvider db={pg}>{children}</PGliteProvider>;
};
