// THIS IS FOR MAKING THE SWITCH TO LOCAL_FIRST LATER

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

pg.exec(`
CREATE TABLE IF NOT EXISTS "users_local" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"changed_columns" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"write_uuid" uuid NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects_local" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"hex_color" varchar(7) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"changed_columns" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"write_uuid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "time_entries_local" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"user_uuid" uuid NOT NULL,
	"project_uuid" uuid NOT NULL,
	"started_at" timestamp NOT NULL,
	"stopped_at" timestamp,
	"note" varchar,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"changed_columns" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"write_uuid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_preferences_local" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"user_uuid" uuid NOT NULL,
	"week_starts_on_monday" boolean DEFAULT true NOT NULL,
	"uses_24_hour_clock" boolean DEFAULT true NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"changed_columns" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"write_uuid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_on_projects_local" (
	"uuid" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"hex_color" varchar(7) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	"changed_columns" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"write_uuid" uuid NOT NULL
);
`);

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
