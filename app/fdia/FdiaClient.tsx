"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Calculator, ArrowRight } from "lucide-react"
import { FAQSection } from "@/components/faq-section"

const fdiaFaqItemsEn = [
  {
    question: "What does FDIA stand for?",
    answer:
      "FDIA stands for Future, Data, Intent, and Architect. It is a mathematical framework — F = (D^I) × A — that models how human intent exponentially amplifies raw data to produce deliberate outcomes, with the Architect ensuring ethical governance throughout.",
  },
  {
    question: "How is the FDIA equation applied in AI systems?",
    answer:
      "In AI systems, Data represents the knowledge base (code, experiments, real-time signals), Intent is the clarity of purpose that determines which data to amplify, and the Architect is the human-in-the-loop who governs the final output. The equation ensures AI decisions are purposeful rather than probabilistic.",
  },
  {
    question: "Why is A the Architect and not just a multiplier?",
    answer:
      "The Architect role goes beyond arithmetic multiplication — it represents human oversight, ethical governance, and strategic direction. Without the Architect, AI systems can produce technically correct but ethically or strategically misaligned results. A = 0 means no output regardless of data quality or intent.",
  },
  {
    question: "What is the difference between FDIA and standard AI prompting?",
    answer:
      "Standard prompting relies on the model's training distribution to interpret intent implicitly. FDIA makes intent explicit and structures how data is selected, weighted, and transformed. This results in auditable, reproducible, and governable AI outputs rather than stochastic ones.",
  },
  {
    question: "Is FDIA an open protocol?",
    answer:
      "Yes. FDIA is documented as an open protocol under the Delentia Labs protocol series. The equation, methodology, and implementation guidelines are publicly available for review, critique, and adoption by the AI research and engineering community.",
  },
]

const fdiaFaqItemsTh = [
  {
    question: "FDIA ย่อมาจากอะไร?",
    answer:
      "FDIA ย่อมาจาก Future (อนาคต), Data (ข้อมูล), Intent (เจตนา) และ Architect (สถาปนิก) เป็นกรอบทางคณิตศาสตร์ F = (D^I) × A ที่อธิบายว่าเจตนาของมนุษย์ขยายข้อมูลดิบแบบเลขชี้กำลังเพื่อสร้างผลลัพธ์ที่มีจุดมุ่งหมาย",
  },
  {
    question: "สมการ FDIA นำไปใช้กับระบบ AI ได้อย่างไร?",
    answer:
      "ในระบบ AI — Data คือฐานความรู้ Intent คือความชัดเจนของเป้าหมายที่กำหนดว่าข้อมูลใดควรถูกขยาย และ Architect คือมนุษย์ที่กำกับดูแลผลลัพธ์สุดท้าย สมการนี้ทำให้การตัดสินใจของ AI มีจุดมุ่งหมายแทนที่จะเป็นการสุ่ม",
  },
  {
    question: "ทำไม A ถึงเป็น Architect ไม่ใช่แค่ตัวคูณธรรมดา?",
    answer:
      "บทบาท Architect เกินกว่าการคูณเลขธรรมดา — มันแทนการกำกับดูแลของมนุษย์ จริยธรรม และทิศทางเชิงกลยุทธ์ ถ้า A = 0 ผลลัพธ์จะเป็นศูนย์ไม่ว่าคุณภาพข้อมูลหรือ Intent จะดีแค่ไหน",
  },
  {
    question: "FDIA แตกต่างจากการ Prompt AI ทั่วไปอย่างไร?",
    answer:
      "การ Prompt ทั่วไปพึ่งพาการแจกแจงจากการฝึกของโมเดลเพื่อตีความเจตนาโดยนัย FDIA ทำให้เจตนาชัดเจนและมีโครงสร้างในการเลือก ถ่วงน้ำหนัก และแปลงข้อมูล ส่งผลให้ผลลัพธ์ AI ตรวจสอบได้และทำซ้ำได้",
  },
  {
    question: "FDIA เป็น Open Protocol หรือไม่?",
    answer:
      "ใช่ FDIA ถูกจัดทำเอกสารเป็น Open Protocol ภายใต้ชุดโปรโตคอลของ Delentia Labs สมการ วิธีการ และแนวทางการนำไปใช้เปิดเผยต่อสาธารณะสำหรับการตรวจสอบและนำไปใช้งาน",
  },
]

const components = [
  {
    letter: "F", color: "#D4A853",
    nameEn: "Future (Outcome)", nameTh: "Future (ผลลัพธ์)",
    roleEn: "Output of the equation", roleTh: "ผลลัพธ์ของสมการ",
    descEn: "The constructed outcome — not a prediction, but a result consciously designed through the entire FDIA pipeline. The Future is shaped by deliberate choices.",
    descTh: "ผลลัพธ์ที่ถูกสร้างขึ้น — ไม่ใช่การทำนาย แต่เป็นผลลัพธ์ที่ออกแบบอย่างมีสติผ่าน FDIA Pipeline ทั้งหมด อนาคตถูกกำหนดด้วยการเลือกอย่างตั้งใจ",
  },
  {
    letter: "D", color: "#89B4C8",
    nameEn: "Data (Foundation)", nameTh: "Data (ฐานรากฐาน)",
    roleEn: "Base of exponential", roleTh: "ฐานของเลขยกกำลัง",
    descEn: "The knowledge base — vault of experiments, code, documentation, real-time signals, and historical context. Data is the raw material that Intent transforms.",
    descTh: "ฐานความรู้ — คลังการทดลอง โค้ด เอกสาร สัญญาณ Real-Time และ Historical Context ข้อมูลคือวัตถุดิบที่ Intent แปลงให้เป็นผลลัพธ์",
  },
  {
    letter: "I", color: "#C4745B",
    nameEn: "Intent (Amplifier)", nameTh: "Intent (ตัวขยาย)",
    roleEn: "Exponent (exponential power)", roleTh: "เลขชี้กำลัง (พลังทวีคูณ)",
    descEn: "The exponential amplifier — clarity of purpose that multiplies Data's power. Clear intent exponentially amplifies the value of available data.",
    descTh: "ตัวขยายแบบ Exponential — ความชัดเจนของเป้าหมายที่ขยายพลัง Data Intent ที่ชัดเจนจะขยายคุณค่าของข้อมูลแบบทวีคูณ",
  },
  {
    letter: "A", color: "#7B9E87",
    nameEn: "Architect (Human)", nameTh: "Architect (มนุษย์)",
    roleEn: "Multiplier (human oversight)", roleTh: "ตัวคูณ (การกำกับดูแลจากมนุษย์)",
    descEn: "The Human-in-the-Loop — ensuring ethical, strategic AI governance. The Architect multiplies the entire D^I computation, ensuring AI serves human values.",
    descTh: "Human-in-the-Loop — ผู้รับประกันการกำกับดูแล AI อย่างมีจริยธรรม Architect คูณการคำนวณ D^I ทั้งหมด เพื่อให้ AI รับใช้คุณค่าของมนุษย์",
  },
]

const architectPillars = [
  {
    icon: "🛡️",
    titleEn: "Ethical Governance", titleTh: "การกำกับดูแลอย่างมีจริยธรรม",
    descEn: "The Architect ensures AI decisions align with human values and constitutional principles.",
    descTh: "Architect รับประกันว่าการตัดสินใจ AI สอดคล้องกับคุณค่ามนุษย์และหลักการรัฐธรรมนูญ",
  },
  {
    icon: "🎯",
    titleEn: "Strategic Direction", titleTh: "ทิศทางเชิงกลยุทธ์",
    descEn: "Human judgment guides the system toward meaningful outcomes, not just optimized metrics.",
    descTh: "วิจารณญาณของมนุษย์นำทางระบบไปสู่ผลลัพธ์ที่มีความหมาย ไม่ใช่แค่ตัวชี้วัดที่ถูก optimize",
  },
  {
    icon: "✅",
    titleEn: "Accountability", titleTh: "ความรับผิดชอบ",
    descEn: "Every AI output is traceable to a human architect who takes responsibility for the outcome.",
    descTh: "ทุกผลลัพธ์ AI สามารถตรวจสอบย้อนกลับถึง Architect ที่รับผิดชอบต่อผลลัพธ์",
  },
]

const applications = [
  {
    titleEn: "AI Code Generation", titleTh: "การสร้างโค้ด AI",
    exampleEn: "D = Codebase context, I = 'Build authentication', A = Developer review",
    exampleTh: "D = Context ของ Codebase, I = 'สร้าง authentication', A = นักพัฒนาตรวจสอบ",
    resultEn: "F = Production-ready, secure authentication system",
    resultTh: "F = ระบบ authentication ที่พร้อมใช้งานและปลอดภัย",
  },
  {
    titleEn: "Business Intelligence", titleTh: "Business Intelligence",
    exampleEn: "D = Sales data, I = 'Predict Q4 revenue', A = CFO validation",
    exampleTh: "D = ข้อมูลยอดขาย, I = 'ทำนายรายได้ Q4', A = CFO ตรวจสอบ",
    resultEn: "F = Actionable revenue forecast with confidence intervals",
    resultTh: "F = การพยากรณ์รายได้ที่ใช้ได้จริงพร้อม Confidence Intervals",
  },
  {
    titleEn: "Content Creation", titleTh: "การสร้างเนื้อหา",
    exampleEn: "D = Brand guidelines, I = 'Write product launch post', A = Marketing approval",
    exampleTh: "D = Brand guidelines, I = 'เขียนโพสต์เปิดตัวสินค้า', A = ทีม Marketing อนุมัติ",
    resultEn: "F = On-brand, engaging content ready to publish",
    resultTh: "F = เนื้อหาที่ตรงกับแบรนด์และน่าสนใจพร้อมเผยแพร่",
  },
  {
    titleEn: "System Architecture", titleTh: "สถาปัตยกรรมระบบ",
    exampleEn: "D = Requirements, I = 'Design scalable API', A = Architect decision",
    exampleTh: "D = Requirements, I = 'ออกแบบ API ที่ขยายได้', A = Architect ตัดสินใจ",
    resultEn: "F = Robust, scalable system architecture",
    resultTh: "F = สถาปัตยกรรมระบบที่แข็งแกร่งและขยายได้",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "FDIA Equation — F = (D^I) × A — Core Philosophy of RCT AI",
  "description": "The FDIA equation defines how Future is shaped by Data amplified by Intent, guided by the Architect. Core philosophy powering the RCT AI Operating System.",
  "author": { "@type": "Organization", "name": "RCT Ecosystem" },
}

export default function FdiaClient() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#0D0D0D" : "#FAF6F0"
  const cardBg = isDark ? "#1E1E1E" : "#FAF6F0"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#D4A853", borderColor: "rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.07)" }}>
              <Calculator size={14} /> {isEn ? "FDIA Equation" : "สมการ FDIA"}
            </m.div>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: textPrimary }}>
              F = (D<sup>I</sup>) × <span style={{ color: "#7B9E87" }}>A</span>
            </m.h1>
            <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-8" style={{ color: textSecondary }}>
              {isEn
                ? "Future equals Data raised to the power of Intent, multiplied by the Architect. The master equation governing the entire RCT Ecosystem."
                : "Future เท่ากับ Data ยกกำลัง Intent คูณด้วย Architect สมการหลักที่ควบคุม RCT Ecosystem ทั้งหมด"}
            </m.p>
            {/* Big equation badge */}
            <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="inline-block px-8 py-5 rounded-2xl border font-mono text-3xl font-bold"
              style={{ background: isDark ? "#1E1E1E" : "white", borderColor: "rgba(212,168,83,0.3)", color: "#D4A853" }}>
              F = (D<sup className="text-lg">I</sup>) × A
            </m.div>
          </div>
        </section>

        {/* FDIA Performance Benchmark */}
        <section className="py-12 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>
                {isEn ? "FDIA Protocol " : "ประสิทธิภาพ "}<span style={{ color: "#C4745B" }}>{isEn ? "Performance" : "FDIA Protocol"}</span>
              </h2>
              <p className="text-sm" style={{ color: textSecondary }}>
                {isEn ? "Benchmarked against industry average F-score baselines" : "วัดเทียบกับ F-score มาตรฐานอุตสาหกรรม"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}
                className="p-6 rounded-2xl border text-center" style={{ background: cardBg, borderColor: "rgba(196,116,91,0.4)" }}>
                <div className="text-4xl font-bold mb-1" style={{ color: "#C4745B" }}>11/12</div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: textSecondary }}>
                  {isEn ? "FDIA rank test (hand-written cases)" : "FDIA rank test (hand-written cases)"}
                </div>
                <div className="text-xs" style={{ color: isDark ? "#666" : "#999" }}>
                  {isEn ? "RCT Ecosystem benchmark" : "Benchmark RCT Ecosystem"}
                </div>
              </m.div>
              <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl border text-center" style={{ background: isDark ? "#1A1A1A" : "#F5F0E8", borderColor: cardBorder }}>
                <div className="text-4xl font-bold mb-1" style={{ color: isDark ? "#666" : "#AAA" }}>~0.65</div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: textSecondary }}>
                  {isEn ? "Industry Average" : "เฉลี่ยอุตสาหกรรม"}
                </div>
                <div className="text-xs" style={{ color: isDark ? "#666" : "#999" }}>
                  {isEn ? "Single-LLM pipeline baseline" : "Baseline Single-LLM pipeline"}
                </div>
              </m.div>
              <m.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl border text-center" style={{ background: cardBg, borderColor: "rgba(123,158,135,0.4)" }}>
                <div className="text-4xl font-bold mb-1" style={{ color: "#7B9E87" }}>+41%</div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: textSecondary }}>
                  {isEn ? "Above Industry Average" : "เหนือค่าเฉลี่ยอุตสาหกรรม"}
                </div>
                <div className="text-xs" style={{ color: isDark ? "#666" : "#999" }}>
                  {isEn ? "Intent-aligned scoring advantage" : "ข้อได้เปรียบจากการให้คะแนนตาม Intent"}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        {/* 4 Components */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "Mathematical " : "รากฐานทาง"}<span style={{ color: "#D4A853" }}>{isEn ? "Foundation" : "คณิตศาสตร์"}</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "The FDIA equation is not just a metaphor — it's a precise mathematical framework that governs how the RCT Ecosystem processes intent and generates outcomes."
                  : "สมการ FDIA ไม่ใช่แค่อุปมา — แต่เป็นกรอบทางคณิตศาสตร์ที่แม่นยำซึ่งควบคุมวิธีที่ RCT Ecosystem ประมวลผล Intent และสร้างผลลัพธ์"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {components.map((comp, i) => (
                <m.div key={comp.letter} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold font-mono"
                      style={{ background: `${comp.color}15`, color: comp.color }}>
                      {comp.letter}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: textPrimary }}>{isEn ? comp.nameEn : comp.nameTh}</h3>
                      <div className="text-xs font-mono" style={{ color: isDark ? "#666" : "#999" }}>
                        {isEn ? comp.roleEn : comp.roleTh}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                    {isEn ? comp.descEn : comp.descTh}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why A = Architect */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: textPrimary }}>
                {isEn ? "Why " : "ทำไม "}<span style={{ color: "#7B9E87" }}>A = Architect</span>
                {isEn ? ", Not Action?" : " ไม่ใช่ Action?"}
              </h2>
            </m.div>
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-7 rounded-2xl border mb-6" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
              <p className="text-sm leading-relaxed mb-6" style={{ color: textSecondary }}>
                {isEn
                  ? "In the RCT philosophy, A stands for Architect — the human decision-maker who serves as the ultimate multiplier. This is a deliberate design choice: AI should amplify human judgment, not replace it. When A approaches zero (no human oversight), the entire equation collapses regardless of how much Data or Intent exists."
                  : "ในปรัชญา RCT ตัว A ย่อมาจาก Architect — ผู้ตัดสินใจที่เป็นมนุษย์ซึ่งทำหน้าที่เป็นตัวคูณสูงสุด นี่คือการเลือกออกแบบอย่างตั้งใจ: AI ควรขยายวิจารณญาณของมนุษย์ ไม่ใช่แทนที่ เมื่อ A เข้าใกล้ศูนย์ สมการทั้งหมดจะพังทลาย"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {architectPillars.map((pillar, i) => (
                  <m.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl text-center" style={{ background: isDark ? "#151515" : "#FAF6F0" }}>
                    <div className="text-2xl mb-2">{pillar.icon}</div>
                    <h4 className="text-xs font-bold mb-1" style={{ color: textPrimary }}>{isEn ? pillar.titleEn : pillar.titleTh}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: isDark ? "#888" : "#6B6B6B" }}>
                      {isEn ? pillar.descEn : pillar.descTh}
                    </p>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3" style={{ color: textPrimary }}>
                {isEn ? "Real-World " : "การใช้งาน"}<span style={{ color: "#C4745B" }}>{isEn ? "Applications" : "จริง"}</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "The FDIA equation powers every component of the RCT Ecosystem, from code generation to decision-making."
                  : "สมการ FDIA ขับเคลื่อนทุกส่วนประกอบของ RCT Ecosystem ตั้งแต่การสร้างโค้ดไปจนถึงการตัดสินใจ"}
              </p>
            </m.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {applications.map((app, i) => (
                <m.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                  <h3 className="text-base font-bold mb-3" style={{ color: textPrimary }}>{isEn ? app.titleEn : app.titleTh}</h3>
                  <div className="space-y-2 text-sm" style={{ color: textSecondary }}>
                    <div><span className="font-semibold" style={{ color: "#D4A853" }}>Input: </span>{isEn ? app.exampleEn : app.exampleTh}</div>
                    <div><span className="font-semibold" style={{ color: "#7B9E87" }}>Output: </span>{isEn ? app.resultEn : app.resultTh}</div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* Exponential Thinking */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-7 rounded-2xl border" style={{ background: isDark ? "#1A1A1A" : "white", borderColor: cardBorder }}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "The Power of " : "พลังของ "}<span style={{ color: "#C4745B" }}>Exponential Thinking</span>
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: textSecondary }}>
                {isEn
                  ? "The exponential relationship (D^I) is the key insight of the FDIA equation. When Intent increases from 1 to 10, the result doesn't just double — it can change by hundreds of billions of times. Clarity of purpose is the highest-leverage input in any AI system."
                  : "ความสัมพันธ์แบบเลขยกกำลัง (D^I) คือข้อมูลสำคัญของสมการ FDIA เมื่อ Intent เพิ่มจาก 1 เป็น 10 ผลลัพธ์ไม่ได้เพิ่มเป็นสองเท่า — แต่สามารถเปลี่ยนไปหลายร้อยพันล้านเท่า ความชัดเจนของเป้าหมายคือ Input ที่ให้ผลตอบแทนสูงสุดในระบบ AI ใดๆ"}
              </p>
              <div className="p-5 rounded-xl" style={{ background: isDark ? "#151515" : "#FAF6F0" }}>
                <div className="text-sm font-mono text-center space-y-2">
                  <div style={{ color: "#C4745B" }}>{isEn ? "Example with D = 85:" : "ตัวอย่างเมื่อ D = 85:"}</div>
                  <div>I = 1 → <span className="font-bold" style={{ color: "#D4A853" }}>85</span></div>
                  <div>I = 5 → <span className="font-bold" style={{ color: "#D4A853" }}>4.4 Billion</span></div>
                  <div>I = 10 → <span className="font-bold" style={{ color: "#D4A853" }}>2.0 × 10¹⁹</span></div>
                </div>
                <p className="text-xs text-center mt-3" style={{ color: isDark ? "#888" : "#6B6B6B" }}>
                  {isEn
                    ? "A 10x increase in Intent clarity creates a trillion-fold increase in outcome potential."
                    : "การเพิ่ม Intent ความชัดเจน 10 เท่า สร้างศักยภาพผลลัพธ์เพิ่มขึ้นล้านล้านเท่า"}
                </p>
              </div>
            </m.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4" style={{ background: bg }}>
          <div className="max-w-2xl mx-auto text-center">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Experience FDIA in Action" : "สัมผัส FDIA ในการใช้งานจริง"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo/fdia"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#D4A853" }}>
                  {isEn ? "Interactive Demo" : "Demo แบบ Interactive"} <ArrowRight size={16} />
                </Link>
                <Link href="/protocols"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  {isEn ? "All Protocols" : "ทุก Protocols"}
                </Link>
              </div>
            </m.div>
          </div>
        </section>

      </main>
      <FAQSection
        items={isEn ? fdiaFaqItemsEn : fdiaFaqItemsTh}
        heading="Frequently Asked Questions about FDIA"
        headingTh="คำถามที่พบบ่อยเกี่ยวกับ FDIA"
        locale={isEn ? "en" : "th"}
      />
      <Footer />
    </>
  )
}

