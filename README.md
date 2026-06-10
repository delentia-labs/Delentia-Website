<div align="center">

# Delentia Labs — Constitutional AI Operating System

Website of [delentia.com](https://delentia.com) — The Constitutional AI Operating System.
Built with Next.js 16 App Router, fully bilingual (EN/TH), ISR-optimized, 152 static pages.

[![Deployed](https://img.shields.io/badge/deployed-delentia.com-brightgreen?logo=vercel)](https://delentia.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](next.config.mjs)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](tsconfig.json)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)](app/globals.css)
[![Static Pages](https://img.shields.io/badge/static_pages-152-blue)](#architecture)
[![i18n](https://img.shields.io/badge/i18n-EN%20%2F%20TH-orange)](#i18n-system)
[![LCP EN](https://img.shields.io/badge/LCP_EN-4%2C589ms-brightgreen)](#performance)
[![License](https://img.shields.io/badge/license-Proprietary-red)](package.json)

**Choose Language / เลือกภาษา:**
🇬🇧 English · 🇹🇭 [ภาษาไทย](#-ภาษาไทย--thai-documentation)

</div>

---

<details>
<summary><strong>📋 Table of Contents</strong></summary>

- [What is delentia.com?](#what-is-rctlabsco)
- [FDIA Equation](#fdia-equation)
- [Key Metrics](#key-metrics)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [i18n System](#i18n-system)
- [Blog & Content System](#blog--content-system)
- [Performance](#performance)
- [SEO](#seo)
- [Environment Variables](#environment-variables)
- [Scripts Reference](#scripts-reference)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Related Repositories](#related-repositories)
- [ภาษาไทย / Thai Documentation](#-ภาษาไทย--thai-documentation)

</details>

---

## What is delentia.com?

**delentia.com** is the official website for Delentia Labs — the team behind the Constitutional AI Operating System (CAIOS). The site serves as the primary interface for communicating Delentia Labs' research, products, philosophy, and ecosystem to the world.

The website is a high-performance, fully bilingual (English + Thai) Next.js application with Incremental Static Regeneration (ISR), a complete SEO layer (hreflang, Schema.org JSON-LD, auto-sitemap), and a bilingual MDX blog system.

> **Note:** This repo contains the **marketing + documentation website** only. For the Constitutional AI SDK, see [`Delentia-OS`](https://github.com/delentia-labs/Delentia-OS).

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## FDIA Equation

The FDIA equation is the foundational concept of Delentia Labs — the mathematical model behind Constitutional AI decision-making:

```
F = D^I × A
```

| Symbol | Meaning | Description |
|--------|---------|-------------|
| **F** | Future | The desired output / outcome |
| **D** | Data | Data quality score (0.0 – 1.0) |
| **I** | Intent | Intent precision exponent (amplifies or dampens D) |
| **A** | Architect | Human-in-the-loop gate (0.0 = full stop, 1.0 = full pass) |

> **Constitutional guarantee**: When `A = 0`, the system halts all outputs — no AI action proceeds without human authorization.

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Key Metrics

| Metric | Value |
|--------|-------|
| **Static Pages** | 152 pages (ISR `revalidate = 3600s`) |
| **Blog Posts** | 53 MDX files (~26 bilingual EN + TH pairs) |
| **LCP (EN)** | 4,589 ms median (Lighthouse throttled 4G) |
| **LCP (TH)** | 5,054 ms median |
| **LCP Threshold** | 7,000 ms — **PASSED ✅** |
| **TypeScript Errors** | 0 (strict mode) |
| **i18n Locales** | 2 — EN (`/en/*`) and TH (`/th/*`) |
| **Design Tokens** | Warm cream system (5 semantic colors + dark surface layer) |
| **Tailwind Version** | v4 (flat config — no `tailwind.config.ts`) |
| **Next.js Version** | 16.2.4 App Router |
| **Font Strategy** | `display: "optional"` — no FOUT, no layout shift |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              RCTLABS.CO — WEBSITE ARCHITECTURE              │
│          Next.js 16.2.4  App Router + ISR + i18n            │
└─────────────────────────────────────────────────────────────┘

Request Flow:
  Browser → Vercel Edge → Next.js Middleware (locale detect)
          ↓   /en/* or /th/*
          ↓
  RSC (React Server Component)
          ↓
  ISR Cache (revalidate = 3600s) → HTML Stream
          ↓
  Client Hydration (Framer Motion, MainPageOrchestrator)

Static Layer (ISR):
  app/[locale]/page.tsx        ← Homepage (2 locales × ISR)
  app/[locale]/blog/[slug]/    ← ~26 blog posts × 2 locales
  app/sitemap.ts               ← Auto-generates 152 URLs
  app/robots.ts                ← robots.txt
  app/manifest.ts              ← PWA manifest

Performance Guards:
  scripts/lcp-trace.mjs        ← Lighthouse 3-run median, threshold = 7,000 ms
  scripts/smoke-pages.mjs      ← All 152 pages → must return HTTP 200
```

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js App Router | 16.2.4 |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS v4 (flat config) | 4.x |
| Animation | Framer Motion | 12.x |
| Content | MDX + gray-matter | 3.x |
| Icons | Lucide React | latest |
| UI Primitives | Radix UI (via shadcn/ui) | latest |
| Fonts | Space Grotesk + Kanit (`display: "optional"`) | — |
| Database | Supabase (contact form, newsletter) | 2.x |
| Deployment | Vercel (ISR, Edge Functions) | — |
| Analytics | Vercel Analytics + GA4 | — |
| i18n | Path-prefix routing (EN/TH, custom middleware) | — |
| Schema | Schema.org JSON-LD (Organization, BlogPosting, FAQ) | — |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/delentia-labs/Delentia-Website.git
cd Delentia-Website

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local — see Environment Variables section

# Start development server (port 3005)
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) — you should see the homepage in English.
Visit [http://localhost:3005/th](http://localhost:3005/th) for the Thai version.

### Build & Verify

```bash
npm run build           # Production build — must complete with 0 errors
npm run smoke:pages     # Verify all 152 pages return HTTP 200
npm run perf:lcp:trace  # Run LCP guard (threshold: 7,000 ms)
```

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Project Structure

```
rctlabs-website/
├── app/
│   ├── [locale]/              ← Homepage (ISR, EN + TH)
│   │   ├── blog/              ← Blog listing + post pages
│   │   └── page.tsx
│   ├── about/                 ← About page
│   ├── admin/                 ← Admin panel (auth-gated)
│   ├── layout.tsx             ← Root layout (ISR-safe, no headers() call)
│   ├── sitemap.ts             ← Auto-generates all 152 sitemap URLs
│   ├── robots.ts              ← robots.txt
│   ├── manifest.ts            ← PWA manifest
│   ├── opengraph-image.tsx    ← Dynamic OG image generation
│   ├── apple-icon.tsx         ← Apple touch icon
│   └── globals.css            ← Tailwind v4 flat config + design tokens
├── components/
│   ├── sections/              ← Homepage sections (FDIA, Hero, Products…)
│   ├── navigation/            ← Navbar system (S/M/L tier panels)
│   │   ├── desktop-nav.tsx
│   │   ├── mobile-nav-drawer.tsx
│   │   └── resources-panel.tsx
│   ├── main-page/             ← MainPageOrchestrator + DeferredSection
│   ├── performance/           ← DeferredGlobalBackground
│   ├── blog/                  ← Blog-specific components
│   └── ui/                    ← shadcn/ui primitives
├── content/
│   └── blog/                  ← 53 MDX files (*.mdx EN + *.th.mdx TH)
├── lib/
│   ├── site-config.ts         ← SOCIAL_LINKS, SITE_URL, central constants
│   ├── schema.ts              ← Schema.org JSON-LD generators
│   ├── blog.ts                ← MDX parsing, frontmatter utilities
│   └── utils.ts               ← cn(), general helpers
├── messages/
│   ├── en.json                ← English UI strings
│   └── th.json                ← Thai UI strings
├── public/                    ← Static assets (icons, images, OG assets)
├── scripts/
│   ├── lcp-trace.mjs          ← LCP performance guard (Lighthouse)
│   ├── smoke-pages.mjs        ← HTTP 200 checker for all 152 pages
│   └── verify-public-truth.sh ← Public truth verification
├── styles/
│   └── tokens.css             ← Design tokens (warm-cream system)
├── next.config.mjs            ← Next.js config (ISR, optimizeCss, headers)
├── tsconfig.json              ← TypeScript strict config
└── package.json               ← Scripts, dependencies
```

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## i18n System

The website is **fully bilingual** — English and Thai served from path-prefixed routes:

| Locale | Path Prefix | Primary Font | Example URL |
|--------|-------------|--------------|-------------|
| English | `/en/*` | Space Grotesk | `https://delentia.com/en/blog/fdia-equation-explained` |
| Thai | `/th/*` | Kanit | `https://delentia.com/th/blog/fdia-equation-explained` |

**How it works:**

1. Middleware (`middleware.ts`) detects `Accept-Language` header → redirects `/` → `/en` or `/th`
2. `app/[locale]/` catches both locales — one ISR build per locale
3. UI strings live in `messages/en.json` and `messages/th.json`
4. Blog posts: every EN file (`slug.mdx`) has a matching TH file (`slug.th.mdx`)
5. `hreflang` links (EN, TH, x-default) are injected on every page via root layout
6. Root layout is **ISR-safe** — no `headers()` or `cookies()` call that breaks static generation

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Blog & Content System

```
content/blog/
├── fdia-equation-explained.mdx             ← EN
├── fdia-equation-explained.th.mdx          ← TH
├── rct-control-plane-explained.mdx         ← EN
├── rct-control-plane-explained.th.mdx      ← TH
└── ... (53 files total — ~26 bilingual pairs)
```

**Frontmatter schema:**

```yaml
---
title: "Article Title"
author: "Ittirit Saengow"
date: "2026-05-14"
lastReviewed: "2026-05-06"       # → maps to dateModified in BlogPosting JSON-LD
category: "research"              # research | philosophy | industry | news
readTime: 12                      # minutes
tags: ["constitutional-ai", "governance"]
excerpt: "Brief summary for listing cards and meta description"
---
```

**Adding a new post:**

1. Create `content/blog/my-new-post.mdx` (EN)
2. Create `content/blog/my-new-post.th.mdx` (TH)
3. `npm run build` — post is auto-discovered and statically generated
4. New URLs: `/en/blog/my-new-post` and `/th/blog/my-new-post`

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Performance

### LCP Optimization History

| Date | Change | LCP EN | LCP TH | Status |
|------|--------|--------|--------|--------|
| May 5, 2026 | Kanit `display: "optional"` | ~5,100 ms | 5,065 ms | PASS |
| May 6, 2026 | Space Grotesk `display: "optional"` + manual font preloads | **4,589 ms** | **5,054 ms** | **PASS ✅** |
| — | Threshold | < 7,000 ms | < 7,000 ms | — |

**Font preload strategy:**

Both critical fonts are preloaded via Next.js auto-inject + manual `<link rel="preload">` in `app/layout.tsx`:

- `36966cca54120369-s.p.woff2` — Space Grotesk Latin subset
- `25f7d470e08d7a87-s.p.woff2` — Kanit Latin subset

**CSS render-blocking:**

| Bundle | Size | Blocking time (EN) |
|--------|------|--------------------|
| `db4efb75...css` (Tailwind bundle) | 374 KB | ~757 ms |
| `851938b2...css` (CSS modules) | 9.4 KB | ~156 ms |

`optimizeCss: true` (critters) is enabled in `next.config.mjs`.

### Running the LCP Guard

```bash
# Requires production server on port 3005
npm run build
npm start -- -p 3005      # separate terminal
npm run perf:lcp:trace
```

Expected: `LCP EN median: X ms (PASS) | LCP TH median: Y ms (PASS)`

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## SEO

| Feature | Implementation |
|---------|----------------|
| **Structured Data** | Organization, WebSite, BlogPosting, BreadcrumbList, FAQPage (JSON-LD) |
| **Bilingual SEO** | `hreflang` EN / TH / x-default on every page |
| **Sitemap** | Auto-generated at `/sitemap.xml` — 152 URLs |
| **OpenGraph** | Dynamic per-page title, description, OG image |
| **Twitter Cards** | `summary_large_image` — handle `@ittirit_rct` |
| **Canonical URLs** | Auto-resolved per locale |
| **Blog dateModified** | `lastReviewed` frontmatter → `dateModified` in BlogPosting JSON-LD |
| **Author Entity** | `/authors/ittirit-saengow` — E-E-A-T signal |
| **robots.txt** | Auto-generated, blocks `/admin/*` |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Environment Variables

Create `.env.local` from this template:

```env
# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXX

# Search Console verification
GOOGLE_SITE_VERIFICATION=your_token_here
BING_SITE_VERIFICATION=your_token_here

# Supabase (contact form + newsletter)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Site URL (used for sitemap + canonical)
NEXT_PUBLIC_SITE_URL=https://delentia.com

# Auto-injected by Vercel — no action required
# VERCEL=1
# VERCEL_ENV=production|preview|development
# VERCEL_URL=...
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager ID |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics 4 Measurement ID |
| `GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console token |
| `BING_SITE_VERIFICATION` | Optional | Bing Webmaster token |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical base URL (default: `https://delentia.com`) |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| Dev server | `npm run dev` | Start on `http://localhost:3005` |
| Production build | `npm run build` | Build 152 static pages (must pass 0 errors) |
| Production start | `npm start` | Start production server |
| Lint | `npm run lint` | ESLint check |
| Smoke test | `npm run smoke:pages` | Verify all pages return HTTP 200 |
| LCP trace | `npm run perf:lcp:trace` | Lighthouse 3-run median (threshold: 7,000 ms) |
| Verify public | `npm run verify:public` | Public truth verification |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Deployment

Live at **[delentia.com](https://delentia.com)** — auto-deployed via Vercel on every push to `main`.

| Environment | URL | Trigger |
|-------------|-----|---------|
| Production | https://delentia.com | Push to `main` |
| Preview | https://rctlabs-git-*.vercel.app | Pull Request |

**Deploy checklist:**

```bash
npm run build           # 0 errors required
npm run smoke:pages     # All HTTP 200 required
npm run perf:lcp:trace  # Threshold 7,000 ms required
git push origin main    # Auto-deploys to Vercel
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for full pre-launch checklist.

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## Contributing

1. **Branch**: `git checkout -b MMDD-feature-description`
2. **Develop**: See [MAINTENANCE.md](MAINTENANCE.md) for conventions
3. **Build**: `npm run build` — must pass with 0 TypeScript errors
4. **Smoke**: `npm run smoke:pages` — all 152 pages must return HTTP 200
5. **LCP guard**: `npm run perf:lcp:trace` — must pass 7,000 ms threshold
6. **PR**: Submit pull request to `main`

**Key conventions:**

| Rule | Reason |
|------|--------|
| Add `.th.mdx` pair for every EN blog post | Bilingual parity |
| No `"use client"` on LCP-path components | Prevents hydration delay on LCP element |
| Fonts: `display: "optional"` only | No FOUT, no layout shift |
| ISR: no `headers()` in root layout | Preserves static generation |
| Images: use `next/image` with `priority` on LCP images | Preload hint injection |

[↑ Back to top](#rct-labs--constitutional-ai-operating-system)

---

## License

© 2026 Delentia Labs / Ittirit Saengow. All rights reserved.
This repository's source code is **proprietary and confidential**.
Unauthorized copying, distribution, or use is strictly prohibited.

---

## Contact

| Channel | Link |
|---------|------|
| Website | [delentia.com](https://delentia.com) |
| Email | founder@delentia.com |
| GitHub (Org) | [github.com/delentia-labs](https://github.com/delentia-labs) |
| GitHub (Personal) | [github.com/ittirit720](https://github.com/ittirit720) |
| LinkedIn | [ittirit-saengow](https://www.linkedin.com/in/ittirit-saengow/) |
| X / Twitter | [@ittirit_rct](https://x.com/ittirit_rct) |
| Discord | [discord.gg/rctlabs](https://discord.gg/rctlabs) |

---

## Related Repositories

| Repository | Description | Link |
|------------|-------------|------|
| `Delentia-OS` | Open-source SDK — Constitutional AI runtime (Apache 2.0) | [github.com/delentia-labs/Delentia-OS](https://github.com/delentia-labs/Delentia-OS) |
| `Delentia-OS-Gui` | Tauri desktop app — Delentia Desk (Win/Mac/Linux) | [github.com/delentia-labs/Delentia-OS-Gui](https://github.com/delentia-labs/Delentia-OS-Gui) |
| `Delentia-AI-SLM` | SLM fine-tuning factory — Llama 3.1 8B + QLoRA | [github.com/delentia-labs/Delentia-AI-SLM](https://github.com/delentia-labs/Delentia-AI-SLM) |
| `Delentia-Ecosystem` | Plugin registry — LINE, Slack, skill manifests | [github.com/delentia-labs/Delentia-Ecosystem](https://github.com/delentia-labs/Delentia-Ecosystem) |
| `Delentia-Website` | Marketing + docs site — Next.js, Vercel | [github.com/delentia-labs/Delentia-Website](https://github.com/delentia-labs/Delentia-Website) |
| `Delentia-OS` Docs | GitHub Pages — SDK documentation | [delentia-labs.github.io/delentia-os](https://delentia-labs.github.io/delentia-os/) |

---

## 🇹🇭 ภาษาไทย / Thai Documentation

### delentia.com คืออะไร?

**delentia.com** คือเว็บไซต์หลักของ Delentia Labs — ทีมผู้สร้าง Constitutional AI Operating System (CAIOS)
เว็บไซต์ทำหน้าที่เป็นช่องทางหลักในการสื่อสารงานวิจัย ผลิตภัณฑ์ ปรัชญา และ ecosystem ของ Delentia Labs

สร้างด้วย Next.js 16 App Router, รองรับ 2 ภาษา (EN/TH), ISR-optimized, SEO Layer ครบ
(hreflang, Schema.org JSON-LD, Auto-Sitemap) และระบบ Blog MDX แบบ bilingual

### ตัวเลขสำคัญ

| ตัวชี้วัด | ค่า |
|----------|-----|
| หน้าสถิต (Static Pages) | 152 หน้า |
| บทความ Blog | 53 ไฟล์ MDX (~26 คู่ EN+TH) |
| LCP ภาษาอังกฤษ | 4,589 ms (ผ่าน ✅) |
| LCP ภาษาไทย | 5,054 ms (ผ่าน ✅) |
| TypeScript Errors | 0 |
| เวอร์ชัน Next.js | 16.2.4 |
| เวอร์ชัน Tailwind | v4 (flat config) |

### เริ่มต้นใช้งาน (Quick Start)

```bash
git clone https://github.com/delentia-labs/Delentia-Website.git
cd Delentia-Website
npm install
npm run dev   # → http://localhost:3005
```

### ระบบ i18n

เว็บไซต์รองรับ 2 ภาษาผ่าน path-prefix routing:

- **ภาษาอังกฤษ**: `/en/*` — ใช้ฟอนต์ Space Grotesk
- **ภาษาไทย**: `/th/*` — ใช้ฟอนต์ Kanit

Middleware ตรวจสอบ `Accept-Language` แล้ว redirect `/` → `/en` หรือ `/th` อัตโนมัติ
ไฟล์ภาษา UI อยู่ที่ `messages/en.json` และ `messages/th.json`
บทความ Blog: ทุกไฟล์ EN (`slug.mdx`) มีคู่ TH (`slug.th.mdx`)

### สคริปต์หลัก

| สคริปต์ | คำสั่ง | วัตถุประสงค์ |
|---------|-------|--------------|
| Dev server | `npm run dev` | เปิดที่ localhost:3005 |
| Build | `npm run build` | สร้าง 152 หน้า (ต้องผ่านโดยไม่มี error) |
| Smoke test | `npm run smoke:pages` | ตรวจว่าทุกหน้า return HTTP 200 |
| LCP trace | `npm run perf:lcp:trace` | วัด LCP (threshold 7,000 ms) |

### สถาปัตยกรรม (ภาษาไทย)

```
Browser → Vercel Edge → Middleware (ตรวจภาษา)
        → /en/* หรือ /th/*
        → RSC (React Server Component)
        → ISR Cache (revalidate = 3600 วินาที)
        → HTML Stream → Client Hydration
```

### สมการ FDIA

```
F = D^I × A
```

- **F** = ผลลัพธ์ที่ต้องการ (Future)
- **D** = คุณภาพข้อมูล 0.0–1.0 (Data)
- **I** = ความแม่นยำของ intent — exponent (Intent)
- **A** = Human-in-the-loop gate 0.0–1.0 (Architect)

เมื่อ `A = 0` ระบบหยุดทุกผลลัพธ์ทันที — Constitutional AI guarantee

### ติดต่อ

| ช่องทาง | ลิงก์ |
|---------|-------|
| เว็บไซต์ | [delentia.com](https://delentia.com) |
| อีเมล | founder@delentia.com |
| GitHub (Org) | [github.com/delentia-labs](https://github.com/delentia-labs) |
| GitHub (Personal) | [github.com/ittirit720](https://github.com/ittirit720) |
| LinkedIn | [ittirit-saengow](https://www.linkedin.com/in/ittirit-saengow/) |
| X/Twitter | [@ittirit_rct](https://x.com/ittirit_rct) |
| Discord | [discord.gg/rctlabs](https://discord.gg/rctlabs) |

---

*© 2026 Delentia Labs / Ittirit Saengow — Built with Next.js 16.2.4, Tailwind CSS v4, Framer Motion 12*
