import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"
import { SITE_URL } from "@/lib/site-config"
import ArchitectureClient from "./ArchitectureClient"

const faqItems = [
  {
    question: "What is the Delentia Labs 10-Layer AI Architecture?",
    answer:
      "The Delentia Labs 10-Layer Architecture is a constitutional AI stack spanning from hardware abstraction at layer 1 to self-evolving orchestration at layer 10. Each layer serves a distinct role in ensuring verifiable, auditable, and governed AI execution across enterprise deployments.",
  },
  {
    question: "How does multi-LLM consensus work in the architecture?",
    answer:
      "Multi-LLM consensus operates at the orchestration layer, where multiple AI models independently evaluate a request and a consensus mechanism — governed by constitutional rules — determines the final response. This eliminates single-model bias and reduces hallucination rates.",
  },
  {
    question: "What is the role of constitutional AI in RCT's architecture?",
    answer:
      "Constitutional AI principles are embedded at every layer of the RCT stack. They define what the AI system can and cannot do, how conflicts are resolved, and how auditability is maintained. This ensures AI decisions remain aligned with organizational policies and ethical constraints.",
  },
  {
    question: "How many runtime components does the architecture include?",
    answer:
      "The production architecture includes a private enterprise service layer distributed across 10 layers, covering memory, routing, verification, orchestration, and self-evolution. Each component is independently deployable and composable.",
  },
  {
    question: "Can the architecture be deployed on-premise?",
    answer:
      "Yes. The Delentia Labs architecture supports on-premise, hybrid, and cloud deployment models. Enterprise clients can isolate specific layers for data sovereignty compliance, particularly in regulated markets such as Thailand under PDPA.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "10-Layer AI Architecture",
    "สถาปัตยกรรม AI 10 ชั้น",
    "Delentia Labs 10-layer constitutional AI architecture: from hardware abstraction to self-evolving orchestration. The production AI stack powering enterprise-grade multi-LLM systems.",
    "สถาปัตยกรรม AI 10 ชั้นจาก Delentia Labs: จาก Hardware Abstraction ถึง Self-Evolving Orchestration สแต็ก AI ระดับ Production สำหรับระบบ Multi-LLM ระดับองค์กร",
    "/architecture",
    ["AI architecture", "10-layer AI", "multi-LLM orchestration", "constitutional AI stack", "production AI infrastructure"]
  )
}

export default async function ArchitecturePage() {
  const locale = await getRequestLocale()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Architecture", url: `${SITE_URL}/${locale}/architecture` },
  ])
  const faqSchema = getFAQSchema(faqItems)

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ArchitectureClient />
    </>
  )
}

