import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import AlgorithmsClient from "./AlgorithmsClient"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "41 Algorithms & Analysearch",
    "41 อัลกอริทึม & Analysearch",
    "Delentia Labs 41 proprietary algorithms across 9 capability tiers — from foundation intent processing to autonomous planning. Public pages distinguish open-SDK verification from larger enterprise runtime validation and controlled benchmark claims.",
    "อัลกอริทึมเฉพาะ 41 ตัวของ Delentia Labs ใน 9 Tiers: จาก foundation intent processing ถึง autonomous planning โดยหน้า public จะแยก open-SDK verification ออกจาก enterprise runtime validation และ benchmark claims ที่มี scope ชัดเจน",
    "/algorithms",
    ["41 algorithms", "Analysearch", "AI algorithms", "9-tier algorithm", "production AI algorithms", "AI orchestration algorithms"]
  )
}

export default async function AlgorithmsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "อัลกอริทึม" : "Algorithms", url: `https://delentia.com${localePrefix}/algorithms` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "How are the Delentia Labs algorithms organized?",
      answer:
        "The 41 proprietary algorithms are grouped into 9 capability tiers: Foundation (4), Analysis (5), Reasoning (5), Orchestration (4), Verification (5), Memory (4), Adaptation (5), Synthesis (5), and Autonomy (4). Each tier extends the one below it.",
    },
    {
      question: "What is Analysearch?",
      answer:
        "Analysearch is Delentia Labs' proprietary multi-depth analysis and synthesis engine. It operates in four modes — Quick (<200ms), Standard (2–5s), Deep (10–30s), and Mirror (15–45s) — each activating different algorithm tiers to match the required reasoning depth.",
    },
    {
      question: "What is the difference between Quick, Standard, Deep, and Mirror modes in Analysearch?",
      answer:
        "Quick mode returns a direct cached or pattern-matched answer in under 200ms using Tier 1–2 algorithms. Standard adds multi-source evidence grading at 2–5s. Deep runs cross-domain synthesis for comprehensive research-grade output at 10–30s. Mirror adds a JITNA-based Socratic challenge and consensus merge at 15–45s for maximum accuracy.",
    },
    {
      question: "What validates the 41-algorithm framework?",
      answer:
        `The algorithm framework is presented through multiple evidence lanes. ${SITE_PUBLIC_SDK_EVIDENCE_LABEL} covers the open SDK and public release path, while ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()} covers the larger runtime footprint. No hallucination rate is claimed; an earlier figure was withdrawn because it could not be reproduced.`,
    },
    {
      question: "How does the algorithm tier system relate to the RCT 10-layer architecture?",
      answer:
        "The 9 algorithm tiers map directly into the RCT 10-layer cognitive architecture. Tier 1–2 algorithms operate in the foundation and perception layers, Tier 3–5 in the reasoning and verification layers, Tier 6–7 in the memory and adaptation layers, and Tier 8–9 in the synthesis and autonomy layers.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Delentia Labs 41 Algorithms",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tier 1 Foundation", description: "4 algorithms — Intent parsing, normalization, token discipline, and baseline routing.", url: `https://delentia.com${localePrefix}/algorithms#tier-1` },
      { "@type": "ListItem", position: 2, name: "Tier 2 Analysis", description: "5 algorithms — Entity detection, context classification, semantic tagging, and pattern recognition.", url: `https://delentia.com${localePrefix}/algorithms#tier-2` },
      { "@type": "ListItem", position: 3, name: "Tier 3 Reasoning", description: "5 algorithms — Structured reasoning strategies that expand, compare, and validate solution paths.", url: `https://delentia.com${localePrefix}/algorithms#tier-3` },
      { "@type": "ListItem", position: 4, name: "Tier 4 Orchestration", description: "4 algorithms — Task-to-model coordination for speed, cost, and quality balancing.", url: `https://delentia.com${localePrefix}/algorithms#tier-4` },
      { "@type": "ListItem", position: 5, name: "Tier 5 Verification", description: "5 algorithms — Consensus, hallucination checks, evidence scoring, and quality gates.", url: `https://delentia.com${localePrefix}/algorithms#tier-5` },
      { "@type": "ListItem", position: 6, name: "Tier 6 Memory", description: "4 algorithms — Compression, semantic indexing, retrieval, and session continuity.", url: `https://delentia.com${localePrefix}/algorithms#tier-6` },
      { "@type": "ListItem", position: 7, name: "Tier 7 Adaptation", description: "5 algorithms — Personalization, execution tuning, and enterprise learning loops.", url: `https://delentia.com${localePrefix}/algorithms#tier-7` },
      { "@type": "ListItem", position: 8, name: "Tier 8 Synthesis", description: "5 algorithms — Cross-domain signal fusion for multi-disciplinary insights.", url: `https://delentia.com${localePrefix}/algorithms#tier-8` },
      { "@type": "ListItem", position: 9, name: "Tier 9 Autonomy", description: "4 algorithms — Longer-horizon planning, constraint handling, and governed autonomous execution.", url: `https://delentia.com${localePrefix}/algorithms#tier-9` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <AlgorithmsClient />
    </>
  )
}

