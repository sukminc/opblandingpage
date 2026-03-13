"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
          ? "bg-[#08110d]/72 backdrop-blur-xl border-b border-[#21312b]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.svg"
            alt="onepercentbetter"
            className="h-8 w-8 transition-opacity group-hover:opacity-80"
            width={32}
            height={32}
          />
          <div className="hidden sm:block">
            <span className="block text-sm font-semibold text-[#eff6ef] tracking-[0.14em] uppercase leading-none">
              onepercentbetter
            </span>
            <span className="block text-[10px] text-[#7d9086] font-mono mt-1">
              systems for compound growth
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[#2b3f37] bg-[#0f1915]/80 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-[#b8ff72] shadow-[0_0_14px_rgba(184,255,114,0.75)]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#a6b8ae]">
              +1% in progress
            </span>
          </div>
          <a href="#projects" className="text-sm text-[#a6b8ae] hover:text-[#eff6ef] transition-colors">
            Projects
          </a>
          <Link href="/about" className="text-sm text-[#a6b8ae] hover:text-[#eff6ef] transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
