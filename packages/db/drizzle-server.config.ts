import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/schema.ts",
  out: "./src/server/migrations",
  dbCredentials: {
    url: "postgresql://postgres.gxsyysyostbutpsfxiur:NOMLjZ14hhpZqQlg@aws-0-eu-central-1.pooler.supabase.com:5432/postgres",
  },
});
