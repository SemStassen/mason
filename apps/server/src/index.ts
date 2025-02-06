import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { handleError } from "./libs/errors";
import { publicApi } from "./routes/public";
import { v1Api } from "./routes/v1";

const app = new Hono().basePath("/api");

/**
 * Middleware
 */
app.use("*", requestId());
app.use("*", logger());
app.use("*", prettyJSON());

app.onError(handleError);

/**
 * Public Routes
 */
app.route("/public", publicApi);

/**
 * Ping
 */

app.get("/ping", (c) => {
  return c.json(
    {
      ping: "pong",
      requestId: c.get("requestId"),
    },
    200,
  );
});

app.route("/v1", v1Api);

export default app;

export type AppType = typeof app;
