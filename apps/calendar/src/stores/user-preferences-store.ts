import { create } from "zustand";

export interface UserPreferencesState {
  weekStartsOnMonday: boolean;
  uses24HourClock: boolean;
  hydrate: (data: Partial<UserPreferencesState>) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  (set) => ({
    weekStartsOnMonday: false,
    uses24HourClock: false,
    hydrate: (data) => set((state) => ({ ...state, ...data })),
  }),
);
