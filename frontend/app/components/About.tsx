import { Database, GitBranch, BarChart3, Crosshair } from "lucide-react";

const pillars = [
  {
    icon: Crosshair,
    title: "Exploit Quantification Engine",
    description:
      "Measures your opponent's deviation from GTO at each decision node and outputs the exact exploitative counter-strategy with expected bb/100 gain.",
  },
  {
    icon: Database,
    title: "GGPoker Hand Ingestion",
    description:
      "Parses raw GGPoker hand histories automatically. Every hand is tagged, stored, and indexed for pattern analysis across sessions.",
  },
  {
    icon: BarChart3,
    title: "Session Analytics Dashboard",
    description:
      "Bankroll trajectory, exploit success rate, and positional edge — all distilled into actionable 1% improvement targets per session.",
  },
  {
    icon: GitBranch,
    title: "Node-Lock Analysis",
    description:
      "Uses node-locking methodology to model opponent tendencies and compute maximally exploitative frequencies for every street.",
  },
];

export default function About() {
  return (
    <section id="features" className="py-32 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
            What We&apos;re Building
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight">
            The infrastructure for{" "}
            <span className="text-[#007AFF]">systematic exploitation</span>.
          </h2>
          <p className="text-[#666] max-w-xl text-base leading-relaxed">
            Most poker tools tell you what GTO does. We tell you what your
            specific opponent does — and exactly how to punish it.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-black p-8 group hover:bg-[#0a0a0a] transition-colors"
              >
                <div className="w-10 h-10 rounded-md bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center mb-5 group-hover:bg-[#007AFF]/20 transition-colors">
                  <Icon size={18} className="text-[#007AFF]" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {p.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Moneyball callout */}
        <div className="mt-12 border border-[#2a2a2a] rounded-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#007AFF]" />
          <div className="pl-4">
            <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
              Philosophy
            </span>
            <blockquote className="mt-3 text-xl text-white font-medium leading-relaxed max-w-3xl">
              &ldquo;Moneyball didn&apos;t beat the market by playing better baseball.
              It beat the market by measuring baseball differently. We do the
              same for poker.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-[#666]">
              Inspired by sabermetrics data preprocessing philosophy — applied
              to GTO deviation modeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
