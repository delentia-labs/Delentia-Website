"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ShieldCheck, ArrowRight, Check, X } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SOCIAL_LINKS } from "@/lib/site-config"

// Round 87 (claims review). This page used to describe "SignedAI" as a verification API with per-review prices
// ($0.10 to $5.00), a seven-model "HexaCore" roster spread over three geopolitical zones, an 8-dimension scoring
// stage and a hallucination rate. None of that runs as a service: there is no API, no price, no roster in
// production and no hallucination figure. What exists is a jury runner in the open-source repository
// (signedai/runner.py, `delentia jury run|verify`), tested with scripted voters only. The page now says that.

type Row = { en: string; th: string }

const steps: Row[] = [
  { en: "Every member of the jury gets the same question about the same proposal, independently. They do not see each other's answers.", th: "สมาชิกทุกคนในคณะลูกขุนได้รับคำถามเดียวกันเกี่ยวกับข้อเสนอเดียวกัน โดยอิสระ และไม่เห็นคำตอบของกัน" },
  { en: "Each reply is read as agree, disagree or abstain. A reply that cannot be read, a timeout or an error counts as abstain, never as agree.", th: "คำตอบแต่ละอันถูกอ่านเป็นเห็นด้วย ไม่เห็นด้วย หรืองดออกเสียง คำตอบที่อ่านไม่ได้ หมดเวลา หรือเกิดข้อผิดพลาด นับเป็นงดออกเสียง ไม่เคยนับเป็นเห็นด้วย" },
  { en: "The tier sets how many agreeing votes are required and what share of the jury they must be. Abstentions never help a proposal pass.", th: "ระดับ (tier) กำหนดจำนวนเสียงเห็นด้วยที่ต้องมีและสัดส่วนที่ต้องได้ การงดออกเสียงไม่เคยช่วยให้ข้อเสนอผ่าน" },
  { en: "The verdict is written as a canonical record with a SHA-256 digest and can be signed with an Ed25519 key. Anyone can re-check it with delentia jury verify.", th: "คำตัดสินถูกเขียนเป็นระเบียนมาตรฐานพร้อม SHA-256 และลงนามด้วยคีย์ Ed25519 ได้ ใครก็ตรวจซ้ำได้ด้วย delentia jury verify" },
]

const rules: Row[] = [
  { en: "A jury of one model is not a jury. If fewer than the required number of different models answered, consensus is not reached.", th: "คณะลูกขุนที่เป็นโมเดลเดียวไม่ใช่คณะลูกขุน หากโมเดลที่ตอบมีจำนวนต่างกันน้อยกว่าที่กำหนด จะไม่ถือว่าได้ฉันทามติ" },
  { en: "In the strictest tier the chairman can veto, but cannot force a pass over a disagreeing jury.", th: "ในระดับเข้มที่สุด ประธานสามารถยับยั้งได้ แต่บังคับให้ผ่านเมื่อคณะลูกขุนไม่เห็นด้วยไม่ได้" },
  { en: "Keys are never stored in the jury file. It names an environment variable instead.", th: "คีย์ไม่เคยอยู่ในไฟล์ของคณะลูกขุน ไฟล์ระบุเพียงชื่อ environment variable" },
]

const measured: Row[] = [
  { en: "The vote rules above are covered by tests that use scripted voters.", th: "กติกาการลงคะแนนข้างต้นมีชุดทดสอบครอบคลุม โดยใช้ผู้ลงคะแนนแบบสคริปต์" },
  { en: "A harness runs four separate HTTP servers as members and checks the signed verdict.", th: "ชุดทดสอบรวมระบบรันเซิร์ฟเวอร์ HTTP สี่ตัวแยกกันเป็นสมาชิก และตรวจคำตัดสินที่ลงนาม" },
]

const notMeasured: Row[] = [
  { en: "No real vote across several vendors' models has been run.", th: "ยังไม่เคยลงคะแนนจริงข้ามโมเดลของหลายผู้ให้บริการ" },
  { en: "Nothing here shows that a jury is more accurate than one model, or reduces hallucination. No such figure is claimed.", th: "ไม่มีหลักฐานว่าคณะลูกขุนแม่นยำกว่าโมเดลเดียวหรือลด hallucination ได้ เราไม่อ้างตัวเลขใด ๆ" },
  { en: "There is no hosted SignedAI API, no per-review price and no fixed roster of models.", th: "ไม่มี SignedAI API แบบโฮสต์ ไม่มีราคาต่อการรีวิว และไม่มีรายชื่อโมเดลตายตัว" },
]

function List({ rows, isTh, icon }: { rows: Row[]; isTh: boolean; icon: "check" | "x" }) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.en} className="flex items-start gap-2 text-sm text-muted-foreground">
          {icon === "check" ? <Check size={16} className="mt-0.5 shrink-0 text-warm-sage" /> : <X size={16} className="mt-0.5 shrink-0 text-muted-foreground" />}
          <span>{isTh ? row.th : row.en}</span>
        </li>
      ))}
    </ul>
  )
}

export default function SignedAIPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = locale === "th" ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Home", url: `https://delentia.com${localePrefix}` },
              { name: isTh ? "ผลิตภัณฑ์" : "Products", url: `https://delentia.com${localePrefix}/products` },
              { name: "SignedAI jury", url: `https://delentia.com${localePrefix}/products/signed-ai` },
            ])
          ),
        }}
      />
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 bg-[#D4A85318] text-warm-amber">
            <ShieldCheck size={12} />
            {isTh ? "คณะลูกขุน SignedAI (โอเพนซอร์ส)" : "SignedAI jury (open source)"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {isTh ? "ถามหลายโมเดลอิสระ แล้วเก็บคำตัดสินที่ลงนามไว้ตรวจซ้ำ" : "Ask several independent models, and keep a signed verdict you can re-check"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "SignedAI เป็นตัวรันคณะลูกขุนที่อยู่ในรีโพโอเพนซอร์สของ Delentia ใช้ได้ด้วยคำสั่ง delentia jury run และตรวจคำตัดสินด้วย delentia jury verify ไม่ใช่บริการ API แบบโฮสต์ และยังไม่มีราคา"
              : "SignedAI is the jury runner in Delentia's open-source repository. You use it with delentia jury run and re-check a verdict with delentia jury verify. It is not a hosted API and has no price."}
          </p>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-foreground">{isTh ? "ทำงานอย่างไร" : "How it works"}</h2>
          <ol className="space-y-3">
            {steps.map((row, i) => (
              <li key={row.en} className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                <span className="font-mono font-bold text-warm-amber">{i + 1}</span>
                <span>{isTh ? row.th : row.en}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-foreground">{isTh ? "กติกาที่ใส่ไว้ในโค้ด" : "Rules built into the code"}</h2>
          <List rows={rules} isTh={isTh} icon="check" />
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "ทดสอบแล้ว" : "Tested"}</h2>
            <List rows={measured} isTh={isTh} icon="check" />
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "ยังไม่ได้ทำ / ไม่ได้อ้าง" : "Not done, not claimed"}</h2>
            <List rows={notMeasured} isTh={isTh} icon="x" />
          </div>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto flex flex-col gap-3 sm:flex-row">
          <a
            href={SOCIAL_LINKS.platformGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors"
          >
            {isTh ? "ดูโค้ดบน GitHub" : "See the code on GitHub"}
            <ArrowRight size={14} />
          </a>
          <Link
            href={`${localePrefix}/benchmark`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
          >
            {isTh ? "ดูสิ่งที่วัดแล้ว" : "See what is measured"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
