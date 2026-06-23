"use client"

import { usePathname } from "next/navigation"
import { BookOpen, Brain, Database, FileSearch, Scale, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function CompareClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const comparisons = [
    {
      slug: "constitutional-ai-vs-rag",
      title: language === "th" ? "Constitutional AI เทียบกับ RAG" : "Constitutional AI vs RAG",
      description: language === "th" ? "เปรียบเทียบ governance-first reasoning กับ retrieval-first generation และดูว่าความต่างสำคัญตรงไหนในงานองค์กร." : "Compare governance-first reasoning with retrieval-first generation and see where the enterprise difference actually appears.",
      tags: language === "th" ? ["Governance", "Reasoning", "Enterprise"] : ["Governance", "Reasoning", "Enterprise"],
      icon: ShieldCheck,
    },
    {
      slug: "rct-labs-vs-llm-apis",
      title: language === "th" ? "RCT Platform เทียบกับ Generic LLM APIs" : "RCT Platform vs Generic LLM APIs",
      description: language === "th" ? "ดูช่องว่างระหว่างการเรียก LLM ตรง ๆ กับการใช้งานระบบที่มี verification, routing และ auditability." : "See the gap between direct LLM API usage and a system with verification, routing, and auditability built in.",
      tags: language === "th" ? ["Platform", "Auditability", "Cost"] : ["Platform", "Auditability", "Cost"],
      icon: Brain,
    },
    {
      slug: "verification-vs-prompt-engineering",
      title: language === "th" ? "Verification-first เทียบกับ Prompt Engineering" : "Verification-First vs Prompt Engineering",
      description: language === "th" ? "อธิบายว่าทำไมชั้นตรวจสอบเชิงโครงสร้างให้ผลที่เสถียรกว่า prompt chain ที่ดีขึ้นเรื่อย ๆ." : "Explain why structural verification layers usually outperform increasingly elaborate prompt chains.",
      tags: language === "th" ? ["Verification", "Reliability", "Truth score"] : ["Verification", "Reliability", "Truth score"],
      icon: FileSearch,
    },
    {
      slug: "RCTDB-vs-vector-databases",
      title: language === "th" ? "RCTDB เทียบกับ Vector Databases" : "RCTDB vs Vector Databases",
      description: language === "th" ? "เทียบ memory model แบบมีโครงสร้างกับ similarity search แบบ embedding สำหรับงาน knowledge management ระดับองค์กร." : "Compare structured memory against embedding-based similarity search for enterprise knowledge management.",
      tags: language === "th" ? ["Memory", "Knowledge", "Embeddings"] : ["Memory", "Knowledge", "Embeddings"],
      icon: Database,
    },
  ]

  const followOn = [
    {
      title: language === "th" ? "ไปที่ evaluation hub" : "Continue into the evaluation hub",
      description: language === "th" ? "รวมคำถามสำหรับ buyer, comparison routes และ procurement framing ในจุดเดียว." : "Gather buyer questions, comparison routes, and procurement framing in one place.",
      href: `${localePrefix}/evaluation`,
      icon: Scale,
      tags: language === "th" ? ["Checklist", "Buyer path", "Governance"] : ["Checklist", "Buyer path", "Governance"],
    },
    {
      title: language === "th" ? "ไปที่ methodology layer" : "Open the methodology layer",
      description: language === "th" ? "ดูกรอบการทวนสอบและการเปิดเผยที่รองรับข้อสรุปในหน้าเปรียบเทียบ." : "Review the verification and disclosure model that supports the conclusions in these comparisons.",
      href: `${localePrefix}/methodology`,
      icon: BookOpen,
      tags: language === "th" ? ["Methodology", "Disclosure", "Trust"] : ["Methodology", "Disclosure", "Trust"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Evaluate / Comparison Library" : "Evaluate / Comparison Library"}
      title={language === "th" ? "คลังเปรียบเทียบสำหรับการตัดสินใจ AI ระดับองค์กร" : "A comparison library for enterprise AI decisions"}
      description={language === "th" ? "เส้นทางนี้ใช้สำหรับเปรียบเทียบวิธีคิด วิธี build และผลลัพธ์เชิงระบบ โดยวาง Compare เป็นส่วนหนึ่งของ evaluation IA แทนการเป็นหน้าแยกที่ลอยอยู่นอกบริบท." : "This route compares methodologies, build choices, and system outcomes. Compare now behaves as part of the evaluation IA instead of a disconnected standalone page."}
      taxonomy={language === "th" ? ["Method comparisons", "Buyer evaluation", "Trust framing", "Decision support"] : ["Method comparisons", "Buyer evaluation", "Trust framing", "Decision support"]}
      accent="sky"
      actions={[
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "เปิด evaluation hub" : "Open evaluation hub", variant: "primary" },
        { href: `${localePrefix}/methodology`, label: language === "th" ? "อ่าน methodology" : "Read methodology", variant: "secondary" },
        { href: `${localePrefix}/benchmark-summary`, label: language === "th" ? "ดู benchmark summary" : "View benchmark summary", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Decision mode" : "Decision mode", value: language === "th" ? "Buyer-side" : "Buyer-side", detail: language === "th" ? "for architecture and procurement teams" : "for architecture and procurement teams" },
        { label: language === "th" ? "Primary output" : "Primary output", value: language === "th" ? "Comparative briefs" : "Comparative briefs", detail: language === "th" ? "not marketing claims" : "not marketing claims" },
        { label: language === "th" ? "Trust link" : "Trust link", value: language === "th" ? "Methodology" : "Methodology", detail: language === "th" ? "disclosure and validation framing" : "disclosure and validation framing" },
        { label: language === "th" ? "Next route" : "Next route", value: language === "th" ? "Evaluation" : "Evaluation", detail: language === "th" ? "checklists and buyer path" : "checklists and buyer path" },
      ]}
      footerTitle={language === "th" ? "ถ้าต้องตัดสินใจจริง อย่าหยุดแค่ compare cards" : "If the decision is real, do not stop at comparison cards"}
      footerDescription={language === "th" ? "ใช้ comparison pages เพื่อเร่งการทำความเข้าใจ แล้วต่อไปยัง evaluation checklist, methodology และ pricing discussions เพื่อปิด decision loop." : "Use comparison pages to accelerate understanding, then move into the evaluation checklist, methodology, and pricing discussions to close the decision loop."}
      footerActions={[
        { href: `${localePrefix}/evaluation/enterprise-ai-platform-evaluation-checklist`, label: language === "th" ? "เปิด evaluation checklist" : "Open evaluation checklist", variant: "primary" },
        { href: `${localePrefix}/contact`, label: language === "th" ? "คุยกับทีม" : "Talk to the team", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Comparisons" : "Comparisons"}
        title={language === "th" ? "เปรียบเทียบวิธีหลักที่ทีมองค์กรใช้ตัดสินใจ" : "Compare the core approaches enterprise teams are choosing between"}
        description={language === "th" ? "ทุกหน้าถูกออกแบบให้เป็น comparative briefing ที่อ่านต่อเข้าหน้า evaluation ได้ทันที." : "Each page is designed as a comparative briefing that can route directly into evaluation."}
      >
        <ResourceCardGrid
          cards={comparisons.map((comparison) => ({
            title: comparison.title,
            description: comparison.description,
            href: `${localePrefix}/compare/${comparison.slug}`,
            icon: comparison.icon,
            tags: comparison.tags,
          }))}
          columns="two"
        />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Decision routes" : "Decision routes"}
        title={language === "th" ? "หน้าถัดไปที่ควรเปิดเพื่อใช้ตัดสินใจ" : "The next pages to open if this work will drive a decision"}
        description={language === "th" ? "เปลี่ยนจาก compare mode ไปสู่ buyer mode และ trust mode อย่างเป็นระบบ." : "Move from compare mode into buyer mode and trust mode in a structured way."}
      >
        <ResourceCardGrid cards={followOn} columns="two" />
      </ResourceSection>
    </ResourcePageShell>
  )
}
