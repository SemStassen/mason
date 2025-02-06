// This schema is used on the remote DB and is extended by the local DB

import {
  boolean,
  pgPolicy,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm/sql";

/**
 * We have to keep the naming conventions of drizzle the same as the DB tables.
 * Because useLiveQuery does not allow drizzle to transform the results into the drizzle names
 */
const timestamps = {
  created_at: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  updated_at: timestamp("updated_at", {
    mode: "date",
  }).defaultNow(),
};

export const usersDefinition = {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  // Main
  username: varchar("username").notNull(),
  email: varchar("email").unique().notNull(),
  // Meta
  ...timestamps,
};
export const usersTable = pgTable("users", {
  ...usersDefinition,
});

export const userPreferencesDefinition = {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  // References
  user_uuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  // Main
  week_starts_on_monday: boolean("week_starts_on_monday")
    .default(true)
    .notNull(),
  uses_24_hour_clock: boolean("uses_24_hour_clock").default(true).notNull(),
  // Meta
  ...timestamps,
};
export const userPreferencesTable = pgTable(
  "user_preferences",
  {
    ...userPreferencesDefinition,
  },
  // (t) => [
  //   pgPolicy("user_preferences_access_by_user_uuid", {
  //     as: "permissive",
  //     to: "public",
  //     for: "all",
  //     using: sql`true`,
  //   }),
  // ],
);

export const projectsDefinition = {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  // Main
  name: varchar("name").notNull(),
  hex_color: varchar("hex_color", {
    length: 7,
  }).notNull(),
  // Meta
  ...timestamps,
};
export const projectsTable = pgTable("projects", {
  ...projectsDefinition,
});

export const usersToProjectsDefinition = {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  // References
  user_uuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  project_uuid: uuid("project_uuid")
    .references(() => projectsTable.uuid, {
      onDelete: "no action",
    })
    .notNull(),
  // Meta
  ...timestamps,
};
export const usersToProjectsTable = pgTable("users_to_projects", {
  ...usersToProjectsDefinition,
});

export const timeEntriesDefinition = {
  uuid: uuid("uuid").primaryKey().defaultRandom(),
  // References
  user_uuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  project_uuid: uuid("project_uuid")
    .references(() => projectsTable.uuid, {
      onDelete: "no action",
    })
    .notNull(),
  // Main
  started_at: timestamp("started_at", {
    mode: "date",
  }).notNull(),
  stopped_at: timestamp("stopped_at", {
    mode: "date",
  }),
  note: varchar("note"),
  // Meta
  ...timestamps,
};
export const timeEntriesTable = pgTable("time_entries", {
  ...timeEntriesDefinition,
});
