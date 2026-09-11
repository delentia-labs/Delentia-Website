# Fixes & Improvements Log
> Generated: 2026-03-28 | Phase 1 + Phase 2 (Critical + Performance)
> Updated: 2026-09-11 | Integrity audit follow-up (see below)

---

## ✅ 2026-09-11 — Integrity audit follow-up

External audit of the live MCP gateway + Delentia-OS + Delentia-Private-OS found that the Phase 1 "stats data consistency fix" below (2026-03-28) resolved an internal *inconsistency* by adopting the larger, enterprise-only numbers — which itself created a new problem: `SITE_TEST_COUNT` and `SITE_MICROSERVICE_COUNT` were quoting private-repo counts as if they belonged to the public SDK, which `Delentia-OS/docs/release/PUBLIC_RELEASE_PROVENANCE.md` explicitly prohibits ("Never quote private test counts, service counts, or operational claims as if they belong to the public repository").

- **Fixed:** `lib/site-config.ts` — `SITE_UPTIME` and `SITE_HALLUCINATION_RATE` now state their own caveat inline ("target", "self-reported, not yet independently monitored" / "pending published benchmark methodology") instead of presenting unmonitored numbers as measured facts.
- **Fixed:** `Delentia-OS/microservices/gateway-api/gateway_main.py` — `/delentia/system/stats` no longer hardcodes `testCount: 4849` / `microserviceCount: 62` (those are the private enterprise repo's numbers); now reports the public repo's own verified `TESTING_CANONICAL.md` checkpoint (1,791) and its own 5 reference microservices, plus a live-introspected algorithm count instead of a hardcoded 41.
- **Fixed:** the same file was missing the `/rctlabs/system/stats` route that `app/api/stats/route.ts` actually fetches — every live-stats request was 404ing and silently falling back to static constants. Added an alias route.
- **Found, not yet fixed (needs an editorial decision, not a code fix):** `content/blog/hexacore-7-model-ai-infrastructure.mdx` describes a 7-model roster in detail (table, per-model pricing, "0.3% hallucination" claim in prose) but `site-config.ts` has said 9 models for a while — the article needs a real rewrite or an explicit "superseded" note, not a find-and-replace.
- **Found, not yet fixed:** `app/about/opengraph-image.tsx` hardcodes `"0.3%"` and `"7"` inline, bypassing `site-config.ts` entirely — these constants no longer match the source of truth.
- **Found, not yet fixed:** `delentia-mcp-ecosystem/BENCHMARK_REPORT.md` labels itself "100% VERIFIED" but contains unpopulated template placeholders (literal `"undefined"` strings) in its headline numbers.

---

## ✅ Phase 1 — Critical Bug Fixes

### 1. `package.json` — Removed invalid Node.js built-in dependencies
- **Removed:** `"fs": "0.0.1-security"`, `"net": "1.0.2"`, `"path": "0.12.7"`
- **Why:** These are Node.js built-in modules. Listing them as npm dependencies does nothing useful and can cause bundler confusion or inflate build size.
- **Fixed:** `"@emotion/is-prop-valid"` version locked from `"latest"` → `"^1.3.1"` to prevent unexpected breaking changes on future installs.
- **Fixed:** `"name"` changed from `"my-v0-project"` (scaffold default) → `"rctlabs-web"` for correct project identity.
- **Fixed:** `"version"` updated to `"2026.03.0"` to match SITE_VERSION.

### 2. `app/layout.tsx` — Locale detection deduplicated
- **Bug:** `headers()` was called twice (once in `generateMetadata`, once in `RootLayout`) — both reading `x-locale` independently. A mismatch could cause the HTML `lang` attribute and metadata locale to diverge.
- **Fix:** Extracted a shared `getLocale()` async helper that both functions call, ensuring a single consistent resolution path.
- **Fixed:** `generator: "v0.app"` removed from metadata — this exposed internal scaffolding tooling publicly and has no SEO value.
- **Improved:** `title` now uses template format `{ default, template: "%s | Delentia Labs" }` for per-page title suffixes.
- **Improved:** `authors` now includes URL pointing to the author page for E-E-A-T signal.
- **Improved:** Added `twitter.site` field alongside `twitter.creator`.
- **Added:** `preconnect` for Vercel Analytics domain (`va.vercel-scripts.com`).

### 3. `lib/site-config.ts` — Stats data consistency fix
- **Bug:** `SITE_TEST_COUNT = 389` and `SITE_MICROSERVICE_COUNT = 33` contradicted `press/page.tsx` which states 4,849 tests and 62 microservices. This inconsistency directly damages E-E-A-T (Google's trust signal).
- **Fix:** Updated to canonical values:
  - `SITE_TEST_COUNT = 4849`
  - `SITE_MICROSERVICE_COUNT = 62`
  - Added `SITE_ALGORITHM_COUNT = 41`
  - Added `SITE_HEXACORE_COUNT = 7`
  - Added `SITE_COMPRESSION_RATE = "74%"`
  - Added `SITE_COST_REDUCTION = "3.74x"`
- **Added:** Inline comment warning developers to keep these in sync with `press/page.tsx` and `benchmark-summary/page.tsx`.

---

## ✅ Phase 2 — Performance & Security

### 4. `next.config.mjs` — Security, redirects, caching
- **Added:** `Content-Security-Policy` header (was completely missing). Configured to allow:
  - `unsafe-inline` for styles (required by Tailwind CSS)
  - Vercel Analytics scripts
  - Google Fonts
  - CloudFront image CDN
  - `frame-ancestors 'none'` (reinforces X-Frame-Options: DENY)
- **Added:** `redirects()` function with:
  - `/home` → `/` (permanent)
  - `/social` → `/community` (permanent)
  - `/protocols/fdia` → `/protocols/fdia-equation` (permanent)
- **Added:** Cache-Control headers:
  - `/_next/static/*` → `immutable, max-age=31536000` (1 year, Next.js hashes files)
  - `/images/*` → `max-age=86400, stale-while-revalidate=604800`
- **Expanded:** `optimizePackageImports` to include major Radix UI components.
- **Added:** `deviceSizes` and `imageSizes` for Next.js image optimization tuning.
- **Removed:** `poweredByHeader: false` already existed — kept as-is.

### 5. `components/ui/optimized-image.tsx` — Bug fix + accessibility
- **Fixed:** Third `useEffect` (SSR hydration check) had an empty dependency array `[]` with `eslint-disable` suppression. Changed to use `[isInView, isLoaded]` as proper dependencies — this is safer and removes the lint suppression.
- **Fixed:** Duplicate `<source>` case for `jpg`/`jpeg` — merged into a single conditional `(extension === "jpg" || extension === "jpeg")`.
- **Improved:** Error state `<div>` now has `role="img"` and `aria-label` for screen reader accessibility.
- **Improved:** Skeleton placeholder now uses `animate-pulse` Tailwind class for visible loading feedback.
- **Added:** Comprehensive inline documentation explaining the singleton observer pattern.

---

## 📋 Remaining — Phase 3 & 4 (SEO Content + Pre-Launch)

These items require content decisions and are tracked separately:

- [ ] Add `answer-first` paragraph to solutions, platform, products, research pages
- [ ] Add FAQ sections (with FAQSchema JSON-LD) to solutions, platform, whitepaper, protocols
- [ ] Add dense internal link clusters: protocol ↔ use-case ↔ solution ↔ research
- [ ] Add author blocks to all protocol and research pages
- [ ] Fix title tag lengths (target 50–60 chars) across all pages
- [ ] Add entity pages: FDIA deep-dive, JITNA deep-dive, RCT Kernel, Memory Architecture
- [ ] Add engineering validation / evidence sections with benchmarks
- [ ] Submit sitemap to Google Search Console after DNS cutover
- [ ] Run Lighthouse CI and enforce 90+ threshold in `.github/workflows`
- [ ] Verify OG image via social card validator before public launch
- [ ] Confirm all ENV vars set in Vercel: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NEXT_PUBLIC_API_URL`