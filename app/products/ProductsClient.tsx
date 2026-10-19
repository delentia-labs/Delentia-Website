"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Check } from "lucide-react"
import { getLocaleFromPathname } from "@/lib/i18n"
import { SOCIAL_LINKS } from "@/lib/site-config"

// Round 87 (claims review). This page used to present three products: "Delentia Platform" (a testing and
// certification platform), "Delentia AI" (a Personal Agent OS / creative engine) and "SignedAI" (a hallucination
// reduction API). None of those is offered as described. What exists, and can be installed today:
//   1. delentia-os   the open-source agent runtime (pip install delentia-os)
//   2. delentia-mcp  a connector to a small live MCP gateway on Cloudflare Workers (npx delentia-mcp)
//   3. delentia-guard an MCP proxy that gates tool calls and signs an audit log (npm)
// plus the SignedAI jury, which is a component of the runtime. The two retired product pages redirect here.

type Row = { en: string; th: string }
type Product = {
  id: string
  title: string
  tag: Row
  desc: Row
  features: Row[]
  install: string
  href: string
  hrefLabel: Row
}

const products: Product[] = [
  {
    id: "delentia-os",
    title: "Delentia OS",
    tag: { en: "Open-source agent runtime", th: "รันไทม์ agent โอเพนซอร์ส" },
    desc: {
      en: "An agent loop in which every action passes a safety gate, risky actions wait for a human signature, and every episode leaves a signed, hash-chained audit log. Runs on your machine with a local model or your own provider key.",
      th: "ลูป agent ที่ทุกการกระทำผ่านด่านความปลอดภัย การกระทำที่เสี่ยงรอลายเซ็นของมนุษย์ และทุกรอบทิ้งบันทึกตรวจสอบที่ลงนามและเชื่อม hash รันบนเครื่องของคุณด้วยโมเดลในเครื่องหรือคีย์ของคุณเอง",
    },
    features: [
      { en: "Model-free demo: delentia demo run compare --scripted", th: "เดโมที่ไม่ต้องมีโมเดล: delentia demo run compare --scripted" },
      { en: "Policy written in plain sentences, shown back before saving", th: "นโยบายที่เขียนเป็นประโยคธรรมดา แสดงให้ดูก่อนบันทึก" },
      { en: "Memory you can replay, revoke and erase", th: "หน่วยความจำที่ย้อนดู เพิกถอน และลบได้" },
      { en: "Optional jury of independent models (SignedAI)", th: "คณะลูกขุนของโมเดลอิสระแบบเลือกใช้ (SignedAI)" },
    ],
    install: "pip install delentia-os",
    href: SOCIAL_LINKS.platformGithub,
    hrefLabel: { en: "GitHub", th: "GitHub" },
  },
  {
    id: "delentia-guard",
    title: "Delentia Guard",
    tag: { en: "MCP proxy", th: "MCP proxy" },
    desc: {
      en: "Sits between an AI client and its MCP tools: every tool call is judged before it runs, and each decision is written to an Ed25519-signed audit log. It runs as a separate process from the agent.",
      th: "อยู่ระหว่างไคลเอนต์ AI กับเครื่องมือ MCP: ทุกการเรียกเครื่องมือถูกตัดสินก่อนรัน และทุกการตัดสินถูกเขียนลงบันทึกตรวจสอบที่ลงนาม Ed25519 ทำงานเป็นโพรเซสแยกจาก agent",
    },
    features: [
      { en: "Signed audit log you can verify offline", th: "บันทึกตรวจสอบที่ลงนามและตรวจแบบออฟไลน์ได้" },
      { en: "Refuses calls that name its own key file or log", th: "ปฏิเสธการเรียกที่ระบุไฟล์กุญแจหรือบันทึกของตัวเอง" },
      { en: "Apache-2.0", th: "Apache-2.0" },
    ],
    install: "npm i -g delentia-guard",
    href: "https://www.npmjs.com/package/delentia-guard",
    hrefLabel: { en: "npm", th: "npm" },
  },
  {
    id: "delentia-mcp",
    title: "Delentia MCP",
    tag: { en: "Live MCP connector", th: "ตัวเชื่อม MCP ที่ใช้งานอยู่" },
    desc: {
      en: "A connector to a small live MCP gateway running on Cloudflare Workers: six tools including the FDIA gate evaluation, a seven-step reasoning prompt and context compression. It is a gateway for your own model; it has no model of its own.",
      th: "ตัวเชื่อมไปยัง MCP gateway ขนาดเล็กที่ทำงานอยู่บน Cloudflare Workers: เครื่องมือ 6 ตัว รวมการประเมินด่าน FDIA พรอมต์การให้เหตุผลเจ็ดขั้น และการบีบอัดบริบท เป็นช่องทางสำหรับโมเดลของคุณเอง ไม่มีโมเดลของตัวเอง",
    },
    features: [
      { en: "Six tools, 286 passing tests in the connector's CI", th: "เครื่องมือ 6 ตัว ชุดทดสอบผ่าน 286 รายการใน CI ของตัวเชื่อม" },
      { en: "No SLA and no uptime promise", th: "ไม่มี SLA และไม่สัญญา uptime" },
    ],
    install: "npx delentia-mcp",
    href: "https://www.npmjs.com/package/delentia-mcp",
    hrefLabel: { en: "npm", th: "npm" },
  },
]

export default function ProductsPage() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isTh = language === "th"
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      <section className="pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            {isTh ? "สิ่งที่ติดตั้งและใช้ได้ตอนนี้" : "What you can install and use today"}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {isTh
              ? "สามชิ้น ทั้งหมดโอเพนซอร์ส ไม่มีบริการโฮสต์ ไม่มีราคา และไม่มีลูกค้าองค์กร ผลิตภัณฑ์ที่เคยแสดงในหน้านี้ (Delentia Platform สำหรับทดสอบ, Delentia AI, SignedAI แบบ API) ไม่ได้เปิดให้บริการตามที่บรรยายไว้ และถูกถอนแล้ว"
              : "Three pieces, all open source. There is no hosted service, no price and no enterprise customer. The products this page used to show (a Delentia Platform for testing, Delentia AI, SignedAI as an API) were not offered as described and have been withdrawn."}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">{product.title}</h2>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-warm-amber">{isTh ? product.tag.th : product.tag.en}</span>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{isTh ? product.desc.th : product.desc.en}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {product.features.map((feature) => (
                  <li key={feature.en} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check size={14} className="mt-0.5 shrink-0 text-warm-sage" />
                    <span>{isTh ? feature.th : feature.en}</span>
                  </li>
                ))}
              </ul>
              <code className="mt-5 block rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground">{product.install}</code>
              <a href={product.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-warm-amber hover:underline">
                {isTh ? product.hrefLabel.th : product.hrefLabel.en}
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row">
          <Link href={`${localePrefix}/pricing`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-semibold text-white hover:bg-[#C49A48] transition-colors">
            {isTh ? "วิธีใช้และสิ่งที่ยังไม่มี" : "How to use it, and what does not exist"}
            <ArrowRight size={14} />
          </Link>
          <Link href={`${localePrefix}/products/signed-ai`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
            {isTh ? "คณะลูกขุน SignedAI" : "The SignedAI jury"}
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
