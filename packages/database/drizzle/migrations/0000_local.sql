CREATE TABLE "projects_local" (
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
CREATE TABLE "time_entries_local" (
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
CREATE TABLE "user_preferences_local" (
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
CREATE TABLE "users_on_projects_local" (
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
CREATE TABLE "users_local" (
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
ALTER TABLE "time_entries_local" ADD CONSTRAINT "time_entries_local_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_entries_local" ADD CONSTRAINT "time_entries_local_project_uuid_projects_uuid_fk" FOREIGN KEY ("project_uuid") REFERENCES "public"."projects"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_preferences_local" ADD CONSTRAINT "user_preferences_local_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE cascade ON UPDATE no action;