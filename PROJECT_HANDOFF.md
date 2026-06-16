# Between Portfolio Website — Project Handoff

> **Purpose of this document:** Give a new AI agent (or developer) an accurate snapshot of the current codebase so work can continue without lost context.  
> **Last verified against codebase:** June 2026  
> **Figma source:** [Between-CU109](https://www.figma.com/design/wtexDQsQBaAgk2WLq9F9kV/Between-CU109?node-id=3-314) — file key `wtexDQsQBaAgk2WLq9F9kV`, main frame node `3:314` (`ONEHomePage`)

---

## 1. Project Overview

### What this website is
A single-page personal portfolio for **Chawankorn Bouraphan** under the brand **Between**. It presents projects, experience, and collaboration opportunities in a premium startup-style landing page.

### What it is meant to showcase
- Portfolio work across life stages: general portfolio, high school, CU109 first semester, CU109 second semester
- Professional journey (university affiliations, ecosystem stats)
- Current collaboration interests (hackathon, learners, internship)
- Profile, focus areas, and contact routing

### Visual / style direction
- Minimal, intelligent, premium, human
- References: Apple, Linear, Notion, Stripe, modern startup landing pages
- Palette: black (`#000000`), white (`#FFFFFF`), primary text (`#111111` / `#494949`), secondary text (`#666666` / `#ADADAD`), borders (`#ECECEC`)
- Typography: **Inter** via `next/font` — bold headlines, tight tracking, editorial startup feel
- Animations: restrained Framer Motion (fade-up, hover lift, infinite gallery scroll, floating logos)

**Important:** This is a **Figma recreation**, not a redesign. The goal is pixel-accurate fidelity to the Figma file.

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (`app/globals.css`, `@theme inline`) |
| Animation | **Framer Motion** (`^12.4.7`) |
| Icons | **Lucide React** |
| UI primitives | Lightweight shadcn-style components (`components/ui/button.tsx`, `badge.tsx`) — **not** full shadcn CLI install |
| Images | `next/image` |
| Fonts | `next/font` (Inter) |
| Deployment target | **Vercel** (static page, `npm run build` succeeds) |

### Scripts
```bash
npm install
npm run dev      # http://localhost:3000 (uses turbopack)
npm run build
npm run start
npm run lint
```

### Key config files
- `next.config.ts` — `outputFileTracingRoot`, AVIF/WebP image formats
- `package.json` — `between-portfolio-website`
- `tsconfig.json` — path alias `@/*`

---

## 3. Current Site Structure

Page composition is defined in `app/page.tsx`:

| Order | Section | Component | Section ID |
|-------|---------|-----------|------------|
| — | Navbar (fixed) | `components/navbar/navbar.tsx` | — |
| 1 | Hero | `components/hero/hero.tsx` | `hero` |
| 2 | Professionalizing my journey at | `components/journey/trust-section.tsx` | — |
| 3 | Experience ecosystem (stats + floating logos) | `components/ecosystem/ecosystem.tsx` | — |
| 4 | Portfolio showcase | `components/project-gallery/project-gallery.tsx` | `portfolio-showcase` |
| 5 | Currently looking for | `components/opportunities/opportunities.tsx` | `currently-looking-for` |
| 6 | CTA banner | `components/cta-banner/cta-banner.tsx` | — |
| 7 | About / Profile | `components/about/about.tsx` | `about` |
| 8 | Social connect (icon row) | `components/about/social-connect.tsx` | — |
| 9 | Footer | `components/footer/footer.tsx` | — |

### Section notes (actual implementation)

**Navbar**
- Fixed pill bar, text brand **"Between"** (no logo icon in navbar)
- Links: Portfolio, Plan, Profile + **Build with me** CTA
- Nav links hidden below `md` breakpoint (only brand + CTA visible on small screens)

**Hero**
- Between logo image (`/assets/Between-logo/Between-logo-removebg-figma.png`) above headline
- Headline: "Discover real-world learning inspiration"
- Subtitle from Figma copy about learning systems / educational innovation
- CTAs: "View my portfolio" (scroll), "View my plans" (scroll to opportunities)
- Three tilted portfolio preview images from `homepage-portfolio-example/`

**Trust section**
- Heading: "Professionalizing my journey at"
- White background, university logos from `uniserity-logo/`

**Ecosystem**
- Subtitle: "A growing journey of"
- Stacked stats: 24 projects / 32 experiences / 9 systems
- 10 floating app logos positioned from Figma coordinates (hidden on small screens, grid fallback on mobile)

**Portfolio showcase**
- Centered heading with line break
- Category pill tabs (Figma-style gray track)
- Infinite auto-scrolling horizontal gallery (`infinite-gallery.tsx`)
- "View all projects" link below gallery

**Currently looking for**
- Pink "CURRENTLY" label, heading, subtitle
- Three cards with Connect → OpenLinks

**CTA banner**
- Black rounded banner, left-aligned copy, two buttons

**About / Profile**
- Overlapping circular photo, white card, CU badge, Focus areas + Currently columns, text-style social links

**Social connect**
- Separate minimal Lucide icon row (Facebook, Instagram, Gmail, Line) — all → OpenLinks

**Footer**
- Dark background, three columns, no Pricing link

---

## 4. Navigation Behavior

Centralized in `lib/links.ts` and `lib/constants.ts`.

### External URLs
| Constant | URL | Usage |
|----------|-----|-------|
| `CONTACT_URL` | `https://openlink.co/gxcb` | All contact / social / Build with me |
| `PORTFOLIO_ARCHIVE_URL` | `https://drive.google.com/drive/folders/1TySD6JnlQA3Agvcfw1M_ZvgyOcIXUFfs?usp=sharing` | Full portfolio archive |

External links use `target="_blank"` and `rel="noopener noreferrer"` via `EXTERNAL_LINK_PROPS`.

### Internal scroll targets (`scrollIntoView({ behavior: "smooth" })`)
| Function | Target ID | Element |
|----------|-----------|---------|
| `scrollToHero()` | `hero` | Hero section |
| `scrollToPortfolioShowcase()` | `portfolio-showcase` | Portfolio gallery |
| `scrollToOpportunities()` | `currently-looking-for` | Currently looking for |
| `scrollToAbout()` | `about` | About / Profile |

Sections use `scroll-mt-28` where needed to offset fixed navbar.

### Navbar items
| Item | Behavior |
|------|----------|
| **Between** (brand) | `Link` to `/` (page top) |
| **Portfolio** | `scrollToPortfolioShowcase()` |
| **Plan** | `scrollToOpportunities()` |
| **Profile** | `scrollToAbout()` |
| **Build with me** | OpenLinks (`CONTACT_URL`) — new tab |

### Hero CTAs
| Button | Behavior |
|--------|----------|
| View my portfolio | `scrollToPortfolioShowcase()` via `ScrollToPortfolioLink` |
| View my plans | `scrollToOpportunities()` |

### Portfolio section
| Element | Behavior |
|---------|----------|
| View all projects | Google Drive (`PORTFOLIO_ARCHIVE_URL`) — new tab |

### CTA banner
| Button | Behavior |
|--------|----------|
| Get In Touch | OpenLinks — new tab |
| View Portfolio | Google Drive — new tab |

### Opportunities cards
| Element | Behavior |
|---------|----------|
| Connect | OpenLinks — new tab |

### About section
| Element | Behavior |
|---------|----------|
| Facebook / Instragram / Line (text links) | OpenLinks — new tab |

### Social connect (icon row)
| Element | Behavior |
|---------|----------|
| All icons | OpenLinks — new tab |

### Footer
| Link | Behavior |
|------|----------|
| Explore | `scrollToHero()` |
| Portfolio | `scrollToPortfolioShowcase()` |
| Contact | OpenLinks — new tab |
| Facebook / Instagram / Gmail / Line | OpenLinks — new tab |
| Privacy policy / Terms | `href="#"` (placeholder, not implemented) |

---

## 5. Portfolio Asset Mapping

Configuration lives in `lib/portfolio-data.ts`. Assets are served from `public/assets/`. Source originals also exist in `png/` at repo root.

### Category folders (public paths)

| Tab label | Config key | Public asset folder | Files currently listed in config |
|-----------|------------|---------------------|----------------------------------|
| **Portfolio** | `portfolio` | `/assets/Portfolio-slides-for-showcasing/` | Cover1.jpg, 2.png, 5.png, 6.png, 7.png, 8.png, 9.png, 10.png, 11 (2).png, 12 (2).png, 13.png, 2.jpg, 4.jpg |
| **High School** | `highSchool` | `/assets/portfolio-slides-for-showcaing-(highschool)/` | 9.png, 10.png |
| **CU109 / 1st** | `cu109Sem1` | `/assets/portfolio-slides-for-showcaing-(cu109-1st)/` | 11 (2).png, 12 (2).png |
| **CU109 / 2nd** | `cu109Sem2` | `/assets/portfolio-slides-for-showcaing-(cu109-2nd)/` | 13.png, 4.jpg, 2.jpg |

> **Note:** Folder names use the typo `showcaing` (not `showcasing`) — this matches the on-disk folder names. Do not rename without updating `portfolio-data.ts` and copying assets.

### Source-only folders (`png/`)
Same structure as above, plus:
- `png/contact-logos/` — Facebook, Instagram, LINE icons (**not** currently copied to `public/assets/`)
- `png/portfolio/` — empty legacy folder under `public/assets/portfolio/` also exists (unused)

### Hero preview images (separate from gallery)
`public/assets/homepage-portfolio-example/` — `1.png`, `2.png`, `3.jpg`

### Category separation rule
**High School, CU109 / 1st, and CU109 / 2nd tabs must only load from their dedicated folders.**

**Known overlap:** The **Portfolio** tab currently lists all files from `Portfolio-slides-for-showcasing/`, which includes images (`9.png`, `10.png`, `11 (2).png`, `12 (2).png`, `13.png`, `2.jpg`, `4.jpg`) that also appear in category-specific tabs. Whether the Portfolio tab should show only a curated subset is **unclear from code alone** — confirm against Figma / product intent before changing.

Category-specific folders were populated by copying files from `Portfolio-slides-for-showcasing/` because dedicated source folders were empty at build time. If the user adds unique PNGs to `png/portfolio-slides-for-showcaing-(highschool)` etc., they must be synced to `public/assets/...` as well.

---

## 6. Current Implementation Status

### Already built
- Full single-page layout with all major sections
- Figma-informed spacing/typography pass on navbar, hero, trust, ecosystem, gallery, CTA, about, footer
- Infinite auto-scroll portfolio gallery with drag, pause-on-hover, focus scale/blur
- Category tab switching with `AnimatePresence` fade
- Centralized link/navigation helpers (`lib/links.ts`)
- Data-driven portfolio config (`lib/portfolio-data.ts`)
- Site config / content (`lib/constants.ts`)
- SEO metadata in `app/layout.tsx`
- Production build passes (`npm run build`)

### Working
- Dev server (`npm run dev`)
- Production build and static generation
- Internal smooth scrolling between sections
- OpenLinks routing for contact/social CTAs
- Google Drive routing for archive CTAs (CTA banner View Portfolio, gallery View all projects)
- Image loading via `next/image`
- Responsive basics (navbar collapse, ecosystem mobile logo grid, stacked layouts)

### Still needs visual correction / Figma matching
Exact pixel parity at **1440px desktop** has not been fully verified in browser against Figma after the last pass. Areas most likely to need refinement:

- Navbar width (Figma: `543px`; code: `580px`/`600px` max-width)
- Navbar mobile behavior (links hidden — Figma desktop-only design may need a mobile nav pattern)
- Hero three-image composition (tilt, overlap, shadow) vs Figma `Group 12`
- Ecosystem logo positions at laptop/tablet breakpoints (coordinates are scaled from 1440px reference)
- Portfolio gallery card size (code: `280×360–400px`; Figma slider cards: `277×392px`)
- About section fine details (social link styling in Figma uses colored ellipses + arrows; code uses text rows)
- Social connect icon section — may or may not match latest Figma (exists as separate section)
- CTA banner layout on mobile

### Figma MCP status
Figma MCP **was connected** with `file_content:read` scope during the last visual correction pass. New agents should re-verify MCP access before pixel-audit work.

---

## 7. Known Issues

Documented from actual code + recent correction history. Severity is indicative, not measured.

| Issue | Details |
|-------|---------|
| **Navbar width mismatch** | Figma pill is `543×57px`; implementation uses `max-w-[580px]` / `600px` to fit 3 nav items + CTA |
| **Navbar logo/text inconsistency** | Navbar uses text **"Between"** only; Hero still renders Between **logo image** above headline |
| **Plan scroll behavior** | Implemented (`scrollToOpportunities` → `#currently-looking-for`). Verify `scroll-mt-28` offset feels correct under fixed navbar |
| **Navbar mobile gap** | Portfolio / Plan / Profile links hidden below `md` — no hamburger or alternate mobile nav |
| **Section alignment** | Trust, ecosystem, gallery heading, and CTA may still differ from Figma at non-1440 breakpoints |
| **Portfolio image overlap across tabs** | Portfolio tab includes files that also appear in High School / CU109 tabs (see §5) |
| **Portfolio tab may be over-inclusive** | Lists 13 files; may not match Figma "Portfolios" tab curated set |
| **Dedicated category source folders** | `png/portfolio-slides-for-showcaing-(highschool)` etc. contain copies, not necessarily unique covers — confirm with user |
| **CTA behavior split** | Hero "View my portfolio" scrolls internally; CTA banner "View Portfolio" opens Google Drive — intentional per latest spec |
| **Footer cleanup** | Pricing removed. Privacy/Terms still `href="#"`. Footer brand shows "Between." with period; navbar shows "Between" without |
| **Profile section mismatch** | Rebuilt toward Figma but social links differ (text rows vs Figma colored icons). `contact-logos` assets exist in `png/` but are unused |
| **Duplicate social sections** | About has "Let's connect" text links; `SocialConnect` adds icon row below — may be redundant vs Figma |
| **Trust heading copy** | Code: "Professionalizing my journey at" — Figma frame text reads "Professoring my journey at" (possible typo in design) |
| **Empty legacy folder** | `public/assets/portfolio/` exists but is empty/unused |
| **`.next` lock on Windows** | `npm run build` can fail with EPERM if dev server is running; stop Node processes first |

---

## 8. Development Rules

1. **Figma MCP is the source of truth** for layout, spacing, typography, colors, and component hierarchy.
2. **Do not redesign** — correct mismatches only.
3. **Do not invent new layouts** or visual concepts not in Figma.
4. **Prioritize pixel accuracy** on desktop (1440px), then verify laptop/tablet/mobile without breaking layout.
5. **Keep portfolio assets separated by category** — never serve High School images from CU109 folders, etc.
6. **Do not mix placeholder assets** — use files from `png/` / `public/assets/`.
7. **Preserve Vercel deployment readiness** — `npm run build` must pass without manual fixes.
8. **Minimize scope** — prefer focused diffs; match existing code conventions (`@/` imports, Tailwind, Framer Motion).
9. **Centralize URLs** in `lib/links.ts` and content in `lib/constants.ts` / `lib/portfolio-data.ts`.
10. **Do not commit** unless explicitly requested by the user.

### Figma MCP usage
```
fileKey: wtexDQsQBaAgk2WLq9F9kV
nodeId:  3:314
```
Tool: `get_figma_data` (Framelink MCP). Requires `file_content:read` scope.

### Design tokens (from spec + Figma)
```
Primary:     #000000
Background:  #FFFFFF
Text:        #111111
Secondary:   #666666 / #494949 / #ADADAD
Border:      #ECECEC
Font:        Inter
```

---

## 9. Final Summary

### Project state so far
The Between portfolio website is a **functional, deployable Next.js 15 single-page app** that recreates the Figma `ONEHomePage` layout. All major sections are implemented, navigation routing is centralized (internal scroll vs OpenLinks vs Google Drive), and the portfolio gallery uses an infinite horizontal scroller with category tabs. A Figma-informed visual correction pass has been applied, but **full pixel-perfect desktop parity is not yet confirmed**. The codebase builds cleanly and is structured for continued audit work.

### Next actions needed
1. **Browser QA at 1440px** — compare each section side-by-side with Figma MCP measurements; fix remaining spacing/typography deltas.
2. **Resolve portfolio asset strategy** — confirm whether the Portfolio tab should show all `Portfolio-slides-for-showcasing` files or a curated subset only; eliminate unintended cross-tab duplication if required.
3. **Sync unique category assets** — if user provides distinct PNGs per category in `png/`, copy to matching `public/assets/portfolio-slides-for-showcaing-*` folders and update `portfolio-data.ts`.
4. **Navbar mobile UX** — add accessible mobile navigation if Figma/spec requires Portfolio/Plan/Profile on small screens.
5. **Align hero branding** — decide logo-in-hero vs text-only to match Figma consistently with navbar.
6. **About / social sections** — reconcile About card social links vs `SocialConnect` icon row with Figma (use `png/contact-logos/` if needed).
7. **Implement Privacy / Terms** — replace `href="#"` footer placeholders or remove if out of scope.
8. **Responsive pass** — verify 1280px, 1024px, 768px, 390px after desktop corrections.

---

## Quick File Reference

```
app/
  layout.tsx          # Metadata, Inter font
  page.tsx            # Section composition
  globals.css         # Tailwind v4 theme

lib/
  links.ts            # URLs, scroll helpers, section IDs
  constants.ts        # Site config, nav, logos, opportunities, footer
  portfolio-data.ts   # Gallery categories + image paths
  animations.ts       # Framer Motion variants
  utils.ts            # cn() helper

components/
  navbar/
  hero/
  journey/            # trust-section
  ecosystem/
  project-gallery/    # project-gallery + infinite-gallery
  opportunities/
  cta-banner/
  about/              # about + social-connect
  footer/
  ui/                 # button, badge, scroll-link
  motion/             # fade-in helpers

public/assets/        # Deployed static images
png/                  # Source asset folder (not all synced to public/)
```

---

*End of handoff document.*
