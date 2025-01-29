import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/base-schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.SUPABASE_IPV4_URL!,
  },
});
