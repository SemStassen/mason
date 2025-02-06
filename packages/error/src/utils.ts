import type { ZodIssue } from "zod";
import type { ErrorCode } from "./error-code";

export function codeToStatus(code: ErrorCode) {
  switch (code) {
    case "BAD_REQUEST":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "METHOD_NOT_ALLOWED":
      return 405;
    case "UNPROCESSABLE_ENTITY":
      return 422;
    case "INTERNAL_SERVER_ERROR":
      return 500;
    default:
      return 500;
  }
}

// Props to cal.com: https://github.com/calcom/cal.com/blob/5d325495a9c30c5a9d89fc2adfa620b8fde9346e/packages/lib/server/getServerErrorFromUnknown.ts#L17
export function parseZodErrorIssues(issues: ZodIssue[]): string {
  return issues
    .map((i) =>
      i.code === "invalid_union"
        ? i.unionErrors.map((ue) => parseZodErrorIssues(ue.issues)).join("; ")
        : i.code === "unrecognized_keys"
          ? i.message
          : `${i.path.length ? `${i.code} in '${i.path}': ` : ""}${i.message}`,
    )
    .join("; ");
}
