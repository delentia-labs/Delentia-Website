import Link from "next/link"
import { AlertTriangle } from "lucide-react"

// Figures that older articles quoted and that were withdrawn on 2026-09-28
// (Delentia-OS Whitepaper 3.0 §9.2 and docs/distribution/CLAIM_REGISTRY.md).
// A post that still contains one of them gets the notice below; the post text
// itself is kept as the historical record.
const WITHDRAWN_PATTERNS = [
  /0\.3\s?%/,                      // hallucination rate: dataset and benchmark not reproducible
  /4,?849/,                        // private enterprise test count: not independently verifiable
  /99\.9\d*\s?%/,                  // uptime / SLA: no independent monitoring exists
  /74\.2|91\.5\s?%/,               // compression: 74% was a design floor; 91.5% is agent memory, not context
  /zero[- ]knowledge|ZK[- ]FDIA/i, // zk_fdia.py is a commitment, not a zero-knowledge proof
  /tamper[- ]proof/i,              // audit logs are tamper-evident; anchoring (tier A3) is not deployed yet
  /94\.7\s?%/,                     // "unprotected LLM" baseline was never measured
  /3\.74\s?[x×]/,                  // cost reduction: an internal estimate, no reproducible measurement (Round 79)
  /96\.1\s?%/,                     // consensus / recall accuracy: no reproducible measurement (Round 79)
  /FDIA accuracy( score)?( of)? 0\.92|0\.92 FDIA|FDIA-accuracy 0\.92/i, // the only measured FDIA accuracy is 11 of 12 hand-written cases (Round 79)
  /5\.4\.5/,                       // names no repository or release (Round 79)
  /hexacore/i,                     // no seven- or nine-model roster runs; the model is a setting (Round 87)
  /(?:seven|nine|7|9)[- ](?:model|llm|provider)s?\s+(?:consensus|roster|jury|ensemble)/i, // same claim in other words (Round 91)
  /62[- ]microservices?/i,         // the count of a private layer nobody can inspect (Round 78)
]

export function containsWithdrawnClaim(text: string): boolean {
  return WITHDRAWN_PATTERNS.some((pattern) => pattern.test(text))
}

export function ClaimsCorrectionNotice({ locale, localePrefix }: { locale: string; localePrefix: string }) {
  const isTh = locale === "th"
  return (
    <aside
      role="note"
      className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-500/8 p-4 text-sm leading-relaxed text-foreground"
    >
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />
        {isTh ? "หมายเหตุการแก้ไข (29 ก.ย. 2026)" : "Correction (29 Sep 2026)"}
      </div>
      <p className="text-muted-foreground">
        {isTh
          ? "บทความนี้เขียนก่อนการตรวจหลักฐานรอบล่าสุด ตัวเลขบางตัวในบทความถูกถอนแล้ว เช่น อัตรา hallucination 0.3%, 4,849 tests ของชุดทดสอบ enterprise, uptime/SLA 99.9x%, การบีบอัด 74.2–91.5%, ต้นทุนลดลง 3.74 เท่า, ความแม่นยำ 96.1%, FDIA accuracy 0.92, เลขเวอร์ชัน v5.4.5, HexaCore ฉันทามติ 7/9 โมเดล (ไม่มีรายชื่อโมเดลแบบนี้ทำงานจริง โมเดลเป็นค่าที่ตั้งเลือก), ตัวเลข 62 microservices และคำว่า zero-knowledge หรือ tamper-proof เพราะวัดซ้ำหรือพิสูจน์ไม่ได้ ตัวเลขที่วัดจริงและเหตุผลของแต่ละข้ออยู่ที่"
          : "This article predates our latest evidence review. Some figures in it have been withdrawn because they could not be reproduced or verified: the 0.3% hallucination rate, 4,849 enterprise tests, 99.9x% uptime/SLA, 74.2–91.5% compression, a 3.74x cost reduction, 96.1% accuracy, an FDIA accuracy of 0.92, the version label v5.4.5, the HexaCore seven/nine-model consensus (no such roster runs; the model is a setting), the 62-microservices count, and the terms zero-knowledge and tamper-proof. The measured figures and the reason for each correction are on the"}{" "}
        <Link href={`${localePrefix}/corrections`} className="font-medium text-amber-600 underline underline-offset-2 dark:text-amber-400">
          {isTh ? "หน้าการแก้ไขข้อมูล" : "corrections page"}
        </Link>
        .
      </p>
    </aside>
  )
}
