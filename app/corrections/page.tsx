import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import {
  SITE_EVIDENCE_LAST_UPDATED,
  SITE_MCP_LIVE_TOOL_COUNT,
  SITE_MCP_TEST_COUNT,
  SITE_PUBLIC_SDK_COVERAGE,
  SITE_PUBLIC_SDK_TESTS,
} from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Corrections — Withdrawn Claims and Measured Figures",
    "การแก้ไขข้อมูล — ข้อความที่ถอนและตัวเลขที่วัดจริง",
    "Figures Delentia Labs has withdrawn because they could not be reproduced or verified, why, and the measured figures that replace them.",
    "ตัวเลขที่ Delentia Labs ถอนออกเพราะวัดซ้ำหรือพิสูจน์ไม่ได้ เหตุผล และตัวเลขที่วัดจริงซึ่งใช้แทน",
    "/corrections",
    ["corrections", "claim registry", "measured evidence", "withdrawn claims"]
  )
}

const WHITEPAPER = "https://github.com/delentia-labs/Delentia-OS/blob/main/docs/whitepaper/DELENTIA_WHITEPAPER_3.0_EN.md"
const CLAIM_REGISTRY = "https://github.com/delentia-labs/Delentia-OS/blob/main/docs/distribution/CLAIM_REGISTRY.md"

type Row = { claim: string; claimTh: string; why: string; whyTh: string }

const WITHDRAWN: Row[] = [
  {
    claim: "Hallucination rate 0.3% (vs 12–15% industry)",
    claimTh: "อัตรา hallucination 0.3% (เทียบอุตสาหกรรม 12–15%)",
    why: "The cited benchmark suite and 1,000-prompt dataset are not in any repository, so the figure cannot be reproduced. No hallucination rate is claimed.",
    whyTh: "ชุด benchmark และ dataset 1,000 prompt ที่อ้างถึงไม่มีอยู่ใน repo ใด จึงทำซ้ำไม่ได้ ปัจจุบันไม่อ้างอัตรา hallucination ใด ๆ",
  },
  {
    claim: "4,849 tests in the enterprise suite",
    claimTh: "4,849 tests ในชุดทดสอบ enterprise",
    why: "A private suite nobody outside can run. We now quote only CI-verified counts from the public repositories.",
    whyTh: "เป็นชุดทดสอบส่วนตัวที่คนภายนอกรันเองไม่ได้ ตอนนี้อ้างเฉพาะจำนวนที่ CI ของ repo สาธารณะยืนยัน",
  },
  {
    claim: "Uptime / SLA 99.9%, 99.98%, 99.99%, 99.999%",
    claimTh: "Uptime / SLA 99.9%, 99.98%, 99.99%, 99.999%",
    why: "There is no uptime history or independent monitoring yet, so no SLA is offered. The live status page shows current health only.",
    whyTh: "ยังไม่มีประวัติ uptime หรือ monitoring อิสระ จึงยังไม่มี SLA หน้า status แสดงเฉพาะสุขภาพระบบ ณ ตอนนี้",
  },
  {
    claim: "Context compression 74.2% – 91.5%",
    claimTh: "บีบอัด context 74.2% – 91.5%",
    why: "74% was a design floor. 91.5% measures agent-state memory in a synthetic simulation, not context. Measured context compression is in the table below.",
    whyTh: "74% คือเป้าขั้นต่ำตอนออกแบบ ส่วน 91.5% วัดการเก็บสถานะเอเจนต์ในการจำลอง ไม่ใช่ context ตัวเลขที่วัดจริงอยู่ในตารางด้านล่าง",
  },
  {
    claim: "Zero-knowledge proof of the FDIA score (ZK-FDIA)",
    claimTh: "Zero-knowledge proof ของคะแนน FDIA (ZK-FDIA)",
    why: "zk_fdia.py is a hash commitment. A verifier cannot check that the sealed score equals D^I × A, so it is not a zero-knowledge proof.",
    whyTh: "zk_fdia.py เป็น hash commitment ผู้ตรวจยืนยันไม่ได้ว่าคะแนนที่ปิดผนึกเท่ากับ D^I × A จึงไม่ใช่ zero-knowledge proof",
  },
  {
    claim: "Tamper-proof / immutable audit logs",
    claimTh: "audit log แบบ tamper-proof / immutable",
    why: "Logs are hash-chained and Ed25519-signed (tamper-evident). Publishing chain heads to an outside witness (tier A3) is being rolled out.",
    whyTh: "log เป็น hash chain และลงลายเซ็น Ed25519 (แก้แล้วตรวจเจอได้) ส่วนการฝาก head ไว้นอกระบบ (A3) กำลังเปิดใช้",
  },
  {
    claim: "94.7% bypass rate for an unprotected LLM",
    claimTh: "LLM ที่ไม่มีการป้องกันถูก bypass 94.7%",
    why: "No LLM was run; the benchmark hardcoded the baseline.",
    whyTh: "ไม่ได้รัน LLM จริง ค่า baseline ถูก hardcode ไว้ใน benchmark",
  },
]

export default async function CorrectionsPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Corrections", url: `https://delentia.com${localePrefix}/corrections` },
  ])

  const measured = [
    {
      label: isTh ? "ชุดทดสอบ Delentia-OS (CI)" : "Delentia-OS test suite (CI)",
      value: `${SITE_PUBLIC_SDK_TESTS.toLocaleString()} passed · ${SITE_PUBLIC_SDK_COVERAGE} coverage`,
    },
    {
      label: isTh ? "ชุดทดสอบ MCP + Guard (CI)" : "MCP + Guard test suite (CI)",
      value: `${SITE_MCP_TEST_COUNT} passed · ${SITE_MCP_LIVE_TOOL_COUNT} live tools`,
    },
    {
      label: isTh ? "บีบอัด context (วัดกับโค้ดและ log จริง)" : "Context compression (real code and logs)",
      value: isTh ? "~70–75% (aggressive), ~6–12% (ปกติ)" : "~70–75% fewer tokens (aggressive), ~6–12% (default)",
    },
    {
      label: isTh ? "สัญญา FDIA ข้ามภาษา TypeScript/Python" : "FDIA contract, TypeScript vs Python",
      value: isTh ? "ตรงกัน 422 จาก 425 vector" : "422 of 425 vectors agree",
    },
  ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="min-h-screen bg-background">
        <Navbar />
        <section className="mx-auto max-w-4xl px-4 py-24 md:py-32">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {isTh ? "การแก้ไขข้อมูล" : "Corrections"}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
            {isTh
              ? `ตัวเลขด้านล่างเคยปรากฏบนเว็บไซต์ บทความ หรือ listing ของเรา และถูกถอนเมื่อวันที่ 28 ก.ย. 2026 หลังตรวจกับหลักฐาน บทความเก่ายังเก็บไว้เป็นประวัติ พร้อมหมายเหตุชี้มาที่หน้านี้ ข้อมูลอัปเดตล่าสุด ${SITE_EVIDENCE_LAST_UPDATED}`
              : `The figures below appeared on our site, articles or listings and were withdrawn on 28 September 2026 after we checked them against evidence. Older articles are kept as the historical record, with a notice pointing here. Evidence last updated ${SITE_EVIDENCE_LAST_UPDATED}.`}
          </p>

          <h2 className="mb-4 text-2xl font-semibold text-foreground">{isTh ? "ข้อความที่ถอน" : "Withdrawn"}</h2>
          <div className="mb-12 space-y-4">
            {WITHDRAWN.map((row) => (
              <div key={row.claim} className="rounded-2xl border border-border/70 bg-card/90 p-5">
                <div className="font-semibold text-foreground line-through decoration-amber-500/70">{isTh ? row.claimTh : row.claim}</div>
                <p className="mt-2 text-sm text-muted-foreground">{isTh ? row.whyTh : row.why}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-2xl font-semibold text-foreground">{isTh ? "ตัวเลขที่วัดจริง" : "Measured instead"}</h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {measured.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border/70 bg-card/90 p-5">
                <div className="text-sm text-muted-foreground">{m.label}</div>
                <div className="mt-1 text-lg font-semibold text-foreground">{m.value}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {isTh ? "แหล่งอ้างอิงหลัก: " : "Sources: "}
            <a href={WHITEPAPER} className="underline underline-offset-2">Whitepaper 3.0 §9</a>
            {" · "}
            <a href={CLAIM_REGISTRY} className="underline underline-offset-2">Claim Registry</a>
          </p>
        </section>
        <Footer />
      </main>
    </>
  )
}
