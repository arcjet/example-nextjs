import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";

// Re-export the rules to simplify imports inside handlers
export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

// Create a base Arcjet instance for use by each handler
export default arcjet({
  // Get your site key from https://app.arcjet.com
  // and set it as an environment variable rather than hard coding.
  // See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
  key: process.env.ARCJET_KEY,
  // We specify a custom fingerprint so we can dynamically build it within each
  // demo route.
  characteristics: ["fingerprint"],
  rules: [
    // You can include one or more rules base rules. We don't include any here
    // so they can be set on each sub-page for the demo.
  ],
});
