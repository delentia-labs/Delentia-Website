"use client"

import { Check, X, ArrowRight, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { buildContactHref } from "@/lib/funnel"
import { SOCIAL_LINKS } from "@/lib/site-config"

// Round 87 (claims review). This page used to list five subscription tiers, three "enterprise product suites"
// with SOC2 / blockchain / on-premise / custom-SLA lines, a SignedAI per-review price list ($0.10 to $5.00 for
// 1 to 8 "HexaCore" models) and a comparison table of three products. None of that is sold or exists:
// there is no billing, no hosted service, no SOC2 report, no blockchain and no per-review API. What exists is an
// open-source runtime and design-partner pilots by invitation. This page says that, and lists what is NOT available.

type Row = { en: string; th: string }

const todayEn: Row[] = [
  { en: "The agent runtime, installed with pip install delentia-os (Apache-2.0)", th: "รันไทม์ของ agent ติดตั้งด้วย pip install delentia-os (Apache-2.0)" },
  { en: "A model-free demo: delentia demo run compare --scripted", th: "เดโมที่ไม่ต้องมีโมเดล: delentia demo run compare --scripted" },
  { en: "A safety gate before each tool call, with human-signed approvals for risky actions", th: "ด่านความปลอดภัยก่อนเรียกเครื่องมือทุกครั้ง และต้องมีมนุษย์ลงนามสำหรับการกระทำที่เสี่ยง" },
  { en: "A hash-chained, signed audit log you can verify on your own machine", th: "บันทึกตรวจสอบแบบ hash-chain ที่ลงนาม ตรวจสอบได้บนเครื่องของคุณเอง" },
  { en: "A policy you write in plain sentences; the tool shows what it understood before saving", th: "นโยบายที่เขียนเป็นประโยคธรรมดา ระบบแสดงสิ่งที่เข้าใจให้ดูก่อนบันทึก" },
]

const notAvailable: Row[] = [
  { en: "A hosted Delentia service, accounts, credits or billing", th: "บริการ Delentia แบบโฮสต์ บัญชีผู้ใช้ เครดิต หรือการเรียกเก็บเงิน" },
  { en: "An uptime promise or any SLA", th: "สัญญา uptime หรือ SLA ใด ๆ" },
  { en: "A SOC 2 report or any compliance certificate", th: "รายงาน SOC 2 หรือใบรับรองมาตรฐานใด ๆ" },
  { en: "A per-review verification API or a multi-model consensus service", th: "API ตรวจสอบแบบคิดราคาต่อครั้ง หรือบริการฉันทามติหลายโมเดล" },
  { en: "Enterprise customers. There are none yet", th: "ลูกค้าองค์กร ตอนนี้ยังไม่มี" },
]

const faq: { q: Row; a: Row }[] = [
  {
    q: { en: "Is Delentia free?", th: "Delentia ฟรีไหม" },
    a: {
      en: "The runtime is open source (Apache-2.0) and free to install and run. You pay your own model provider if you use one; with a local model you pay nothing.",
      th: "รันไทม์เป็นโอเพนซอร์ส (Apache-2.0) ติดตั้งและรันได้ฟรี หากใช้ผู้ให้บริการโมเดลก็จ่ายให้ผู้ให้บริการนั้นเอง ถ้าใช้โมเดลในเครื่องก็ไม่เสียอะไร",
    },
  },
  {
    q: { en: "What is a design-partner pilot?", th: "Pilot กับ design partner คืออะไร" },
    a: {
      en: "We set Delentia up with you on one real workflow, write the pass rule before the first run, measure it against a plain agent, and report the result per workflow, failures included. We publish it only with your permission. There is no fee for the first partners.",
      th: "เราตั้งค่า Delentia ร่วมกับคุณบนงานจริงหนึ่งงาน เขียนเกณฑ์ผ่านก่อนรันครั้งแรก วัดเทียบกับ agent ธรรมดา และรายงานผลแยกตามงาน รวมที่ล้มเหลว เผยแพร่เมื่อคุณอนุญาตเท่านั้น พาร์ตเนอร์กลุ่มแรกไม่มีค่าใช้จ่าย",
    },
  },
  {
    q: { en: "Can I run it on-premise or sign a custom SLA?", th: "ติดตั้งในองค์กรหรือทำ SLA เฉพาะได้ไหม" },
    a: {
      en: "You can run the open-source runtime on your own machines today. There is no managed deployment and no SLA offered. Talk to the founder if you need either; we will say plainly whether we can help.",
      th: "คุณรันรันไทม์โอเพนซอร์สบนเครื่องของคุณเองได้ตอนนี้ แต่ยังไม่มีบริการติดตั้งให้และไม่มี SLA หากต้องการอย่างใดอย่างหนึ่ง คุยกับผู้ก่อตั้งได้ เราจะบอกตรง ๆ ว่าช่วยได้หรือไม่",
    },
  },
]

export default function PricingPage() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const contactHref = buildContactHref(language, "pricing:pilot")
  const waitlistHref = buildContactHref(language, "pricing:hosted-waitlist")

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0D0D0D] transition-colors duration-300">
      <Navbar />

      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-300 mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 bg-[#D4A85318] text-warm-amber">
            <Sparkles size={12} />
            {isTh ? "วิธีใช้ตอนนี้" : "How to use it today"}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-warm-charcoal dark:text-warm-light-gray">
            {isTh ? "ไม่มีแพ็กเกจราคา " : "There are no price plans. "}
            <span className="font-display font-semibold text-warm-amber">{isTh ? "เพราะยังไม่มีบริการให้ขาย" : "There is no service to sell yet."}</span>
          </h1>
          <p className="text-base max-w-2xl mx-auto text-warm-gray dark:text-[#888]">
            {isTh
              ? "Delentia เป็นโอเพนซอร์สที่พัฒนาโดยคนคนเดียว ใช้ได้ฟรีบนเครื่องของคุณ ตอนนี้เรากำลังหา design partner กลุ่มแรก หน้านี้บอกว่ามีอะไรให้ใช้ และอะไรที่ยังไม่มี"
              : "Delentia is open source, built by one person, and free to run on your own machine. We are looking for the first design partners. This page says what you can use and what does not exist."}
          </p>
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-300 mx-auto grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-warm-amber/40 bg-white p-6 dark:bg-[#1E1E1E]">
            <h2 className="text-lg font-bold text-warm-charcoal dark:text-warm-light-gray mb-4">{isTh ? "ใช้ได้ตอนนี้ (ฟรี)" : "Available now (free)"}</h2>
            <ul className="space-y-3">
              {todayEn.map((row) => (
                <li key={row.en} className="flex items-start gap-2 text-sm text-[#4A4A4A] dark:text-[#AAA]">
                  <Check size={16} className="mt-0.5 shrink-0 text-warm-sage" />
                  <span>{isTh ? row.th : row.en}</span>
                </li>
              ))}
            </ul>
            <a
              href={SOCIAL_LINKS.platformDocs}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-warm-amber px-5 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors"
            >
              {isTh ? "อ่าน Quickstart" : "Read the quickstart"}
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="rounded-2xl border border-warm-light-gray bg-white p-6 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
            <h2 className="text-lg font-bold text-warm-charcoal dark:text-warm-light-gray mb-4">{isTh ? "ยังไม่มี" : "Not available"}</h2>
            <ul className="space-y-3">
              {notAvailable.map((row) => (
                <li key={row.en} className="flex items-start gap-2 text-sm text-[#4A4A4A] dark:text-[#AAA]">
                  <X size={16} className="mt-0.5 shrink-0 text-[#999]" />
                  <span>{isTh ? row.th : row.en}</span>
                </li>
              ))}
            </ul>
            <Link
              href={waitlistHref}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-warm-light-gray px-5 py-3 text-sm font-semibold text-warm-charcoal hover:bg-warm-sand dark:border-[#2A2A2A] dark:text-warm-light-gray dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {isTh ? "ลงชื่อรอบริการโฮสต์" : "Join the hosted-service waitlist"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-250 mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center text-warm-charcoal dark:text-warm-light-gray">
            {isTh ? "คำถามที่พบบ่อย" : "Questions"}
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q.en} className="rounded-xl border border-warm-light-gray bg-white p-5 dark:border-[#2A2A2A] dark:bg-[#1E1E1E]">
                <h3 className="text-sm font-semibold text-warm-charcoal dark:text-warm-light-gray">{isTh ? item.q.th : item.q.en}</h3>
                <p className="mt-2 text-sm text-warm-gray dark:text-[#888]">{isTh ? item.a.th : item.a.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#141414]">
        <div className="max-w-200 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-warm-charcoal dark:text-warm-light-gray">
            {isTh ? "อยากลองกับงานจริงของคุณ?" : "Want to try it on a real workflow?"}
          </h2>
          <p className="text-sm mb-8 max-w-xl mx-auto text-warm-gray dark:text-[#888]">
            {isTh
              ? "บอกเราว่างานของคุณคืออะไร เราจะตอบตรง ๆ ว่าเหมาะกับ Delentia หรือไม่ ก่อนที่คุณจะเสียเวลา"
              : "Tell us what the workflow is. We will tell you plainly whether Delentia fits it before you spend any time."}
          </p>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 bg-warm-amber text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#C49A48] transition-colors shadow-md"
          >
            {isTh ? "คุยกับผู้ก่อตั้ง" : "Talk to the founder"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
