import { createServerClient } from "@mason/supabase/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // @ts-expect-error - Express and Supabase Request types mismatch
  const supabase = createServerClient(req, res);
  // Refreshes the session token
  await supabase.auth.getUser();

  // Get the session token
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    req,
    res,
    supabase,
    session,
  };
};

export { createContext };
