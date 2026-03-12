# CLAUDE.md — onepercentbetter (Landing Page Hub)

## What this is
Brand hub + portfolio for **onepercentbetter.poker** (current) → **OnePercentBetter.now** (post-MVP)
Tagline: "Marginal gains. Exponential results."
Repo: `one-percent-better-landing` (GitHub) → `one-percent-better-landing` (local)

**Rule: If a project is not listed on the site, it is not a brand asset.**

## Owner
Chris S. Yoon · Senior Data Engineer & AI Builder · Toronto ON
`linkedin.com/in/sukminyoon` · `github.com/sukminc` · Open to Work

---

## Key Strategy (Brand Split)

### Phase 1 — Now (Job Hunting)
- Public brand: clean data engineering / AI builder. Zero poker association.
- `onepercentbetter.poker` exists but is NOT promoted. Keep poker encoded/hidden.
- This site is for employers, friends, potential investors — all must see a clean profile.

### Phase 2 — Post-MVP
- Rebrand main domain to **OnePercentBetter.now**
- Brand name: "One Percent Better" or "1% Better" — general, universal
- No poker in the public brand

### Phase 3 — Long term
- `.poker` domain → dedicated poker vertical: staking + ActionKeeper + OPB analytics
- Managed separately, not linked from main brand

---

## Current Projects on Site (`frontend/app/data/projects.ts`)
1. **onepercentbetter** — Performance Analytics & Edge Intelligence · `building` · featured
2. **Blue Jays Moneyball ETL** — Self-Validating ELT Pipeline · `live`
3. **ActionKeeper** — Agreement & Negotiation Platform · `building`
4. **1% Better Focus** — Minimalist Deep-Work Timer · `building`
5. **TwelveLabs API Validator** — Multimodal Search Validation · `live`

**Revenue plan:** Easy consumer apps (focus tools, simple utilities) ship fast → capture income → fund the deep work.

## Stack
Next.js · Tailwind CSS v4 · TypeScript
Deploy: Vercel → `onepercentbetter.poker`

## Commands
```bash
cd frontend && npm run dev    # localhost:3000
npx next build                # build check
git push origin main          # always push directly to main (no PRs)
```

---

## Brand Identity

### Public copy (use these — no poker, no exploitation language)
- Hero: "Marginal gains. Exponential results."
- Description: "Every system has inefficiencies. Every market has edges. We build data tools that find them — and compound the advantage 1% at a time."

### Internal DNA (never surface publicly)
피쉬 잡는 공략법 — exploit edges against weak players. Quantify it. Compound it.
The surface story is data tools. The real story stays internal.

### Voice
- Precise, confident, minimal
- No fluff
- Never mention poker explicitly in public-facing copy

### Colors
| Token       | Hex       | Use                          |
|-------------|-----------|------------------------------|
| `bg`        | `#0D0D11` | Site background              |
| `purple`    | `#5E5CE6` | Primary accent               |
| `violet`    | `#8B5CF6` | Logo ring, secondary accents |
| `text-mute` | `#8A8B97` | Body / secondary text        |
| `border`    | `#232329` | Dividers, card borders       |

### Logo
- `/public/logo.svg` — circle badge "1%"
- `/public/logo-lockup.svg` — badge + wordmark

---

## Notes
- Resume PDF is gitignored — never commit
- Worktree: `git push origin HEAD:main`
- Vercel auto-deploys from `main`
