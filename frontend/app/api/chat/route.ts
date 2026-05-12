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

function cleanWebsite(value: string) {
  let website = value.trim().toLowerCase();

  website = website
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/[),.]+$/g, "");

  if (!website) return "";

  return `https://${website}`;
}

function extractWebsite(text: string) {
  const cleaned = text.toLowerCase();

  const urlMatch = cleaned.match(/https?:\/\/[^\s,]+/i);
  if (urlMatch?.[0]) return cleanWebsite(urlMatch[0]);

  const phraseMatch = cleaned.match(
    /(?:website is|site is|website:|site:|my website is)\s*([a-z0-9.-]+\.[a-z]{2,})/i
  );
  if (phraseMatch?.[1]) return cleanWebsite(phraseMatch[1]);

  const domainMatch = cleaned.match(
    /\b(?![\w.-]*@)([a-z0-9-]+\.(com|org|net|co|ai|io|therapy|health|clinic|care))\b/i
  );
  if (domainMatch?.[1]) return cleanWebsite(domainMatch[1]);

  return "";
}

function extractPhone(text: string) {
  return text.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0] || "";
}

function getLastAssistantQuestion(messages: ChatMessage[]) {
  return (
    [...messages]
      .reverse()
      .find((message) => message.role === "assistant")
      ?.content.toLowerCase() || ""
  );
}

function isLikelyName(text: string) {
  const value = text.trim();

  if (!value) return false;
  if (extractEmail(value)) return false;
  if (extractWebsite(value)) return false;
  if (extractPhone(value)) return false;
  if (value.length > 40) return false;

  return value.split(/\s+/).length <= 4;
}

function isLikelyChallenge(text: string) {
  const value = text.toLowerCase();

  return (
    value.includes("lead") ||
    value.includes("client") ||
    value.includes("booking") ||
    value.includes("consult") ||
    value.includes("private") ||
    value.includes("website") ||
    value.includes("conversion") ||
    value.includes("follow") ||
    value.includes("seo") ||
    value.includes("marketing") ||
    value.includes("growth") ||
    value.includes("audit") ||
    value.includes("more") ||
    value.includes("struggling") ||
    value.includes("need")
  );
}

function isLikelyPracticeType(text: string) {
  const value = text.toLowerCase();

  return (
    value.includes("trauma") ||
    value.includes("anxiety") ||
    value.includes("couples") ||
    value.includes("family") ||
    value.includes("child") ||
    value.includes("children") ||
    value.includes("teen") ||
    value.includes("depression") ||
    value.includes("emdr") ||
    value.includes("private practice") ||
    value.includes("therapy") ||
    value.includes("therapist") ||
    value.includes("counseling") ||
    value.includes("counselling") ||
    value.includes("psychologist") ||
    value.includes("lcsw") ||
    value.includes("lmft")
  );
}

function mergeLead(existingLead: Lead, userText: string, messages: ChatMessage[]) {
  const updatedLead: Lead = { ...existingLead };

  const cleanText = userText.trim();
  const email = extractEmail(cleanText);
  const website = extractWebsite(cleanText);
  const phone = extractPhone(cleanText);
  const lastQuestion = getLastAssistantQuestion(messages);

  if (email) updatedLead.email = email.toLowerCase();
  if (website) updatedLead.website = website;
  if (phone) updatedLead.phone = phone;

  if (!updatedLead.name && isLikelyName(cleanText)) {
    updatedLead.name = cleanText;
  }

  const textWithoutContactInfo = cleanText
    .replace(email, "")
    .replace(website, "")
    .replace(/my email is/gi, "")
    .replace(/email is/gi, "")
    .replace(/my website is/gi, "")
    .replace(/website is/gi, "")
    .replace(/site is/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (
    lastQuestion.includes("main challenge") ||
    lastQuestion.includes("want to fix") ||
    lastQuestion.includes("struggling with")
  ) {
    if (textWithoutContactInfo) {
      updatedLead.main_challenge = textWithoutContactInfo;
    }
  } else if (!updatedLead.main_challenge && isLikelyChallenge(cleanText)) {
    updatedLead.main_challenge = cleanText;
  }

  if (
    lastQuestion.includes("type of therapy practice") ||
    lastQuestion.includes("practice is this") ||
    lastQuestion.includes("practice type")
  ) {
    if (cleanText) updatedLead.practice_type = cleanText;
  } else if (!updatedLead.practice_type && isLikelyPracticeType(cleanText)) {
    updatedLead.practice_type = cleanText;
  }

  return updatedLead;
}

function getMissingFields(lead: Lead) {
  const missing: string[] = [];

  if (!lead.name) missing.push("name");
  if (!lead.email) missing.push("email");
  if (!lead.website) missing.push("website");
  if (!lead.main_challenge) missing.push("main_challenge");
  if (!lead.practice_type) missing.push("practice_type");

  return missing;
}

function getStructuredReply(lead: Lead) {
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

async function getOpenAIReply(messages: ChatMessage[], lead: Lead) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getStructuredReply(lead);
  }

  const missingFields = getMissingFields(lead);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
You are TheraGrowth AI, a professional SaaS sales assistant for therapists.

Your job is to qualify a website audit lead.

Captured lead data:
${JSON.stringify(lead)}

Missing fields:
${missingFields.join(", ") || "none"}

Rules:
- Ask for only ONE missing field at a time.
- Do not ask again for any field already captured.
- Required order: name, email, website, main challenge.
- Practice type is optional and should be asked last.
- If website is missing, ask specifically: "Thanks. What is your therapy practice website?"
- If email is missing, ask specifically: "Great. What email should we use for your free audit?"
- If main_challenge is missing, ask what they want to fix: private-pay clients, website conversion, follow-up, or bookings.
- Do not provide therapy, diagnosis, crisis advice, or clinical treatment.
- Keep replies short, warm, and business-focused.
- If all fields are captured, confirm completion.
            `,
          },
          ...messages.slice(-8),
        ],
      }),
    });

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || getStructuredReply(lead);
  } catch {
    return getStructuredReply(lead);
  }
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

    const reply = await getOpenAIReply(messages, { ...updatedLead, saved });

    return NextResponse.json({
      reply,
      lead: {
        ...updatedLead,
        saved,
      },
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