"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ShieldCheck, ArrowRight, Lock, Eye, BarChart3, Layers } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_HALLUCINATION_RATE } from "@/lib/site-config"

const features = [
  { icon: Layers, color: "#7B9E87", titleEn: "Multi-LLM Consensus", titleTh: "Multi-LLM Consensus", descEn: `Standard 7-model HexaCore roster (3W+3E+1TH) for consensus verification. Tier 8 God Mode engages all 8 signers for critical decisions. Cross-verification targets a hallucination rate of ${SITE_HALLUCINATION_RATE}.`, descTh: `HexaCore 7 Models มาตรฐาน (3W+3E+1TH) สำหรับ Consensus Verification Tier 8 God Mode ใช้ 8 Signers สำหรับการตัดสินใจสำคัญ Cross-Verification มีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE}` },
  { icon: Lock, color: "#D4A853", titleEn: "Cryptographic Signing", titleTh: "Cryptographic Signing", descEn: "Every verified response is cryptographically signed — tamper-proof and legally auditable.", descTh: "ทุกคำตอบที่ตรวจสอบแล้วถูก Cryptographically Signed — ป้องกันการแก้ไขและตรวจสอบทางกฎหมายได้" },
  { icon: Eye, color: "#C4745B", titleEn: "Complete Audit Trails", titleTh: "Complete Audit Trails", descEn: "Full transparency — every step from query to response is logged and traceable.", descTh: "ความโปร่งใสเต็มรูปแบบ — ทุกขั้นตอนจาก Query ถึง Response ถูกบันทึกและตรวจสอบย้อนหลังได้" },
  { icon: BarChart3, color: "#89B4C8", titleEn: "Benchmark Accuracy Target", titleTh: "Benchmark Accuracy Target", descEn: `Targeting a hallucination rate of ${SITE_HALLUCINATION_RATE} on standard workloads — enterprise-grade accuracy for critical applications.`, descTh: `มีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE} บน Workloads มาตรฐาน — ความแม่นยำระดับ Enterprise สำหรับแอปพลิเคชันสำคัญ` },
]

const pipeline = [
  { stage: "INTAKE", color: "#D4A853", descEn: "Receives the request, validates schema, assigns session ID, and classifies task priority.", descTh: "รับคำขอ ตรวจ Schema, กำหนด Session ID และจัดสำดับความสำคัญ" },
  { stage: "ROUTER", color: "#7B9E87", descEn: "JITNA selects which models to engage from the HexaCore 7-model roster based on task type.", descTh: "JITNA เลือกโมเดลจาก HexaCore 7 ตัวตามประเภทของ Task" },
  { stage: "SIGNERS", color: "#C4745B", descEn: "All selected models independently process the same request — no cross-contamination.", descTh: "ทุกโมเดลที่เลือกประมวลผลคำขอเดียวกันอย่างอิสระ — ไม่มี Cross-Contamination" },
  { stage: "ATTESTATION", color: "#89B4C8", descEn: "Each response is scored across 8 dimensions: Safety, Security, Correctness, Performance, Compliance, Quality, Maintainability, and Documentation.", descTh: "คะแนนคำตอบใน 8 มิติ: Safety, Security, Correctness, Performance, Compliance, Quality, Maintainability, Documentation" },
  { stage: "CONSENSUS", color: "#B8A9C9", descEn: "Voting method (MAJORITY / WEIGHTED / RANKED / UNANIMOUS) determines final answer from signed responses.", descTh: "Voting Method (MAJORITY/WEIGHTED/RANKED/UNANIMOUS) ตัดสินคำตอบสุดท้ายจากคำตอบที่ Signed" },
  { stage: "REPORT", color: "#9B7BB8", descEn: "Returns ED25519-signed response (RFC\u00a08032 — 64-byte signature), consensus score, full model roster, and attestation breakdown. Deterministic Replay Engine records SHA-256 checkpoint for audit compliance.", descTh: "ส่งคืนคำตอบ ED25519-Signed (RFC\u00a08032 — 64-byte Signature), Consensus Score, Model Roster ครบและรายละเอียด Attestation Deterministic Replay Engine บันทึก SHA-256 Checkpoint สำหรับ Audit Compliance" },
]

const pricingTiers = [
  { tier: "S", label: "Solo", price: "$0.10", models: 1, voting: "N/A", color: "#7B9E87", descEn: "Single best-match model. Fast and cheap for non-critical AI queries.", descTh: "โมเดลเดียวที่เหมาะที่สุด เร็วและถูก" },
  { tier: "4", label: "Standard", price: "$0.75", models: 4, voting: "MAJORITY 75% (3/4)", color: "#D4A853", descEn: "4 models, majority consensus. Balanced accuracy for production workflows.", descTh: "4 โมเดล, Majority Consensus — ความแม่นยำสมดุล" },
  { tier: "6", label: "Advanced", price: "$2.00", models: 6, voting: "WEIGHTED", color: "#C4745B", descEn: "6 models, weighted by domain proficiency. High confidence for regulated sectors.", descTh: "6 โมเดล, Weighted ตามความชำนาญ — คอนเฟลมั่นใจสูง" },
  { tier: "8", label: "Supreme", price: "$5.00", models: 7, voting: "UNANIMOUS 75%", color: "#9B7BB8", descEn: "All 7 HexaCore models, 75% unanimous consensus required. Maximum trust for legal, medical, and financial AI.", descTh: "7 โมเดล HexaCore ทั้งหมด, ต้องการฉันทามติ 75% — ความเชื่อถือสูงสุด สำหรับกฎหมาย, การแพทย์, การเงิน" },
]

const stats = [
  { value: SITE_HALLUCINATION_RATE, label: "Hallucination Rate" },
  { value: "7", label: "HexaCore Models" },
  { value: "4", label: "Voting Methods" },
]

export default function SignedAIPage() {
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
        { name: "SignedAI", url: `https://delentia.com${localePrefix}/products/signed-ai` },
      ])) }} />
      <Navbar />

      {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
      <section className="sr-only">
        <p>
          {isTh
            ? `SignedAI คือ Multi-LLM Verification Consensus API ที่ใช้ HexaCore 7 โมเดล (3 ตะวันตก + 3 ตะวันออก + 1 ไทย) เพื่อมีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE} ผ่าน cryptographic signing ด้วย ED25519 RFC 8032 — รองรับ Tier S, 4, 6 และ 8 สำหรับทุกระดับความเสี่ยงขององค์กร`
            : `SignedAI is a multi-LLM verification consensus API that uses HexaCore 7 models (3 Western + 3 Eastern + 1 Thai) to target a hallucination rate of ${SITE_HALLUCINATION_RATE} through ED25519 RFC 8032 cryptographic signing — with Tier S, 4, 6, and 8 consensus levels for every enterprise risk tier.`}
        </p>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium" style={{ backgroundColor: "#7B9E8715", borderColor: "#7B9E8730", color: "#7B9E87" }}>
            <ShieldCheck className="w-4 h-4" /> 5th Genome · Verification API
          </span>
          <h1 className="text-5xl font-bold text-foreground">SignedAI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? `Multi-LLM Verification Consensus API — Cryptographically Signed Responses จาก HexaCore 7 Models มีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE} ในการทดสอบ Benchmark พร้อม Audit Trails`
              : `Multi-LLM verification consensus API — cryptographically signed responses from HexaCore 7 Models, targeting a hallucination rate of ${SITE_HALLUCINATION_RATE} on standard workloads, with complete audit trails and ED25519 RFC 8032 signing.`}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card text-center"
            >
              <div className="text-3xl font-bold text-warm-amber">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "เหตุใดการตรวจสอบ AI จึงสำคัญ" : "Why AI Verification Matters"}
          </h2>
          <p>
            {isTh
              ? "SignedAI คือ 5th Genome ในระบบ RCT 7-Genome — ให้ Verification Infrastructure แก่ทุก Genome อื่น ทุก Output ของ DelentiaAI, ทุกผลลัพธ์ของ Analysearch, ทุก Delta Engine Compression — ตรวจสอบได้ผ่าน SignedAI"
              : "SignedAI is the 5th Genome in the RCT 7-Genome System. It provides verification infrastructure for all other Genomes — every DelentiaAI output, every Analysearch result, every Delta Engine compression is certifiable through SignedAI."}
          </p>
          <p>
            {isTh
              ? `LLMs แต่ละตัวมีข้อผิดพลาดเฉพาะ — ข้อจำกัดของ Training Data, Model Bias และ Hallucination Patterns SignedAI ใช้ Multi-LLM Consensus เพื่อ Cross-Verify Outputs ผ่าน HexaCore 7-Model Roster มีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE} ในการทดสอบ Benchmark`
              : `Individual LLMs have unique failure modes — training data cutoffs, model bias, and hallucination patterns. SignedAI uses multi-LLM consensus to cross-verify outputs across the HexaCore 7-model roster, targeting a hallucination rate of ${SITE_HALLUCINATION_RATE} on standard workloads.`}
          </p>
          <p>
            {isTh
              ? "ทุกคำตอบที่ตรวจสอบแล้วถูก Cryptographically Signed ด้วย ED25519 (RFC\u00a08032) สร้าง Audit Trail ที่ไม่สามารถแก้ไข เหมาะสำหรับ Regulated Industries ที่ต้อง Prove AI Decision Trail"
              : "Every verified response is cryptographically signed using ED25519 (RFC\u00a08032), creating an immutable audit trail. Essential for regulated industries that require proof of AI decision trails."}
          </p>
        </div>
      </section>

      {/* 6-Stage Pipeline */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "Pipeline 6 ขั้นตอน" : "6-Stage Verification Pipeline"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh ? "ทุกคำขอ SignedAI ไหลผ่านทุกขั้นตอน — ไม่มีขั้นตอนใดถูกแบบสุ่ม"
            : "Every SignedAI request flows through every stage — no step is skipped."}
          </p>
        </div>
        <div className="space-y-3">
          {pipeline.map((p, i) => (
            <m.div key={p.stage} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="shrink-0 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${p.color}18`, color: p.color }}>{i + 1}</span>
                <span className="text-xs font-bold font-mono w-24" style={{ color: p.color }}>{p.stage}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? p.descTh : p.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Geopolitical Balance */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {isTh ? "ความสมดุลทางภูมิรัฐศาสตร์โดยการออกแบบ" : "Geopolitical Balance by Design"}
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            {isTh
              ? "SignedAI ไม่ใช่โซลูชันจาก Vendor เดียว HexaCore 7 Models ถูกกระจายอย่างตั้งใจใน 3 เขตภูมิรัฐศาสตร์ — ไม่มี Cloud Provider หรือเขตอำนาจศาลใดควบคุม Consensus Output"
              : "SignedAI is not a 1-vendor solution. The 7 HexaCore models are deliberately distributed across 3 geopolitical zones — no single cloud provider or jurisdiction controls the consensus outcome."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { zone: "3W", label: isTh ? "Western Infrastructure" : "Western Infrastructure", color: "#89B4C8", models: ["Claude Opus 4.6", "Gemini 3 Flash", "Grok 4.1 Fast"] },
              { zone: "3E", label: isTh ? "Eastern / Alternative" : "Eastern / Alternative", color: "#7B9E87", models: ["Kimi K2.5", "MiniMax M2.1", "DeepSeek V3.2"] },
              { zone: "1R", label: isTh ? "Regional Specialist" : "Regional Specialist", color: "#D4A853", models: ["Typhoon v2 70B (TH)"] },
            ].map((z, i) => (
              <m.div key={z.zone} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border-2 bg-card" style={{ borderColor: `${z.color}40`, background: `${z.color}08` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold font-mono" style={{ color: z.color }}>{z.zone}</span>
                  <span className="text-xs text-muted-foreground">{z.label}</span>
                </div>
                <ul className="space-y-1">
                  {z.models.map((m) => (
                    <li key={m} className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: z.color }} />
                      {m}
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Verification Demo */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: "#7B9E8715", color: "#7B9E87", border: "1px solid #7B9E8730" }}>
            <ShieldCheck className="w-3 h-3" /> {isTh ? "ตัวอย่างจริง" : "Live Demo"}
          </span>
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "การตรวจสอบจริง" : "Verification in Action"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {isTh ? "ตัวอย่าง Consensus Result จาก 3 LLMs (Tier 4 · MAJORITY)" : "Sample consensus result from 3 LLMs — Tier 4 · MAJORITY voting"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Query header */}
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
              <span>REQUEST</span>
              <span>·</span>
              <span className="text-warm-amber">Tier 4 · MAJORITY · session_id: axq-7821</span>
            </div>
            <p className="text-sm font-semibold text-foreground font-mono leading-relaxed">
              &quot;What is the recommended insulin dosage protocol for Type 1 diabetic adolescents?&quot;
            </p>
          </div>
          {/* Model rows */}
          <div className="divide-y divide-border">
            {([
              { model: "Claude Opus 4.6", confidence: 97, agree: true, noteEn: "Verified against ADA Guidelines 2024 — Supreme Architect (3W tier)", noteTh: "ตรวจสอบแล้วตรงกับ ADA Guidelines 2024 — Supreme Architect (3W Tier)", color: "#D97706" },
              { model: "Kimi K2.5", confidence: 94, agree: true, noteEn: "Confirmed — with weight-based dosing caveat \u00b7 Lead Builder (3E tier)", noteTh: "ยืนยัน พร้อมข้อแม้เรื่อง Weight-based dosing \u00b7 Lead Builder (3E Tier)", color: "#10A37F" },
              { model: "Typhoon v2 70B", confidence: 91, agree: true, noteEn: "Aligned — recommends Endocrinologist consult \u00b7 Regional Specialist (1R-TH)", noteTh: "ตรงกัน — แนะนำ Endocrinologist consult \u00b7 Regional Specialist (1R-TH)", color: "#4285F4" },
            ] as const).map((row, i) => (
              <m.div
                key={row.model}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-6 py-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: row.color }} />
                    <span className="text-sm font-medium text-foreground">{row.model}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: row.agree ? "#7B9E87" : "#C4745B" }}>{row.agree ? "✓ Agree" : "✗ Disagree"}</span>
                    <span className="text-xs font-mono text-muted-foreground">{row.confidence}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-2">
                  <m.div
                    className="h-full rounded-full"
                    style={{ background: row.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.confidence}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{isTh ? row.noteTh : row.noteEn}</p>
              </m.div>
            ))}
          </div>
          {/* Consensus footer */}
          <div className="px-6 py-5 bg-muted/30 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground font-mono mb-1">CONSENSUS</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-warm-amber">3/3 MAJORITY ✓</span>
                  <span className="text-xs text-muted-foreground">· 94.0% avg confidence</span>
                </div>
              </div>
              <div className="shrink-0">
                <div className="text-xs text-muted-foreground font-mono mb-1">ED25519 SIGNATURE</div>
                <div className="font-mono text-xs text-muted-foreground">
                  ED25519:<span className="text-warm-amber">a3f8d2c1...</span>b19c
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ความสามารถการตรวจสอบ" : "Verification Capabilities"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
            >
              <feat.icon size={28} style={{ color: feat.color }} className="mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">{isTh ? feat.titleTh : feat.titleEn}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? feat.descTh : feat.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Per-Review API Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ราคาบริการ API (ต่อการรีวิว)" : "API Pricing (Per Review)"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh ? "จ่ายเฉพาะสิ่งที่ใช้ — เลือก Tier ตามความสำคัญของ Task"
            : "Pay only for what you use — pick the Tier that matches the criticality of your task."}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map((t, i) => (
            <m.div key={t.tier} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border-2 flex flex-col gap-3" style={{ borderColor: `${t.color}40`, background: `${t.color}08` }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded font-mono" style={{ color: t.color, background: `${t.color}18` }}>Tier {t.tier}</span>
                <span className="text-xs font-medium" style={{ color: t.color }}>{t.label}</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{t.price}</div>
              <div className="text-xs text-muted-foreground">per review</div>
              <div className="text-xs font-medium text-foreground">{t.models} {isTh ? "โมเดล" : "model"}{t.models > 1 ? "s" : ""} · {t.voting}</div>
              <p className="text-xs leading-relaxed text-muted-foreground flex-1">{isTh ? t.descTh : t.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {isTh ? "เริ่มต้นใช้งาน" : "Quick Start"}
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 overflow-x-auto">
            <pre className="text-xs font-mono text-muted-foreground">{`import { SignedAI } from '@delentia/signed-ai';

const verifier = new SignedAI({
  apiKey: process.env.SIGNED_AI_KEY
});

const result = await verifier.verify({
  prompt: "What is the capital of Thailand?",
  models: ["claude-opus-4.6", "kimi-k2.5", "typhoon-v2-70b"],
  threshold: 0.95
});

console.log(result);
// { answer: "Bangkok", confidence: 0.997,
//   signature: "ED25519:...", consensus: 3/3 }`}</pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {isTh ? "สำรวจผลิตภัณฑ์อื่น" : "Explore Other Products"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localHref("/products/delentia-platform")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-amber text-white font-semibold text-sm hover:bg-[#C49A48] transition-colors">
            Delentia Platform <ArrowRight size={16} />
          </Link>
          <Link href={localHref("/products/delentia-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            Delentia AI
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

