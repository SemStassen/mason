import { clientEnv } from "@mason/env";
import type { PGliteWithExtenstions } from "./db";

const ELECTRIC_URL = `${clientEnv.PUBLIC_ELECTRIC_URL}/v1/shape`;

async function startSync(pg: PGliteWithExtenstions) {
  const meConfig = await fetch(
    "http://localhost:8002/api/v1/gatekeeper/me",
  ).then((res) => res.json());

  await pg.sync.syncShapeToTable({
    ...meConfig,
    table: "users",
    primaryKey: ["uuid"],
    shapeKey: "users",
    commitGranularity: "up-to-date",
    useCopy: true,
  });

  await pg.sync.syncShapeToTable({
    shape: {
      url: ELECTRIC_URL,
      params: {
        table: "user_preferences",
      },
    },
    table: "user_preferences",
    primaryKey: ["uuid"],
    shapeKey: "user_preferences",
    commitGranularity: "up-to-date",
    useCopy: true,
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: ELECTRIC_URL,
      params: {
        table: "projects",
      },
    },
    table: "projects",
    primaryKey: ["uuid"],
    shapeKey: "projects",
    commitGranularity: "up-to-date",
    useCopy: true,
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: ELECTRIC_URL,
      params: {
        table: "users_to_projects",
      },
    },
    table: "users_to_projects",
    primaryKey: ["uuid"],
    shapeKey: "users_to_projects",
    commitGranularity: "up-to-date",
    useCopy: true,
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: ELECTRIC_URL,
      params: {
        table: "time_entries",
      },
    },
    table: "time_entries",
    primaryKey: ["uuid"],
    shapeKey: "time_entries",
    commitGranularity: "up-to-date",
    useCopy: true,
  });
}

export { startSync };
