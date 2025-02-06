import { z } from "zod";

export const ErrorCodes = [
  "BAD_REQUEST",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "METHOD_NOT_ALLOWED",
  "UNPROCESSABLE_ENTITY",
  "INTERNAL_SERVER_ERROR",
] as const;

export const ErrorCodeEnum = z.enum(ErrorCodes);

export type ErrorCode = z.infer<typeof ErrorCodeEnum>;
