import {
  IdbFs,
  PGlite,
  type PGliteInterfaceExtensions,
} from "@electric-sql/pglite";
import { makePGliteProvider } from "@electric-sql/pglite-react";
import { electricSync } from "@electric-sql/pglite-sync";
import { live } from "@electric-sql/pglite/live";

const pg = await PGlite.create({
  fs: new IdbFs("mason"),
  extensions: {
    live: live,
    electric: electricSync(),
  },
});

const { PGliteProvider, usePGlite } = makePGliteProvider<
  PGlite &
    PGliteInterfaceExtensions<{
      live: typeof live;
    }>
>();

const MasonPGLiteProvider = ({ children }: { children: React.ReactNode }) => {
  return <PGliteProvider db={pg}>{children}</PGliteProvider>;
};

export { MasonPGLiteProvider, usePGlite };
