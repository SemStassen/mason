import { clientEnv } from "@mason/env";
import { createBrowserClient as createClient } from "@supabase/ssr";

function createBrowserClient() {
  // Create a supabase client on the browser with project's credentials
  return createClient(
    clientEnv.PUBLIC_SUPABASE_URL,
    clientEnv.PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        flowType: "pkce",
      },
    },
  );
}

export { createBrowserClient };
