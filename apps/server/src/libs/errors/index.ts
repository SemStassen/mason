import { type ErrorCode, SchemaError, codeToStatus } from "@mason/error";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export class MasonApiError extends HTTPException {
  public readonly code: ErrorCode;

  constructor({
    code,
    message,
  }: {
    code: ErrorCode;
    message: HTTPException["message"];
  }) {
    const status = codeToStatus(code);
    super(status, { message });
    this.code = code;
  }
}

export function handleError(err: Error, c: Context): Response {
  if (err instanceof ZodError) {
    const error = SchemaError.fromZod(err, c);

    const code = "BAD_REQUEST";
    const status = codeToStatus(code);

    return c.json(
      {
        code: code,
        message: error.message,
      },
      {
        status: status,
      },
    );
  }

  if (err instanceof MasonApiError) {
    const code = err.code;

    return c.json(
      {
        code: code,
        messsage: err.message,
      },
      { status: err.status },
    );
  }

  const code = "INTERNAL_SERVER_ERROR";
  const status = codeToStatus(code);

  return c.json(
    {
      code: code,
      message: err.message ?? "Something went wrong",
    },
    {
      status: status,
    },
  );
}
