"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    practice_name: "",
    website_url: "",
    main_goal: "",
    budget_range: "",
  });

  const [status, setStatus] = useState("");

  const stripeLinks = {
    audit: "https://buy.stripe.com/4gM3cxbr7f9aer739b2sM03",
    starter: "https://buy.stripe.com/aFabJ32UB4uw2IpfVX2sM04",
    full: "https://buy.stripe.com/7sY28teDjd12fvbeRT2sM05",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("leads").insert([
      {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        practice_name: form.practice_name,
        website_url: form.website_url,
        main_goal: form.main_goal,
        budget_range: form.budget_range,
        source: "TheraGrowth Website",
        status: "New Lead",
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus("Success — your free growth audit request has been received.");
    setForm({
      full_name: "",
      email: "",
      phone: "",
      practice_name: "",
      website_url: "",
      main_goal: "",
      budget_range: "",
    });
  };

  return (
    <main style={pageStyle}>
      <div style={forceBannerStyle}>LIVE UPDATE: FINAL MONEY WEBSITE</div>

      <header style={headerStyle}>
        <a href="#top" style={brandStyle}>
          <div style={logoBoxStyle}>TG</div>
          <div>
            <div style={brandNameStyle}>TheraGrowth AI</div>
            <div style={brandSubStyle}>Client Growth Systems for Therapists</div>
          </div>
        </a>

        <nav style={navStyle}>
          <a style={navLinkStyle} href="#services">Services</a>
          <a style={navLinkStyle} href="#packages">Packages</a>
          <a style={navLinkStyle} href="#crm">CRM</a>
          <a style={navLinkStyle} href="#audit">Free Audit</a>
          <a
            style={instagramLinkStyle}
            href="https://instagram.com/theragrowth.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon /> Instagram
          </a>
        </nav>
      </header>

      <section id="top" style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Websites • SEO • AI Chat • CRM • Follow-Up</p>
          <h1 style={h1Style}>Turn Your Therapy Website Into a Private-Pay Client Machine</h1>
          <p style={leadStyle}>
            TheraGrowth AI helps therapists and private practices convert more website visitors into
            real inquiries using premium websites, stronger SEO, AI chat, CRM tracking, and simple
            follow-up systems.
          </p>
          <div style={buttonRowStyle}>
            <a href="#packages" style={primaryButtonStyle}>See Packages</a>
            <a href="#audit" style={secondaryButtonStyle}>Request Free Audit</a>
          </div>
        </div>

        <div style={heroCardStyle}>
          <div style={miniLogoStyle}>TG</div>
          <h2 style={cardTitleStyle}>A complete client acquisition engine for private practices.</h2>
          <ul style={checkListStyle}>
            <li>Trust-building website</li>
            <li>Clear booking path</li>
            <li>AI chat support</li>
            <li>CRM lead tracking</li>
            <li>Follow-up system</li>
          </ul>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={eyebrowStyle}>The Problem</p>
        <h2 style={h2Style}>Good Therapists Still Lose Clients Online</h2>
        <p style={sectionLeadStyle}>
          Many therapists are excellent clinically, but their online system does not clearly turn visitors into inquiries.
        </p>
        <div style={gridStyle}>
          {[
            "Slow or outdated website",
            "No clear booking path",
            "Weak private-pay positioning",
            "No follow-up system",
            "No CRM to track leads",
            "Too dependent on directories",
          ].map((item) => (
            <div key={item} style={problemCardStyle}>{item}</div>
          ))}
        </div>
      </section>

      <section id="services" style={darkSectionStyle}>
        <p style={darkEyebrowStyle}>Services</p>
        <h2 style={darkH2Style}>What We Build For Therapists</h2>
        <div style={serviceGridStyle}>
          <ServiceCard title="Premium Website" text="A mobile-first website designed to create trust and convert visitors into consultation requests." />
          <ServiceCard title="SEO Foundation" text="Local search structure, service pages, and content direction so the right clients can find your practice." />
          <ServiceCard title="AI Chat Assistant" text="A website assistant that answers basic service questions and guides visitors to the next step." />
          <ServiceCard title="CRM + Follow-Up" text="A simple backend system to track leads, status, notes, source, and next action." />
          <ServiceCard title="Lead Capture Funnel" text="Forms and calls-to-action designed to move visitors from interest to inquiry." />
          <ServiceCard title="Growth Strategy" text="We review your website, Instagram, offer, trust signals, and follow-up system." />
        </div>
      </section>

      <section id="packages" style={packagesSectionStyle}>
        <p style={eyebrowStyle}>Packages</p>
        <h2 style={h2Style}>Choose Your Growth Path</h2>
        <p style={sectionLeadStyle}>
          Start with a focused audit, install the starter system, or build the full private practice growth machine.
        </p>
        <div style={pricingGridStyle}>
          <PriceCard
            price="$300"
            title="Private Practice Growth Audit"
            subtitle="Best first step"
            paymentLink={stripeLinks.audit}
            features={[
              "Website conversion review",
              "Instagram profile review",
              "Lead funnel review",
              "Private-pay positioning notes",
              "Clear action plan",
            ]}
          />
          <PriceCard
            price="$750"
            title="Client Growth Starter System"
            subtitle="Most popular starter"
            paymentLink={stripeLinks.starter}
            features={[
              "Landing page direction",
              "Lead capture setup",
              "CRM pipeline setup",
              "Follow-up script",
              "Instagram bio + CTA review",
            ]}
            featured
          />
          <PriceCard
            price="$1,500"
            title="Full Private Practice Growth Machine"
            subtitle="High-ticket growth system"
            paymentLink={stripeLinks.full}
            features={[
              "Website + funnel improvement",
              "SEO growth direction",
              "AI chat optimization",
              "CRM + follow-up system",
              "Growth strategy for more inquiries",
            ]}
          />
        </div>
      </section>

      <section id="crm" style={sectionStyleWithScroll}>
        <p style={eyebrowStyle}>CRM Included</p>
        <h2 style={h2Style}>We Don’t Just Build Websites. We Build Follow-Up Systems.</h2>
        <p style={leadStyle}>
          The CRM helps you track every inquiry from first contact to booked consultation.
          This keeps leads from getting lost and makes practice growth measurable.
        </p>
        <div style={pipelineStyle}>
          {["New Lead", "Contacted", "Audit Booked", "Proposal Sent", "Won", "Follow-Up Later"].map((stage) => (
            <div key={stage} style={pipelineCardStyle}>{stage}</div>
          ))}
        </div>
      </section>

      <section id="audit" style={formSectionStyle}>
        <div>
          <p style={eyebrowStyle}>Free Audit</p>
          <h2 style={h2Style}>Request Your Free Practice Growth Audit</h2>
          <p style={leadStyle}>
            Submit your practice details and we’ll review your website, funnel, and client acquisition system.
            You can also buy the full paid audit if you want a deeper action plan.
          </p>
          <a href={stripeLinks.audit} target="_blank" rel="noopener noreferrer" style={primaryButtonStyle}>
            Buy Full Audit — $300
          </a>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input style={inputStyle} name="full_name" placeholder="Full name" value={form.full_name} onChange={handleChange} required />
          <input style={inputStyle} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={inputStyle} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input style={inputStyle} name="practice_name" placeholder="Practice name" value={form.practice_name} onChange={handleChange} />
          <input style={inputStyle} name="website_url" placeholder="Website URL" value={form.website_url} onChange={handleChange} />
          <select style={inputStyle} name="budget_range" value={form.budget_range} onChange={handleChange}>
            <option value="">Budget range</option>
            <option value="$300 audit">$300 Growth Audit</option>
            <option value="$750 starter">$750 Starter System</option>
            <option value="$1500 full system">$1,500 Full Growth Machine</option>
          </select>
          <textarea style={textareaStyle} name="main_goal" placeholder="What is your biggest growth challenge?" value={form.main_goal} onChange={handleChange} />
          <button style={submitButtonStyle} type="submit">Submit Free Audit Request</button>
          {status && <p style={statusStyle}>{status}</p>}
        </form>
      </section>

      <footer style={footerStyle}>
        <div style={footerLogoStyle}>TG</div>
        <div style={footerContentStyle}>
          <strong>TheraGrowth AI</strong>
          <p style={footerTextStyle}>Helping therapists get more private-pay clients through websites, SEO, AI chat, CRM, and funnels.</p>
          <a style={footerInstagramStyle} href="https://instagram.com/theragrowth.ai" target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> Follow us on Instagram @theragrowth.ai
          </a>
        </div>
      </footer>
    </main>
  );
}

function ServiceCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={serviceCardStyle}>
      <h3 style={serviceTitleStyle}>{title}</h3>
      <p style={serviceTextStyle}>{text}</p>
    </div>
  );
}

function PriceCard({
  title,
  price,
  subtitle,
  features,
  paymentLink,
  featured,
}: {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  paymentLink: string;
  featured?: boolean;
}) {
  return (
    <div style={featured ? featuredPriceCardStyle : priceCardStyle}>
      {featured && <div style={popularBadgeStyle}>Most Popular</div>}
      <h3 style={priceTitleStyle}>{title}</h3>
      <p style={priceSubtitleStyle}>{subtitle}</p>
      <div style={priceStyle}>{price}</div>
      <ul style={priceListStyle}>
        {features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <a href={paymentLink} target="_blank" rel="noopener noreferrer" style={featured ? lightButtonStyle : primaryButtonStyle}>
        Pay Now
      </a>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

const gold = "#b8892e";
const black = "#111111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const pageStyle = { background: cream, color: black, minHeight: "100vh", fontFamily: "Arial, sans-serif" } as const;
const forceBannerStyle = { background: gold, color: black, textAlign: "center", padding: "8px", fontWeight: 900, letterSpacing: 1 } as const;
const headerStyle = { position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 6%", background: "rgba(247,241,232,.96)", borderBottom: "1px solid #e7d8c2" } as const;
const brandStyle = { display: "flex", gap: 12, alignItems: "center", textDecoration: "none", color: black } as const;
const logoBoxStyle = { width: 52, height: 52, borderRadius: "50%", background: black, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 800 } as const;
const brandNameStyle = { fontWeight: 900, fontSize: 18 } as const;
const brandSubStyle = { fontSize: 12, color: "#6b5b48" } as const;
const navStyle = { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" } as const;
const navLinkStyle = { color: black, textDecoration: "none", fontWeight: 800 } as const;
const instagramLinkStyle = { display: "inline-flex", alignItems: "center", gap: 8, color: black, textDecoration: "none", fontWeight: 900, border: "1px solid #d7c4a8", borderRadius: 999, padding: "10px 14px", background: soft } as const;
const heroStyle = { display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 40, padding: "80px 6%", alignItems: "center", scrollMarginTop: "120px" } as const;
const eyebrowStyle = { color: gold, textTransform: "uppercase", letterSpacing: 2, fontWeight: 900, fontSize: 13 } as const;
const h1Style = { fontFamily: "Georgia, serif", fontSize: "clamp(44px, 7vw, 86px)", lineHeight: .95, margin: "12px 0 24px" } as const;
const h2Style = { fontFamily: "Georgia, serif", fontSize: "clamp(34px, 5vw, 62px)", lineHeight: 1, margin: "10px 0 20px" } as const;
const leadStyle = { fontSize: 20, lineHeight: 1.7, color: "#3d3328" } as const;
const sectionLeadStyle = { fontSize: 19, lineHeight: 1.7, color: "#3d3328", maxWidth: 900 } as const;
const buttonRowStyle = { display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 } as const;
const primaryButtonStyle = { display: "inline-block", background: black, color: "white", padding: "16px 24px", borderRadius: 16, textDecoration: "none", fontWeight: 900 } as const;
const secondaryButtonStyle = { display: "inline-block", background: "#eadfce", color: black, padding: "16px 24px", borderRadius: 16, textDecoration: "none", fontWeight: 900 } as const;
const lightButtonStyle = { display: "inline-block", background: "white", color: black, padding: "16px 24px", borderRadius: 16, textDecoration: "none", fontWeight: 900 } as const;
const heroCardStyle = { background: soft, border: "1px solid #dfcaa8", borderRadius: 32, padding: 34, boxShadow: "0 20px 60px rgba(0,0,0,.08)" } as const;
const miniLogoStyle = { width: 72, height: 72, borderRadius: "50%", background: black, color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 900, marginBottom: 20 } as const;
const cardTitleStyle = { fontFamily: "Georgia, serif", fontSize: 34, lineHeight: 1.1 } as const;
const checkListStyle = { fontSize: 18, lineHeight: 2 } as const;
const sectionStyle = { padding: "70px 6%", background: cream } as const;
const sectionStyleWithScroll = { padding: "70px 6%", background: cream, scrollMarginTop: "120px" } as const;
const packagesSectionStyle = { padding: "70px 6%", background: "#f3eadc", scrollMarginTop: "120px" } as const;
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginTop: 28 } as const;
const problemCardStyle = { background: soft, border: "1px solid #e4d2b9", borderRadius: 22, padding: 24, fontWeight: 900, fontSize: 18 } as const;
const darkSectionStyle = { padding: "80px 6%", background: black, color: "white", scrollMarginTop: "120px" } as const;
const darkEyebrowStyle = { color: gold, textTransform: "uppercase", letterSpacing: 2, fontWeight: 900, fontSize: 13 } as const;
const darkH2Style = { fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, margin: "10px 0 30px" } as const;
const serviceGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 } as const;
const serviceCardStyle = { background: "#1c1c1c", border: "1px solid #3b3328", borderRadius: 24, padding: 28 } as const;
const serviceTitleStyle = { color: gold, fontSize: 24, marginBottom: 12 } as const;
const serviceTextStyle = { color: "#f4eadb", lineHeight: 1.7 } as const;
const pricingGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 30 } as const;
const priceCardStyle = { position: "relative", background: soft, border: "1px solid #e1cfb3", borderRadius: 28, padding: 30 } as const;
const featuredPriceCardStyle = { position: "relative", background: black, color: "white", border: "1px solid #111", borderRadius: 28, padding: 30, boxShadow: "0 24px 70px rgba(0,0,0,.16)" } as const;
const popularBadgeStyle = { display: "inline-block", background: gold, color: black, padding: "8px 12px", borderRadius: 999, fontWeight: 900, marginBottom: 16 } as const;
const priceTitleStyle = { fontSize: 26, marginBottom: 6 } as const;
const priceSubtitleStyle = { color: "#6b5b48", fontWeight: 800, margin: "0 0 12px" } as const;
const priceStyle = { fontFamily: "Georgia, serif", fontSize: 42, color: gold, marginBottom: 18, fontWeight: 900 } as const;
const priceListStyle = { lineHeight: 2, marginBottom: 22 } as const;
const pipelineStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginTop: 26 } as const;
const pipelineCardStyle = { background: black, color: "white", borderRadius: 18, padding: 20, fontWeight: 900, textAlign: "center" } as const;
const formSectionStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "80px 6%", background: soft, scrollMarginTop: "120px" } as const;
const formStyle = { display: "grid", gap: 14 } as const;
const inputStyle = { padding: 18, borderRadius: 14, border: "1px solid #d7c4a8", fontSize: 16, background: "#fffaf5" } as const;
const textareaStyle = { ...inputStyle, minHeight: 130 } as const;
const submitButtonStyle = { background: black, color: "white", border: "none", padding: 18, borderRadius: 16, fontWeight: 900, fontSize: 16, cursor: "pointer" } as const;
const statusStyle = { fontWeight: 800, color: gold } as const;
const footerStyle = { display: "flex", gap: 20, alignItems: "center", padding: "36px 6%", background: black, color: "white" } as const;
const footerLogoStyle = { width: 72, height: 72, borderRadius: "50%", background: "white", color: gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 900 } as const;
const footerContentStyle = { display: "grid", gap: 8 } as const;
const footerTextStyle = { color: "#d8d0c4", margin: 0 } as const;
const footerInstagramStyle = { display: "inline-flex", alignItems: "center", gap: 8, color: gold, textDecoration: "none", fontWeight: 900, width: "fit-content" } as const;
