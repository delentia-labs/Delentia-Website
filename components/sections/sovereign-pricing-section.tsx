"use client"

import { Check, Sparkles, ArrowRight, Shield, Zap, Terminal } from "lucide-react"
import Link from "next/link"

interface SovereignPricingSectionProps {
  locale?: "en" | "th"
}

export function SovereignPricingSection({ locale = "en" }: SovereignPricingSectionProps) {
  const isThai = locale === "th"

  const plans = [
    {
      name: "Free Plan",
      nameTh: "Free Plan (ทดลองใช้งาน)",
      price: "$0",
      period: "/month",
      periodTh: "/เดือน",
      desc: "For learning, testing, and exploring the sovereign AI runtime.",
      descTh: "สำหรับการเรียนรู้ ทดสอบ และสำรวจระบบปฏิบัติการ AI Sovereign",
      features: [
        "1,000 Free Credits/mo",
        "50 Core Templates",
        "1 Active Project",
        "Basic JITNA & Intent Parser",
        "Single Edge Model Routing",
        "Community Support",
      ],
      featuresTh: [
        "1,000 เครดิตฟรี/เดือน",
        "50 เทมเพลตมาตรฐาน",
        "1 โปรเจกต์ที่ใช้งาน",
        "JITNA & Intent Parser พื้นฐาน",
        "Edge Model Routing ระดับเริ่มต้น",
        "บริการช่วยเหลือผ่าน Community",
      ],
      popular: false,
      ctaText: "Get Started Free",
      ctaTextTh: "เริ่มต้นใช้งานฟรี",
      ctaHref: "/auth/signin",
    },
    {
      name: "Starter",
      nameTh: "Starter (บุคคล & นักพัฒนา)",
      price: "$14.99",
      period: "/mo",
      periodTh: "/เดือน",
      desc: "For solo builders and creators validating agentic pipelines.",
      descTh: "สำหรับนักพัฒนาเดี่ยวและทีมเล็กที่ต้องการรัน Agent แบบเต็มรูปแบบ",
      features: [
        "5,000 Credits/mo",
        "100 Templates",
        "2 Connected LLM Slots",
        "Full CORD Entropy Scanner",
        "Sub-50ms Delta Memory",
        "Standard Email Support",
      ],
      featuresTh: [
        "5,000 เครดิต/เดือน",
        "100 เทมเพลตมาตรฐาน",
        "เชื่อมต่อ 2 โมเดลพร้อมกัน",
        "เกราะสแกน CORD Entropy เต็มรูปแบบ",
        "Delta Memory เร็วใน <50ms",
        "บริการช่วยเหลือทางอีเมล",
      ],
      popular: false,
      ctaText: "Choose Starter",
      ctaTextTh: "เลือกแพ็กเกจ Starter",
      ctaHref: "/pricing",
    },
    {
      name: "Pro",
      nameTh: "Pro (ยอดนิยมสูงสุด)",
      price: "$39.99",
      period: "/mo",
      periodTh: "/เดือน",
      desc: "Best for professionals requiring Multi-LLM consensus & LoRA swaps.",
      descTh: "เหมาะที่สุดสำหรับมืออาชีพที่ต้องการสภาโหวตหลายโมเดลและสลับ LoRA",
      features: [
        "25,000 Credits/mo",
        "150+ Templates & Workflows",
        "SignedAI Multi-LLM Consensus",
        "Sub-12ms LoRA Hot-Swap",
        "RCTDB 8-Dimensional Memory",
        "Priority Support & Webhooks",
      ],
      featuresTh: [
        "25,000 เครดิต/เดือน",
        "150+ เทมเพลตและเวิร์กโฟลว์",
        "สภาโหวต SignedAI Multi-Model",
        "สลับหน้ากาก LoRA ได้ใน <12ms",
        "หน่วยความจำ 8 มิติ RCTDB",
        "บริการช่วยเหลือระดับพรีเมียม",
      ],
      popular: true,
      ctaText: "Unlock Pro Access",
      ctaTextTh: "ปลดล็อก Pro ทันที",
      ctaHref: "/pricing",
    },
    {
      name: "Business",
      nameTh: "Business (ธุรกิจเติบโต)",
      price: "$99.99",
      period: "/mo",
      periodTh: "/เดือน",
      desc: "For growing businesses requiring white-label & custom integrations.",
      descTh: "สำหรับธุรกิจที่ต้องการ White-label และการเชื่อมต่อระดับองค์กร",
      features: [
        "Unlimited Usage Bands",
        "White-label Custom Branding",
        "Custom Integrations & API",
        "Dedicated Neural File Bridge",
        "Autonomous Cron Loop",
        "PDPA / GDPR Compliance SLA",
      ],
      featuresTh: [
        "โควต้าใช้งานไม่จำกัด",
        "ปรับแต่งแบรนด์แบบ White-label",
        "การเชื่อมต่อ API และระบบเฉพาะ",
        "ท่อส่งไฟล์ Neural File Bridge",
        "ระบบ Autonomous Cron อัตโนมัติ",
        "รับรองมาตรฐาน PDPA / GDPR",
      ],
      popular: false,
      ctaText: "Scale Business",
      ctaTextTh: "เริ่มต้นแพ็กเกจธุรกิจ",
      ctaHref: "/pricing",
    },
  ]

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-3 py-1 font-mono text-xs text-warm-amber mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>SOVEREIGN ACCESS & SUBSCRIPTION TIERS</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          {isThai ? "เลือกระดับพลังสำหรับระบบของคุณ" : "Transparent Sovereign Pricing"}
        </h2>
        <p className="mt-4 text-base text-warm-dim">
          {isThai
            ? "ไม่มีค่าธรรมเนียมแอบแฝง ปลดล็อกพลังสถาปัตยกรรม 10 เลเยอร์ และสมองกล Sovereign AI ได้ทันที"
            : "No hidden fees. Unlock the power of 10-layer cognitive architecture, Bonsai 27B, and verifiable safety."}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
              plan.popular
                ? "border-warm-amber bg-warm-amber/10 shadow-[0_0_30px_rgba(212,168,83,0.18)] ring-1 ring-warm-amber/50"
                : "border-border bg-card shadow-sm hover:border-warm-amber/40 hover:shadow-md dark:bg-card/70"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-warm-amber px-3 py-0.5 font-mono text-[11px] font-bold text-warm-charcoal shadow-md">
                ⭐ MOST POPULAR
              </div>
            )}

            <div>
              <div className="font-bold text-lg text-foreground mb-1">{isThai ? plan.nameTh : plan.name}</div>
              <p className="text-xs text-muted-foreground mb-4 min-h-[36px]">{isThai ? plan.descTh : plan.desc}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{isThai ? plan.periodTh : plan.period}</span>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 mb-8 text-xs text-foreground/85">
                {(isThai ? plan.featuresTh : plan.features).map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-warm-amber shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.ctaHref}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-mono text-xs font-bold transition-all ${
                plan.popular
                  ? "bg-warm-amber text-warm-charcoal hover:bg-warm-amber/90 shadow-md cursor-pointer"
                  : "border border-border bg-secondary text-foreground hover:bg-secondary/80 cursor-pointer"
              }`}
            >
              <span>{isThai ? plan.ctaTextTh : plan.ctaText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Enterprise Banner */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 text-warm-amber font-mono text-xs font-bold mb-1">
            <Shield className="h-4 w-4" />
            <span>ENTERPRISE SOVEREIGN NODE</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            {isThai ? "ต้องการคลัสเตอร์ส่วนตัว Dedicated On-Premise หรือ SLA พิเศษ?" : "Need Dedicated On-Premise Cluster or Custom SLAs?"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {isThai
              ? "รองรับการ Deploy บนเซิร์ฟเวอร์ส่วนตัวขององค์กร, การเชื่อมต่อ HSM Hardware และใบรับรองกฎหมายเฉพาะทาง"
              : "Includes on-premise sovereign deployments, HSM hardware key integration, and custom compliance audits."}
          </p>
        </div>

        <Link
          href="/contact"
          className="whitespace-nowrap rounded-xl border border-border bg-secondary hover:bg-secondary/80 px-6 py-3 font-mono text-xs font-bold text-foreground transition-colors cursor-pointer"
        >
          {isThai ? "ติดต่อทีมงาน Enterprise" : "Contact Enterprise Sales"}
        </Link>
      </div>
    </section>
  )
}
