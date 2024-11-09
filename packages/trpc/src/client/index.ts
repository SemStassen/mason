import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import type { AppRouter } from "./server/routers/_app";

export const api = createTRPCReact<AppRouter>();

function getBaseUrl() {
  // Desktop app in production
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Browser or development
  return "";
}

export function createTrpcClient() {
  return api.createClient({
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        // Optional: configure batch behavior
        maxBatchSize: 10,
      }),
    ],
    transformer: superjson,
  });
}
