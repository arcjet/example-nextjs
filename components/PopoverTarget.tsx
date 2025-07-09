"use client";

import { type ComponentProps, useEffect, useRef } from "react";

const POLYFILL_APPLIED: unique symbol = Symbol.for(
  "@oddbird/css-anchor-positioning",
);

declare global {
  interface Window {
    [POLYFILL_APPLIED]?: boolean;
  }
}

async function polyfillAnchorPositioning() {
  const { default: polyfill } = await import(
    "@oddbird/css-anchor-positioning/fn"
  );
  await polyfill(true);
}

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // https://github.com/oddbird/css-anchor-positioning?tab=readme-ov-file#getting-started
    if (
      !window[POLYFILL_APPLIED] &&
      !("anchorName" in document.documentElement.style)
    ) {
      polyfillAnchorPositioning().catch((error: unknown) => {
        console.error(
          "Failed to load @oddbird/css-anchor-positioning polyfill:",
          error,
        );
      });
    }
  }, []);

  return <nav ref={popover} popover="auto" {...props} />;
}
