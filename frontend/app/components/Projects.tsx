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
    title: "Featured Products",
    description: "Sneak peaks of the two products carrying the clearest 1% Better consumer story.",
  },
  poker: {
    title: "Poker Product Line",
    description: "The poker brand surface and its product family, with the structure visible but the deeper details still controlled.",
  },
  ops: {
    title: "Operating Layer",
    description: "The systems that power the portfolio itself, including the public website and internal workflow layer.",
  },
  archive: {
    title: "Archive / Proof of Work",
    description: "Proof of engineering depth that stays visible without competing with the active product thesis.",
  },
};

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live: { label: "Live", color: "text-[#111111]", dot: "bg-[#111111]" },
  building: { label: "Building", color: "text-[#5f5a52]", dot: "bg-[#5f5a52] animate-pulse" },
  idea: { label: "Idea", color: "text-[#8b857b]", dot: "bg-[#8b857b]" },
};

const STATUS_BAR: Record<ProjectStatus, string> = {
  live: "bg-[#111111]",
  building: "bg-[#5f5a52]",
  idea: "bg-[#8b857b]",
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
  if (totalCount === null) return 0;
  const target = getRecommendedMvpTarget(project, recent14Count);
  return Math.max(0, Math.min(100, Math.round((totalCount / target) * 100)));
}

function getMvpLabel(project: Project, progress: number, loading: boolean): string {
  if (project.stage === "archive") return "Archive";
  if (project.status === "live" || progress >= 100) return "Live ✓";
  if (loading) return "Syncing...";
  return `${STAGE_LABELS[project.stage]} · ${progress}%`;
}

function getMvpHint(project: Project, recent14Count: number | null): string {
  if (project.category === "archive") return "Proof-of-work archive";
  if (project.category === "featured") return "Core brand product";
  if (project.status === "live") return "MVP reached";
  const target = getRecommendedMvpTarget(project, recent14Count);
  const recent = recent14Count ?? 0;
  return `Auto target ${target} commits · 14d activity ${recent}`;
}

function TechBadge({ tag }: { tag: string }) {
  return (
    <div title={tag} className="h-7 flex items-center gap-2 bg-[#f6f3ee] border border-[#ddd8cf] rounded-full px-3">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: TECH_COLORS[tag] ?? "#8b857b" }}
      />
      <span className="text-[10px] text-[#5f5a52] leading-none">{tag}</span>
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
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b857b]">Featured product</p>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[#111111]">{project.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#4f4a43]">{project.tagline}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] ${variants.badge}`}>
          Coming soon
        </span>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#8b857b]">{variants.note}</p>
        {project.mvpEta && <p className="text-[11px] text-[#8b857b]">{project.mvpEta}</p>}
      </div>
    </div>
  );
}

function RichProjectCard({ project, commitState }: { project: Project; commitState: CommitState }) {
  const cfg = statusConfig[project.status];
  const repoName = REPO_MAP[project.slug];
  const progress = getMvpProgress(project, commitState.totalCount, commitState.recent14Count);
  const progressLabel = getMvpLabel(project, progress, commitState.loading);
  const progressHint = getMvpHint(project, commitState.recent14Count);

  return (
    <div className={project.featured ? "md:col-span-2" : ""}>
      <div className="glass-panel flex flex-col rounded-[1.75rem] p-6 transition-colors h-full border-[#ddd8cf] hover:border-[#b9b2a7]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <h3 className="text-sm font-semibold text-[#111111] truncate">{project.title}</h3>
            </div>
            {repoName && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#8b857b] pl-3.5">
                <GitBranch size={9} />
                <span className="font-mono">{GH_OWNER}/{repoName}</span>
              </div>
            )}
          </div>
          {commitState.totalCount !== null && (
            <div className="text-right flex-shrink-0">
              <span className="text-base font-bold text-[#111111] leading-none">{commitState.totalCount}</span>
              <p className="text-[9px] text-[#8b857b]">commits</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-[#8b857b] mb-1.5">
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
          <p className="mt-1 text-[10px] text-[#b0a99d]">{progressHint}</p>
        </div>

        <div className="flex flex-col gap-0.5 mb-4 flex-1">
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
          {!commitState.loading && commitState.commits.slice(0, 1).map((c, i) => (
            <a
              key={c.sha}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 py-1.5 hover:bg-[#f1efea] rounded-lg px-1.5 -mx-1.5 transition-colors"
            >
              <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-[#111111]" : "bg-[#b9b2a7]"}`} />
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
              <ExternalLink size={10} className="mt-1 flex-shrink-0 text-[#8b857b] opacity-0 group-hover:opacity-100 transition-opacity" />
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
      projects.map((p) => [p.slug, { commits: [], totalCount: null, recent14Count: null, loading: !!REPO_MAP[p.slug] }])
    )
  );

  const sortedSlugsRef = useRef<string[] | null>(null);
  const loadedCount = useRef(0);
  const totalRepos = projects.filter((p) => REPO_MAP[p.slug]).length;

  useEffect(() => {
    projects.forEach(async (project) => {
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
  }));

  return (
    <section id="projects" className="section-shell py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <p className="text-xs text-[#8b857b]">Projects · Latest linked GitHub activity</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight">
            Brand first.
            {" "}
            <span className="text-[#8b857b]">The core products whisper. The rest can explain themselves.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5f5a52]">
            Featured products stay quieter on purpose. The broader product lines, operating layer, and archive still carry the visible GitHub proof.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.category}>
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-[#111111]">{section.meta.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#5f5a52]">{section.meta.description}</p>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
