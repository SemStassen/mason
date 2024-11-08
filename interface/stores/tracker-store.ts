import { TZDate } from "@date-fns/tz";
import { addDays, formatISO } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TrackerState {
  daysInView: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  setDaysInView: (mode: TrackerState["daysInView"]) => void;
  /** The current active date in userland */
  currentDate: Date;
  /** The date that is currently in view */
  dateInView: Date;
  /** Set dateInView to any Date */
  setDateInView: (date: Date) => void;
  /** Add or subtract any amount of days from dateInView */
  updateDateInViewByDays: (days: number) => void;
  /** The uuid of the currently selected time entry */
  selectedTimeEntryUuid: string | null;
  /** Set the uuid for the currently selected time entry */
  setSelectedTimeEntryUuid: (uuid: string | null) => void;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set) => {
      return {
        daysInView: 1,
        setDaysInView: (amount) =>
          set(() => ({
            daysInView: amount,
          })),
        currentDate: new TZDate(
          formatISO(new Date(), { representation: "complete" }),
          "UTC",
        ),
        dateInView: new TZDate(
          formatISO(new Date(), { representation: "complete" }),
          "UTC",
        ),
        setDateInView: (date) =>
          set(() => ({
            dateInView: new TZDate(
              formatISO(date, { representation: "complete" }),
              "UTC",
            ),
          })),
        updateDateInViewByDays: (days) =>
          set((state) => ({
            dateInView: addDays(state.dateInView, days),
          })),
        selectedTimeEntryUuid: null,
        setSelectedTimeEntryUuid: (uuid) =>
          set(() => ({
            selectedTimeEntryUuid: uuid,
          })),
      };
    },
    {
      name: "mason:tracker",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        daysInView: state.daysInView,
      }),
    },
  ),
);
