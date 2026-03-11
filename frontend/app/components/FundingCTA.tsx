"use client";

import { useState } from "react";
import { ArrowRight, X, FileText, Shield } from "lucide-react";

const BMAC = "https://buymeacoffee.com/chris.yoon";

const TIERS = [
  {
    id: "check",
    name: "Check",
    price: "$10",
    badge: null,
    description: "Signal. Show you believe in the build before it ships.",
    cta: "Back Now",
    href: `${BMAC}?amount=10`,
    card:   "border-[#232329] hover:border-[#36363F]",
    nameColor: "text-[#8A8B97]",
    priceColor: "text-[#F7F8F8]",
    btn: "bg-[#18181f] border border-[#2e2e38] text-[#8A8B97] hover:text-[#F7F8F8] hover:border-[#3e3e50]",
  },
  {
    id: "call",
    name: "Call",
    price: "$20",
    badge: null,
    description: "Commitment. Puts you on the early-access list for every tool I ship.",
    cta: "Back Now",
    href: `${BMAC}?amount=20`,
    card:   "border-[#5E5CE6]/25 hover:border-[#5E5CE6]/60",
    nameColor: "text-[#F7F8F8]",
    priceColor: "text-[#F7F8F8]",
    btn: "bg-[#5E5CE6]/10 border border-[#5E5CE6]/30 text-[#5E5CE6] hover:bg-[#5E5CE6]/20 hover:border-[#5E5CE6]/60",
  },
  {
    id: "raise",
    name: "10× Raise",
    price: "$100",
    badge: "Most Backed",
    description: "Conviction. Priority feature input, build updates, and your name in the changelog.",
    cta: "Back Now",
    href: `${BMAC}?amount=100`,
    card:   "border-[#8B5CF6]/40 hover:border-[#8B5CF6] bg-[#8B5CF6]/5",
    nameColor: "text-[#8B5CF6]",
    priceColor: "text-white",
    btn: "bg-[#8B5CF6]/15 border border-[#8B5CF6]/50 text-[#8B5CF6] hover:bg-[#8B5CF6]/25 hover:border-[#8B5CF6]",
  },
  {
    id: "allin",
    name: "All-In",
    price: "$1,000",
    badge: "Profit Share",
    description: "Not a donation — a position. Back the operator and take 1% of net profits on every result, documented and settled via ActionKeeper.",
    cta: "Generate Agreement",
    href: null,
    card:   "border-amber-500/40 hover:border-amber-400 bg-gradient-to-br from-amber-500/8 to-transparent",
    nameColor: "text-amber-400",
    priceColor: "text-amber-300",
    btn: "bg-amber-500/15 border border-amber-500/50 text-amber-400 hover:bg-amber-500/25 hover:border-amber-400",
  },
];

function AllInModal({ onClose }: { onClose: () => void }) {
  const subject = encodeURIComponent("All-In Backing — 1% Profit Participation");
  const body = encodeURIComponent(
    "Hi Chris,\n\nI'd like to back you at the All-In tier ($1,000) and participate in 1% of your net profits.\n\nPlease send me the ActionKeeper agreement to review.\n\nName:\nContact:\n"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-amber-500/30 bg-[#0e0c18] p-8 shadow-2xl shadow-amber-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#4B4C58] hover:text-[#8A8B97] transition-colors">
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <FileText size={18} className="text-amber-400" />
          </div>
          <div>
            <p className="text-xs text-amber-400 tracking-widest uppercase font-medium">All-In · $1,000</p>
            <h3 className="text-lg font-bold text-white">1% Profit Participation</h3>
          </div>
        </div>
        <div className="space-y-3 mb-6 text-sm text-[#8A8B97] leading-relaxed">
          <p>You back me with <span className="text-white font-medium">$1,000 USD</span>. In return, you receive <span className="text-amber-400 font-medium">1% of my net profits</span> on every result — after buy-ins, fees, and taxes.</p>
          <p>Each event is logged, calculated, and settled transparently via <span className="text-white font-medium">ActionKeeper</span> — tamper-evident receipts, dual-confirmed payouts, full audit trail.</p>
          <p className="text-[#4B4C58]">Example: $10K event, 2 entries, $25K gross result → net ≈ $100 CAD → your cut = $1. Compounds across every event the agreement covers.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#4B4C58] mb-6">
          <Shield size={12} className="text-amber-500/60" />
          <span>SHA-256 receipt · Dual-confirmed payout · Full audit trail</span>
        </div>
        <div className="space-y-2">
          <a
            href={`mailto:chris.yoon@outlook.com?subject=${subject}&body=${body}`}
            className="w-full py-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-amber-500/30 hover:border-amber-400 transition-all"
          >
            Send me the agreement <ArrowRight size={14} />
          </a>
          <button onClick={onClose} className="w-full py-2.5 rounded-xl text-[#4B4C58] text-sm hover:text-[#8A8B97] transition-colors">
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FundingCTA() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <AllInModal onClose={() => setShowModal(false)} />}
      <section id="back" className="py-28 border-t border-[#232329]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs tracking-widest uppercase text-[#5E5CE6] font-medium mb-3">Back the Build</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Fund what gets built.</h2>
            <p className="text-[#8A8B97] max-w-lg text-base leading-relaxed">
              Every tier ships faster. The top tier is a real financial instrument — 1% of net profits, formalized by ActionKeeper.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIERS.map((t) => (
              <div key={t.id} className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-200 ${t.card}`}>
                {t.badge && (
                  <div className={`absolute -top-3 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${
                    t.id === "allin"
                      ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                      : "bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#8B5CF6]"
                  }`}>{t.badge}</div>
                )}
                <div className="mb-4">
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-1.5 ${t.nameColor}`}>{t.name}</p>
                  <p className={`text-3xl font-bold ${t.priceColor}`}>{t.price}</p>
                </div>
                <p className="text-sm text-[#8A8B97] leading-relaxed flex-1 mb-6">{t.description}</p>
                {t.id === "allin" ? (
                  <button onClick={() => setShowModal(true)} className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${t.btn}`}>
                    {t.cta} <ArrowRight size={13} />
                  </button>
                ) : (
                  <a href={t.href!} target="_blank" rel="noopener noreferrer" className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${t.btn}`}>
                    {t.cta} <ArrowRight size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-[#4B4C58] text-center">
            Check · Call · Raise are one-time via Buy Me a Coffee · All-In generates a binding agreement via ActionKeeper
          </p>
        </div>
      </section>
    </>
  );
}
