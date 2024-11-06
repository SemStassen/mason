"use client";

import { type ProjectsState, useProjectsStore } from "@/stores/projects-store";
import {
  type TimeEntriesState,
  useTimeEntriesStore,
} from "@/stores/time-entries-store";
import { useTimerStore } from "@/stores/timer-store";
import {
  type UserPreferencesState,
  useUserPreferencesStore,
} from "@/stores/user-preferences-store";
import { useEffect } from "react";

const Timer = () => {
  const { updateCurrentTime } = useTimerStore();

  useEffect(() => {
    const now = new Date();
    const delayUntilNextMinute =
      60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

    const timeout = setTimeout(() => {
      updateCurrentTime(); // Initial update exactly at the start of the minute
      const interval = setInterval(updateCurrentTime, 60000); // Update every minute after that

      return () => clearInterval(interval);
    }, delayUntilNextMinute);

    return () => clearTimeout(timeout);
  }, [updateCurrentTime]);

  return <></>;
};

interface AppProvidersProps {
  children: React.ReactNode;
  initialUserPreferences: Partial<UserPreferencesState>;
  initialProjects: Partial<ProjectsState>;
  initialTimeEntries: Partial<TimeEntriesState>;
}

export function AppProviders({
  children,
  initialUserPreferences,
  initialProjects,
  initialTimeEntries,
}: AppProvidersProps) {
  const hydrateUserPreferences = useUserPreferencesStore(
    (state) => state.hydrate,
  );
  const hydrateProjects = useProjectsStore((state) => state.hydrate);

  const hydrateTimeEntries = useTimeEntriesStore((state) => state.hydrate);

  useEffect(() => {
    hydrateUserPreferences(initialUserPreferences);
    hydrateProjects(initialProjects);
    hydrateTimeEntries(initialTimeEntries);
  }, [
    initialUserPreferences,
    hydrateUserPreferences,
    initialProjects,
    hydrateProjects,
    initialTimeEntries,
    hydrateTimeEntries,
  ]);

  return (
    <>
      <Timer />
      {children}
    </>
  );
}
