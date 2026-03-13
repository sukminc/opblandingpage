import { NextResponse } from "next/server";
import { projects } from "../../data/projects";

const GH_OWNER = "sukminc";
const LOOKBACK_DAYS = 84;
const COMMITS_PER_REPO = 100;
const ALWAYS_INCLUDE_REPOS = ["one-percent-better-landing"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function GET() {
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (LOOKBACK_DAYS - 1));

  const repoNames = Array.from(
    new Set([
      ...ALWAYS_INCLUDE_REPOS,
      ...projects
        .map((project) => project.repoName)
        .filter((repoName): repoName is string => Boolean(repoName)),
    ])
  );

  const counts = new Map<string, number>();

  try {
    const results = await Promise.allSettled(
      repoNames.map(async (repoName) => {
        const res = await fetch(
          `https://api.github.com/repos/${GH_OWNER}/${repoName}/commits?since=${since.toISOString()}&per_page=${COMMITS_PER_REPO}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(`GitHub error ${res.status}`);
        }

        const commits = (await res.json()) as Array<{
          commit?: { author?: { date?: string | null } | null } | null;
        }>;

        commits.forEach((commit) => {
          const iso = commit.commit?.author?.date;
          if (!iso) {
            return;
          }

          const key = dayKey(new Date(iso));
          counts.set(key, (counts.get(key) ?? 0) + 1);
        });
      })
    );

    const successfulRepos = results.filter((result) => result.status === "fulfilled").length;

    const days = Array.from({ length: LOOKBACK_DAYS }, (_, index) => {
      const date = new Date(since);
      date.setUTCDate(since.getUTCDate() + index);

      const key = dayKey(date);
      return {
        date: key,
        count: counts.get(key) ?? 0,
      };
    });

    return NextResponse.json(
      {
        days,
        reposTracked: successfulRepos,
        reposAttempted: repoNames.length,
        totalCommits: days.reduce((sum, day) => sum + day.count, 0),
        activeDays: days.filter((day) => day.count > 0).length,
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
