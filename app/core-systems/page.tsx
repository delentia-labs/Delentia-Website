import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import CoreSystemsClient from "./CoreSystemsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Core Systems — model choice, Intent Loop, Analysearch, Delta Memory",
    "Core Systems — การเลือกโมเดล, Intent Loop, Analysearch, Delta Memory",
    "An overview of the four core systems behind RCT: model choice and failover, intent continuity, multi-depth analysis, and the delta state store.",
    "ภาพรวมของ 4 ระบบหลักเบื้องหลัง RCT: การเลือกโมเดลและการสลับสำรอง, intent continuity, multi-depth analysis และที่เก็บสถานะแบบ delta",
    "/core-systems",
    ["model choice", "Intent Loop", "Analysearch", "Delta Memory", "agent runtime"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Core Systems", url: `${SITE_URL}/${locale}/core-systems` },
  ])

  const definedTermSchema = getDefinedTermSchema(
    "RCT Kernel",
    "The RCT Kernel is the constitutional AI operating core of Delentia Labs, comprising four primary systems: model choice and failover, Intent Loop (intent continuity), Analysearch (multi-depth analysis), and Delta Memory (a delta state store).",
    `${SITE_URL}/${locale}/core-systems`
  )

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CoreSystemsClient />
    </>
  )
}

