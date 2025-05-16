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

import scssStyles from "./SiteHeader.module.scss";
import styles from "./SiteHeader.module.css";

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
        <span key={"nav-item-" + index} className={cn(styles.selectedNavItem)}>
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
            <Icons.gitHub className={styles.iconSize} />
            <span className={styles.srOnly}>GitHub</span>
          </div>
        </Link>
        <ThemeToggle />
      </>
    );
  }, []);

  const mobileNavItemsWidget = useMemo(() => {
    const current = nav.find((item) => pathname.indexOf(item.key) >= 0);

    return (
      <span
        className={cn(styles.mobileNavItems, scssStyles.MobileNavItemsWidget)}
      >
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
          <div className={scssStyles.MobileNavItemsWrapper}>
            <div className={scssStyles.MobileNavItems}>
              {navItems}
              {navLinksInDropdown && (
                <span className={scssStyles.NavLinks}>{navLinks}</span>
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
    <header className={cn(scssStyles.SiteHeader, styles.header)}>
      <div className={styles.wrapper}>
        <Link href="/" className={scssStyles.Logo}>
          <Image
            className={scssStyles.Image + " dark"}
            src="/static/brand/LogoLockupExploreDark+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
          <Image
            className={scssStyles.Image + " light"}
            src="/static/brand/LogoLockupExploreLight+Title.svg"
            alt="Arcjet Example app"
            height={30}
            width={310}
          />
        </Link>

        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            {!mobileNavThres ? (
              nav?.length ? (
                <span className={styles.mobileNavItems}>{navItems}</span>
              ) : null
            ) : (
              !smallMobileNavThres && mobileNavItemsWidget
            )}

            {!navLinksInDropdown && navLinks}
          </nav>

          {smallMobileNavThres && (
            <nav className={styles.nav}>
              <Button
                className={scssStyles.MenuButton}
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
