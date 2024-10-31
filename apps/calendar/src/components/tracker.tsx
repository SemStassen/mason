"use client";

import { useTrackerStore } from "@/stores/tracker-store";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { TimeEntryForm } from "./forms/time-entry-form";
import { TrackerCalendar } from "./tracker-calendar";
import { TrackerHeader } from "./tracker-header";

interface TrackerProps {
  timeEntries: {
    uuid: string;
    project: {
      uuid: string;
      name: string;
      hexColor: string;
    } | null;
    userUuid: string;
    startedAt: string;
    stoppedAt: string;
    note: string | null;
  }[];
}

function Tracker({ timeEntries }: TrackerProps) {
  const selectedTimeEntryUuid = useTrackerStore(
    (state) => state.selectedTimeEntryUuid,
  );

  const selectedTimeEntry = timeEntries.find(
    (t) => t.uuid === selectedTimeEntryUuid,
  );

  return (
    <>
      <TrackerHeader />
      <div className="w-full h-full flex overflow-auto">
        <div className="w-full h-full">
          <TrackerCalendar timeEntries={timeEntries} />
        </div>
        <AnimatePresence>
          {selectedTimeEntryUuid && selectedTimeEntry && (
            <motion.div
              initial={{ width: 0 }}
              transition={{
                ease: "linear",
                duration: 0.15,
              }}
              animate={{ width: 360 }}
              exit={{ width: 0 }}
            >
              <div className="w-[360px] p-3 h-full border-l border-muted">
                <TimeEntryForm
                  // Add key to force rerender on change
                  key={selectedTimeEntryUuid}
                  uuid={selectedTimeEntry.uuid}
                  projectUuid={selectedTimeEntry.project?.uuid ?? null}
                  startedAt={selectedTimeEntry.startedAt}
                  stoppedAt={selectedTimeEntry.stoppedAt}
                  note={selectedTimeEntry.note}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export { Tracker };
