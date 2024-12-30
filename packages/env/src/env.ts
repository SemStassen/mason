import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    MODE: z.enum(["development", "production"]),
    DATABASE_URL: z.string().min(1),
  },
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_SUPABASE_URL: z.string().min(1),
    PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  runtimeEnvStrict: {
    MODE: import.meta.env.MODE || process.env.NODE_ENV,
    DATABASE_URL: import.meta.env.DATABASE_URL,
    PUBLIC_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  emptyStringAsUndefined: true,
});
