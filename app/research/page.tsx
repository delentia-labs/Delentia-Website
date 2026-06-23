import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ResearchClient from "./ResearchClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Research & Releases — Delentia Labs Architecture, Algorithms, and Protocol Papers",
    "งานวิจัยและรีลีส — เอกสารสถาปัตยกรรม อัลกอริทึม และโปรโตคอลของ Delentia Labs",
    "Explore Delentia Labs research, version history, architecture papers, algorithm releases, SignedAI verification, RCTDB memory design, and JITNA protocol specifications for enterprise constitutional AI.",
    "สำรวจงานวิจัยและประวัติรีลีสของ Delentia Labs ครอบคลุมสถาปัตยกรรม อัลกอริทึม SignedAI การออกแบบ RCTDB และข้อกำหนดโปรโตคอล JITNA สำหรับ constitutional AI ระดับองค์กร",
    "/research",
    ["RCT research", "constitutional AI research", "JITNA RFC", "RCTDB paper", "SignedAI verification research"]
  )
}

export default async function ResearchPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Research", url: `https://delentia.com${localePrefix}/research` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What kind of material is published in RCT research?",
      answer:
        "RCT research publishes architecture papers, algorithm releases, protocol specifications, verification methods, and system design notes for enterprise constitutional AI.",
    },
    {
      question: "Is the research page useful for technical evaluation?",
      answer:
        "Yes. The research page is intended for engineering, architecture, and evaluation teams reviewing Delentia Labs methods, release history, and technical foundations.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ResearchClient />
    </>
  )
}

