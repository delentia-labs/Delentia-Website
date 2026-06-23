"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Palette, ArrowRight, Target, Layers, Eye, Wand2, Brain, ShieldCheck, Cpu, Lock } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"

const capabilities = [
  { icon: Brain, color: "#B8A9C9", titleEn: "L1–L5 Intelligence Ladder", titleTh: "L1–L5 Intelligence Ladder", descEn: "From L1 Chatbot → L2 Recall (RCTDB) → L3 Analysis (FDIA) → L4 Synthesis (Multi-Agent) → L5 Evolution. PA routes each query to the correct intelligence level before any LLM call.", descTh: "จาก L1 Chatbot → L2 Recall (RCTDB) → L3 Analysis (FDIA) → L4 Synthesis (Multi-Agent) → L5 Evolution — Agent กำหนดระดับปัญญาที่เหมาะสมก่อนเรียก LLM ทุกครั้ง" },
  { icon: ShieldCheck, color: "#D4A853", titleEn: "FDIA Constitutional Scoring", titleTh: "FDIA Constitutional Scoring", descEn: "Every Artent output passes F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A. If Alignment = 0, no output is dispatched. Constitutional AI is mathematics enforced at the equation level — not a policy you configure.", descTh: "ทุก Output ผ่านสมการ F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A — หาก Alignment = 0 ไม่มี Output ใดถูกส่งออก Constitutional AI ไม่ใช่นโยบาย แต่เป็นคณิตศาสตร์ที่บังคับใช้ในระดับสมการ" },
  { icon: Lock, color: "#7B9E87", titleEn: "Sovereignty Vault", titleTh: "Sovereignty Vault", descEn: "Your preferences, goals, and memory schema stored in RCTDB 8-Dimensional. Encrypted storage, selective disclosure, and zero tenant data sharing — you own every byte.", descTh: "Preference, Goal และ Memory Schema เก็บใน RCTDB 8-Dimensional — Encrypted Storage, Selective Disclosure และไม่มีการแชร์ข้อมูลข้าม Tenant คุณเป็นเจ้าของทุก Byte" },
  { icon: Eye, color: "#C4745B", titleEn: "Analysearch Integration", titleTh: "Analysearch Integration", descEn: "Before synthesizing, DelentiaAI queries the Analysearch Intent Engine in Mirror Mode (PROPOSE → COUNTER → REFINE) for cross-disciplinary depth — GIGO-protected with golden keyword crystallization.", descTh: "ก่อน Synthesize DelentiaAI Query Analysearch Intent Engine โหมด Mirror (PROPOSE → COUNTER → REFINE) เพื่อความลึกข้ามสาขา — GIGO-Protected พร้อม Golden Keyword Crystallization" },
]

export default function DelentiaAIPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: "Home", url: `https://delentia.com${localePrefix}` },
        { name: isTh ? "ผลิตภัณฑ์" : "Products", url: `https://delentia.com${localePrefix}/products` },
        { name: "DelentiaAI", url: `https://delentia.com${localePrefix}/products/delentia-ai` },
      ])) }} />
      <Navbar />

      {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
      <section className="sr-only">
        <p>
          {isTh
            ? "DelentiaAI คือ Personal Agent OS ที่จำแนก Intent ทุกประเภท จดจำผ่าน RCTDB 8-Dimensional Schema และรันทุก Task ผ่าน WF00-META 7-Phase Protocol — รองรับระดับปัญญา L1 ถึง L5 พร้อม FDIA Constitutional Scoring และ Sovereignty Vault ที่รับประกันความเป็นเจ้าของข้อมูล"
            : "DelentiaAI is a Personal Agent OS that classifies any intent, persists memory through the RCTDB 8-Dimensional Schema, and routes every task through the 7-phase WF00-META protocol — supporting L1 through L5 intelligence levels with FDIA Constitutional Scoring and a Sovereignty Vault that guarantees data ownership."}
        </p>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium" style={{ backgroundColor: "#B8A9C915", borderColor: "#B8A9C930", color: "#B8A9C9" }}>
            <Brain className="w-4 h-4" /> Personal Agent OS
          </span>
          <h1 className="text-5xl font-bold text-foreground">DelentiaAI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Personal Agent OS ที่จำแนก Intent ทุกประเภท, จดจำผ่าน RCTDB 8-Dimensional และรันทุก Task ผ่าน WF00-META 7-Phase Protocol — INIT → PARSE → CLASSIFY → SYNTHESIZE → VALIDATE → DISPATCH → AUDIT"
              : "The Personal Agent OS that classifies any intent, persists memory in RCTDB 8-Dimensional, and routes every task through the WF00-META 7-phase protocol — INIT → PARSE → CLASSIFY → SYNTHESIZE → VALIDATE → DISPATCH → AUDIT."}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "Personal Agent OS ที่เข้าใจความต้องการของคุณ" : "Personal Agent OS That Understands Your Intent"}
          </h2>
          <p>
            {isTh
              ? "Delentia AI คือ Personal Agent OS ที่จำแนก Input ทุกประเภทเป็น Intent ที่มีโครงสร้าง จดจำผ่าน RCTDB 8-Dimensional Schema และรันทุก Task ผ่าน WF00-META Pipeline 7 ขั้นตอน — ไม่ใช่ AI สร้างเนื้อหาทั่วไป แต่เป็น OS ที่ทำงานให้คุณ"
              : "Delentia AI is a Personal Agent OS that classifies every input as a structured intent, persists it through RCTDB 8-Dimensional schema, and routes every task through the 7-phase WF00-META pipeline — not a generic content AI, but an OS that works for you."}
          </p>
          <p>
            {isTh
              ? "ระยะปัญญา 5 ระดับของ ARTENT: L1 Chatbot → L2 Recall (RCTDB) → L3 Analysis (FDIA) → L4 Synthesis (Multi-Agent) → L5 Evolution (ปรับปรุงตนเอง) — Agent ที่นี่เติบโตไปพร้อมคุณ"
              : "5 intelligence levels: L1 Chatbot → L2 Recall (RCTDB memory) → L3 Analysis (FDIA equation) → L4 Synthesis (multi-agent orchestration) → L5 Evolution (self-improving) — an agent that grows with you."}
          </p>
          <p>
            {isTh
              ? "Sovereignty Vault รับประกันว่าคุณเป็นเจ้าของข้อมูลทุกชิ้น: Encrypted Storage, Selective Disclosure และ Constitutional AI Constraints (A=0) ทำให้มั่นใจได้ว่าข้อมูลของคุณจะไม่ถูกนำไปใช้โดยไม่ได้รับอนุญาต"
              : "The Sovereignty Vault guarantees you own every byte: Encrypted Storage, Selective Disclosure, and Constitutional AI Constraints (A=0) ensure your data is never used without permission."}
          </p>
        </div>
      </section>

      {/* WF00-META Pipeline */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {isTh ? "WF00-META Protocol (v5.3.0+)" : "WF00-META Protocol (v5.3.0+)"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {isTh ? "Pipeline 7 ขั้นตอน — ทุก Task ไหลผ่านทุก Phase โดยไม่มีขั้นตอนใดถูกข้าม" : "7-phase pipeline — every task flows through every phase, no step is skipped."}
          </p>
        </div>
        <div className="space-y-3">
          {([
            { phase: "INIT", color: "#B8A9C9", descEn: "Session initialised — Intent ID assigned, WF00 ticket opened, resource quotas allocated.", descTh: "เปิด Session — กำหนด Intent ID, เปิด WF00 Ticket และจัดสรร Resource Quota" },
            { phase: "PARSE", color: "#D4A853", descEn: "Raw input decomposed into structured Intent fields: goal, context, constraints, priority.", descTh: "แยก Input ดิบออกเป็น Intent Fields ที่มีโครงสร้าง: Goal, Context, Constraints, Priority" },
            { phase: "CLASSIFY", color: "#7B9E87", descEn: "Intent type and intelligence level (L1\u2013L5) determined — routes to the correct execution tier.", descTh: "กำหนดประเภท Intent และระดับปัญญา (L1\u2013L5) — จัดเส้นทางไปยัง Execution Tier ที่ถูกต้อง" },
            { phase: "SYNTHESIZE", color: "#C4745B", descEn: "Response constructed via multi-agent orchestration — Analysearch Mirror Mode engaged for complex queries.", descTh: "สร้างคำตอบผ่าน Multi-Agent Orchestration — เรียกใช้ Analysearch Mirror Mode สำหรับ Query ที่ซับซ้อน" },
            { phase: "VALIDATE", color: "#89B4C8", descEn: "FDIA gate: F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A evaluated. If Alignment = 0, output is blocked — constitutional constraint enforced.", descTh: "FDIA Gate: ประเมิน F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A — หาก Alignment = 0 ผลลัพธ์จะถูกบล็อก Constitutional Constraint บังคับใช้" },
            { phase: "DISPATCH", color: "#9B7BB8", descEn: "Validated output dispatched — SignedAI signing applied if verification tier is requested.", descTh: "ส่ง Output ที่ผ่านการตรวจสอบไปยังปลายทาง — SignedAI Signing ใช้หากต้องการ Verification Tier" },
            { phase: "AUDIT", color: "#B8A9C9", descEn: "Full execution trace recorded to RCTDB 8D — SHA-256 checkpoint stored for deterministic replay.", descTh: "บันทึก Execution Trace ทั้งหมดลง RCTDB 8D — SHA-256 Checkpoint สำหรับ Deterministic Replay" },
          ] as const).map((p, i) => (
            <m.div key={p.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="shrink-0 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${p.color}18`, color: p.color }}>{i + 1}</span>
                <span className="text-xs font-bold font-mono w-24" style={{ color: p.color }}>{p.phase}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? p.descTh : p.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ความสามารถหลัก" : "Core Capabilities"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
            >
              <cap.icon size={28} style={{ color: cap.color }} className="mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">{isTh ? cap.titleTh : cap.titleEn}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? cap.descTh : cap.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Architecture Integration */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
              {isTh ? "ขับเคลื่อนด้วยสถาปัตยกรรม RCT" : "Powered by RCT Architecture"}
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
              {isTh
                ? "ARTENT Genome ใช้ RCT Stack ทั้งหมด — JITNA RFC-001 สำหรับ Intent Routing, RCTDB 8-Dimensional สำหรับ Memory Timeline และ SignedAI (5th Genome) สำหรับ Result Verification"
                : "The ARTENT Genome leverages the full RCT stack — JITNA RFC-001 for intent routing, RCTDB 8-Dimensional for the Memory Timeline, and SignedAI (5th Genome) for result verification."}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "JITNA RFC-001", desc: isTh ? "Intent Routing" : "Intent Routing", color: "#C4745B" },
                { label: "RCTDB 8D", desc: isTh ? "Memory Timeline" : "Memory Timeline", color: "#7B9E87" },
                { label: "SignedAI", desc: isTh ? "5th Genome" : "5th Genome", color: "#D4A853" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl text-center bg-muted">
                  <div className="text-lg font-bold mb-1" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localHref("/products/signed-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors" style={{ backgroundColor: "#7B9E87" }}>
            SignedAI <ArrowRight size={16} />
          </Link>
          <Link href={localHref("/products/delentia-platform")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            Delentia Platform
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

