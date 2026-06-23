"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JITNAPlayground } from "@/components/jitna-playground"

const translations = {
  en: {
    breadcrumb: "Philosophy",
    title: "JITNA Language",
    subtitle: "Just-In-Time Natural Action language for precise intent specification",
    code_example: {
      intent: "INTENT: Optimize resource allocation",
      context: "CONTEXT: Budget constraints, team capacity",
      priority: "PRIORITY: Cost efficiency > Team satisfaction",
      action: "ACTION: Allocate resources using Pareto optimization",
      validate: "VALIDATE: Cost savings > 15% AND satisfaction > 4/5"
    },
    features_title: "Core Components",
    features: [
      { title: "Natural Language Foundation", desc: "Written in plain English that both humans and machines can understand. No arcane syntax or cryptic notation." },
      { title: "Structured Intent", desc: "Clear sections for intent, context, priorities, and validation. Every element serves a purpose in specification." },
      { title: "Composability", desc: "Combine simple intent statements into complex, hierarchical specifications. Modular and reusable by design." },
      { title: "Verifiability", desc: "Every JITNA statement includes validation criteria. Actions can be measured against original intent." }
    ],
    examples_title: "Example Specifications",
    examples: [
      { title: "Recommendation System", content: `INTENT: Provide personalized product recommendations\nCONTEXT: User browsing history, purchase patterns\nPRIORITY: Relevance > Diversity > Profitability\nACTION: Generate top 5 recommendations\nVALIDATE: CTR > baseline AND diversity score > 0.7` },
      { title: "Content Moderation", content: `INTENT: Maintain community safety while preserving expression\nCONTEXT: User reports, content policies, community norms\nPRIORITY: Prevent harm > Minimize false positives\nACTION: Flag or remove violating content\nVALIDATE: False positive rate < 5% AND incident response < 2h` }
    ],
    why_title: "Why JITNA?",
    why: [
      { title: "Bridge the Semantic Gap", desc: "Close the distance between human intent and machine execution. JITNA ensures nothing is lost in translation." },
      { title: "Enable Accountability", desc: "Explicit validation criteria create measurable outcomes. We can prove whether systems are truly aligned with intent." },
      { title: "Facilitate Collaboration", desc: "Humans and AI collaborate using the same language. Engineers, managers, and stakeholders all speak JITNA." },
      { title: "Reduce Errors and Bias", desc: "By making intent explicit, we can identify and correct misalignments before they compound into systemic problems." }
    ],
    next_title: "Final Concept",
    next_concept: "Intent OS",
    next_desc: "Discover the future operating system built entirely on intent-driven principles.",
    next_cta: "Explore Intent OS"
  },
  th: {
    breadcrumb: "ปรัชญา",
    title: "ภาษา JITNA",
    subtitle: "ภาษา Just-In-Time Natural Action สำหรับการระบุเจตนาอย่างแม่นยำ",
    code_example: {
      intent: "INTENT: จัดสรรทรัพยากรให้เหมาะสม",
      context: "CONTEXT: ข้อจำกัดด้านงบประมาณ ความสามารถของทีม",
      priority: "PRIORITY: ประสิทธิภาพต้นทุน > ความพึงพอใจของทีม",
      action: "ACTION: จัดสรรทรัพยากรโดยใช้การหาค่าเหมาะสมที่สุดแบบ Pareto",
      validate: "VALIDATE: การประหยัดต้นทุน > 15% AND ความพึงพอใจ > 4/5"
    },
    features_title: "ส่วนประกอบหลัก",
    features: [
      { title: "รากฐานภาษาธรรมชาติ", desc: "เขียนด้วยภาษาอังกฤษทั่วไปที่มนุษย์และเครื่องจักรเข้าใจได้ ไม่มีไวยากรณ์ลึกลับหรือสัญลักษณ์ยาก" },
      { title: "เจตนาที่มีโครงสร้าง", desc: "ส่วนที่ชัดเจนสำหรับเจตนา บริบท ลำดับความสำคัญ และการตรวจสอบ ทุกองค์ประกอบมีจุดประสงค์ในข้อกำหนด" },
      { title: "ความสามารถในการรวม", desc: "รวมคำสั่งเจตนาง่ายๆ เข้าด้วยกันเป็นข้อกำหนดที่ซับซ้อนและเป็นลำดับชั้น ออกแบบให้เป็นโมดูลและใช้ซ้ำได้" },
      { title: "ความสามารถในการตรวจสอบ", desc: "ทุกคำสั่ง JITNA มีเกณฑ์การตรวจสอบ สามารถวัดการกระทำเทียบกับเจตนาเดิมได้" }
    ],
    examples_title: "ตัวอย่างข้อกำหนด",
    examples: [
      { title: "ระบบแนะนำ", content: `INTENT: ให้คำแนะนำสินค้าส่วนบุคคล\nCONTEXT: ประวัติการเข้าชม รูปแบบการซื้อ\nPRIORITY: ความเกี่ยวข้อง > ความหลากหลาย > กำไร\nACTION: สร้างคำแนะนำ 5 อันดับแรก\nVALIDATE: CTR > baseline AND คะแนนความหลากหลาย > 0.7` },
      { title: "การกำกับดูแลเนื้อหา", content: `INTENT: รักษาความปลอดภัยของชุมชนขณะรักษาการแสดงออก\nCONTEXT: รายงานผู้ใช้ นโยบายเนื้อหา บรรทัดฐานชุมชน\nPRIORITY: ป้องกันอันตราย > ลดผลบวกลวง\nACTION: ติดธงหรือลบเนื้อหาที่ละเมิด\nVALIDATE: อัตราผลบวกลวง < 5% AND เวลาตอบสนองเหตุการณ์ < 2 ชม.` }
    ],
    why_title: "ทำไม JITNA?",
    why: [
      { title: "ลดช่องว่างความหมาย", desc: "ลดระยะห่างระหว่างเจตนาของมนุษย์และการดำเนินการของเครื่อง JITNA ทำให้แน่ใจว่าไม่มีอะไรสูญหายในการแปล" },
      { title: "เปิดใช้งานความรับผิดชอบ", desc: "เกณฑ์การตรวจสอบที่ชัดเจนสร้างผลลัพธ์ที่วัดได้ เราพิสูจน์ได้ว่าระบบสอดคล้องกับเจตนาจริงๆ" },
      { title: "อำนวยความสะดวกในการทำงานร่วมกัน", desc: "มนุษย์และ AI ทำงานร่วมกันโดยใช้ภาษาเดียวกัน วิศวกร ผู้จัดการ และผู้มีส่วนได้ส่วนเสียทุกคนพูด JITNA" },
      { title: "ลดข้อผิดพลาดและอคติ", desc: "ด้วยการทำให้เจตนาชัดเจน เราสามารถระบุและแก้ไขความไม่สอดคล้องก่อนที่จะรวมเป็นปัญหาระบบ" }
    ],
    next_title: "แนวคิดสุดท้าย",
    next_concept: "Intent OS",
    next_desc: "ค้นพบระบบปฏิบัติการแห่งอนาคตที่สร้างขึ้นบนหลักการที่ขับเคลื่อนด้วยเจตนาโดยสิ้นเชิง",
    next_cta: "สำรวจ Intent OS"
  }
}

export default function JITNAPage() {
  const { language } = useLanguage()
  const t = translations[language] || translations.en
  const localePrefix = language === "th" ? "/th" : "/en"
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://delentia.com${localePrefix}` },
      { "@type": "ListItem", position: 2, name: "Philosophy", item: `https://delentia.com${localePrefix}/philosophy` },
      { "@type": "ListItem", position: 3, name: "JITNA", item: `https://delentia.com${localePrefix}/philosophy/jitna` },
    ],
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: language === "th" ? "JITNA ต่างจาก prompt ธรรมดาอย่างไร?" : "How is JITNA different from normal prompts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: language === "th"
            ? "JITNA มีโครงสร้าง intent/context/priority/action/validate ทำให้ตรวจสอบและนำไปใช้ซ้ำได้ง่ายกว่า"
            : "JITNA uses structured blocks for intent, context, priorities, actions, and validation, enabling repeatable and auditable execution.",
        },
      },
      {
        "@type": "Question",
        name: language === "th" ? "JITNA รองรับการทำงานร่วมกันอย่างไร?" : "How does JITNA improve collaboration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: language === "th"
            ? "เพราะทีมเทคนิคและทีมธุรกิจสามารถอ้างถึงสเปก intent เดียวกันและตรวจผลจากเกณฑ์เดียวกันได้"
            : "It provides a shared intent specification language that both technical and non-technical stakeholders can verify against the same criteria.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 py-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`/${language}/philosophy`} className="hover:text-foreground transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t.breadcrumb}
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">{t.title}</span>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">{t.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">{t.subtitle}</p>
          </div>

          {/* Code Example */}
          <div className="bg-card border border-border rounded-lg p-8 font-mono text-sm mt-12">
            <div className="flex items-start gap-4">
              <Code2 className="w-6 h-6 text-accent mt-2 shrink-0" />
              <div className="space-y-2 overflow-x-auto w-full">
                <div className="text-muted-foreground">{t.code_example.intent}</div>
                <div className="text-accent">{t.code_example.context}</div>
                <div className="text-secondary">{t.code_example.priority}</div>
                <div className="text-muted-foreground">{t.code_example.action}</div>
                <div className="text-accent">{t.code_example.validate}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">{t.features_title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.map((feature, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-8 space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <JITNAPlayground />
      </section>

      {/* Example Specifications */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-linear-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">{t.examples_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.examples.map((example, i) => (
              <div key={i} className="bg-background rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">{example.title}</h3>
                <pre className="text-xs text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap wrap-break-word">{example.content}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">{t.why_title}</h2>
        <div className="space-y-6">
          {t.why.map((benefit, i) => (
            <div key={i} className="border-l-4 border-accent pl-6 space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next Concept */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 flex-1">
            <p className="text-sm text-accent font-semibold uppercase tracking-wide">{t.next_title}</p>
            <h2 className="text-3xl font-bold text-foreground">{t.next_concept}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.next_desc}</p>
            <Button asChild className="mt-4">
              <Link href={`/${language}/philosophy/intent-os`} className="gap-2">
                {t.next_cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Deep-dive link to Technology page */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="rounded-2xl border border-border bg-card/60 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-amber">
              {language === "th" ? "สำหรับนักพัฒนาและทีมเทคนิค" : "For developers & technical teams"}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              {language === "th"
                ? "ดู JITNA ในเชิงสถาปัตยกรรมเต็มรูปแบบ"
                : "See JITNA as a full routing architecture"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === "th"
                ? "หน้า Philosophy นี้อธิบายหลักการเชิงแนวคิดของ JITNA หน้า Technology อธิบาย 6 Primitives (I, D, Δ, A, R, M), routing logic, proficiency scoring และ RCTDB integration"
                : "This Philosophy page covers JITNA's conceptual principles. The Technology page covers the 6 Primitives (I, D, Δ, A, R, M), routing logic, proficiency scoring, and RCTDB integration."}
            </p>
          </div>
          <Link
            href={`/${language}/technology/jitna`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {language === "th" ? "ดู JITNA Technical Doc" : "View JITNA Technical Docs"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

