"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ArrowRight, Dna } from "lucide-react"
import InteractiveGenomeExplorer from "@/components/diagrams/interactive-genome-explorer"

const genomes = {
  en: [
    { id: "G1", name: "Architect's Genome", color: "#D4A853", desc: "The master blueprint of the RCT Ecosystem. Defines the foundational knowledge scaffold — mapping every domain, concept, and relationship that the system understands. All other genomes derive their structure from G1.", link: "/genome/architect" },
    { id: "G2", name: "RCT Codex Genome", color: "#89B4C8", desc: "The living knowledge base of Reverse Component Thinking methodology. Encodes the 41 proprietary algorithms, the FDIA equation, decision trees, and the full reasoning framework that powers RCT's intelligence layer.", link: "/genome/codex" },
    { id: "G3", name: "JITNA Genome", color: "#C4745B", desc: "Just-in-Time Neural Architecture — the dynamic routing engine. Selects the optimal LLM, algorithm tier, and processing path for every task in real time, balancing speed, accuracy, and cost across the HexaCore 7-model roster.", link: "/genome/jitna" },
    { id: "G4", name: "ARTENT Genome", color: "#7B9E87", desc: "The Personal Agent OS genome. Powers the Intent Omnibox (classify any input), Memory Timeline (persistent cross-session recall), and Sovereignty Vault (user-owned memory). Drives L1 Chatbot through L5 Evolution intelligence.", link: "/genome/artent" },
    { id: "G5", name: "SignedAI Genome", color: "#B8A9C9", desc: "The multi-model attestation and consensus genome. Orchestrates the 6-stage SignedAI pipeline — INTAKE → ROUTER → SIGNERS → ATTESTATION → CONSENSUS → REPORT — across 4 verification tiers from single-model ($0.10) to 75% consensus ($5.00).", link: "/genome/signed-ai" },
    { id: "G6", name: "Vault Genome", color: "#9B7BB8", desc: "The sovereignty and data-protection genome. Manages Constitutional AI constraints (A=0 absolute prohibitions), user-owned memory encryption, selective disclosure, and audit trails across all 8 RCTDB dimensions.", link: "/genome/vault" },
    { id: "G7", name: "RCT-7 Genome", color: "#C4745B", desc: "The Mental OS and self-evolution genome. Runs the 7-state IntentLoop (IDLE → RECEIVE → PARSE → ROUTE → EXECUTE → VERIFY → ADAPT), feeds performance signals back to G1, and drives the continuous improvement cycle.", link: "/genome/rct-7" },
  ],
  th: [
    { id: "G1", name: "Architect's Genome", color: "#D4A853", desc: "พิมพ์เขียวหลักของ RCT Ecosystem กำหนด Knowledge Scaffold พื้นฐาน — แมปทุก Domain, Concept และความสัมพันธ์ที่ระบบเข้าใจ Genomes อื่นทั้งหมดได้รับโครงสร้างจาก G1", link: "/genome/architect" },
    { id: "G2", name: "RCT Codex Genome", color: "#89B4C8", desc: "ฐานความรู้ที่มีชีวิตของ Reverse Component Thinking เข้ารหัส 41 Algorithms, สมการ FDIA, Decision Trees และ Reasoning Framework ที่ขับเคลื่อน Intelligence Layer", link: "/genome/codex" },
    { id: "G3", name: "JITNA Genome", color: "#C4745B", desc: "Just-in-Time Neural Architecture — Routing Engine แบบ Dynamic เลือก LLM, Algorithm Tier และเส้นทางประมวลผลที่เหมาะสมที่สุดสำหรับทุก Task แบบ Real-time สมดุลความเร็ว ความแม่นยำ และต้นทุน", link: "/genome/jitna" },
    { id: "G4", name: "ARTENT Genome", color: "#7B9E87", desc: "Personal Agent OS Genome ขับเคลื่อน Intent Omnibox (จำแนก Input ทุกประเภท), Memory Timeline (จดจำข้ามเซสชัน) และ Sovereignty Vault (ความจำที่เจ้าของเป็นผู้ครอบครอง) สร้างระดับปัญญา L1 ถึง L5", link: "/genome/artent" },
    { id: "G5", name: "SignedAI Genome", color: "#B8A9C9", desc: "Genome การรับรองและฉันทามติหลายโมเดล ประสาน SignedAI Pipeline 6 ขั้นตอน — INTAKE→ROUTER→SIGNERS→ATTESTATION→CONSENSUS→REPORT — ผ่าน 4 Verification Tiers ตั้งแต่ $0.10 ถึง $5.00", link: "/genome/signed-ai" },
    { id: "G6", name: "Vault Genome", color: "#9B7BB8", desc: "Genome ด้านอธิปไตย์และการปกป้องข้อมูล จัดการ Constitutional AI Constraints (A=0), การเข้ารหัสความจำที่ผู้ใช้เป็นเจ้าของ, Selective Disclosure และ Audit Trails ใน 8 มิติ RCTDB", link: "/genome/vault" },
    { id: "G7", name: "RCT-7 Genome", color: "#C4745B", desc: "Mental OS และ Self-Evolution Genome รัน IntentLoop 7 สถานะ (IDLE→RECEIVE→PARSE→ROUTE→EXECUTE→VERIFY→ADAPT) ส่ง Performance Signals กลับไป G1 สร้างวงจรปรับปรุงต่อเนื่อง", link: "/genome/rct-7" },
  ],
}

export default function GenomePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localGenomes = isTh ? genomes.th : genomes.en

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-terracotta/10 border border-warm-terracotta/30 text-warm-terracotta text-sm font-medium">
            <Dna className="w-4 h-4" /> {isTh ? "ระบบ 7 Genome" : "7 Genome System"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">The 7 Genome System</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "7 Genomes ที่เชื่อมต่อกันสร้างวงจรปรับปรุงต่อเนื่อง — จาก WHY ถึง IMPROVEMENT แล้ววนกลับ"
              : "Seven interconnected genomes forming a continuous improvement cycle — from Architect’s Blueprint to RCT-7 Mental OS and back."}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-6">{isTh ? "ทำไม 7 Genomes?" : "Why 7 Genomes?"}</h2>
          <p>{isTh
            ? "RCT Ecosystem สร้างขึ้นบนอุปมาทางชีวภาพ: เช่นเดียวกับที่ DNA มีพิมพ์เขียวสมบูรณ์ของสิ่งมีชีวิต ระบบ 7 Genome มีพิมพ์เขียวสมบูรณ์ของระบบปฏิบัติการ AI อัจฉริยะ แต่ละ Genome ตอบคำถามพื้นฐาน 7 ข้อของปัญญา"
            : "Built on a biological metaphor: just as DNA contains the complete blueprint for an organism, the 7 Genome System contains the complete blueprint for an intelligent AI operating system."}</p>
          <p>{isTh
            ? "ต่างจาก AI Frameworks แบบดั้งเดิมที่ปฏิบัติต่อ Components เป็นโมดูลแยก ระบบ 7 Genome สร้างสถาปัตยกรรมที่มีชีวิต โดยแต่ละ Genome สื่อสารและมีอิทธิพลต่อกัน ทำให้เกิดปัญญาแบบ Emergent"
            : "Unlike traditional AI frameworks that treat components as isolated modules, the 7 Genome System creates a living architecture where each genome continuously communicates with and influences the others."}</p>
          <p>{isTh
            ? "ลักษณะวงจรของระบบ — จาก G1 (WHY) ผ่าน G7 (IMPROVEMENT) แล้ววนกลับ G1 — หมายความว่า Ecosystem ไม่เคยหยุดวิวัฒนาการ"
            : "The circular nature — from G1 (WHY) through G7 (IMPROVEMENT) and back to G1 — means the ecosystem never stops evolving."}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:py-20">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-terracotta/10 border border-warm-terracotta/30 text-warm-terracotta text-sm font-medium">
            <Dna className="w-4 h-4" /> {isTh ? "Interactive Explorer" : "Interactive Explorer"}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "สำรวจ Genome แต่ละตัวแบบโต้ตอบ" : "Explore Each Genome Interactively"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "เลือก genome เพื่อดูบทบาท พารามิเตอร์การทำงาน ประวัติวิวัฒนาการ และการเชื่อมโยงกับ genomes อื่นในระบบ"
              : "Inspect the role, configuration parameters, evolution history, and cross-connections of each genome in the RCT system."}
          </p>
        </div>
        <InteractiveGenomeExplorer language={isTh ? "th" : "en"} />
      </section>

      {/* Genome Cards */}
      <section className="mx-auto max-w-4xl px-4 py-10 md:py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">{isTh ? "รายละเอียด 7 Genomes" : "The Seven Genomes in Detail"}</h2>
        <div className="space-y-5">
          {localGenomes.map((g, i) => (
            <m.div key={g.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-warm-amber/40 hover:shadow-[0_12px_28px_rgba(212,168,83,0.09)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold font-mono" style={{ backgroundColor: `${g.color}15`, color: g.color }}>{g.id}</span>
                <h3 className="text-lg font-bold text-foreground">{g.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
              {g.link && (
                <Link href={g.link} className="inline-flex items-center gap-1 mt-3 text-xs font-medium" style={{ color: g.color }}>
                  {isTh ? "เรียนรู้เพิ่มเติม" : "Learn more"}
                  <span className="sr-only">{isTh ? `เกี่ยวกับ ${g.name}` : ` about ${g.name}`}</span>
                  <ArrowRight size={12} />
                </Link>
              )}
            </m.div>
          ))}
        </div>
      </section>

      {/* Circular Diagram */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">{isTh ? "วงจร Genome" : "The Genome Cycle"}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {localGenomes.map((g, i) => (
              <div key={g.id} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${g.color}15`, color: g.color }}>{g.id}</span>
                {i < localGenomes.length - 1 && <ArrowRight size={14} className="text-muted-foreground" />}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <ArrowRight size={14} className="text-muted-foreground" />
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-warm-amber/10 text-warm-amber">↻ G1</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">{isTh ? "วงจรต่อเนื่อง: G7 (RCT-7 Mental OS) ป้อน Performance Signals กลับไป G1 (Architect) เพื่อวิวัฒนาการอย่างไม่สิ้นสุด" : "Continuous cycle: G7 (RCT-7 Mental OS) feeds performance signals back into G1 (Architect) for perpetual evolution."}</p>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "หัวข้อที่เกี่ยวข้อง" : "Related Topics"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/architecture", icon: "🏗️", label: isTh ? "สถาปัตยกรรม 10 ชั้น" : "10-Layer Architecture", desc: isTh ? "ดูว่า Genomes เชื่อมต่อกับสถาปัตยกรรมอย่างไร" : "How genomes map to the 10-layer cognitive stack" },
            { href: "/fdia", icon: "📐", label: isTh ? "สมการ FDIA" : "FDIA Equation", desc: isTh ? "รากฐานทางคณิตศาสตร์ที่ขับเคลื่อน JITNA Genome" : "The mathematical foundation powering the JITNA Genome" },
            { href: "/algorithms", icon: "⚡", label: isTh ? "41 อัลกอริทึม" : "41 Algorithms", desc: isTh ? "เครื่องยนต์อัลกอริทึมภายใน JITNA Genome" : "The algorithmic engine within the JITNA Genome" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "สนใจระบบ 7 Genome?" : "Interested in the 7 Genome System?"}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href="/architecture" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "ดูสถาปัตยกรรม" : "View Architecture"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

