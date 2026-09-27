"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { useMounted } from "@/hooks/use-mounted"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { FileText, ArrowRight } from "lucide-react"
import JITNAFlowchart from "@/components/diagrams/jitna-flowchart"
import SectionHeading from "@/components/section-heading"
import OptimizedImage from "@/components/ui/optimized-image"
import { pixelIcons } from "@/lib/pixel-icons"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { SITE_HALLUCINATION_RATE } from "@/lib/site-config"

const PIXEL_JITNA = pixelIcons.jitna

const primitives = [
  {
    letter: "I", color: "#D4A853",
    nameEn: "Intent", nameTh: "Intent (เจตนา)",
    descEn: "The original query or goal — what the user wants to achieve. Intent is the starting point of every JITNA packet.",
    descTh: "คำถามหรือเป้าหมายเดิม — สิ่งที่ผู้ใช้ต้องการบรรลุ Intent คือจุดเริ่มต้นของทุก JITNA Packet",
    exampleEn: "'Build a login system'",
    exampleTh: "'สร้างระบบ Login'",
  },
  {
    letter: "D", color: "#7B9E87",
    nameEn: "Data", nameTh: "Data (ข้อมูล)",
    descEn: "Crystallized keywords and structured data extracted from the intent. Data provides the factual foundation.",
    descTh: "Keywords ที่ผลึกและข้อมูลที่มีโครงสร้างที่สกัดจาก Intent ข้อมูลให้รากฐานที่เป็นข้อเท็จจริง",
    exampleEn: "['authentication', 'JWT', 'security']",
    exampleTh: "['authentication', 'JWT', 'security']",
  },
  {
    letter: "Δ", color: "#89B4C8",
    nameEn: "Delta", nameTh: "Delta (การสังเคราะห์)",
    descEn: "Compressed synthesis — the insight or compressed understanding. Delta represents the 'aha moment' of processing.",
    descTh: "การสังเคราะห์ที่บีบอัด — ข้อมูลเชิงลึกหรือความเข้าใจที่บีบอัด Delta แสดงถึง 'ช่วงเวลาที่เข้าใจ' ของการประมวลผล",
    exampleEn: "'Secure token-based auth with refresh'",
    exampleTh: "'Auth แบบ Token ที่ปลอดภัยพร้อม Refresh'",
  },
  {
    letter: "A", color: "#B8A9C9",
    nameEn: "Approach", nameTh: "Approach (แนวทาง)",
    descEn: "The execution strategy — how to accomplish the intent. Approach defines the methodology and tools.",
    descTh: "กลยุทธ์การดำเนินการ — วิธีการบรรลุ Intent Approach กำหนดวิธีการและเครื่องมือ",
    exampleEn: "'Use JWT + bcrypt + Redis'",
    exampleTh: "'ใช้ JWT + bcrypt + Redis'",
  },
  {
    letter: "R", color: "#C4745B",
    nameEn: "Reflection", nameTh: "Reflection (การไตร่ตรอง)",
    descEn: "Self-assessment and quality check — did we achieve the intent? Reflection ensures accuracy and alignment.",
    descTh: "การประเมินตนเองและตรวจสอบคุณภาพ — เราบรรลุ Intent หรือไม่? Reflection รับประกันความแม่นยำและการสอดคล้อง",
    exampleEn: "'Converged after 3 iterations, 96% confidence'",
    exampleTh: "'Converged หลัง 3 รอบ, ความมั่นใจ 96%'",
  },
  {
    letter: "M", color: "#D4A853",
    nameEn: "Memory", nameTh: "Memory (ความทรงจำ)",
    descEn: "Context preservation — what should be remembered for future interactions. Memory enables learning and continuity.",
    descTh: "การรักษา Context — สิ่งที่ควรจดจำสำหรับการโต้ตอบในอนาคต Memory ทำให้เกิดการเรียนรู้และความต่อเนื่อง",
    exampleEn: "'User prefers JWT, security-first approach'",
    exampleTh: "'ผู้ใช้ชอบ JWT, แนวทางที่เน้นความปลอดภัย'",
  },
]

const useCases = [
  {
    titleEn: "Multi-Agent Coordination",
    titleTh: "การประสานงาน Multi-Agent",
    descEn: "Multiple AI agents negotiate and reach consensus using JITNA packets. Each agent proposes, counters, and verifies until consensus is achieved.",
    descTh: "AI Agents หลายตัวเจรจาและบรรลุฉันทามติโดยใช้ JITNA Packets แต่ละ Agent เสนอ โต้แย้ง และตรวจสอบจนกว่าจะบรรลุฉันทามติ",
    metricEn: "96.1% consensus accuracy",
    metricTh: "ความแม่นยำฉันทามติ 96.1%",
  },
  {
    titleEn: "Hallucination Prevention",
    titleTh: "การป้องกัน Hallucination",
    descEn: `JITNA's Reflection primitive enables self-verification. Agents check their own outputs against intent before delivery, targeting a hallucination rate of ${SITE_HALLUCINATION_RATE}.`,
    descTh: `Reflection Primitive ของ JITNA ทำให้เกิด Self-Verification Agents ตรวจสอบผลลัพธ์ของตนเองกับ Intent ก่อนส่งมอบ มีเป้าหมาย hallucination rate ${SITE_HALLUCINATION_RATE}`,
    metricEn: `${SITE_HALLUCINATION_RATE} hallucination rate`,
    metricTh: `อัตรา Hallucination ${SITE_HALLUCINATION_RATE}`,
  },
  {
    titleEn: "Context Preservation",
    titleTh: "การรักษา Context",
    descEn: "The Memory primitive stores conversation context across sessions. Users don't need to repeat themselves — the system remembers preferences and history.",
    descTh: "Memory Primitive เก็บ Context การสนทนาข้ามเซสชัน ผู้ใช้ไม่ต้องพูดซ้ำ — ระบบจดจำความชอบและประวัติ",
    metricEn: "< 200ms latency",
    metricTh: "Latency < 200ms",
  },
  {
    titleEn: "Cross-Platform Integration",
    titleTh: "การรวม Cross-Platform",
    descEn: "JITNA works across Slack, Discord, Web, Mobile, and APIs. The same packet structure enables seamless communication regardless of platform.",
    descTh: "JITNA ทำงานข้าม Slack, Discord, Web, Mobile และ APIs โครงสร้าง Packet เดียวกันทำให้การสื่อสารราบรื่นไม่ว่าจะเป็นแพลตฟอร์มใด",
    metricEn: "10+ platforms supported",
    metricTh: "รองรับ 10+ แพลตฟอร์ม",
  },
]

const specs = [
  { labelEn: "Protocol Version", labelTh: "เวอร์ชัน Protocol", value: "RFC-001 v2.0" },
  { labelEn: "Packet Format", labelTh: "รูปแบบ Packet", value: "JSON-LD" },
  { labelEn: "Latency", labelTh: "Latency", value: "< 200ms" },
  { labelEn: "Accuracy (design target)", labelTh: "ความแม่นยำ (เป้าหมาย)", value: "96.1%" },
  { labelEn: "Hallucination Rate (target)", labelTh: "อัตรา Hallucination (เป้าหมาย)", value: "<0.3%" },
  { labelEn: "License", labelTh: "ใบอนุญาต", value: "Apache 2.0" },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "JITNA RFC-001 — Universal AI Intent Communication Protocol",
  "description": "Just-In-Time Nodal Assembly — the HTTP of the Agentic AI world. 6 Primitives enabling real-time cognitive assembly across multi-agent systems.",
  "author": { "@type": "Organization", "name": "RCT Ecosystem" },
}

export default function JitnaClient() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#0D0D0D" : "#FAF6F0"
  const cardBg = isDark ? "#1E1E1E" : "#FAF6F0"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
        <section className="sr-only">
          <p>
            {isEn
              ? "JITNA (Just-In-Time Nodal Assembly) RFC-001 is the routing and cognitive assembly protocol at the core of the RCT Ecosystem — 6 primitives (Intent, Data, Delta, Approach, Reflection, Memory) enabling sub-50ms multi-agent task routing across 41 algorithms and 9 algorithm tiers."
              : "JITNA (Just-In-Time Nodal Assembly) RFC-001 คือโปรโตคอล routing และ cognitive assembly ที่เป็นแกนกลางของ RCT Ecosystem — 6 primitives (Intent, Data, Delta, Approach, Reflection, Memory) เปิดใช้ multi-agent task routing ใต้ 50ms ข้าม 41 algorithms และ 9 algorithm tier"}
          </p>
        </section>

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#D4A853", borderColor: "rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.07)" }}>
              <FileText size={14} /> JITNA Protocol
            </m.div>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              JITNA <span style={{ color: "#D4A853" }}>RFC-001</span>
            </m.h1>
            <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-8" style={{ color: textSecondary }}>
              {isEn
                ? "Just-In-Time Nodal Assembly — the 'HTTP of the Agentic AI world'. 6 Primitives enabling real-time cognitive assembly across multi-agent systems."
                : "Just-In-Time Nodal Assembly — 'HTTP แห่งโลก Agentic AI' มี 6 Primitives สำหรับ Real-time Cognitive Assembly ข้าม Multi-Agent Systems"}
            </m.p>
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3">
              {[
                { v: "96.1%", l: isEn ? "Consensus Accuracy (target)" : "ความแม่นยำฉันทามติ (เป้าหมาย)" },
                { v: "<0.3%", l: isEn ? "Hallucination Rate (target)" : "อัตรา Hallucination (เป้าหมาย)" },
                { v: "< 200ms", l: isEn ? "Packet Latency" : "Latency ของ Packet" },
              ].map((stat) => (
                <div key={stat.v} className="px-5 py-3 rounded-xl border text-center" style={{ background: isDark ? "#1E1E1E" : "white", borderColor: cardBorder }}>
                  <div className="text-xl font-bold" style={{ color: "#D4A853" }}>{stat.v}</div>
                  <div className="text-xs" style={{ color: textSecondary }}>{stat.l}</div>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              tag={isEn ? "Interactive Runtime" : "Interactive Runtime"}
              tagColor="sage"
              title={isEn ? "See the JITNA Lifecycle" : "ดูวงจรการทำงานของ JITNA"}
              italicWord="JITNA"
              description={isEn ? "Move from packet theory to protocol behavior. This interactive block exposes the real runtime stages, negotiation flow, and quality loop used by the system." : "เปลี่ยนจากการอธิบาย packet theory ไปสู่พฤติกรรมของโปรโตคอลจริง บล็อกนี้แสดง runtime stages, negotiation flow และ quality loop ที่ระบบใช้จริง"}
              pixelIcon={PIXEL_JITNA}
            />

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: isEn ? "Primitives" : "Primitives",
                  value: "I / D / Δ / A / R / M",
                  desc: isEn ? "Intent, Data, Delta, Approach, Reflection, Memory" : "Intent, Data, Delta, Approach, Reflection, Memory",
                },
                {
                  label: isEn ? "Negotiation" : "Negotiation",
                  value: isEn ? "Auditable" : "Auditable",
                  desc: isEn ? "Each transition can be reviewed as part of a signed reasoning path." : "แต่ละการเปลี่ยนสถานะสามารถตรวจสอบย้อนหลังได้เป็น signed reasoning path",
                },
                {
                  label: isEn ? "Delivery" : "Delivery",
                  value: isEn ? "Adaptive" : "Adaptive",
                  desc: isEn ? "Output format changes with context, constraints, and confidence." : "รูปแบบผลลัพธ์ปรับตาม context, constraints และระดับความมั่นใจ",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border p-4" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7B9E87" }}>{item.label}</div>
                  <div className="mt-1 text-base font-bold" style={{ color: textPrimary }}>{item.value}</div>
                  <div className="mt-1 text-sm leading-relaxed" style={{ color: textSecondary }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
              <JITNAFlowchart language={isEn ? "en" : "th"} />
            </m.div>
          </div>
        </section>

        {/* 6 Primitives */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "The 6 " : "6 "}<span style={{ color: "#D4A853" }}>Primitives</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "JITNA uses 6 core primitives (I, D, Δ, A, R, M) to encode intent, data, synthesis, approach, reflection, and memory into a universal packet structure."
                  : "JITNA ใช้ 6 Primitives หลัก (I, D, Δ, A, R, M) เพื่อเข้ารหัส Intent, Data, Synthesis, Approach, Reflection และ Memory เป็น Packet Structure สากล"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {primitives.map((prim, i) => (
                <m.div key={prim.letter} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold font-mono"
                      style={{ background: `${prim.color}15`, color: prim.color }}>
                      {prim.letter}
                    </div>
                    <h3 className="font-bold text-sm" style={{ color: textPrimary }}>
                      {isEn ? prim.nameEn : prim.nameTh}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: textSecondary }}>
                    {isEn ? prim.descEn : prim.descTh}
                  </p>
                  <div className="p-2.5 rounded-lg text-xs font-mono" style={{ background: isDark ? "#141414" : "white", color: isDark ? "#888" : "#6B6B6B" }}>
                    {isEn ? prim.exampleEn : prim.exampleTh}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* JITNA vs Traditional */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3" style={{ color: textPrimary }}>
                JITNA vs <span style={{ color: "#89B4C8" }}>{isEn ? "Traditional APIs" : "Traditional APIs"}</span>
              </h2>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <m.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="p-6 rounded-2xl border" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
                <h3 className="text-base font-bold mb-4" style={{ color: textPrimary }}>
                  {isEn ? "Traditional REST/GraphQL" : "REST/GraphQL แบบดั้งเดิม"}
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: textSecondary }}>
                  <li>❌ {isEn ? "Fixed endpoints and schemas" : "Endpoints และ Schemas ที่ตายตัว"}</li>
                  <li>❌ {isEn ? "No intent understanding" : "ไม่เข้าใจ Intent"}</li>
                  <li>❌ {isEn ? "Manual error handling" : "จัดการ Error ด้วยตนเอง"}</li>
                  <li>❌ {isEn ? "No built-in verification" : "ไม่มี Verification ในตัว"}</li>
                  <li>❌ {isEn ? "Stateless by default" : "Stateless โดยค่าเริ่มต้น"}</li>
                </ul>
              </m.div>
              <m.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="p-6 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                <h3 className="text-base font-bold mb-4" style={{ color: textPrimary }}>
                  JITNA Protocol (RFC-001)
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: textSecondary }}>
                  <li>✅ {isEn ? "Intent-driven communication" : "การสื่อสารที่ขับเคลื่อนด้วย Intent"}</li>
                  <li>✅ {isEn ? "Self-describing packets" : "Packets ที่อธิบายตัวเอง"}</li>
                  <li>✅ {isEn ? "Built-in quality reflection" : "Reflection คุณภาพในตัว"}</li>
                  <li>✅ {isEn ? "Cryptographic verification" : "การตรวจสอบด้วย Cryptography"}</li>
                  <li>✅ {isEn ? "Context-aware by design" : "ตระหนักถึง Context โดยการออกแบบ"}</li>
                </ul>
              </m.div>
            </div>
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mt-6 overflow-hidden rounded-2xl border" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#C4745B" }}>{isEn ? "Protocol Surface" : "Protocol Surface"}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: textPrimary }}>{isEn ? "From static API calls to intent-aware packets" : "จาก static API calls สู่ intent-aware packets"}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                    {isEn ? "Traditional APIs move data. JITNA moves negotiated intent with reflection, memory, and structure preserved in the packet itself." : "Traditional APIs ขนส่งข้อมูล แต่ JITNA ขนส่ง intent ที่ผ่านการเจรจาแล้ว พร้อม reflection, memory และโครงสร้างที่ฝังอยู่ใน packet"}
                  </p>
                </div>
                <div className="border-t p-6 md:border-l md:border-t-0" style={{ borderColor: cardBorder }}>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 shrink-0">
                      <OptimizedImage src={PIXEL_JITNA} alt="" pixelated containerClassName="h-full w-full" objectFit="contain" width={48} height={48} />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: textPrimary }}>{isEn ? "Self-describing packet model" : "Self-describing packet model"}</div>
                      <div className="text-xs" style={{ color: textSecondary }}>{isEn ? "The protocol carries context and verification metadata together." : "โปรโตคอลพกทั้ง context และ verification metadata ไปพร้อมกัน"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3" style={{ color: textPrimary }}>
                {isEn ? "Real-World " : "กรณีการใช้งาน"}<span style={{ color: "#C4745B" }}>{isEn ? "Use Cases" : "จริง"}</span>
              </h2>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {useCases.map((uc, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <h3 className="text-base font-bold mb-2" style={{ color: textPrimary }}>
                    {isEn ? uc.titleEn : uc.titleTh}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: textSecondary }}>
                    {isEn ? uc.descEn : uc.descTh}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: isDark ? "#141414" : "rgba(123,158,135,0.1)", color: "#7B9E87" }}>
                    {isEn ? uc.metricEn : uc.metricTh}
                  </span>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl border" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Technical " : "ข้อมูลจำเพาะทาง"}<span style={{ color: "#7B9E87" }}>Specifications</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {specs.map((spec, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ background: isDark ? "#151515" : "#FAF6F0" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: isDark ? "#888" : "#6B6B6B" }}>
                      {isEn ? spec.labelEn : spec.labelTh}
                    </div>
                    <div className="text-base font-bold font-mono" style={{ color: textPrimary }}>{spec.value}</div>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl" style={{ background: isDark ? "#151515" : "#FAF6F0" }}>
                <h3 className="text-sm font-bold mb-2" style={{ color: textPrimary }}>
                  {isEn ? "Why 'The HTTP of Agentic AI'?" : "ทำไมถึงเป็น 'HTTP ของ Agentic AI'?"}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                  {isEn
                    ? "Just as HTTP standardized web communication, JITNA standardizes AI agent communication. It's a universal protocol any AI system can adopt, enabling interoperability across platforms, models, and vendors. JITNA packets are self-describing, verifiable, and context-aware — making them the foundation for next-generation AI systems."
                    : "เช่นเดียวกับที่ HTTP ทำให้การสื่อสารเว็บเป็นมาตรฐาน JITNA ทำให้การสื่อสาร AI Agent เป็นมาตรฐาน เป็น Protocol สากลที่ระบบ AI ใดก็ตามสามารถนำมาใช้ได้ ทำให้เกิด Interoperability ข้ามแพลตฟอร์ม โมเดล และผู้ขาย"}
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4" style={{ background: bg }}>
          <div className="max-w-2xl mx-auto text-center">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Explore the JITNA Ecosystem" : "สำรวจ JITNA Ecosystem"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/protocols/rct-7-mental-model"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#D4A853" }}>
                  {isEn ? "RCT-7 Mental Model" : "RCT-7 Mental Model"} <ArrowRight size={16} />
                </Link>
                <Link href="/protocols/fdia-equation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  FDIA Equation
                </Link>
              </div>
            </m.div>
          </div>
        </section>

      </main>

      {/* E-E-A-T + Internal Links */}
      <section className="py-14 px-4" style={{ background: bg2 }}>
        <div className="max-w-3xl mx-auto space-y-10">
          <RelatedContent
            title={isEn ? "Related Resources" : "แหล่งข้อมูลที่เกี่ยวข้อง"}
            items={[
              {
                title: isEn ? "FDIA Equation" : "สมการ FDIA",
                description: isEn
                  ? "The mathematical foundation behind intent-gating in RCT's architecture."
                  : "รากฐานทางคณิตศาสตร์เบื้องหลัง Intent-Gating ในสถาปัตยกรรม RCT",
                href: "/protocols/fdia-equation",
                category: isEn ? "Protocol" : "โปรโตคอล",
              },
              {
                title: isEn ? "AI Hallucination Prevention" : "การป้องกัน AI Hallucination",
                description: isEn
                  ? "How SignedAI consensus targets a hallucination rate under 0.3%."
                  : "SignedAI Consensus มีเป้าหมาย Hallucination ต่ำกว่า 0.3% ได้อย่างไร",
                href: "/solutions/ai-hallucination-prevention",
                category: isEn ? "Solution" : "โซลูชัน",
              },
              {
                title: isEn ? "RCT-7 Mental Model" : "RCT-7 Mental Model",
                description: isEn
                  ? "The 7-genome subsystem model and HexaCore decision architecture."
                  : "โมเดล 7-Genome Subsystem และ HexaCore Decision Architecture",
                href: "/protocols/rct-7-mental-model",
                category: isEn ? "Protocol" : "โปรโตคอล",
              },
            ]}
          />
          <AuthorBlock authorSlug="ittirit-saengow" locale={locale} />
        </div>
      </section>

      <Footer />
    </>
  )
}
