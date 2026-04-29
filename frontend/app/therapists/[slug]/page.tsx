"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function TherapistWebsitePage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    insurance_provider: "",
    support_needed: "",
  });

  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting...");

    const { error } = await supabase.from("therapist_leads").insert([
      {
        therapist_slug: "jovonna-hale",
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        insurance_provider: form.insurance_provider,
        support_needed: form.support_needed,
        status: "new",
        priority: "warm",
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setStatus(
      "Request submitted successfully. The practice will follow up with next steps."
    );

    setForm({
      full_name: "",
      email: "",
      phone: "",
      insurance_provider: "",
      support_needed: "",
    });
  }

  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div>
          <div style={pillStyle}>Private Therapy • Colorado & Washington</div>

          <h1 style={titleStyle}>
            Therapy That Helps You Feel Like Yourself Again
          </h1>

          <p style={subtitleStyle}>
            Private, compassionate therapy for anxiety, trauma, burnout,
            relationship stress, and major life transitions with Jovonna Hale,
            LCSW, LICSW.
          </p>

          <div style={buttonRowStyle}>
            <a href="#consultation" style={primaryButtonStyle}>
              Book Private Consultation
            </a>

            <a href="#insurance" style={secondaryButtonStyle}>
              Check Insurance Eligibility
            </a>
          </div>

          <p style={microTrustStyle}>
            Licensed clinical therapist • Trauma-informed care • Telehealth
            available
          </p>
        </div>

        <div style={profileCardStyle}>
          <h2 style={profileTitleStyle}>Jovonna Hale, LCSW, LICSW</h2>

          <p style={profileTextStyle}>
            A warm, grounded, and clinically experienced therapist helping adults
            navigate anxiety, trauma recovery, burnout, relationships, and life
            changes with clarity and confidence.
          </p>

          <div style={miniCardStyle}>
            <strong>Confidential Intake Assistant</strong>
            <p style={{ marginBottom: 0, color: "#475569", lineHeight: 1.7 }}>
              Ask about services, insurance, consultation requests,
              availability, and next steps.
            </p>
          </div>
        </div>
      </section>

      <section style={trustStripStyle}>
        <span>Licensed Clinical Therapist</span>
        <span>Serving Colorado + Washington</span>
        <span>Trauma-Informed Care</span>
        <span>Warm, Judgment-Free Support</span>
        <span>Insurance Options Available</span>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>
            You may benefit from therapy if you feel...
          </p>
          <h2 style={sectionTitleStyle}>
            Support for the Parts of Life That Feel Heavy
          </h2>
        </div>

        <div style={gridStyle}>
          <FeatureCard
            title="Anxiety & Overthinking"
            text="Reduce constant worry, racing thoughts, panic, and emotional exhaustion."
          />
          <FeatureCard
            title="Trauma Recovery"
            text="Heal from painful experiences and rebuild safety, trust, and stability."
          />
          <FeatureCard
            title="Stress & Burnout"
            text="Recover from overwhelm, emotional fatigue, and chronic pressure."
          />
          <FeatureCard
            title="Relationships"
            text="Improve communication, boundaries, attachment patterns, and emotional connection."
          />
          <FeatureCard
            title="Life Transitions"
            text="Navigate divorce, grief, relocation, career changes, motherhood, or identity shifts."
          />
          <FeatureCard
            title="Confidence & Self-Worth"
            text="Build resilience, self-trust, emotional strength, and clarity."
          />
        </div>
      </section>

      <section style={splitSectionStyle}>
        <div>
          <p style={sectionKickerStyle}>A personalized therapy experience</p>
          <h2 style={sectionTitleStyle}>
            Therapy Should Feel Safe, Thoughtful, and Human
          </h2>
        </div>

        <div>
          <p style={bodyTextStyle}>
            Therapy is not one-size-fits-all. Jovonna provides thoughtful,
            evidence-informed support tailored to your unique history, goals,
            and emotional needs.
          </p>

          <p style={bodyTextStyle}>
            Sessions are collaborative, compassionate, and focused on helping you
            create lasting internal change — not temporary coping alone.
          </p>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>Simple next steps</p>
          <h2 style={sectionTitleStyle}>A Calm Way to Begin</h2>
        </div>

        <div style={stepsGridStyle}>
          <StepCard
            number="01"
            title="Submit Consultation Request"
            text="Share your contact information, needs, and insurance details if applicable."
          />
          <StepCard
            number="02"
            title="Receive Follow-Up"
            text="The practice reviews your request and follows up with next steps."
          />
          <StepCard
            number="03"
            title="Begin Personalized Support"
            text="If it is a good fit, you can begin therapy in a professional, confidential setting."
          />
        </div>
      </section>

      <section id="insurance" style={darkSectionStyle}>
        <div>
          <p style={darkKickerStyle}>Insurance & private pay</p>
          <h2 style={darkTitleStyle}>Check Eligibility Before Scheduling</h2>
        </div>

        <p style={darkTextStyle}>
          Submit your insurance details and care needs so eligibility, benefits,
          private-pay options, and next steps can be reviewed before scheduling.
        </p>

        <div style={darkGridStyle}>
          <a href="#consultation" style={darkMiniCardLinkStyle}>
            Insurance screening available
          </a>

          <a href="#services" style={darkMiniCardLinkStyle}>
            Private-pay options
          </a>

          <a href="#consultation" style={darkMiniCardLinkStyle}>
            Eligibility verification support
          </a>
        </div>
      </section>

      <section id="services" style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>Services & private-pay options</p>
          <h2 style={sectionTitleStyle}>Clear Options Before You Begin</h2>
          <p style={bodyTextStyle}>
            These service options can be reviewed and customized before payments
            are connected. Stripe can later be linked to approved private-pay
            options.
          </p>
        </div>

        <div style={pricingGridStyle}>
          <div style={pricingCardStyle}>
            <h3 style={pricingTitleStyle}>Initial Consultation</h3>
            <p style={pricingTextStyle}>
              A first step to discuss fit, needs, availability, insurance, and
              next steps.
            </p>
            <p style={pricingPriceStyle}>Price TBD</p>
            <a href="#consultation" style={pricingButtonStyle}>
              Request Consultation
            </a>
          </div>

          <div style={pricingCardFeaturedStyle}>
            <h3 style={pricingTitleStyle}>Individual Therapy Session</h3>
            <p style={pricingTextStyle}>
              Personalized therapy support for anxiety, trauma, stress,
              relationships, and life transitions.
            </p>
            <p style={pricingPriceStyle}>Private Pay TBD</p>
            <a href="#consultation" style={pricingButtonDarkStyle}>
              Start Intake Request
            </a>
          </div>

          <div style={pricingCardStyle}>
            <h3 style={pricingTitleStyle}>Insurance Intake Review</h3>
            <p style={pricingTextStyle}>
              Submit insurance details so eligibility, benefits, and possible
              next steps can be reviewed.
            </p>
            <p style={pricingPriceStyle}>No payment yet</p>
            <a href="#consultation" style={pricingButtonStyle}>
              Check Eligibility
            </a>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>Why clients choose Jovonna</p>
          <h2 style={sectionTitleStyle}>
            Warm Clinical Care With Practical Support
          </h2>
        </div>

        <div style={gridStyle}>
          {[
            "Warm, grounded, judgment-free presence",
            "Licensed in multiple states",
            "Trauma-informed care",
            "Deep emotional insight + practical tools",
            "Private, personalized experience",
            "Focused on real healing and progress",
          ].map((item) => (
            <div key={item} style={checkCardStyle}>
              ✔ {item}
            </div>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>Client-centered care</p>
          <h2 style={sectionTitleStyle}>
            A Space to Feel Heard and Supported
          </h2>
        </div>

        <div style={testimonialGridStyle}>
          <Testimonial text="A calm, supportive space to work through difficult emotions." />
          <Testimonial text="Professional, warm, and deeply thoughtful care." />
          <Testimonial text="Helpful support for anxiety, stress, and life transitions." />
        </div>

        <p style={smallNoteStyle}>
          Testimonials should only be displayed if they comply with
          professional, ethical, and platform-specific guidance.
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <p style={sectionKickerStyle}>Questions before starting?</p>
          <h2 style={sectionTitleStyle}>Frequently Asked Questions</h2>
        </div>

        <div style={faqGridStyle}>
          <FAQ
            q="Do you offer telehealth?"
            a="Yes. Virtual therapy options are available for eligible clients in states where Jovonna is licensed."
          />
          <FAQ
            q="Do you accept insurance?"
            a="Insurance screening can be submitted through the consultation form so benefits and eligibility can be reviewed."
          />
          <FAQ
            q="What if I have never done therapy before?"
            a="That is completely okay. The consultation process helps clarify needs, goals, and whether the practice is a good fit."
          />
          <FAQ
            q="Can therapy help anxiety?"
            a="Therapy can help many clients understand anxiety patterns, reduce overwhelm, and build healthier coping and emotional regulation skills."
          />
          <FAQ
            q="How soon can I start?"
            a="Availability may vary. Submit a request and the practice can follow up with next steps."
          />
          <FAQ
            q="Is this for emergencies?"
            a="No. If you are experiencing a mental health emergency, call 988 or local emergency services immediately."
          />
        </div>
      </section>

      <section id="consultation" style={consultationStyle}>
        <div>
          <p style={sectionKickerStyle}>Start privately</p>
          <h2 style={sectionTitleStyle}>Request a Consultation</h2>

          <p style={bodyTextStyle}>
            Complete the form below and the request will be reviewed for next
            steps. This form is for consultation and intake coordination only.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            placeholder="Full name"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            style={inputStyle}
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            style={inputStyle}
            placeholder="Insurance provider"
            value={form.insurance_provider}
            onChange={(e) =>
              setForm({ ...form, insurance_provider: e.target.value })
            }
          />

          <textarea
            style={textareaStyle}
            placeholder="What support are you looking for?"
            value={form.support_needed}
            onChange={(e) =>
              setForm({ ...form, support_needed: e.target.value })
            }
            required
          />

          <button type="submit" style={submitButtonStyle}>
            Submit Consultation Request
          </button>
        </form>

        {status && (
          <p style={{ marginTop: "18px", fontWeight: 900, color: "#166534" }}>
            {status}
          </p>
        )}
      </section>

      <section style={ctaStyle}>
        <h2 style={ctaTitleStyle}>You Don’t Have to Carry It Alone</h2>
        <p style={ctaTextStyle}>
          If anxiety, trauma, stress, or emotional overwhelm has been weighing on
          you, support is available.
        </p>
        <a href="#consultation" style={lightButtonStyle}>
          Schedule Consultation
        </a>
      </section>

      <section style={footerStyle}>
        <strong>Clinical & Crisis Note:</strong> This website helps prospective
        clients learn about services, request consultations, and begin the intake
        process. Clinical therapy services are provided directly by Jovonna Hale,
        LCSW, LICSW after appropriate screening, consent, and professional
        intake.
        <br />
        <br />
        If you are experiencing a mental health emergency, call 988 or local
        emergency services immediately.
      </section>
    </main>
  );
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={featureCardStyle}>
      <h3 style={featureTitleStyle}>{title}</h3>
      <p style={featureTextStyle}>{text}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div style={stepCardStyle}>
      <div style={stepNumberStyle}>{number}</div>
      <h3 style={featureTitleStyle}>{title}</h3>
      <p style={featureTextStyle}>{text}</p>
    </div>
  );
}

function Testimonial({ text }: { text: string }) {
  return (
    <div style={testimonialCardStyle}>
      <p style={testimonialTextStyle}>“{text}”</p>
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

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f1ec",
  padding: "42px 24px",
  fontFamily: "Arial, sans-serif",
  color: "#151515",
} as const;

const heroStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  background: "#fffdf8",
  borderRadius: "34px",
  padding: "64px",
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: "52px",
  alignItems: "center",
  boxShadow: "0 28px 80px rgba(50, 35, 20, 0.08)",
} as const;

const pillStyle = {
  display: "inline-block",
  background: "#efe7da",
  color: "#4b3a2a",
  padding: "12px 22px",
  borderRadius: "999px",
  fontWeight: 900,
  marginBottom: "28px",
} as const;

const titleStyle = {
  fontSize: "64px",
  lineHeight: "1.02",
  margin: 0,
  fontWeight: 900,
  letterSpacing: "-1.5px",
} as const;

const subtitleStyle = {
  fontSize: "21px",
  lineHeight: 1.75,
  color: "#51483f",
  marginTop: "24px",
} as const;

const buttonRowStyle = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  marginTop: "34px",
} as const;

const primaryButtonStyle = {
  background: "#151515",
  color: "white",
  padding: "16px 24px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const secondaryButtonStyle = {
  background: "#efe7da",
  color: "#151515",
  padding: "16px 24px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const microTrustStyle = {
  marginTop: "28px",
  color: "#6b5f53",
  fontWeight: 800,
} as const;

const profileCardStyle = {
  background: "#f7efe5",
  border: "1px solid #eadcc9",
  borderRadius: "30px",
  padding: "40px",
} as const;

const profileTitleStyle = {
  fontSize: "32px",
  margin: 0,
  fontWeight: 900,
} as const;

const profileTextStyle = {
  color: "#51483f",
  lineHeight: 1.75,
  fontSize: "18px",
} as const;

const miniCardStyle = {
  background: "#fffdf8",
  borderRadius: "22px",
  padding: "24px",
  marginTop: "26px",
} as const;

const trustStripStyle = {
  maxWidth: "1180px",
  margin: "26px auto 0",
  background: "#151515",
  color: "white",
  borderRadius: "26px",
  padding: "22px 26px",
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
  justifyContent: "center",
  fontWeight: 800,
} as const;

const sectionStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#fffdf8",
  borderRadius: "32px",
  padding: "50px",
  boxShadow: "0 20px 70px rgba(50, 35, 20, 0.05)",
} as const;

const sectionHeaderStyle = {
  maxWidth: "760px",
  marginBottom: "28px",
} as const;

const sectionKickerStyle = {
  color: "#7c6550",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: "13px",
} as const;

const sectionTitleStyle = {
  fontSize: "44px",
  lineHeight: 1.1,
  marginTop: 0,
  marginBottom: "18px",
  fontWeight: 900,
} as const;

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "18px",
} as const;

const featureCardStyle = {
  border: "1px solid #eadcc9",
  borderRadius: "22px",
  padding: "26px",
  background: "#fffaf2",
} as const;

const featureTitleStyle = {
  marginTop: 0,
  fontSize: "22px",
  fontWeight: 900,
} as const;

const featureTextStyle = {
  color: "#5f554b",
  lineHeight: 1.7,
  marginBottom: 0,
} as const;

const splitSectionStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#fffdf8",
  borderRadius: "32px",
  padding: "50px",
  display: "grid",
  gridTemplateColumns: "0.85fr 1.15fr",
  gap: "44px",
} as const;

const bodyTextStyle = {
  color: "#51483f",
  lineHeight: 1.8,
  fontSize: "18px",
} as const;

const stepsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "18px",
} as const;

const stepCardStyle = {
  background: "#f7efe5",
  borderRadius: "24px",
  padding: "28px",
} as const;

const stepNumberStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "999px",
  background: "#151515",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  marginBottom: "18px",
} as const;

const darkSectionStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#151515",
  color: "white",
  borderRadius: "32px",
  padding: "52px",
} as const;

const darkKickerStyle = {
  color: "#d8c6ae",
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: "13px",
} as const;

const darkTitleStyle = {
  fontSize: "44px",
  marginTop: 0,
  marginBottom: "18px",
  fontWeight: 900,
} as const;

const darkTextStyle = {
  color: "#e8dfd3",
  fontSize: "18px",
  lineHeight: 1.8,
  maxWidth: "780px",
} as const;

const darkGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: "18px",
  marginTop: "28px",
} as const;

const darkMiniCardLinkStyle = {
  background: "rgba(255,255,255,0.08)",
  padding: "24px",
  borderRadius: "20px",
  fontWeight: 900,
  color: "white",
  textDecoration: "none",
  display: "block",
} as const;

const pricingGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "20px",
  marginTop: "30px",
} as const;

const pricingCardStyle = {
  background: "#fffaf2",
  border: "1px solid #eadcc9",
  borderRadius: "26px",
  padding: "30px",
} as const;

const pricingCardFeaturedStyle = {
  background: "#151515",
  color: "white",
  borderRadius: "26px",
  padding: "30px",
} as const;

const pricingTitleStyle = {
  fontSize: "24px",
  fontWeight: 900,
  marginTop: 0,
} as const;

const pricingTextStyle = {
  lineHeight: 1.7,
  color: "inherit",
  opacity: 0.85,
} as const;

const pricingPriceStyle = {
  fontSize: "22px",
  fontWeight: 900,
  marginTop: "22px",
} as const;

const pricingButtonStyle = {
  display: "inline-block",
  marginTop: "20px",
  background: "#efe7da",
  color: "#151515",
  padding: "14px 20px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const pricingButtonDarkStyle = {
  display: "inline-block",
  marginTop: "20px",
  background: "white",
  color: "#151515",
  padding: "14px 20px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: 900,
} as const;

const checkCardStyle = {
  background: "#fffaf2",
  border: "1px solid #eadcc9",
  borderRadius: "20px",
  padding: "22px",
  fontWeight: 900,
  color: "#3f3329",
} as const;

const testimonialGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
  gap: "18px",
} as const;

const testimonialCardStyle = {
  background: "#f7efe5",
  borderRadius: "24px",
  padding: "30px",
} as const;

const testimonialTextStyle = {
  fontSize: "20px",
  lineHeight: 1.6,
  color: "#3f3329",
  margin: 0,
  fontWeight: 700,
} as const;

const smallNoteStyle = {
  marginTop: "18px",
  color: "#7c6550",
  fontSize: "14px",
} as const;

const faqGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "18px",
} as const;

const faqCardStyle = {
  background: "#fffaf2",
  border: "1px solid #eadcc9",
  borderRadius: "22px",
  padding: "24px",
} as const;

const faqQuestionStyle = {
  marginTop: 0,
  fontWeight: 900,
  fontSize: "19px",
} as const;

const faqAnswerStyle = {
  color: "#5f554b",
  lineHeight: 1.7,
  marginBottom: 0,
} as const;

const consultationStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#fffdf8",
  borderRadius: "32px",
  padding: "50px",
  display: "grid",
  gridTemplateColumns: "0.85fr 1.15fr",
  gap: "40px",
} as const;

const formStyle = {
  display: "grid",
  gap: "16px",
} as const;

const inputStyle = {
  width: "100%",
  padding: "18px 20px",
  border: "1px solid #eadcc9",
  borderRadius: "16px",
  fontSize: "16px",
  outline: "none",
  background: "#fffaf2",
} as const;

const textareaStyle = {
  width: "100%",
  minHeight: "150px",
  padding: "18px 20px",
  border: "1px solid #eadcc9",
  borderRadius: "16px",
  fontSize: "16px",
  outline: "none",
  background: "#fffaf2",
} as const;

const submitButtonStyle = {
  background: "#151515",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: "16px",
  fontWeight: 900,
  fontSize: "16px",
  cursor: "pointer",
} as const;

const ctaStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#151515",
  color: "white",
  borderRadius: "32px",
  padding: "56px",
  textAlign: "center",
} as const;

const ctaTitleStyle = {
  fontSize: "44px",
  marginTop: 0,
  marginBottom: "14px",
  fontWeight: 900,
} as const;

const ctaTextStyle = {
  color: "#e8dfd3",
  fontSize: "19px",
  lineHeight: 1.7,
  maxWidth: "680px",
  margin: "0 auto 28px",
} as const;

const lightButtonStyle = {
  background: "white",
  color: "#151515",
  padding: "16px 24px",
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: 900,
  display: "inline-block",
} as const;

const footerStyle = {
  maxWidth: "1180px",
  margin: "32px auto 0",
  background: "#fffdf8",
  color: "#51483f",
  borderRadius: "24px",
  padding: "28px",
  lineHeight: 1.8,
  border: "1px solid #eadcc9",
} as const;