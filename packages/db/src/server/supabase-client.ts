import { env } from "@mason/env";
import {
  createServerClient as createClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

function createServerClient(req: any, res: any) {
  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => {
        return parseCookieHeader(req.headers.cookie ?? "");
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          res.appendHeader(
            "Set-Cookie",
            serializeCookieHeader(name, value, options),
          );
        }
      },
    },
    auth: {
      flowType: "pkce",
    },
  });
}

export { createServerClient };
