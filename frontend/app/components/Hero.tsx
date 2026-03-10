"use client";

import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { value: "+2.3", unit: "bb/100", label: "Avg exploit edge identified" },
  { value: "94%", unit: "", label: "GTO deviation accuracy" },
  { value: "<50ms", unit: "", label: "Real-time analysis latency" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#fff 1px, transparent 1px),
            linear-gradient(90deg, #fff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#007AFF]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 border border-[#2a2a2a] rounded-full px-3 py-1 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
          <span className="text-xs text-[#999] font-mono tracking-widest uppercase">
            GTO Defends. We Exploit.
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl">
          Turn your opponent&apos;s{" "}
          <span className="text-[#007AFF]">GTO leaks</span> into measurable{" "}
          <span className="relative">
            bb/100
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#007AFF]/40" />
          </span>{" "}
          edge.
        </h1>

        {/* Subheading */}
        <p className="text-lg text-[#888] max-w-2xl mb-10 leading-relaxed">
          onepercentbetter.poker quantifies GTO deviations in real time. No
          theory. No guesswork. Just data — and the exact exploit play that
          maximizes EV at every node.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          <a
            href="#invest"
            className="flex items-center gap-2 bg-[#007AFF] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0066DD] transition-colors"
          >
            Back the Project
            <ArrowRight size={16} />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 text-[#999] px-6 py-3 rounded-md border border-[#2a2a2a] hover:border-[#444] hover:text-white transition-colors font-medium"
          >
            See How It Works
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#2a2a2a] border border-[#2a2a2a] rounded-lg overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-black px-6 py-5">
              <div className="font-mono text-2xl font-bold text-white mb-1">
                {s.value}
                {s.unit && (
                  <span className="text-[#007AFF] text-base ml-1">{s.unit}</span>
                )}
              </div>
              <div className="text-xs text-[#666] uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#444]">
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
