"use client";

import useMediaQuery from "@/components/effects/useMediaQuery";
import { Icons } from "@/components/icons";
import IconCancel from "@/components/icons/Cancel";
import IconChevronDown from "@/components/icons/ChevronDown";
import IconChevronUp from "@/components/icons/ChevronUp";
import IconMenu from "@/components/icons/Menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/nav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo, useState } from "react";

import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  const mobileNavThres = useMediaQuery({ op: "max", w: 1168 });
  const smallMobileNavThres = useMediaQuery({ op: "max", w: 640 });
  const navLinksInDropdown = useMediaQuery({ op: "max", w: 480 });

  const [navItemsToggle, setNavItemsToggle] = useState(false);
  const [navItemsHoverToggle] = useState(false);

  const nav: NavItem[] = useMemo(() => [...siteConfig.mainNav], []);

  const pathname = usePathname();

  const navItems = useMemo(() => {
    return nav?.map((item, index) => {
      const selected = pathname.indexOf(item.key) >= 0;

      return item.key == "home" ? (
        <Fragment key={"nav-item-" + index}></Fragment>
      ) : item.href && selected ? (
        <span
          key={"nav-item-" + index}
          className={cn("text-md flex h-8 items-center font-bold text-primary")}
        >
          {item.title}
        </span>
      ) : (
        <Link
          key={"nav-item-" + index}
          href={item.href || ""}
          className={buttonVariants({
            size: "defaultTight",
            variant: "textSecondary",
          })}
          onClick={() => setNavItemsToggle(false)}
        >
          {item.title}
        </Link>
      );
    });
  }, [nav, pathname]);

  const navLinks = useMemo(() => {
    return (
      <>
        <Link
          href="https://github.com/arcjet/example-nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "defaultIcon",
                flavour: "iconOnly",
              }),
            )}
          >
            <Icons.gitHub className="size-4" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <ThemeToggle />
      </>
    );
  }, []);

  const mobileNavItemsWidget = useMemo(() => {
    const current = nav.find((item) => pathname.indexOf(item.key) >= 0);

    return (
      <span className={"mr-4 inline-flex gap-5 " + styles.MobileNavItemsWidget}>
        {!smallMobileNavThres && (
          <Button
            onClick={() => setNavItemsToggle(!navItemsToggle)}
            variant={navItemsToggle ? "text" : "textSecondary"}
            size="defaultTight"
            endDecorator={
              navItemsToggle ? <IconChevronUp /> : <IconChevronDown />
            }
          >
            {current?.title || "Examples"}
          </Button>
        )}

        {(navItemsToggle || navItemsHoverToggle) && (
          <div className={styles.MobileNavItemsWrapper}>
            <div className={styles.MobileNavItems}>
              {navItems}
              {navLinksInDropdown && (
                <span className={styles.NavLinks}>{navLinks}</span>
              )}
            </div>
          </div>
        )}
      </span>
    );
  }, [
    nav,
    pathname,
    smallMobileNavThres,
    navItemsToggle,
    navItemsHoverToggle,
    navLinksInDropdown,
    navItems,
    navLinks,
  ]);

  return (
    <header
      className={styles.SiteHeader + " sticky top-0 z-40 w-full bg-background"}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className={styles.Logo}>
          <Image
            className={styles.Image + " dark"}
            src="/static/brand/LogoLockupExploreDark+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
          <Image
            className={styles.Image + " light"}
            src="/static/brand/LogoLockupExploreLight+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="mt-[5px] flex items-center space-x-1">
            {!mobileNavThres ? (
              nav?.length ? (
                <span className="mr-4 inline-flex gap-5">{navItems}</span>
              ) : null
            ) : (
              !smallMobileNavThres && mobileNavItemsWidget
            )}

            {!navLinksInDropdown && navLinks}
          </nav>

          {smallMobileNavThres && (
            <nav className="mt-[5px] flex items-center space-x-1">
              <Button
                className={styles.MenuButton}
                onClick={() => setNavItemsToggle(!navItemsToggle)}
                variant={navItemsToggle ? "text" : "textSecondary"}
                size="xlTight"
                flavour="iconOnly"
                endDecorator={navItemsToggle ? <IconCancel /> : <IconMenu />}
              />
              {mobileNavItemsWidget}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
