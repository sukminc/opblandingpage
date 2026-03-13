"use client";

import { ArrowUpRight } from "lucide-react";

const BMAC_URL = "https://buymeacoffee.com/chris.yoon";

const tiers = [
  {
    label: "Supporter",
    amount: "$5+",
    desc: "A small vote of encouragement that helps keep the build season moving.",
    url: BMAC_URL,
  },
  {
    label: "Build Backer",
    amount: "$15+",
    desc: "Helps buy focused time for another shipping loop, plus the tools and hosting behind it.",
    url: "https://buy.stripe.com/5kQ7sMaP496ggKe4s41wY04",
  },
  {
    label: "Runway Boost",
    amount: "$50+",
    desc: "For people who want to materially support the next month of learning and shipping.",
    url: "https://buy.stripe.com/6oU5kEaP45U451w9Mo1wY05",
  },
];

const hookTier = {
  label: "Anchor Backer",
  amount: "$3,000",
  desc: "A high-trust support option for someone who wants to meaningfully change the pace of the next season.",
  note: "This is support for the work itself, not a promise of startup-style upside.",
  url: "https://buy.stripe.com/6oUeVe1eueqA79E7Eg1wY06",
};

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function FundingCTA() {
  return (
    <section id="fund" className="section-shell px-6 py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs text-[#8b857b] mb-3">Funding</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#111111]">
            Support the build. Buy more time for the next 1% better.
          </h2>
          <p className="mt-6 text-base leading-8 text-[#5f5a52]">
            This site is not a product pre-sale page. It is a public build surface.
            If the work resonates, funding here is simply a way to help me keep
            shipping, keep learning, and keep buying focused time for the next loop.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#8b857b]">
            Think encouragement, runway, and continued public reps. The poker-side
            funding lives on <span className="text-[#111111]">onepercentbetter.poker</span>.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8b857b]">
              What support does
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#5f5a52]">
              <p>It gives me time to keep shipping while I look for the right role.</p>
              <p>It covers tools, APIs, hosting, and the cost of moving quickly in public.</p>
              <p>It keeps the simple products moving without turning the site into startup theater.</p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              {tiers.map((tier) => (
                <button
                  key={tier.label}
                  onClick={() => openLink(tier.url)}
                  className="glass-panel rounded-[1.6rem] p-5 text-left transition-colors hover:border-[#b9b2a7] cursor-pointer"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
                    {tier.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#111111]">
                    {tier.amount}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#5f5a52]">
                    {tier.desc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#111111]">
                    Support the build
                    <ArrowUpRight size={14} />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => openLink(hookTier.url)}
              className="rounded-[1.8rem] border border-[#111111]/18 bg-[#111111] px-6 py-6 text-left transition-colors hover:bg-[#222222] cursor-pointer"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#d5d0c6]">
                    {hookTier.label}
                  </p>
                  <p className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.05em] text-[#fbfaf7]">
                    {hookTier.amount}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#d5d0c6]">
                    {hookTier.desc}
                  </p>
                  <p className="mt-3 text-xs font-mono uppercase tracking-[0.14em] text-[#9f998f]">
                    {hookTier.note}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-[#fbfaf7]">
                  Become an anchor backer
                  <ArrowUpRight size={15} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
