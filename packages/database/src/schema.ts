import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const usersTable = pgTable("users", {
  uuid: varchar("uuid", {
    length: 255,
  })
    .primaryKey()
    .$default(() => uuidv4()),
  // Main
  username: varchar("username", {
    length: 255,
  }).notNull(),
  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(),
  // Meta
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
});

export const userPreferencesTable = pgTable("user_preferences", {
  // References
  userUuid: varchar("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  // Main
  weekStartsOnMonday: boolean("week_starts_on_monday").default(true).notNull(),
  uses24HourClock: boolean("uses_24_hour_clock").default(true).notNull(),
  // Meta
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
});

export const projectsTable = pgTable("projects", {
  uuid: varchar("uuid", {
    length: 255,
  })
    .primaryKey()
    .$default(() => uuidv4()),
  // Main
  name: varchar("name", {
    length: 255,
  }).notNull(),
  hexColor: varchar("hex_color", {
    length: 7,
  }).notNull(),
  // Meta
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
});

export const usersOnProjectsTable = pgTable("users_on_projects", {
  uuid: varchar("uuid", {
    length: 255,
  })
    .primaryKey()
    .$default(() => uuidv4()),
  // References
  userUuid: varchar("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  projectUuid: varchar("project_uuid")
    .references(() => projectsTable.uuid, {
      onDelete: "no action",
    })
    .notNull(),
  // Meta
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
});

export const timeEntriesTable = pgTable("time_entries", {
  uuid: varchar("uuid", {
    length: 255,
  })
    .primaryKey()
    .$default(() => uuidv4()),
  // References
  userUuid: varchar("user_uuid")
    .references(() => usersTable.uuid, {
      onDelete: "cascade",
    })
    .notNull(),
  projectUuid: varchar("project_uuid")
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
  createdAt: timestamp("created_at", {
    mode: "date",
  })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
  }).$onUpdateFn(() => new Date()),
});
