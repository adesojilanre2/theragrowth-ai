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

function extractPhone(text: string) {
  return text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || "";
}

function mergeLead(existingLead: Lead, userText: string): Lead {
  const email = extractEmail(userText);
  const website = extractWebsite(userText);
  const phone = extractPhone(userText);

  const updatedLead: Lead = {
    ...existingLead,
  };

  if (email) updatedLead.email = email;
  if (website && !website.includes("@")) updatedLead.website = website;
  if (phone) updatedLead.phone = phone;

  if (!updatedLead.name && !email && !website && userText.split(" ").length <= 4) {
    updatedLead.name = userText;
  }

  if (
    userText.toLowerCase().includes("anxiety") ||
    userText.toLowerCase().includes("trauma") ||
    userText.toLowerCase().includes("couples") ||
    userText.toLowerCase().includes("child") ||
    userText.toLowerCase().includes("family")
  ) {
    updatedLead.practice_type = userText;
  }

  if (
    userText.toLowerCase().includes("client") ||
    userText.toLowerCase().includes("lead") ||
    userText.toLowerCase().includes("website") ||
    userText.toLowerCase().includes("booking") ||
    userText.toLowerCase().includes("private")
  ) {
    updatedLead.main_challenge = userText;
  }

  return updatedLead;
}

function hasEnoughLeadInfo(lead: Lead) {
  return Boolean(lead.email && (lead.website || lead.main_challenge));
}

async function saveLead(lead: Lead) {
  if (!lead.email) return;

  await supabase.from("leads").insert({
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
}

async function getAIReply(messages: ChatMessage[], lead: Lead) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getFallbackReply(lead);
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are TheraGrowth AI, a warm sales assistant for a SaaS company helping therapists get more private-pay clients. Your goal is to collect name, email, website, practice type, and main challenge. Do not provide therapy, diagnosis, emergency advice, or clinical treatment. Keep replies short and business-focused. Ask one question at a time.",
        },
        ...messages,
        {
          role: "system",
          content: `Current captured lead info: ${JSON.stringify(lead)}`,
        },
      ],
    }),
  });

  const data = await response.json();

  return (
    data?.choices?.[0]?.message?.content ||
    "Thanks. What is your email and website so we can prepare your free audit?"
  );
}

function getFallbackReply(lead: Lead) {
  if (!lead.name) return "Thanks. What is your name?";
  if (!lead.email) return "Great. What email should we use for your free audit?";
  if (!lead.website) return "What is your therapy practice website?";
  if (!lead.main_challenge) {
    return "What is the main thing you want to improve: more private-pay clients, better website conversion, faster follow-up, or booking more consultations?";
  }

  return "Perfect. I captured your information. TheraGrowth AI can review your website, lead capture, and follow-up flow. We will use this to prepare your free audit.";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];
    const lead: Lead = body.lead || {};

    const lastUserMessage =
      messages.filter((message) => message.role === "user").pop()?.content || "";

    const updatedLead = mergeLead(lead, lastUserMessage);

    if (hasEnoughLeadInfo(updatedLead)) {
      await saveLead(updatedLead);
    }

    const reply = await getAIReply(messages, updatedLead);

    return NextResponse.json({
      reply,
      lead: updatedLead,
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