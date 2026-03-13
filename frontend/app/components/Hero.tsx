"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

const notes = [
  "Shipping simple ideas fast is the current point.",
  "The funding page exists to buy time to keep learning and building.",
  "The poker products are still early and not the headline right now.",
];

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0, r: 0 });

  return (
    <section
      className="relative overflow-hidden px-6 pt-28 pb-16 sm:pb-24"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
        setOffset({ x, y, r: x * 0.08 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0, r: 0 })}
    >
      <div className="absolute inset-0 paper-grid opacity-50 pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0"
        style={
          {
            "--hero-x": `${offset.x}px`,
            "--hero-y": `${offset.y}px`,
            "--hero-r": `${offset.r}deg`,
          } as CSSProperties
        }
      >
        <div className="hero-orbit absolute right-[-2%] top-8 h-[32rem] w-[32rem] rounded-full border border-[#d7d0c5] opacity-70" />
        <div className="hero-orbit absolute right-[6%] top-20 h-[24rem] w-[24rem] rounded-full border border-[#e5dfd5]" style={{ animationDelay: "0.8s" }} />
        <div className="hero-symbol absolute right-[4%] top-12 opacity-[0.12]">
          <Image
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            width={420}
            height={420}
            priority
            className="h-[18rem] w-[18rem] sm:h-[22rem] sm:w-[22rem] lg:h-[28rem] lg:w-[28rem]"
          />
        </div>
        <div className="absolute right-[9%] top-[24rem] text-[11px] font-mono uppercase tracking-[0.22em] text-[#8b857b]">
          1.01 ^ 365 = 37.8x
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ddd8cf] bg-[#fbfaf7] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#111111]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#5f5a52]">
              one core value
            </span>
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-7xl lg:text-[6.1rem] lg:leading-[0.95]">
            Ship small.
            <br />
            Learn fast.
            <br />
            Keep going.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#5f5a52] sm:text-xl">
            1% Better started from a poker idea, but right now it is also a
            product studio for fast learning loops: simple apps, LLM experiments,
            and public reps that make the next build better than the last one.
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#5f5a52]">
            The logo is the thesis. One percent looks small in isolation. Repeated
            daily, it becomes compounding. That idea sits underneath the apps, the
            pacing, and the way this whole brand is built.
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#8b857b]">
            `1% Better.dev` is the public build, funding, and career-facing track.
            `1% Better.poker` is the specialist track I plan to grow into more deeply.
            For now, both live as landing pages with the same philosophy underneath.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#8b857b]">
            Built by{" "}
            <a
              href="https://linkedin.com/in/sukminyoon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] underline decoration-[#b9b2a7] underline-offset-4 transition-colors hover:text-[#5f5a52]"
            >
              Chris S. Yoon
            </a>
            . Senior data engineer, currently in a learn-fast season, using this
            page to ship ideas quickly while buying runway for what comes next.
          </p>

        </div>

          <div className="mt-16 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8b857b]">
              Current thesis
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  1%
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f5a52]">
                  Better every cycle is a strategy, not a slogan.
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  37.8x
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f5a52]">
                  What tiny gains look like when they compound long enough.
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                  Now
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5f5a52]">
                  Focus and today are both expressions of daily measurable progress.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8b857b]">
              What changes next
            </p>
            <div className="mt-5 flex flex-col gap-4">
              {notes.map((note, index) => (
                <div key={note} className="flex gap-4 border-t border-[#ebe5db] pt-4 first:border-t-0 first:pt-0">
                  <span className="text-xs font-mono text-[#8b857b]">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#5f5a52]">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
