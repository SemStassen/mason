import { cn } from "@mason/ui/cn";
import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  format,
  isSameDay,
  previousMonday,
  previousSunday,
  startOfDay,
} from "date-fns";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { TimeEntry } from "~/components/time-entry";
import { useTimerStore } from "~/stores/timer-store";
import { useTrackerStore } from "~/stores/tracker-store";
import {
  calculateDayProgressPercentage,
  convertToLocalDate,
  formatters,
} from "~/utils/dates";
import { trpc } from "~/utils/trpc";

const TrackerCalendar = () => {
  const { data: timeEntries } = trpc.timeEntries.get.useQuery({
    from: startOfDay(addDays(new Date(), -7)).toISOString(),
    to: endOfDay(addDays(new Date(), 7)).toISOString(),
  });

  const convertedTimeEntries = [...(timeEntries || [])]
    .filter((entry) => entry !== null)
    .map(({ startedAt, stoppedAt, ...rest }) => ({
      startedAt: convertToLocalDate(startedAt),
      stoppedAt: convertToLocalDate(stoppedAt ?? new Date().toISOString()),
      ...rest,
    }));

  // const { timeEntries, currentlyTrackingTimeEntry } = useTimeEntriesStore(
  //   (state) => ({
  //     timeEntries: state.timeEntries,
  //     currentlyTrackingTimeEntry: state.currentlyTrackingTimeEntry,
  //   }),
  // );

  // const convertedTimeEntries = [currentlyTrackingTimeEntry, ...timeEntries]
  //   .filter((entry) => entry !== null)
  //   .map(({ startedAt, stoppedAt, ...rest }) => ({
  //     startedAt: convertToLocalDate(startedAt),
  //     stoppedAt: convertToLocalDate(stoppedAt ?? new Date().toISOString()),
  //     ...rest,
  //   }));
  const currentTime = useTimerStore((state) => state.currentTime);

  // const { weekStartsOnMonday, uses24HourClock } = useUserPreferencesStore(
  //   (state) => ({
  //     weekStartsOnMonday: state.weekStartsOnMonday,
  //     uses24HourClock: state.uses24HourClock,
  //   }),
  // );

  const weekStartsOnMonday = true;
  const uses24HourClock = true;

  const currentDate = useTrackerStore((state) => state.currentDate);
  const dateInView = useTrackerStore((state) => state.dateInView);
  const daysInView = useTrackerStore((state) => state.daysInView);

  const daysInViewOffset = Math.floor((daysInView * 7) / 2);
  const dayWidth = 5 / daysInView;
  const dayOffsetToStartOfWeek =
    daysInView === 1
      ? 0
      : weekStartsOnMonday && format(currentDate, "EEE") === "Mon"
        ? 0
        : differenceInCalendarDays(
            weekStartsOnMonday
              ? previousMonday(currentDate)
              : previousSunday(currentDate),
            currentDate,
          );

  return (
    <ScrollContainer className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-hidden snap-x snap-mandatory h-full scroll-ps-16">
      <div className="relative isolate w-[calc(2000%_-_calc(62px_*_20))]">
        {/* DAY SCROLL SNAPPING */}
        <div
          className={cn(
            "absolute inset-0 grid auto-cols-fr grid-flow-col ml-16 [&_>_*]:snap-start",
          )}
        >
          {Array.from({ length: 20 * daysInView }).map((_, index) => {
            // biome-ignore lint/suspicious/noArrayIndexKey: not dynamic
            return <div key={`day-snap-${index}`} />;
          })}
        </div>
        {/* TOPBAR DAYS */}
        <div className="sticky top-0 inset-0 z-20">
          <div className="sticky left-0 size-0 z-30">
            <div className="h-10 w-16 bg-background flex items-center px-2 gap-2 border-r border-muted">
              <div className="text-xs">
                {new Date()
                  .toLocaleDateString(undefined, {
                    day: "2-digit",
                    timeZoneName: "short",
                  })
                  .substring(4)}
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden bg-background h-[40px] ml-16 border-b border-muted">
            {Array.from({ length: 7 * daysInView }).map((_, index) => {
              const currentDay = addDays(dateInView, index - daysInViewOffset);
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: count won't change
                  key={index}
                  className="absolute top-0 h-full flex items-center justify-center"
                  style={{
                    width: `${dayWidth}%`,
                    left: `${50 - dayWidth * daysInViewOffset + (index - dayOffsetToStartOfWeek) * dayWidth}%`,
                  }}
                >
                  {format(currentDay, "EEE")}
                  <span
                    className={cn(
                      "ml-1",
                      isSameDay(currentDay, currentDate) &&
                        "flex items-center justify-center bg-primary text-white h-7 w-7 rounded-full",
                    )}
                  >
                    {format(currentDay, "dd")}
                  </span>
                </div>
              );
            })}
          </div>
          {/* <div className="h-6">
            <div className="sticky left-0 size-0">
              <div className="w-screen border-y border-muted h-6 bg-background" />
            </div>
            <div className="sticky left-0 z-20 size-0">
              <div className="text-xs flex w-16 h-6 justify-end border-y border-r border-muted bg-background px-2">
                <div className="flex items-center">all-day</div>
              </div>
            </div>
            <div className="relative overflow-hidden">
              {Array.from({ length: 7 * daysInView }).map((_, index) => {
                return (
                  <div
                    key={index}
                    className="absolute top-0 h-full flex items-center justify-center"
                    style={{
                      width: `${dayWidth}%`,
                      left: `${50 - dayWidth * daysInViewOffset + index * dayWidth}%`,
                    }}
                  />
                );
              })}
            </div>
          </div> */}
        </div>
        {/* Current time line marker */}
        <div className="pointer-events-none sticky left-0 z-10 size-0">
          <div className="relative h-[2000px]">
            <div
              className="absolute h-px w-screen bg-red-400/60 transition-[top,opacity]"
              style={{
                top: `${calculateDayProgressPercentage(new Date(currentTime)) - 0.05}%`,
              }}
            />
          </div>
        </div>
        {/* HOURLY OVERVIEW */}
        <div className="sticky left-0 size-0 z-10">
          <div className="relative h-[2000px] w-16 flex flex-col border-r border-muted bg-background">
            {Array.from({ length: 24 }).map((_, index) => {
              if (index === 0) {
                return;
              }

              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: not dynamic
                  key={index}
                  className="absolute inset-x-0 -translate-y-1/2"
                  style={{
                    top: `calc(calc(100% / 24) * ${index})`,
                  }}
                >
                  <div
                    className={cn(
                      "grow text-xs text-muted-foreground text-center",
                    )}
                  >
                    {formatters.time(
                      new Date(0, 0, 0, index),
                      uses24HourClock ? "24h" : "12h",
                    )}
                  </div>
                </div>
              );
            })}
            <div
              className="absolute inset-x-0 -translate-y-1/2"
              style={{
                top: `${calculateDayProgressPercentage(new Date(currentTime))}%`,
              }}
            >
              <div className="grow text-xs text-destructive text-center">
                {formatters.time(currentTime, uses24HourClock ? "24h" : "12h")}
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative overflow-hidden h-[2000px] ml-16"
          style={{
            backgroundSize: "100% calc(100% / 24)",
            backgroundImage:
              "linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px), repeating-linear-gradient(transparent, transparent calc(calc(100% / 4) - 2px), hsl(var(--muted)) calc(100% / 4))",
          }}
        >
          {Array.from({ length: 7 * daysInView }).map((_, index) => {
            const currentDayStart = startOfDay(
              addDays(dateInView, index - daysInViewOffset),
            );
            const currentDayEnd = endOfDay(
              addDays(dateInView, index - daysInViewOffset),
            );
            return (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: count won't change
                key={index}
                className="absolute top-0 isolate h-full"
                style={{
                  width: `${dayWidth}%`,
                  left: `${50 - dayWidth * daysInViewOffset + (index - dayOffsetToStartOfWeek) * dayWidth}%`,
                }}
              >
                <div className="relative h-full before:absolute before:h-full before:bg-muted before:w-px">
                  {convertedTimeEntries.map(
                    ({ uuid, project, startedAt, stoppedAt, note }) => {
                      if (
                        (startedAt >= currentDayStart &&
                          startedAt <= currentDayEnd) ||
                        (stoppedAt >= currentDayStart &&
                          stoppedAt <= currentDayEnd) ||
                        (startedAt <= currentDayStart &&
                          stoppedAt >= currentDayEnd)
                      ) {
                        const entryStart =
                          startedAt < currentDayStart
                            ? currentDayStart
                            : startedAt;
                        const entryEnd =
                          stoppedAt > currentDayEnd ? currentDayEnd : stoppedAt;

                        return (
                          <TimeEntry
                            key={uuid}
                            projectName={project?.name}
                            projectHexColor={project?.hexColor}
                            uuid={uuid}
                            startedAt={startedAt}
                            stoppedAt={stoppedAt}
                            note={note}
                            style={{
                              top: `${((entryStart.getHours() + entryStart.getMinutes() / 60) * 100) / 24}%`,
                              height: `${Math.max(((entryEnd.getTime() - entryStart.getTime()) / (1000 * 60 * 60)) * (100 / 24), 1.04)}%`,
                            }}
                          />
                        );
                      }
                      return null;
                    },
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollContainer>
  );
};

interface ScrollContainerProps {
  children: ReactNode;
  onScrollStateChange?: (isScrolling: boolean) => void;
  className?: string;
}

export function ScrollContainer({
  children,
  onScrollStateChange,
  className,
}: ScrollContainerProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { dateInView, setDateInView, daysInView } = useTrackerStore();

  const resetScroll = () => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      containerRef.current.scrollLeft = scrollWidth * 0.5;
    }
  };

  useEffect(() => {
    resetScroll();
  }, [daysInView]);

  useEffect(() => {
    resetScroll();
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollBaseline = (container.scrollWidth - 65) / 2;
    const viewWidth = (container.scrollWidth - 64) / 20;

    if (container.scrollLeft > scrollBaseline + viewWidth) {
      console.log("updating");
      setDateInView(addDays(dateInView, 1));
      container.scrollLeft = scrollBaseline;
    }

    const scrollPercentage =
      container.scrollLeft / (container.scrollWidth - container.clientWidth);

    if (!isScrolling) {
      setIsScrolling(true);
      onScrollStateChange?.(true);
    }

    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
      onScrollStateChange?.(false);
    }, 150);

    resetTimerRef.current = setTimeout(() => {
      resetScroll();
    }, 1000);

    if (scrollPercentage >= 1 || scrollPercentage <= 0) {
      resetScroll();
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-auto snap-x snap-mandatory h-full scroll-ps-16",
        className,
      )}
      // onScroll={handleScroll}
    >
      {children}
    </div>
  );
}

export { TrackerCalendar };
