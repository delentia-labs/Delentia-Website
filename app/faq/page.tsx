import type { Metadata } from "next"
export const dynamic = "force-dynamic"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getFAQSchema, getBreadcrumbSchema } from "@/lib/schema"
import { FAQClient } from "./FAQClient"
import { SITE_UPTIME } from "@/lib/site-config"

const faqSchemaData = [
  {
    question: "What is the RCT Ecosystem?",
    answer: "Delentia (RCT) is an agent runtime built by one person in Bangkok, Thailand, who does not write code and directs AI coding assistants — 41 algorithms, an open-source agent runtime, and 7,109 automated tests passing at 0 failures in the public repository's CI. It combines the FDIA equation (F=D^I×A), JITNA Protocol (RFC-001), 10-layer architecture, and 7 genome subsystems.",
  },
  {
    question: "How does the JITNA Protocol work?",
    answer: "JITNA (Just-In-Time Nodal Assembly) operates in 5 phases: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery, each with quality gates. It is published as RFC-001 v2.0 under Apache 2.0 license and is designed as the open communication standard for multi-LLM AI agents.",
  },
  {
    question: "What infrastructure does RCT require?",
    answer: "RCT runs on a service-based architecture with PostgreSQL, Redis, and optional Ollama for local LLM inference, validated by 7,109 passing tests in the public repository's CI. It scales from Docker Compose (33 containers) to Kubernetes (57 resources with HPA, PDB, NetworkPolicy, ArgoCD).",
  },
  {
    question: "What was HexaCore?",
    answer: `HexaCore was the name of a planned roster of seven models. No such roster runs. The model is a setting you choose: a local model, any model on OpenRouter, or any OpenAI-compatible endpoint. No cost or hallucination figure is claimed.`,
  },
  {
    question: `What does SignedAI do?`,
    answer: `SignedAI is a jury runner: you name the member models, each votes agree, disagree or abstain independently, abstentions never help a proposal pass, and the verdict is signed with Ed25519 so anyone can re-check it. It has been tested with scripted voters only and has not been shown to reduce hallucination.`,
  },
  {
    question: "How much does the Delta Engine save?",
    answer: "The Delta Engine is RCT's memory compression system that stores only incremental state changes (deltas) rather than full state snapshots. In the repository's measurements its stored state is 39–90% smaller than full snapshots, measured in bytes (more history, bigger gain), enabling warm recall in under 50ms vs a full cold-start LLM call of 3–5 seconds. Sub-1ms delta reconstruction means the performance overhead is negligible. This is how RCT maintains deep context across long sessions without proportional memory cost.",
  },
  {
    question: "How does the Circuit Breaker Pattern work in AI pipelines?",
    answer: `The Circuit Breaker Pattern in AI systems has three states: CLOSED (normal operation — requests flow through), OPEN (failure threshold exceeded — requests are blocked and fallback providers are used), and HALF-OPEN (test mode — limited traffic allowed to check recovery). In the RCT Platform, the FDIA score acts as the trip signal: when F drops below 0.7, the breaker opens. RFC-006 Fault Isolation implements this across the platform's services, enabling 7 fallback LLM providers with automatic switching. This is why the RCT Platform is designed for a ${SITE_UPTIME} even when individual model providers experience outages.`,
  },
  {
    question: "What is Intent Farming and how does it reduce AI costs over time?",
    answer: "Intent Farming is the systematic practice of accumulating and enriching AI context over time, converting one-shot queries into progressively smarter sessions. Instead of starting cold each session, the RCTDB memory layer preserves intent history across 8 dimensions. The Delta Engine compresses this context by 74%, enabling warm recall in under 50ms. Over time, the percentage of queries served from warm cache increases — reducing LLM calls, cutting costs, and improving response quality through compounding context. The RCT Platform's warm recall rate improves by approximately 3–5% per week of operation.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Frequently Asked Questions — Delentia Labs Enterprise AI FAQ",
    "คำถามที่พบบ่อย — FAQ สำหรับระบบ AI ระดับองค์กรของ Delentia Labs",
    "Answers about FDIA, JITNA, deployment, pricing, integrations, and the architecture behind the Delentia Labs constitutional AI platform.",
    "คำตอบเกี่ยวกับ FDIA, JITNA, การ deploy, ราคา, integration และสถาปัตยกรรมเบื้องหลังแพลตฟอร์ม Constitutional AI ของ Delentia Labs",
    "/faq",
    ["enterprise AI FAQ", "FDIA questions", "JITNA FAQ", "constitutional AI FAQ"]
  )
}

export default async function FAQPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: locale === "th" ? "คำถามที่พบบ่อย" : "FAQ", url: `https://delentia.com${localePrefix}/faq` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqSchemaData)) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FAQClient locale={locale} />
    </>
  )
}

