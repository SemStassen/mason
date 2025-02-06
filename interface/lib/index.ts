import type { AppType } from "@mason/server";
import { hc as honoClient } from "hono/client";

export const hc = honoClient<AppType>("http://localhost:8002");
