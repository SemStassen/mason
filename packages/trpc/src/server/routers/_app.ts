import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { userPreferencesRouter } from "./user-preferences";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  userPreferences: userPreferencesRouter,
});

export type AppRouter = typeof appRouter;
