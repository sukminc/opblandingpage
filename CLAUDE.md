# CLAUDE.md

## What this is
Landing page + portfolio for **onepercentbetter.poker**
Tagline: "Marginal gains. Exponential results."
Repo: `opblandingpage`. Backend lives in a separate repo.

## Owner
Chris S. Yoon · Senior Data Engineer & AI Builder · Toronto ON
`linkedin.com/in/sukminyoon` · `github.com/sukminc` · Open to Work

## Pages
- `/` — Brand hero + 4 project flip-cards
- `/about` — Full resume (experience, skills, education). LinkedIn CTA only, no PDF download.

## Projects (`frontend/app/data/projects.ts`)
1. **onepercentbetter** — Performance Analytics & Edge Intelligence · `building` · featured
2. **Blue Jays Moneyball ETL** — Self-Validating ELT Pipeline · `live`
3. **ActionKeeper** — Agreement & Negotiation Platform · `building`
4. **TwelveLabs API Validator** — Multimodal Search Validation · `live`

## Stack
Next.js · Tailwind CSS v4 · Framer Motion · TypeScript
Deploy: Vercel → `onepercentbetter.poker`

## Commands
```bash
cd frontend && npm run dev    # localhost:3000
cd frontend && npm run build
```

---

## Brand Identity

### Core Philosophy
**"1% better"** — the marginal gains doctrine. 1% improvement compounded daily = 37× better in a year.

### Hidden brand DNA
The surface story is data-driven performance improvement.
The encoded truth is **"피쉬 잡는 공략법"** — systematic edge exploitation.
Every system has inefficiencies. Every market has fish. We build tools that find and compound those edges.
This is intentionally not surfaced in copy. Like Renaissance Technologies — the surface story and the real story differ.

### Public taglines (use these in copy)
- Hero: "Marginal gains. Exponential results."
- Sub-tagline: "FIND THE EDGE"
- Description: "Every system has inefficiencies. Every market has edges. We build data tools that find them — and compound the advantage 1% at a time."

### Logo
- **Primary mark**: Circle badge with "1%" — `/public/logo.svg`
- **Lockup**: Badge + "onepercentbetter" wordmark — `/public/logo-lockup.svg`
- **Exports**: `logo-48.png` (navbar), `logo-256.png` (general), `logo-512.png` (OG/print)
- **Favicon**: `favicon-32.png`, `favicon-16.png`

### Colors
| Token       | Hex       | Use                          |
|-------------|-----------|------------------------------|
| `bg`        | `#0D0D11` | Site background              |
| `purple`    | `#5E5CE6` | Primary accent (Hero, links) |
| `violet`    | `#8B5CF6` | Logo ring, secondary accents |
| `text-mute` | `#8A8B97` | Body / secondary text        |
| `border`    | `#232329` | Dividers, card borders       |

### Voice
- Precise, confident, minimal
- No fluff — every word earns its place
- Technical credibility without jargon overload
- Never mention poker explicitly in public-facing copy

---

## Notes
- Resume PDF is gitignored — never commit
- After repo rename, reconnect Vercel: Settings → Git → Disconnect → reconnect
- To push: `git push origin main` from repo root (SSH configured)
