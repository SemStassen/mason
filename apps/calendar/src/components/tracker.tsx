"use client";

import { cn } from "@mason/ui/cn";
import { useState } from "react";
import { TrackerActivity } from "./tracker-activity";

export function Tracker() {
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <div
      className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-auto snap-x snap-mandatory h-full scroll-ps-16"
      onFocus={(f) => {
        console.log(f);
      }}
      onScroll={(e) => {
        if (!isScrolling) {
          setIsScrolling(true);
        }
        clearTimeout((e.currentTarget as any).scrollTimer);
        (e.currentTarget as any).scrollTimer = setTimeout(() => {
          if (document.activeElement === e.currentTarget) {
            setIsScrolling(false);
          }
        }, 150);
      }}
    >
      <div className="relative isolate w-[calc(2000%_-_calc(62px_*_20))]">
        {/* DAY SCROLL SNAPPING */}
        <div
          className={cn(
            "absolute inset-0 grid auto-cols-fr grid-flow-col ml-16",
            isScrolling && "[&_>_*]:snap-start",
          )}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        {/* TOPBAR DAYS */}
        <div className="sticky top-0 inset-0 z-20">
          <div className="sticky left-0 size-0 z-30">
            <div className="h-10 w-16 bg-muted">+</div>
          </div>
          <div className="relative overflow-hidden bg-background ml-16 h-10">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="absolute top-0 h-full flex items-center justify-center"
                style={{
                  width: "5%",
                  left: `${index * 5}%`,
                }}
              >
                day: {index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="sticky left-0 size-0 z-10">
          <div className="relative h-[2000px] w-16 flex flex-col border-r border-muted bg-background">
            {Array.from({ length: 24 }).map((_, index) => {
              if (index === 0) {
                return;
              }
              return (
                <div
                  key={index}
                  className="absolute inset-x-0 -translate-y-1/2"
                  style={{
                    top: `calc(calc(100% / 24) * ${index})`,
                  }}
                >
                  <div className="grow text-xs text-muted-foreground text-center">
                    {index < 9 ? 0 : ""}
                    {index}:00
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* HOURLY OVERVIEW */}
        <div
          className="relative overflow-hidden h-[2000px] ml-16 mt-10"
          style={{
            backgroundSize: "100% calc(100% / 24)",
            backgroundImage:
              "linear-gradient(to bottom, hsl(var(--background)) 1px, transparent 1px), repeating-linear-gradient(transparent, transparent calc(calc(100% / 4) - 2px), hsl(var(--background)) calc(100% / 4))",
          }}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute top-0 h-full"
              style={{
                width: "5%",
                left: `${index * 5}%`,
              }}
            >
              <TrackerActivity />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
