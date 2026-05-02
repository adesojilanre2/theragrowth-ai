"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

const serviceLinks = {
  audit: "https://buy.stripe.com/4gM3cxbr7f9aer739b2sM03",
  starter: "https://buy.stripe.com/aFabJ32UB4uw2IpfVX2sM04",
  full: "https://buy.stripe.com/7sY28teDjd12fvbeRT2sM05",
};

export default function Home() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    practice_name: "",
    website_url: "",
    budget_range: "",
    main_goal: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("leads").insert([
      {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        practice_name: form.practice_name,
        website_url: form.website_url,
        budget_range: form.budget_range,
        main_goal: form.main_goal,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Success. We received your request.");
    setForm({
      full_name: "",
      email: "",
      phone: "",
      practice_name: "",
      website_url: "",
      budget_range: "",
      main_goal: "",
    });
  };

  return (
    <main style={page}>
      <header style={header}>
        <a href="/" style={brand}>
          <div style={logo}>TG</div>
          <div>
            <strong>TheraGrowth AI</strong>
            <p style={small}>Client Growth Systems for Therapists</p>
          </div>
        </a>

        <nav style={nav}>
          <a href="#services" style={navLink}>Services</a>
          <a href="/pricing" style={navLink}>SaaS Pricing</a>
          <a href="#crm" style={navLink}>CRM</a>
          <a href="#audit" style={navLink}>Free Audit</a>
          <a href="https://www.instagram.com/theragrowth.ai/" target="_blank" style={instagram}>
            ◎ Instagram
          </a>
        </nav>
      </header>

      <section style={hero}>
        <div>
          <p style={eyebrow}>Websites • SEO • AI Chat • CRM • Follow-Up</p>
          <h1 style={h1}>You Help Clients Heal. We Help Clients Find You.</h1>
          <p style={lead}>
            TheraGrowth AI helps therapists and private practices turn website traffic into
            booked consultations using premium websites, AI follow-up, CRM lead tracking,
            and the TheraGrowth OS SaaS platform.
          </p>

          <div style={buttonRow}>
            <a href="/pricing" style={primaryButton}>See SaaS Plans</a>
            <a href="#audit" style={secondaryButton}>Get Free Growth Audit</a>
          </div>
        </div>

        <div style={heroCard}>
          <div style={logoSmall}>TG</div>
          <h2 style={cardTitle}>A client acquisition engine for private practices.</h2>
          <ul style={list}>
            <li>AI lead follow-up</li>
            <li>CRM pipeline tracking</li>
            <li>Website conversion support</li>
            <li>Monthly SaaS dashboard</li>
            <li>Private-pay growth focus</li>
          </ul>
          <a href="/pricing" style={primaryButton}>Start Monthly SaaS</a>
        </div>
      </section>

      <section style={problem}>
        <p style={eyebrow}>The Problem</p>
        <h2 style={h2}>Good Therapists Still Lose Clients Online</h2>
        <p style={body}>
          Many therapists are excellent clinically, but their online system does not clearly
          turn visitors into inquiries, consultations, and long-term client relationships.
        </p>

        <div style={problemGrid}>
          {[
            "Slow or outdated website",
            "No clear booking path",
            "Weak private-pay positioning",
            "No follow-up system",
            "No CRM to track leads",
            "Too dependent on directories",
          ].map((item) => (
            <div style={problemBox} key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section id="services" style={darkSection}>
        <p style={eyebrow}>Services</p>
        <h2 style={h2White}>What We Build For Therapists</h2>

        <div style={serviceGrid}>
          {[
            ["Premium Website", "A mobile-first website designed to create trust and convert visitors into consultation requests."],
            ["SEO Foundation", "Local search structure, service pages, and content direction so the right clients can find your practice."],
            ["AI Chat Assistant", "A website assistant that answers basic service questions and guides visitors to the next step."],
            ["CRM + Follow-Up", "A backend system to track leads, status, notes, source, next action, and missed opportunities."],
            ["Lead Capture Funnel", "Forms and calls-to-action designed to move visitors from interest to inquiry."],
            ["Growth Strategy", "We review your website, Instagram, offer, trust signals, and follow-up system."],
          ].map(([title, text]) => (
            <div style={serviceCard} key={title}>
              <h3 style={serviceTitle}>{title}</h3>
              <p style={serviceText}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing-preview" style={section}>
        <p style={eyebrow}>SaaS Platform</p>
        <h2 style={h2}>TheraGrowth OS Monthly Plans</h2>
        <p style={body}>
          Use TheraGrowth OS to track leads, manage follow-up, generate AI replies,
          and measure your private practice growth.
        </p>

        <div style={miniPricing}>
          <div style={miniCard}>
            <h3>Starter</h3>
            <p style={price}>$99/mo</p>
            <p>Lead dashboard, CRM pipeline, AI follow-up writer.</p>
          </div>
          <div style={miniCardDark}>
            <h3>Growth</h3>
            <p style={price}>$199/mo</p>
            <p>Chatbot widget, automation, analytics, priority support.</p>
          </div>
          <div style={miniCard}>
            <h3>Pro</h3>
            <p style={price}>$399/mo</p>
            <p>Multi-user access, revenue reporting, VIP support.</p>
          </div>
        </div>

        <a href="/pricing" style={primaryButton}>View SaaS Pricing</a>
      </section>

      <section id="packages" style={section}>
        <p style={eyebrow}>Done-For-You Services</p>
        <h2 style={h2}>Need Help Setting It Up?</h2>
        <p style={body}>
          If you want us to review, fix, or build your growth system for you, these service
          packages support the SaaS platform.
        </p>

        <div style={packageGrid}>
          <Package
            title="Private Practice Growth Audit"
            price="$300"
            features={[
              "Website conversion review",
              "Instagram profile review",
              "Lead funnel review",
              "Private-pay positioning notes",
              "Clear action plan",
            ]}
            link={serviceLinks.audit}
          />

          <Package
            title="Client Growth Starter System"
            price="$750"
            featured
            features={[
              "Landing page direction",
              "Lead capture setup",
              "CRM pipeline setup",
              "Follow-up script",
              "Instagram bio + CTA review",
            ]}
            link={serviceLinks.starter}
          />

          <Package
            title="Full Private Practice Growth Machine"
            price="$1,500"
            features={[
              "Website + funnel improvement",
              "SEO growth direction",
              "AI chat optimization",
              "CRM + follow-up system",
              "Growth strategy for more inquiries",
            ]}
            link={serviceLinks.full}
          />
        </div>
      </section>

      <section id="crm" style={section}>
        <p style={eyebrow}>CRM Included</p>
        <h2 style={h2}>We Don’t Just Build Websites. We Build Follow-Up Systems.</h2>
        <p style={body}>
          The CRM helps therapists track every inquiry from first contact to booked consultation.
          This keeps leads from getting lost and makes practice growth measurable.
        </p>

        <div style={crmSteps}>
          {["New Lead", "Contacted", "Audit Booked", "Proposal Sent", "Won", "Follow-Up Later"].map((step) => (
            <div style={crmStep} key={step}>{step}</div>
          ))}
        </div>
      </section>

      <section id="audit" style={auditSection}>
        <div>
          <p style={eyebrow}>Free Audit</p>
          <h2 style={h2}>Request Your Free Practice Growth Audit</h2>
          <p style={body}>
            Submit your practice details and we’ll review your website, funnel, and client
            acquisition system. You can also use the SaaS pricing page to start monthly.
          </p>
          <a href="/pricing" style={primaryButton}>See SaaS Plans</a>
        </div>

        <form onSubmit={submitLead} style={form}>
          <input style={input} name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required />
          <input style={input} name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
          <input style={input} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input style={input} name="practice_name" placeholder="Practice name" value={form.practice_name} onChange={handleChange} />
          <input style={input} name="website_url" placeholder="Website URL" value={form.website_url} onChange={handleChange} />
          <select style={input} name="budget_range" value={form.budget_range} onChange={handleChange}>
            <option value="">Budget range</option>
            <option value="SaaS $99/mo">SaaS $99/mo</option>
            <option value="SaaS $199/mo">SaaS $199/mo</option>
            <option value="SaaS $399/mo">SaaS $399/mo</option>
            <option value="$300 Audit">$300 Audit</option>
            <option value="$750 Starter">$750 Starter</option>
            <option value="$1,500 Full Build">$1,500 Full Build</option>
          </select>
          <textarea style={textarea} name="main_goal" placeholder="What is your biggest growth challenge?" value={form.main_goal} onChange={handleChange} />
          <button style={submitButton} type="submit">Submit Free Audit Request</button>
          {status && <p style={statusStyle}>{status}</p>}
        </form>
      </section>

      <footer style={footer}>
        <div style={logoFooter}>TG</div>
        <div>
          <strong>TheraGrowth AI</strong>
          <p style={footerText}>Helping therapists get more private-pay clients through SaaS, websites, SEO, AI chat, CRM, and funnels.</p>
          <a href="https://www.instagram.com/theragrowth.ai/" target="_blank" style={footerInstagram}>
            ◎ Follow us on Instagram @theragrowth.ai
          </a>
        </div>
      </footer>
    </main>
  );
}

function Package({
  title,
  price,
  features,
  link,
  featured,
}: {
  title: string;
  price: string;
  features: string[];
  link: string;
  featured?: boolean;
}) {
  return (
    <div style={featured ? packageCardDark : packageCard}>
      {featured && <div style={badge}>Most Popular</div>}
      <h3 style={packageTitle}>{title}</h3>
      <p style={price}>{price}</p>
      <ul style={list}>
        {features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <a href={link} target="_blank" style={featured ? lightButton : primaryButton}>
        Pay Now
      </a>
    </div>
  );
}

const gold = "#b8892e";
const black = "#111111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const page = { background: cream, color: black, fontFamily: "Arial, sans-serif" } as const;
const header = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 6%", borderBottom: "1px solid #dfcfb7", background: "rgba(247,241,232,.96)", position: "sticky", top: 0, zIndex: 50 } as const;
const brand = { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: black } as const;
const logo = { width: 56, height: 56, borderRadius: "50%", background: black, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 900 } as const;
const small = { margin: 0, color: "#6b5b48", fontSize: 13 } as const;
const nav = { display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" } as const;
const navLink = { color: black, textDecoration: "none", fontWeight: 900 } as const;
const instagram = { ...navLink, border: "1px solid #d8c4a6", borderRadius: 999, padding: "12px 18px" } as const;

const hero = { minHeight: "78vh", display: "grid", gridTemplateColumns: "1.35fr .9fr", gap: 46, alignItems: "center", padding: "90px 6%" } as const;
const eyebrow = { color: gold, textTransform: "uppercase", letterSpacing: 3, fontWeight: 900, fontSize: 14 } as const;
const h1 = { fontFamily: "Georgia, serif", fontSize: "clamp(54px, 7vw, 98px)", lineHeight: .95, margin: "14px 0 22px" } as const;
const lead = { fontSize: 20, lineHeight: 1.7, color: "#2f281f", maxWidth: 900 } as const;
const buttonRow = { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 } as const;
const primaryButton = { display: "inline-block", background: black, color: "white", textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;
const secondaryButton = { display: "inline-block", background: "#eadfce", color: black, textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;
const lightButton = { display: "inline-block", background: "white", color: black, textDecoration: "none", padding: "16px 24px", borderRadius: 16, fontWeight: 900 } as const;

const heroCard = { background: soft, border: "1px solid #dfcaa8", borderRadius: 30, padding: 42, boxShadow: "0 30px 80px rgba(0,0,0,.08)" } as const;
const logoSmall = { ...logo, width: 72, height: 72, fontSize: 32, marginBottom: 26 } as const;
const cardTitle = { fontFamily: "Georgia, serif", fontSize: 36, lineHeight: 1.05 } as const;
const list = { lineHeight: 2, fontSize: 17 } as const;

const problem = { padding: "80px 6%" } as const;
const h2 = { fontFamily: "Georgia, serif", fontSize: "clamp(42px, 6vw, 72px)", lineHeight: 1, margin: "12px 0 24px" } as const;
const body = { fontSize: 20, lineHeight: 1.7, color: "#2f281f" } as const;
const problemGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18, marginTop: 30 } as const;
const problemBox = { background: soft, border: "1px solid #dfcaa8", borderRadius: 22, padding: 24, fontWeight: 900, fontSize: 20 } as const;

const darkSection = { background: black, color: "white", padding: "90px 6%" } as const;
const h2White = { ...h2, color: "white" } as const;
const serviceGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22, marginTop: 34 } as const;
const serviceCard = { background: "#1b1b1b", border: "1px solid #3a3228", borderRadius: 24, padding: 30 } as const;
const serviceTitle = { color: gold, fontSize: 26 } as const;
const serviceText = { lineHeight: 1.7, fontSize: 17 } as const;

const section = { padding: "85px 6%" } as const;
const miniPricing = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 22, margin: "30px 0" } as const;
const miniCard = { background: soft, border: "1px solid #dfcaa8", borderRadius: 26, padding: 30 } as const;
const miniCardDark = { ...miniCard, background: black, color: "white" } as const;
const price = { fontFamily: "Georgia, serif", color: gold, fontSize: 48, fontWeight: 900, margin: "12px 0" } as const;

const packageGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22, marginTop: 30 } as const;
const packageCard = { background: soft, border: "1px solid #dfcaa8", borderRadius: 28, padding: 32 } as const;
const packageCardDark = { ...packageCard, background: black, color: "white", boxShadow: "0 30px 80px rgba(0,0,0,.18)" } as const;
const badge = { display: "inline-block", background: gold, color: black, borderRadius: 999, padding: "8px 16px", fontWeight: 900, marginBottom: 18 } as const;
const packageTitle = { fontSize: 28, lineHeight: 1.1 } as const;

const crmSteps = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginTop: 30 } as const;
const crmStep = { background: black, color: "white", padding: 18, borderRadius: 16, textAlign: "center", fontWeight: 900 } as const;

const auditSection = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "90px 6%", background: "#fffaf2" } as const;
const form = { display: "grid", gap: 14 } as const;
const input = { width: "100%", padding: 17, borderRadius: 14, border: "1px solid #d7c4a8", background: "#fffaf5", fontSize: 16, boxSizing: "border-box" } as const;
const textarea = { ...input, minHeight: 130 } as const;
const submitButton = { background: black, color: "white", border: "none", padding: 18, borderRadius: 16, fontWeight: 900, fontSize: 16, cursor: "pointer" } as const;
const statusStyle = { color: gold, fontWeight: 900 } as const;

const footer = { display: "flex", gap: 20, alignItems: "center", background: black, color: "white", padding: "36px 6%" } as const;
const logoFooter = { ...logo, background: "white", color: gold } as const;
const footerText = { color: "#e8dfd0" } as const;
const footerInstagram = { color: gold, fontWeight: 900, textDecoration: "none" } as const;