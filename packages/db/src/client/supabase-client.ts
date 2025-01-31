import { env } from "@mason/env";
import { createBrowserClient as createClient } from "@supabase/ssr";

function createBrowserClient() {
  // Create a supabase client on the browser with project's credentials
  return createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      flowType: "pkce",
    },
  });
}

export { createBrowserClient };
