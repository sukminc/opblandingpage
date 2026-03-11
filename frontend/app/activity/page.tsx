"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { projects } from "../data/projects";
import { GitCommitHorizontal, GitBranch, ExternalLink, RefreshCw, Clock, AlertCircle } from "lucide-react";

const GH_OWNER = "sukminc";

// Derived from projects.ts — add repoName there to surface a project here
const REPO_MAP: Record<string, string> = Object.fromEntries(
  projects.filter((p) => p.repoName).map((p) => [p.slug, p.repoName!])
);

interface Commit {
  sha:     string;
  message: string;
  date:    string;
  url:     string;
  author:  string;
}

interface RepoActivity {
  slug:        string;
  repoName:    string;
  title:       string;
  status:      string;
  commits:     Commit[];
  totalCount:  number | null;
  error:       string | null;
  loading:     boolean;
  isNew:       boolean; // not in projects.ts yet
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30)   return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

function statusColor(status: string) {
  if (status === "live")     return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (status === "building") return "text-[#5E5CE6] bg-[#5E5CE6]/10 border-[#5E5CE6]/20";
  return "text-[#8A8B97] bg-[#8A8B97]/10 border-[#8A8B97]/20";
}

function CommitRow({ commit, index }: { commit: Commit; index: number }) {
  const isFirst = index === 0;
  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 py-2.5 hover:bg-white/[0.02] rounded-lg px-2 -mx-2 transition-colors"
    >
      {/* Timeline dot */}
      <div className="mt-1 flex-shrink-0 flex flex-col items-center gap-1">
        <div className={`w-2 h-2 rounded-full border ${isFirst ? "bg-[#5E5CE6] border-[#5E5CE6]" : "bg-transparent border-[#36363F]"}`} />
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-snug truncate ${isFirst ? "text-[#F7F8F8]" : "text-[#8A8B97]"} group-hover:text-[#F7F8F8] transition-colors`}>
          {commit.message.split("\n")[0]}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <code className="text-[10px] text-[#4B4C58] font-mono">{commit.sha.slice(0,7)}</code>
          <span className="text-[10px] text-[#4B4C58]">·</span>
          <span className="text-[10px] text-[#4B4C58]">{timeAgo(commit.date)}</span>
          {commit.author && (
            <>
              <span className="text-[10px] text-[#4B4C58]">·</span>
              <span className="text-[10px] text-[#4B4C58]">{commit.author}</span>
            </>
          )}
        </div>
      </div>
      <ExternalLink size={12} className="mt-1 flex-shrink-0 text-[#4B4C58] opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

function RepoCard({ repo }: { repo: RepoActivity }) {
  const proj = projects.find(p => p.slug === repo.slug);

  return (
    <div className={`rounded-2xl border bg-[#0D0D11] p-6 transition-all ${repo.isNew ? "border-amber-500/30" : "border-[#232329] hover:border-[#36363F]"}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="font-semibold text-[#F7F8F8] text-base truncate">{repo.title}</h3>
            {repo.isNew && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-medium flex-shrink-0">
                New repo
              </span>
            )}
            {!repo.isNew && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${statusColor(repo.status)}`}>
                {repo.status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#4B4C58]">
            <GitBranch size={11} />
            <span className="font-mono">{GH_OWNER}/{repo.repoName}</span>
          </div>
        </div>

        {/* Commit count */}
        {repo.totalCount !== null && (
          <div className="flex-shrink-0 text-right">
            <div className="text-xl font-bold text-[#F7F8F8]">{repo.totalCount}</div>
            <div className="text-[10px] text-[#4B4C58]">commits</div>
          </div>
        )}
      </div>

      {/* Progress bar (known projects only) */}
      {proj && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-[#4B4C58] mb-1">
            <span>{proj.tagline}</span>
            <span>{proj.mvpProgress}%</span>
          </div>
          <div className="h-1 bg-[#18181f] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5E5CE6] to-[#8B5CF6] transition-all duration-700"
              style={{ width: `${proj.mvpProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Commits */}
      {repo.loading && (
        <div className="space-y-2.5 py-1">
          {[0,1,2].map(i => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-[#232329] flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 bg-[#18181f] rounded w-3/4" />
                <div className="h-2.5 bg-[#18181f] rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {repo.error && (
        <div className="flex items-center gap-2 text-xs text-[#4B4C58] py-2">
          <AlertCircle size={12} />
          <span>{repo.error}</span>
        </div>
      )}

      {!repo.loading && !repo.error && repo.commits.length > 0 && (
        <div className="space-y-0.5">
          {repo.commits.map((c, i) => (
            <CommitRow key={c.sha} commit={c} index={i} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[#18181f] flex items-center justify-between">
        <a
          href={`https://github.com/${GH_OWNER}/${repo.repoName}/commits`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#4B4C58] hover:text-[#5E5CE6] transition-colors flex items-center gap-1"
        >
          <GitCommitHorizontal size={12} />
          View full history
        </a>
        {repo.isNew && (
          <span className="text-[10px] text-amber-500/60">Not yet on landing page</span>
        )}
      </div>
    </div>
  );
}

export default function ActivityPage() {
  const [repos, setRepos] = useState<RepoActivity[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [newRepoCount, setNewRepoCount] = useState(0);

  async function fetchAllActivity() {
    setRefreshing(true);

    // 1. Start with known projects
    const initial: RepoActivity[] = projects.map(p => ({
      slug:       p.slug,
      repoName:   REPO_MAP[p.slug] ?? p.slug,
      title:      p.title,
      status:     p.status,
      commits:    [],
      totalCount: null,
      error:      null,
      loading:    true,
      isNew:      false,
    }));

    // 2. Fetch all public repos from GitHub to detect new ones
    try {
      const ghRes = await fetch(`https://api.github.com/users/${GH_OWNER}/repos?per_page=100&sort=updated`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (ghRes.ok) {
        const ghRepos: Array<{ name: string; description: string | null; updated_at: string }> = await ghRes.json();
        const knownRepoNames = new Set(Object.values(REPO_MAP));
        const newRepos = ghRepos.filter(r => !knownRepoNames.has(r.name));

        for (const nr of newRepos) {
          initial.push({
            slug:       nr.name.toLowerCase(),
            repoName:   nr.name,
            title:      nr.name,
            status:     "idea",
            commits:    [],
            totalCount: null,
            error:      null,
            loading:    true,
            isNew:      true,
          });
        }
        setNewRepoCount(newRepos.length);
      }
    } catch {
      // non-fatal — continue with known projects
    }

    setRepos([...initial]);

    // 3. Fetch commits for each repo in parallel
    await Promise.all(
      initial.map(async (repo) => {
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GH_OWNER}/${repo.repoName}/commits?per_page=3`,
            { headers: { Accept: "application/vnd.github+json" } }
          );

          if (!res.ok) {
            setRepos(prev => prev.map(r => r.repoName === repo.repoName
              ? { ...r, loading: false, error: res.status === 404 ? "Repo not found" : `API error ${res.status}` }
              : r
            ));
            return;
          }

          // Get total commit count via Link header
          const linkHeader = res.headers.get("Link") ?? "";
          const lastMatch  = linkHeader.match(/[?&]page=(\d+)>; rel="last"/);

          // For repos with <3 commits, page param won't appear — count from array
          const commits: Commit[] = (await res.json()).map((c: {
            sha: string;
            html_url: string;
            commit: { message: string; author: { date: string; name: string } };
          }) => ({
            sha:     c.sha,
            message: c.commit.message,
            date:    c.commit.author.date,
            url:     c.html_url,
            author:  c.commit.author.name,
          }));

          const totalCount = lastMatch
            ? parseInt(lastMatch[1], 10)
            : commits.length;

          setRepos(prev => prev.map(r => r.repoName === repo.repoName
            ? { ...r, commits, totalCount, loading: false }
            : r
          ));
        } catch {
          setRepos(prev => prev.map(r => r.repoName === repo.repoName
            ? { ...r, loading: false, error: "Network error" }
            : r
          ));
        }
      })
    );

    setLastRefreshed(new Date());
    setRefreshing(false);
  }

  useEffect(() => { fetchAllActivity(); }, []);

  // Split known vs new
  const knownRepos = repos.filter(r => !r.isNew);
  const newRepos   = repos.filter(r => r.isNew);

  return (
    <main className="min-h-screen bg-[#0D0D11] text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#5E5CE6] font-medium mb-2">
                GitHub · sukminc
              </p>
              <h1 className="text-4xl font-bold tracking-tight">Build Log</h1>
            </div>

            <div className="flex items-center gap-4">
              {newRepoCount > 0 && (
                <span className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  {newRepoCount} new repo{newRepoCount > 1 ? "s" : ""} detected
                </span>
              )}
              <button
                onClick={fetchAllActivity}
                disabled={refreshing}
                className="flex items-center gap-2 text-xs text-[#8A8B97] hover:text-[#F7F8F8] transition-colors disabled:opacity-40"
              >
                <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#4B4C58]">
            <Clock size={11} />
            <span>Last updated {timeAgo(lastRefreshed.toISOString())}</span>
            <span>·</span>
            <span>Live from GitHub API</span>
            <span>·</span>
            <span>Showing last 3 commits per project</span>
          </div>
        </div>

        {/* Focus callout */}
        <div className="rounded-2xl border border-[#5E5CE6]/20 bg-[#5E5CE6]/5 p-5 mb-10">
          <p className="text-xs text-[#5E5CE6] tracking-widest uppercase font-medium mb-2">Current Focus</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <p className="text-sm font-semibold text-white">onepercentbetter</p>
              <p className="text-xs text-[#8A8B97] mt-0.5">Designing the core logic — early architecture phase</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">1% Better Focus</p>
              <p className="text-xs text-[#8A8B97] mt-0.5">Instant ship — building fast, deploying soon</p>
            </div>
          </div>
        </div>

        {/* Known projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {knownRepos.map(r => <RepoCard key={r.repoName} repo={r} />)}
        </div>

        {/* New / untracked repos */}
        {newRepos.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-4 mt-10">
              <div className="h-px flex-1 bg-amber-500/15" />
              <p className="text-xs text-amber-500/60 uppercase tracking-widest font-medium">
                New repos — not yet on landing page
              </p>
              <div className="h-px flex-1 bg-amber-500/15" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newRepos.map(r => <RepoCard key={r.repoName} repo={r} />)}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#4B4C58] mb-4">Watching the build? Back it.</p>
          <a
            href="/#back"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#5E5CE6]/30 text-[#5E5CE6] text-sm font-medium hover:bg-[#5E5CE6]/10 hover:border-[#5E5CE6]/60 transition-all"
          >
            Back the build
          </a>
        </div>

      </div>
    </main>
  );
}
