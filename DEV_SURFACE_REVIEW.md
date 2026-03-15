# DEV Surface Review

Date: 2026-03-15

Scope reviewed:

- `one-percent-better-landing`
- `one-percent-better-today`
- `one-percent-better-focus`
- `sukminc`

## What The Dev Surface Is Currently Saying

Right now the dev lane mostly says:

- Chris Yoon is a senior data engineer using a public build surface to show recent execution.
- `1% Better.dev` is a hiring and trust layer, not just a product site.
- `1% Better Today` is the core product thesis.
- `1% Better Focus` is supporting proof that small, useful products get shipped.
- GitHub activity and linked repos are meant to function as evidence, not hype.

That core story is visible and fairly consistent across:

- `sukminc/README.md`
- `one-percent-better-landing/README.md`
- `one-percent-better-landing/CLAUDE.md`
- `one-percent-better-today/README.md`
- `one-percent-better-focus/README.md`

## What Is Clear

These parts are working well:

- The GitHub profile is recruiter-fast. `sukminc/README.md` leads with senior data engineering credibility, recent public work, and a clean explanation that poker is separate.
- `1% Better Today` is positioned truthfully. The README is honest that the repo is backend-first and that the strongest proof today is API shape and domain modeling, not a fully shipped consumer app.
- `1% Better Focus` is positioned truthfully. It reads like a small, shippable product and not a fake startup-sized system.
- The landing repo docs are directionally correct. Both `README.md` and `CLAUDE.md` say the site is a hiring/trust surface first.
- The brand thesis is understandable: small products, visible execution, simple loops, proof over claims.

## What Is Drifting

The current public surface still has some drift away from a clean dev/hiring lane.

### 1. The landing page still talks too much about funding

Evidence:

- `frontend/app/page.tsx` includes `FundingCTA` directly on the homepage.
- `frontend/app/layout.tsx` metadata still describes the site as a public system for "funding, hiring, and compounding better work."
- `frontend/app/opengraph-image.tsx` includes "Product studio · funding page".
- `frontend/app/components/FundingCTA.tsx` uses multiple contribution tiers plus a `$3,000` "Anchor Backer" offer.

Why this drifts:

- For recruiters, hiring managers, and technical peers, funding language competes with trust language.
- It makes the homepage feel more mixed than it needs to be.
- The strongest proof on this surface is recent work, not support tiers.

### 2. The About story still spends too much time explaining poker history

Evidence:

- `frontend/app/components/About.tsx` explicitly explains that `1% Better.poker` is a future specialized direction.
- The same file explains that the original domain came from a poker product idea.
- The "Later" card in the same section points back toward poker-side products.

Why this drifts:

- It slows down the recruiter-fast story.
- It asks the reader to carry two narratives at once: current hiring surface and future poker ambition.
- The dev surface does not need to narrate poker history to stay truthful.

### 3. Metadata still leans broader than the actual dev story

Evidence:

- `frontend/app/layout.tsx` still frames the brand with funding language.
- The OG image copy in `frontend/app/opengraph-image.tsx` still presents the surface partly as a funding page.

Why this drifts:

- Metadata is part of the public surface too.
- When shared in Slack, LinkedIn, or recruiter tools, this is often the first copy people see.

## Where Poker And Dev Are Mixing Too Much

The biggest current issue is not that poker dominates the site. It does not. The issue is that poker keeps showing up often enough to muddy the dev story.

The clearest mixing points are:

- `frontend/app/components/About.tsx`
  Too much explanatory prose about poker background and future poker direction.
- `frontend/app/components/FundingCTA.tsx`
  Explicitly references poker-side funding from the dev homepage.
- `frontend/app/components/Hero.tsx`
  "Keep poker as a separate specialist vertical" is strategically correct, but still makes poker part of the hero-level framing.

Important drift against canonical strategy:

- In `one-percent-better-os/projects.json`, the poker repos are marked with `"landing": false`.
- In `one-percent-better-landing/CLAUDE.md`, the rule is to keep the dev surface centered on hiring and trust, not poker commercialization.

So the current codebase is mostly respecting the strategy at the repo-card level, but some landing copy still leaks poker into the dev narrative more than necessary.

## What Should Stay

Keep these as-is or nearly as-is:

- The GitHub profile positioning in `sukminc/README.md`
- The hiring-first framing in `one-percent-better-landing/README.md`
- The truth-first README positioning for `one-percent-better-today`
- The small-scope, shippable framing for `one-percent-better-focus`
- The evidence-based project surface: linked repos, recent activity, concrete status, archive proof
- The idea that `1% Better.dev` is a public build surface rather than a static portfolio

## What Should Be Simplified

- Reduce homepage funding emphasis.
- Remove poker-history explanation from the main About narrative.
- Stop mentioning poker in the homepage unless strictly necessary.
- Tighten metadata so shared previews reinforce hiring/trust, not support/funding.
- Keep `Today` and `Focus` framed as current proof, not as bigger product promises.

## Top 5 Cleanup Actions

### 1. Remove or demote `FundingCTA` from the homepage

Smallest useful change:

- Remove `FundingCTA` from `frontend/app/page.tsx`, or move it behind `/about`.

Why this is first:

- It is the single biggest trust-surface cleanup.
- It makes the homepage read faster for recruiters immediately.

### 2. Rewrite the About copy so poker is omitted, not explained

Smallest useful change:

- In `frontend/app/components/About.tsx`, replace the poker-origin paragraphs with a simpler current-truth story:
  decade in data, current public build season, small products, visible execution, hiring-first trust layer.

Why:

- The current story is already strong enough without the poker detour.

### 3. Update metadata and OG copy to remove funding language

Smallest useful change:

- Change `frontend/app/layout.tsx` description to emphasize hiring, visible execution, and small products.
- Change `frontend/app/opengraph-image.tsx` footer copy to remove "funding page".

Why:

- Shared previews should reinforce the dev lane cleanly.

### 4. Keep `Today`, `Focus`, and the GitHub profile exactly as truth-first proof surfaces

Smallest useful change:

- No major rewrite needed.
- Only tighten wording if future docs start implying a more shipped state than the repos actually support.

Why:

- These three surfaces are already mostly well positioned.

### 5. Keep README / CLAUDE alignment tight and stop future landing drift early

Smallest useful change:

- Add a short review habit: whenever landing copy changes, check it against
  - `one-percent-better-landing/CLAUDE.md`
  - `one-percent-better-os/public_profile.json`
  - `one-percent-better-os/projects.json`

Why:

- The docs already contain the right strategy.
- The issue is not missing strategy; it is minor public-surface drift.

## Bottom Line

The dev surface is still fundamentally clean, trustworthy, and hiring-friendly.

The strongest current public story is:

- proven senior data engineering background
- small public products that show recent execution
- a live site and GitHub profile that make that work easy to verify

The main cleanup need is not a rebuild. It is subtraction.

Poker is not overpowering the dev story, but it is still present often enough in homepage copy and funding language to create unnecessary narrative noise. The best next move is to make the dev lane simpler, quieter, and faster to parse.
