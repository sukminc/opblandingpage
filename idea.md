# Site Idea — onepercentbetter.poker

## Core Purpose

**Funding-first portfolio.** Every project card is a bet — visitors signal real interest by putting money on it. No donations = no work done. Chris only builds what the market actually wants.

## Funding Philosophy

> "돈이 되지 않는 프로젝트, 관심없는 프로젝트에 내 열정을 쏟고 싶지 않아"
> (I don't want to pour my passion into projects nobody pays for.)

Interest is measured in poker terms. If people want it built, they act. If not, it's a FOLD.

## Funding Tiers (Poker Actions)

| Action | Amount | Meaning |
|--------|--------|---------|
| FOLD | $0 | No interest — project gets deprioritized |
| Check | $10 | Mild interest — "I'd use this" |
| Call | $20 | Real interest — "Build this" |
| 10x Raise | $100+ | Strong signal — "I need this ASAP" |
| All-In | $1,000 | Sponsor-level — dedicated build time |

All tiers link to BMAC: https://buymeacoffee.com/chris.yoon

## UX — Card Flip Mechanic

- Projects displayed as a **bento grid of cards**
- **Front of card:** Project name, one-line description, status tag
- **Back of card (on hover):** Funding action buttons (FOLD / Check / Call / 10x Raise / All-In)
- Flip animation via **Framer Motion**
- Hover = flip; mouse leave = flip back
- Click any funding button → opens BMAC with preset amount (if supported)

## Goal

Chris prioritizes build time based on which projects accumulate the most funding signals. High-funded projects ship first. Zero-funded projects get folded.
