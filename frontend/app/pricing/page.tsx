"use client";

const plans = [
  {
    name: "TheraGrowth OS Starter",
    price: "$99",
    period: "/month",
    subtitle: "For solo therapists starting their growth system.",
    link: "https://buy.stripe.com/8x28wR8eVd12beV4df2sM06",
    features: [
      "Lead capture dashboard",
      "CRM pipeline",
      "Basic AI follow-up writer",
      "Monthly growth score",
      "Email support",
    ],
  },
  {
    name: "TheraGrowth OS Growth",
    price: "$199",
    period: "/month",
    subtitle: "Best for growing private practices.",
    link: "https://buy.stripe.com/14AaEZeDj1ik6YFbFH2sM07",
    popular: true,
    features: [
      "Everything in Starter",
      "AI chatbot widget",
      "Advanced lead automation",
      "Follow-up sequences",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    name: "TheraGrowth OS Pro",
    price: "$399",
    period: "/month",
    subtitle: "For premium practices ready to scale.",
    link: "https://buy.stripe.com/aFa6oJ52J2mo2IpeRT2sM08",
    features: [
      "Everything in Growth",
      "Multi-user access",
      "Team lead routing",
      "Revenue reporting",
      "VIP support",
      "Monthly strategy review",
    ],
  },
];

export default function PricingPage() {
  return (
    <main style={page}>
      <header style={header}>
        <a href="/" style={brand}>
          <div style={logo}>TG</div>
          <div>
            <strong>TheraGrowth OS</strong>
            <p style={small}>AI Growth System for Therapists</p>
          </div>
        </a>

        <nav style={nav}>
          <a href="/" style={navLink}>Home</a>
          <a href="/signup" style={navLink}>Signup</a>
          <a href="/dashboard" style={navLink}>Dashboard</a>
        </nav>
      </header>

      <section style={hero}>
        <p style={eyebrow}>Monthly SaaS Plans</p>
        <h1 style={h1}>Start Turning Therapist Leads Into Booked Consultations</h1>
        <p style={lead}>
          Choose your TheraGrowth OS plan, pay securely through Stripe, then create your
          practice growth account and access your dashboard.
        </p>
      </section>

      <section style={pricingGrid}>
        {plans.map((plan) => (
          <div key={plan.name} style={plan.popular ? featuredCard : card}>
            {plan.popular && <div style={badge}>Most Popular</div>}

            <h2 style={planTitle}>{plan.name}</h2>
            <p style={subtitle}>{plan.subtitle}</p>

            <div style={priceWrap}>
              <span style={price}>{plan.price}</span>
              <span style={period}>{plan.period}</span>
            </div>

            <ul style={features}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              style={plan.popular ? lightButton : darkButton}
            >
              Start {plan.name.replace("TheraGrowth OS ", "")}
            </a>
          </div>
        ))}
      </section>

      <section style={noteBox}>
        <h2 style={noteTitle}>What happens after payment?</h2>
        <p style={noteText}>
          After checkout, the therapist should create their TheraGrowth OS account.
          In the next build, we will connect Stripe payment status directly to dashboard access.
        </p>
        <a href="/signup" style={secondaryButton}>Create Account After Payment</a>
      </section>
    </main>
  );
}

const gold = "#b8892e";
const black = "#111111";
const cream = "#f7f1e8";
const soft = "#fffaf2";

const page = {
  minHeight: "100vh",
  background: cream,
  color: black,
  fontFamily: "Arial, sans-serif",
} as const;

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "22px 6%",
  borderBottom: "1px solid #e3d4bd",
  background: "rgba(247,241,232,.96)",
  position: "sticky",
  top: 0,
  zIndex: 20,
} as const;

const brand = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  color: black,
  textDecoration: "none",
} as const;

const logo = {
  width: 52,
  height: 52,
  borderRadius: "50%",
  background: black,
  color: gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
  fontSize: 23,
  fontWeight: 900,
} as const;

const small = {
  margin: 0,
  color: "#6b5b48",
  fontSize: 13,
} as const;

const nav = {
  display: "flex",
  gap: 18,
  alignItems: "center",
} as const;

const navLink = {
  color: black,
  textDecoration: "none",
  fontWeight: 900,
} as const;

const hero = {
  padding: "80px 6% 30px",
  maxWidth: 1100,
} as const;

const eyebrow = {
  color: gold,
  textTransform: "uppercase",
  letterSpacing: 2,
  fontWeight: 900,
} as const;

const h1 = {
  fontFamily: "Georgia, serif",
  fontSize: "clamp(42px, 7vw, 82px)",
  lineHeight: 0.95,
  margin: "12px 0 20px",
} as const;

const lead = {
  fontSize: 20,
  lineHeight: 1.7,
  color: "#3d3328",
  maxWidth: 900,
} as const;

const pricingGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: 22,
  padding: "30px 6% 50px",
} as const;

const card = {
  background: soft,
  border: "1px solid #dfcaa8",
  borderRadius: 30,
  padding: 32,
} as const;

const featuredCard = {
  ...card,
  background: black,
  color: "white",
  transform: "translateY(-10px)",
  boxShadow: "0 25px 70px rgba(0,0,0,.18)",
} as const;

const badge = {
  display: "inline-block",
  background: gold,
  color: black,
  padding: "8px 14px",
  borderRadius: 999,
  fontWeight: 900,
  marginBottom: 18,
} as const;

const planTitle = {
  fontSize: 28,
  margin: "0 0 10px",
} as const;

const subtitle = {
  color: "#8b7860",
  lineHeight: 1.6,
  fontWeight: 700,
} as const;

const priceWrap = {
  margin: "22px 0",
  display: "flex",
  alignItems: "baseline",
  gap: 8,
} as const;

const price = {
  fontFamily: "Georgia, serif",
  fontSize: 56,
  color: gold,
  fontWeight: 900,
} as const;

const period = {
  fontWeight: 900,
} as const;

const features = {
  lineHeight: 2,
  marginBottom: 26,
} as const;

const darkButton = {
  display: "inline-block",
  background: black,
  color: "white",
  textDecoration: "none",
  padding: "16px 22px",
  borderRadius: 16,
  fontWeight: 900,
} as const;

const lightButton = {
  display: "inline-block",
  background: "white",
  color: black,
  textDecoration: "none",
  padding: "16px 22px",
  borderRadius: 16,
  fontWeight: 900,
} as const;

const noteBox = {
  margin: "20px 6% 70px",
  padding: 34,
  background: soft,
  border: "1px solid #dfcaa8",
  borderRadius: 30,
} as const;

const noteTitle = {
  fontFamily: "Georgia, serif",
  fontSize: 38,
  margin: "0 0 12px",
} as const;

const noteText = {
  color: "#3d3328",
  fontSize: 18,
  lineHeight: 1.7,
  maxWidth: 850,
} as const;

const secondaryButton = {
  display: "inline-block",
  background: "#eadfce",
  color: black,
  textDecoration: "none",
  padding: "16px 22px",
  borderRadius: 16,
  fontWeight: 900,
} as const;