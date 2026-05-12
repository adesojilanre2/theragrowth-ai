import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const message = body.message || "";

  const lower = message.toLowerCase();

  let reply =
    "TheraGrowth AI helps therapists capture more private-pay inquiries, improve website conversion, follow up faster, and book more consultations. You can start by requesting a free practice growth audit.";

  if (lower.includes("price") || lower.includes("cost")) {
    reply =
      "Our starter plan is $99/month, growth plan is $299/month, and done-with-you setup starts at $750. The best first step is a free audit.";
  }

  if (lower.includes("audit")) {
    reply =
      "The free audit reviews your website, offer, calls-to-action, trust signals, booking flow, and follow-up system to identify where client inquiries are being lost.";
  }

  if (lower.includes("client") || lower.includes("private pay")) {
    reply =
      "We help therapists get more private-pay clients by improving their website conversion, lead capture, AI chat, follow-up process, and local visibility.";
  }

  if (lower.includes("book") || lower.includes("call")) {
    reply =
      "Great. Submit the free audit form with your practice website, and we’ll review where leads are being lost before booking a growth call.";
  }

  return NextResponse.json({ reply });
}