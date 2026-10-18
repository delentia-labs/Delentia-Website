import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import EnterpriseAIMemoryPage from "./EnterpriseMemoryClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Agent memory you can audit, replay and erase",
    "หน่วยความจำของ agent: ตรวจสอบได้ ย้อนดูได้ และลบได้",
    "Delentia memory is an append-only, hash-chained event log with revocation, time travel and per-person erasure that can be verified in the raw database file. Measured against LangGraph and mem0 on one workload; no accuracy, compression or compliance claim.",
    "หน่วยความจำของ Delentia เป็นบันทึกเหตุการณ์ต่อท้ายที่เชื่อม hash มีการเพิกถอน การย้อนดู และการลบรายบุคคลที่ตรวจในไฟล์ฐานข้อมูลดิบได้ วัดเทียบกับ LangGraph และ mem0 บนภาระงานเดียว ไม่อ้างความแม่นยำ การบีบอัด หรือการปฏิบัติตามกฎหมาย",
    "/solutions/enterprise-ai-memory",
    ["agent memory", "event log", "memory erasure", "time travel", "audit"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://delentia.com${localePrefix}/solutions` },
    { name: locale === "th" ? "Enterprise AI Memory" : "Enterprise AI Memory", url: `https://delentia.com${localePrefix}/solutions/enterprise-ai-memory` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Does Delentia memory compress better than other systems?",
      answer: "Not shown. Measured in bytes, storing changes saves 39% to 90% against full snapshots, and ordinary compression of snapshots does about as well, so no compression advantage is claimed. On one 2,000-operation workload the log plus sealed store was 1.5 MB against 192 MB for LangGraph and 7.1 MB for mem0.",
    },
    {
      question: "What is different about Delentia memory?",
      answer: "Every change is an event in a hash-chained log whose head is written into the audit chain; a memory can be revoked with a reason and the store viewed as it was earlier; and one person can be erased by destroying the key their text is sealed under. It is not more accurate at recall than mem0: on the same 30 questions mem0 found 24, Delentia with embeddings 22.",
    },
    {
      question: "Does Delentia make me compliant with the PDPA?",
      answer: "No. Software cannot make an organisation compliant. Delentia gives you tools to erase one person's memory text and to show what happened, but erasure does not yet cover the separate skills database or audit rows written before sealing was added.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EnterpriseAIMemoryPage />
    </>
  )
}

