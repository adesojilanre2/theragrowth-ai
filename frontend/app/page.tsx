"use client";
import ChatWidget from "../components/ChatWidget";

import React, { useState } from "react";

const STRIPE_STARTER = "https://buy.stripe.com/8x28wR8eVd12beV4df2sM06";
const STRIPE_GROWTH = "https://buy.stripe.com/3cI6oJdzff9a1ElVX2sM09";
const STRIPE_DONE_WITH_YOU = "https://buy.stripe.com/dRmaEZ8eVf9a82JfVX2sM0a";
const CHAT_LINK = "mailto:hello@theragrowth-ai.com?subject=TheraGrowth%20AI%20Question";

type AuditForm = {
  name: string;
  email: string;
  phone: string;
  practice: string;
  website: string;
  budget: string;
  challenge: string;
};

const services = [
  {
    title: "Website Conversion Audit",
    text: "We review your therapist website, offer, calls-to-action, trust signals, speed, mobile experience, and booking flow.",
  },
  {
    title: "AI Chat Lead Capture",
    text: "Visitors can ask questions, request help, and submit inquiries directly into your client acquisition system.",
  },
  {
    title: "Follow-Up System",
    text: "Track every inquiry, next action, lead status, and follow-up date so no potential client is forgotten.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$99/mo",
    description: "Start getting more private-pay client inquiries from your website.",
    bullets: [
      "Lead capture system",
      "Client inquiry tracking",
      "Follow-up reminders",
      "Practice growth audit included",
    ],
    cta: "Start Starter Plan",
    link: STRIPE_STARTER,
    featured: false,
  },
  {
    name: "Growth",
    price: "$299/mo",
    description: "Turn more website visitors into booked therapy consultations.",
    bullets: [
      "Everything in Starter",
      "AI-assisted follow-up support",
      "Lead conversion tracking",
      "Ongoing monthly growth optimization",
    ],
    cta: "Start Growth Plan",
    link: STRIPE_GROWTH,
    featured: true,
  },
  {
    name: "Done-With-You",
    price: "$750+",
    description: "We help you build and optimize your full client acquisition system.",
    bullets: [
      "Website funnel optimization",
      "Lead capture setup",
      "Follow-up process setup",
      "1:1 implementation support",
    ],
    cta: "Get Done-With-You Setup",
    link: STRIPE_DONE_WITH_YOU,
    featured: false,
  },
];

const dashboardCards = [
  { label: "New Leads", value: "0" },
  { label: "Follow-Ups Due", value: "0" },
  { label: "Booked Calls", value: "0" },
];

export default function HomePage() {
  const [form, setForm] = useState<AuditForm>({
    name: "",
    email: "",
    phone: "",
    practice: "",
    website: "",
    budget: "Free Audit Only",
    challenge: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAuditSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting...");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Request submitted successfully.");
        setForm({
          name: "",
          email: "",
          phone: "",
          practice: "",
          website: "",
          budget: "Free Audit Only",
          challenge: "",
        });
      } else {
        setMessage(`❌ ${data.message || "Something went wrong."}`);
      }
    } catch {
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbf5e9] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-[#decba8] bg-[#fbf5e9]/95 px-6 py-5 backdrop-blur md:px-[6%]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="flex items-center gap-4 text-[#111111] no-underline">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111111] font-serif text-2xl font-bold text-[#d6a72c]">
              TG
            </div>
            <div>
              <strong className="text-xl">TheraGrowth AI</strong>
              <p className="m-0 text-sm text-[#555555] md:text-base">
                Client Acquisition System for Therapists
              </p>
            </div>
          </a>

          <nav className="flex flex-wrap items-center gap-4 font-black md:gap-6">
            <a href="#services" className="text-[#111111] no-underline">Services</a>
            <a href="#pricing" className="text-[#111111] no-underline">Pricing</a>
            <a href="#process" className="text-[#111111] no-underline">Process</a>
            <a href="#dashboard" className="text-[#111111] no-underline">Dashboard</a>
            <a href="/signup" className="text-[#111111] no-underline">Signup</a>
            <a href="/login" className="text-[#111111] no-underline">Login</a>
            <a
              href="#audit"
              className="rounded-full border border-[#d7c4a8] px-5 py-3 text-[#111111] no-underline"
            >
              Free Audit
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.35fr_0.9fr] md:px-[6%]">
        <div className="flex flex-col justify-center">
          <p className="mb-6 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">
            AI Chat • Follow-Up • Client Acquisition System
          </p>
          <h1 className="mb-7 font-serif text-5xl leading-[0.98] md:text-7xl">
            Turn Your Therapy Website Into a Private-Pay Client Machine
          </h1>
          <p className="max-w-3xl text-xl leading-relaxed text-[#263b58]">
            TheraGrowth AI helps therapists capture leads, follow up faster, track inquiries,
            and convert more website visitors into booked consultations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#audit" className="rounded-2xl bg-[#111111] px-7 py-4 font-black text-white no-underline">
              Request Free Audit
            </a>
            <a href="#pricing" className="rounded-2xl border border-[#d7c4a8] px-7 py-4 font-black text-[#111111] no-underline">
              View Growth Plans
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#decba8] bg-white p-10 shadow-sm">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#111111] font-serif text-2xl font-bold text-[#d6a72c]">
            TG
          </div>
          <h2 className="mb-6 font-serif text-4xl leading-tight">
            A complete client acquisition engine for private practices.
          </h2>
          <ul className="space-y-4 text-lg leading-relaxed text-[#0f2f57]">
            <li>Lead capture system</li>
            <li>Client inquiry tracking</li>
            <li>AI follow-up support</li>
            <li>Monthly growth plans</li>
            <li>Stripe subscription billing</li>
            <li>Login and signup flow</li>
          </ul>
          <a href="#pricing" className="mt-8 inline-block rounded-2xl bg-[#111111] px-6 py-4 font-black text-white no-underline">
            Start Monthly SaaS
          </a>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20 md:px-[6%]">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">Services</p>
        <h2 className="mb-10 font-serif text-5xl leading-tight md:text-6xl">What TheraGrowth AI Builds</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
              <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
              <p className="text-lg leading-relaxed text-[#263b58]">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-[#111111] px-6 py-20 text-white md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">SaaS Pricing</p>
          <h2 className="mb-10 font-serif text-5xl leading-tight md:text-6xl">Simple Monthly Growth Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[1.75rem] border p-8 ${
                  plan.featured ? "border-2 border-[#d6a72c] bg-[#1b1b1b]" : "border-[#333333] bg-[#1b1b1b]"
                }`}
              >
                {plan.featured && (
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#d6a72c]">Most Popular</p>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <h4 className="my-4 font-serif text-4xl text-[#d6a72c]">{plan.price}</h4>
                <p className="text-lg leading-relaxed text-[#8fa3c3]">{plan.description}</p>
                <ul className="my-7 space-y-3 leading-relaxed">
                  {plan.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl bg-[#d6a72c] px-6 py-4 font-black text-[#111111] no-underline"
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-20 md:px-[6%]">
        <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">Process</p>
        <h2 className="mb-10 font-serif text-5xl leading-tight md:text-6xl">How Clients Start</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">1. Submit Audit</h3>
            <p className="text-lg leading-relaxed text-[#263b58]">The therapist sends website and practice details.</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">2. Receive Growth Review</h3>
            <p className="text-lg leading-relaxed text-[#263b58]">You review their site and explain where leads are being lost.</p>
          </div>
          <div className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
            <h3 className="mb-4 text-2xl font-bold">3. Sell the System</h3>
            <p className="text-lg leading-relaxed text-[#263b58]">Offer SaaS, setup, or monthly growth support.</p>
          </div>
        </div>
      </section>

      <section id="dashboard" className="bg-[#fff3df] px-6 py-20 md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">Dashboard</p>
          <h2 className="mb-10 font-serif text-5xl leading-tight md:text-6xl">TheraGrowth Client Acquisition Dashboard</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {dashboardCards.map((card) => (
              <div key={card.label} className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
                <h3 className="text-2xl font-bold">{card.label}</h3>
                <p className="mt-6 font-serif text-5xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.75rem] border border-[#decba8] bg-white p-8">
            <h3 className="mb-3 text-2xl font-bold">SaaS App Direction</h3>
            <p className="text-lg leading-relaxed text-[#263b58]">
              Next build: real login, therapist accounts, saved leads, follow-up dates,
              lead status, booked-call tracking, notes, and AI-generated follow-up scripts.
            </p>
          </div>
        </div>
      </section>

      <section id="audit" className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-[6%]">
        <div>
          <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-[#bd8d14]">Free Audit</p>
          <h2 className="mb-7 font-serif text-5xl leading-tight md:text-6xl">Request Your Free Practice Growth Audit</h2>
          <p className="text-xl leading-relaxed text-[#263b58]">
            Submit your practice details and we will review your website, funnel, and client acquisition system.
          </p>
        </div>

        <form onSubmit={handleAuditSubmit} className="rounded-[1.75rem] border border-[#decba8] bg-white p-8">
          <input name="name" placeholder="Full Name" value={form.name} onChange={updateField} required className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <input name="email" type="email" placeholder="Business Email" value={form.email} onChange={updateField} required className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={updateField} className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <input name="practice" placeholder="Therapy Niche" value={form.practice} onChange={updateField} className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <input name="website" placeholder="Website URL" value={form.website} onChange={updateField} className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <select name="budget" value={form.budget} onChange={updateField} className="mb-4 w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]">
            <option>Free Audit Only</option>
            <option>Starter - $99/mo</option>
            <option>Growth - $299/mo</option>
            <option>Done-With-You - $750+</option>
          </select>
          <textarea name="challenge" placeholder="What do you need help with?" value={form.challenge} onChange={updateField} className="mb-4 min-h-[150px] w-full rounded-2xl border border-[#d7c4a8] bg-white p-4 text-base text-[#111111]" />
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#111111] px-6 py-4 text-lg font-black text-white disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Free Audit Request"}
          </button>
          {message && (
            <p className={`mt-4 font-black ${message.includes("✅") ? "text-green-700" : "text-[#bd8d14]"}`}>
              {message}
            </p>
          )}
        </form>
      </section>

      <footer className="bg-[#111111] px-6 py-12 text-white md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-2xl font-bold">TheraGrowth AI</h3>
          <p className="max-w-3xl text-[#8fa3c3]">
            Helping therapists get more private-pay clients through SaaS, AI chat, follow-up, and growth systems.
          </p>
          <p>
            <a href="https://instagram.com/theragrowth.ai" target="_blank" rel="noopener noreferrer" className="font-black text-[#d6a72c]">
              Instagram: @theragrowth.ai
            </a>
          </p>
          <p>
            Email: <a href="mailto:hello@theragrowth-ai.com" className="font-black text-[#d6a72c]">hello@theragrowth-ai.com</a>
          </p>
        </div>
      </footer>

      <a
        href={CHAT_LINK}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#111111] px-5 py-4 font-black text-white no-underline shadow-2xl"
      >
        💬 Chat with us
      </a>
    </main>
  );
}
