# Build Plan — Scalp Micro USA Evergreen Casting Funnel

## Phases at a Glance
| Phase | Focus | Status |
|---|---|---|
| 0 | Environment Setup | ✅ Complete |
| 1 | Static Frontend — Hero + Offer + SMP Info | 🔄 Up Next |
| 2 | Multi-Step Application Form (UI only) | ⏳ Pending |
| 3 | Backend — Supabase DB + Storage | ⏳ Pending |
| 4 | Form → Backend Wiring | ⏳ Pending |
| 5 | Polish, Performance & Mobile QA | ⏳ Pending |
| 6 | Domain, Deploy & Launch | ⏳ Pending |

---

## Phase 0 — Environment Setup
**Goal:** Get a running Next.js app on local with all core dependencies installed.

- [ ] Scaffold Next.js 14 app (`create-next-app`)
- [ ] Install Tailwind CSS
- [ ] Install Framer Motion
- [ ] Install Supabase JS client
- [ ] Set up `.env.local` template (Supabase URL + anon key placeholders)
- [ ] Create `/public/assets/` folder structure for logo + media
- [ ] Push initial scaffold to GitHub repo
- [ ] Connect GitHub repo to Vercel for CI/CD

---

## Phase 1 — Static Frontend
**Goal:** Pixel-perfect, fully responsive page with all 5 sections — no form logic yet.

### Block 1 — Cinematic Hero
- Full-viewport height
- Looping silent video background (fallback: high-quality still)
- Dark scrim overlay (rgba 0,0,0 / 0.55)
- H1: "Share Your Story. Transform Your Life."
- Subhead + "Apply Now" CTA button (smooth anchor scroll to form)

### Block 2 — The Offer
- "The Documentary Project" headline
- Body copy explaining the monthly selection exchange
- 3-column icon grid: Apply → Get Selected → Film & Transform

### Block 3 — What is SMP?
- "The Ultimate Hair Loss Solution" headline
- 3 feature cards: Non-surgical / Immediate Results / Permanent
- Before/after photo gallery grid (lazy loaded, subtle border-radius)

### Block 4 — Application Form Shell
- Elevated card container
- Step progress indicator (steps 1–4)
- Placeholder step panels (no logic yet)

### Block 5 — Footer
- Logo
- Links: Main Website · Privacy Policy · Media Terms
- Copyright

---

## Phase 2 — Multi-Step Form UI
**Goal:** Fully interactive form with step navigation. No backend yet — all state lives in React.

- Step 1: First Name, Last Name, Email, Phone, Age, City/State
- Step 2: Two large text areas (journey + why them)
- Step 3: Photo upload dropzones × 4 (Front, Top, Back, Side) with preview thumbnails
- Step 4: Consent checkbox + Submit button
- Form state persists across Back/Next navigation
- Mobile-optimized layout — no awkward zoom or scroll cutoffs
- Smooth step transition animations (Framer Motion)

---

## Phase 3 — Supabase Backend
**Goal:** Database schema + file storage bucket configured and tested.

### Database Table: `applications`
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| created_at | timestamp | Auto |
| first_name | text | |
| last_name | text | |
| email | text | |
| phone | text | |
| age | int | |
| city_state | text | |
| hair_loss_story | text | |
| why_me | text | |
| photo_front_url | text | Supabase Storage URL |
| photo_top_url | text | |
| photo_back_url | text | |
| photo_side_url | text | |
| consent | boolean | Must be true to submit |
| status | text | Default: 'pending' → 'selected' / 'archived' |

### Storage Bucket: `applicant-photos`
- Private bucket (no public access)
- Folder structure: `/applicant-photos/{application_id}/{front|top|back|side}.jpg`
- Max file size: 10MB per photo

---

## Phase 4 — Form → Backend Wiring
**Goal:** Live end-to-end submission. Photo → Storage → DB record created.

- On submit: upload 4 photos to Supabase Storage → get public URLs
- Create `applications` row with all form data + photo URLs
- Success state: confirmation screen / thank you message
- Error handling: network failures, oversized files, missing required fields
- Email notification to Matt on new submission (Supabase edge function or Resend)

---

## Phase 5 — Polish & QA
**Goal:** Production-ready. Fast, beautiful, bulletproof on mobile.

- [ ] Google Lighthouse score 90+ on Performance
- [ ] Hero video compressed + optimized (WebM + MP4 fallback)
- [ ] All images lazy loaded and next/image optimized
- [ ] Full mobile responsiveness audit (375px → 1440px)
- [ ] Scroll-triggered fade-in animations on all sections
- [ ] Legal copy review for consent checkbox
- [ ] Meta tags, OG image, favicon

---

## Phase 6 — Launch
**Goal:** Live at custom domain.

- [ ] Purchase domain (Matt to confirm name)
- [ ] Connect domain in Vercel
- [ ] Set production environment variables in Vercel
- [ ] Smoke test full submission flow on production
- [ ] Share link

---

## Design Tokens (Reference)

```css
/* Typography */
--font-display: 'Syne', sans-serif;      /* Headers */
--font-body: 'Inter', sans-serif;         /* Body */

/* Colors — Draft (to be finalized in Phase 1) */
--color-bg: #0a0a0a;
--color-surface: #141414;
--color-text-primary: #f5f5f0;
--color-text-muted: #8a8a8a;
--color-accent: #c9a96e;                  /* Warm gold — premium feel */
--color-accent-hover: #e2c48a;

/* Spacing */
--section-padding: clamp(4rem, 8vw, 8rem);
```

---

## Session Log
| Date | Work Completed |
|---|---|
| 2026-06-16 | Project kickoff. Brain dump ingested. Tech stack decided. PROJECT.md + PLANNING.md created. |
| 2026-06-16 | Phase 0 complete. Next.js 14 scaffolded, Tailwind + Framer Motion + Supabase JS installed, design tokens set, Syne + Inter fonts wired, folder structure created, logo copied to public assets, TypeScript clean. |
| 2026-06-23 | Phase 1 built. All 5 sections live: Hero, Marquee Ticker, Offer, SMP Info, Form shell, Footer. Grain overlay, scroll-reveal animations, orange-red accent. Live reviewed in browser. Fix next session: nav/logo, form left clipping, section contrast, gallery text, footer logo. |
