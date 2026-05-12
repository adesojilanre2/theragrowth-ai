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

  const [lead, setLead] = useState({
    name: "",
    email: "",
    website: "",
    phone: "",
    practice_type: "",
    main_challenge: "",
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m the TheraGrowth AI assistant. I can help you get more private-pay therapy clients. What is your name?",
    },
  ]);

  async function sendMessage(customText?: string) {
    const text = (customText || input).trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          lead,
        }),
      });

      const data = await response.json();

      if (data.lead) {
        setLead(data.lead);
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "Thanks. Please share your website, email, and main challenge so we can prepare your audit.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Sorry, the chat had a connection issue. Please try again or email hello@theragrowth-ai.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[92vw] max-w-sm overflow-hidden rounded-3xl border border-[#e0caa8] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#111111] px-5 py-4 text-white">
            <div>
              <h3 className="font-black">TheraGrowth AI Chat</h3>
              <p className="text-sm text-[#c9d4e5]">Lead growth assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/10 px-3 py-1 text-xl font-black"
            >
              ×
            </button>
          </div>

          <div className="h-[420px] space-y-4 overflow-y-auto bg-[#f7f0e6] p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl p-4 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto max-w-[85%] bg-[#111111] text-white"
                    : "mr-auto max-w-[85%] bg-white text-[#111111]"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="mr-auto max-w-[85%] rounded-2xl bg-white p-4 text-sm">
                Typing...
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {["Free website audit", "Need more clients", "Pricing", "AI follow-up"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-[#d8c3a5] bg-white px-3 py-2 text-xs font-bold"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex gap-2 border-t border-[#eadcc6] bg-white p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Type your answer..."
              className="flex-1 rounded-full border border-[#d8c3a5] px-4 py-3 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={loading}
              className="rounded-full bg-[#111111] px-5 py-3 text-sm font-black text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#111111] px-6 py-4 font-black text-white shadow-2xl"
        >
          💬 Chat with us
        </button>
      )}
    </>
  );
}