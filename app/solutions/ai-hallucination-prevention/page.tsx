import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import HallucinationPreventionPage from "./HallucinationPreventionClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Wrong answers from AI — what Delentia does and does not do",
    "คำตอบที่ผิดของ AI — Delentia ทำอะไรได้และทำอะไรไม่ได้",
    "Delentia does not claim to prevent hallucination. It gates what an agent can do, checks answers against the evidence gathered, and offers a jury of independent models. What was measured, and what was not, is listed.",
    "Delentia ไม่อ้างว่าป้องกัน hallucination ได้ ระบบคุมสิ่งที่ agent ทำได้ ตรวจคำตอบเทียบกับหลักฐานที่เก็บมา และมีคณะลูกขุนของโมเดลอิสระ แจกแจงสิ่งที่วัดแล้วและยังไม่ได้วัด",
    "/solutions/ai-hallucination-prevention",
    ["AI wrong answers", "answer checking", "SignedAI jury", "signed audit log"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://delentia.com${localePrefix}/solutions` },
    { name: locale === "th" ? "ป้องกัน AI Hallucination" : "AI Hallucination Prevention", url: `https://delentia.com${localePrefix}/solutions/ai-hallucination-prevention` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What is AI hallucination and why does it happen?",
      answer: "AI hallucination occurs when a language model generates plausible-sounding but factually incorrect content. It happens due to statistical pattern matching without ground-truth verification.",
    },
    {
      question: "Does Delentia reduce hallucination?",
      answer: "Not shown. Delentia gates what an agent can do and checks answers against the evidence gathered, but no measurement shows fewer wrong answers than the same model used alone, so no rate is claimed.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HallucinationPreventionPage />
    </>
  )
}

