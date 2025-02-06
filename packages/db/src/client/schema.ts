import type { InferSelectModel } from "drizzle-orm";
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

export type UserType = InferSelectModel<typeof users>;
export const users = pgTable("users", {
  ...usersDefinition,
  ...local,
});

export type UserPreferenceType = InferSelectModel<typeof userPreferences>;
export const userPreferences = pgTable("user_preferences", {
  ...userPreferencesDefinition,
  ...local,
});

export type ProjectType = InferSelectModel<typeof projects>;
export const projects = pgTable("projects", {
  ...projectsDefinition,
  ...local,
});

export type userToProjectType = InferSelectModel<typeof usersToProjects>;
export const usersToProjects = pgTable("users_to_projects", {
  ...projectsDefinition,
  ...local,
});

export type timeEntryType = InferSelectModel<typeof timeEntries>;
export const timeEntries = pgTable("time_entries", {
  ...timeEntriesDefinition,
  ...local,
});
