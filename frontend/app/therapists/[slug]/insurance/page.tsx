export default function InsurancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        padding: "60px 24px",
        fontFamily: "Arial, sans-serif",
        color: "#07112f",
      }}
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          borderRadius: "32px",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#eef3ff",
            padding: "10px 18px",
            borderRadius: "999px",
            fontWeight: 900,
            marginBottom: "24px",
          }}
        >
          Insurance Verification
        </div>

        <h1 style={{ fontSize: "52px", margin: 0, fontWeight: 900 }}>
          Verify Your Insurance
        </h1>

        <p style={{ fontSize: "18px", lineHeight: 1.7, color: "#334155" }}>
          Submit your insurance information through the consultation form so
          eligibility, benefits, and next steps can be reviewed before
          scheduling.
        </p>

        <a
          href="/therapists/jovonna-hale#consultation"
          style={{
            display: "inline-block",
            marginTop: "24px",
            background: "#07112f",
            color: "white",
            padding: "16px 24px",
            borderRadius: "16px",
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          Start Insurance Check
        </a>
      </section>
    </main>
  );
}