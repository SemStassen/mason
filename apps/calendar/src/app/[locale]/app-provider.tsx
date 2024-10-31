"use client";

import { type ProjectsState, useProjectsStore } from "@/stores/projects-store";
import {
  type UserPreferencesState,
  useUserPreferencesStore,
} from "@/stores/user-preferences-store";
import { useEffect, useRef } from "react";

interface AppProviderProps {
  children: React.ReactNode;
  initialUserPreferences: Partial<UserPreferencesState>;
  initialProjects: Partial<ProjectsState>;
}

export function AppProvider({
  children,
  initialUserPreferences,
  initialProjects,
}: AppProviderProps) {
  const hydrateUserPreferences = useUserPreferencesStore(
    (state) => state.hydrate,
  );

  const hydrateProjects = useProjectsStore((state) => state.hydrate);

  useEffect(() => {
    hydrateUserPreferences(initialUserPreferences);
    hydrateProjects(initialProjects);
  }, [
    initialUserPreferences,
    hydrateUserPreferences,
    initialProjects,
    hydrateProjects,
  ]);

  return <>{children}</>;
}
