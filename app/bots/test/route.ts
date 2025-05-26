import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { isDevelopment } from "@arcjet/env";
import ip from "@arcjet/ip";
import { NextRequest, NextResponse } from "next/server";

// Opt out of caching
export const dynamic = "force-dynamic";

// Add rules to the base Arcjet instance outside of the handler function
const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      // configured with a list of bots to allow from
      // https://arcjet.com/bot-list
      allow: [], // blocks all automated clients
    }),
  )
  // You can chain multiple rules, so we'll include a rate limit
  .withRule(
    fixedWindow({
      mode: "LIVE",
      max: 100,
      window: "60s",
    }),
  );

export async function GET(req: NextRequest) {
  // Next.js 15 doesn't provide the IP address in the request object so we use
  // the Arcjet utility package to parse the headers and find it. If we're
  // running in development mode, we'll use a local IP address.
  const userIp = isDevelopment(process.env) ? "127.0.0.1" : ip(req);
  // The protect method returns a decision object that contains information
  // about the request.
  const decision = await aj.protect(req, { fingerprint: userIp });

  console.log("Arcjet decision: ", decision);

  // Use the IP analysis to customize the response based on the country
  if (decision.ip.hasCountry() && decision.ip.country == "JP") {
    return NextResponse.json({ message: "Konnichiwa!" });
  }

  // Always deny requests from VPNs
  if (decision.ip.isVpn()) {
    return NextResponse.json({ error: "VPNs are forbidden" }, { status: 403 });
  }

  // If the decision is denied, return an appropriate response. You can inspect
  // the decision results to customize the response.
  if (decision.isDenied() && decision.reason.isBot()) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } else if (decision.isDenied() && decision.reason.isRateLimit()) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  } else if (decision.isErrored()) {
    console.error("Arcjet error:", decision.reason);
    if (decision.reason.message == "[unauthenticated] invalid key") {
      return NextResponse.json(
        {
          message:
            "Invalid Arcjet key. Is the ARCJET_KEY environment variable set?",
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

  return NextResponse.json({ message: "Hello world" });
}
