import { Hono } from "hono";
import { authApi } from "./auth";

export const publicApi = new Hono();

publicApi.route("/auth", authApi);
