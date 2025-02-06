import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const CLIENT_PREFIX = "PUBLIC_";

const baseEnv = createEnv({
  shared: {},
  server: {
    MODE: z.enum(["development", "production"]),
  },
  clientPrefix: CLIENT_PREFIX,
  client: {
    PUBLIC_SUPABASE_URL: z.string().min(1),
    PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    PUBLIC_ELECTRIC_URL: z.string().min(1),
  },
  runtimeEnvStrict: {
    MODE: import.meta.env.MODE || process.env.NODE_ENV,
    PUBLIC_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
    PUBLIC_ELECTRIC_URL: import.meta.env.VITE_ELECTRIC_URL,
  },
});

export const serverEnv = createEnv({
  extends: [baseEnv],
  server: {
    JWT_SECRET: z.string().min(1),
  },
  clientPrefix: CLIENT_PREFIX,
  client: {},
  runtimeEnvStrict: {
    JWT_SECRET: import.meta.env.VITE_JWT_SECRET,
  },
});

export const clientEnv = createEnv({
  extends: [baseEnv],
  server: {},
  clientPrefix: CLIENT_PREFIX,
  client: {},
  runtimeEnvStrict: {},
});
