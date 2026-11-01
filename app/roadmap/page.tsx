import type { Metadata } from "next"
import RoadmapClient from "./RoadmapClient"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Roadmap: what is done and what is next | Delentia Labs",
    "Roadmap: สิ่งที่เสร็จแล้วและสิ่งถัดไป | Delentia Labs",
    "The phases of the Delentia OS work in the order they are happening: what is done, what is in progress (the first measurements with strong hosted models) and what is not promised. Last reviewed 1 Nov 2026.",
    "ระยะของงาน Delentia OS ตามลำดับที่กำลังเกิดขึ้น: สิ่งที่เสร็จแล้ว สิ่งที่กำลังทำ (การวัดผลกับโมเดลโฮสต์ที่เก่งเป็นครั้งแรก) และสิ่งที่ไม่ได้สัญญา ตรวจล่าสุด 1 พ.ย. 2026",
    "/roadmap",
    [
      "Delentia OS roadmap", "self-hosted AI agent runtime", "governed AI agents", "AI agent release plan"
    ]
  )
}

const ROADMAP_BASE = "https://delentia.com"

const phasesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Delentia OS roadmap: nine phases, what is done and what is next",
  "description": "The phases of the Delentia OS work in the order they are happening. Last reviewed 2026-11-01.",
  "url": `${ROADMAP_BASE}/roadmap`,
  "numberOfItems": 9,
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Phase 1 — Foundations", "description": "The FDIA equation, the JITNA packet format and RCT-7 defined; 41 algorithm modules written, with tests.", "url": `${ROADMAP_BASE}/roadmap#phase-1`},
    {"@type": "ListItem", "position": 2, "name": "Phase 2 — The governed runtime", "description": "Agent loop, tool gate, signed approvals, a rule for untrusted text, a hash-chained signed audit log, a notary and witnesses.", "url": `${ROADMAP_BASE}/roadmap#phase-2`},
    {"@type": "ListItem", "position": 3, "name": "Phase 3 — Public release", "description": "pip install delentia-os (PyPI), a Windows installer, the Desk web pages and a model-free demo; release 2.4.1 on 1 Nov 2026.", "url": `${ROADMAP_BASE}/roadmap#phase-3`},
    {"@type": "ListItem", "position": 4, "name": "Phase 4 — Honest evidence", "description": "Withdrawn claims listed, test counts from public CI, a threat model, known limitations and a comparison published.", "url": `${ROADMAP_BASE}/roadmap#phase-4`},
    {"@type": "ListItem", "position": 5, "name": "Phase 5 — First measurements with strong hosted models", "description": "In progress. No strong hosted model has driven the runtime yet; every result goes into a public register, good or poor.", "url": `${ROADMAP_BASE}/roadmap#phase-5`},
    {"@type": "ListItem", "position": 6, "name": "Phase 6 — Public Technical Preview 0.1", "description": "Planned. Declared only after a real Windows Hello test, an install on a second computer and a handful of outside testers.", "url": `${ROADMAP_BASE}/roadmap#phase-6`},
    {"@type": "ListItem", "position": 7, "name": "Phase 7 — Independent verification", "description": "Planned. A witness the author does not control, code-signing for the installer, someone else reproducing a measurement.", "url": `${ROADMAP_BASE}/roadmap#phase-7`},
    {"@type": "ListItem", "position": 8, "name": "Phase 8 — Design-partner pilots", "description": "Planned, by invitation. One workflow per partner, the pass rule written before the first run, results published with permission.", "url": `${ROADMAP_BASE}/roadmap#phase-8`},
    {"@type": "ListItem", "position": 9, "name": "Phase 9 — Not planned unless a partner asks", "description": "A hosted service, accounts, billing, multi-tenant isolation and a marketplace of adapters.", "url": `${ROADMAP_BASE}/roadmap#phase-9`}
  ],
}

export default async function RoadmapPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Roadmap", url: `https://delentia.com${localePrefix}/roadmap` },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(phasesItemList) }} />
      <RoadmapClient />
    </>
  )
}
