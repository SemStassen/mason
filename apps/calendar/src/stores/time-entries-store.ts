import { create } from "zustand";

interface TimeEntry {
  uuid: string;
  project: {
    uuid: string;
    name: string;
    hexColor: string;
  };
  userUuid: string;
  startedAt: string;
  stoppedAt: string;
  note: string | null;
}

export interface TimeEntriesState {
  timeEntries: Array<TimeEntry>;
  currentlyTrackingTimeEntry:
    | (Omit<TimeEntry, "stoppedAt"> & {
        // We do this to satisfy the typescript-type checker
        stoppedAt?: string;
      })
    | null;
  hydrate: (data: Partial<TimeEntriesState>) => void;
}

export const useTimeEntriesStore = create<TimeEntriesState>()((set) => ({
  timeEntries: [],
  currentlyTrackingTimeEntry: null,
  hydrate: (data) => set((state) => ({ ...state, ...data })),
}));
