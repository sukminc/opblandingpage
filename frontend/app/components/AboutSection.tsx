import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#232329]">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <p className="text-xs text-[#8A8B97] mb-3">Builder</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#F7F8F8] tracking-tight">
            Chris S. Yoon.{" "}
            <span className="text-[#4B4C58]">Who&apos;s building this.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 border-l-2 border-[#5E5CE6]/30 pl-6">
            <p className="text-base text-[#8A8B97] leading-relaxed">
              10 years building production data systems — ETL pipelines, observability frameworks, and DQ-gated
              architectures across fintech, media, and enterprise. Most recently at TheScore / ESPN Bet, where I
              processed millions of daily betting transactions across BigQuery and Redshift and cut pipeline
              debugging overhead 60% with a Python observability layer. Now building{" "}
              <span className="text-[#F7F8F8] font-medium">onepercentbetter</span>
              {" "}— a GTO exploit engine for poker players — and{" "}
              <span className="text-[#F7F8F8] font-medium">ActionKeeper</span>
              {" "}— a tamper-evident staking agreement platform. Stack: Python · FastAPI · Airflow · BigQuery · dbt · Claude API.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://linkedin.com/in/sukminyoon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#5E5CE6] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-[#7B79F7] transition-colors"
              >
                LinkedIn <ArrowUpRight size={13} />
              </a>
              <a
                href="mailto:chris.yoon@outlook.com"
                className="inline-flex items-center gap-1.5 border border-[#232329] text-[#8A8B97] text-sm px-4 py-2 rounded-xl hover:border-[#36363F] hover:text-[#F7F8F8] transition-all"
              >
                chris.yoon@outlook.com
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 rounded-xl px-4 py-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Open to Work</span>
            </div>
            <div className="border border-[#232329] rounded-xl px-4 py-3 bg-[#161618]">
              <p className="text-[10px] text-[#4B4C58] mb-1">Location</p>
              <p className="text-sm text-[#F7F8F8]">Toronto, ON</p>
            </div>
            <Link
              href="/about"
              className="border border-[#232329] rounded-xl px-4 py-3 bg-[#161618] hover:border-[#5E5CE6]/40 transition-colors group"
            >
              <p className="text-[10px] text-[#4B4C58] mb-1">Full resume</p>
              <p className="text-sm text-[#8A8B97] group-hover:text-[#F7F8F8] transition-colors flex items-center gap-1">
                Experience · Skills · Education <ArrowUpRight size={11} className="inline" />
              </p>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
