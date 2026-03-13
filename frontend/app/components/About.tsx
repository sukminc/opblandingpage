"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const experience = [
  {
    company: "OnePercentBetter.dev",
    role: "Founder",
    period: "2025 - Present",
    summary:
      "Using this studio as a live learning loop for LLMs, product iteration, and fast deployment.",
  },
  {
    company: "TheScore / ESPN Bet",
    role: "Senior Data Engineer",
    period: "2023 - 2025",
    summary:
      "Built and maintained data pipelines, observability tooling, and reporting systems for high-volume betting operations.",
  },
  {
    company: "Earlier roles",
    role: "Data / QA / Automation",
    period: "2016 - 2023",
    summary:
      "Spent years building the habits that still shape this work: validate the data, automate the pain, and ship carefully.",
  },
];

type ActivityDay = {
  date: string;
  count: number;
};

type ActivityState = {
  activeDays: number;
  days: ActivityDay[];
  reposAttempted?: number;
  reposTracked: number;
  totalCommits: number;
};

function intensityClass(count: number) {
  if (count >= 5) return "bg-[#111111]";
  if (count >= 3) return "bg-[#5f5a52]";
  if (count >= 1) return "bg-[#b9b2a7]";
  return "bg-[#ebe5db]";
}

export default function About() {
  const [activity, setActivity] = useState<ActivityState | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadActivity = async () => {
      try {
        const res = await fetch("/api/activity");
        if (!res.ok) {
          throw new Error(String(res.status));
        }

        const data = (await res.json()) as ActivityState;
        if (mounted) {
          setActivity(data);
        }
      } catch {
        if (mounted) {
          setActivity({
            activeDays: 0,
            days: [],
            reposAttempted: 0,
            reposTracked: 0,
            totalCommits: 0,
          });
        }
      }
    };

    loadActivity();
    return () => {
      mounted = false;
    };
  }, []);

  const heatmapWeeks = activity?.days.length
    ? Array.from({ length: Math.ceil(activity.days.length / 7) }, (_, weekIndex) =>
        activity.days.slice(weekIndex * 7, weekIndex * 7 + 7)
      )
    : [];

  return (
    <section id="about" className="px-6 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#8b857b]">
            About
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-[#111111]">
            This is a working season, not a finished story.
          </h2>

          <div className="mt-8 space-y-5 text-base leading-8 text-[#5f5a52]">
            <p>
              I built data systems for over a decade, most recently as a senior
              data engineer at TheScore / ESPN Bet. After that chapter, I started
              using 1% Better as a place to keep moving: learn LLMs, ship
              simple apps quickly, and turn ideas into real product reps instead
              of waiting for perfect conditions.
            </p>
            <p>
              `1% Better.dev` is where that current season shows up most clearly:
              learning, funding, and shipping. `1% Better.poker` is the more
              specialized direction I still intend to grow into when time and
              resources allow.
            </p>
            <p>
              The original domain came from a poker product idea. That part of the
              story is still there, but it is not the main thing I want this page
              to communicate right now. The poker apps are early. The more honest
              story is that I am building small, fast, useful things while I create
              runway for the next chapter.
            </p>
            <p>
              That is also why the funding page exists. It is not startup theater.
              It is a practical way to keep learning, keep deploying, and keep the
              momentum alive while I look for a job or a more durable revenue path.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="glass-panel rounded-[1.6rem] p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
              Core value
            </p>
            <p className="mt-4 text-lg font-medium text-[#111111]">
              One percent better.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5f5a52]">
              Small improvements, repeated often enough, become direction.
            </p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
              Right now
            </p>
            <p className="mt-4 text-lg font-medium text-[#111111]">
              Fast shipping.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5f5a52]">
              1% Better Focus and 1% Better Today are lightweight products meant to get out
              fast and teach me something immediately.
            </p>
          </div>
          <div className="glass-panel rounded-[1.6rem] p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
              Later
            </p>
            <p className="mt-4 text-lg font-medium text-[#111111]">
              Deeper bets.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5f5a52]">
              If income or runway improves, I expect to return to the poker-side
              products with more focus and more patience.
            </p>
          </div>
        </div>

        <div className="mt-10 glass-panel rounded-[2rem] p-8 sm:p-10">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#8b857b]">
            Experience
          </p>
          <div className="mt-8 space-y-6">
            {experience.map((item) => (
              <div key={item.company} className="border-t border-[#ebe5db] pt-6 first:border-t-0 first:pt-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-lg font-medium text-[#111111]">{item.company}</p>
                    <p className="text-sm text-[#5f5a52]">{item.role}</p>
                  </div>
                  <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#8b857b]">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5f5a52]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 glass-panel rounded-[2rem] p-8 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#8b857b]">
                Build activity
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111111]">
                Recent GitHub activity across this site and the linked 1% Better repos.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#5f5a52]">
                Not a generic link dump. A visual record of actual reps. This heatmap
                aggregates recent commit activity from the landing page repo plus the linked 1% Better repositories.
              </p>
            </div>

            <a
              href="https://github.com/sukminc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#ddd8cf] px-5 py-3 text-sm text-[#5f5a52] transition-colors hover:border-[#b9b2a7] hover:text-[#111111]"
            >
              Open GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-[#e5dfd5] bg-[#f8f6f2] p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
                  Active days
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#111111]">
                  {activity?.activeDays ?? "--"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
                  Tracked repos
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#111111]">
                  {activity?.reposTracked ?? "--"}
                </p>
                {activity?.reposAttempted !== undefined && activity.reposAttempted !== activity.reposTracked ? (
                  <p className="mt-1 text-[11px] text-[#8b857b]">
                    {activity.reposAttempted} attempted
                  </p>
                ) : null}
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8b857b]">
                  Recent commits
                </p>
                <p className="mt-2 text-2xl font-semibold text-[#111111]">
                  {activity?.totalCommits ?? "--"}
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <div className="flex min-w-max gap-1.5">
                {heatmapWeeks.length > 0 ? (
                  heatmapWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-rows-7 gap-1.5">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          title={`${day.date}: ${day.count} commit${day.count === 1 ? "" : "s"}`}
                          className={`h-3.5 w-3.5 rounded-[4px] ${intensityClass(day.count)}`}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-[#8b857b]">
                    Loading recent activity...
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs text-[#8b857b]">
              <span className="font-mono uppercase tracking-[0.16em]">Less</span>
              <div className="flex gap-1.5">
                {[0, 1, 3, 5].map((count) => (
                  <span key={count} className={`h-3.5 w-3.5 rounded-[4px] ${intensityClass(count)}`} />
                ))}
              </div>
              <span className="font-mono uppercase tracking-[0.16em]">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
