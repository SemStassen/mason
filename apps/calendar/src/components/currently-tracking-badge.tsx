"use client";

import { stopTimeTrackingAction } from "@/actions/stop-time-tracking";
import { useTimeEntriesStore } from "@/stores/time-entries-store";
import { calculateDuration, formatters } from "@/utils/dates";
import { Badge } from "@mason/ui/badge";
import { Icons } from "@mason/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useAction } from "next-safe-action/hooks";

function CurrentlyTrackingBadge() {
  const stopTracking = useAction(stopTimeTrackingAction);
  const currentlyTrackingTimeEntry = useTimeEntriesStore(
    (state) => state.currentlyTrackingTimeEntry,
  );

  return (
    <AnimatePresence>
      {currentlyTrackingTimeEntry && (
        <Badge asChild>
          <motion.button
            className="overflow-hidden flex gap-2 group"
            layout
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            type="button"
            onClick={() => {
              stopTracking.execute({
                uuid: currentlyTrackingTimeEntry.uuid,
                stoppedAt: new Date().toISOString(),
              });
            }}
          >
            <Icons.Stop className="flex-none" />
            <div className="text-xs">
              <div className="group-hover:hidden">
                <span className="font-semibold">
                  {currentlyTrackingTimeEntry.project.name}
                </span>
                <span className="mx-1">-</span>
                <span>
                  {formatters.duration(
                    calculateDuration(
                      new Date(currentlyTrackingTimeEntry.startedAt),
                      new Date(),
                    ),
                  )}
                </span>
              </div>
              <div className="hidden group-hover:block">Stop tracking</div>
            </div>
          </motion.button>
        </Badge>
      )}
    </AnimatePresence>
  );
}

export { CurrentlyTrackingBadge };
