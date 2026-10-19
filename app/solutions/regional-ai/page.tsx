import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import RegionalAIClient from "./RegionalAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "National AI — use your own country's model under your own rules",
    "AI ระดับชาติ — ใช้โมเดลของประเทศคุณภายใต้กฎของคุณเอง",
    "Delentia treats the model as a setting: a local model, any model on OpenRouter, or any OpenAI-compatible national or self-hosted AI. The safety gate sits outside the model, and a per-organisation data-residency policy is checked before every model call. It does not know any country's law and is not legal advice.",
    "Delentia ถือว่าโมเดลเป็นการตั้งค่า: โมเดลในเครื่อง โมเดลใดก็ได้บน OpenRouter หรือ AI ระดับชาติ/โฮสต์เองที่เข้ากันได้กับ OpenAI ด่านความปลอดภัยอยู่นอกโมเดล และนโยบายที่เก็บข้อมูลต่อองค์กรถูกตรวจก่อนทุกการเรียกโมเดล ระบบไม่รู้กฎหมายของประเทศใดและไม่ใช่คำแนะนำทางกฎหมาย",
    "/solutions/regional-ai",
    ["national AI", "bring your own model", "data residency policy", "OpenAI-compatible endpoint", "model neutral"]
  )
}

export default async function Page() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "โซลูชั่น" : "Solutions", url: `https://delentia.com${localePrefix}/solutions` },
    { name: locale === "th" ? "Regional AI" : "Regional AI", url: `https://delentia.com${localePrefix}/solutions/regional-ai` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Which models can Delentia use?",
      answer: "A model on your own machine (Ollama), any model on OpenRouter, or any OpenAI-compatible endpoint, which is how a national or self-hosted AI plugs in. No national model is bundled and none is a partner; the default language-to-model table is a starting guess that has not been compared for quality.",
    },
    {
      question: "How does Delentia help with data residency?",
      answer: "Each organisation writes a policy (home region, allowed regions, whether cross-border calls are allowed, what to do with personal data). It is checked before every model call, a blocked call is never sent, and each decision is logged without the personal data. Delentia does not know any country's law, does not certify compliance, and cannot see what a provider does with data afterwards.",
    },
    {
      question: "Does the safety gate change with the model?",
      answer: "No. The gate, the human signatures and the audit log are code outside the model, so they apply the same way whichever model is chosen. The model changes how capable the agent is, not how safe it is.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RegionalAIClient />
    </>
  )
}

