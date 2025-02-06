import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/client/schema.ts",
  out: "./src/client/migrations",
});
