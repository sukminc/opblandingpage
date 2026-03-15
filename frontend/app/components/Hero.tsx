import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import BrandMark from "./BrandMark";

const signals = [
  {
    label: "Experience",
    value: "10+ years",
    detail: "Data engineering across fintech, media, and enterprise.",
  },
  {
    label: "Latest role",
    value: "Senior Data Engineer",
    detail: "Most recently at theScore / ESPN Bet.",
  },
  {
    label: "Current track",
    value: "Visible execution",
    detail: "Small product loops and public proof.",
  },
];

const principles = [
  "Background first. Proof underneath.",
  "Useful scope beats bigger promises.",
  "Public work should feel easy to trust.",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-18 pt-30 sm:pb-24 sm:pt-34">
      <div className="pointer-events-none absolute inset-0 paper-grid opacity-24 sm:opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent_72%)]" />
      <div className="pointer-events-none absolute right-[-12rem] top-20 hidden h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(111,98,80,0.12),_transparent_68%)] lg:block" />
      <div className="pointer-events-none absolute left-[-10rem] bottom-[-12rem] hidden h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.55),_transparent_68%)] lg:block" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9c9b3] bg-[linear-gradient(180deg,#fcf6ed_0%,#f3e7d7_100%)] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <span className="h-2 w-2 rounded-full bg-[#8a6f50]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#6f5336]">
                hiring + trust surface
              </span>
            </div>
            <h1 className="mt-8 max-w-5xl text-[3.45rem] font-semibold leading-[0.92] tracking-[-0.08em] text-[#111111] sm:text-[4.6rem] lg:text-[6.2rem]">
              Senior data engineer building useful products in public.
            </h1>

            <p className="mt-6 max-w-2xl text-[1.08rem] leading-8 text-[#5f5a52] sm:text-[1.18rem]">
              Built by{" "}
              <a
                href="https://linkedin.com/in/sukminyoon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] underline decoration-[#c8b08d] underline-offset-4 transition-colors hover:text-[#6f5336]"
              >
                Chris S. Yoon
              </a>
              . Hiring-focused surface for proven data engineering, small product
              loops, and visible execution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111111] bg-[#111111] px-5 py-3 text-sm font-medium text-[#fbf7f0] transition-colors hover:bg-[#252525]"
              >
                See selected work
                <ArrowRight size={16} />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d7c2a3] bg-[linear-gradient(180deg,#fcf7ee_0%,#f4e8d8_100%)] px-5 py-3 text-sm font-medium text-[#6f5336] transition-colors hover:border-[#b9976c] hover:bg-[linear-gradient(180deg,#f9f0e3_0%,#eedbc2_100%)]"
              >
                Read background
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {signals.map((signal) => (
                <div key={signal.label} className="rounded-[1.5rem] border border-[#ddd3c6] bg-[linear-gradient(180deg,rgba(251,247,240,0.96),rgba(246,239,228,0.92))] p-5 transition-colors hover:border-[#ceb594]">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8a6f50]">
                    {signal.label}
                  </p>
                  <p className="mt-3 text-[1.05rem] font-semibold tracking-[-0.04em] text-[#111111]">
                    {signal.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#5f5a52]">
                    {signal.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="glass-panel overflow-hidden rounded-[2.5rem] border px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8b857b]">
                    how this site works
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-3xl">
                    Credibility up front. Execution underneath.
                  </h2>
                </div>
                <span className="hidden rounded-full border border-[#dac9b1] bg-[linear-gradient(180deg,#f8f0e3_0%,#efdfc8_100%)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#6f5336] sm:inline-flex">
                  1% Better.dev
                </span>
              </div>

              <div className="mt-8 flex justify-center rounded-[2.4rem] border border-[#ddd3c6] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(247,240,228,0.94)_58%,_rgba(241,231,216,0.92)_100%)] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:px-8 lg:justify-start">
                <BrandMark size="hero" showWordmark={true} subtitle="dev · ship small. learn fast." />
              </div>

              <p className="mt-8 max-w-lg text-sm leading-7 text-[#5f5a52] sm:text-[15px]">
                Make the work legible fast, then let the products and repos
                carry the proof.
              </p>

              <div className="mt-7 space-y-3">
                {principles.map((principle, index) => (
                  <div key={principle} className="flex gap-3 border-t border-[#e8e0d4] pt-3 first:border-t-0 first:pt-0">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8a6f50]">
                      <span className="sr-only">{index + 1}</span>
                    </span>
                    <p className="text-sm leading-5 text-[#5f5a52]">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8a6f50]">
              What this site proves
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  Depth
                </p>
                <p className="mt-2 text-sm leading-5 text-[#5f5a52]">
                  Product work on real engineering footing.
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  Range
                </p>
                <p className="mt-2 text-sm leading-5 text-[#5f5a52]">
                  Product judgment, engineering craft, shipping discipline.
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  Pace
                </p>
                <p className="mt-2 text-sm leading-5 text-[#5f5a52]">
                  Recent work that stays easy to verify.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8a6f50]">
              Separate verticals
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {[
                "Specialist lanes stay separate.",
                "The dev surface stays centered on hiring and credibility.",
                "Future surface area should be earned.",
              ].map((note, index) => (
                <div key={note} className="flex gap-3 border-t border-[#ebe5db] pt-3 first:border-t-0 first:pt-0">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8a6f50]">
                    <span className="sr-only">{index + 1}</span>
                  </span>
                  <p className="text-sm leading-5 text-[#5f5a52]">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
