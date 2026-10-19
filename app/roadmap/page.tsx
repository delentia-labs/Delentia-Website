import type { Metadata } from "next"
import RoadmapClient from "./RoadmapClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Roadmap — Delentia Labs 2026 Phases, DelentiaAI & SignedAI Launch Timeline",
    "Roadmap — แผนงาน 9 Phase ของ Delentia Labs ปี 2026 รวม DelentiaAI และ SignedAI",
    "Track Delentia Labs' 9-phase public roadmap: foundations, infrastructure, content hardening, production launch, Full RCT OS, open source, DelentiaAI + SignedAI platform, and TUI/CLI developer mode. Target: end of 2026.",
    "ติดตาม roadmap สาธารณะ 9 Phase ของ Delentia Labs: ตั้งแต่ Foundations โครงสร้างพื้นฐานของโมเดล และรันไทม์โอเพนซอร์ส ไปจนถึงการรันกับโมเดลที่เก่งพอบน host จริงและ pilot กับ design partner เป้าหมายเป็นแผน ไม่ใช่คำสัญญา",
    "/roadmap",
    [
      "Delentia Labs roadmap", "DelentiaAI roadmap", "SignedAI launch", "RCT OS timeline",
      "Delentia Labs 2026", "Early Access Delentia Labs", "GitHub Coffee", "TUI CLI developer mode",
      "AI platform roadmap", "enterprise AI milestones"
    ]
  )
}

const ROADMAP_BASE = "https://delentia.com"

const phasesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Delentia Labs Development Roadmap — 9 Phases 2026",
  "description": "Public roadmap for Delentia Labs covering 9 strategic phases from Foundations through TUI/CLI Developer Mode, targeting full platform completion by end of 2026.",
  "url": `${ROADMAP_BASE}/roadmap`,
  "numberOfItems": 9,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Phase 1 — Foundations, FDIA, and Core Documentation", "description": "Define FDIA Equation, design 10-layer architecture model, document the 7 Genome system, publish core JITNA references.", "url": `${ROADMAP_BASE}/roadmap#phase-1` },
    { "@type": "ListItem", "position": 2, "name": "Phase 2 — Model infrastructure", "description": "Key handling, model registry, routing and vote arithmetic.", "url": `${ROADMAP_BASE}/roadmap#phase-2` },
    { "@type": "ListItem", "position": 3, "name": "Phase 3 — Content, Schema & SEO Hardening", "description": "Publish 22 long-form research articles, enrich BlogPosting schema, launch verified author system, publish Glossary.", "url": `${ROADMAP_BASE}/roadmap#phase-3` },
    { "@type": "ListItem", "position": 4, "name": "Phase 4 — Website Content-Complete & Pre-Launch Hardening", "description": "Enterprise blog design, schema standardization, compare landing pages, domain cutover to delentia.com.", "url": `${ROADMAP_BASE}/roadmap#phase-4` },
    { "@type": "ListItem", "position": 5, "name": "Phase 5 — Production Launch & SEO Warmup", "description": "delentia.com DNS live April 2026, Google Search Console, Early Access program, Lifetime Plan launch, DelentiaAI soft launch.", "url": `${ROADMAP_BASE}/roadmap#phase-5` },
    { "@type": "ListItem", "position": 6, "name": "Phase 6 — Real host", "description": "The agent runtime runs with a capable model on a real host. Planned, not done.", "url": `${ROADMAP_BASE}/roadmap#phase-6` },
    { "@type": "ListItem", "position": 7, "name": "Phase 7 — Open Source & Community", "description": "GitHub Public launch for RCT Ecosystem, full documentation, GitHub Coffee sponsors plan, community feedback loop.", "url": `${ROADMAP_BASE}/roadmap#phase-7` },
    { "@type": "ListItem", "position": 8, "name": "Phase 8 — DelentiaAI + SignedAI Platform Launch", "description": "Full product launch for DelentiaAI Platform and SignedAI Platform, enterprise onboarding pipeline open.", "url": `${ROADMAP_BASE}/roadmap#phase-8` },
    { "@type": "ListItem", "position": 9, "name": "Phase 9 — TUI/CLI Developer Mode", "description": "TUI/CLI Beta Backend Mode, full developer access, power-user workflow toolset, solo developer toolchain complete.", "url": `${ROADMAP_BASE}/roadmap#phase-9` },
  ],
}

export default async function RoadmapPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Roadmap", url: `https://delentia.com${localePrefix}/roadmap` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(phasesItemList) }} />
      <RoadmapClient />
    </>
  )
}
