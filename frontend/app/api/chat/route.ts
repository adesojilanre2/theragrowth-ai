import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Lead = {
  name?: string;
  email?: string;
  website?: string;
  phone?: string;
  practice_type?: string;
  main_challenge?: string;
  saved?: boolean;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function extractEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
}

function extractWebsite(text: string) {
  return (
    text.match(/https?:\/\/[^\s]+/i)?.[0] ||
    text.match(/[a-z0-9-]+\.[a-z]{2,}/i)?.[0] ||
    ""
  );
}

function mergeLead(existingLead: Lead, userText: string): Lead {
  const updatedLead: Lead = { ...existingLead };
  const email = extractEmail(userText);
  const website = extractWebsite(userText);

  if (email) updatedLead.email = email;
  if (website && !website.includes("@")) updatedLead.website = website;

  if (!updatedLead.name && !email && !website && userText.split(" ").length <= 4) {
    updatedLead.name = userText;
  }

  if (
    updatedLead.email &&
    updatedLead.website &&
    !updatedLead.main_challenge &&
    !userText.includes("@") &&
    !extractWebsite(userText)
  ) {
    updatedLead.main_challenge = userText;
  }

  return updatedLead;
}

async function saveLead(lead: Lead) {
  if (!lead.email || lead.saved) return false;

  const { error } = await supabase.from("leads").insert({
    name: lead.name || null,
    email: lead.email,
    website: lead.website || null,
    phone: lead.phone || null,
    practice_type: lead.practice_type || null,
    main_challenge: lead.main_challenge || null,
    source: "chat_widget",
    status: "New",
    priority: "Warm",
    notes: "Captured by TheraGrowth AI chatbot.",
  });

  return !error;
}

function getNextReply(lead: Lead) {
  if (!lead.name) return "Thanks. What is your name?";
  if (!lead.email) return "Great. What email should we use for your free audit?";
  if (!lead.website) return "What is your therapy practice website?";

  if (!lead.main_challenge) {
    return "Thanks. What is the main challenge you want to fix right now: more private-pay clients, better website conversion, faster follow-up, or more booked consultations?";
  }

  return "Perfect. I captured your information. TheraGrowth AI will use this to prepare your free audit and review your website, lead capture, and follow-up flow.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];
    const lead: Lead = body.lead || {};

    const lastUserMessage =
      messages.filter((message) => message.role === "user").pop()?.content || "";

    const updatedLead = mergeLead(lead, lastUserMessage);

    let saved = updatedLead.saved || false;

    if (
      updatedLead.email &&
      updatedLead.website &&
      updatedLead.main_challenge &&
      !updatedLead.saved
    ) {
      saved = await saveLead(updatedLead);
    }

    return NextResponse.json({
      reply: getNextReply({ ...updatedLead, saved }),
      lead: { ...updatedLead, saved },
    });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Sorry, something went wrong. Please email hello@theragrowth-ai.com or try again.",
      },
      { status: 500 }
    );
  }
}