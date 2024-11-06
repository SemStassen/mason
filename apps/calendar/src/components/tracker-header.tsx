"use client";

import { stopTimeTrackingAction } from "@/actions/stop-time-tracking";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useTimeEntriesStore } from "@/stores/time-entries-store";
import { useTrackerStore } from "@/stores/tracker-store";
import { calculateDuration, formatters } from "@/utils/dates";
import { Badge } from "@mason/ui/badge";
import { Button } from "@mason/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@mason/ui/dropdown-menu";
import { Icons } from "@mason/ui/icons";
import { isSameDay } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { CurrentlyTrackingBadge } from "./currently-tracking-badge";
function TrackerHeader() {
  const {
    updateDateInViewByDays,
    setDateInView,
    dateInView,
    currentDate,
    daysInView,
    setDaysInView,
  } = useTrackerStore();
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const currentlyTrackingTimeEntry = useTimeEntriesStore(
    (state) => state.currentlyTrackingTimeEntry,
  );

  const stopTracking = useAction(stopTimeTrackingAction);

  return (
    <header className="px-3 h-11 shrink-0 flex items-center border-b border-muted justify-between">
      {/* <div
        className="transition-[margin]"
        style={{
          marginLeft: isSidebarOpen ? 0 : 52,
        }}
      /> */}
      <div
        className="flex gap-1.5 items-center flex-1 transition-[margin]"
        style={{
          marginLeft: isSidebarOpen ? 0 : 64,
          marginRight: isSidebarOpen ? 64 : 0,
        }}
      >
        <div className="flex gap-1 text-sm">
          <span>Aug</span>
          <span className="text-muted-foreground">/</span>
          <span>Sep</span>
          <span className="text-muted-foreground">
            {dateInView.getFullYear()}
          </span>
        </div>
        <div className="bg-muted text-muted-foreground py-1 px-1.5 rounded-md text-xs">
          W22
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateDateInViewByDays(-1 * daysInView)}
        >
          <Icons.ChevronLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateDateInViewByDays(1 * daysInView)}
        >
          <Icons.ChevronRight />
        </Button>
        {/* TODO: Add an animation to this */}
        {!isSameDay(dateInView, currentDate) && (
          <Button
            variant="ghost"
            size="icon"
            className="w-auto"
            onClick={() => setDateInView(currentDate)}
          >
            Today
          </Button>
        )}
      </div>
      <CurrentlyTrackingBadge />
      <div className="flex items-center gap-2 flex-1 justify-end">
        <Badge variant="outline">Personal</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <Icons.DotsHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent collisionPadding={{ right: 12 }}>
            <DropdownMenuLabel>Tracker options</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={daysInView === 1}
              onCheckedChange={() => setDaysInView(1)}
            >
              Day view
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={daysInView === 7}
              onCheckedChange={() => setDaysInView(7)}
            >
              Week view
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="ps-8">
                Show number of days
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={daysInView === 2}
                    onCheckedChange={() => setDaysInView(2)}
                  >
                    2 days
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={daysInView === 3}
                    onCheckedChange={() => setDaysInView(3)}
                  >
                    3 days
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={daysInView === 4}
                    onCheckedChange={() => setDaysInView(4)}
                  >
                    4 days
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={daysInView === 5}
                    onCheckedChange={() => setDaysInView(5)}
                  >
                    5 days
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={daysInView === 6}
                    onCheckedChange={() => setDaysInView(6)}
                  >
                    6 days
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export { TrackerHeader };
