// This schema is used on the remote DB and is extended by the local DB

import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
};

export const usersDefinition = {
  uuid: uuid("uuid")
    .primaryKey()
    .$default(() => uuidv4()),
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
  uuid: uuid("uuid")
    .primaryKey()
    .$default(() => uuidv4()),
  // References
  userUuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  // Main
  weekStartsOnMonday: boolean("week_starts_on_monday").default(true).notNull(),
  uses24HourClock: boolean("uses_24_hour_clock").default(true).notNull(),
  // Meta
  ...timestamps,
};
export const userPreferencesTable = pgTable("user_preferences", {
  ...userPreferencesDefinition,
});

export const projectsDefinition = {
  uuid: uuid("uuid")
    .primaryKey()
    .$default(() => uuidv4()),
  // Main
  name: varchar("name").notNull(),
  hexColor: varchar("hex_color", {
    length: 7,
  }).notNull(),
  // Meta
  ...timestamps,
};
export const projectsTable = pgTable("projects", {
  ...projectsDefinition,
});

export const usersOnProjectsDefinition = {
  uuid: uuid("uuid")
    .primaryKey()
    .$default(() => uuidv4()),
  // References
  userUuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  projectUuid: uuid("project_uuid")
    .references(() => projectsTable.uuid, {
      onDelete: "no action",
    })
    .notNull(),
  // Meta
  ...timestamps,
};
export const usersOnProjectsTable = pgTable("users_on_projects", {
  ...usersOnProjectsDefinition,
});

export const timeEntriesDefinition = {
  uuid: uuid("uuid")
    .primaryKey()
    .$default(() => uuidv4()),
  // References
  userUuid: uuid("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  projectUuid: uuid("project_uuid")
    .references(() => projectsTable.uuid, {
      onDelete: "no action",
    })
    .notNull(),
  // Main
  startedAt: timestamp("started_at", {
    mode: "date",
  }).notNull(),
  stoppedAt: timestamp("stopped_at", {
    mode: "date",
  }),
  note: varchar("note"),
  // Meta
  ...timestamps,
};
export const timeEntriesTable = pgTable("time_entries", {
  ...timeEntriesDefinition,
});
