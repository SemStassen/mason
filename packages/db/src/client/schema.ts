import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import {
  projectsDefinition,
  timeEntriesDefinition,
  userPreferencesDefinition,
  usersDefinition,
} from "../server/schema";

const local = {
  changedColumns: text("changed_columns"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  writeUuid: uuid("write_uuid"),
};

export const usersTable = pgTable("users", {
  ...usersDefinition,
  ...local,
});

export const userPreferences = pgTable("user_preferences", {
  ...userPreferencesDefinition,
  ...local,
});

export const projectsLocal = pgTable("projects", {
  ...projectsDefinition,
  ...local,
});

export const usersOnProjectsLocal = pgTable("users_on_projects", {
  ...projectsDefinition,
  ...local,
});

export const timeEntriesLocal = pgTable("time_entries", {
  ...timeEntriesDefinition,
  ...local,
});
