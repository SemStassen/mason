import { AnimatePresence, motion } from "framer-motion";
import { TrackerCalendar } from "~/components/tracker-calendar";
import { TrackerHeader } from "~/components/tracker-header";

function Main() {
  const selectedTimeEntryUuid = null;
  const selectedTimeEntry = null;

  return (
    <div className="flex flex-col w-full">
      <TrackerHeader />
      <div className="w-full h-full flex overflow-auto">
        <div className="w-full h-full">
          <TrackerCalendar />
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
                {/* <TimeEntryForm
                  // Add key to force rerender on change
                  key={selectedTimeEntryUuid}
                  uuid={selectedTimeEntry.uuid}
                  projectUuid={selectedTimeEntry.project.uuid}
                  startedAt={selectedTimeEntry.startedAt}
                  stoppedAt={
                    selectedTimeEntry?.stoppedAt ?? new Date().toISOString()
                  }
                  note={selectedTimeEntry.note}
                /> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { Main };
