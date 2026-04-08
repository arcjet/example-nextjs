"use client";

import { type ComponentProps, useEffect, useRef } from "react";

type Props = {
  id: string;
  closeAtWidthPx: number;
} & ComponentProps<"nav">;

export function PopoverTarget({
  closeAtWidthPx: closeAtWidthPx,
  ...props
}: Props) {
  const popover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(`(width >= ${closeAtWidthPx}px)`);

    const handler = (event: MediaQueryListEvent) => {
      if (event.matches) {
        popover.current?.hidePopover();
      }
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [closeAtWidthPx]);

  return <nav ref={popover} popover="auto" {...props} />;
}
