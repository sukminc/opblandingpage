const milestones = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "completed",
    items: [
      "GGPoker hand history parser",
      "SQLite session storage",
      "FastAPI backend scaffolding",
      "Next.js App Router frontend",
    ],
  },
  {
    phase: "Phase 2",
    title: "Exploit Engine",
    status: "active",
    items: [
      "Node-lock deviation calculator",
      "Positional stats aggregation",
      "Real-time bb/100 delta tracking",
      "Session analytics dashboard",
    ],
  },
  {
    phase: "Phase 3",
    title: "Platform",
    status: "upcoming",
    items: [
      "User accounts & bankroll history",
      "Opponent profiling (leak tagging)",
      "Export to solver formats",
      "Mobile dashboard",
    ],
  },
];

const statusConfig = {
  completed: { label: "Done", color: "text-emerald-400", dot: "bg-emerald-400" },
  active: { label: "In Progress", color: "text-[#007AFF]", dot: "bg-[#007AFF] animate-pulse" },
  upcoming: { label: "Upcoming", color: "text-[#555]", dot: "bg-[#333]" },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-32 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-mono text-[#007AFF] tracking-widest uppercase">
            Roadmap
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">
            Where we&apos;re going.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m) => {
            const cfg = statusConfig[m.status as keyof typeof statusConfig];
            return (
              <div
                key={m.phase}
                className={`border rounded-lg p-6 ${
                  m.status === "active"
                    ? "border-[#007AFF]/40 bg-[#007AFF]/5"
                    : "border-[#2a2a2a] bg-black"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#555] uppercase tracking-widest">
                    {m.phase}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    <span className={`text-xs font-mono ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-4">
                  {m.title}
                </h3>

                <ul className="space-y-2">
                  {m.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[#666]"
                    >
                      <span
                        className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${
                          m.status === "completed"
                            ? "bg-emerald-400"
                            : m.status === "active"
                            ? "bg-[#007AFF]"
                            : "bg-[#333]"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
