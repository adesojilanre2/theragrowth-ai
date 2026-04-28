export default function Home() {
  const auditLink = "https://buy.stripe.com/7sYcN70Mt7GIfvb6ln2sM00";
  const setupLink = "https://buy.stripe.com/6oUbJ3br70egfvbbFH2sM01";
  const monthlyLink = "https://buy.stripe.com/28E7sNbr79OQ6YFaBD2sM02";

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.badge}>Premium AI Growth Systems for Therapists</p>
          <h1 style={styles.h1}>Grow Your Therapy Practice Elegantly</h1>
          <p style={styles.sub}>
            Attract more aligned clients, improve follow-up, and turn your website
            into a calm, professional client acquisition system.
          </p>

          <div style={styles.buttons}>
            <a href={auditLink} style={styles.primary}>Get $99 Growth Audit</a>
            <a href={setupLink} style={styles.secondary}>Start $500 Setup</a>
          </div>

          <p style={styles.note}>
            Built for therapists, counselors, LCSWs, telehealth clinicians, and private practices.
          </p>
        </div>

        <div style={styles.panel}>
          <h2>What We Handle</h2>
          <ul style={styles.list}>
            <li>Premium website positioning</li>
            <li>Lead capture and intake flow</li>
            <li>AI-assisted content ideas</li>
            <li>Follow-up and conversion support</li>
            <li>Monthly growth reporting</li>
          </ul>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>For Therapists Who Want Growth Without Feeling Salesy</h2>
        <p style={styles.text}>
          TheraGrowth AI helps therapists build ethical, professional growth systems
          that increase inquiries while preserving trust, warmth, and clinical credibility.
        </p>
      </section>

      <section style={styles.cards}>
        <div style={styles.card}>
          <p style={styles.kicker}>Concierge Audit</p>
          <h3 style={styles.price}>$99</h3>
          <p style={styles.text}>A personalized review of your website, messaging, visibility, and missed lead opportunities.</p>
          <a href={auditLink} style={styles.cardBtn}>Book Audit</a>
        </div>

        <div style={styles.darkCard}>
          <p style={styles.kickerLight}>Signature Setup</p>
          <h3 style={styles.priceLight}>$500</h3>
          <p style={styles.textLight}>We set up your client inquiry funnel, lead capture system, and growth foundation.</p>
          <a href={setupLink} style={styles.lightBtn}>Start Setup</a>
        </div>

        <div style={styles.card}>
          <p style={styles.kicker}>Private Growth Partner</p>
          <h3 style={styles.price}>$997/mo</h3>
          <p style={styles.text}>Monthly growth support, content direction, follow-up improvements, and practice growth strategy.</p>
          <a href={monthlyLink} style={styles.cardBtn}>Become Partner</a>
        </div>
      </section>

      <section style={styles.cta}>
        <h2 style={styles.h2}>Ready to Grow Quietly and Powerfully?</h2>
        <p style={styles.text}>
          Start with the $99 Growth Audit and see where your practice is losing inquiries.
        </p>
        <a href={auditLink} style={styles.primary}>Get Your Growth Audit</a>
      </section>

      <section style={styles.disclaimer}>
        <strong>Compliance Note:</strong> TheraGrowth AI is a marketing and business growth platform.
        It does not provide therapy, diagnosis, crisis support, or clinical treatment recommendations.
      </section>
    </main>
  );
}

const styles: Record<string, any> = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: "42px",
    fontFamily: "Arial, sans-serif",
    color: "#07122f",
  },
  hero: {
    maxWidth: "1180px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "34px",
    padding: "60px",
    display: "grid",
    gridTemplateColumns: "1.35fr 0.85fr",
    gap: "44px",
    boxShadow: "0 30px 80px rgba(7,18,47,0.08)",
  },
  badge: {
    display: "inline-block",
    background: "#e9eefc",
    padding: "12px 20px",
    borderRadius: "999px",
    fontWeight: 700,
  },
  h1: {
    fontSize: "64px",
    lineHeight: "1.02",
    margin: "26px 0 22px",
    letterSpacing: "-2px",
  },
  sub: {
    fontSize: "22px",
    lineHeight: "1.65",
    color: "#34445e",
    maxWidth: "720px",
  },
  buttons: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "34px",
  },
  primary: {
    background: "#07122f",
    color: "white",
    padding: "16px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 800,
  },
  secondary: {
    background: "#edf2ff",
    color: "#07122f",
    padding: "16px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 800,
  },
  note: {
    marginTop: "28px",
    fontWeight: 700,
    color: "#475569",
  },
  panel: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "28px",
    padding: "34px",
  },
  list: {
    lineHeight: "2.1",
    fontSize: "18px",
    color: "#334155",
  },
  section: {
    maxWidth: "1180px",
    margin: "34px auto",
    background: "white",
    borderRadius: "30px",
    padding: "44px",
  },
  h2: {
    fontSize: "38px",
    marginTop: 0,
  },
  text: {
    color: "#334155",
    fontSize: "18px",
    lineHeight: "1.7",
  },
  cards: {
    maxWidth: "1180px",
    margin: "34px auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  card: {
    background: "white",
    borderRadius: "30px",
    padding: "36px",
    border: "1px solid #e5e7eb",
  },
  darkCard: {
    background: "#07122f",
    color: "white",
    borderRadius: "30px",
    padding: "36px",
  },
  kicker: {
    fontWeight: 800,
    color: "#64748b",
  },
  kickerLight: {
    fontWeight: 800,
    color: "#cbd5e1",
  },
  price: {
    fontSize: "48px",
    margin: "12px 0",
  },
  priceLight: {
    fontSize: "48px",
    margin: "12px 0",
    color: "white",
  },
  textLight: {
    color: "#dbeafe",
    fontSize: "18px",
    lineHeight: "1.7",
  },
  cardBtn: {
    display: "inline-block",
    marginTop: "20px",
    background: "#07122f",
    color: "white",
    padding: "14px 20px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 800,
  },
  lightBtn: {
    display: "inline-block",
    marginTop: "20px",
    background: "white",
    color: "#07122f",
    padding: "14px 20px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 800,
  },
  cta: {
    maxWidth: "1180px",
    margin: "34px auto",
    background: "white",
    borderRadius: "30px",
    padding: "46px",
    textAlign: "center",
  },
  disclaimer: {
    maxWidth: "1180px",
    margin: "34px auto",
    background: "#07122f",
    color: "white",
    borderRadius: "24px",
    padding: "28px",
    lineHeight: "1.7",
  },
};