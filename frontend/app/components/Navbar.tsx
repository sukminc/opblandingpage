"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#dbcdb8] bg-[linear-gradient(180deg,rgba(251,247,240,0.96),rgba(245,238,228,0.92))] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-4">
          <BrandMark size="sm" />
          <div className="min-w-0 transition-opacity group-hover:opacity-82">
            <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#2d2419]">
              1% Better.dev
            </span>
            <span className="mt-1 block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8a6f50]">
              public build surface
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[#d9c9b3] bg-[linear-gradient(180deg,#fbf5eb_0%,#f3e7d7_100%)] px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
            <span className="h-2 w-2 rounded-full bg-[#8a6f50]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#6f5336]">
              small products. real signal.
            </span>
          </div>
          <a href="#projects" className="text-sm text-[#5f5a52] transition-colors hover:text-[#6f5336]">
            Projects
          </a>
          <Link href="/about" className="text-sm text-[#5f5a52] transition-colors hover:text-[#6f5336]">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
