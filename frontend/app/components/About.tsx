const experience = [
  {
    company: "OnePercentBetter.dev",
    role: "Founder",
    period: "2025 - Present",
    summary:
      "Building the public hiring surface plus small product loops that keep recent execution visible and useful.",
  },
  {
    company: "theScore / ESPN Bet",
    role: "Senior Data Engineer",
    period: "2023 - 2025",
    summary:
      "Built pipelines, observability, and reporting systems for high-volume betting operations where correctness and reliability mattered daily.",
  },
  {
    company: "Earlier roles",
    role: "Data / QA / Automation",
    period: "2016 - 2023",
    summary:
      "Built the habits that still shape the work: validate the data, automate repetitive pain, and ship systems people can trust.",
  },
];

const principles = [
  {
    label: "Current build",
    value: "Small products. Live surface.",
  },
  {
    label: "How I work",
    value: "Useful first. Tight scope. Visible proof.",
  },
  {
    label: "Why it matters",
    value: "Credibility comes faster when work is easy to verify.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#8a6f50]">
            About
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">
            Build small. Keep it legible. Let the work carry the proof.
          </h2>

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-[#5f5a52]">
            <p>
              Right now I am building 1% Better.dev and a small set of product
              loops around it. The goal is simple: keep shipping and keep the
              work easy to see.
            </p>
            <p>
              This is how I prefer to work. Tight scope, fast feedback, and
              useful first. I would rather ship something real than
              over-explain a bigger promise. Behind that is 10+ years in data
              engineering, QA, automation, and data quality work, most recently
              as a Senior Data Engineer at theScore / ESPN Bet.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.label} className="glass-panel rounded-[1.45rem] p-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8a6f50]">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-5 text-[#111111]">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-panel rounded-[2rem] p-8 sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#8a6f50]">
              Experience
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111111]">
              Current build, proven background.
            </h3>
          </div>

          <div className="mt-8 space-y-6">
            {experience.map((item) => (
              <div
                key={item.company}
                className="border-t border-[rgba(138,111,80,0.18)] pt-6 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-lg font-medium text-[#111111]">
                      {item.company}
                    </p>
                    <p className="text-sm text-[#5f5a52]">{item.role}</p>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#8a6f50]">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f5a52]">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
