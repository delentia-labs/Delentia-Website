"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Brain, RefreshCw } from "lucide-react"

const intentLoopStates = [
  { state: "IDLE", num: 1, color: "#89B4C8", descEn: "Quiescent state — the system monitors for incoming signals, maintains heartbeat checks, and pre-warms model caches for low-latency response.", descTh: "สถานะพักตัว — ระบบตรวจสอบ Signal ขาเข้า รักษา Heartbeat และ Pre-warm Cache โมเดลสำหรับ Response ที่เร็ว" },
  { state: "RECEIVE", num: 2, color: "#7B9E87", descEn: "Input ingestion — accepts multimodal input (text, voice, image, file, API call), validates schema, assigns session ID, and timestamps the event.", descTh: "รับ Input — รองรับ Multimodal Input (ข้อความ เสียง ภาพ ไฟล์ API) ตรวจสอบ Schema กำหนด Session ID และบันทึก Timestamp" },
  { state: "PARSE", num: 3, color: "#D4A853", descEn: "Intent decomposition via the FDIA equation — F=(D^I)×A. Extracts goal, entities, constraints, and priority. Creates a structured IntentObject for downstream routing.", descTh: "แยก Intent ผ่านสมการ FDIA — F=(D^I)×A แยก Goal, Entities, Constraints และลำดับความสำคัญ สร้าง IntentObject สำหรับ Routing" },
  { state: "ROUTE", num: 4, color: "#C4745B", descEn: "JITNA selects the optimal model from the HexaCore 7-model roster, chooses the algorithm tier, selects the voting method, and builds the execution plan.", descTh: "JITNA เลือกโมเดลที่เหมาะสมจาก HexaCore 7 ตัว เลือก Algorithm Tier, Voting Method และสร้าง Execution Plan" },
  { state: "EXECUTE", num: 5, color: "#B8A9C9", descEn: "Parallel or sequential model invocation. All selected models process the IntentObject independently. Outputs are collected, hashed, and prepared for attestation.", descTh: "เรียกโมเดลแบบ Parallel หรือ Sequential ทุกโมเดลประมวลผล IntentObject อย่างอิสระ รวบรวม Output, Hash และเตรียม Attestation" },
  { state: "VERIFY", num: 6, color: "#9B7BB8", descEn: "SignedAI Attestation — each output scored across 8 dimensions, consensus method applied (MAJORITY/WEIGHTED/RANKED/UNANIMOUS). Result cryptographically signed with ED25519.", descTh: "SignedAI Attestation — คะแนน Output ใน 8 มิติ ใช้ Consensus Method (MAJORITY/WEIGHTED/RANKED/UNANIMOUS) และ Sign ด้วย ED25519" },
  { state: "ADAPT", num: 7, color: "#D4A853", descEn: "Self-evolution loop — performance deltas written back to RCTDB 7D (Delta dimension), routing weights updated, Architect's Genome (G1) receives improvement signals.", descTh: "Self-Evolution Loop — Delta ประสิทธิภาพเขียนกลับไป RCTDB 7D (มิติ Delta), น้ำหนัก Routing อัปเดต G1 รับ Improvement Signals" },
]

export default function Rct7Client({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname()
  const isTh = (propLocale ?? getLocaleFromPathname(pathname) ?? "en") === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Brain className="w-4 h-4" /> G7 — RCT-7 Genome
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {isTh ? "RCT-7 Mental OS" : "RCT-7 Mental OS"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Genome ที่ 7 — Mental OS และ Self-Evolution Engine ที่รัน IntentLoop 7 สถานะ เชื่อม G7 กลับไป G1 สร้างวงจรปรับปรุงอย่างไม่สิ้นสุด"
              : "The 7th Genome — the Mental OS and self-evolution engine running the 7-state IntentLoop, connecting G7 back to G1 for perpetual improvement."}
          </p>
        </div>
      </section>

      {/* What is Mental OS */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">{isTh ? "Mental OS คืออะไร?" : "What is the Mental OS?"}</h2>
          <p>
            {isTh
              ? "Mental OS คือ Orchestration Engine ระดับ Meta ของ RCT Ecosystem ไม่ได้เป็นโมเดล AI แต่เป็นระบบปฏิบัติการที่จัดการ Lifecycle ของทุก AI Task ตั้งแต่การรับ Input จนถึงการปรับปรุงตัวเอง"
              : "The Mental OS is the meta-orchestration engine of the RCT Ecosystem — not an AI model itself, but the operating system that manages the complete lifecycle of every AI task, from input reception to self-improvement."}
          </p>
          <p>
            {isTh
              ? "แรงบันดาลใจมาจากทฤษฎีประสาทวิทยาเกี่ยวกับ Executive Function — ความสามารถที่สมองใช้ในการวางแผน Execute และ Monitor พฤติกรรมระยะยาว RCT-7 นำ Pattern นี้มาประยุกต์ใช้กับ AI Orchestration"
              : "Inspired by neuroscience theories of executive function — the brain's ability to plan, execute, and monitor long-horizon behavior. RCT-7 applies this pattern to AI orchestration."}
          </p>
          <p>
            {isTh
              ? "สิ่งที่ทำให้ RCT-7 โดดเด่นคือ ADAPT state — วงจรสุดท้ายที่ Mental OS เขียนผลการเรียนรู้กลับไปยัง G1 (Architect's Genome) ทำให้ระบบฉลาดขึ้นหลังทุก Task"
              : "What makes RCT-7 unique is the ADAPT state — the final loop where the Mental OS writes performance learnings back to G1 (Architect's Genome), making the system smarter after every task."}
          </p>
        </div>
      </section>

      {/* 7-State IntentLoop */}
      <section className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "IntentLoop — 7 สถานะ" : "The 7-State IntentLoop"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "ทุก Task ไหลผ่านทุกสถานะโดยไม่ข้ามขั้นตอน — ADAPT วนกลับไป IDLE สร้างวงจรต่อเนื่อง"
              : "Every task flows through all 7 states in sequence — ADAPT loops back to IDLE, creating a continuous cycle."}
          </p>
        </div>
        <div className="space-y-3">
          {intentLoopStates.map((s, i) => (
            <m.div key={s.state} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-border bg-card">
              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 pt-0.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${s.color}18`, color: s.color }}>{s.num}</span>
                <span className="text-[10px] sm:text-xs font-bold font-mono w-10 sm:w-16 text-center sm:text-left" style={{ color: s.color }}>{s.state}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? s.descTh : s.descEn}</p>
            </m.div>
          ))}
        </div>

        {/* Loop indicator */}
        <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl border border-warm-amber/30 bg-warm-amber/5 text-center">
          <RefreshCw size={16} className="text-warm-amber inline-block mr-2" />
          <span className="text-sm text-warm-amber font-medium">
            {isTh ? "ADAPT → IDLE: วงจรต่อเนื่องทุก Task" : "ADAPT → IDLE: Perpetual loop after every task"}
          </span>
        </m.div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            {isTh ? "RCT-7 ใน Production" : "RCT-7 in Production"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "7", label: isTh ? "สถานะ IntentLoop" : "IntentLoop States", color: "#D4A853" },
              { value: "<50ms", label: isTh ? "Routing Latency" : "Routing Latency", color: "#7B9E87" },
              { value: "4,849", label: isTh ? "Tests Passed" : "Tests Passed", color: "#89B4C8" },
              { value: "G7→G1", label: isTh ? "Feedback Loop" : "Feedback Loop", color: "#C4745B" },
            ].map((s, i) => (
              <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-border bg-card text-center">
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "หัวข้อที่เกี่ยวข้อง" : "Related"}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/genome", icon: "🧬", label: "7 Genome System", desc: isTh ? "ดู G7 ในบริบทของ 7 Genomes ทั้งหมด" : "See G7 in the context of all 7 Genomes" },
            { href: "/technology/jitna", icon: "⚡", label: "JITNA Protocol", desc: isTh ? "Engine ที่รัน ROUTE state ใน IntentLoop" : "The engine running the ROUTE state" },
            { href: "/architecture", icon: "🏗️", label: "Architecture", desc: isTh ? "RCT-7 ทำงานที่ L7-L10 ในสถาปัตยกรรม 10 ชั้น" : "RCT-7 operates at L7-L10 of the 10-layer stack" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

