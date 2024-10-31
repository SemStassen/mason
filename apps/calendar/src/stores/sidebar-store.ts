import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarState {
  isSidebarOpen: boolean | undefined;
  toggleIsSidebarOpen: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      toggleIsSidebarOpen: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: "mason:sidebar",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
