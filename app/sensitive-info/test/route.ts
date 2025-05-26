import { formSchema } from "@/app/sensitive-info/schema";
import arcjet, { sensitiveInfo, shield } from "@/lib/arcjet";
import { isDevelopment } from "@arcjet/env";
import ip from "@arcjet/ip";
import { NextRequest, NextResponse } from "next/server";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet
  .withRule(
    // Arcjet's protectSignup rule is a combination of email validation, bot
    // protection and rate limiting. Each of these can also be used separately
    // on other routes e.g. rate limiting on a login route. See
    // https://docs.arcjet.com/get-started
    sensitiveInfo({
      mode: "LIVE", // Will block requests, use "DRY_RUN" to log only
      deny: ["CREDIT_CARD_NUMBER", "EMAIL"], // Deny requests with credit card numbers
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
  // Next.js 15 doesn't provide the IP address in the request object so we use
  // the Arcjet utility package to parse the headers and find it. If we're
  // running in development mode, we'll use a local IP address.
  const userIp = isDevelopment(process.env) ? "127.0.0.1" : ip(req);
  // The protect method returns a decision object that contains information
  // about the request.
  const decision = await aj.protect(req, { fingerprint: userIp });

  console.log("Arcjet decision: ", decision);

  if (decision.isDenied()) {
    if (decision.reason.isSensitiveInfo()) {
      const message =
        "please do not include credit card numbers in your message.";

      return NextResponse.json(
        { message, reason: decision.reason },
        { status: 400 },
      );
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
        { message: "Internal server error: " + decision.reason.message },
        { status: 500 },
      );
    }
  }

  const json = await req.json();
  const data = formSchema.safeParse(json);

  if (!data.success) {
    const { error } = data;

    return NextResponse.json(
      { message: "invalid request", error },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
  });
}
