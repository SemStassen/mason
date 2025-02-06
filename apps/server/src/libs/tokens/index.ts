import { serverEnv } from "@mason/env";
import { sign, verify } from "hono/jwt";
import { MasonApiError } from "../errors";

interface Shape {
  url: string;
  params: {
    table: string;
    where?: string;
  };
}

interface TokenPayload extends Shape {
  exp: number;
  [key: string]: any;
}

export async function generateShapeScopedToken({
  shape,
}: {
  shape: Shape;
}) {
  const payload: TokenPayload = {
    ...shape,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Token expires in 24 hours
  };

  const token = await sign(payload, serverEnv.JWT_SECRET);
  return token;
}

export async function verifyShapeScopedToken({
  token,
}: {
  token: string;
}) {
  const payload = (await verify(token, serverEnv.JWT_SECRET)) as TokenPayload;

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new MasonApiError({
      code: "UNAUTHORIZED",
      message: "Shape token has expired",
    });
  }

  return payload as TokenPayload;
}
