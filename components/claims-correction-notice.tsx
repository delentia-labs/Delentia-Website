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
          ? "บทความนี้เขียนก่อนการตรวจหลักฐานรอบล่าสุด ตัวเลขบางตัวในบทความถูกถอนแล้ว เช่น อัตรา hallucination 0.3%, 4,849 tests ของชุดทดสอบ enterprise, uptime/SLA 99.9x%, การบีบอัด 74.2–91.5% และคำว่า zero-knowledge หรือ tamper-proof เพราะวัดซ้ำหรือพิสูจน์ไม่ได้ ตัวเลขที่วัดจริงและเหตุผลของแต่ละข้ออยู่ที่"
          : "This article predates our latest evidence review. Some figures in it have been withdrawn because they could not be reproduced or verified: the 0.3% hallucination rate, 4,849 enterprise tests, 99.9x% uptime/SLA, 74.2–91.5% compression, and the terms zero-knowledge and tamper-proof. The measured figures and the reason for each correction are on the"}{" "}
        <Link href={`${localePrefix}/corrections`} className="font-medium text-amber-600 underline underline-offset-2 dark:text-amber-400">
          {isTh ? "หน้าการแก้ไขข้อมูล" : "corrections page"}
        </Link>
        .
      </p>
    </aside>
  )
}
