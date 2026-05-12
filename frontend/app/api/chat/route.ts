import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];

    const lastUserMessage =
      messages
        .filter((message) => message.role === "user")
        .pop()
        ?.content?.toLowerCase() || "";

    let reply =
      "Thanks for reaching out. TheraGrowth AI helps therapists improve website conversion, capture leads, organize inquiries, and follow up faster so more potential clients book consultations.";

    if (
      lastUserMessage.includes("price") ||
      lastUserMessage.includes("pricing") ||
      lastUserMessage.includes("cost")
    ) {
      reply =
        "Our services are designed around therapist growth needs. You can start with a free audit, then choose a setup or monthly growth support package. Visit the Pricing page or request a free audit so we can recommend the right option.";
    } else if (
      lastUserMessage.includes("audit") ||
      lastUserMessage.includes("website")
    ) {
      reply =
        "For the free audit, we review your website, messaging, lead capture, booking flow, and follow-up process. Share your website URL and the main problem you want to fix.";
    } else if (
      lastUserMessage.includes("lead") ||
      lastUserMessage.includes("client") ||
      lastUserMessage.includes("private pay") ||
      lastUserMessage.includes("private-pay")
    ) {
      reply =
        "TheraGrowth AI helps therapists get more private-pay client inquiries by improving positioning, website calls-to-action, AI chat, inquiry capture, and follow-up speed.";
    } else if (
      lastUserMessage.includes("therapy") ||
      lastUserMessage.includes("therapist") ||
      lastUserMessage.includes("practice")
    ) {
      reply =
        "We help therapy practices turn their website into a client acquisition system. The goal is to capture inquiries, answer common questions, and move potential clients toward booking.";
    } else if (
      lastUserMessage.includes("hello") ||
      lastUserMessage.includes("hi") ||
      lastUserMessage.includes("hey")
    ) {
      reply =
        "Hi, welcome to TheraGrowth AI. Are you looking for help with your therapy website, private-pay clients, AI chat, or follow-up system?";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      {
        reply:
          "Sorry, something went wrong. Please try again or email hello@theragrowth-ai.com.",
      },
      { status: 500 }
    );
  }
}