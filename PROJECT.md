# Scalp Micro USA — Evergreen Casting Funnel
## Project Overview

A standalone evergreen landing page that recruits treatment models for Scalp Micro USA. Visitors apply for a chance to receive a **fully sponsored SMP treatment** with founder Matt Iulo in exchange for sharing their hair loss story on camera. The page runs indefinitely — every submission is a potential content asset and warm lead.

---

## The Core Exchange
> *You share your story. We transform your look. Everyone sees the results.*

- Applicant submits their story + photos
- Matt's team reviews monthly and selects candidates
- Selected applicants receive free SMP treatment
- Treatment is filmed for TikTok, Instagram, and YouTube documentary content

---

## Key People
- **Matt Iulo** — Founder, Scalp Micro USA. Face of the brand, selects winners.
- **Dev/Design** — Claude Code (AI-assisted nightly build sessions)

---

## Domain & Hosting
- **Domain:** Separate from scalpmicrousa.com (TBD — e.g. `scalpstories.com` or similar)
- **Hosting:** Vercel (free tier, instant deploys)
- **Repository:** Local → GitHub → Vercel CI/CD

---

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Full control, SEO, performance |
| Styling | Tailwind CSS | Rapid, consistent, mobile-first |
| Animations | Framer Motion | Smooth scroll reveals, form transitions |
| Backend / DB | Supabase (Postgres) | Database + file storage in one, free tier |
| File Uploads | Supabase Storage | Applicant photos stored securely, URLs saved to DB |
| Deployment | Vercel | One-click deploys, free SSL, edge CDN |
| Future V2 | Salesforce integration | Pipe from Supabase via webhook when ready |

---

## Brand
- **Logo:** `Original Logo Black.png` (light backgrounds) / needs white version for dark hero
- **Aesthetic:** Premium Editorial — cinematic, dark, generous whitespace
- **Typography:** Display — Syne or Clash Display / Body — Inter
- **Palette:** TBD (deep charcoal / off-white base with one strong accent)

---

## Assets Status
| Asset | Status |
|---|---|
| Logo (black) | ✅ In project folder |
| Hero video (B-roll) | ⏳ Matt to drop in project folder |
| Before/after gallery photos | ⏳ Matt to drop in project folder |
| Legal / media release copy | ⏳ Placeholder drafted in code, legal review TBD |

---

## Current Status
- **Phase:** Environment Setup & Planning
- **Last session:** Project documents created, tech stack decided
- **Next session:** Scaffold Next.js app, install dependencies, build static hero section
