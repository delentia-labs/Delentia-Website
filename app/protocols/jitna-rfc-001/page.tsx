import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema, getFAQSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
import JitnaClient from "./JitnaClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "JITNA RFC-001 — Just-In-Time Network Architecture",
    "JITNA RFC-001 — สถาปัตยกรรมเครือข่ายแบบ Just-In-Time",
    "Full specification of JITNA RFC-001: the Just-In-Time Network Architecture protocol governing dynamic AI agent routing, intent preservation, and signed agent-to-agent messages in the Delentia agent runtime.",
    "ข้อกำหนดฉบับสมบูรณ์ของ JITNA RFC-001: โปรโตคอล Just-In-Time Network Architecture ที่กำกับ Dynamic AI Agent Routing การรักษา Intent และข้อความที่ลงนามระหว่าง agent ในรันไทม์ agent ของ Delentia",
    "/protocols/jitna-rfc-001",
    ["JITNA", "RFC-001", "just-in-time network architecture", "dynamic AI routing", "signed agent messages", "constitutional AI protocol"]
  )
}

export default async function JitnaRFC001Page() {
  const locale = await getRequestLocale()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Protocols", url: `${SITE_URL}/${locale}/protocols` },
    { name: "JITNA RFC-001", url: `${SITE_URL}/${locale}/protocols/jitna-rfc-001` },
  ])

  const definedTermSchema = getDefinedTermSchema(
    "JITNA",
    "Just-In-Time Network Architecture (JITNA) is a constitutional AI protocol specification (RFC-001) that governs dynamic agent routing, intent continuity across multi-LLM pipelines, and verifiable consensus in enterprise AI deployments.",
    `${SITE_URL}/${locale}/protocols/jitna-rfc-001`
  )

  const faqSchema = getFAQSchema([
    {
      question: "What is JITNA RFC-001?",
      answer:
        "JITNA RFC-001 is the Just-In-Time Network Architecture protocol specification published by Delentia Labs. It defines how AI agents are dynamically routed, how intent is preserved across multi-LLM pipelines, and how consensus is verified in enterprise constitutional AI deployments.",
    },
    {
      question: "How does JITNA differ from static LLM orchestration?",
      answer:
        "Static orchestration sends every request through the same model pipeline regardless of intent. JITNA dynamically routes requests to the optimal model or agent configuration based on real-time intent classification, reducing cost and improving output quality.",
    },
    {
      question: "What problem does JITNA solve for enterprise AI?",
      answer:
        "JITNA solves intent drift — the degradation of original user intent as a request passes through multiple processing stages. By encoding intent as a first-class protocol primitive, JITNA ensures that the final output remains faithful to the original request even in complex multi-agent pipelines.",
    },
    {
      question: "JITNA RFC-001 คืออะไร?",
      answer:
        "JITNA RFC-001 คือข้อกำหนดโปรโตคอล Just-In-Time Network Architecture ที่เผยแพร่โดย Delentia Labs กำหนดวิธีการ route AI agents แบบ dynamic การรักษา intent ผ่าน Multi-LLM pipeline และการตรวจสอบ consensus ในการ deploy AI แบบ constitutional ระดับองค์กร",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JitnaClient />
    </>
  )
}

