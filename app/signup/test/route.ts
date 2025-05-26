import { formSchema } from "@/app/signup/schema";
import arcjet, { protectSignup, shield } from "@/lib/arcjet";
import { NextRequest, NextResponse } from "next/server";
import ip from "@arcjet/ip";
import { isDevelopment } from "@arcjet/env";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet
  .withRule(
    // Arcjet's protectSignup rule is a combination of email validation, bot
    // protection and rate limiting. Each of these can also be used separately
    // on other routes e.g. rate limiting on a login route. See
    // https://docs.arcjet.com/get-started
    protectSignup({
      email: {
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        // Block emails that are disposable, invalid, or have no MX records
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        // configured with a list of bots to allow from
        // https://arcjet.com/bot-list
        allow: [], // prevents bots from submitting the form
      },
      // It would be unusual for a form to be submitted more than 5 times in 10
      // minutes from the same IP address
      rateLimit: {
        // uses a sliding window rate limit
        mode: "LIVE",
        interval: "2m", // counts requests over a 10 minute sliding window
        max: 5, // allows 5 submissions within the window
      },
    }),
  )
  // You can chain multiple rules, so we'll include shield
  .withRule(
    // Shield detects suspicious behavior, such as SQL injection and cross-site
    // scripting attacks.
    shield({
      mode: "LIVE",
    }),
  );

export async function POST(req: NextRequest) {
  const json = await req.json();
  const data = formSchema.safeParse(json);

  if (!data.success) {
    const { error } = data;

    return NextResponse.json(
      { message: "invalid request", error },
      { status: 400 },
    );
  }

  const { email } = data.data;

  // Next.js 15 doesn't provide the IP address in the request object so we use
  // the Arcjet utility package to parse the headers and find it. If we're
  // running in development mode, we'll use a local IP address.
  const userIp = isDevelopment(process.env) ? "127.0.0.1" : ip(req);
  // The protect method returns a decision object that contains information
  // about the request.
  const decision = await aj.protect(req, { fingerprint: userIp, email });

  console.log("Arcjet decision: ", decision);

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      let message: string;

      // These are specific errors to help the user, but will also reveal the
      // validation to a spammer.
      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "email address format is invalid. Is there a typo?";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "we do not allow disposable email addresses.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message =
          "your email domain does not have an MX record. Is there a typo?";
      } else {
        // This is a catch all, but the above should be exhaustive based on the
        // configured rules.
        message = "invalid email.";
      }

      if (decision.ip.hasCountry()) {
        message += ` PS: Hello to you in ${decision.ip.countryName}!`;
      }

      return NextResponse.json(
        { message, reason: decision.reason },
        { status: 400 },
      );
    } else if (decision.reason.isRateLimit()) {
      const reset = decision.reason.resetTime;

      if (reset === undefined) {
        return NextResponse.json(
          {
            message: "too many requests. Please try again later.",
            reason: decision.reason,
          },
          { status: 429 },
        );
      }

      // Calculate number of seconds between reset Date and now
      const seconds = Math.floor((reset.getTime() - Date.now()) / 1000);
      const minutes = Math.ceil(seconds / 60);

      if (minutes > 1) {
        return NextResponse.json(
          {
            message: `too many requests. Please try again in ${minutes} minutes.`,
            reason: decision.reason,
          },
          { status: 429 },
        );
      } else {
        return NextResponse.json(
          {
            message: `too many requests. Please try again in ${seconds} seconds.`,
            reason: decision.reason,
          },
          { status: 429 },
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } else if (decision.isErrored()) {
    console.error("Arcjet error:", decision.reason);
    if (decision.reason.message == "[unauthenticated] invalid key") {
      return NextResponse.json(
        {
          message:
            "invalid Arcjet key. Is the ARCJET_KEY environment variable set?",
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { message: "internal server error: " + decision.reason.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
  });
}
