"use client";

import useDebouncedCallback from "@/hooks/use-debounced-callback";
import { useMeasure } from "@/hooks/use-measure";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@mason/ui/carousel";
import { da } from "date-fns/locale";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";

function TrackerTime() {
  return (
    <div className="bg-background">
      <div className="flex-1 w-[64px] border-r border-muted">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="text-center p-2 h-[calc(calc(100vh_-_96px)_/_8)]"
          >
            {i}:00
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackerDay() {
  return (
    <div className="flex-1 p-2 border-b border-muted grid">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="h-[calc(calc(100vh_-_96px)_/_8)]">
          hour
        </div>
      ))}
    </div>
  );
}

export function Tracker() {
  const [dayApi, setDayApi] = useState<CarouselApi>();
  const [hourApi, setHourApi] = useState<CarouselApi>();

  const debouncedOnScroll = useDebouncedCallback(
    () => {
      if (!dayApi || !hourApi) return;

      const dayEngine = dayApi.internalEngine();
      const hourEngine = hourApi.internalEngine();

      hourEngine.location.set(dayEngine.location.get());
    },
    20,
    {
      leading: true,
      maxWait: 50,
    },
  );

  useEffect(() => {
    if (!dayApi || !hourApi) return;

    dayApi.on("scroll", debouncedOnScroll);

    return () => {
      dayApi.off("scroll", debouncedOnScroll);
    };
  }, [dayApi, hourApi, debouncedOnScroll]);

  return (
    <div className="relative overflow-hidden flex flex-col">
      <div className="border-b border-muted">
        <Carousel
          setApi={setDayApi}
          plugins={[
            WheelGesturesPlugin({
              forceWheelAxis: "x",
            }),
          ]}
          opts={{
            skipSnaps: true,
          }}
          className="w-[800px] ml-[64px]"
        >
          <CarouselContent>
            <CarouselItem className="h-[52px]">
              <div>
                <div>Maandag</div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <div>Dinsdag</div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <div>Woensdag</div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="overflow-y-scroll grow flex mb-[-16px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
        <TrackerTime />
        <Carousel
          setApi={setHourApi}
          plugins={[
            WheelGesturesPlugin({
              forceWheelAxis: "x",
            }),
          ]}
          opts={{
            skipSnaps: true,
          }}
          className="w-[800px]"
        >
          <CarouselContent>
            <CarouselItem>
              1
              <TrackerDay />
            </CarouselItem>
            <CarouselItem>
              2
              <TrackerDay />
            </CarouselItem>
            <CarouselItem>
              3
              <TrackerDay />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
