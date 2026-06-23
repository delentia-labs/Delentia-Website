import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import EnterpriseAIMemoryPage from "./EnterpriseMemoryClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Enterprise AI Memory — Persistent Context with 74% Compression",
    "Enterprise AI Memory — Persistent Context พร้อม Compression 74%",
    "Extend enterprise AI beyond the context window with persistent memory, hybrid storage, governed recall, and 74% delta compression.",
    "ขยาย AI องค์กรให้เกินข้อจำกัดของ context window ด้วย persistent memory, hybrid storage, governed recall และ delta compression 74%",
    "/solutions/enterprise-ai-memory",
    ["enterprise AI memory", "RCTDB", "vector database", "AI context window", "8-dimensional schema", "delta compression"]
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
      question: "How much compression does Enterprise AI Memory achieve compared to storing full conversation context?",
      answer: "Enterprise AI Memory achieves 74% lossless delta compression — storing only context changes rather than full snapshots, enabling persistent memory across sessions without exponential storage costs.",
    },
    {
      question: "How does RCTDB differ from vector databases for enterprise AI?",
      answer: "RCTDB uses an 8-dimensional schema with governed recall, audit trails, and constitutional constraints. Vector databases provide raw similarity search without governance, explainability, or right-to-erasure controls required for enterprise PDPA compliance.",
    },
    {
      question: "Does Enterprise AI Memory support PDPA and data sovereignty requirements?",
      answer: "Yes. Enterprise AI Memory includes built-in PDPA Section 33 explainability, right-to-erasure for stored context, role-based access controls, and complete audit trails for all memory read and write operations.",
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

