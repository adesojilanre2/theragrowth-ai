"use client";

import React, { useState } from "react";

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
        "Hi 👋 I’m TheraGrowth AI. I help therapists find where their website is losing leads and how to turn more visitors into booked consultations. What do you need help with?",
    },
  ]);

  async function sendMessage(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "Thanks — I can help with that. The best next step is to request a free practice growth audit.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble responding. Please request a free audit and we’ll review your website manually.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            <div>
              <strong>TheraGrowth AI</strong>
              <p style={styles.subText}>Practice growth assistant</p>
            </div>
            <button onClick={() => setOpen(false)} style={styles.closeButton}>
              ×
            </button>
          </div>

          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={msg.role === "user" ? styles.userBubble : styles.assistantBubble}
              >
                {msg.content}
              </div>
            ))}

            {loading && <div style={styles.assistantBubble}>Typing...</div>}
          </div>

          <form onSubmit={sendMessage} style={styles.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about getting more clients..."
              style={styles.input}
            />
            <button type="submit" style={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}

      <button type="button" onClick={() => setOpen(true)} style={styles.launchButton}>
        💬 Chat with us
      </button>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  launchButton: {
    position: "fixed",
    right: 28,
    bottom: 28,
    zIndex: 100,
    background: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: 999,
    padding: "16px 22px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
  },
  chatBox: {
    position: "fixed",
    right: 28,
    bottom: 90,
    width: 380,
    maxWidth: "calc(100vw - 40px)",
    height: 520,
    zIndex: 101,
    background: "#ffffff",
    border: "1px solid #decba8",
    borderRadius: 24,
    boxShadow: "0 24px 70px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: 18,
    background: "#111111",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: {
    margin: 0,
    fontSize: 13,
    color: "#d6a72c",
  },
  closeButton: {
    background: "transparent",
    color: "#ffffff",
    border: "none",
    fontSize: 28,
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    padding: 18,
    overflowY: "auto",
    background: "#fbf5e9",
  },
  assistantBubble: {
    background: "#ffffff",
    color: "#111111",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  userBubble: {
    background: "#111111",
    color: "#ffffff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    marginLeft: 35,
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    gap: 8,
    padding: 14,
    borderTop: "1px solid #decba8",
    background: "#ffffff",
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #decba8",
  },
  sendButton: {
    background: "#111111",
    color: "#ffffff",
    border: "none",
    borderRadius: 12,
    padding: "0 16px",
    fontWeight: 900,
    cursor: "pointer",
  },
};