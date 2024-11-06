"use client";

import { useTrackerStore } from "@/stores/tracker-store";
import { Calendar } from "@mason/ui/calendar";

function SidebarCalendar() {
  const { daysInView, setDateInView } = useTrackerStore();

  return (
    <Calendar
      mode={daysInView > 1 ? "range" : "single"}
      onSelect={(val) => {
        console.log(val);
        setDateInView(val);
      }}
      classNames={{ day_today: "bg-primary text-primary-foreground" }}
    />
  );
}

export { SidebarCalendar };
