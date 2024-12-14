import { useEffect } from "react";
import { useTimerStore } from "~/stores/timer-store";
import { useUserPreferencesStore } from "~/stores/user-preferences-store";
import { trpc } from "~/utils/trpc";

interface AppInitProviderProps {
  children: React.ReactNode;
}

export function AppInitProvider({ children }: AppInitProviderProps) {
  const { data: preferences, isLoading } = trpc.userPreferences.get.useQuery();
  const setPreferences = useUserPreferencesStore((state) => state.hydrate);
  const updateCurrentTime = useTimerStore((state) => state.updateCurrentTime);

  useEffect(() => {
    const delayUntilNextMinute =
      60000 - (new Date().getSeconds() * 1000 + new Date().getMilliseconds());

    const timeout = setTimeout(() => {
      updateCurrentTime(); // Initial update at start of minute
      const intervalId = setInterval(() => {
        updateCurrentTime();
      }, 60 * 1000);
      return () => clearInterval(intervalId);
    }, delayUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (preferences && !isLoading) {
      setPreferences(preferences);
    }
  }, [preferences, isLoading, setPreferences]);

  return children;
}
