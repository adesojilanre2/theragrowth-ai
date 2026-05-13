import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "I can help you review your therapy website, improve your call-to-action, capture more inquiries, and set up follow-up. The best next step is to request a free practice growth audit so we can see where your leads are being lost.",
      });
    }

    const systemPrompt = `
You are TheraGrowth AI, a helpful website assistant for a SaaS business that helps therapists get more private-pay clients.

Your job:
- Explain how TheraGrowth helps therapists improve website conversion, SEO, lead capture, follow-up, and booked consultations.
- Encourage the visitor to request a free practice growth audit.
- Ask for their website, niche, location, and main challenge when relevant.
- Do not provide therapy, diagnosis, crisis counseling, or clinical advice.
- Keep responses short, warm, and business-focused.
- If someone appears to need mental health support, tell them to contact a licensed professional or emergency services.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10),
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        reply:
          "Thanks for reaching out. I can help you identify where your website may be losing potential clients. Please request a free audit and include your website URL.",
      });
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "I can help with that. Please request a free practice growth audit and include your website URL.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Something went wrong, but I can still help. Please request a free audit and include your website URL.",
      },
      { status: 200 }
    );
  }
}