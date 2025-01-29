import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  projectsDefinition,
  timeEntriesDefinition,
  userPreferencesDefinition,
  usersDefinition,
} from "./base-schema";

const local = {
  changedColumns: text("changed_columns"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  writeUuid: uuid("write_uuid").notNull(),
};

export const usersTableLocal = pgTable("users_local", {
  ...usersDefinition,
  ...local,
});

export const userPreferencesLocal = pgTable("user_preferences_local", {
  ...userPreferencesDefinition,
  ...local,
});

export const projectsLocal = pgTable("projects_local", {
  ...projectsDefinition,
  ...local,
});

export const usersOnProjectsLocal = pgTable("users_on_projects_local", {
  ...projectsDefinition,
  ...local,
});

export const timeEntriesLocal = pgTable("time_entries_local", {
  ...timeEntriesDefinition,
  ...local,
});
