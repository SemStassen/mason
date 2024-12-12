import type { AppRouter } from "@mason/trpc/app-router";
import { createTRPCReact } from "@mason/trpc/client/react-query";

const trpc = createTRPCReact<AppRouter>();

export { trpc };
