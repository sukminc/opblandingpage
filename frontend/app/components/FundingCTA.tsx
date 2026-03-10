import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const tiers = [
  {
    icon: Zap,
    name: "Early Backer",
    price: "$49",
    desc: "Lifetime access to the analytics dashboard + early feature previews.",
    highlight: false,
  },
  {
    icon: Shield,
    name: "Reg Tier",
    price: "$149",
    desc: "Everything in Early Backer + opponent leak database + priority support.",
    highlight: true,
  },
  {
    icon: Users,
    name: "Stake Me",
    price: "Custom",
    desc: "White-label analytics for staking groups and coaching pools. Let&apos;s talk.",
    highlight: false,
  },
];

export default function FundingCTA() {
  return (
    <section id="invest" className="py-32 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
            Back the Project
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight">
            Invest in the edge.
          </h2>
          <p className="text-[#666] max-w-lg mx-auto text-base">
            We&apos;re funding development through early access. Back the project now
            and lock in founder pricing before public launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.name}
                className={`rounded-lg p-6 border flex flex-col ${
                  t.highlight
                    ? "border-[#007AFF] bg-[#007AFF]/5"
                    : "border-[#2a2a2a] bg-black"
                }`}
              >
                {t.highlight && (
                  <div className="text-xs font-mono text-[#007AFF] tracking-widest uppercase mb-4">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-md flex items-center justify-center ${
                      t.highlight
                        ? "bg-[#007AFF] text-white"
                        : "bg-[#1a1a1a] text-[#007AFF]"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="font-mono text-lg font-bold text-white">
                      {t.price}
                    </div>
                  </div>
                </div>
                <p
                  className="text-sm text-[#666] leading-relaxed flex-1 mb-6"
                  dangerouslySetInnerHTML={{ __html: t.desc }}
                />
                <button
                  className={`w-full py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    t.highlight
                      ? "bg-[#007AFF] text-white hover:bg-[#0066DD]"
                      : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-[#2a2a2a]"
                  }`}
                >
                  {t.price === "Custom" ? "Get in Touch" : "Back Now"}
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-[#444] font-mono">
          No subscriptions. One-time payment. All future updates included.
        </p>
      </div>
    </section>
  );
}
