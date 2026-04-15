"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/chat/test" }),
    onError: async (e) => {
      setErrorMessage(e.message);
    },
  });

  return (
    <main className="page">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="section">
        <h1 className="heading-primary">AI chat</h1>
        <p className="typography-primary">
          This chat is protected by Arcjet: bot detection blocks automated
          clients, a token bucket rate limits AI usage, sensitive information
          detection prevents data leaks, and prompt injection detection stops
          manipulation attempts.
        </p>
      </div>

      <hr className="divider" />

      <div className="section">
        <h2 className="heading-secondary">Try it</h2>

        {messages.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "100%",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--theme-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    alignSelf:
                      message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {message.role === "user" ? "You" : "AI"}
                </span>
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--theme-border-level1)",
                    backgroundColor:
                      message.role === "user"
                        ? "var(--theme-foreground)"
                        : "var(--theme-surface)",
                    color:
                      message.role === "user"
                        ? "var(--theme-background)"
                        : "var(--theme-text-primary)",
                    fontSize: "0.9375rem",
                    lineHeight: "1.5rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <span key={`${message.id}-${i}`}>{part.text}</span>
                        );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "submitted" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              color: "var(--theme-text-muted)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "1rem",
                height: "1rem",
                border: "2px solid var(--theme-border-level1)",
                borderTopColor: "var(--theme-text-muted)",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            AI is thinking&hellip;
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              lineHeight: "1.25rem",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid #ef4444",
              backgroundColor: "#2d0a0a",
              color: "#fca5a5",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setErrorMessage(null);
            sendMessage({ text: input });
            setInput("");
          }}
          className="form form--wide"
        >
          <div className="form-field">
            <label className="form-label">
              Message
              <input
                className="form-input"
                value={input}
                placeholder="Say something..."
                onChange={(e) => setInput(e.currentTarget.value)}
              />
            </label>
          </div>
          <button type="submit" className="button-primary form-button">
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
