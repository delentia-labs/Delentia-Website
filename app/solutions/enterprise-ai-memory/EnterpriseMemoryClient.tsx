"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Check, X, ArrowRight } from "lucide-react"

// Round 87 (claims review). This page used to describe an "8-dimensional" memory schema, a "74% delta compression",
// a "<50 ms recall latency" and PDPA-compliant erasure and explainability. The 74% figure was a formula; measured
// in bytes the delta saves 39% to 90% and plain compression does better; the 8 dimensions and the latency were not
// built or measured; PDPA compliance cannot be claimed by software. What is built, and measured, is listed below.

type Row = { en: string; th: string }

const built: Row[] = [
  {
    en: "Memory is an append-only event log, hash-chained per person and written in the same transaction as the memory itself. Replaying the log gives back exactly the stored memories (checked from 100 to 5,000 operations), and any edited event is named.",
    th: "หน่วยความจำเป็นบันทึกเหตุการณ์แบบต่อท้ายอย่างเดียว เชื่อม hash ต่อคน และเขียนในธุรกรรมเดียวกับตัวหน่วยความจำ การเล่นซ้ำบันทึกได้หน่วยความจำที่เก็บไว้ตรงทุกตัว (ตรวจที่ 100 ถึง 5,000 การดำเนินการ) และเหตุการณ์ที่ถูกแก้ไขจะถูกระบุ",
  },
  {
    en: "The head of the log is written into the audit chain, so rewriting the whole log is detected. You can look at a memory's history and see the store as it was at an earlier point.",
    th: "หัวของบันทึกถูกเขียนลงในสายตรวจสอบ การเขียนบันทึกทั้งหมดใหม่จึงถูกตรวจพบ คุณดูประวัติของหน่วยความจำและดูสถานะของที่เก็บ ณ จุดก่อนหน้าได้",
  },
  {
    en: "Erasure of one person: their memory text is sealed under a key held outside the database, and erasing means destroying that key after an approver signs. After that, scanning the raw database file finds none of their text, while other people's memories and the chain still verify.",
    th: "การลบข้อมูลของคนหนึ่งคน: ข้อความหน่วยความจำของเขาถูกผนึกด้วยกุญแจที่เก็บนอกฐานข้อมูล การลบคือการทำลายกุญแจนั้นหลังผู้อนุมัติลงนาม จากนั้นสแกนไฟล์ฐานข้อมูลดิบไม่พบข้อความของเขา ขณะที่หน่วยความจำของคนอื่นและสายตรวจสอบยังตรวจผ่าน",
  },
  {
    en: "Revocation instead of silent edits: a memory is retired with a written reason and stays visible in the history. A person can pin a few standing rules that are shown to every episode, labelled as their own words and never counted as permission.",
    th: "เพิกถอนแทนการแก้เงียบ ๆ: หน่วยความจำถูกยกเลิกพร้อมเหตุผลที่เขียนไว้และยังเห็นในประวัติ ผู้ใช้ปักหมุดกฎถาวรได้ไม่กี่ข้อ ซึ่งแสดงให้ทุกรอบเห็น ระบุว่าเป็นคำพูดของเขาเอง และไม่นับเป็นการอนุญาต",
  },
  {
    en: "Recall by meaning is opt-in (it needs a local embedding model). On a held-out set of 40 paraphrased questions it found the right memory in the top three for 37 (English, nomic-embed-text), against 6 for plain word matching; for Thai, bge-m3 reached 38 of 40.",
    th: "การเรียกคืนตามความหมายเป็นแบบเลือกเปิด (ต้องมีโมเดล embedding ในเครื่อง) กับชุดทดสอบ 40 คำถามที่เรียบเรียงใหม่ พบหน่วยความจำที่ถูกใน 3 อันดับแรก 37 ข้อ (อังกฤษ, nomic-embed-text) เทียบกับ 6 ข้อสำหรับการจับคำธรรมดา ภาษาไทย bge-m3 ได้ 38 จาก 40",
  },
]

const compared: Row[] = [
  {
    en: "One synthetic workload of 2,000 operations, against LangGraph (SQLite checkpointer) and mem0: the log plus sealed store was 1.5 MB, LangGraph 192 MB, mem0 7.1 MB. All three could return an earlier state exactly. Only Delentia detected an edited record. After each system's own delete call, the person's text was still in the file for LangGraph and mem0; only Delentia's erase removed it.",
    th: "ภาระงานสังเคราะห์หนึ่งชุด 2,000 การดำเนินการ เทียบกับ LangGraph (SQLite checkpointer) และ mem0: บันทึกพร้อมที่เก็บที่ผนึกคือ 1.5 MB, LangGraph 192 MB, mem0 7.1 MB ทั้งสามคืนสถานะก่อนหน้าได้ตรง มีเพียง Delentia ที่ตรวจพบระเบียนที่ถูกแก้ หลังเรียกคำสั่งลบของแต่ละระบบ ข้อความของคนยังอยู่ในไฟล์ของ LangGraph และ mem0 มีเพียงการลบของ Delentia ที่ทำให้หายไป",
  },
]

const notDone: Row[] = [
  { en: "No claim that Delentia memory is more accurate than other systems. On the same 30 questions mem0 found 24, Delentia's default word matching 7, and Delentia with embeddings 22.", th: "ไม่อ้างว่าหน่วยความจำของ Delentia แม่นยำกว่าระบบอื่น กับ 30 คำถามเดียวกัน mem0 พบ 24 การจับคำค่าเริ่มต้นของ Delentia พบ 7 และ Delentia ที่ใช้ embedding พบ 22" },
  { en: "No compression claim. The earlier 74% figure was a formula. Measured in bytes the delta saves 39% to 90%, and ordinary compression of snapshots does about as well.", th: "ไม่อ้างการบีบอัด ตัวเลข 74% เดิมเป็นสูตร เมื่อวัดเป็นไบต์ delta ประหยัด 39% ถึง 90% และการบีบอัดสแนปช็อตธรรมดาทำได้ใกล้เคียง" },
  { en: "No recall-latency claim. With embeddings on, recall costs a few hundred milliseconds.", th: "ไม่อ้างความหน่วงการเรียกคืน เมื่อเปิด embedding การเรียกคืนใช้เวลาราวสองสามร้อยมิลลิวินาที" },
  { en: "Erasure does not yet cover the separate skills database or audit rows written before sealing was added. Not tested with real users' memories. With about a thousand near-identical memories, ranking among look-alikes gets worse.", th: "การลบยังไม่ครอบคลุมฐานข้อมูลทักษะที่แยกต่างหากและแถวตรวจสอบที่เขียนก่อนเพิ่มการผนึก ยังไม่ทดสอบกับหน่วยความจำของผู้ใช้จริง และเมื่อมีหน่วยความจำคล้ายกันราวพันรายการ การจัดอันดับระหว่างรายการที่คล้ายกันแย่ลง" },
  { en: "No compliance claim. Software cannot make an organisation compliant with the PDPA; this only gives you tools to erase and to show what happened.", th: "ไม่อ้างการปฏิบัติตามกฎหมาย ซอฟต์แวร์ทำให้องค์กรปฏิบัติตาม PDPA ไม่ได้ สิ่งนี้เพียงให้เครื่องมือสำหรับลบและแสดงสิ่งที่เกิดขึ้น" },
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

export default function EnterpriseAIMemoryPage() {
  const pathname = usePathname()
  const isTh = getLocaleFromPathname(pathname) === "th"
  const localePrefix = isTh ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {isTh ? "หน่วยความจำของ agent: ตรวจสอบได้ ย้อนดูได้ และลบได้" : "Agent memory you can audit, replay and erase"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "จุดต่างของหน่วยความจำใน Delentia ไม่ใช่ความแม่นยำหรือการบีบอัด แต่เป็นประวัติที่ตรวจสอบได้ การเพิกถอนที่มีเหตุผล และการลบรายบุคคลที่พิสูจน์ได้ หน้านี้แจกแจงสิ่งที่วัดแล้วและสิ่งที่ไม่ได้อ้าง"
              : "What sets Delentia's memory apart is not accuracy or compression. It is a history you can check, revocation with a reason, and erasure of one person that can be proven. This page lists what was measured and what is not claimed."}
          </p>
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-foreground">{isTh ? "สร้างและวัดแล้ว" : "Built and measured"}</h2>
          <List rows={built} isTh={isTh} icon="check" />
        </div>
      </section>

      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "เทียบกับระบบอื่นบนภาระงานเดียว" : "Compared on one workload"}</h2>
          <List rows={compared} isTh={isTh} icon="check" />
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "ไม่ได้อ้าง / ยังไม่ได้ทำ" : "Not claimed / not done"}</h2>
          <List rows={notDone} isTh={isTh} icon="x" />
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto flex flex-col gap-3 sm:flex-row">
          <Link href={`${localePrefix}/benchmark`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "ดูวิธีวัดและแหล่งที่มา" : "Method and sources"}
            <ArrowRight size={14} />
          </Link>
          <Link href={`${localePrefix}/solutions/ai-hallucination-prevention`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            {isTh ? "คำตอบที่ผิดของ AI" : "Wrong answers from AI"}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
