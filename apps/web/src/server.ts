import { createContext } from "@mason/trpc/context";
import { appRouter } from "@mason/trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import ViteExpress from "vite-express";

const app = express();

// API routes
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Serve Vite app
ViteExpress.config({ mode: process.env.NODE_ENV });
ViteExpress.listen(app, 3000, () => {
  console.log("Server running on http://localhost:3000");
});
