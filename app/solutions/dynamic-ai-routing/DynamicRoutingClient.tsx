"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Check, X, ArrowRight } from "lucide-react"

// Round 87 (claims review). This page used to present a seven-model "HexaCore" roster (Claude, Kimi, MiniMax,
// Gemini, Grok, DeepSeek, Typhoon), four "consensus methods" and "9 tiers" as a running routing service with
// sub-50 ms decisions and a 60% cost reduction. None of that runs or was measured. What is real: the model is a
// setting, a fast or slow path is chosen per task, and backup models may take over under three guards.

type Row = { en: string; th: string }

const built: Row[] = [
  { en: "You set the model: a local model (Ollama), any model on OpenRouter, or any OpenAI-compatible endpoint. The choice is a setting you can change with one command or on the Models page.", th: "คุณตั้งโมเดลเอง: โมเดลในเครื่อง (Ollama) โมเดลใดก็ได้บน OpenRouter หรือ endpoint ที่เข้ากันได้กับ OpenAI เปลี่ยนได้ด้วยคำสั่งเดียวหรือในหน้า Models" },
  { en: "Per task, the runtime chooses a fast path (a short answer, few steps) or a slow path (step by step). If the router itself fails, it takes the slow path.", th: "ต่องาน ระบบเลือกเส้นทางเร็ว (คำตอบสั้น ไม่กี่ขั้น) หรือเส้นทางช้า (ทีละขั้น) หากตัวเลือกเส้นทางเองล้มเหลว จะใช้เส้นทางช้า" },
  { en: "Backup models take over when the main one fails (a network error, a timeout, a 5xx or 429 answer). A backup is allowed only if it exposes data no more than the main model, is allowed by the data-residency policy, and has a known price that fits the budget. Every switch is logged.", th: "โมเดลสำรองรับช่วงเมื่อโมเดลหลักล้มเหลว (เครือข่ายขัดข้อง หมดเวลา หรือตอบ 5xx/429) สำรองได้เฉพาะตัวที่เปิดเผยข้อมูลไม่มากกว่าโมเดลหลัก ผ่านนโยบายที่เก็บข้อมูล และมีราคาที่ทราบและอยู่ในงบ ทุกการสลับถูกบันทึก" },
  { en: "A per-episode token and cost limit refuses a call whose worst case would go over the budget you set.", th: "ขีดจำกัดโทเค็นและค่าใช้จ่ายต่อรอบ จะปฏิเสธการเรียกที่กรณีเลวร้ายสุดเกินงบที่คุณตั้ง" },
]

const notDone: Row[] = [
  { en: "No fixed roster of models. There is no seven-model panel, and no model is a partner.", th: "ไม่มีรายชื่อโมเดลตายตัว ไม่มีแผง 7 โมเดล และไม่มีโมเดลใดเป็นพาร์ตเนอร์" },
  { en: "No cost saving and no routing latency was measured, so none is claimed.", th: "ไม่ได้วัดการประหยัดต้นทุนหรือความหน่วงของการเลือกเส้นทาง จึงไม่อ้างตัวเลขใด" },
  { en: "No evidence that the fast/slow choice improves results with a capable model. Only scripted and small local models have been used.", th: "ไม่มีหลักฐานว่าการเลือกเร็ว/ช้าทำให้ผลดีขึ้นกับโมเดลที่เก่งพอ ใช้เพียงโมเดลสคริปต์และโมเดลท้องถิ่นขนาดเล็ก" },
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

export default function DynamicAIRoutingPage() {
  const pathname = usePathname()
  const isTh = getLocaleFromPathname(pathname) === "th"
  const localePrefix = isTh ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {isTh ? "Delentia เลือกและสลับโมเดลอย่างไร" : "How Delentia chooses and switches models"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "โมเดลเป็นการตั้งค่า ไม่ใช่ส่วนประกอบตายตัว หน้านี้แยกสิ่งที่ทำงานจริงออกจากสิ่งที่เคยถูกพรรณนาไว้เกินจริง"
              : "The model is a setting, not a fixed component. This page separates what works from what used to be described far beyond the evidence."}
          </p>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-foreground">{isTh ? "สร้างและทดสอบแล้ว" : "Built and tested"}</h2>
          <List rows={built} isTh={isTh} icon="check" />
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "ไม่มี / ยังไม่ได้วัด" : "Not there / not measured"}</h2>
          <List rows={notDone} isTh={isTh} icon="x" />
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto flex flex-col gap-3 sm:flex-row">
          <Link href={`${localePrefix}/solutions/regional-ai`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "AI ระดับชาติและนโยบายที่เก็บข้อมูล" : "National AI and the data-residency policy"}
            <ArrowRight size={14} />
          </Link>
          <Link href={`${localePrefix}/benchmark`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            {isTh ? "ดูสิ่งที่วัดแล้ว" : "See what is measured"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
