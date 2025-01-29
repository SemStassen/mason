import { Hono } from "hono";

const app = new Hono();

const router = app;

export default app;

export type AppType = typeof router;
