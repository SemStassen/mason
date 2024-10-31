import { useTrackerStore } from "@/stores/tracker-store";
import { calculateDuration, formatters } from "@/utils/dates";
import { cn } from "@mason/ui/cn";
import { AnimatePresence, motion } from "framer-motion";

interface TimeEntryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  uuid: string;
  projectName?: string;
  projectHexColor?: string;
  startedAt: Date;
  stoppedAt: Date;
  note: string | null;
}

function TimeEntry({
  uuid,
  projectName,
  projectHexColor,
  startedAt,
  stoppedAt,
  note,
  style,
  ...props
}: TimeEntryProps) {
  const { selectedTimeEntryUuid, setSelectedTimeEntryUuid } = useTrackerStore();
  const duration = calculateDuration(startedAt, stoppedAt);
  const isSelected = uuid === selectedTimeEntryUuid;

  return (
    <button
      type="button"
      className={cn(
        "absolute flex overflow-hidden text-left isolate items-stretch text-white rounded-md hover:opacity-90",
        !projectHexColor && "bg-primary",
      )}
      style={{
        backgroundColor: projectHexColor,

        left: "5%",
        width: "90%",
        ...style,
      }}
      onClick={() => setSelectedTimeEntryUuid(isSelected ? null : uuid)}
      {...props}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 8 }}
            transition={{
              duration: 0.1,
            }}
            exit={{ width: 0 }}
            className="bg-red-500 h-full flex-none"
          />
        )}
      </AnimatePresence>
      <div className="p-2 w-full">
        <div className="font-semibold">{projectName}</div>
        <time className="text-sm text-accent truncate block">
          {formatters.duration(duration)}
        </time>
        <time className="text-xs text-accent truncate block">
          {formatters.time(startedAt)} - {formatters.time(stoppedAt)}
        </time>
        {note && <div>{note}</div>}
      </div>
      {/* <div className="absolute inset-x-0 top-0 h-1.5 cursor-ns-resize touch-none" /> */}
      {/* <div className="absolute inset-x-0 bottom-0 h-1.5 cursor-ns-resize touch-none" /> */}
    </button>
  );
}

export { TimeEntry };
