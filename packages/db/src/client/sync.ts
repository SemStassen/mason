import { env } from "@mason/env";
import type { PGliteWithExtenstions } from "./db";

async function startSync(pg: PGliteWithExtenstions) {
  const ELECTRIC_URL = `${env.PUBLIC_ELECTRIC_URL}/v1/shape`;

  await pg.sync.syncShapeToTable({
    shape: {
      url: ELECTRIC_URL,
      params: {
        table: "users",
      },
    },
    table: "users",
    primaryKey: ["uuid]"],
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
    primaryKey: ["uuid]"],
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
    primaryKey: ["uuid]"],
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
    primaryKey: ["uuid]"],
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
    primaryKey: ["uuid]"],
    shapeKey: "time_entries",
    commitGranularity: "up-to-date",
    useCopy: true,
  });
}

export { startSync };
