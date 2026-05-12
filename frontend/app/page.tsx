import Link from "next/link";
import ChatWidget from "../components/ChatWidget";

const services = [
  {
    title: "Private-Pay Client Acquisition",
    text: "We help therapists attract better-fit private-pay clients through premium positioning, website strategy, and automated lead capture.",
  },
  {
    title: "AI Chat + Inquiry Support",
    text: "Your site can answer common questions, collect leads, and guide potential clients toward booking without replacing clinical care.",
  },
  {
    title: "Follow-Up Growth System",
    text: "We help you organize new inquiries, follow up faster, and avoid losing potential clients because of delays or missed messages.",
  },
];

const process = [
  "Audit your current website and client journey",
  "Identify where visitors are dropping off",
  "Install a stronger lead capture and AI inquiry flow",
  "Organize leads inside a simple dashboard",
  "Improve follow-up, conversion, and bookings",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f0e6] text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#e4d4bd] bg-[#f7f0e6]/95 px-6 py-5 backdrop-blur md:px-[6%]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#111111] text-2xl font-black text-[#d6a72c]">
              TG
            </div>
            <div>
              <h1 className="text-2xl font-black">TheraGrowth AI</h1>
              <p className="text-sm text-[#5f5a52] md:text-base">
                Client Acquisition System for Therapists
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-lg font-black md:flex">
            <a href="#services">Services</a>
            <Link href="/pricing">Pricing</Link>
            <a href="#process">Process</a>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/signup">Signup</Link>
            <Link href="/login">Login</Link>
            <a
              href="#audit"
              className="rounded-full border border-[#d6b77a] px-6 py-3"
            >
              Free Audit
            </a>
          </nav>
        </div>
      </header>

      <section className="px-6 py-20 md:px-[6%]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 font-black uppercase tracking-[0.25em] text-[#d6a72c]">
              AI Growth System for Private Practices
            </p>
            <h2 className="text-5xl font-black leading-tight md:text-7xl">
              Turn therapist websites into client acquisition systems.
            </h2>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-[#4d463f]">
              TheraGrowth AI helps therapists capture inquiries, respond faster,
              organize leads, and convert more visitors into booked
              consultations.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#audit"
                className="rounded-full bg-[#111111] px-8 py-4 text-center text-lg font-black text-white"
              >
                Request Free Audit
              </a>
              <Link
                href="/pricing"
                className="rounded-full border border-[#111111] px-8 py-4 text-center text-lg font-black"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e0caa8] bg-white p-8 shadow-xl">
            <h3 className="text-3xl font-black">What the system does</h3>
            <div className="mt-6 space-y-4">
              {[
                "AI website chat for visitor questions",
                "Lead capture for therapy inquiries",
                "Simple CRM dashboard for follow-up",
                "Therapist onboarding and service positioning",
                "SEO-ready client acquisition structure",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#eadcc6] bg-[#fffaf2] p-4 font-bold"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-6 py-20 md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black md:text-5xl">Services</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-[2rem] border border-[#eadcc6] bg-[#f7f0e6] p-8"
              >
                <h3 className="text-2xl font-black">{service.title}</h3>
                <p className="mt-4 leading-8 text-[#51483f]">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="px-6 py-20 md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-black md:text-5xl">Process</h2>
          <div className="mt-10 grid gap-5">
            {process.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-5 rounded-3xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl font-black text-[#d6a72c]">
                  {index + 1}
                </div>
                <p className="text-xl font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="bg-white px-6 py-20 md:px-[6%]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#e0caa8] bg-[#f7f0e6] p-8 shadow-xl">
          <h2 className="text-4xl font-black">Request a Free Audit</h2>
          <p className="mt-4 text-lg leading-8 text-[#51483f]">
            Tell us about your practice and website. We will review your current
            client acquisition flow and identify quick wins.
          </p>

          <form className="mt-8 space-y-4">
            <input
              className="w-full rounded-2xl border border-[#d8c3a5] bg-white px-5 py-4 outline-none"
              placeholder="Full name"
            />
            <input
              className="w-full rounded-2xl border border-[#d8c3a5] bg-white px-5 py-4 outline-none"
              placeholder="Email address"
              type="email"
            />
            <input
              className="w-full rounded-2xl border border-[#d8c3a5] bg-white px-5 py-4 outline-none"
              placeholder="Website URL"
            />
            <select className="w-full rounded-2xl border border-[#d8c3a5] bg-white px-5 py-4 outline-none">
              <option>What do you need help with?</option>
              <option>More private-pay clients</option>
              <option>Website conversion</option>
              <option>AI chat</option>
              <option>Lead follow-up</option>
              <option>All of the above</option>
            </select>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-[#d8c3a5] bg-white px-5 py-4 outline-none"
              placeholder="Tell us what you want to improve"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#111111] px-6 py-5 text-xl font-black text-white"
            >
              Submit Free Audit Request
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#111111] px-6 py-12 text-white md:px-[6%]">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-2xl font-bold">TheraGrowth AI</h3>
          <p className="mt-3 max-w-3xl text-[#8fa3c3]">
            Helping therapists get more private-pay clients through SaaS, AI
            chat, follow-up, and growth systems.
          </p>

          <p className="mt-4">
            <a
              href="https://instagram.com/theragrowth.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#d6a72c]"
            >
              Instagram: @theragrowth.ai
            </a>
          </p>

          <p className="mt-3">
            Email:{" "}
            <a
              href="mailto:hello@theragrowth-ai.com"
              className="font-black text-[#d6a72c]"
            >
              hello@theragrowth-ai.com
            </a>
          </p>
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}