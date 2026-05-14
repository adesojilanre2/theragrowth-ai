"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I’m TheraGrowth AI. I help therapists identify why their website visitors are not converting into booked private-pay clients. How can I help?",
    },
  ]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't process that request right now.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            background: "#111111",
            color: "#ffffff",
            border: "none",
            borderRadius: 9999,
            padding: "14px 20px",
            cursor: "pointer",
            fontWeight: 700,
            zIndex: 9999,
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          💬 Chat with us
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 24,
            width: 380,
            height: 520,
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid #e5e5e5",
          }}
        >
          <div
            style={{
              background: "#111111",
              color: "#ffffff",
              padding: "18px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>
                TheraGrowth AI
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#d4af37",
                }}
              >
                Practice growth assistant
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: 28,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              background: "#f9f7f1",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "12px 14px",
                    borderRadius: 18,
                    background:
                      msg.role === "user"
                        ? "#111111"
                        : "#ffffff",
                    color:
                      msg.role === "user"
                        ? "#ffffff"
                        : "#111111",
                    lineHeight: 1.5,
                    fontSize: 15,
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  background: "#ffffff",
                  padding: 12,
                  borderRadius: 14,
                  width: "fit-content",
                }}
              >
                Thinking...
              </div>
            )}
          </div>

          <div
            style={{
              padding: 14,
              borderTop: "1px solid #e5e5e5",
              display: "flex",
              gap: 10,
              background: "#ffffff",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about getting more clients..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 14,
                border: "1px solid #d1d5db",
                fontSize: 15,
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "#111111",
                color: "#ffffff",
                border: "none",
                padding: "14px 18px",
                borderRadius: 14,
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}