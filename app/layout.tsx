import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Viewport } from "next";
import { Metadata } from "next";
import Script from "next/script";
import styles from "./layout.module.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.png",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-light.png",
      media: "(prefers-color-scheme: light)",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            defer
            src="https://plausible.io/js/script.js"
            data-domain="arcjet.com"
          />
        </head>
        <body className={cn(styles.body, fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className={styles.container}>
              <SiteHeader />
              <div className={styles.content}>{children}</div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
