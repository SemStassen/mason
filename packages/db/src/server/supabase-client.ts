import { serverEnv } from "@mason/env";
import {
  createServerClient as createClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
export type { SupabaseClient } from "@supabase/supabase-js";

// Note: These are actually Hono Requests and Responses.
function createServerClient(req: any, res: any) {
  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createClient(
    serverEnv.PUBLIC_SUPABASE_URL,
    serverEnv.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => {
          return parseCookieHeader(req.header("cookie") ?? "");
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            res.headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            );
          }
        },
      },
      auth: {
        flowType: "pkce",
      },
    },
  );
}

export { createServerClient };
