"use client";

import { Clock, ExternalLink, GitBranch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectStatus } from "../data/projects";

const GH_OWNER = "sukminc";

const REPO_MAP: Record<string, string> = Object.fromEntries(
  projects.filter((p) => p.repoName).map((p) => [p.slug, p.repoName!])
);

interface Commit {
  sha:     string;
  message: string;
  date:    string;
  url:     string;
}

interface CommitState {
  commits:    Commit[];
  totalCount: number | null;
  loading:    boolean;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
  live:     { label: "Live",     color: "text-emerald-400", dot: "bg-emerald-400" },
  building: { label: "Building", color: "text-[#b8ff72]",   dot: "bg-[#b8ff72] animate-pulse" },
  idea:     { label: "Idea",     color: "text-[#61746a]",   dot: "bg-[#61746a]" },
};

const STATUS_BAR: Record<string, string> = {
  live:     "bg-emerald-400",
  building: "bg-[#b8ff72]",
  idea:     "bg-[#61746a]",
};

const TECH_COLORS: Record<string, string> = {
  "Next.js": "#eff6ef",
  "FastAPI": "#57d1b2",
  "Python": "#8eb9ff",
  "Python (FastAPI)": "#57d1b2",
  "TypeScript": "#66a8ff",
  "TypeScript (Next.js)": "#eff6ef",
  "SQLAlchemy": "#ff8a70",
  "Pandas": "#b89cff",
  "NumPy": "#82d4ff",
  "Vercel": "#eff6ef",
  "PostgreSQL": "#7ea8ff",
  "Docker": "#79ccff",
  "Apache Airflow": "#5fb7ff",
  "GitHub Actions": "#6ab0ff",
  "Flutter": "#78d3ff",
  "Dart": "#56c3ff",
  "Supabase": "#6fe2a5",
  "Stripe": "#b8a1ff",
  "Pytest": "#6fdcff",
  "iOS": "#eff6ef",
  "Android": "#7de38d",
};

function TechBadge({ tag }: { tag: string }) {
  return (
    <div title={tag} className="h-7 flex items-center gap-2 bg-[#12201a] border border-[#24372f] rounded-full px-3">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: TECH_COLORS[tag] ?? "#61746a" }}
      />
      <span className="text-[10px] text-[#a6b8ae] leading-none">{tag}</span>
    </div>
  );
}

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30)   return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

function ProjectCard({ project, commitState }: { project: Project; commitState: CommitState }) {
  const cfg = statusConfig[project.status];
  const repoName = REPO_MAP[project.slug];

  return (
    <div className={project.featured ? "md:col-span-2" : ""}>
      <div
        onClick={() => document.getElementById("fund")?.scrollIntoView({ behavior: "smooth" })}
        className={`glass-panel flex flex-col rounded-[1.75rem] p-6 transition-colors h-full cursor-pointer ${
          project.featured
            ? "border-[#b8ff72]/35 hover:border-[#d3ff9a]/45"
            : "border-[#24372f] hover:border-[#4d7263]"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <h3 className="text-sm font-semibold text-[#eff6ef] truncate">{project.title}</h3>
            </div>
            {repoName && (
              <div className="flex items-center gap-1.5 text-[10px] text-[#61746a] pl-3.5">
                <GitBranch size={9} />
                <span className="font-mono">{GH_OWNER}/{repoName}</span>
              </div>
            )}
          </div>
          {commitState.totalCount !== null && (
            <div className="text-right flex-shrink-0">
              <span className="text-base font-bold text-[#eff6ef] leading-none">{commitState.totalCount}</span>
              <p className="text-[9px] text-[#61746a]">commits</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-[#61746a] mb-1.5">
            <span className="truncate pr-2">{project.tagline}</span>
            <span className="flex-shrink-0">
              {project.mvpProgress === 100 ? "Live ✓" : `${project.mvpProgress}%`}
            </span>
          </div>
          <div className="h-1 bg-[#1a2923] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${STATUS_BAR[project.status] ?? "bg-[#61746a]"}`}
              style={{ width: `${project.mvpProgress}%` }}
            />
          </div>
        </div>

        {/* Commit feed */}
        <div className="flex flex-col gap-0.5 mb-4 flex-1">
          {commitState.loading && (
            <div className="space-y-2 py-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-2.5 animate-pulse">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#24372f] flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-[#12201a] rounded w-3/4" />
                    <div className="h-2 bg-[#12201a] rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {!commitState.loading &&
            commitState.commits.slice(0, 1).map((c, i) => (
              <a
                key={c.sha}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group flex items-start gap-2.5 py-1.5 hover:bg-white/[0.02] rounded-lg px-1.5 -mx-1.5 transition-colors"
              >
                <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-[#b8ff72]" : "bg-[#4d7263]"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs truncate leading-snug ${i === 0 ? "text-[#eff6ef]" : "text-[#a6b8ae]"} group-hover:text-[#eff6ef] transition-colors`}>
                    {c.message.split("\n")[0]}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <code className="text-[9px] text-[#61746a] font-mono">{c.sha.slice(0, 7)}</code>
                    <span className="text-[9px] text-[#4d7263]">·</span>
                    <span className="flex items-center gap-1 text-[9px] text-[#61746a]">
                      <Clock size={8} />
                      {timeAgo(c.date)}
                    </span>
                  </div>
                </div>
                <ExternalLink size={10} className="mt-1 flex-shrink-0 text-[#61746a] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
        </div>

        {/* Tech icons */}
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
      projects.map((p) => [p.slug, { commits: [], totalCount: null, loading: !!REPO_MAP[p.slug] }])
    )
  );

  // Stable sort order — set once when commits first arrive, never re-shuffled
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
          [project.slug]: { commits: data.commits, totalCount: data.totalCount, loading: false },
        }));
      } catch {
        setCommitMap((prev) => ({
          ...prev,
          [project.slug]: { commits: [], totalCount: null, loading: false },
        }));
      } finally {
        loadedCount.current += 1;
        // Lock sort order once all repos have responded
        if (loadedCount.current >= totalRepos && !sortedSlugsRef.current) {
          setCommitMap((snap) => {
            sortedSlugsRef.current = [...projects]
              .sort((a, b) => {
                // featured always pins to top
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayOrder = sortedSlugsRef.current
    ? sortedSlugsRef.current.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean)
    : projects;

  return (
    <section id="projects" className="section-shell py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-[#a6b8ae]">Projects · Live from GitHub</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#eff6ef] tracking-tight">
            Built to reward{" "}
            <span className="text-[#61746a]">consistent motion.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayOrder.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              commitState={commitMap[p.slug] ?? { commits: [], totalCount: null, loading: false }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
