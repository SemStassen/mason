import { Hono } from "hono";
import { callbackApi } from "./callback";
import { signoutApi } from "./signout";

export const authApi = new Hono();

authApi.route("/callback", callbackApi);
authApi.route("/signout", signoutApi);
