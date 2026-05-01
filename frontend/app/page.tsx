const AUDIT_LINK = "https://buy.stripe.com/7sYcN70Mt7GIfvb6ln2sM00";
const SETUP_LINK = "https://buy.stripe.com/6oUbJ3br70egfvbbFH2sM01";
const MONTHLY_LINK = "https://buy.stripe.com/28E7sNbr79OQ6YFaBD2sM02";
const DEMO_LINK = "/therapists/jovonna-hale";

export default function Home() {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <div style={pillStyle}>TheraGrowth AI</div>

          <h1 style={titleStyle}>
            Premium Websites & Client Acquisition Systems for Therapists
          </h1>

          <p style={subtitleStyle}>
            We help therapists reduce dependence on directories by building
            elegant websites, consultation forms, intake systems, AI chat
            support, and CRM dashboards that convert visitors into direct
            inquiries.
          </p>

          <div style={buttonRowStyle}>
            <a href={AUDIT_LINK} target="_blank" rel="noopener noreferrer" style={primaryButtonStyle}>
              Buy $99 Growth Audit
            </a>

            <a href={DEMO_LINK} style={secondaryButtonStyle}>
              View Demo Therapist Site
            </a>
          </div>

          <p style={microTextStyle}>
            Built for solo therapists, counselors, psychologists, and private practices.
          </p>
        </div>

        <div style={panelStyle}>
          <h2 style={panelTitleStyle}>What We Build</h2>
          <div style={panelListStyle}>
            <div>✔ Premium therapist website</div>
            <div>✔ Consultation request form</div>
            <div>✔ Insurance inquiry flow</div>
            <div>✔ Secure lead dashboard</div>
            <div>✔ Follow-up tracking CRM</div>
            <div>✔ AI chat assistant setup</div>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={kickerStyle}>Why therapists need this</p>
        <h2 style={sectionTitleStyle}>
          Most Therapist Websites Do Not Convert Visitors Into Clients
        </h2>

        <div style={gridStyle}>
          <Card title="Too dependent on directories" text="Many therapists rely heavily on Psychology Today, Rula, Headway, SonderMind, and other platforms instead of owning direct client flow." />
          <Card title="Weak online first impression" text="An outdated or generic website can reduce trust before a potential client ever reaches out." />
          <Card title="No real intake system" text="Without forms, follow-up tracking, and simple next steps, interested clients disappear." />
        </div>
      </section>

      <section style={darkSectionStyle}>
        <p style={darkKickerStyle}>Our solution</p>
        <h2 style={darkTitleStyle}>
          We Turn Therapist Websites Into Client Acquisition Systems
        </h2>

        <p style={darkTextStyle}>
          TheraGrowth AI combines premium design, lead capture, intake routing,
          CRM tracking, and automation so therapists can look professional,
          respond faster, and grow with more control.
        </p>

        <div style={darkGridStyle}>
          <a href={SETUP_LINK} target="_blank" rel="noopener noreferrer" style={clickableDarkCardStyle}>
            <h3 style={darkCardTitleStyle}>Website</h3>
            <p style={darkCardTextStyle}>Premium therapist website setup. Click to start with the $500 setup deposit.</p>
          </a>

          <a href={AUDIT_LINK} target="_blank" rel="noopener noreferrer" style={clickableDarkCardStyle}>
            <h3 style={darkCardTitleStyle}>Intake</h3>
            <p style={darkCardTextStyle}>Forms for consultation and insurance requests. Click to buy the $99 growth audit.</p>
          </a>

          <a href={SETUP_LINK} target="_blank" rel="noopener noreferrer" style={clickableDarkCardStyle}>
            <h3 style={darkCardTitleStyle}>CRM</h3>
            <p style={darkCardTextStyle}>Dashboard to track leads, status, notes, and follow-up. Click to start setup.</p>
          </a>

          <a href={MONTHLY_LINK} target="_blank" rel="noopener noreferrer" style={clickableDarkCardStyle}>
            <h3 style={darkCardTitleStyle}>Automation</h3>
            <p style={darkCardTextStyle}>AI chat and follow-up workflows as the practice grows. Click for monthly partner plan.</p>
          </a>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={kickerStyle}>Packages</p>
        <h2 style={sectionTitleStyle}>Simple Offers for Private Practices</h2>

        <div style={pricingGridStyle}>
          <div style={pricingCardStyle}>
            <h3 style={pricingTitleStyle}>Starter Website</h3>
            <p style={pricingTextStyle}>
              For therapists who need a premium online presence and consultation form.
            </p>
            <p style={priceStyle}>Starting at $1,500</p>
            <p style={smallNoteStyle}>Start today with $500 setup deposit.</p>
            <ul style={listStyle}>
              <li>Premium homepage</li>
              <li>Consultation form</li>
              <li>Mobile-ready design</li>
              <li>Basic SEO structure</li>
            </ul>
            <a href={SETUP_LINK} target="_blank" rel="noopener noreferrer" style={pricingButtonStyle}>
              Pay $500 Deposit
            </a>
          </div>

          <div style={featuredPricingCardStyle}>
            <h3 style={pricingTitleLightStyle}>Growth System</h3>
            <p style={pricingTextLightStyle}>
              For therapists who want website, intake, CRM, and automation.
            </p>
            <p style={priceLightStyle}>Starting at $3,000</p>
            <p style={smallNoteLightStyle}>Start today with $500 setup deposit.</p>
            <ul style={listLightStyle}>
              <li>Premium website</li>
              <li>Insurance inquiry flow</li>
              <li>CRM lead dashboard</li>
              <li>AI chat setup</li>
              <li>Follow-up tracking</li>
            </ul>
            <a href={SETUP_LINK} target="_blank" rel="noopener noreferrer" style={featuredButtonStyle}>
              Pay $500 Deposit
            </a>
          </div>

          <div style={pricingCardStyle}>
            <h3 style={pricingTitleStyle}>Monthly Growth Partner</h3>
            <p style={pricingTextStyle}>
              For practices that want ongoing updates, support, automation, and growth improvement.
            </p>
            <p style={priceStyle}>$997/month</p>
            <ul style={listStyle}>
              <li>Website updates</li>
              <li>CRM support</li>
              <li>SEO improvements</li>
              <li>Automation improvements</li>
            </ul>
            <a href={MONTHLY_LINK} target="_blank" rel="noopener noreferrer" style={pricingButtonStyle}>
              Become Monthly Partner
            </a>
          </div>
        </div>
      </section>

      <section style={splitSectionStyle}>
        <div>
          <p style={kickerStyle}>Demo</p>
          <h2 style={sectionTitleStyle}>See What We Can Build for a Therapist</h2>
          <p style={bodyTextStyle}>
            View a live demo of a premium therapist website with consultation form,
            insurance section, services, FAQ, and CRM-ready lead capture.
          </p>

          <a href={DEMO_LINK} style={primaryButtonStyle}>
            View Demo Site
          </a>
        </div>

        <div style={demoBoxStyle}>
          <h3 style={{ fontSize: "26px", marginTop: 0 }}>Example Therapist Site</h3>
          <p style={bodyTextStyle}>
            A luxury private-practice layout built to help prospective clients feel trust,
            understand services, and submit consultation requests.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={kickerStyle}>How it works</p>
        <h2 style={sectionTitleStyle}>From Audit to Launch</h2>

        <div style={stepsGridStyle}>
          <Step number="01" title="Buy Growth Audit" text="The therapist purchases a $99 audit so we can review their current online presence and identify missed conversion opportunities." />
          <Step number="02" title="Start With Deposit" text="If they want to move forward, they pay the $500 setup deposit and we begin the website and intake system build." />
          <Step number="03" title="Launch & Improve" text="The therapist starts receiving direct inquiries while we improve conversion, SEO, follow-up, and automation." />
        </div>
      </section>

      <section style={sectionStyle}>
        <p style={kickerStyle}>FAQ</p>
        <h2 style={sectionTitleStyle}>Common Questions</h2>

        <div style={faqGridStyle}>
          <FAQ q="Are you providing therapy?" a="No. TheraGrowth AI provides websites, automation, CRM, and marketing systems for therapists. Clinical services are provided only by licensed therapists." />
          <FAQ q="Do therapists need their own Stripe?" a="Yes. Therapy payments should go through the therapist’s own Stripe account. TheraGrowth AI payments for website and growth services go through our business account." />
          <FAQ q="Will this guarantee clients?" a="No ethical marketing service should guarantee clients. We build systems that improve trust, visibility, conversion, and follow-up." />
          <FAQ q="Can this work with an existing website?" a="Yes. We can rebuild, improve, or connect systems to an existing website depending on the therapist’s needs." />
        </div>
      </section>

      <section style={ctaStyle}>
        <h2 style={ctaTitleStyle}>
          Ready to Turn Your Therapy Website Into a Growth System?
        </h2>
        <p style={ctaTextStyle}>
          Start with a paid website growth audit and see where your practice is losing direct client inquiries.
        </p>

        <a href={AUDIT_LINK} target="_blank" rel="noopener noreferrer" style={lightButtonStyle}>
          Buy $99 Growth Audit
        </a>
      </section>

      <section style={footerStyle}>
        <strong>Compliance Note:</strong> TheraGrowth AI is a technology, website,
        automation, and business growth service for therapists. We do not provide
        therapy, diagnosis, crisis support, or clinical treatment recommendations.
      </section>
    </main>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={cardStyle}>
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardTextStyle}>{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div style={stepCardStyle}>
      <div style={stepNumberStyle}>{number}</div>
      <h3 style={cardTitleStyle}>{title}</h3>
      <p style={cardTextStyle}>{text}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div style={faqCardStyle}>
      <h3 style={faqQuestionStyle}>{q}</h3>
      <p style={faqAnswerStyle}>{a}</p>
    </div>
  );
}

const pageStyle = { minHeight: "100vh", background: "#f4f1ec", padding: "42px 24px", fontFamily: "Arial, sans-serif", color: "#151515" } as const;
const heroStyle = { maxWidth: "1180px", margin: "0 auto", background: "#fffdf8", borderRadius: "34px", padding: "64px", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "52px", alignItems: "center", boxShadow: "0 28px 80px rgba(50, 35, 20, 0.08)" } as const;
const pillStyle = { display: "inline-block", background: "#efe7da", color: "#4b3a2a", padding: "12px 22px", borderRadius: "999px", fontWeight: 900, marginBottom: "28px" } as const;
const titleStyle = { fontSize: "62px", lineHeight: "1.02", margin: 0, fontWeight: 900, letterSpacing: "-1.5px" } as const;
const subtitleStyle = { fontSize: "21px", lineHeight: 1.75, color: "#51483f", marginTop: "24px" } as const;
const buttonRowStyle = { display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "34px" } as const;
const primaryButtonStyle = { background: "#151515", color: "white", padding: "16px 24px", borderRadius: "16px", textDecoration: "none", fontWeight: 900, display: "inline-block" } as const;
const secondaryButtonStyle = { background: "#efe7da", color: "#151515", padding: "16px 24px", borderRadius: "16px", textDecoration: "none", fontWeight: 900, display: "inline-block" } as const;
const microTextStyle = { marginTop: "28px", color: "#6b5f53", fontWeight: 800 } as const;
const panelStyle = { background: "#f7efe5", border: "1px solid #eadcc9", borderRadius: "30px", padding: "40px" } as const;
const panelTitleStyle = { fontSize: "32px", marginTop: 0, fontWeight: 900 } as const;
const panelListStyle = { display: "grid", gap: "16px", color: "#51483f", fontWeight: 800, lineHeight: 1.6 } as const;
const sectionStyle = { maxWidth: "1180px", margin: "32px auto 0", background: "#fffdf8", borderRadius: "32px", padding: "50px", boxShadow: "0 20px 70px rgba(50, 35, 20, 0.05)" } as const;
const kickerStyle = { color: "#7c6550", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "13px" } as const;
const sectionTitleStyle = { fontSize: "44px", lineHeight: 1.1, marginTop: 0, marginBottom: "22px", fontWeight: 900 } as const;
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "18px" } as const;
const cardStyle = { border: "1px solid #eadcc9", borderRadius: "22px", padding: "26px", background: "#fffaf2" } as const;
const cardTitleStyle = { marginTop: 0, fontSize: "22px", fontWeight: 900 } as const;
const cardTextStyle = { color: "#5f554b", lineHeight: 1.7, marginBottom: 0 } as const;
const darkSectionStyle = { maxWidth: "1180px", margin: "32px auto 0", background: "#151515", color: "white", borderRadius: "32px", padding: "52px" } as const;
const darkKickerStyle = { color: "#d8c6ae", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "13px" } as const;
const darkTitleStyle = { fontSize: "44px", marginTop: 0, marginBottom: "18px", fontWeight: 900 } as const;
const darkTextStyle = { color: "#e8dfd3", fontSize: "18px", lineHeight: 1.8, maxWidth: "820px" } as const;
const darkGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "18px", marginTop: "28px" } as const;
const clickableDarkCardStyle = { background: "rgba(255,255,255,0.08)", padding: "24px", borderRadius: "20px", color: "white", textDecoration: "none", display: "block", cursor: "pointer" } as const;
const darkCardTitleStyle = { marginTop: 0, fontSize: "22px", fontWeight: 900 } as const;
const darkCardTextStyle = { color: "#e8dfd3", lineHeight: 1.7, marginBottom: 0 } as const;
const pricingGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: "20px" } as const;
const pricingCardStyle = { background: "#fffaf2", border: "1px solid #eadcc9", borderRadius: "26px", padding: "30px" } as const;
const featuredPricingCardStyle = { background: "#151515", color: "white", borderRadius: "26px", padding: "30px" } as const;
const pricingTitleStyle = { fontSize: "26px", fontWeight: 900, marginTop: 0 } as const;
const pricingTitleLightStyle = { fontSize: "26px", fontWeight: 900, marginTop: 0, color: "white" } as const;
const pricingTextStyle = { lineHeight: 1.7, color: "#5f554b" } as const;
const pricingTextLightStyle = { lineHeight: 1.7, color: "#e8dfd3" } as const;
const priceStyle = { fontSize: "26px", fontWeight: 900, marginTop: "20px" } as const;
const priceLightStyle = { fontSize: "26px", fontWeight: 900, marginTop: "20px", color: "white" } as const;
const smallNoteStyle = { color: "#6b5f53", fontWeight: 800 } as const;
const smallNoteLightStyle = { color: "#e8dfd3", fontWeight: 800 } as const;
const listStyle = { color: "#5f554b", lineHeight: 1.9, paddingLeft: "20px" } as const;
const listLightStyle = { color: "#e8dfd3", lineHeight: 1.9, paddingLeft: "20px" } as const;
const pricingButtonStyle = { display: "inline-block", marginTop: "18px", background: "#efe7da", color: "#151515", padding: "14px 20px", borderRadius: "14px", textDecoration: "none", fontWeight: 900 } as const;
const featuredButtonStyle = { display: "inline-block", marginTop: "18px", background: "white", color: "#151515", padding: "14px 20px", borderRadius: "14px", textDecoration: "none", fontWeight: 900 } as const;
const splitSectionStyle = { maxWidth: "1180px", margin: "32px auto 0", background: "#fffdf8", borderRadius: "32px", padding: "50px", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: "40px", alignItems: "center" } as const;
const bodyTextStyle = { color: "#51483f", lineHeight: 1.8, fontSize: "18px" } as const;
const demoBoxStyle = { background: "#f7efe5", border: "1px solid #eadcc9", borderRadius: "26px", padding: "34px" } as const;
const stepsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "18px" } as const;
const stepCardStyle = { background: "#fffaf2", border: "1px solid #eadcc9", borderRadius: "24px", padding: "28px" } as const;
const stepNumberStyle = { width: "48px", height: "48px", borderRadius: "999px", background: "#151515", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, marginBottom: "18px" } as const;
const faqGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "18px" } as const;
const faqCardStyle = { background: "#fffaf2", border: "1px solid #eadcc9", borderRadius: "22px", padding: "24px" } as const;
const faqQuestionStyle = { marginTop: 0, fontWeight: 900, fontSize: "19px" } as const;
const faqAnswerStyle = { color: "#5f554b", lineHeight: 1.7, marginBottom: 0 } as const;
const ctaStyle = { maxWidth: "1180px", margin: "32px auto 0", background: "#151515", color: "white", borderRadius: "32px", padding: "56px", textAlign: "center" } as const;
const ctaTitleStyle = { fontSize: "44px", marginTop: 0, marginBottom: "14px", fontWeight: 900 } as const;
const ctaTextStyle = { color: "#e8dfd3", fontSize: "19px", lineHeight: 1.7, maxWidth: "680px", margin: "0 auto 28px" } as const;
const lightButtonStyle = { background: "white", color: "#151515", padding: "16px 24px", borderRadius: "16px", textDecoration: "none", fontWeight: 900, display: "inline-block" } as const;
const footerStyle = { maxWidth: "1180px", margin: "32px auto 0", background: "#fffdf8", color: "#51483f", borderRadius: "24px", padding: "28px", lineHeight: 1.8, border: "1px solid #eadcc9" } as const;