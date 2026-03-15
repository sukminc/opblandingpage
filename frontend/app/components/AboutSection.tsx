import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell py-24 px-6">
      <div className="relative max-w-6xl mx-auto">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel rounded-[1.8rem] p-6 sm:p-8">
            <p className="mb-3 text-xs text-[#8a6f50]">About</p>
            <Link href="/about" className="group inline-block mb-4">
              <h2 className="text-2xl font-bold text-[#111111] tracking-tight transition-colors group-hover:text-[#6f5336]">
                Chris S. Yoon
              </h2>
            </Link>
            <p className="text-sm text-[#5f5a52] leading-7">
              10+ years in data engineering, validation, and automation. Most recent
              role: Senior Data Engineer at theScore / ESPN Bet. Current proof layer:
              small products, public repos, visible execution.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d9c9b3] bg-[linear-gradient(180deg,#fcf6ed_0%,#f3e7d7_100%)] px-3 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8a6f50] animate-pulse" />
              <span className="text-xs text-[#111111]">Open to Senior Data / Platform / AI Product roles</span>
            </div>
          </div>

          <div className="glass-panel rounded-[1.8rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8a6f50]">
              Recruiter path
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#111111]">
              Career context, then current work.
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#5f5a52]">
              Background first, then current work, then LinkedIn or GitHub if you want more.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-between rounded-[1.2rem] border border-[#d7c2a3] bg-[linear-gradient(180deg,#fcf7ee_0%,#f4e8d8_100%)] px-5 py-4 text-sm text-[#6f5336] transition-colors hover:border-[#b9976c] hover:bg-[linear-gradient(180deg,#f9f0e3_0%,#eedbc2_100%)]"
              >
                <span>
                  Read background
                </span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://linkedin.com/in/sukminyoon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between rounded-[1.2rem] border border-[#ddd8cf] px-5 py-4 text-sm text-[#5f5a52] transition-colors hover:border-[#c6a880] hover:text-[#6f5336]"
              >
                <span>Open LinkedIn</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
