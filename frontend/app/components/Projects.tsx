"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitCommitHorizontal, Clock } from "lucide-react";
import { projects, type Project, type ProjectStatus } from "../data/projects";
import { ICON_MAP, TECH_TAGS } from "../data/skills";

// ── Constants ────────────────────────────────────────────────────────────────

const BMAC      = "https://buymeacoffee.com/chris.yoon";
const GH_OWNER  = "sukminc";

// Derived from projects.ts — add repoName there to surface GitHub stats here
const REPO_MAP: Record<string, string> = Object.fromEntries(
  projects.filter((p) => p.repoName).map((p) => [p.slug, p.repoName!])
);

// Tech stacks now live in skills.ts — TECH_TAGS drives both cards and About page

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live:     { label: "Live",     color: "text-emerald-400", dot: "bg-emerald-400" },
  building: { label: "Building", color: "text-[#5E5CE6]",   dot: "bg-[#5E5CE6] animate-pulse" },
  idea:     { label: "Idea",     color: "text-[#4B4C58]",   dot: "bg-[#4B4C58]" },
};

type FilterKey = "All" | "Poker" | "Data" | "Automation";

const FILTERS: { key: FilterKey; match: string[] }[] = [
  { key: "All",        match: [] },
  { key: "Poker",      match: ["Poker", "Fintech", "AR", "Computer Vision"] },
  { key: "Data",       match: ["Data Engineering", "ETL", "Airflow", "Analytics", "PostgreSQL", "Apache Airflow"] },
  { key: "Automation", match: ["Python", "pytest", "AI APIs", "SDK Engineering", "Automation", "Pytest"] },
];

const FUNDING_TIERS = [
  { label: "Check",     sub: "$10 — I'd use this",     amount: 10,   style: "text-[#8A8B97] border-[#232329] hover:border-[#36363F] hover:text-[#F7F8F8]" },
  { label: "Call",      sub: "$20 — Build this",       amount: 20,   style: "text-[#F7F8F8] border-[#5E5CE6]/30 hover:border-[#5E5CE6] hover:bg-[#5E5CE6]/10" },
  { label: "10x Raise", sub: "$100+ — Need this ASAP", amount: 100,  style: "text-[#5E5CE6] border-[#5E5CE6]/50 hover:border-[#5E5CE6] hover:bg-[#5E5CE6]/15 font-medium" },
  { label: "All-In",    sub: "$1,000 — Sponsor",       amount: 1000, style: "text-amber-400 border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/10 font-medium" },
];

// ── GitHub hook ──────────────────────────────────────────────────────────────

interface GitHubStats {
  commitCount: number | null;
  lastCommitDate: string | null;
  lastCommitMsg: string | null;
  loading: boolean;
}

function useGitHubStats(slug: string): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    commitCount: null,
    lastCommitDate: null,
    lastCommitMsg: null,
    loading: true,
  });

  useEffect(() => {
    const repo = REPO_MAP[slug];
    if (!repo) { setStats(s => ({ ...s, loading: false })); return; }

    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GH_OWNER}/${repo}/commits?per_page=1`,
          { headers: { Accept: "application/vnd.github+json" } }
        );

        // Total commit count from Link header rel="last" page number
        let commitCount: number | null = null;
        const linkHeader = res.headers.get("Link") ?? "";
        const lastMatch  = linkHeader.match(/[?&]page=(\d+)>; rel="last"/);
        if (lastMatch) commitCount = parseInt(lastMatch[1], 10);

        const data = await res.json();
        if (Array.isArray(data) && data[0]) {
          const c = data[0].commit;
          setStats({
            commitCount,
            lastCommitDate: (c.author?.date ?? c.committer?.date) as string | null,
            lastCommitMsg:  (c.message as string)?.split("\n")[0] ?? null,
            loading: false,
          });
        } else {
          setStats(s => ({ ...s, loading: false }));
        }
      } catch {
        setStats(s => ({ ...s, loading: false }));
      }
    })();
  }, [slug]);

  return stats;
}

function timeAgo(iso: string): string {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 3600)    return `${Math.round(s / 60)}m ago`;
  if (s < 86400)   return `${Math.round(s / 3600)}h ago`;
  if (s < 604800)  return `${Math.round(s / 86400)}d ago`;
  if (s < 2592000) return `${Math.round(s / 604800)}w ago`;
  return `${Math.round(s / 2592000)}mo ago`;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function TechStack({ slug }: { slug: string }) {
  const tags = TECH_TAGS[slug] ?? [];
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {tags.map((name) => {
        const icon = ICON_MAP[name];
        return (
          <span
            key={name}
            title={name}
            className="inline-flex items-center gap-1.5 text-[9px] text-[#6B6C7A] bg-[#1E1E22] border border-[#2A2A30] rounded-md px-2 py-1"
          >
            {icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://cdn.simpleicons.org/${icon.slug}/${icon.hex}`}
                alt={name}
                width={11}
                height={11}
                className="w-[11px] h-[11px]"
              />
            )}
            {name}
          </span>
        );
      })}
    </div>
  );
}

function GitStats({ slug }: { slug: string }) {
  const { commitCount, lastCommitDate, lastCommitMsg, loading } = useGitHubStats(slug);

  if (loading) {
    return (
      <div className="border-t border-[#232329] pt-3 space-y-1.5">
        <div className="h-2.5 bg-[#232329] rounded animate-pulse w-36" />
        <div className="h-2.5 bg-[#232329] rounded animate-pulse w-52" />
      </div>
    );
  }

  return (
    <div className="border-t border-[#232329] pt-3 space-y-1.5">
      <div className="flex items-center gap-4 flex-wrap">
        {commitCount !== null && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#4B4C58]">
            <GitCommitHorizontal size={10} className="text-[#5E5CE6]" />
            {commitCount} commits
          </span>
        )}
        {lastCommitDate && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#4B4C58]">
            <Clock size={10} className="text-[#5E5CE6]" />
            {timeAgo(lastCommitDate)}
          </span>
        )}
      </div>
      {lastCommitMsg && (
        <p className="text-[9px] text-[#36363F] font-mono truncate" title={lastCommitMsg}>
          &ldquo;{lastCommitMsg}&rdquo;
        </p>
      )}
    </div>
  );
}

// ── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);
  const isMouse  = useRef(false);
  const cfg      = statusConfig[project.status];
  const featured = project.featured === true;

  return (
    <motion.div
      data-testid="project-card"
      data-slug={project.slug}
      data-flipped={flipped ? "true" : "false"}
      className={`relative${featured ? " md:col-span-2" : ""}`}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => { isMouse.current = true; setFlipped(true); }}
      onMouseLeave={() => { isMouse.current = false; setFlipped(false); }}
      onClick={() => { if (!isMouse.current) setFlipped((f) => !f); }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="w-full h-full grid"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >

        {/* ── FRONT ── */}
        <div
          className={`[grid-area:1/1] rounded-2xl bg-[#161618] border transition-all duration-300 ${
            flipped
              ? "border-[#5E5CE6]/50 shadow-[0_0_30px_rgba(94,92,230,0.12)]"
              : "border-[#232329] hover:border-[#5E5CE6]/30 hover:shadow-[0_0_20px_rgba(94,92,230,0.08)]"
          } ${featured ? "flex flex-col md:flex-row" : "flex flex-col"}`}
          style={{ backfaceVisibility: "hidden" }}
        >

          {/* ── Featured left pane / normal single column ── */}
          <div className={`flex flex-col p-6 ${featured ? "md:flex-1 md:border-r md:border-[#232329]" : "flex-1"}`}>

            {/* Status row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                <span className={`text-xs ${cfg.color}`}>{cfg.label}</span>
                {featured && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-[#5E5CE6]/30 text-[#5E5CE6] bg-[#5E5CE6]/10 font-medium tracking-wider">
                    CORE
                  </span>
                )}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 rounded-lg border border-[#232329] flex items-center justify-center text-[#4B4C58] hover:border-[#5E5CE6]/40 hover:text-[#5E5CE6] transition-all"
                >
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>

            {/* Title + tagline */}
            <div className="mb-4">
              <h3 className={`font-semibold text-[#F7F8F8] mb-1 ${featured ? "text-xl" : "text-base"}`}>
                {project.title}
              </h3>
              <p className={`text-[#5E5CE6] ${featured ? "text-sm" : "text-sm"}`}>
                {project.tagline}
              </p>
            </div>

            {/* Tech stack icons */}
            <TechStack slug={project.slug} />

            {/* On non-featured: progress + stats live here */}
            {!featured && (
              <>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-[#4B4C58] tracking-wide">MVP Progress</span>
                    <span className={`text-[10px] font-medium ${cfg.color}`}>
                      {project.mvpProgress === 100 ? "Live ✓" : `${project.mvpProgress}%`}
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-[#232329] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        project.status === "live"     ? "bg-emerald-400" :
                        project.status === "building" ? "bg-[#5E5CE6]"   : "bg-[#4B4C58]"
                      }`}
                      style={{ width: `${project.mvpProgress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-auto">
                  <GitStats slug={project.slug} />
                  <p className="text-[10px] text-[#4B4C58] text-center tracking-wide mt-3">
                    <span className="hidden md:inline">hover to fund →</span>
                    <span className="md:hidden">tap to fund →</span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ── Featured right pane: progress + stats ── */}
          {featured && (
            <div className="flex flex-col p-6 md:w-72">
              <p className="text-[10px] text-[#4B4C58] uppercase tracking-widest mb-5">Live Stats</p>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#4B4C58] tracking-wide">MVP Progress</span>
                  <span className={`text-[10px] font-medium ${cfg.color}`}>
                    {project.mvpProgress === 100 ? "Live ✓" : `${project.mvpProgress}%`}
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-[#232329] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      project.status === "live"     ? "bg-emerald-400" :
                      project.status === "building" ? "bg-[#5E5CE6]"   : "bg-[#4B4C58]"
                    }`}
                    style={{ width: `${project.mvpProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-auto">
                <GitStats slug={project.slug} />
                <p className="text-[10px] text-[#4B4C58] text-center tracking-wide mt-4">
                  <span className="hidden md:inline">hover to fund →</span>
                  <span className="md:hidden">tap to fund →</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── BACK ── */}
        <div
          className="[grid-area:1/1] flex flex-col justify-center rounded-2xl p-6 bg-[#161618] border border-[#5E5CE6]/50 shadow-[0_0_30px_rgba(94,92,230,0.12)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-[#8A8B97] flex-1 text-center">{project.title}</p>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
              className="md:hidden text-[#4B4C58] hover:text-[#8A8B97] transition-colors text-lg leading-none -mr-1"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-[#4B4C58] text-center mb-6">What&apos;s your action?</p>

          <div className={`flex flex-col gap-2 ${featured ? "md:max-w-sm md:mx-auto md:w-full" : ""}`}>
            {FUNDING_TIERS.map((tier) => (
              <button
                key={tier.label}
                onClick={() => window.open(`${BMAC}?amount=${tier.amount}`, "_blank", "noopener,noreferrer")}
                className={`flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm border transition-all duration-150 cursor-pointer ${tier.style}`}
              >
                <span>{tier.label}</span>
                <span className="text-[11px] opacity-60">{tier.sub}</span>
              </button>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("All");

  const filtered = projects.filter((p) => {
    if (activeFilter === "All") return true;
    const matchTags = FILTERS.find((f) => f.key === activeFilter)?.match ?? [];
    return p.tags.some((t) => matchTags.includes(t));
  });

  return (
    <section id="projects" className="py-24 px-6 border-t border-[#232329]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-xs text-[#8A8B97] mb-3">Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F7F8F8] tracking-tight">
            Fund what gets built.{" "}
            <span className="text-[#4B4C58]">Flip a card to back a project.</span>
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {FILTERS.map(({ key }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                activeFilter === key
                  ? "border-[#5E5CE6]/50 bg-[#5E5CE6]/10 text-[#5E5CE6]"
                  : "border-[#232329] text-[#4B4C58] hover:border-[#36363F] hover:text-[#8A8B97]"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Grid — featured card spans 2 cols via md:col-span-2 on the card itself */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}
