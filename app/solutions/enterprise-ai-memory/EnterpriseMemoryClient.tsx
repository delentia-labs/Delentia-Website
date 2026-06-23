"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useMounted } from "@/hooks/use-mounted"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Brain, Database, HardDrive, Network, ArrowRight } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"
import RelatedContent from "@/components/related-content"
import AuthorBlock from "@/components/author-block"

const dbLayers = [
  {
    icon: HardDrive, color: "#C4745B",
    nameEn: "Vector Layer", nameTh: "Vector Layer",
    descEn: "High-dimensional embedding storage for semantic search and similarity matching across all AI interactions.",
    descTh: "จัดเก็บ Embedding หลายมิติสำหรับ Semantic Search และ Similarity Matching ข้ามทุก AI Interactions",
  },
  {
    icon: Network, color: "#7B9E87",
    nameEn: "Graph Layer", nameTh: "Graph Layer",
    descEn: "Relationship mapping between entities, concepts, and contexts — enabling complex reasoning chains and knowledge graphs.",
    descTh: "การแมปความสัมพันธ์ระหว่าง Entities, Concepts และ Contexts — เปิดใช้งาน Reasoning Chains และ Knowledge Graphs ที่ซับซ้อน",
  },
  {
    icon: Database, color: "#D4A853",
    nameEn: "SQL Layer", nameTh: "SQL Layer",
    descEn: "Structured data storage for metadata, configurations, audit trails, and transactional records with ACID compliance.",
    descTh: "จัดเก็บข้อมูลเชิงโครงสร้างสำหรับ Metadata, Configurations, Audit Trails และ Transactional Records ที่เป็นไปตาม ACID",
  },
]

const dimensions = [
  { dim: "1D", nameEn: "Identity", nameTh: "Identity", descEn: "Persistent entity identifier and ownership metadata — who owns this memory and which agent created it.", descTh: "ตัวระบุ Entity และ Metadata ความเป็นเจ้าของ" },
  { dim: "2D", nameEn: "Sovereignty", nameTh: "Sovereignty", descEn: "Data ownership, access rights, and consent flags — enforcing Constitutional AI constraints at the storage layer.", descTh: "สิทธิ์ความเป็นเจ้าของข้อมูล สิทธิ์การเข้าถึง และ Constitutional AI" },
  { dim: "3D", nameEn: "Context", nameTh: "Context", descEn: "Situational and environmental context — session origin, locale, active agent, and conversation thread.", descTh: "บริบทเชิงสถานการณ์ — เซสชัน, Locale, Agent และ Thread" },
  { dim: "4D", nameEn: "Payload", nameTh: "Payload", descEn: "The actual content — text, embeddings, structured data, and media references stored in the memory item.", descTh: "เนื้อหาจริง — ข้อความ, Embeddings, ข้อมูลเชิงโครงสร้าง และสื่อ" },
  { dim: "5D", nameEn: "Value", nameTh: "Value", descEn: "Importance score, decay rate, and retrieval priority — determines how long a memory persists and when it fades.", descTh: "คะแนนความสำคัญ อัตราการลดคุณค่า และลำดับความสำคัญการ Recall" },
  { dim: "6D", nameEn: "Social", nameTh: "Social", descEn: "Relationship graph — links to related memories, parent entities, and cross-agent references for collective recall.", descTh: "กราฟความสัมพันธ์ — ลิงก์ไปยังความจำที่เกี่ยวข้องและ Cross-Agent References" },
  { dim: "7D", nameEn: "Delta", nameTh: "Delta", descEn: "Change log and versioning — tracks what changed, when, and why, enabling 74% delta compression over raw storage.", descTh: "Change Log และ Versioning — ติดตามการเปลี่ยนแปลง เปิดใช้ Delta Compression 74%" },
  { dim: "8D", nameEn: "Verification", nameTh: "Verification", descEn: "SignedAI attestation scores, consensus level, and trust rating — proof that the memory passed multi-model review.", descTh: "คะแนน SignedAI Attestation และระดับ Consensus — หลักฐานผ่าน Multi-Model Review" },
]

const stats = [
  { value: "74%", label: "Delta Compression", color: "#7B9E87" },
  { value: "3", label: "Memory Layers", color: "#D4A853" },
  { value: "8D", label: "Context Dimensions", color: "#C4745B" },
  { value: "<50ms", label: "Recall Latency", color: "#89B4C8" },
]

export default function EnterpriseAIMemoryPage() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"
  const localePrefix = locale === "th" ? "/th" : ""

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#1A1A1A" : "#FAF6F0"
  const cardBg = isDark ? "#1E1E1E" : "#ffffff"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"
  const textMuted = isDark ? "#888" : "#6B6B6B"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: isEn ? "Home" : "หน้าหลัก", url: `https://delentia.com${localePrefix}` },
        { name: isEn ? "Solutions" : "โซลูชัน", url: `https://delentia.com${localePrefix}/solutions` },
        { name: isEn ? "Enterprise AI Memory" : "Enterprise AI Memory", url: `https://delentia.com${localePrefix}/solutions/enterprise-ai-memory` },
      ])) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
        <section className="sr-only">
          <p>
            {isEn
              ? "Enterprise AI memory extends AI systems beyond context window limits using a persistent 3-layer storage stack — vector, graph, and SQL — with an 8-dimensional RCTDB schema, 74% lossless delta compression, and constitutional PDPA compliance controls for enterprise deployment."
              : "การจดจำ AI องค์กรช่วยขยาย AI ให้เกินขีดจำกัดของ context window ด้วยชั้นจัดเก็บถาวร 3 ชั้น — vector, graph และ SQL — พร้อม 8 มิติของ RCTDB Schema, Delta Compression 74% แบบไม่สูญเสียข้อมูล และการควบคุม PDPA สำหรับองค์กร"}
          </p>
        </section>

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#7B9E87", borderColor: "rgba(123,158,135,0.3)", background: "rgba(123,158,135,0.07)" }}>
              <Brain size={14} /> {isEn ? "AI Memory" : "หน่วยความจำ AI"}
            </m.div>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              {isEn ? "Enterprise AI " : ""}
              <span style={{ color: "#7B9E87" }}>{isEn ? "Memory" : "Enterprise AI Memory"}</span>
            </m.h1>
            <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-10" style={{ color: textSecondary }}>
              {isEn
                ? "Extend enterprise AI beyond the context window with a persistent memory stack that combines hybrid storage, governed recall, and 74% delta compression."
                : "ขยายศักยภาพ AI องค์กรให้เกินข้อจำกัดของ context window ด้วย persistent memory stack ที่รวม hybrid storage, governed recall และ delta compression 74%"}
            </m.p>
            {/* Stats */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="p-4 rounded-2xl border text-center" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: textMuted }}>{s.label}</div>
                </div>
              ))}
            </m.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-3xl mx-auto">
            <m.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: textPrimary }}>
              {isEn ? "Beyond Context Windows: True AI Memory" : "ก้าวข้าม Context Windows: หน่วยความจำ AI ที่แท้จริง"}
            </m.h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: textSecondary }}>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {isEn
                  ? "RCTDB v2.0 addresses a core enterprise AI limitation: important context should survive beyond a single prompt or session. The platform keeps useful operational memory available for future workflows without forcing teams to restate everything from scratch."
                  : "RCTDB v2.0 แก้ข้อจำกัดสำคัญของ AI ระดับองค์กร: บริบทที่สำคัญควรอยู่รอดเกินกว่าหนึ่ง prompt หรือหนึ่ง session ระบบจึงรักษา operational memory ที่นำกลับมาใช้กับ workflow ถัดไปได้โดยไม่ต้องให้ทีมเริ่มอธิบายใหม่ทุกครั้ง"}
              </m.p>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                {isEn
                  ? "The memory stack blends semantic, relational, and structured storage so retrieval can remain accurate, explainable, and practical for production systems."
                  : "memory stack นี้ผสาน storage เชิง semantic, relational และ structured เข้าด้วยกัน เพื่อให้ retrieval มีทั้งความแม่นยำ อธิบายได้ และใช้งานได้จริงในระบบ production"}
              </m.p>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                {isEn
                  ? "Delta compression reduces storage load by 74% on representative workloads, while the context schema keeps enough structure for governed recall, provenance, and enterprise-grade continuity."
                  : "delta compression ลดภาระการจัดเก็บลง 74% ใน representative workloads ขณะที่ context schema ยังเก็บโครงสร้างที่เพียงพอสำหรับ governed recall, provenance และความต่อเนื่องระดับองค์กร"}
              </m.p>
            </div>
          </div>
        </section>

        {/* 3-Layer Architecture */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-5xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "Multi-Layer " : "สถาปัตยกรรม "}
                <span style={{ color: "#7B9E87" }}>{isEn ? "Memory Architecture" : "หน่วยความจำหลายชั้น"}</span>
              </h2>
              <p className="text-base max-w-2xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "RCTDB v2.0 combines complementary storage paradigms into a single enterprise memory system."
                  : "RCTDB v2.0 รวม storage paradigms ที่เสริมกันเป็นระบบหน่วยความจำองค์กรเดียว"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dbLayers.map((layer, i) => {
                const Icon = layer.icon
                return (
                  <m.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                    className="p-8 rounded-2xl border text-center" style={{ background: cardBg, borderColor: cardBorder }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: isDark ? "#252525" : "#FAF6F0" }}>
                      <Icon size={28} style={{ color: layer.color }} />
                    </div>
                    <h3 className="text-lg font-bold mb-3" style={{ color: textPrimary }}>{isEn ? layer.nameEn : layer.nameTh}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>{isEn ? layer.descEn : layer.descTh}</p>
                  </m.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 8D Schema */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-5xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                <span style={{ color: "#D4A853" }}>{isEn ? "8D Context" : "8D Context"}</span>
                {isEn ? " Dimensions" : " Dimensions"}
              </h2>
              <p className="text-base max-w-2xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "Each memory item in RCTDB v2.0 carries 8 structured dimensions — the full RCTDB schema powering identity, sovereignty, payload, social graph, delta compression, and SignedAI verification."
                  : "ข้อมูลความจำแต่ละชิ้นใน RCTDB v2.0 มาพร้อม 8 มิติ — Schema RCTDB เต็มรูปที่ขับเคลื่อน Identity, Sovereignty, Payload, Social Graph, Delta Compression และ SignedAI Verification"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dimensions.map((dim, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-xl border" style={{ background: isDark ? "#1E1E1E" : "#FAF6F0", borderColor: cardBorder }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ color: "#D4A853", background: "rgba(212,168,83,0.12)" }}>{dim.dim}</span>
                    <h3 className="text-sm font-bold" style={{ color: textPrimary }}>{isEn ? dim.nameEn : dim.nameTh}</h3>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: textMuted }}>{isEn ? dim.descEn : dim.descTh}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-2xl mx-auto text-center">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Explore Related Solutions" : "สำรวจโซลูชันที่เกี่ยวข้อง"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${localePrefix}/solutions/ai-hallucination-prevention`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#C4745B" }}>
                  {isEn ? "Hallucination Prevention" : "Hallucination Prevention"} <ArrowRight size={16} />
                </Link>
                <Link href={`${localePrefix}/solutions/dynamic-ai-routing`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  Dynamic AI Routing
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
                title: isEn ? "JITNA RFC-001 Protocol" : "JITNA RFC-001 Protocol",
                description: isEn
                  ? "The intent communication protocol that structures all memory queries and drives RCTDB retrieval pipelines."
                  : "โปรโตคอล Intent ที่กำหนดรูปแบบการค้นหา Memory และขับเคลื่อน RCTDB Retrieval",
                href: "/protocols/jitna-rfc-001",
                category: isEn ? "Protocol" : "โปรโตคอล",
              },
              {
                title: isEn ? "Regional AI" : "Regional AI",
                description: isEn
                  ? "RCTDB powers the memory layer for Typhoon G38 and sovereign LLMs, enabling cross-session context in Thai."
                  : "RCTDB เป็น Memory Layer สำหรับ Typhoon G38 และ LLM ภูมิภาค รองรับ Context ข้าม Session",
                href: "/solutions/regional-ai",
                category: isEn ? "Solution" : "โซลูชัน",
              },
              {
                title: isEn ? "41 Algorithms Reference" : "41 Algorithms Reference",
                description: isEn
                  ? "Complete routing algorithm catalog — each tier selects the memory recall strategy for RCTDB queries."
                  : "สารานุ Algorithm ครบครัน — แต่ละ Tier เลือกวิธี Recall จาก RCTDB",
                href: "/algorithms",
                category: isEn ? "Reference" : "เอกสาร",
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

