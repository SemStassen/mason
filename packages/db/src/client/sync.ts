import type { PG } from "./db";

async function sync(pg: PG) {
  await pg.sync.syncShapeToTable({
    shape: {
      url: "https://mason.fly.dev/v1/shape",
      params: {
        table: "users",
      },
    },
    table: "users",
    primaryKey: ["uuid]"],
  });

  await pg.sync.syncShapeToTable({
    shape: {
      url: "https://mason.fly.dev/v1/shape",
      params: {
        table: "user_preferences",
      },
    },
    table: "user_preferences",
    primaryKey: ["uuid]"],
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: "https://mason.fly.dev/v1/shape",
      params: {
        table: "projects",
      },
    },
    table: "projects",
    primaryKey: ["uuid]"],
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: "https://mason.fly.dev/v1/shape",
      params: {
        table: "users_to_projects",
      },
    },
    table: "users_to_projects",
    primaryKey: ["uuid]"],
  });
  await pg.sync.syncShapeToTable({
    shape: {
      url: "https://mason.fly.dev/v1/shape",
      params: {
        table: "time_entries",
      },
    },
    table: "time_entries",
    primaryKey: ["uuid]"],
  });
}

export { sync };
