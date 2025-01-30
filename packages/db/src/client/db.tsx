import { IdbFs, PGlite } from "@electric-sql/pglite";
import { makePGliteProvider } from "@electric-sql/pglite-react";
import { type SyncNamespaceObj, electricSync } from "@electric-sql/pglite-sync";
import { type LiveNamespace, live } from "@electric-sql/pglite/live";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "./migrate";
import * as schema from "./schema";

export type PG = PGlite & {
  live: LiveNamespace;
  sync: SyncNamespaceObj;
};

const pg: PG = await PGlite.create({
  fs: new IdbFs(),
  //   fs: new MemoryFS(),
  extensions: {
    live: live,
    sync: electricSync({
      // debug: env.MODE === "development",
    }),
  },
});

await migrate(pg);

const { PGliteProvider, usePGlite } = makePGliteProvider<PG>();

export { usePGlite };

export const MasonPGliteProvider = ({
  children,
}: { children: React.ReactNode }) => {
  return <PGliteProvider db={pg}>{children}</PGliteProvider>;
};

export const db = drizzle(pg, { schema: schema });
