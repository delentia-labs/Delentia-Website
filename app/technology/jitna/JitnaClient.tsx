"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ArrowRight, GitBranch, Layers, Network } from "lucide-react"

const jitnaLanguageFields = [
  {
    symbol: "I",
    name: "Intent",
    nameEn: "Intent",
    nameTh: "เจตนา / เป้าหมายหลัก",
    descEn: "The primary objective — what the agent ultimately wants to achieve. Structured as an IntentObject with goal, constraints, and priority.",
    descTh: "เป้าหมายหลัก — สิ่งที่ Agent ต้องการบรรลุ แสดงเป็น IntentObject พร้อม goal, constraints และ priority",
    color: "#D4A853",
  },
  {
    symbol: "D",
    name: "Data",
    nameEn: "Data",
    nameTh: "ข้อมูล / ความเป็นจริง",
    descEn: "Facts and context currently available — retrieved from RCTDB, external APIs, or context window. What the system actually knows right now.",
    descTh: "ข้อเท็จจริงและ Context ที่มีอยู่ปัจจุบัน — ดึงมาจาก RCTDB, API ภายนอก หรือ Context Window สิ่งที่ระบบรู้จริงๆ ขณะนี้",
    color: "#7B9E87",
  },
  {
    symbol: "Δ",
    name: "Delta",
    nameEn: "Delta (Gap)",
    nameTh: "เดลต้า (ช่องว่าง)",
    descEn: "The gap or desired change between current state and goal (Δ = I − D). Drives agent assembly — large delta signals need for specialist agents.",
    descTh: "ช่องว่างหรือการเปลี่ยนแปลงที่ต้องการระหว่างสถานะปัจจุบันและเป้าหมาย (Δ = I − D) ขับเคลื่อนการ Assembly ของ Agent",
    color: "#C4745B",
  },
  {
    symbol: "A",
    name: "Approach",
    nameEn: "Approach",
    nameTh: "แนวทาง",
    descEn: "The algorithm or strategy to apply — chosen by the assembled agents to close the delta. Documented in the JITNA packet for full auditability.",
    descTh: "Algorithm หรือกลยุทธ์ที่จะใช้ — เลือกโดย Agent ที่ถูก Assemble เพื่อปิด Delta บันทึกใน JITNA Packet เพื่อ Auditability เต็มรูปแบบ",
    color: "#89B4C8",
  },
  {
    symbol: "R",
    name: "Reflection",
    nameEn: "Reflection",
    nameTh: "บทเรียน",
    descEn: "Lessons learned, feedback, or post-execution review — SignedAI consensus scores across 8 dimensions. Informs whether the approach succeeded.",
    descTh: "บทเรียน, Feedback หรือการรีวิวหลังดำเนินการ — คะแนน Consensus ของ SignedAI ใน 8 มิติ บอกว่า Approach ประสบความสำเร็จหรือไม่",
    color: "#B8A9C9",
  },
  {
    symbol: "M",
    name: "Memory",
    nameEn: "Memory",
    nameTh: "สิ่งที่ต้องจำ",
    descEn: "Long-term context persisted across sessions — routing history, outcome quality, and learned patterns stored in RCTDB 7D. What enables continuous self-improvement.",
    descTh: "บริบทระยะยาวที่เก็บรักษาระหว่าง Session — ประวัติ, คุณภาพผลลัพธ์ และรูปแบบที่เรียนรู้ใน RCTDB 7D สิ่งที่ทำให้เกิดการปรับปรุงตัวเองอย่างต่อเนื่อง",
    color: "#9B7BB8",
  },
]

const threeLayerArchitecture = [
  {
    layer: "1",
    nameEn: "Protocol (RFC-001 v2.0)",
    nameTh: "Layer 1 — Protocol",
    roleEn: "Wire format for AI-to-AI communication",
    roleTh: "รูปแบบการสื่อสาร AI-to-AI",
    descEn: "The JITNAPacket — header + intent + payload + validation. Secured by Ed25519 signatures (RFC 8032) and governed by The 9 Codex safety rules.",
    descTh: "JITNAPacket — header + intent + payload + validation รักษาความปลอดภัยด้วยลายเซ็น Ed25519 (RFC 8032) และอยู่ภายใต้กฎ The 9 Codex",
    color: "#D4A853",
    file: "rct_control_plane/jitna_protocol.py",
  },
  {
    layer: "2",
    nameEn: "Language (6-field templates)",
    nameTh: "Layer 2 — Language",
    roleEn: "Structured intent communication format",
    roleTh: "รูปแบบการสื่อสาร Intent ที่มีโครงสร้าง",
    descEn: "The I / D / Δ / A / R / M schema — used for prompts, memory tagging, vault metadata, and RCTDB commits. 50+ workflow templates available.",
    descTh: "Schema I / D / Δ / A / R / M — ใช้สำหรับ Prompt, Memory Tagging, Vault Metadata และ RCTDB Commit มี Template มากกว่า 50 รูปแบบ",
    color: "#7B9E87",
    file: "50+ workflow templates",
  },
  {
    layer: "3",
    nameEn: "Intake (user-facing)",
    nameTh: "Layer 3 — Intake",
    roleEn: "Simplified front-door for user intent",
    roleTh: "ประตูทางเข้าที่เรียบง่ายสำหรับ Intent ของผู้ใช้",
    descEn: "The user-facing JITNAPacket — takes a plain intent string + context dict, computes content hash for replay integrity, and dispatches to the engine.",
    descTh: "JITNAPacket สำหรับผู้ใช้ — รับ intent string ธรรมดา + context dict คำนวณ Content Hash สำหรับ Replay Integrity และส่งไปยัง Engine",
    color: "#C4745B",
    file: "microservices/intent-loop/loop_engine.py",
  },
]

const negotiationSteps = [
  { msg: "PROPOSE", fromEn: "Agent A → Agent B", descEn: '"I need you to analyze this dataset"', descTh: '"ขอให้ช่วยวิเคราะห์ Dataset นี้"', color: "#D4A853" },
  { msg: "COUNTER", fromEn: "Agent B → Agent A", descEn: '"I can do it, but I need the schema first"', descTh: '"ทำได้ แต่ต้องการ Schema ก่อน"', color: "#7B9E87" },
  { msg: "ACCEPT", fromEn: "Agent A → Agent B", descEn: '"Here is the schema" [attaches schema]', descTh: '"นี่คือ Schema" [แนบ Schema]', color: "#89B4C8" },
  { msg: "COMPLETE", fromEn: "Agent B → Agent A", descEn: '"Analysis complete" [results + Ed25519 signature]', descTh: '"วิเคราะห์เสร็จแล้ว" [ผลลัพธ์ + ลายเซ็น Ed25519]', color: "#B8A9C9" },
]

const comparisonRows = [
  { dim: "Communication model", tool: "Request → Response", jitna: "PROPOSE → COUNTER → ACCEPT/REJECT" },
  { dim: "Agent autonomy", tool: "None (tools are passive)", jitna: "Full (agents can negotiate and refuse)" },
  { dim: "Verification", tool: "None built-in", jitna: "Ed25519 signed packets" },
  { dim: "Replay support", tool: "Not supported", jitna: "SHA-256 checkpoint chain" },
  { dim: "Multi-agent consensus", tool: "Not supported", jitna: "SignedAI integration (Tier S/4/6/8)" },
  { dim: "Discovery", tool: "Hardcoded list", jitna: "Dynamic registry with capability matching" },
  { dim: "Standardization", tool: "Vendor-specific", jitna: "Open RFC (Apache 2.0)" },
]

export default function JitnaClient({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname()
  const isTh = (propLocale ?? getLocaleFromPathname(pathname) ?? "en") === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#C4745B15", borderColor: "#C4745B30", color: "#C4745B" }}>
            <Network className="w-4 h-4" /> RFC-001 v2.0 — Open Protocol
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            JITNA Protocol
          </h1>
          <p className="text-xl font-semibold" style={{ color: "#D4A853" }}>
            {isTh ? '"HTTP ของ Agentic AI"' : '"The HTTP of Agentic AI"'}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Just In Time Nodal Assembly — โปรโตคอลการสื่อสารแบบเปิดที่กำหนดวิธีที่ AI Agent ค้นหา, เจรจา และดำเนินงานร่วมกัน โดยไม่มีลำดับชั้นถาวร — Assemble เมื่อจำเป็น, ยุบเมื่อเสร็จ"
              : "Just In Time Nodal Assembly — the open communication protocol that defines how AI agents discover, negotiate, and execute work together — assembled just in time, dissolved when done."}
          </p>
        </div>
      </section>

      {/* What JITNA is */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">{isTh ? "JITNA คืออะไร?" : "What is JITNA?"}</h2>
          <p>
            {isTh
              ? "JITNA (Just In Time Nodal Assembly) คือโปรโตคอลการสื่อสารแบบเปิดที่กำหนดวิธีที่ AI Agent ค้นหากันเอง, เจรจา Task, ดำเนินการ และตรวจสอบผลลัพธ์ — โดยไม่มีลำดับชั้น Agent ถาวรหรือ Workflow ที่กำหนดไว้ล่วงหน้า"
              : "JITNA (Just In Time Nodal Assembly) is an open communication protocol defining how AI agents discover each other, negotiate tasks, execute work, and verify results — without any permanent agent hierarchy or pre-configured workflows."}
          </p>
          <p>
            {isTh
              ? "แรงบันดาลใจมาจาก HTTP ในวิศวกรรมเว็บ — HTTP กำหนดวิธีที่ Client สื่อสารกับ Server ในลักษณะ Stateless ในทำนองเดียวกัน JITNA กำหนดวิธีที่ AI Agent สื่อสารและประสานงานกันในลักษณะ Stateless Agent จะถูก Assemble เป็น Working Group ทันทีตาม Intent ของ Task ปัจจุบัน จากนั้น Dissolve เมื่อ Task เสร็จสิ้น"
              : "Inspired by HTTP in web engineering — HTTP defines how clients communicate with servers in a stateless way. Similarly, JITNA defines how AI agents communicate and coordinate in a stateless way. Agents are assembled into working groups just in time based on the intent of the current task, then dissolved when it completes."}
          </p>
          <p>
            {isTh
              ? "JITNA ไม่ใช่ไฟล์หรือคลาสเดียว — มันเป็นระบบ 3 ชั้นที่แต่ละชั้นมีบทบาทที่ชัดเจน: Protocol (Wire Format), Language (6-Field Schema) และ Intake (User-Facing)"
              : "JITNA is not a single file or class — it is a three-layer system where each layer has a distinct role: Protocol (wire format), Language (6-field schema), and Intake (user-facing)."}
          </p>
        </div>
      </section>

      {/* 3-Layer Architecture */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Layers className="w-3 h-3" /> Three-Layer Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "สถาปัตยกรรม 3 ชั้น" : "Three-Layer Architecture"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "JITNA แบ่งออกเป็น 3 ชั้นที่ชัดเจน — แต่ละชั้นมีหน้าที่และไฟล์ Implementation ของตัวเอง"
              : "JITNA is divided into 3 distinct layers — each with its own responsibility and implementation file."}
          </p>
        </div>
        <div className="space-y-4">
          {threeLayerArchitecture.map((layer) => (
            <div key={layer.layer}
              className="p-6 rounded-xl border border-border bg-card flex flex-col sm:flex-row gap-5">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl text-xl font-bold font-mono"
                style={{ backgroundColor: `${layer.color}18`, color: layer.color }}>
                {layer.layer}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-foreground">{isTh ? layer.nameTh : layer.nameEn}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: `${layer.color}12`, color: layer.color }}>
                    {isTh ? layer.roleTh : layer.roleEn}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-2">{isTh ? layer.descTh : layer.descEn}</p>
                <span className="text-xs font-mono text-muted-foreground/60">{layer.file}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 JITNA Language Fields */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4"
              style={{ backgroundColor: "#C4745B15", borderColor: "#C4745B30", color: "#C4745B" }}>
              <Layers className="w-3 h-3" /> Layer 2 — JITNA Language
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {isTh ? "6 Fields ของ JITNA Language" : "6 JITNA Language Fields"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              {isTh
                ? "Schema มาตรฐาน 6 Fields สำหรับแสดง Intent — ใช้ใน Prompt, Memory Tagging, Vault Metadata และ RCTDB Commit"
                : "The canonical 6-field schema for structuring any intent — used in prompts, memory tagging, vault metadata, and RCTDB commits."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jitnaLanguageFields.map((p) => (
              <div key={p.symbol}
                className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold font-mono"
                    style={{ backgroundColor: `${p.color}18`, color: p.color }}>{p.symbol}</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">{isTh ? p.nameTh : p.nameEn}</div>
                    <div className="text-xs font-mono" style={{ color: p.color }}>{p.name}</div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{isTh ? p.descTh : p.descEn}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl border border-border bg-background/60 text-center">
            <p className="text-xs text-muted-foreground font-mono">
              {isTh
                ? "JITNA Language: Δ = I − D → เลือก A → Execute → R → อัปเดต M"
                : "JITNA Language: Δ = I − D → select A → Execute → R → update M"}
            </p>
          </div>
        </div>
      </section>

      {/* Negotiation Pattern */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "รูปแบบการเจรจา (Negotiation Pattern)" : "The Negotiation Pattern"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "JITNA Agent ไม่ได้ดำเนินการตามคำสั่งแบบตาบอด — พวกเขา เจรจา ก่อน และสามารถปฏิเสธงานที่ไม่อยู่ใน Domain ได้"
              : "JITNA agents do not blindly execute — they negotiate. Agents can counter-propose and refuse tasks outside their domain."}
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {negotiationSteps.map((step) => (
            <div key={step.msg} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <span className="shrink-0 px-2.5 py-1 rounded-md text-xs font-bold font-mono"
                style={{ backgroundColor: `${step.color}18`, color: step.color }}>{step.msg}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground font-mono mb-1">{step.fromEn}</div>
                <div className="text-sm text-foreground">{isTh ? step.descTh : step.descEn}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JITNA vs Tool-Calling APIs */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            {isTh ? "JITNA vs Tool-Calling APIs" : "JITNA vs Tool-Calling APIs"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">{isTh ? "มิติ" : "Dimension"}</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Tool-Calling APIs</th>
                  <th className="text-left p-3 font-bold" style={{ color: "#D4A853" }}>JITNA Protocol</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.dim} className={i % 2 === 0 ? "bg-card/40" : ""}>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{row.dim}</td>
                    <td className="p-3 text-xs text-muted-foreground">{row.tool}</td>
                    <td className="p-3 text-xs font-medium text-foreground">{row.jitna}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "3", label: isTh ? "ชั้น Architecture" : "Architecture Layers", color: "#D4A853" },
            { value: "Ed25519", label: isTh ? "ลายเซ็นรักษาความปลอดภัย" : "Packet Security", color: "#7B9E87" },
            { value: "9", label: isTh ? "กฎ The 9 Codex" : "Codex Safety Rules", color: "#C4745B" },
            { value: "Apache 2.0", label: isTh ? "สัญญาอนุญาต" : "Open License", color: "#89B4C8" },
          ].map((s) => (
            <div key={s.label}
              className="p-5 rounded-2xl border border-border bg-card text-center">
              <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* RFC Reference */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={18} className="text-warm-amber" />
            <span className="text-sm font-bold font-mono text-foreground">JITNA RFC-001 v2.0 — Open Standard</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {isTh
              ? "RFC-001 คือข้อกำหนดเปิดที่ระบุ: โครงสร้าง JITNAPacket, ประเภทข้อความ (PROPOSE/COUNTER/ACCEPT/REJECT/COMPLETE), กลไกความปลอดภัย Ed25519, กฎ The 9 Codex และข้อกำหนด Adapter Interface สำหรับการ Integration กับระบบอื่น"
              : "RFC-001 is the open specification defining: JITNAPacket structure, message types (PROPOSE/COUNTER/ACCEPT/REJECT/COMPLETE), Ed25519 security mechanism, The 9 Codex rules, and Adapter Interface requirements for integration with other systems."}
          </p>
          <div className="flex gap-3">
            <Link href="/open-protocol" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-amber text-white text-xs font-semibold">
              {isTh ? "Open Protocol" : "Open Protocol"} <ArrowRight size={12} />
            </Link>
            <Link href="/technology/signed-ai" className="inline-flex items-center px-4 py-2 rounded-lg border border-border text-foreground text-xs font-semibold">
              {isTh ? "SignedAI (Tier Consensus)" : "SignedAI Consensus"}
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/genome", icon: "🧬", label: "G3 JITNA Genome", desc: isTh ? "JITNA ใน Context ของ 7 Genome System" : "JITNA in the 7 Genome System context" },
            { href: "/technology/rct-7", icon: "🧠", label: "RCT-7 / IntentLoop", desc: isTh ? "JITNA Assembly รันใน IntentLoop Cycle" : "JITNA assembly runs inside IntentLoop cycles" },
            { href: "/technology/constitutional-ai", icon: "⚖️", label: "Constitutional AI", desc: isTh ? "The 9 Codex ควบคุม JITNA packet ทุกตัว" : "The 9 Codex governs every JITNA packet" },
            { href: "/technology/signed-ai", icon: "✍️", label: "SignedAI", desc: isTh ? "SignedAI ให้ Consensus Verification สำหรับ High-Tier JITNA" : "SignedAI provides consensus verification for high-tier JITNA tasks" },
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

