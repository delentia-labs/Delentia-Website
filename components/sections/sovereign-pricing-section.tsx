"use client"

import { Check, Sparkles, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"
import { SOCIAL_LINKS } from "@/lib/site-config"

interface SovereignPricingSectionProps {
  locale?: "en" | "th"
}

// Round 87 (claims review): this section used to show four paid subscription tiers (credits, "LoRA hot-swap",
// "PDPA / GDPR compliance SLA", white-label, "unlimited usage"). None of those exist: there is no billing, no
// credit system, no hosted service, no LoRA adapter and no compliance certificate. What exists today is an
// open-source runtime, and design-partner pilots by invitation. The cards below say exactly that.
export function SovereignPricingSection({ locale = "en" }: SovereignPricingSectionProps) {
  const isThai = locale === "th"

  const plans = [
    {
      name: "Open source — use it today",
      nameTh: "โอเพนซอร์ส — ใช้ได้เลยตอนนี้",
      price: "Free",
      priceTh: "ฟรี",
      desc: "The agent runtime, its safety gate and a signed audit trail. Runs on your own machine.",
      descTh: "รันไทม์ของ agent ด่านความปลอดภัย และบันทึกตรวจสอบที่ลงนาม รันบนเครื่องของคุณเอง",
      features: [
        "pip install delentia-os",
        "delentia demo run compare --scripted (no model, no key)",
        "Human-signed approvals before risky actions",
        "Hash-chained, signed audit log you can verify yourself",
        "Works with a local model or your own provider key",
      ],
      featuresTh: [
        "pip install delentia-os",
        "delentia demo run compare --scripted (ไม่ต้องมีโมเดล ไม่ต้องมีคีย์)",
        "ต้องมีมนุษย์ลงนามอนุมัติก่อนการกระทำที่เสี่ยง",
        "บันทึกตรวจสอบแบบ hash-chain ที่ลงนาม ตรวจเองได้",
        "ใช้กับโมเดลในเครื่องหรือคีย์ผู้ให้บริการของคุณเอง",
      ],
      highlighted: true,
      ctaText: "Read the quickstart",
      ctaTextTh: "อ่าน Quickstart",
      ctaHref: SOCIAL_LINKS.platformDocs,
      external: true,
    },
    {
      name: "Design-partner pilot — by invitation",
      nameTh: "Pilot กับ design partner — โดยเชิญ",
      price: "Free for the first partners",
      priceTh: "ฟรีสำหรับพาร์ตเนอร์กลุ่มแรก",
      desc: "We set it up with you on one real workflow, measure it against a plain agent, and publish the result only with your permission.",
      descTh: "เราตั้งค่าร่วมกับคุณบนงานจริงหนึ่งงาน วัดเทียบกับ agent ธรรมดา และเผยแพร่ผลเมื่อคุณอนุญาตเท่านั้น",
      features: [
        "One workflow, run end to end",
        "Pass rule written before the first run",
        "Results reported per workflow, failures included",
        "Your data stays under your own policy",
      ],
      featuresTh: [
        "หนึ่ง workflow รันครบทั้งงาน",
        "เกณฑ์ผ่านเขียนไว้ก่อนรันครั้งแรก",
        "รายงานผลแยกตามงาน รวมที่ล้มเหลว",
        "ข้อมูลอยู่ภายใต้นโยบายของคุณเอง",
      ],
      highlighted: false,
      ctaText: "Talk to the founder",
      ctaTextTh: "คุยกับผู้ก่อตั้ง",
      ctaHref: `/${locale}/contact`,
      external: false,
    },
    {
      name: "Hosted service — not available yet",
      nameTh: "บริการโฮสต์ — ยังไม่เปิด",
      price: "No price yet",
      priceTh: "ยังไม่มีราคา",
      desc: "There is no hosted Delentia service and no SLA today. Leave your address and we will tell you if that changes.",
      descTh: "ตอนนี้ยังไม่มีบริการ Delentia แบบโฮสต์และยังไม่มี SLA ฝากอีเมลไว้ แล้วเราจะแจ้งเมื่อมีการเปลี่ยนแปลง",
      features: [
        "No credits, plans or billing exist yet",
        "No uptime promise is made",
        "No compliance certificate is claimed",
      ],
      featuresTh: [
        "ยังไม่มีเครดิต แพ็กเกจ หรือระบบเรียกเก็บเงิน",
        "ไม่มีการสัญญาเรื่อง uptime",
        "ไม่อ้างใบรับรองมาตรฐานใด ๆ",
      ],
      highlighted: false,
      ctaText: "Join the waitlist",
      ctaTextTh: "ลงชื่อรอ",
      ctaHref: `/${locale}/contact`,
      external: false,
    },
  ]

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-3 py-1 font-mono text-xs text-warm-amber mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{isThai ? "วิธีใช้ DELENTIA ตอนนี้" : "WAYS TO USE DELENTIA TODAY"}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {isThai ? "สิ่งที่ใช้ได้จริง และสิ่งที่ยังไม่มี" : "What you can use now, and what does not exist yet"}
        </h2>
        <p className="mt-4 text-base text-warm-dim">
          {isThai
            ? "Delentia ยังอยู่ในระยะเริ่มต้น ผู้พัฒนาคนเดียว ไม่มีลูกค้าองค์กรและไม่มีบริการโฮสต์ เราเขียนไว้ตรง ๆ เพื่อให้คุณตัดสินใจจากข้อเท็จจริง"
            : "Delentia is at an early stage, built by one person. It has no enterprise customers and no hosted service. We say so plainly so you can decide on facts."}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
              plan.highlighted
                ? "border-warm-amber bg-warm-amber/10 shadow-[0_0_30px_rgba(212,168,83,0.18)] ring-1 ring-warm-amber/50"
                : "border-border bg-card shadow-sm hover:border-warm-amber/40 hover:shadow-md dark:bg-card/70"
            }`}
          >
            <div>
              <div className="font-bold text-lg text-foreground mb-1">{isThai ? plan.nameTh : plan.name}</div>
              <p className="text-xs text-muted-foreground mb-4 min-h-[48px]">{isThai ? plan.descTh : plan.desc}</p>

              <div className="mb-6">
                <span className="text-2xl font-extrabold text-foreground">{isThai ? plan.priceTh : plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-foreground/85">
                {(isThai ? plan.featuresTh : plan.features).map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-warm-amber shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {plan.external ? (
              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-warm-amber py-3 px-4 font-mono text-xs font-bold text-warm-charcoal shadow-md transition-all hover:bg-warm-amber/90"
              >
                <span>{isThai ? plan.ctaTextTh : plan.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                href={plan.ctaHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary py-3 px-4 font-mono text-xs font-bold text-foreground transition-all hover:bg-secondary/80"
              >
                <span>{isThai ? plan.ctaTextTh : plan.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* What is measured */}
      <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 text-warm-amber font-mono text-xs font-bold mb-1">
            <Shield className="h-4 w-4" />
            <span>{isThai ? "สิ่งที่วัดแล้ว และสิ่งที่ยังไม่ได้วัด" : "WHAT IS MEASURED, AND WHAT IS NOT"}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {isThai ? "ทุกตัวเลขมีวิธีวัดและข้อจำกัดกำกับ" : "Every number comes with its method and its limits"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {isThai
              ? "ยังไม่มีผลการวัดกับโมเดลที่เก่งพอ ผลที่มีอยู่มาจากโมเดลสคริปต์และโมเดลขนาดเล็กในเครื่อง และเราระบุไว้ในแต่ละผล"
              : "No result with a capable model exists yet. What we have comes from scripted models and small local models, and each result says so."}
          </p>
        </div>

        <Link
          href={`/${locale}/benchmark`}
          className="whitespace-nowrap rounded-xl border border-border bg-secondary px-6 py-3 font-mono text-xs font-bold text-foreground transition-colors hover:bg-secondary/80"
        >
          {isThai ? "ดูผลที่วัดแล้ว" : "See what is measured"}
        </Link>
      </div>
    </section>
  )
}
