"use client";

import { useEffect, useState } from "react";
import { GitCommitHorizontal, GitBranch, ExternalLink, Clock, AlertCircle } from "lucide-react";
import { projects } from "../data/projects";

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

interface RepoActivity {
  slug:       string;
  repoName:   string;
  title:      string;
  tagline:    string;
  status:     string;
  mvpProgress: number;
  commits:    Commit[];
  totalCount: number | null;
  error:      string | null;
  loading:    boolean;
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

const STATUS_DOT: Record<string, string> = {
  live:     "bg-emerald-400",
  building: "bg-[#5E5CE6] animate-pulse",
  idea:     "bg-[#4B4C58]",
};

const STATUS_BAR: Record<string, string> = {
  live:     "bg-emerald-400",
  building: "bg-[#5E5CE6]",
  idea:     "bg-[#4B4C58]",
};

function RepoCard({ repo }: { repo: RepoActivity }) {
  return (
    <div className="rounded-2xl border border-[#232329] hover:border-[#36363F] bg-[#161618] p-5 transition-colors flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[repo.status] ?? "bg-[#4B4C58]"}`} />
            <h3 className="text-sm font-semibold text-[#F7F8F8] truncate">{repo.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#4B4C58] pl-3.5">
            <GitBranch size={9} />
            <span className="font-mono">{GH_OWNER}/{repo.repoName}</span>
          </div>
        </div>
        {repo.totalCount !== null && (
          <div className="text-right flex-shrink-0">
            <span className="text-base font-bold text-[#F7F8F8]">{repo.totalCount}</span>
            <p className="text-[9px] text-[#4B4C58]">commits</p>
          </div>
        )}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10px] text-[#4B4C58] mb-1.5">
          <span className="truncate pr-2">{repo.tagline}</span>
          <span className="flex-shrink-0">{repo.mvpProgress === 100 ? "Live ✓" : `${repo.mvpProgress}%`}</span>
        </div>
        <div className="h-1 bg-[#232329] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${STATUS_BAR[repo.status] ?? "bg-[#4B4C58]"}`}
            style={{ width: `${repo.mvpProgress}%` }}
          />
        </div>
      </div>

      {/* Commits */}
      <div className="flex flex-col gap-0.5">
        {repo.loading && (
          <div className="space-y-2 py-1">
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-2.5 animate-pulse">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#232329] flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 bg-[#1C1C1F] rounded w-3/4" />
                  <div className="h-2 bg-[#1C1C1F] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {repo.error && (
          <div className="flex items-center gap-1.5 text-[10px] text-[#4B4C58] py-1">
            <AlertCircle size={10} />
            <span>{repo.error}</span>
          </div>
        )}

        {!repo.loading && !repo.error && repo.commits.map((c, i) => (
          <a
            key={c.sha}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2.5 py-1.5 hover:bg-white/[0.02] rounded-lg px-1.5 -mx-1.5 transition-colors"
          >
            <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-[#5E5CE6]" : "bg-[#36363F]"}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-xs truncate leading-snug ${i === 0 ? "text-[#F7F8F8]" : "text-[#8A8B97]"} group-hover:text-[#F7F8F8] transition-colors`}>
                {c.message.split("\n")[0]}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <code className="text-[9px] text-[#4B4C58] font-mono">{c.sha.slice(0, 7)}</code>
                <span className="text-[9px] text-[#36363F]">·</span>
                <span className="flex items-center gap-1 text-[9px] text-[#4B4C58]">
                  <Clock size={8} />
                  {timeAgo(c.date)}
                </span>
              </div>
            </div>
            <ExternalLink size={10} className="mt-1 flex-shrink-0 text-[#4B4C58] opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {/* Footer */}
      <a
        href={`https://github.com/${GH_OWNER}/${repo.repoName}/commits`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-[10px] text-[#4B4C58] hover:text-[#5E5CE6] transition-colors mt-auto pt-3 border-t border-[#1C1C1F]"
      >
        <GitCommitHorizontal size={11} />
        View full history
      </a>
    </div>
  );
}

export default function BuildLog() {
  const [repos, setRepos] = useState<RepoActivity[]>([]);

  useEffect(() => {
    const initial: RepoActivity[] = projects.map((p) => ({
      slug:        p.slug,
      repoName:    REPO_MAP[p.slug] ?? p.slug,
      title:       p.title,
      tagline:     p.tagline,
      status:      p.status,
      mvpProgress: p.mvpProgress,
      commits:     [],
      totalCount:  null,
      error:       null,
      loading:     !!REPO_MAP[p.slug],
    }));
    setRepos(initial);

    Promise.all(
      initial.map(async (repo) => {
        if (!REPO_MAP[repo.slug]) return;
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GH_OWNER}/${repo.repoName}/commits?per_page=2`,
            { headers: { Accept: "application/vnd.github+json" } }
          );
          if (!res.ok) {
            setRepos((prev) =>
              prev.map((r) =>
                r.slug === repo.slug
                  ? { ...r, loading: false, error: res.status === 404 ? "No repo" : `Error ${res.status}` }
                  : r
              )
            );
            return;
          }

          const linkHeader = res.headers.get("Link") ?? "";
          const lastMatch  = linkHeader.match(/[?&]page=(\d+)>; rel="last"/);

          const data = await res.json();
          const commits: Commit[] = (Array.isArray(data) ? data : []).map((c: {
            sha: string;
            html_url: string;
            commit: { message: string; author: { date: string } };
          }) => ({
            sha:     c.sha,
            message: c.commit.message,
            date:    c.commit.author.date,
            url:     c.html_url,
          }));

          setRepos((prev) =>
            prev.map((r) =>
              r.slug === repo.slug
                ? { ...r, commits, totalCount: lastMatch ? parseInt(lastMatch[1], 10) : commits.length, loading: false }
                : r
            )
          );
        } catch {
          setRepos((prev) =>
            prev.map((r) =>
              r.slug === repo.slug ? { ...r, loading: false, error: "Network error" } : r
            )
          );
        }
      })
    );
  }, []);

  return (
    <section id="buildlog" className="py-24 px-6 border-t border-[#232329]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-[#8A8B97]">Build Log · Live from GitHub</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F7F8F8] tracking-tight">
            Shipping in public.{" "}
            <span className="text-[#4B4C58]">Watch the build.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((r) => (
            <RepoCard key={r.slug} repo={r} />
          ))}
        </div>

      </div>
    </section>
  );
}
