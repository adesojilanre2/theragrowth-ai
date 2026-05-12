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

function cleanWebsite(value: string) {
  let website = value.trim().toLowerCase();

  website = website.replace(/^website\s+is\s+/i, "");
  website = website.replace(/^my\s+website\s+is\s+/i, "");
  website = website.replace(/[),.]+$/g, "");

  if (!website) return "";

  if (!website.startsWith("http://") && !website.startsWith("https://")) {
    website = `https://${website}`;
  }

  return website;
}

function extractEmail(text: string) {
  return text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
}

function extractWebsite(text: string) {
  const lower = text.toLowerCase();

  const urlMatch = lower.match(/https?:\/\/[^\s,]+/i);
  if (urlMatch?.[0]) return cleanWebsite(urlMatch[0]);

  const websitePhraseMatch = lower.match(
    /(?:website is|site is|website:|site:)\s*([a-z0-9.-]+\.[a-z]{2,})/i
  );
  if (websitePhraseMatch?.[1]) return cleanWebsite(websitePhraseMatch[1]);

  const domainMatch = lower.match(/\b(?![\w.-]*@)([a-z0-9-]+\.[a-z]{2,})(?:\/[^\s]*)?\b/i);
  if (domainMatch?.[1]) return cleanWebsite(domainMatch[1]);

  return "";
}

function extractPhone(text: string) {
  return text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || "";
}

function looksLikeChallenge(text: string) {
  const value = text.toLowerCase();

  return (
    value.includes("lead") ||
    value.includes("client") ||
    value.includes("booking") ||
    value.includes("consultation") ||
    value.includes("private") ||
    value.includes("website") ||
    value.includes("conversion") ||
    value.includes("follow") ||
    value.includes("seo") ||
    value.includes("marketing") ||
    value.includes("growth") ||
    value.includes("audit") ||
    value.includes("more")
  );
}

function looksLikePracticeType(text: string) {
  const value = text.toLowerCase();

  return (
    value.includes("therapist") ||
    value.includes("therapy") ||
    value.includes("counseling") ||
    value.includes("counselling") ||
    value.includes("psychologist") ||
    value.includes("anxiety") ||
    value.includes("trauma") ||
    value.includes("couples") ||
    value.includes("family") ||
    value.includes("children") ||
    value.includes("lcsw") ||
    value.includes("lmft") ||
    value.includes("private practice")
  );
}

function getLastAssistantQuestion(messages: ChatMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((message) => message.role === "assistant")
      ?.content.toLowerCase() || ""
  );
}

function mergeLead(existingLead: Lead, userText: string, messages: ChatMessage[]): Lead {
  const updatedLead: Lead = { ...existingLead };

  const cleanText = userText.trim();
  const lowerText = cleanText.toLowerCase();

  const email = extractEmail(cleanText);
  const website = extractWebsite(cleanText);
  const phone = extractPhone(cleanText);
  const lastAssistantQuestion = getLastAssistantQuestion(messages);

  if (email) updatedLead.email = email.toLowerCase();
  if (website) updatedLead.website = website;
  if (phone) updatedLead.phone = phone;

  const textWithoutEmailWebsite = cleanText
    .replace(email, "")
    .replace(website, "")
    .replace(/my website is/gi, "")
    .replace(/website is/gi, "")
    .replace(/my email is/gi, "")
    .replace(/email is/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (
    !updatedLead.name &&
    !email &&
    !website &&
    !phone &&
    cleanText.split(" ").length <= 4
  ) {
    updatedLead.name = cleanText;
  }

  if (
    !updatedLead.practice_type &&
    (lastAssistantQuestion.includes("practice type") ||
      looksLikePracticeType(cleanText))
  ) {
    updatedLead.practice_type = cleanText;
  }

  if (
    !updatedLead.main_challenge &&
    updatedLead.email &&
    (lastAssistantQuestion.includes("main challenge") ||
      lastAssistantQuestion.includes("want to fix") ||
      looksLikeChallenge(cleanText))
  ) {
    updatedLead.main_challenge = textWithoutEmailWebsite || cleanText;
  }

  if (
    updatedLead.email &&
    updatedLead.website &&
    !updatedLead.main_challenge &&
    lowerText.includes("need")
  ) {
    updatedLead.main_challenge = cleanText;
  }

  return updatedLead;
}

function getNextReply(lead: Lead) {
  if (!lead.name) return "Thanks. What is your name?";
  if (!lead.email) return "Great. What email should we use for your free audit?";
  if (!lead.website) return "Thanks. What is your therapy practice website?";

  if (!lead.main_challenge) {
    return "Thanks. What is the main challenge you want to fix right now: more private-pay clients, better website conversion, faster follow-up, or more booked consultations?";
  }

  if (!lead.practice_type) {
    return "Optional final question: what type of therapy practice is this? For example: anxiety, trauma, couples, family, child therapy, or general private practice.";
  }

  return "Perfect. I captured your information. TheraGrowth AI will use this to prepare your free audit and review your website, lead capture, and follow-up flow.";
}

async function upsertLead(lead: Lead, lastMessage: string) {
  if (!lead.email) return false;

  const { error } = await supabase.from("leads").upsert(
    {
      name: lead.name || null,
      email: lead.email.toLowerCase(),
      website: lead.website || null,
      phone: lead.phone || null,
      practice_type: lead.practice_type || null,
      main_challenge: lead.main_challenge || null,
      source: "chat_widget",
      status: "New",
      priority: "Warm",
      last_message: lastMessage || null,
      updated_at: new Date().toISOString(),
      notes: "Captured or updated by TheraGrowth AI chatbot.",
    },
    {
      onConflict: "email",
    }
  );

  return !error;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const messages: ChatMessage[] = body.messages || [];
    const lead: Lead = body.lead || {};

    const lastUserMessage =
      messages.filter((message) => message.role === "user").pop()?.content || "";

    const updatedLead = mergeLead(lead, lastUserMessage, messages);

    let saved = updatedLead.saved || false;

    if (updatedLead.email) {
      saved = await upsertLead(updatedLead, lastUserMessage);
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