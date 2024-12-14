import { router } from "../trpc";
import { authRouter } from "./auth";
import { currentlyTrackingTimeEntryRouter } from "./currently-tracking-time-entry";
import { timeEntriesRouter } from "./time-entries";
import { userRouter } from "./user";
import { userPreferencesRouter } from "./user-preferences";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  userPreferences: userPreferencesRouter,
  timeEntries: timeEntriesRouter,
  currentlyTrackingTimeEntry: currentlyTrackingTimeEntryRouter,
});

export type AppRouter = typeof appRouter;
