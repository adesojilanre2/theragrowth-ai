const therapists: any = {
  "jovonna-hale": {
    name: "Jovonna Hale",
    credentials: "LCSW, LICSW",
    headline: "Therapy for Anxiety, Trauma, Stress, and Life Transitions",
    subheadline:
      "Work directly with Jovonna Hale through a private, professional therapy experience serving Colorado and Washington.",
    locations: "Colorado & Washington",
    specialties: [
      "Anxiety therapy",
      "Trauma support",
      "Stress and burnout",
      "Life transitions",
      "Relationship challenges",
    ],
    insurance: [
      "Insurance screening available",
      "Private pay options",
      "Eligibility verification support",
    ],
  },
};

export default function TherapistPage({
  params,
}: {
  params: { slug: string };
}) {
  const therapist = therapists[params.slug] || therapists["jovonna-hale"];

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-[#07112f]">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[32px] bg-white p-10 shadow-sm">
          <div className="mb-6 inline-block rounded-full bg-[#eaf0ff] px-5 py-3 font-semibold">
            Private Practice Growth System
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-5xl font-black leading-tight">
                {therapist.headline}
              </h1>

              <p className="mt-6 text-xl leading-8 text-slate-700">
                {therapist.subheadline}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-xl bg-[#07112f] px-7 py-4 font-bold text-white"
                >
                  Request Consultation
                </a>

                <a
                  href="#insurance"
                  className="rounded-xl bg-[#eef3ff] px-7 py-4 font-bold text-[#07112f]"
                >
                  Verify Insurance
                </a>
              </div>

              <p className="mt-6 font-semibold">
                Serving: {therapist.locations}
              </p>
            </div>

            <div className="rounded-[28px] border bg-[#f8fbff] p-8">
              <h2 className="text-2xl font-black">
                {therapist.name}, {therapist.credentials}
              </h2>
              <p className="mt-4 text-slate-700">
                A direct private practice experience designed to reduce
                platform dependence and make getting started simple.
              </p>

              <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-bold">AI Assistant Available</p>
                <p className="mt-2 text-slate-600">
                  Ask about therapy services, insurance, booking, and
                  availability.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-[28px] bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-black">Specialties</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {therapist.specialties.map((item: string) => (
              <div key={item} className="rounded-2xl border p-5 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="insurance"
          className="mt-8 rounded-[28px] bg-[#07112f] p-10 text-white shadow-sm"
        >
          <h2 className="text-3xl font-black">Insurance & Intake</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8">
            Submit your insurance details and care needs so eligibility,
            benefits, and next steps can be reviewed before scheduling.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {therapist.insurance.map((item: string) => (
              <div
                key={item}
                className="rounded-2xl bg-white/10 p-5 font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-8 rounded-[28px] bg-white p-10">
          <h2 className="text-3xl font-black">Request a Consultation</h2>
          <p className="mt-3 text-slate-700">
            This form will become your lead capture and intake system.
          </p>

          <form className="mt-6 grid gap-4">
            <input className="rounded-xl border p-4" placeholder="Full name" />
            <input className="rounded-xl border p-4" placeholder="Email" />
            <input className="rounded-xl border p-4" placeholder="Phone" />
            <input
              className="rounded-xl border p-4"
              placeholder="Insurance provider"
            />
            <textarea
              className="min-h-[140px] rounded-xl border p-4"
              placeholder="What support are you looking for?"
            />
            <button className="w-fit rounded-xl bg-[#07112f] px-7 py-4 font-bold text-white">
              Submit Request
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}