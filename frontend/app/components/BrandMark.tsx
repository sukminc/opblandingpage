type BrandMarkSize = "sm" | "md" | "hero";

interface BrandMarkProps {
  size?: BrandMarkSize;
  showWordmark?: boolean;
  subtitle?: string;
  className?: string;
}

const SIZE_MAP: Record<BrandMarkSize, { shell: string; text: string; wordmark: string; subline: string }> = {
  sm: {
    shell: "h-10 w-10 rounded-[1.15rem] border-[1.7px]",
    text: "text-[1.08rem]",
    wordmark: "text-sm tracking-[0.16em]",
    subline: "text-[10px]",
  },
  md: {
    shell: "h-14 w-14 rounded-[1.45rem] border-[1.9px]",
    text: "text-[1.4rem]",
    wordmark: "text-base tracking-[0.18em]",
    subline: "text-[10px]",
  },
  hero: {
    shell: "h-36 w-36 rounded-[2.25rem] border-[2.6px] sm:h-44 sm:w-44 lg:h-56 lg:w-56 lg:rounded-[2.8rem]",
    text: "text-[3.2rem] sm:text-[4rem] lg:text-[5.15rem]",
    wordmark: "text-xl tracking-[0.2em] sm:text-2xl",
    subline: "text-[11px] sm:text-xs lg:text-[13px]",
  },
};

export default function BrandMark({
  size = "md",
  showWordmark = false,
  subtitle = "ship small. learn fast.",
  className = "",
}: BrandMarkProps) {
  const scale = SIZE_MAP[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <div className="relative">
        <div
          className={`relative inline-flex items-center justify-center border border-[#6f5336] bg-[linear-gradient(180deg,#fcf7ef_0%,#f0e0cb_58%,#ead7be_100%)] shadow-[0_18px_48px_rgba(17,17,17,0.08)] ${scale.shell}`}
        >
          <span className={`font-semibold tracking-[-0.11em] text-[#2d2419] ${scale.text}`}>1%</span>
        </div>
      </div>

      {showWordmark && (
        <div className="min-w-0">
          <span className={`block font-semibold uppercase leading-none text-[#2d2419] ${scale.wordmark}`}>
            1% Better
          </span>
          <span className={`mt-1 block font-mono uppercase tracking-[0.18em] text-[#8a6f50] ${scale.subline}`}>
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
