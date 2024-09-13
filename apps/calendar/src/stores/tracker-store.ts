import { create } from "zustand";

interface TrackerState {
  isTracking: boolean;
  toggleIsTracking: () => void;
}

export const useTrackerStore = create<TrackerState>()((set) => ({
  isTracking: false,
  toggleIsTracking: () => set((state) => ({ isTracking: !state.isTracking })),
}));
