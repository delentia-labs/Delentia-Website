import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import DynamicAIRoutingPage from "./DynamicRoutingClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "How Delentia chooses and switches models",
    "Delentia เลือกและสลับโมเดลอย่างไร",
    "The model is a setting; a fast or slow path is chosen per task; backup models take over when a provider fails, without ever exposing more data or spending more than the owner allows. No cost saving or latency figure is claimed.",
    "โมเดลเป็นการตั้งค่า ระบบเลือกเส้นทางเร็วหรือช้าตามงาน โมเดลสำรองรับช่วงเมื่อผู้ให้บริการล้มเหลว โดยไม่เปิดเผยข้อมูลเพิ่มและไม่ใช้เงินเกินที่เจ้าของอนุญาต ไม่อ้างตัวเลขการประหยัดหรือความหน่วง",
    "/solutions/dynamic-ai-routing",
    ["model choice", "fallback models", "provider failover", "bring your own model"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://delentia.com${localePrefix}/solutions` },
    { name: locale === "th" ? "Dynamic AI Routing" : "Dynamic AI Routing", url: `https://delentia.com${localePrefix}/solutions/dynamic-ai-routing` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "How does Delentia choose a model?",
      answer: "You set the model (a local model, OpenRouter, or an OpenAI-compatible endpoint). Per task, the runtime picks a fast path (a short answer, a few steps) or a slow path (step by step). If the provider fails, a backup you named takes over, but only a backup that exposes data no more than the main model and costs no more than your budget allows.",
    },
    {
      question: "Does routing save money or time?",
      answer: "Not shown. No cost-saving or latency figure has been measured for routing, so none is claimed.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DynamicAIRoutingPage />
    </>
  )
}

