"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Check, X, ArrowRight } from "lucide-react"

// Round 87 (claims review). This page used to say Delentia "processes all data on-premises ... ensuring compliance
// with PDPA, APPI" and listed models "optimised" for each language through a seven-model HexaCore. What is built is
// narrower and more useful: the model is a setting, the safety rules live in code outside the model, and a
// per-tenant data-residency policy is checked before every model call. The page now says exactly that, and what it
// does not do (it does not know any country's law, it is not legal advice, and no national model is bundled).

type Row = { en: string; th: string }

const built: Row[] = [
  {
    en: "The model is a setting, not a dependency. Choose a model on your own machine (Ollama), any model on OpenRouter, or any OpenAI-compatible endpoint, which is how a national or self-hosted AI plugs in. On the Models page you pick country, then provider, then model, or enter your own.",
    th: "โมเดลเป็นการตั้งค่า ไม่ใช่สิ่งที่ผูกมัด เลือกโมเดลบนเครื่องของคุณ (Ollama) โมเดลใดก็ได้บน OpenRouter หรือ endpoint ที่เข้ากันได้กับ OpenAI ซึ่งเป็นช่องทางที่ AI ระดับชาติหรือที่โฮสต์เองเสียบเข้ามา ในหน้า Models คุณเลือกประเทศ ผู้ให้บริการ แล้วโมเดล หรือกรอกเอง",
  },
  {
    en: "The safety rules do not depend on the model. The safety gate, the human signatures and the audit log are code outside the model, so they apply the same way whichever model is chosen. The model changes how capable the agent is, not how safe it is.",
    th: "กฎความปลอดภัยไม่ขึ้นกับโมเดล ด่านความปลอดภัย ลายเซ็นของมนุษย์ และบันทึกตรวจสอบเป็นโค้ดที่อยู่นอกโมเดล จึงใช้เหมือนกันไม่ว่าเลือกโมเดลไหน โมเดลเปลี่ยนความสามารถของ agent ไม่ได้เปลี่ยนความปลอดภัย",
  },
  {
    en: "A data-residency policy per organisation, checked before every model call: home region, allowed regions, whether any cross-border call is allowed, and what to do with personal data (allow, redact or block). A blocked call is never sent. Each decision is written to the audit log without the personal data itself.",
    th: "นโยบายที่เก็บข้อมูลต่อองค์กร ตรวจก่อนทุกการเรียกโมเดล: ภูมิภาคหลัก ภูมิภาคที่อนุญาต อนุญาตข้ามพรมแดนหรือไม่ และจะทำอย่างไรกับข้อมูลส่วนบุคคล (อนุญาต ปกปิด หรือบล็อก) การเรียกที่ถูกบล็อกจะไม่ถูกส่งออก ทุกการตัดสินถูกบันทึกในบันทึกตรวจสอบโดยไม่เก็บข้อมูลส่วนบุคคลนั้น",
  },
  {
    en: "A personal-data scanner with national checksums (Thai ID, Japanese My Number, Chinese resident ID, Korean resident number), plus payment cards, e-mail addresses and phone numbers.",
    th: "ตัวสแกนข้อมูลส่วนบุคคลที่ตรวจเลขตรวจสอบของแต่ละประเทศ (บัตรประชาชนไทย My Number ญี่ปุ่น บัตรประชาชนจีน เลขทะเบียนเกาหลี) รวมถึงบัตรชำระเงิน อีเมล และเบอร์โทร",
  },
  {
    en: "A router that suggests a model by detected language and region from a table you can edit, and backup models that may never expose data more than the main model does.",
    th: "ตัวเลือกโมเดลที่เสนอโมเดลตามภาษาและภูมิภาคที่ตรวจพบ จากตารางที่คุณแก้ได้ และโมเดลสำรองที่ต้องไม่เปิดเผยข้อมูลมากกว่าโมเดลหลัก",
  },
]

const notDone: Row[] = [
  { en: "It does not know any country's law. It enforces the rules your organisation writes. It is not legal advice, and you decide which rules apply to you.", th: "ระบบไม่รู้กฎหมายของประเทศใด มันบังคับใช้กฎที่องค์กรของคุณเขียน ไม่ใช่คำแนะนำทางกฎหมาย และคุณเป็นผู้ตัดสินว่ากฎใดใช้กับคุณ" },
  { en: "It cannot see what a provider does with data once it arrives. That is a matter for your contract with the provider.", th: "ระบบมองไม่เห็นว่าผู้ให้บริการทำอะไรกับข้อมูลหลังจากข้อมูลไปถึง นั่นเป็นเรื่องของสัญญากับผู้ให้บริการ" },
  { en: "It covers the model calls the agent makes. Other network tools are not model calls and are not covered by this policy.", th: "ครอบคลุมการเรียกโมเดลของ agent เครื่องมือเครือข่ายอื่นไม่ใช่การเรียกโมเดลและไม่อยู่ในนโยบายนี้" },
  { en: "No national model is bundled and none is a partner. The default routing table is the author's starting guess, and no quality comparison per language has been run.", th: "ไม่มีโมเดลระดับชาติรวมมาและไม่มีโมเดลใดเป็นพาร์ตเนอร์ ตารางเลือกโมเดลค่าเริ่มต้นเป็นการเดาเริ่มต้นของผู้พัฒนา และยังไม่เคยเปรียบเทียบคุณภาพรายภาษา" },
  { en: "Results were tuned and tested on a few models, mostly small local ones. Report any result per model, never pooled.", th: "ผลถูกปรับและทดสอบกับโมเดลไม่กี่ตัว ส่วนใหญ่เป็นโมเดลท้องถิ่นขนาดเล็ก ควรรายงานผลแยกตามโมเดล ไม่รวมกัน" },
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

export default function RegionalAIPage() {
  const pathname = usePathname()
  const isTh = getLocaleFromPathname(pathname) === "th"
  const localePrefix = isTh ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
            {isTh ? "AI ระดับชาติ: ใช้โมเดลของประเทศคุณ ภายใต้กฎของคุณเอง" : "National AI: use your own country's model, under your own rules"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "Delentia ไม่ผูกคุณกับโมเดลหรือประเทศใดประเทศหนึ่ง องค์กรไทยเลือกโมเดลไทยได้ องค์กรญี่ปุ่นเลือกโมเดลญี่ปุ่นได้ หรือรันโมเดลบนเครื่องตัวเองได้ ด่านความปลอดภัยยังเหมือนเดิม เพราะอยู่นอกโมเดล นี่คือความเป็นกลางที่ตรวจสอบได้จากโค้ด"
              : "Delentia does not tie you to one model or one country. A Thai organisation can choose a Thai model, a Japanese one a Japanese model, or run a model on its own machine. The safety gate stays the same because it sits outside the model. That is neutrality you can check in the code."}
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
          <h2 className="text-lg font-bold mb-4 text-foreground">{isTh ? "สิ่งที่ไม่ได้ทำ" : "What it does not do"}</h2>
          <List rows={notDone} isTh={isTh} icon="x" />
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto flex flex-col gap-3 sm:flex-row">
          <Link href={`${localePrefix}/solutions/dynamic-ai-routing`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "การเลือกโมเดลทำงานอย่างไร" : "How the model is chosen"}
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
