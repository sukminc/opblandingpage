"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project, type ProjectStatus } from "../data/projects";

const BMAC = "https://buymeacoffee.com/chris.yoon";

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live:     { label: "Live",     color: "text-emerald-400", dot: "bg-emerald-400" },
  building: { label: "Building", color: "text-[#007AFF]",   dot: "bg-[#007AFF] animate-pulse" },
  idea:     { label: "Idea",     color: "text-[#555]",       dot: "bg-[#333]" },
};

type FilterKey = "All" | "Poker" | "Data" | "Automation";

const FILTERS: { key: FilterKey; match: string[] }[] = [
  { key: "All",        match: [] },
  { key: "Poker",      match: ["Poker", "Fintech", "AR", "Computer Vision"] },
  { key: "Data",       match: ["Data Engineering", "ETL", "Airflow", "Analytics", "PostgreSQL"] },
  { key: "Automation", match: ["Python", "pytest", "AI APIs", "SDK Engineering", "Automation"] },
];

const FUNDING_TIERS = [
  { label: "FOLD",     sub: "Not interested",      amount: null,  style: "text-[#444] border-[#1a1a1a] hover:border-[#333] hover:text-[#666]" },
  { label: "Check",   sub: "$10 — I'd use this",   amount: 10,   style: "text-[#888] border-[#2a2a2a] hover:border-[#555] hover:text-white" },
  { label: "Call",    sub: "$20 — Build this",      amount: 20,   style: "text-white border-[#007AFF]/40 hover:border-[#007AFF] hover:bg-[#007AFF]/10" },
  { label: "10x Raise", sub: "$100+ — Need this ASAP", amount: 100, style: "text-[#007AFF] border-[#007AFF]/60 hover:border-[#007AFF] hover:bg-[#007AFF]/20 font-semibold" },
  { label: "All-In",  sub: "$1,000 — Sponsor",     amount: 1000, style: "text-amber-400 border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/10 font-semibold" },
];

function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const cfg = statusConfig[project.status];

  function handleFund(amount: number | null) {
    if (amount === null) {
      setFlipped(false);
      return;
    }
    window.open(`${BMAC}?amount=${amount}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className={`relative ${project.featured ? "md:col-span-2" : ""}`}
      style={{ perspective: "1200px", minHeight: "320px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 flex flex-col border rounded-xl p-6 bg-black ${
            project.featured ? "border-[#007AFF]/30" : "border-[#1a1a1a]"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Status row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              <span className={`text-xs font-mono ${cfg.color}`}>{cfg.label}</span>
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-md border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:border-[#007AFF] hover:text-[#007AFF] transition-all"
              >
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 mb-6">
            <h3 className="text-lg font-semibold text-white mb-1 font-mono">
              {project.title}
            </h3>
            <p className="text-sm text-[#007AFF] mb-3">{project.tagline}</p>
            <p className="text-sm text-[#555] leading-relaxed">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-[#444] border border-[#1a1a1a] rounded px-2 py-0.5 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover hint */}
          <p className="text-[10px] font-mono text-[#333] text-center tracking-widest uppercase">
            hover to fund →
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 flex flex-col justify-center border rounded-xl p-6 bg-[#030303] ${
            project.featured ? "border-[#007AFF]/30" : "border-[#1a1a1a]"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-xs font-mono text-[#555] text-center mb-1 tracking-widest uppercase">
            {project.title}
          </p>
          <p className="text-[10px] font-mono text-[#333] text-center mb-5 tracking-widest uppercase">
            What&apos;s your action?
          </p>

          <div className="flex flex-col gap-2">
            {FUNDING_TIERS.map((tier) => (
              <button
                key={tier.label}
                onClick={() => handleFund(tier.amount)}
                className={`flex items-center justify-between w-full rounded-lg px-4 py-2.5 text-sm border transition-all duration-150 cursor-pointer ${tier.style}`}
              >
                <span className="font-mono">{tier.label}</span>
                <span className="text-[11px] opacity-70">{tier.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    const matchTags = FILTERS.find((f) => f.key === activeFilter)?.match ?? [];
    return p.tags.some((t) => matchTags.includes(t));
  });

  return (
    <section id="projects" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight text-white">
            Hover a card —{" "}
            <span className="text-[#333]">put money on what matters.</span>
          </h2>
          <p className="text-[#444] mt-3 text-sm">
            I only build what the market bets on. FOLD, Check, Call, or go All-In.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {FILTERS.map(({ key }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                activeFilter === key
                  ? "border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF]"
                  : "border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
