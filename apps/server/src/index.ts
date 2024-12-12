import { env } from "@mason/env";
import { appRouter } from "@mason/trpc/app-router";
import { createContext } from "@mason/trpc/context";
import * as trpcExpress from "@mason/trpc/server/adapters/express";
import cors from "cors";
import express from "express";

export const app = express();

// Enable CORS for development
app.use(
  cors({
    origin:
      env.MODE === "production" ? "PRODUCTION_DOMAIN" : "http://localhost:8000",
    credentials: true,
  }),
);

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  }),
);

// Only start the server if we're not running with Vite
if (env.MODE === "production") {
  app
    .listen(4000, () => {
      console.log("API Server running on http://localhost:4000");
    })
    .on("error", (error) => {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    });
}
