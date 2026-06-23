"use client"

import { usePathname } from "next/navigation"
import { Activity, BookOpen, Brain, Container, FileText, GitBranch, Key, Layers, ScrollText, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_MICROSERVICE_COUNT, SITE_TEST_COUNT, SITE_VERSION } from "@/lib/site-config"

export default function ResearchClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const papers = [
    {
      slug: "v250-infrastructure-layer",
      title: language === "th" ? "v2.5.0: Infrastructure Layer - Containerization, API Gateway และ Monitoring" : "v2.5.0: Infrastructure Layer - Containerization, API Gateway & Monitoring",
      description: language === "th" ? "รีลีสด้านโครงสร้างพื้นฐานสำหรับ production ครอบคลุม containerization, API Gateway, monitoring, load testing, OWASP hardening และ chaos scenarios." : "Production-grade containerized infrastructure with API Gateway, monitoring, load testing, OWASP hardening, and chaos engineering scenarios.",
      href: `${localePrefix}/architecture`,
      badge: "v2.5.0",
      meta: language === "th" ? "Infrastructure release | 4 March 2026" : "Infrastructure release | March 4, 2026",
      icon: Container,
      tags: ["Deployment", "Gateway", "Monitoring"],
    },
    {
      slug: "v240-analysearch-41-algorithms",
      title: language === "th" ? "v2.4.0: Analysearch Intent Engine และกรอบ 41 อัลกอริทึม" : "v2.4.0: Analysearch Intent Engine & 41-Algorithm Framework",
      description: language === "th" ? "รีลีสที่อธิบาย capability tiers เบื้องหลัง reasoning, orchestration, verification, memory และ autonomous planning ของ RCT." : "A release focused on the capability tiers behind RCT reasoning, orchestration, verification, memory, and autonomous planning.",
      href: `${localePrefix}/algorithms`,
      badge: "v2.4.0",
      meta: language === "th" ? "Algorithms release | 4 March 2026" : "Algorithms release | March 4, 2026",
      icon: GitBranch,
      tags: ["Algorithms", "Reasoning", "Planning"],
    },
    {
      slug: "v231-enterprise-hardening",
      title: language === "th" ? "v2.3.1: Enterprise Hardening - Security, Validation และ Resilience" : "v2.3.1: Enterprise Hardening - Security, Validation & Resilience",
      description: language === "th" ? "Layer 10 ด้าน hardening ครอบคลุม validation, injection protection, caching, circuit breakers, bulkhead isolation และ retry strategy สำหรับ production." : "Layer 10 hardening across validation, injection protection, caching, circuit breakers, bulkhead isolation, and retry strategies.",
      href: `${localePrefix}/thailand-enterprise-trust`,
      badge: "v2.3.1",
      meta: language === "th" ? "Security release | 2 March 2026" : "Security release | March 2, 2026",
      icon: Shield,
      tags: ["Validation", "Security", "Resilience"],
    },
    {
      slug: "v230-control-plane",
      title: language === "th" ? "v2.3.0: Control Plane - JITNA Wire Schema, Cryptographic Signing และ Replay" : "v2.3.0: Control Plane - JITNA Wire Schema, Cryptographic Signing & Replay",
      description: language === "th" ? "Layer 9 สำหรับ JITNA packet protocol, signed execution และ deterministic replay พร้อม integrity verification." : "Layer 9 covering the JITNA packet protocol, cryptographic signed execution, and deterministic replay with integrity verification.",
      href: `${localePrefix}/protocols/jitna-rfc-001`,
      badge: "v2.3.0",
      meta: language === "th" ? "Architecture release | 28 February 2026" : "Architecture release | February 28, 2026",
      icon: Key,
      tags: ["JITNA", "Replay", "Control plane"],
    },
    {
      slug: "signedai-consensus",
      title: language === "th" ? "SignedAI: Multi-LLM Attestation ที่มี hallucination 0.3%" : "SignedAI: Multi-LLM Attestation with 0.3% Hallucination Rate",
      description: language === "th" ? "งานแกนกลางด้าน verification สำหรับสภาพแวดล้อมกำกับดูแลสูง พร้อม auditability และการรับรองผลลัพธ์แบบหลายโมเดล." : "Consensus-based AI verification designed for regulated environments, with a measured 0.3% hallucination rate and full auditability.",
      href: `${localePrefix}/solutions/ai-hallucination-prevention`,
      badge: language === "th" ? "Core" : "Core",
      meta: language === "th" ? "Verification paper | 2026" : "Verification paper | 2026",
      icon: Brain,
      tags: ["Verification", "Auditability", "Safety"],
    },
    {
      slug: "RCTDB-8d-memory",
      title: language === "th" ? "RCTDB v2.0: Persistent Enterprise Memory Architecture" : "RCTDB v2.0: Persistent Enterprise Memory Architecture",
      description: language === "th" ? "งานออกแบบ memory architecture สำหรับ enterprise agents ที่รวม structured context, provenance, compression และ cross-session continuity." : "A persistent memory architecture for enterprise agents, combining structured context, provenance, compression, and cross-session continuity.",
      href: `${localePrefix}/solutions/enterprise-ai-memory`,
      badge: language === "th" ? "Core" : "Core",
      meta: language === "th" ? "Memory paper | 2026" : "Memory paper | 2026",
      icon: Activity,
      tags: ["Memory", "Provenance", "Compression"],
    },
    {
      slug: "jitna-rfc001",
      title: language === "th" ? "JITNA Protocol RFC-001 v2.0: The HTTP of Agentic AI" : "JITNA Protocol RFC-001 v2.0: The HTTP of Agentic AI",
      description: language === "th" ? "ข้อกำหนดการสื่อสาร AI-to-AI สำหรับ intent specification, negotiation lifecycle, wire schema และ universal adapters." : "Formal specification for AI-to-AI communication, intent specification, negotiation lifecycle, wire schema, and universal adapters.",
      href: `${localePrefix}/protocols/jitna-rfc-001`,
      badge: "RFC-001",
      meta: language === "th" ? "Protocol specification | 2026" : "Protocol specification | 2026",
      icon: FileText,
      tags: ["Protocol", "Adapters", "Wire schema"],
    },
  ]

  const routes = [
    {
      title: language === "th" ? "อ่านเพื่อประเมินเชิงซื้อ" : "Read for buyer evaluation",
      description: language === "th" ? "เริ่มจาก comparative analysis และ benchmark framing ก่อนคุยเรื่อง procurement หรือ governance." : "Start with comparative analysis and benchmark framing before procurement or governance reviews.",
      href: `${localePrefix}/evaluation`,
      icon: BookOpen,
      tags: ["Evaluation", "Benchmark", "Checklist"],
    },
    {
      title: language === "th" ? "อ่านเพื่อเข้าใจโปรโตคอลและระบบ" : "Read for protocols and systems",
      description: language === "th" ? "ไปต่อที่ protocol layer และ architecture references หากทีมกำลังวาง integration หรือ control plane." : "Continue into the protocol layer and architecture references if your team is planning integration or control-plane work.",
      href: `${localePrefix}/protocols`,
      icon: Layers,
      tags: ["Protocols", "Architecture", "Control plane"],
    },
    {
      title: language === "th" ? "อ่านเพื่อเชื่อม evidence กับ trust layer" : "Read for trust and evidence context",
      description: language === "th" ? "ใช้ benchmark summary และ methodology เพื่อเชื่อม paper กับ public-safe trust narrative." : "Use the benchmark summary and methodology pages to connect papers to the public-safe trust narrative.",
      href: `${localePrefix}/benchmark-summary`,
      icon: ScrollText,
      tags: ["Methodology", "Trust", "Evidence"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Track / Research Archive" : "Track / Research Archive"}
      title={language === "th" ? "คลังงานวิจัย รีลีส และหลักฐานทางเทคนิค" : "Research, release, and technical evidence archive"}
      description={language === "th" ? `${SITE_VERSION} baseline สำหรับทีมสถาปัตยกรรม ทีมประเมิน และทีม integration ที่ต้องการอ่าน release notes, protocol papers, benchmark context และ technical references ในเส้นทางเดียวกัน.` : `${SITE_VERSION} baseline for architecture, evaluation, and integration teams that need release notes, protocol papers, benchmark context, and technical references in one archive.`}
      taxonomy={["Release notes", "Protocol papers", "Benchmark context", "Architecture archive"]}
      accent="sage"
      actions={[
        { href: `${localePrefix}/whitepaper`, label: language === "th" ? "เปิด whitepaper dossier" : "Open whitepaper dossier", variant: "primary" },
        { href: `${localePrefix}/protocols`, label: language === "th" ? "อ่าน protocol library" : "Read protocol library", variant: "secondary" },
        { href: `${localePrefix}/benchmark-summary`, label: language === "th" ? "ดู benchmark summary" : "View benchmark summary", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Verified backend tests" : "Verified backend tests", value: String(SITE_TEST_COUNT), detail: language === "th" ? "public-safe test evidence" : "public-safe test evidence" },
        { label: language === "th" ? "Framework algorithms" : "Framework algorithms", value: "41", detail: language === "th" ? "core reasoning and orchestration" : "core reasoning and orchestration" },
        { label: language === "th" ? "Architecture layers" : "Architecture layers", value: "10", detail: language === "th" ? "from trust edge to control plane" : "from trust edge to control plane" },
        { label: language === "th" ? "Runtime components" : "Runtime components", value: `${SITE_MICROSERVICE_COUNT}+`, detail: language === "th" ? "services and support systems" : "services and support systems" },
      ]}
      footerTitle={language === "th" ? "ใช้ research archive นี้เป็นทางผ่าน ไม่ใช่ปลายทาง" : "Use this archive as a routing layer, not a dead end"}
      footerDescription={language === "th" ? "เมื่ออ่าน release หรือ paper แล้ว ให้ต่อไปยัง evaluation, methodology, benchmark summary และ integration pages เพื่อประกอบการตัดสินใจเชิงองค์กรให้ครบ." : "After reading a release or paper, continue into evaluation, methodology, benchmark summary, and integration pages to complete the enterprise decision path."}
      footerActions={[
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "primary" },
        { href: `${localePrefix}/integration`, label: language === "th" ? "ไปหน้า integration" : "Go to integration", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Archive" : "Archive"}
        title={language === "th" ? "รีลีสและเอกสารหลักที่ควรอ่านก่อน" : "Primary releases and papers to read first"}
        description={language === "th" ? "หน้านี้ไม่ใช่ feed แบบบทความ แต่เป็น archive ที่จัดลำดับสำหรับคนที่ต้องการเข้าใจ platform evolution, protocol layer และหลักฐานเชิงเทคนิค." : "This is not a publication feed. It is an archive ordered for teams that need to understand platform evolution, protocol layers, and technical evidence."}
      >
        <ResourceCardGrid cards={papers} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Reading routes" : "Reading routes"}
        title={language === "th" ? "อ่านแล้วควรไปไหนต่อ" : "Where to continue after each paper"}
        description={language === "th" ? "จัดเส้นทางอ่านต่อเพื่อไม่ให้ research archive ซ้ำซ้อนกับ blog หรือ evaluation hub." : "Structured follow-on routes keep the research archive distinct from the blog and the evaluation hub."}
      >
        <ResourceCardGrid cards={routes} columns="three" />
      </ResourceSection>
    </ResourcePageShell>
  )
}
