import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const incomingMessage =
      typeof body.message === "string" ? body.message.trim() : "";

    const incomingMessages: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
      : incomingMessage
      ? [{ role: "user", content: incomingMessage }]
      : [];

    const apiKey = process.env.OPENAI_API_KEY;

    if (!incomingMessages.length) {
      return NextResponse.json({
        reply:
          "Hi 👋 I can help you find where your therapy website is losing private-pay clients. What is your website URL and what kind of clients do you want more of?",
      });
    }

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "I can help with website conversion, SEO, lead capture, and follow-up. Please share your website URL, therapy niche, city, and main challenge so we can start your free practice growth audit.",
      });
    }

    const systemPrompt = `
You are TheraGrowth AI, a premium SaaS sales assistant for therapists and private practice owners.

Goal:
Help therapists understand how TheraGrowth AI can help them get more private-pay clients through:
- Google visibility and SEO
- website conversion improvement
- lead capture
- AI chat intake
- follow-up automation
- CRM/pipeline tracking
- booked consultation growth

Rules:
- Do NOT provide therapy, diagnosis, crisis counseling, or clinical advice.
- Do NOT claim guaranteed results.
- Keep replies concise, warm, confident, and business-focused.
- Ask one useful question at a time.
- Always move the visitor toward a free practice growth audit when appropriate.
- If they mention website traffic but no bookings, explain likely conversion leaks and ask for website URL.
- If they ask pricing, explain Starter, Growth, and Done-With-You options.
- If they seem ready, tell them to submit the Free Audit form on the page.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...incomingMessages.slice(-12),
        ],
        temperature: 0.55,
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
  return NextResponse.json({
    reply:
      "I’m sorry — I had trouble processing that. Please try again in a moment, or request a free audit and we’ll help directly.",
  });
}

    const data = await response.json();

    return NextResponse.json({
      reply:
        data?.choices?.[0]?.message?.content ||
        "Please share your website URL, niche, city, and main challenge so I can help with your free practice growth audit.",
    });
  } catch (error) {
    return NextResponse.json({
      reply:
        "Something went wrong, but I can still help. Please share your website URL and what kind of private-pay clients you want more of.",
    });
  }
}