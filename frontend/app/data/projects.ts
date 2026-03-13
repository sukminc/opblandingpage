export type ProjectStatus = "live" | "building" | "idea";
export type ProjectRepoType = "mobile-app" | "web-app" | "automation" | "platform" | "data-pipeline" | "validation";
export type ProjectCategory = "featured" | "poker" | "ops" | "archive";
export type ProjectStage = "prototype" | "mvp-loop" | "workflow-build" | "concept" | "ops-layer" | "archive";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  repoType: ProjectRepoType;
  category: ProjectCategory;
  stage: ProjectStage;
  tags: string[];
  url?: string;
  featured?: boolean;
  seed: number;
  mvpEta?: string;
  repoName?: string;   // GitHub repo name under sukminc/ (omit if no repo)
}

export const projects: Project[] = [
  {
    slug: "opb-today",
    repoName: "one-percent-better-today",
    title: "1% Better Today",
    tagline: "The core daily product in the 1% Better brand.",
    description:
      "The clearest expression of the 1% Better thesis so far: one small action, one clean loop, and almost no setup friction. Early stage, but strategically the core product because it is the most likely to launch first and validate the brand.",
    status: "building",
    repoType: "mobile-app",
    category: "featured",
    stage: "prototype",
    tags: ["FastAPI", "Supabase", "Stripe", "iOS", "Android"],
    url: "https://github.com/sukminc/one-percent-better-today",
    featured: true,
    seed: 74,
    mvpEta: "Target MVP: April 2026",
  },
  {
    slug: "this-website",
    repoName: "one-percent-better-landing",
    title: "1% Better - This Website",
    tagline: "The public front door for funding, hiring, and the whole shipping story.",
    description:
      "The live portfolio surface itself. Part frontend product, part operating layer, part proof that the build loop is real and active in public.",
    status: "live",
    repoType: "web-app",
    category: "ops",
    stage: "ops-layer",
    tags: ["Next.js", "TypeScript", "Vercel"],
    url: "https://github.com/sukminc/one-percent-better-landing",
    seed: 69,
  },
  {
    slug: "onepercentbetter",
    repoName: "one-percent-better-poker",
    title: "1% Better - Exploit Better",
    tagline: "Poker decision support and exploit intelligence.",
    description:
      "The main poker product line: decision support, exploit analysis, and a deeper product thesis for players looking to improve edge. Important to the poker brand, but still earlier than the simple consumer products.",
    status: "idea",
    repoType: "platform",
    category: "poker",
    stage: "concept",
    tags: ["Next.js", "FastAPI", "SQLAlchemy", "Pandas", "NumPy", "Vercel"],
    url: "https://github.com/sukminc/one-percent-better-poker",
    seed: 47,
    mvpEta: "Target MVP: June 2026",
  },
  {
    slug: "opb-os",
    repoName: "one-percent-better-os",
    title: "1% Better - OS",
    tagline: "Workflow automation for repeatable project shipping.",
    description:
      "An internal operating system for the 1% Better build loop. It already scaffolds new projects, audits sprint windows, syncs landing-page entries, checks README quality, and generates weekly operating reviews so the portfolio stays current without manual drift.",
    status: "building",
    repoType: "automation",
    category: "ops",
    stage: "ops-layer",
    tags: ["Python", "GitHub Actions", "JSON", "CLI"],
    url: "https://github.com/sukminc/one-percent-better-os",
    seed: 56,
    mvpEta: "Target MVP: March 2026",
  },
  {
    slug: "bluejays-moneyball",
    repoName: "bluejays-financial-mlops",
    title: "Blue Jays Moneyball ETL",
    tagline: "Archive of data engineering work and pipeline thinking.",
    description:
      "An archive project that captures data engineering work: Airflow orchestration, PostgreSQL modeling, and testable pipeline quality gates. It stays on the site as proof of craft, not as an active product line.",
    status: "live",
    repoType: "data-pipeline",
    category: "archive",
    stage: "archive",
    tags: ["Python", "Apache Airflow", "PostgreSQL", "Docker", "GitHub Actions"],
    url: "https://github.com/sukminc/bluejays-financial-mlops",
    seed: 18,
  },
  {
    slug: "actionkeeper",
    repoName: "one-percent-better-poker-staking",
    title: "1% Better - Action Keeper",
    tagline: "Poker staking and action workflows with cleaner agreements.",
    description:
      "A poker-adjacent workflow product for staking deals, offers, counters, and agreement tracking. It belongs clearly in the poker product family, not as a generic standalone brand.",
    status: "idea",
    repoType: "platform",
    category: "poker",
    stage: "workflow-build",
    tags: ["Python (FastAPI)", "TypeScript (Next.js)", "PostgreSQL", "Docker", "Stripe"],
    url: "https://github.com/sukminc/one-percent-better-poker-staking",
    seed: 31,
    mvpEta: "Target MVP: July 2026",
  },
  {
    slug: "onepercent-focus",
    repoName: "one-percent-better-focus",
    title: "1% Better - Focus",
    tagline: "A simple focus tool built to ship fast inside the brand.",
    description:
      "A lightweight focus timer that supports the same simple-shipping thesis as Today. Smaller than the core product, but still part of the public 1% Better product family.",
    status: "building",
    repoType: "mobile-app",
    category: "featured",
    stage: "mvp-loop",
    tags: ["Flutter", "Dart", "Supabase", "iOS", "Android"],
    url: "https://github.com/sukminc/one-percent-better-focus",
    seed: 63,
    mvpEta: "Target MVP: March 2026",
  },
  {
    slug: "twelvelabs-validator",
    repoName: "TwelveLabs",
    title: "TwelveLabs API Validator",
    tagline: "Interview challenge archive for multimodal API validation.",
    description:
      "A technical interview challenge delivered as a serious validation suite. Useful as proof of engineering quality, but it is an archive item rather than a live brand product.",
    status: "live",
    repoType: "validation",
    category: "archive",
    stage: "archive",
    tags: ["Python", "TwelveLabs", "Pytest"],
    url: "https://github.com/sukminc/TwelveLabs",
    seed: 12,
  },
];
