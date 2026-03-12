import { ArrowLeft, ArrowUpRight, MapPin, Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

const experience = [
  {
    company: "onepercentbetter",
    role: "Founder & CEO",
    period: "Jul 2025 – Present",
    location: "Toronto, ON",
    bullets: [
      "Building AI-augmented data platforms with integrated LLM agent layers — implementing agentic orchestration using Claude API (Anthropic) and OpenAI API to automate data-driven decision loops.",
      "Hands-on application of dbt (data transformation), Kafka (streaming pipelines), and LLM integration patterns across active project architectures.",
      "Currently studying for Google Cloud Professional Data Engineer (GCP PDE).",
    ],
  },
  {
    company: "TheScore (Partnered with ESPN Bet)",
    role: "Senior Data Engineer",
    period: "Jul 2023 – Jul 2025",
    location: "Toronto, ON",
    bullets: [
      "Built and maintained Apache Airflow DAGs orchestrating nightly ingestion and transformation across BigQuery and AWS Redshift, processing millions of high-velocity betting transactions per day.",
      "Designed a Python-based observability framework monitoring 15+ ETL pipelines for volume anomalies and schema drift — automated alerting cut manual debugging effort by 60%.",
      "Developed SQL/Python transformation scripts for SOX-compliant financial and regulatory reporting, maintaining 100% audit trail coverage.",
      "Validated and optimized data workflows during large-scale legacy-to-cloud migration (GCP/AWS), ensuring zero data loss.",
    ],
  },
  {
    company: "Avesis",
    role: "Tech Lead (Contract via QA Consultants)",
    period: "Mar 2021 – Mar 2023",
    location: "Phoenix, AZ (Remote)",
    bullets: [
      "Led technical design of insurance ETL pipelines, defining data mapping specs and transformation rules for large-scale claims processing across enterprise Data Warehouses.",
      "Engineered automated Python data profiling routines that identified data corruption 40% earlier in the development lifecycle, preventing production incidents in underwriting workflows.",
    ],
  },
  {
    company: "Jewelers Mutual",
    role: "Data Engineer (Contract via QA Consultants)",
    period: "Feb 2020 – Mar 2021",
    location: "Neenah, WI (Remote)",
    bullets: [
      "Authored and optimized SQL and Python ETL scripts for Data Warehouse loading; implemented automated data profiling to surface quality issues at ingestion, before downstream impact.",
    ],
  },
  {
    company: "Wisetail (an Intertek Company)",
    role: "Data / QA Automation Engineer",
    period: "Aug 2019 – Feb 2020",
    location: "Toronto, ON",
    bullets: [
      "Integrated automated backend data validation workflows into Jenkins/GitHub Actions pipelines, providing real-time data quality visibility across policy management systems.",
    ],
  },
  {
    company: "Secret Location (eOne)",
    role: "SDET / QA Engineer",
    period: "Jul 2018 – Jul 2019",
    location: "Toronto, ON",
    bullets: [
      "Designed and executed automated data integrity test suites across distributed VR and mobile platforms, validating backend API consistency and catching critical regressions before production.",
      "Built SQL-based data consistency validation scripts and end-to-end integration tests for API-to-database layers across eOne content delivery pipelines.",
    ],
  },
  {
    company: "VRBO (Expedia Group)",
    role: "QA Engineer / Data Migration Analyst",
    period: "Jul 2016 – Mar 2018",
    location: "Toronto, ON",
    bullets: [
      "Led data integrity validation for a large-scale platform migration; built SQL reconciliation queries verifying source-to-target row counts and financial totals — zero data loss across millions of user records.",
      "Developed automated regression and smoke test suites validating booking and payment workflows across migration phases.",
    ],
  },
];

const skills = [
  {
    label: "Data Engineering",
    items: ["Apache Airflow", "ETL/ELT Pipeline Design", "Data Lakehouse", "Star Schema", "Data Observability", "Fail-Fast DQ Gates", "Schema Drift Handling"],
  },
  {
    label: "Languages & Libraries",
    items: ["Python", "SQL", "TypeScript", "Pandas", "NumPy", "SQLAlchemy", "FastAPI", "Pydantic", "Pytest"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["GCP (BigQuery, GCS)", "AWS (S3, Redshift, Glue)", "PostgreSQL", "SQLite", "Docker", "GitHub Actions", "Jenkins"],
  },
  {
    label: "AI / Agentic Systems",
    items: ["Claude API (Anthropic)", "OpenAI Agent SDK", "LangChain", "Agentic Orchestration", "LLM Pipeline Integration"],
  },
  {
    label: "Observability & Tools",
    items: ["DataDog", "Schema Drift Detection", "Alembic", "Pydantic Contracts", "Git", "Stripe API"],
  },
  {
    label: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive Design"],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F0F11] text-[#F7F8F8]">
      <div className="max-w-3xl mx-auto px-6 py-16">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#4B4C58] hover:text-[#8A8B97] transition-colors mb-12"
        >
          <ArrowLeft size={13} /> Back
        </Link>

        {/* Profile header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">
              Open to Work — Data Engineering / AI Engineering
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#F7F8F8] mb-2">
            Chris S. Yoon
          </h1>
          <p className="text-[#5E5CE6] text-sm mb-5">
            Senior Data Engineer · AI Builder · Founder
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            <span className="flex items-center gap-1.5 text-xs text-[#4B4C58]">
              <MapPin size={11} /> North York, ON
            </span>
            <a href="mailto:chris.yoon@outlook.com" className="flex items-center gap-1.5 text-xs text-[#4B4C58] hover:text-[#8A8B97] transition-colors">
              <Mail size={11} /> chris.yoon@outlook.com
            </a>
            <a href="https://linkedin.com/in/sukminyoon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#4B4C58] hover:text-[#8A8B97] transition-colors">
              <Linkedin size={11} /> sukminyoon
            </a>
            <a href="https://github.com/sukminc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[#4B4C58] hover:text-[#8A8B97] transition-colors">
              <Github size={11} /> sukminc
            </a>
          </div>

          <div className="border-l-2 border-[#5E5CE6]/30 pl-5">
            <p className="text-sm text-[#8A8B97] leading-relaxed">
              Senior Data Engineer with 10+ years architecting production-grade data systems across fintech, media, and enterprise domains. At TheScore / ESPN Bet, designed Airflow-orchestrated ETL pipelines processing millions of daily transactions across BigQuery and Redshift; built a Python observability framework that reduced debugging overhead by 60% and delivered SOX-compliant reconciliation systems under regulatory scrutiny.
            </p>
            <p className="text-sm text-[#8A8B97] leading-relaxed mt-3">
              Specializes in data quality engineering — fail-fast DQ gates, schema drift detection, and self-validating pipeline architectures as foundational design principles. Currently building onepercentbetter: an AI-augmented analytics platform integrating LLM agent layers for automated decision intelligence.
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-14">
          <p className="text-xs text-[#8A8B97] mb-6">Experience</p>

          <div className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[#232329]" />

            <div className="flex flex-col gap-9 pl-6">
              {experience.map((e) => (
                <div key={e.company} className="relative">
                  <div className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full border border-[#5E5CE6]/40 bg-[#0F0F11]" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <div>
                      <span className="text-sm font-semibold text-[#F7F8F8]">{e.company}</span>
                      <span className="text-xs text-[#5E5CE6] ml-2">{e.role}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-[#4B4C58] block">{e.period}</span>
                      <span className="text-[10px] text-[#36363F]">{e.location}</span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-xs text-[#8A8B97] leading-relaxed">
                        <span className="text-[#36363F] shrink-0 mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-14">
          <p className="text-xs text-[#8A8B97] mb-6">Technical Skills</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((group) => (
              <div key={group.label} className="border border-[#232329] rounded-xl p-4 bg-[#161618]">
                <p className="text-xs text-[#4B4C58] mb-3">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] text-[#8A8B97] bg-[#1C1C1F] border border-[#232329] rounded-md px-2 py-0.5 hover:border-[#5E5CE6]/30 hover:text-[#F7F8F8] transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-14">
          <p className="text-xs text-[#8A8B97] mb-6">Education & Certifications</p>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between border border-[#232329] rounded-xl px-4 py-3 bg-[#161618]">
              <div>
                <p className="text-xs font-semibold text-[#F7F8F8]">University of Waterloo</p>
                <p className="text-[10px] text-[#4B4C58] mt-0.5">Studies in Chemical Engineering</p>
              </div>
              <span className="text-[10px] text-[#4B4C58]">2001 – 2005</span>
            </div>
            <div className="flex items-start justify-between border border-[#232329] rounded-xl px-4 py-3 bg-[#161618]">
              <div>
                <p className="text-xs font-semibold text-[#F7F8F8]">ISTQB Certified Tester</p>
                <p className="text-[10px] text-[#4B4C58] mt-0.5">Foundation Level (CTFL)</p>
              </div>
              <span className="text-[10px] text-emerald-500">Certified</span>
            </div>
            <div className="flex items-start justify-between border border-[#5E5CE6]/20 bg-[#5E5CE6]/5 rounded-xl px-4 py-3">
              <div>
                <p className="text-xs font-semibold text-[#F7F8F8]">Google Cloud Professional Data Engineer</p>
                <p className="text-[10px] text-[#4B4C58] mt-0.5">GCP PDE — Actively studying</p>
              </div>
              <span className="text-[10px] text-[#5E5CE6]">In Progress</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#232329]">
          <a
            href="https://linkedin.com/in/sukminyoon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#5E5CE6] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#7B79F7] transition-colors"
          >
            Connect on LinkedIn <ArrowUpRight size={14} />
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-[#232329] text-[#8A8B97] text-sm px-5 py-2.5 rounded-xl hover:border-[#36363F] hover:text-[#F7F8F8] transition-all"
          >
            View Projects
          </Link>
        </div>

      </div>
    </main>
  );
}
