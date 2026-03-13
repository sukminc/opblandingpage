import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell py-24 px-6">
      <div className="relative max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <p className="text-xs text-[#a6b8ae] mb-3">About</p>
            <Link href="/about" className="group inline-block mb-4">
              <h2 className="text-2xl font-bold text-[#eff6ef] tracking-tight group-hover:text-[#b8ff72] transition-colors">
                Chris S. Yoon
              </h2>
            </Link>
            <p className="text-sm text-[#a6b8ae] leading-relaxed">
              10 years building production data systems — ETL pipelines, observability frameworks, and DQ-gated
              architectures across fintech, media, and enterprise. Most recently at TheScore / ESPN Bet, processing
              millions of daily betting transactions across BigQuery and Redshift. Now building{" "}
              <span className="text-[#eff6ef]">onepercentbetter</span> and{" "}
              <span className="text-[#eff6ef]">ActionKeeper</span> with Python · Airflow · BigQuery · Claude API.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:pt-8">
            <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400">Open to Work</span>
            </div>
            <a
              href="https://linkedin.com/in/sukminyoon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#b8ff72] text-[#08110d] text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#d3ff9a] transition-colors"
            >
              Connect on LinkedIn <ArrowUpRight size={14} />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[#24372f] text-[#a6b8ae] text-sm px-5 py-2.5 rounded-xl hover:border-[#4d7263] hover:text-[#eff6ef] transition-all"
            >
              Full resume →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
