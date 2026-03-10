"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";

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
          ? "bg-black/90 backdrop-blur-sm border-b border-[#2a2a2a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border-2 border-[#007AFF] flex items-center justify-center">
            <span className="text-[#007AFF] font-bold text-xs font-mono">1%</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">
            onepercentbetter<span className="text-[#007AFF]">.poker</span>
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-[#999] hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#roadmap"
            className="text-sm text-[#999] hover:text-white transition-colors"
          >
            Roadmap
          </a>
          <a
            href="#invest"
            className="flex items-center gap-1.5 text-sm bg-[#007AFF] text-white px-4 py-2 rounded-md hover:bg-[#0066DD] transition-colors font-medium"
          >
            <TrendingUp size={14} />
            Back the Project
          </a>
        </div>
      </div>
    </nav>
  );
}
