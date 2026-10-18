"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Check, X, ArrowRight } from "lucide-react"

// Round 87 (claims review). This page used to show an "accuracy 85% to 99.7%" table, a "hallucination 15% to
// not claimed (-98%)" row, a "7x" verification multiplier and three case studies with before/after numbers
// (18.2% to 0.4%, 71% to 99.6%, 420 ms to 185 ms). None was measured; the case studies were labelled hypothetical
// but still looked like results. It now says what the runtime does about wrong answers, what was measured, and
// that no reduction of wrong answers has been shown.

type Row = { en: string; th: string }

const doing: Row[] = [
  {
    en: "Keeps wrong answers from causing damage: every tool call passes a safety gate, and risky ones wait for a human signature. This is about what the agent does, not about whether its words are true.",
    th: "กันไม่ให้คำตอบที่ผิดสร้างความเสียหาย: ทุกการเรียกเครื่องมือผ่านด่านความปลอดภัย และการกระทำที่เสี่ยงต้องรอลายเซ็นของมนุษย์ เรื่องนี้เกี่ยวกับสิ่งที่ agent ทำ ไม่ใช่ว่าคำพูดของมันจริงหรือไม่",
  },
  {
    en: "Checks the final answer against the evidence the episode gathered: a number or address that appears nowhere in the goal, the conversation or any tool result, or a claim of an action no tool performed, makes the episode not count as a success.",
    th: "ตรวจคำตอบสุดท้ายเทียบกับหลักฐานที่เก็บมาในรอบนั้น ตัวเลขหรือที่อยู่ที่ไม่ปรากฏในเป้าหมาย บทสนทนา หรือผลของเครื่องมือใดเลย หรือการอ้างว่าทำสิ่งที่ไม่มีเครื่องมือใดทำ ทำให้รอบนั้นไม่นับว่าสำเร็จ",
  },
  {
    en: "Offers a jury of independent models for questions where a second opinion is worth the cost (see the SignedAI page).",
    th: "มีคณะลูกขุนของโมเดลอิสระสำหรับคำถามที่ความเห็นที่สองคุ้มค่า (ดูหน้า SignedAI)",
  },
]

const measured: Row[] = [
  {
    en: "The answer check is weak. On real answers from a small local model it let 5 of 16 bad answers through (14 of 16 before tuning) and rejected 2 of 8 good ones. It only decides what the system learns from, never what you are shown.",
    th: "การตรวจคำตอบยังอ่อน กับคำตอบจริงของโมเดลท้องถิ่นขนาดเล็ก มันปล่อยคำตอบที่ผิด 5 จาก 16 (ก่อนปรับ 14 จาก 16) และปฏิเสธคำตอบที่ถูก 2 จาก 8 มันกำหนดแค่ว่าระบบจะเรียนรู้จากรอบไหน ไม่เคยกำหนดสิ่งที่คุณเห็น",
  },
  {
    en: "A later version was tried on a second set and was not adopted, because it did not beat the criteria written before the test.",
    th: "เวอร์ชันถัดมาถูกลองกับชุดที่สองและไม่ถูกนำมาใช้ เพราะไม่ผ่านเกณฑ์ที่เขียนไว้ก่อนทดสอบ",
  },
]

const notShown: Row[] = [
  { en: "That Delentia reduces wrong answers compared with the same model alone. This has not been measured, so no rate is claimed.", th: "ว่า Delentia ลดคำตอบผิดได้เมื่อเทียบกับโมเดลเดียวกันที่ใช้ตัวเดียว ยังไม่เคยวัด จึงไม่อ้างอัตราใด ๆ" },
  { en: "That a jury of models is more accurate than one model. No real multi-vendor vote has been run.", th: "ว่าคณะลูกขุนของโมเดลแม่นยำกว่าโมเดลเดียว ยังไม่เคยลงคะแนนจริงข้ามผู้ให้บริการ" },
  { en: "Anything with a capable model. Only scripted models and small local models have been used.", th: "ผลใด ๆ กับโมเดลที่เก่งพอ ใช้แค่โมเดลสคริปต์และโมเดลท้องถิ่นขนาดเล็ก" },
]

function List({ rows, isTh, icon }: { rows: Row[]; isTh: boolean; icon: "check" | "x" }) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.en} className="flex items-start gap-2 text-sm text-muted-foreground">
          {icon === "check" ? <Check size={16} className="mt-0.5 shrink-0 text-warm-sage" /> : <X size={16} className="mt-0.5 shrink-0" />}
          <span>{isTh ? row.th : row.en}</span>
        </li>
      ))}
    </ul>
  )
}

export default function HallucinationPreventionPage() {
  const pathname = usePathname()
  const isTh = getLocaleFromPathname(pathname) === "th"
  const localePrefix = isTh ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {isTh ? "คำตอบที่ผิดของ AI: Delentia ทำอะไรได้และทำอะไรไม่ได้" : "Wrong answers from AI: what Delentia does and does not do"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "เราไม่อ้างว่าป้องกัน hallucination ได้ ตัวเลขที่เคยอยู่ในหน้านี้ไม่ได้มาจากการวัดและถูกถอนแล้ว หน้านี้บอกสิ่งที่ระบบทำจริง สิ่งที่วัดแล้ว และสิ่งที่ยังไม่เคยแสดง"
              : "We do not claim to prevent hallucination. The figures that used to be on this page were not measured and have been withdrawn. This page says what the system does, what was measured, and what has not been shown."}
          </p>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-foreground">{isTh ? "สิ่งที่ระบบทำ" : "What the system does"}</h2>
          <List rows={doing} isTh={isTh} icon="check" />
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "สิ่งที่วัดแล้ว" : "What was measured"}</h2>
            <List rows={measured} isTh={isTh} icon="check" />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "สิ่งที่ยังไม่เคยแสดง" : "What has not been shown"}</h2>
            <List rows={notShown} isTh={isTh} icon="x" />
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto flex flex-col gap-3 sm:flex-row">
          <Link href={`${localePrefix}/benchmark`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "ดูสิ่งที่วัดแล้ว" : "See what is measured"}
            <ArrowRight size={14} />
          </Link>
          <Link href={`${localePrefix}/products/signed-ai`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            {isTh ? "คณะลูกขุน SignedAI" : "The SignedAI jury"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
