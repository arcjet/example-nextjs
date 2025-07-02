"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Using `ComponentProps` as the exported `LinkProps` is incomplete.

export function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();

  // Simple check that should be sufficient for our use case.
  const isActive = props.href === pathname;

  return <Link {...props} data-active={isActive} />;
}
