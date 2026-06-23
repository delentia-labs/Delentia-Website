import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import CompareClient from "./CompareClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "AI Methodology Comparisons",
    "เปรียบเทียบแนวทางสถาปัตยกรรม AI",
    "Side-by-side comparisons of Constitutional AI, RAG, verification-first methods, and more. Evidence-based analysis from Delentia Labs engineers.",
    "เปรียบเทียบ Constitutional AI, RAG, verification-first และแนวทางสถาปัตยกรรม AI อื่น ๆ แบบเทียบกันชัดเจน พร้อมการวิเคราะห์เชิงหลักฐานจากทีม Delentia Labs",
    "/compare",
    [
      "constitutional AI vs RAG",
      "RCT vs LLM APIs",
      "verification vs prompt engineering",
      "RCTDB vs vector database",
      "AI methodology comparison",
    ]
  )
}

export default async function ComparePage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"

  const compareSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Methodology Comparisons — Delentia Labs",
    "url": `${SITE_URL}${localePrefix}/compare`,
    "description": "Side-by-side comparisons of Constitutional AI, RAG, verification-first methods, and more. Evidence-based analysis from Delentia Labs.",
    "hasPart": [
      { "@type": "WebPage", "name": "Constitutional AI vs RAG", "url": `${SITE_URL}${localePrefix}/compare/constitutional-ai-vs-rag` },
      { "@type": "WebPage", "name": "Delentia Labs vs LLM APIs", "url": `${SITE_URL}${localePrefix}/compare/delentia-labs-vs-llm-apis` },
      { "@type": "WebPage", "name": "Verification vs Prompt Engineering", "url": `${SITE_URL}${localePrefix}/compare/verification-vs-prompt-engineering` },
      { "@type": "WebPage", "name": "RCTDB vs Vector Databases", "url": `${SITE_URL}${localePrefix}/compare/rctdb-vs-vector-databases` }
    ]
  }

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix}` },
    { name: "Compare", url: `${SITE_URL}${localePrefix}/compare` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CompareClient />
    </>
  )
}

