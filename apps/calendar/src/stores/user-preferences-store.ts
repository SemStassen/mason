import { create } from "zustand";

export interface UserPreferencesState {
  weekStartsOnMonday: boolean;
  setWeekStartsOnMonday: (val: boolean) => void;
  hydrate: (data: Partial<UserPreferencesState>) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  (set) => ({
    weekStartsOnMonday: false,
    setWeekStartsOnMonday: (val) => set(() => ({ weekStartsOnMonday: val })),
    hydrate: (data) => set((state) => ({ ...state, ...data })),
  }),
);
