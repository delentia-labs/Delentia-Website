import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import DynamicAIRoutingPage from "./DynamicRoutingClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Dynamic AI Routing — Intelligent Multi-LLM Orchestration Across 9 Tiers",
    "Dynamic AI Routing — Multi-LLM Orchestration อัจฉริยะผ่าน 9 Tiers",
    "Intelligent multi-LLM routing across 9 tiers of 41 algorithms. Sub-50ms latency, 60% cost reduction, and self-evolving orchestration for enterprise AI workloads.",
    "Routing Multi-LLM อัจฉริยะผ่าน 9 Tiers ของ 41 Algorithms Latency ต่ำกว่า 50ms ลดต้นทุน 60% และ Self-Evolving Orchestration สำหรับ Enterprise AI",
    "/solutions/dynamic-ai-routing",
    ["dynamic AI routing", "multi-LLM orchestration", "AI cost optimization", "9-tier algorithms", "self-evolving AI"]
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
      question: "What is dynamic AI routing?",
      answer: "Dynamic AI routing is the real-time selection of the optimal language model, algorithm tier, and voting method for each unique task — rather than sending all queries to a single model.",
    },
    {
      question: "How does JITNA achieve sub-50ms routing decisions?",
      answer: "JITNA evaluates 6 primitives (Intent, Data, Delta, Approach, Reflection, Memory) simultaneously using pre-computed proficiency scores and cached routing weights in RCTDB 7D.",
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

