import { serverEnv } from "@mason/env";
import { Hono } from "hono";
import type { Env } from "..";
import { generateShapeScopedToken } from "../../../libs/tokens";

export const gatekeeperApi = new Hono<Env>();

const ELECTRIC_URL = `${serverEnv.PUBLIC_ELECTRIC_URL}/v1/shape`;

gatekeeperApi.get("/me", async (c) => {
  const { session } = c.var;

  const shape = {
    url: ELECTRIC_URL,
    params: {
      table: "users",
      where: `uuid = '${session.user.id}'`,
    },
  };

  const token = await generateShapeScopedToken({
    shape,
  });

  return c.json(
    {
      shape: shape,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
});
