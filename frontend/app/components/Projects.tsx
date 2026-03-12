"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, type Project, type ProjectStatus } from "../data/projects";

const BMAC = "https://buymeacoffee.com/chris.yoon";

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live:     { label: "Live",     color: "text-emerald-400", dot: "bg-emerald-400" },
  building: { label: "Building", color: "text-[#5E5CE6]",   dot: "bg-[#5E5CE6] animate-pulse" },
  idea:     { label: "Idea",     color: "text-[#4B4C58]",   dot: "bg-[#4B4C58]" },
};


const SMALL_TIERS = [
  { label: "Open",  amount: 30,  style: "text-[#8A8B97] border-[#232329] hover:border-[#36363F] hover:text-[#F7F8F8]" },
  { label: "3-Bet", amount: 150, style: "text-[#F7F8F8] border-[#5E5CE6]/30 hover:border-[#5E5CE6] hover:bg-[#5E5CE6]/10" },
];

function ProjectCard({ project }: { project: Project }) {
  const cfg = statusConfig[project.status];

  function handleFund(amount: number) {
    window.open(`${BMAC}?amount=${amount}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={project.featured ? "md:col-span-2" : ""}>
      <div
        className={`flex flex-col rounded-2xl p-6 bg-[#161618] border transition-colors h-full ${
          project.featured ? "border-[#5E5CE6]/25 hover:border-[#5E5CE6]/40" : "border-[#232329] hover:border-[#36363F]"
        }`}
      >
        {/* Status row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            <span className={`text-xs ${cfg.color}`}>{cfg.label}</span>
          </div>
          <a
            href={BMAC}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-lg border border-[#232329] flex items-center justify-center text-[#4B4C58] hover:border-[#5E5CE6]/40 hover:text-[#5E5CE6] transition-all"
          >
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Content */}
        <div className="flex-1 mb-5">
          <h3 className="text-base font-semibold text-[#F7F8F8] mb-1">{project.title}</h3>
          <p className="text-sm text-[#5E5CE6] mb-3">{project.tagline}</p>
          <p className="text-sm text-[#8A8B97] leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-[#4B4C58] bg-[#1C1C1F] border border-[#232329] rounded-md px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Funding tiers */}
        <div className="flex flex-col gap-1.5">
          {/* Small tiers row */}
          <div className="grid grid-cols-2 gap-1.5">
            {SMALL_TIERS.map((tier) => (
              <button
                key={tier.label}
                onClick={() => handleFund(tier.amount)}
                className={`rounded-xl py-2 text-xs border transition-all duration-150 cursor-pointer text-center ${tier.style}`}
              >
                {tier.label} · ${tier.amount}
              </button>
            ))}
          </div>

          {/* Hero tier — Over Bet */}
          <button
            onClick={() => handleFund(500)}
            className="w-full rounded-xl border border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-150 cursor-pointer px-4 py-3 text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-amber-400">Over Bet · $500</span>
                <p className="text-[11px] text-[#4B4C58] mt-0.5 group-hover:text-[#8A8B97] transition-colors">
                  Most players fold here. You don&apos;t.
                </p>
              </div>
              <ArrowUpRight size={14} className="text-amber-500/50 group-hover:text-amber-400 transition-colors shrink-0" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-[#232329]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-xs text-[#8A8B97] mb-3">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F7F8F8] tracking-tight">
            Back the build.{" "}
            <span className="text-[#4B4C58]">Pick your action.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
