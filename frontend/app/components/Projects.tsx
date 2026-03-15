"use client";

import { Clock, ExternalLink, GitBranch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectRepoType,
  type ProjectStage,
  type ProjectStatus,
} from "../data/projects";

const GH_OWNER = "sukminc";

const REPO_MAP: Record<string, string> = Object.fromEntries(
  projects.filter((p) => p.repoName).map((p) => [p.slug, p.repoName!])
);

const FETCHABLE_PROJECTS = projects.filter(
  (project) => Boolean(project.repoName) && project.visibility === "public" && project.category !== "featured"
);

interface Commit {
  sha: string;
  message: string;
  date: string;
  url: string;
}

interface CommitState {
  commits: Commit[];
  totalCount: number | null;
  recent14Count: number | null;
  loading: boolean;
}

function isInternalProject(project: Project) {
  return project.visibility === "internal";
}

function hasPublicRepo(project: Project) {
  return Boolean(project.repoName) && project.visibility === "public";
}

function shouldShowRepoDetails(project: Project) {
  return hasPublicRepo(project) && !isInternalProject(project);
}

const STAGE_BASELINE_PROGRESS: Record<ProjectStage, number> = {
  prototype: 36,
  "mvp-loop": 52,
  "workflow-build": 42,
  concept: 26,
  "ops-layer": 60,
  archive: 100,
};

const REPO_TYPE_BASELINE: Record<ProjectRepoType, number> = {
  "mobile-app": 20,
  "web-app": 18,
  automation: 10,
  platform: 28,
  "data-pipeline": 22,
  validation: 14,
};

const STATUS_MULTIPLIER: Record<ProjectStatus, number> = {
  live: 1,
  building: 0.9,
  idea: 1.35,
};

const CATEGORY_PRIORITY: Record<ProjectCategory, number> = {
  featured: 0,
  poker: 1,
  ops: 2,
  archive: 3,
};

const STAGE_LABELS: Record<ProjectStage, string> = {
  prototype: "Prototype",
  "mvp-loop": "MVP Loop",
  "workflow-build": "Workflow Build",
  concept: "Concept",
  "ops-layer": "Ops Layer",
  archive: "Archive",
};

const CATEGORY_META: Record<ProjectCategory, { title: string; description: string }> = {
  featured: {
    title: "Current Product Work",
    description: "Small product loops that show judgment and active execution.",
  },
  poker: {
    title: "Poker Vertical",
    description: "A separate specialist lane. Visible, but not the main hiring story.",
  },
  ops: {
    title: "Operating Layer",
    description: "The public site and internal systems behind the surface.",
  },
  archive: {
    title: "Archive / Proof of Work",
    description: "Past work that keeps engineering depth visible.",
  },
};

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live: { label: "Live", color: "text-[#111111]", dot: "bg-[#111111]" },
  building: { label: "Building", color: "text-[#6f5336]", dot: "bg-[#8a6f50] animate-pulse" },
  idea: { label: "Idea", color: "text-[#8a6f50]", dot: "bg-[#b89a76]" },
};

const STATUS_BAR: Record<ProjectStatus, string> = {
  live: "bg-[#111111]",
  building: "bg-[#8a6f50]",
  idea: "bg-[#b89a76]",
};

const TECH_COLORS: Record<string, string> = {
  "Next.js": "#111111",
  "FastAPI": "#57d1b2",
  "Python": "#8eb9ff",
  "Python (FastAPI)": "#57d1b2",
  "TypeScript": "#66a8ff",
  "TypeScript (Next.js)": "#111111",
  "SQLAlchemy": "#ff8a70",
  "Pandas": "#b89cff",
  "NumPy": "#82d4ff",
  "Vercel": "#111111",
  "PostgreSQL": "#7ea8ff",
  "Docker": "#79ccff",
  "Apache Airflow": "#5fb7ff",
  "GitHub Actions": "#6ab0ff",
  "Flutter": "#78d3ff",
  "Dart": "#56c3ff",
  "Supabase": "#6fe2a5",
  "Stripe": "#b8a1ff",
  "Pytest": "#6fdcff",
  "JSON": "#f3a86b",
  "CLI": "#6e6a62",
  "iOS": "#111111",
  "Android": "#7de38d",
};

function getRecommendedMvpTarget(project: Project, recent14Count: number | null): number {
  if (project.status === "live") return 1;

  const baseline = REPO_TYPE_BASELINE[project.repoType];
  const recent = recent14Count ?? 0;
  const activityAdjustment = Math.min(12, recent * 2);
  const featuredAdjustment = project.category === "featured" ? 0.72 : 1;
  const target = Math.round((baseline + activityAdjustment) * STATUS_MULTIPLIER[project.status] * featuredAdjustment);

  return Math.max(6, target);
}

function getMvpProgress(project: Project, totalCount: number | null, recent14Count: number | null): number {
  if (project.status === "live") return 100;
  if (!project.repoName || isInternalProject(project)) {
    return STAGE_BASELINE_PROGRESS[project.stage];
  }
  if (totalCount === null) return 0;
  const target = getRecommendedMvpTarget(project, recent14Count);
  return Math.max(0, Math.min(100, Math.round((totalCount / target) * 100)));
}

function getMvpLabel(project: Project, progress: number, loading: boolean): string {
  if (project.stage === "archive") return "Archive";
  if (project.status === "live" || progress >= 100) return "Live ✓";
  if (!project.repoName || isInternalProject(project)) return `${STAGE_LABELS[project.stage]} · Ready`;
  if (loading) return "Syncing...";
  return `${STAGE_LABELS[project.stage]} · ${progress}%`;
}

function getMvpHint(project: Project, recent14Count: number | null): string {
  if (project.category === "archive") return "Proof-of-work archive";
  if (project.category === "featured") return "Core brand product";
  if (isInternalProject(project)) return "Internal workflow system already supporting the portfolio";
  if (!project.repoName) return "Brand shell, naming, and product direction are already set";
  if (project.status === "live") return "MVP reached";
  const target = getRecommendedMvpTarget(project, recent14Count);
  const recent = recent14Count ?? 0;
  return `Auto target ${target} commits · 14d activity ${recent}`;
}

function TechBadge({ tag }: { tag: string }) {
  return (
    <div title={tag} className="h-7 flex items-center gap-2 rounded-full border border-[#ddcbb3] bg-[linear-gradient(180deg,#faf4ea_0%,#f2e6d6_100%)] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: TECH_COLORS[tag] ?? "#8b857b" }}
      />
      <span className="text-[10px] text-[#6f5336] leading-none">{tag}</span>
    </div>
  );
}

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const cfg = statusConfig[project.status];
  const repoVisibility = project.visibility === "public" ? "Public repo" : "Private build";
  const stageLabel = STAGE_LABELS[project.stage];
  const variants = [
    {
      shell:
        "border-[#111111]/15 bg-[radial-gradient(circle_at_top_left,_rgba(17,17,17,0.08),_transparent_48%),linear-gradient(135deg,#fbf7f1_0%,#f1e9df_100%)]",
      badge: "border-[#111111]/20 bg-[#111111] text-[#f8f3ea]",
      accent: "bg-[#111111]",
      note: "Core brand product",
    },
    {
      shell:
        "border-[#8d8574]/20 bg-[radial-gradient(circle_at_top_left,_rgba(166,145,109,0.18),_transparent_45%),linear-gradient(135deg,#fbf7f1_0%,#efe8dc_100%)]",
      badge: "border-[#a6916d]/25 bg-[#f6ecda] text-[#7a6745]",
      accent: "bg-[#a6916d]",
      note: "Shipping quietly",
    },
  ][index % 2];

  return (
    <div className={`glass-panel rounded-[1.75rem] border px-6 py-6 shadow-[0_18px_60px_rgba(17,17,17,0.06)] md:min-h-[220px] flex flex-col justify-between ${variants.shell}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${variants.accent}`} />
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b857b]">Current product</p>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[#111111]">{project.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#4f4a43]">{project.tagline}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${variants.badge}`}>
          {cfg.label}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[#d8c4a6] bg-[linear-gradient(180deg,#fcf7ee_0%,#f3e7d7_100%)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#6f5336]">
            {stageLabel}
          </span>
          <span className="rounded-full border border-[#d8c4a6] bg-[linear-gradient(180deg,#fcf7ee_0%,#f3e7d7_100%)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#6f5336]">
            {repoVisibility}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a6f50]">{variants.note}</p>
          {project.mvpEta && <p className="mt-1 text-[11px] text-[#8b857b]">{project.mvpEta}</p>}
        </div>
      </div>
    </div>
  );
}

function PokerVerticalCard() {
  return (
    <div className="glass-panel rounded-[1.75rem] border border-[#d8c3a4] bg-[radial-gradient(circle_at_top_left,rgba(195,166,125,0.18),transparent_42%),linear-gradient(135deg,#fbf7f1_0%,#f1e4d3_100%)] p-6 shadow-[0_18px_60px_rgba(17,17,17,0.05)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#8a6f50]" />
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8a6f50]">Separate specialist lane</p>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-[#111111]">
            Poker remains visible, but secondary.
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#5f5a52]">
            1% Better.poker stays separate from the recruiter-facing story here.
          </p>
        </div>
        <span className="rounded-full border border-[#d8c4a6] bg-[linear-gradient(180deg,#fcf7ee_0%,#f3e7d7_100%)] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#6f5336]">
          Not the main hiring story
        </span>
      </div>
    </div>
  );
}

function RichProjectCard({ project, commitState }: { project: Project; commitState: CommitState }) {
  const cfg = statusConfig[project.status];
  const repoName = shouldShowRepoDetails(project) ? REPO_MAP[project.slug] : undefined;
  const progress = getMvpProgress(project, commitState.totalCount, commitState.recent14Count);
  const progressLabel = getMvpLabel(project, progress, commitState.loading);
  const progressHint = getMvpHint(project, commitState.recent14Count);
  const readinessSignals = project.readinessSignals ?? [];

  return (
    <div className={project.featured ? "md:col-span-2" : ""}>
      <div className="glass-panel flex h-full flex-col rounded-[1.75rem] border-[#ddd8cf] p-6 transition-colors hover:border-[#c6a880] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_20px_60px_rgba(17,17,17,0.05),0_8px_28px_rgba(138,111,80,0.08)]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <h3 className="text-sm font-semibold text-[#111111] truncate">{project.title}</h3>
            </div>
            {repoName && (
              <div className="flex items-center gap-1.5 pl-3.5 text-[10px] text-[#8a6f50]">
                <GitBranch size={9} />
                <span className="font-mono">{GH_OWNER}/{repoName}</span>
              </div>
            )}
          </div>
          {commitState.totalCount !== null && repoName && (
            <div className="text-right flex-shrink-0">
              <span className="text-base font-bold text-[#111111] leading-none">{commitState.totalCount}</span>
              <p className="text-[9px] text-[#8b857b]">commits</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-1.5 flex justify-between text-[10px] text-[#8b857b]">
            <span className="truncate pr-2">{project.tagline}</span>
            <span className="flex-shrink-0">{progressLabel}</span>
          </div>
          <div className="h-1 bg-[#ebe5db] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${STATUS_BAR[project.status]}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {project.mvpEta && progress < 100 && (
            <p className="mt-2 text-[10px] text-[#8b857b]">{project.mvpEta}</p>
          )}
          <p className="mt-1 text-[10px] text-[#a68a68]">{progressHint}</p>
        </div>

        <div className="flex flex-col gap-0.5 mb-4 flex-1">
          {readinessSignals.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {readinessSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-[#d8c4a6] bg-[linear-gradient(180deg,#fcf7ee_0%,#f3e7d7_100%)] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#6f5336]"
                >
                  {signal}
                </span>
              ))}
            </div>
          )}
          {commitState.loading && repoName && (
            <div className="space-y-2 py-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-2.5 animate-pulse">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d8d1c4] flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-[#efebe4] rounded w-3/4" />
                    <div className="h-2 bg-[#efebe4] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!commitState.loading && repoName && commitState.commits.slice(0, 1).map((c, i) => (
            <a
              key={c.sha}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-1.5 flex items-start gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-[#f5ede1]"
            >
              <div className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${i === 0 ? "bg-[#8a6f50]" : "bg-[#c4b29a]"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs truncate leading-snug ${i === 0 ? "text-[#111111]" : "text-[#5f5a52]"} group-hover:text-[#111111] transition-colors`}>
                  {c.message.split("\n")[0]}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <code className="text-[9px] text-[#8b857b] font-mono">{c.sha.slice(0, 7)}</code>
                  <span className="text-[9px] text-[#c5bfb4]">·</span>
                  <span className="flex items-center gap-1 text-[9px] text-[#8b857b]">
                    <Clock size={8} />
                    {timeAgo(c.date)}
                  </span>
                </div>
              </div>
              <ExternalLink size={10} className="mt-1 flex-shrink-0 text-[#8a6f50] opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TechBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [commitMap, setCommitMap] = useState<Record<string, CommitState>>(() =>
    Object.fromEntries(
      projects.map((p) => [
        p.slug,
        {
          commits: [],
          totalCount: null,
          recent14Count: null,
          loading: FETCHABLE_PROJECTS.some((project) => project.slug === p.slug),
        },
      ])
    )
  );

  const sortedSlugsRef = useRef<string[] | null>(null);
  const loadedCount = useRef(0);
  const totalRepos = FETCHABLE_PROJECTS.length;

  useEffect(() => {
    FETCHABLE_PROJECTS.forEach(async (project) => {
      const repoName = REPO_MAP[project.slug];
      if (!repoName) return;
      try {
        const res = await fetch(`/api/commits?repo=${repoName}`);
        if (!res.ok) throw new Error(`${res.status}`);
        const data = await res.json();
        setCommitMap((prev) => ({
          ...prev,
          [project.slug]: {
            commits: data.commits,
            totalCount: data.totalCount,
            recent14Count: data.recent14Count ?? null,
            loading: false,
          },
        }));
      } catch {
        setCommitMap((prev) => ({
          ...prev,
          [project.slug]: { commits: [], totalCount: null, recent14Count: null, loading: false },
        }));
      } finally {
        loadedCount.current += 1;
        if (loadedCount.current >= totalRepos && !sortedSlugsRef.current) {
          setCommitMap((snap) => {
            sortedSlugsRef.current = [...projects]
              .sort((a, b) => {
                const categoryDelta = CATEGORY_PRIORITY[a.category] - CATEGORY_PRIORITY[b.category];
                if (categoryDelta !== 0) return categoryDelta;
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                const aDate = snap[a.slug]?.commits[0]?.date ?? "";
                const bDate = snap[b.slug]?.commits[0]?.date ?? "";
                return bDate.localeCompare(aDate);
              })
              .map((p) => p.slug);
            return snap;
          });
        }
      }
    });
  }, [totalRepos]);

  const displayOrder = sortedSlugsRef.current
    ? sortedSlugsRef.current.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean)
    : projects;

  const sections = (["featured", "poker", "ops", "archive"] as ProjectCategory[]).map((category) => ({
    category,
    meta: CATEGORY_META[category],
    items: displayOrder.filter((project) => project.category === category),
  })).filter((section) => section.items.length > 0 || section.category === "poker");

  return (
    <section id="projects" className="section-shell py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8a6f50]" />
            <p className="text-xs text-[#8a6f50]">Selected work · linked activity</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight">
            Selected work and public proof.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f5a52]">
            Active product loops, supporting systems, and proof of work.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.category}>
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#111111]">{section.meta.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f5a52]">{section.meta.description}</p>
              </div>
              {section.category === "poker" ? (
                <PokerVerticalCard />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((project, index) =>
                    section.category === "featured" ? (
                      <FeaturedProjectCard key={project.slug} project={project} index={index} />
                    ) : (
                      <RichProjectCard
                        key={project.slug}
                        project={project}
                        commitState={commitMap[project.slug] ?? { commits: [], totalCount: null, recent14Count: null, loading: false }}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
