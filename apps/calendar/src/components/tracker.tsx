"use client";

import { useMeasure } from "@/hooks/use-measure";
import { Carousel, CarouselContent, CarouselItem } from "@mason/ui/carousel";

function TrackerTime({ height }: { height: number }) {
  return (
    <div className="flex-1 mt-10">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: (height - 40) / 8,
          }}
          className="text-center p-2"
        >
          {i}:00
        </div>
      ))}
    </div>
  );
}

function TrackerDay() {
  return (
    <div className="flex-1">
      <div className="text-center p-2">Mon 12</div>
    </div>
  );
}

export function Tracker() {
  const { ref, target } = useMeasure();
  return (
    <Carousel className="flex overflow-y-hidden" ref={ref}>
      <TrackerTime height={target?.height ?? 640} />
      <CarouselContent>
        {Array.from({ length: 35 }).map((_, i) => (
          <CarouselItem key={i} className="basis-[14.2857143%]">
            <TrackerDay />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
