"use client";

import { motion } from "framer-motion";
import { Layers, Paintbrush, ArrowUpRight } from "lucide-react";

const frontend = [
  { name: "React / Next.js",  proof: "App Router, SSR/SSG, dynamic routing" },
  { name: "TypeScript",       proof: "Strict mode, generics, discriminated unions" },
  { name: "Tailwind CSS",     proof: "v4, custom design tokens, dark themes" },
  { name: "Framer Motion",    proof: "3D flips, layout animations, gestures" },
  { name: "REST APIs",        proof: "FastAPI integration, SWR, fetch patterns" },
  { name: "Responsive Layout",proof: "Mobile-first, bento grids, fluid type" },
];

const uiux = [
  { name: "Design Systems",         proof: "Consistent tokens: color, spacing, type" },
  { name: "Component Architecture", proof: "Composable, headless-ready components" },
  { name: "Micro-interactions",     proof: "Hover states, flip cards, animated counters" },
  { name: "Dark UI",                proof: "High-contrast, low-distraction interfaces" },
  { name: "Information Hierarchy",  proof: "Bento grid, visual weight, scannable layouts" },
  { name: "Figma",                  proof: "Wireframing, component libraries, auto-layout" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.07 } },
};

function SkillRow({ name, proof }: { name: string; proof: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-start justify-between gap-4 py-3 border-b border-[#111] last:border-0 group"
    >
      <span className="text-sm font-mono text-white group-hover:text-[#007AFF] transition-colors">
        {name}
      </span>
      <span className="text-[11px] text-[#444] text-right leading-relaxed max-w-[180px]">
        {proof}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#111]">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight text-white">
            Full-stack by default.{" "}
            <span className="text-[#333]">Design-aware by choice.</span>
          </h2>
          <p className="text-[#444] mt-3 text-sm max-w-xl">
            The data pipeline is only half the product. I build the UI too —
            fast, accessible, and worth looking at.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Frontend card */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="border border-[#1a1a1a] rounded-xl p-6 bg-black hover:border-[#2a2a2a] transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-md bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center">
                <Layers size={16} className="text-[#007AFF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-mono">Frontend</p>
                <p className="text-[10px] text-[#444]">React · Next.js · TypeScript</p>
              </div>
            </div>
            {frontend.map((s) => (
              <SkillRow key={s.name} name={s.name} proof={s.proof} />
            ))}
          </motion.div>

          {/* UI/UX card */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="border border-[#1a1a1a] rounded-xl p-6 bg-black hover:border-[#2a2a2a] transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-md bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center">
                <Paintbrush size={16} className="text-[#007AFF]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-mono">UI / UX</p>
                <p className="text-[10px] text-[#444]">Design Systems · Figma · Interaction</p>
              </div>
            </div>
            {uiux.map((s) => (
              <SkillRow key={s.name} name={s.name} proof={s.proof} />
            ))}
          </motion.div>
        </div>

        {/* "This site is the demo" callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between border border-[#007AFF]/20 bg-[#007AFF]/5 rounded-xl px-6 py-4"
        >
          <div>
            <p className="text-sm font-semibold text-white font-mono mb-0.5">
              This site is the demo.
            </p>
            <p className="text-xs text-[#555]">
              Dark design system · bento grid · 3D flip cards · Framer Motion animations — all hand-coded, zero templates.
            </p>
          </div>
          <a
            href="https://github.com/sukminc/one-percent-better"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-6 shrink-0 flex items-center gap-1.5 text-xs font-mono text-[#007AFF] hover:text-white transition-colors"
          >
            View source <ArrowUpRight size={12} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
