import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";

const app = new Hono();

/**
 * Middleware
 */
app.use("*", requestId());
app.use("*", logger());
app.use("*", prettyJSON());

/**
 * Public Routes
 */
// app.route("/public", )

app.use("/api");

export default app;

export type AppType = typeof app;
