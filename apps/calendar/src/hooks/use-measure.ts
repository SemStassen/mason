"use client";

import { useEffect, useRef, useState } from "react";

export const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setTarget({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      }
    });

    resizeObserver.observe(current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    ref,
    target,
  };
};
