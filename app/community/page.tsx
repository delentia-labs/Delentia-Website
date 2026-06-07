import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import CommunityClient from "./CommunityClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Delentia OS Community — Developers, Researchers & Enterprise AI Builders",
    "ชุมชน Delentia OS — นักพัฒนา นักวิจัย และผู้สร้าง AI ระดับองค์กร",
    "Join the Delentia Labs community across GitHub, Discord, and discussion forums. Connect with researchers, developers, and enterprise AI teams working on constitutional AI, FDIA, JITNA, and verified intelligence.",
    "เข้าร่วมชุมชน Delentia Labs ผ่าน GitHub, Discord และฟอรัม สนทนากับนักวิจัย นักพัฒนา และทีม AI ระดับองค์กรที่ทำงานด้าน Constitutional AI, FDIA, JITNA และ verified intelligence",
    "/community",
    ["Delentia OS community", "AI developer community", "constitutional AI community", "JITNA developers", "FDIA research"]
  )
}

export default async function CommunityPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Community", url: `https://delentia.com${localePrefix}/community` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Who is the Delentia OS community designed for?",
      answer:
        "The Delentia OS community is designed for enterprise AI builders, researchers, developers, and technical teams exploring constitutional AI, verification, routing, and memory systems.",
    },
    {
      question: "What topics are discussed in the Delentia OS community?",
      answer:
        "Community discussions cover FDIA, JITNA, SignedAI, DelentiaDB, enterprise deployment patterns, benchmarking, and practical AI governance workflows.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CommunityClient />
    </>
  )
}

