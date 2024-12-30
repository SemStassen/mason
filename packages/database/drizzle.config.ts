import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    // These do not need to be secret because they just reference the docker-compose
    host: "192.168.117.2",
    database: "electric",
    user: "postgres",
    password: "password",
    port: 5432,
    ssl: false,
  },
});
