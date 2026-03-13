"use client";

import {
  ArrowDown,
  ArrowUpRight,
  ChartNoAxesCombined,
  Sparkles,
  Target,
} from "lucide-react";

const principles = [
  {
    label: "Daily signal",
    title: "Small moves count when the system notices them.",
    icon: Target,
  },
  {
    label: "Compounding loop",
    title: "Every product here is designed to turn repetition into leverage.",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Calm ambition",
    title: "The goal is not hype. The goal is durable progress you can feel.",
    icon: Sparkles,
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-28 pb-16 sm:pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-8%] top-24 h-72 w-72 rounded-full bg-[#b8ff72]/10 blur-3xl" />
        <div className="absolute right-[-6%] top-10 h-[28rem] w-[28rem] rounded-full bg-[#5b8f74]/16 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b8ff72]/50 to-transparent" />
        <div className="absolute right-[8%] top-24 h-[25rem] w-[25rem] rounded-[3rem] border border-[#355046]/35 bg-[radial-gradient(circle_at_top,rgba(184,255,114,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#355046] bg-[#0d1814]/80 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#b8ff72] shadow-[0_0_12px_rgba(184,255,114,0.75)]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#a6b8ae]">
              One percent better, every rep
            </span>
          </div>

          <h1 className="max-w-4xl text-6xl font-semibold tracking-[-0.06em] text-[#eff6ef] sm:text-7xl lg:text-[6.5rem] lg:leading-[0.94]">
            Marginal gains.
            <br />
            <span className="text-[#b8ff72]">Exponential results.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#a6b8ae] sm:text-xl">
            One percent better is the operating system behind everything I build:
            products, analytics, and tools that make progress visible, repeatable,
            and hard to ignore.
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#61746a]">
            Built by{" "}
            <a
              href="https://linkedin.com/in/sukminyoon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#eff6ef] underline decoration-[#355046] underline-offset-4 transition-colors hover:text-[#b8ff72]"
            >
              Chris S. Yoon
            </a>
            , senior data engineer and AI builder obsessed with compounding systems instead of vanity spikes.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#b8ff72] px-5 py-3 text-sm font-semibold text-[#08110d] transition-transform hover:-translate-y-0.5 hover:bg-[#d3ff9a]"
            >
              See what&apos;s shipping
              <ArrowDown size={15} />
            </a>
            <a
              href="#fund"
              className="inline-flex items-center gap-2 rounded-2xl border border-[#355046] bg-[#0d1814]/80 px-5 py-3 text-sm text-[#eff6ef] transition-colors hover:border-[#4d7263] hover:bg-[#13201a]"
            >
              Back the build
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {principles.map(({ label, title, icon: Icon }) => (
              <div key={label} className="glass-panel rounded-[1.6rem] p-4">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7d9086]">
                    {label}
                  </span>
                  <Icon size={16} className="text-[#b8ff72]" />
                </div>
                <p className="text-sm leading-6 text-[#dce8de]">{title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#24372f] pb-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-[#7d9086]">
                  Compound dashboard
                </p>
                <p className="mt-2 text-xl font-medium text-[#eff6ef]">
                  Progress should feel measurable.
                </p>
              </div>
              <div className="rounded-full border border-[#355046] bg-[#101a16] px-3 py-1">
                <span className="text-[11px] font-mono text-[#b8ff72]">live thesis</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#24372f] bg-[#0b1511] p-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d9086]">
                  1.01 ^ 365
                </p>
                <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-[#b8ff72]">
                  37.8x
                </p>
                <p className="mt-3 text-sm leading-6 text-[#a6b8ae]">
                  The page leads with compounding because the business does too.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-[#24372f] bg-[#0b1511] p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d9086]">
                      Current focus
                    </p>
                    <p className="mt-3 text-2xl font-medium text-[#eff6ef]">
                      Product systems
                    </p>
                  </div>
                  <p className="text-sm text-[#b8ff72]">+1% daily</p>
                </div>
                <div className="mt-5 h-2 rounded-full bg-[#16221d]">
                  <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-[#6cbf78] to-[#b8ff72]" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[#a6b8ae]">
                  Daily tools, intelligent workflows, and signals that create repeatable momentum.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-[#24372f] bg-[linear-gradient(180deg,rgba(184,255,114,0.08),rgba(184,255,114,0.02))] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d9086]">
                    Design thesis
                  </p>
                  <p className="mt-2 text-lg font-medium text-[#eff6ef]">
                    Less startup theater. More visible progress.
                  </p>
                </div>
                <span className="rounded-full border border-[#4d7263] px-3 py-1 text-[11px] font-mono text-[#eff6ef]">
                  calm, not loud
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["Signal", "Clear feedback loops"],
                  ["Systems", "Repeatable execution"],
                  ["Edge", "Compounded upside"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-[#30463d] bg-[#0c1612]/85 p-4">
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7d9086]">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[#dce8de]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
