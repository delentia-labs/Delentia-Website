import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Database, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G6 — RCT Knowledge Vault Genome: The Knowledge Base",
    "G6 — RCT Knowledge Vault Genome: ฐานความรู้หลักของ RCT Ecosystem",
    "RCT Knowledge Vault is the sovereign knowledge base of Delentia Labs — 1,068+ files across 3 vaults (DelentiaAI: 584, SignedAI: 334, Middleware: 92+). A Living Knowledge System (current snapshot: Vault-1068), with user-owned encryption and selective disclosure.",
    "RCT Knowledge Vault คือฐานความรู้หลักของ RCT Ecosystem — 1,068+ ไฟล์ใน 3 Vault (DelentiaAI: 584, SignedAI: 334, Middleware: 92+) เป็น Living Knowledge System (snapshot v1.0: Vault-1068) พร้อมการเข้ารหัสที่ผู้ใช้เป็นเจ้าของ",
    "/genome/vault",
    ["RCT Knowledge Vault", "RCT knowledge base", "AI memory sovereignty", "user-owned AI memory", "selective disclosure"]
  )
}

const VAULTS = [
  {
    id: "Vault-1",
    name: "DelentiaAI Vault",
    count: 584,
    en: {
      desc: "The primary agent knowledge vault. Contains ARTENT operating protocols, intent classification training data, WF-00 through WF-05 phase definitions, error taxonomy, and the full history of agent session data. Organized by intent category and domain.",
      categories: ["Intent Classification Corpus", "WF Phase Definitions", "Error Taxonomy (4,849 cases)", "Domain Knowledge (41 sectors)", "Session History Archive"],
    },
    th: {
      desc: "Vault ความรู้ Agent หลัก มี ARTENT Operating Protocols, ข้อมูล Training การจำแนก Intent, คำนิยามเฟส WF-00 ถึง WF-05, Error Taxonomy และประวัติ Session Data ของ Agent ทั้งหมด จัดระเบียบตาม Intent Category และ Domain",
      categories: ["Intent Classification Corpus", "WF Phase Definitions", "Error Taxonomy (4,849 cases)", "Domain Knowledge (41 sectors)", "Session History Archive"],
    },
    color: "border-warm-amber/30 bg-warm-amber/5",
    accent: "text-warm-amber",
  },
  {
    id: "Vault-2",
    name: "SignedAI Vault",
    count: 334,
    en: {
      desc: "The verification knowledge vault. Contains 8D scoring calibration data, model comparison benchmarks, consensus algorithm configurations, attestation templates, and the full library of known hallucination patterns across 7 HexaCore models.",
      categories: ["8D Scoring Calibration", "Model Benchmark History", "Consensus Algorithm Configs", "Attestation Templates", "Hallucination Pattern Library"],
    },
    th: {
      desc: "Vault ความรู้การตรวจสอบ มีข้อมูล Calibration การให้คะแนน 8D, Benchmarks การเปรียบเทียบโมเดล, การตั้งค่า Consensus Algorithm, เทมเพลต Attestation และห้องสมุด Hallucination Patterns ทั้งหมดใน 7 โมเดล HexaCore",
      categories: ["8D Scoring Calibration", "Model Benchmark History", "Consensus Algorithm Configs", "Attestation Templates", "Hallucination Pattern Library"],
    },
    color: "border-sky-400/30 bg-sky-400/5",
    accent: "text-sky-400",
  },
  {
    id: "Vault-3",
    name: "Middleware Vault",
    count: 92,
    en: {
      desc: "The integration and protocol vault. Contains JITNA RFC-001 specification files, API gateway configurations, RCTDB schema definitions, LLM adapter specifications, and system health monitoring baselines.",
      categories: ["JITNA RFC-001 Spec", "API Gateway Configs", "RCTDB Schema Definitions", "LLM Adapter Specs", "System Health Baselines"],
    },
    th: {
      desc: "Vault การรวมระบบและโปรโตคอล มีไฟล์ข้อกำหนด JITNA RFC-001, การตั้งค่า API Gateway, คำนิยาม RCTDB Schema, ข้อกำหนด LLM Adapter และ Baselines การตรวจสอบสถานะระบบ",
      categories: ["JITNA RFC-001 Spec", "API Gateway Configs", "RCTDB Schema Definitions", "LLM Adapter Specs", "System Health Baselines"],
    },
    color: "border-emerald-500/30 bg-emerald-500/5",
    accent: "text-emerald-500",
  },
]

const SOVEREIGNTY_PRINCIPLES = [
  {
    en: { title: "User Ownership", body: "All user-contributed data in the RCT Knowledge Vault is owned by the user who created it. Delentia Labs holds no license to use it for training or analytics without explicit M-primitive consent declaration." },
    th: { title: "ความเป็นเจ้าของโดยผู้ใช้", body: "ข้อมูลที่ผู้ใช้มีส่วนร่วมทั้งหมดใน RCT Knowledge Vault เป็นของผู้ใช้ที่สร้างมัน Delentia Labs ไม่มีใบอนุญาตในการใช้เพื่อ Training หรือ Analytics โดยไม่มีการประกาศความยินยอม M-Primitive อย่างชัดเจน" },
  },
  {
    en: { title: "Selective Disclosure", body: "Users can share specific Vault segments with agents, collaborators, or external systems without exposing their entire vault. Disclosure is per-file, per-session, or per-role — never all-or-nothing." },
    th: { title: "Selective Disclosure", body: "ผู้ใช้สามารถแบ่งปัน Vault Segments เฉพาะกับ Agents, ผู้ร่วมงานหรือระบบภายนอกโดยไม่เปิดเผย Vault ทั้งหมดของพวกเขา การเปิดเผยอยู่ต่อไฟล์ ต่อ Session หรือต่อ Role — ไม่ใช่แบบ All-or-Nothing" },
  },
  {
    en: { title: "Encryption at Rest", body: "All RCT Knowledge Vault data is encrypted with user-held keys. RCT infrastructure operators cannot read vault contents. The encryption key is never transmitted — only used locally or in secure enclaves." },
    th: { title: "การเข้ารหัสขณะพัก", body: "ข้อมูล RCT Knowledge Vault ทั้งหมดถูกเข้ารหัสด้วย Key ที่ผู้ใช้ถือ ผู้ดำเนินการ RCT Infrastructure ไม่สามารถอ่านเนื้อหา Vault ได้ Encryption Key ไม่ถูกส่งผ่านเลย — ใช้เฉพาะ Local หรือใน Secure Enclaves" },
  },
  {
    en: { title: "TTL Declarations", body: "Every memory write includes an explicit TTL (Time-to-Live) from the M-primitive. No data persists forever by default. Session memory defaults to 24h. Project memory requires explicit declaration. No silent accumulation." },
    th: { title: "การประกาศ TTL", body: "การเขียน Memory ทุกครั้งรวม TTL (Time-to-Live) ที่ชัดเจนจาก M-Primitive ไม่มีข้อมูลใดที่คงอยู่ตลอดไปโดย Default Session Memory Default เป็น 24 ชั่วโมง Project Memory ต้องการการประกาศชัดเจน ไม่มีการสะสมโดยเงียบๆ" },
  },
]

export default async function GenomeVaultPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com${localePrefix}` },
    { name: "7 Genome System", url: `https://delentia.com${localePrefix}/genome` },
    { name: "RCT Knowledge Vault Genome", url: `https://delentia.com${localePrefix}/genome/vault` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "RCT Knowledge Vault คืออะไร?" : "What is the RCT Knowledge Vault?",
      answer: isTh
        ? "RCT Knowledge Vault คือ Living Knowledge System หลักของ RCT Ecosystem — ฐานความรู้ที่มีอธิปไตยซึ่งขับเคลื่อนทั้ง 3 แพลตฟอร์ม (Delentia Platform, DelentiaAI, SignedAI) Snapshot ปัจจุบัน v1.0 มี 1,068+ ไฟล์ และออกแบบให้โตขึ้นเรื่อยๆ (Vault-1068 → Vault-1420 → Vault-2000) ชื่อ 'RCT Knowledge Vault' คงที่ ไม่เปลี่ยนตาม Snapshot"
        : "RCT Knowledge Vault is the core Living Knowledge System of the RCT Ecosystem — a sovereign knowledge base powering all 3 platforms (Delentia Platform, DelentiaAI, SignedAI). Current snapshot v1.0 contains 1,068+ files, designed to grow continuously (Vault-1068 → Vault-1420 → Vault-2000). The name 'RCT Knowledge Vault' is canonical and never changes with snapshots.",
    },
    {
      question: isTh ? "ข้อมูลใน RCT Knowledge Vault ถูกใช้เพื่อ Training โมเดลหรือไม่?" : "Is RCT Knowledge Vault data used to train models?",
      answer: isTh
        ? "ไม่ โดย Default ข้อมูลที่ผู้ใช้มีส่วนร่วมไม่ถูกใช้เพื่อ Training โดยไม่มีการประกาศ M-Primitive ที่ชัดเจนจากผู้ใช้ นี่คือ Codex 07 (Codex of Sovereignty) ถูก Enforce ในทางปฏิบัติ"
        : "No. By default, user-contributed data is not used for training without an explicit M-primitive declaration from the user. This is Codex 07 (Codex of Sovereignty) enforced in practice.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href={`${localePrefix}/genome`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isTh ? "กลับไป 7 Genome System" : "Back to 7 Genome System"}
            </Link>
          </Button>

          <article className="space-y-14">
            {/* Header */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-400 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G6 — {isTh ? "The Knowledge Base" : "The Knowledge Base"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">RCT Knowledge Vault Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "ฐานความรู้หลักของ RCT Ecosystem — Living Knowledge System ที่ขับเคลื่อนทุกแพลตฟอร์ม"
                  : "The core knowledge base of RCT Ecosystem — a Living Knowledge System powering all platforms."}
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "1,068+", label: isTh ? "ไฟล์ทั้งหมด (Snapshot v1.0)" : "Total Files (Snapshot v1.0)", color: "text-warm-amber" },
                { num: "3", label: isTh ? "Vault แยก" : "Separate Vaults", color: "text-sky-400" },
                { num: "100%", label: isTh ? "เข้ารหัสด้วย Key ของผู้ใช้" : "User-Key Encrypted", color: "text-emerald-500" },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-xl border border-border bg-card text-center space-y-1">
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.num}</p>
                  <p className="text-xs text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* 3 Vaults */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "3 Vault Structure" : "3-Vault Structure"}
              </h2>
              <div className="space-y-5">
                {VAULTS.map((vault) => {
                  const t = isTh ? vault.th : vault.en
                  return (
                    <div key={vault.id} className={`p-6 rounded-xl border ${vault.color} space-y-4`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Database className={`w-5 h-5 shrink-0 ${vault.accent}`} />
                          <div>
                            <p className="text-xs font-mono font-bold text-foreground/40">{vault.id}</p>
                            <h3 className="font-bold text-foreground">{vault.name}</h3>
                          </div>
                        </div>
                        <span className={`text-2xl font-bold font-mono ${vault.accent}`}>{vault.count.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-foreground/70 leading-relaxed">{t.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.categories.map((cat, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sovereignty Principles */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "หลักการอธิปไตยข้อมูล" : "Data Sovereignty Principles"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SOVEREIGNTY_PRINCIPLES.map((p, i) => {
                  const t = isTh ? p.th : p.en
                  return (
                    <div key={i} className="p-5 rounded-xl border border-border bg-card space-y-2">
                      <h3 className="font-bold text-foreground text-sm">{t.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{t.body}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-10 grid sm:grid-cols-2 gap-4">
              <Link
                href={`${localePrefix}/genome/signed-ai`}
                className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                <div>
                  <p className="text-xs font-mono text-foreground/40">G5</p>
                  <p className="font-bold text-foreground text-sm">SignedAI Genome</p>
                </div>
              </Link>
              <Link
                href={`${localePrefix}/genome/rct-7`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40">G7</p>
                  <p className="font-bold text-foreground text-sm">RCT-7 Genome</p>
                  <p className="text-xs text-foreground/50">{isTh ? "Continuous Improvement — RCT-S/I/V/F" : "Continuous Improvement — RCT-S/I/V/F"}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors rotate-180" />
              </Link>
            </div>

            <RelatedContent
              title={isTh ? "เนื้อหาที่เกี่ยวข้อง" : "Related Content"}
              items={[
                { href: `${localePrefix}/protocols`, title: isTh ? "ข้อกำหนด Protocol" : "Protocol Specifications", description: isTh ? "โปรโตคอลทางเทคนิคที่ขับเคลื่อน RCT Ecosystem" : "The technical protocols powering the RCT Ecosystem.", category: "Protocols" },
                { href: `${localePrefix}/genome`, title: isTh ? "7 Genome System" : "7 Genome System", description: isTh ? "สำรวจ Genome ทั้ง 7 ตัวของ RCT Ecosystem" : "Explore all 7 Genomes of the RCT Ecosystem.", category: "Genome" },
                { href: `${localePrefix}/blog`, title: isTh ? "บทความวิจัย" : "Research & Blog", description: isTh ? "งานวิจัยและบทความเกี่ยวกับ AI จาก Delentia Labs" : "Research papers and AI articles from Delentia Labs.", category: "Research" },
              ]}
            />
            <AuthorBlock authorSlug="ittirit-saengow" locale={locale} />
          </article>
        </section>

        <Footer />
      </main>
    </>
  )
}

