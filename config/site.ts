export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Arcjet Next.js example app",
  description:
    "An example Next.js application protected by Arcjet. Bot detection. Rate limiting. Email validation. Attack protection. Data redaction. A developer-first approach to security.",
  mainNav: [
    {
      title: "Home",
      href: "/",
      key: "home",
    },
    {
      title: "Signup form protection",
      href: "/signup",
      key: "signup",
    },
    {
      title: "Bot protection",
      href: "/bots",
      key: "bots",
    },
    {
      title: "Rate limiting",
      href: "/rate-limiting",
      key: "rate-limiting",
    },
    {
      title: "Attack protection",
      href: "/attack",
      key: "attack",
    },
    {
      title: "Sensitive info",
      href: "/sensitive-info",
      key: "sensitive-info",
    },
    {
      title: "Prompt injection",
      href: "/prompt-injection",
      key: "prompt-injection",
    },
  ],
};
