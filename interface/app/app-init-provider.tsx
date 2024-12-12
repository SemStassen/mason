import { useEffect } from "react";
import { useUserPreferencesStore } from "~/stores/user-preferences-store";
import { trpc } from "~/utils/trpc";

interface AppInitProviderProps {
  children: React.ReactNode;
}

export function AppInitProvider({ children }: AppInitProviderProps) {
  const { data: preferences, isLoading } = trpc.userPreferences.get.useQuery();
  const setPreferences = useUserPreferencesStore((state) => state.hydrate);

  useEffect(() => {
    if (preferences && !isLoading) {
      setPreferences(preferences);
    }
  }, [preferences, isLoading, setPreferences]);

  return children;
}
