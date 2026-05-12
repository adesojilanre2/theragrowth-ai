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
  main_challenge?: string;
  practice_type?: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function extractEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0]?.toLowerCase() || "";
}

function extractWebsite(text: string) {
  const match =
    text.match(/https?:\/\/[^\s,]+/i)?.[0] ||
    text.match(/\b(?![\w.-]*@)([a-z0-9-]+\.(com|org|net|co|ai|io|care|health|clinic))\b/i)?.[0] ||
    "";

  if (!match) return "";
  const cleaned = match.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  return `https://${cleaned}`;
}

function lastAssistantQuestion(messages: ChatMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((m) => m.role === "assistant")
      ?.content.toLowerCase() || ""
  );
}

function mergeLead(lead: Lead, userText: string, messages: ChatMessage[]): Lead {
  const updated: Lead = { ...lead };
  const text = userText.trim();
  const question = lastAssistantQuestion(messages);

  const email = extractEmail(text);
  const website = extractWebsite(text);

  if (email) updated.email = email;
  if (website) updated.website = website;

  if (
    !updated.name &&
    !email &&
    !website &&
    text.split(/\s+/).length <= 4
  ) {
    updated.name = text;
  }

  if (
    question.includes("main challenge") ||
    question.includes("want to fix") ||
    text.toLowerCase().includes("lead") ||
    text.toLowerCase().includes("client") ||
    text.toLowerCase().includes("booking") ||
    text.toLowerCase().includes("follow")
  ) {
    if (!email && !website) updated.main_challenge = text;
  }

  if (
    question.includes("type of therapy practice") ||
    question.includes("practice is this") ||
    text.toLowerCase().includes("trauma") ||
    text.toLowerCase().includes("anxiety") ||
    text.toLowerCase().includes("couples") ||
    text.toLowerCase().includes("family")
  ) {
    if (!email && !website && updated.main_challenge) {
      updated.practice_type = text;
    }
  }

  return updated;
}

function nextReply(lead: Lead) {
  if (!lead.name) return "Thanks. What is your name?";
  if (!lead.email) return "Great. What email should we use for your free audit?";
  if (!lead.website) return "Thanks. What is your therapy practice website?";
  if (!lead.main_challenge) {
    return "Thanks. What is the main challenge you want to fix right now: more private-pay clients, better website conversion, faster follow-up, or more booked consultations?";
  }
  if (!lead.practice_type) {
    return "Optional final question: what type of therapy practice is this? For example: anxiety, trauma, couples, family, child therapy, or general private practice.";
  }

  return "Perfect. I captured your information. TheraGrowth AI will use this to prepare your free audit.";
}

async function saveLead(lead: Lead, lastMessage: string) {
  if (!lead.email) return;

  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("email", lead.email)
    .maybeSingle();

  const payload = {
    name: lead.name || null,
    email: lead.email,
    website: lead.website || null,
    main_challenge: lead.main_challenge || null,
    practice_type: lead.practice_type || null,
    status: "New",
    priority: "Warm",
    source: "chat_widget",
    last_message: lastMessage,
    updated_at: new Date().toISOString(),
    notes: "Captured or updated by TheraGrowth AI chatbot.",
  };

  if (existing?.id) {
    await supabase.from("leads").update(payload).eq("id", existing.id);
  } else {
    await supabase.from("leads").insert(payload);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];
    const lead: Lead = body.lead || {};

    const lastUserMessage =
      messages.filter((m) => m.role === "user").pop()?.content || "";

    const updatedLead = mergeLead(lead, lastUserMessage, messages);

    if (updatedLead.email) {
      await saveLead(updatedLead, lastUserMessage);
    }

    return NextResponse.json({
      reply: nextReply(updatedLead),
      lead: updatedLead,
    });
  } catch {
    return NextResponse.json(
      {
        reply: "Sorry, something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}