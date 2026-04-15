import type { UIMessage } from "ai";
import { convertToModelMessages, isTextUIPart, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import arcjet, {
  detectBot,
  detectPromptInjection,
  sensitiveInfo,
  shield,
  tokenBucket,
} from "@/lib/arcjet";

// Opt out of caching
export const dynamic = "force-dynamic";

const aj = arcjet
  // Shield protects against common web attacks e.g. SQL injection
  .withRule(shield({ mode: "LIVE" }))
  // Block all automated clients — bots inflate AI costs
  .withRule(
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [], // Block all bots. See https://arcjet.com/bot-list
    }),
  )
  // Enforce budgets to control AI costs. Adjust rates and limits as needed.
  .withRule(
    tokenBucket({
      // Track budgets per user — replace "userId" with any stable identifier
      characteristics: ["userId"],
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      refillRate: 2_000, // Refill 2,000 tokens per hour
      interval: "1m",
      capacity: 5_000, // Maximum 5,000 tokens in the bucket
    }),
  )
  // Block messages containing sensitive information to prevent data leaks
  .withRule(
    sensitiveInfo({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block PII types that should never appear in AI prompts.
      // Remove types your app legitimately handles (e.g. EMAIL for a support bot).
      deny: ["CREDIT_CARD_NUMBER", "EMAIL"],
    }),
  )
  // Detect prompt injection attacks before they reach your AI model
  .withRule(
    detectPromptInjection({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
    }),
  );

export async function POST(req: Request) {
  // Replace with your session/auth lookup to get a stable user ID
  const userId = "user-123";
  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  // Estimate token cost: ~1 token per 4 characters of text (rough heuristic).
  // For accurate counts use https://www.npmjs.com/package/tiktoken
  const totalChars = modelMessages.reduce((sum, m) => {
    const content =
      typeof m.content === "string" ? m.content : JSON.stringify(m.content);
    return sum + content.length;
  }, 0);
  const estimate = Math.ceil(totalChars / 4);

  // Check the most recent user message for sensitive information and prompt injection.
  // Pass the full conversation if you want to scan all messages.
  const lastMessage: string = (messages.at(-1)?.parts ?? [])
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join(" ");

  // Check with Arcjet before calling the AI provider
  const decision = await aj.protect(req, {
    userId,
    requested: estimate,
    sensitiveInfoValue: lastMessage,
    detectPromptInjectionMessage: lastMessage,
  });

  if (decision.isDenied()) {
    if (decision.reason.isBot()) {
      return new Response("Automated clients are not permitted", {
        status: 403,
      });
    } else if (decision.reason.isRateLimit()) {
      return new Response("AI usage limit exceeded", { status: 429 });
    } else if (decision.reason.isSensitiveInfo()) {
      return new Response("Sensitive information detected", { status: 400 });
    } else if (decision.reason.isPromptInjection()) {
      return new Response(
        "Prompt injection detected — please rephrase your message",
        { status: 400 },
      );
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
