import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import SolutionsClient from "./SolutionsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "AI Solutions",
    "โซลูชัน AI",
    `What Delentia does about wrong answers, long-term memory and model routing, with what was measured and what was not. Open source; no hosted service yet.`,
    `สิ่งที่ Delentia ทำเกี่ยวกับคำตอบที่ผิด หน่วยความจำระยะยาว และการเลือกโมเดล พร้อมสิ่งที่วัดแล้วและยังไม่ได้วัด โอเพนซอร์ส ยังไม่มีบริการโฮสต์`,
    "/solutions",
    ["AI hallucination prevention", "enterprise AI memory", "dynamic AI routing", "constitutional AI", "regulated industries AI"]
  )
}

export default async function SolutionsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Solutions", url: `https://delentia.com${localePrefix}/solutions` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What problems do the Delentia Labs solutions solve?",
      answer:
        "Delentia Labs solutions address enterprise AI hallucination, context loss, intent drift, and inefficient single-model routing by combining SignedAI verification, RCTDB memory, and multi-tier orchestration.",
    },
    {
      question: "Which solution should an enterprise evaluate first?",
      answer:
        "Teams with trust and compliance risk should start with AI Hallucination Prevention. Teams struggling with long context or repeated workflows should evaluate Enterprise AI Memory. Teams optimizing performance and cost should evaluate Dynamic AI Routing.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Delentia Labs Enterprise AI Solutions",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI Hallucination Prevention", url: `https://delentia.com${localePrefix}/solutions/ai-hallucination-prevention` },
      { "@type": "ListItem", position: 2, name: "Enterprise AI Memory", url: `https://delentia.com${localePrefix}/solutions/enterprise-ai-memory` },
      { "@type": "ListItem", position: 3, name: "Dynamic AI Routing", url: `https://delentia.com${localePrefix}/solutions/dynamic-ai-routing` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <SolutionsClient />
    </>
  )
}

