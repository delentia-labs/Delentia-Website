"use client"

import { m } from "framer-motion"
import {
  ShieldCheck,
  XCircle,
  Lock,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Cpu,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// ─── Equation breakdown ───────────────────────────────────────────────────────
const equationParts = {
  en: [
    {
      symbol: "F",
      label: "Final Output",
      color: "text-warm-amber",
      description:
        "The actual response generated — what the agent ultimately delivers to the user or downstream system.",
    },
    {
      symbol: "D",
      label: "Depth / Capability",
      color: "text-blue-400",
      description:
        "The raw intelligence depth: reasoning quality, context window, domain knowledge, and model sophistication.",
    },
    {
      symbol: "I",
      label: "Intent Alignment",
      color: "text-purple-400",
      description:
        "How precisely the agent's action aligns with the stated and inferred intent of the authorizing principal.",
    },
    {
      symbol: "A",
      label: "Authorization",
      color: "text-rose-400",
      description:
        "The authorization signal: 0 = absolute prohibition, 1 = fully permitted. When A = 0, F collapses to zero regardless of D or I.",
    },
  ],
  th: [
    {
      symbol: "F",
      label: "Output สุดท้าย",
      color: "text-warm-amber",
      description:
        "Response จริงที่ถูกสร้างขึ้น — สิ่งที่ Agent ส่งมอบให้ผู้ใช้หรือระบบปลายทางในที่สุด",
    },
    {
      symbol: "D",
      label: "ความลึก / ความสามารถ",
      color: "text-blue-400",
      description:
        "ความลึกของสติปัญญาดิบ: คุณภาพการให้เหตุผล Context window ความรู้เฉพาะด้าน และความซับซ้อนของโมเดล",
    },
    {
      symbol: "I",
      label: "การจัดตำแหน่ง Intent",
      color: "text-purple-400",
      description:
        "ความแม่นยำที่ Action ของ Agent สอดคล้องกับ Intent ที่ระบุและอนุมานของ Principal ที่ให้สิทธิ์",
    },
    {
      symbol: "A",
      label: "Authorization",
      color: "text-rose-400",
      description:
        "สัญญาณ Authorization: 0 = ห้ามโดยสมบูรณ์, 1 = ได้รับอนุญาตอย่างสมบูรณ์ เมื่อ A = 0, F จะเป็น 0 โดยไม่คำนึงถึง D หรือ I",
    },
  ],
}

// ─── A=0 absolute prohibitions ────────────────────────────────────────────────
const prohibitions = {
  en: [
    {
      icon: XCircle,
      title: "No Data Without Consent",
      description:
        "Accessing, transmitting, or storing personal data without explicit authorization from the data subject sets A=0 on the entire operation.",
    },
    {
      icon: Lock,
      title: "No Cross-Entity Leakage",
      description:
        "Context, memory, and output from one entity's session must never bleed into another entity's session — structural A=0 isolation.",
    },
    {
      icon: ShieldCheck,
      title: "No Unverified Output in Critical Paths",
      description:
        "Financial decisions, medical recommendations, and legal guidance must pass SignedAI consensus before delivery. Unverified = A=0.",
    },
    {
      icon: AlertTriangle,
      title: "No Sovereignty Override",
      description:
        "A user's Sovereignty Vault settings are constitutionally immutable. No downstream system, model, or operator may override them.",
    },
    {
      icon: Users,
      title: "No Anonymous Attribution",
      description:
        "Every AI-generated output must carry a traceable signature chain. Anonymous outputs in regulated contexts carry A=0 by default.",
    },
    {
      icon: Scale,
      title: "No Geo-Prohibited Model Routing",
      description:
        "If a user's jurisdiction prohibits routing to a specific region's model, JITNA enforces A=0 on that route automatically.",
    },
  ],
  th: [
    {
      icon: XCircle,
      title: "ไม่มีข้อมูลโดยไม่ได้รับความยินยอม",
      description:
        "การเข้าถึง ส่ง หรือจัดเก็บข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาตจากเจ้าของข้อมูลจะตั้งค่า A=0 สำหรับการดำเนินการทั้งหมด",
    },
    {
      icon: Lock,
      title: "ไม่มีการรั่วไหลข้ามนิติบุคคล",
      description:
        "Context ความทรงจำ และ Output จาก Session ของนิติบุคคลหนึ่งต้องไม่รั่วไหลสู่ Session ของนิติบุคคลอื่น — การแยกด้วย A=0 อย่างมีโครงสร้าง",
    },
    {
      icon: ShieldCheck,
      title: "ไม่มี Output ที่ไม่ได้รับการยืนยันในเส้นทางวิกฤต",
      description:
        "การตัดสินใจทางการเงิน คำแนะนำทางการแพทย์ และคำแนะนำทางกฎหมายต้องผ่าน Consensus ของ SignedAI ก่อนส่งมอบ ไม่ได้รับการยืนยัน = A=0",
    },
    {
      icon: AlertTriangle,
      title: "ไม่มีการแทนที่ Sovereignty",
      description:
        "การตั้งค่า Sovereignty Vault ของผู้ใช้ไม่สามารถเปลี่ยนแปลงได้ตามรัฐธรรมนูญ ไม่มีระบบ โมเดล หรือ Operator ปลายทางใดที่สามารถแทนที่ได้",
    },
    {
      icon: Users,
      title: "ไม่มีการระบุที่มาแบบไม่ระบุชื่อ",
      description:
        "ทุก Output ที่ AI สร้างต้องมีห่วงโซ่ลายเซ็นที่ติดตามได้ Output แบบไม่ระบุชื่อในบริบทที่มีการควบคุมจะมีค่า A=0 โดยค่าเริ่มต้น",
    },
    {
      icon: Scale,
      title: "ไม่มีการกำหนดเส้นทางโมเดลที่ต้องห้ามตามพื้นที่",
      description:
        "หาก Jurisdiction ของผู้ใช้ห้ามกำหนดเส้นทางไปยังโมเดลของภูมิภาคใด JITNA จะบังคับใช้ A=0 บนเส้นทางนั้นโดยอัตโนมัติ",
    },
  ],
}

// ─── Vault Genome connection ──────────────────────────────────────────────────
const vaultFeatures = {
  en: [
    {
      icon: BookOpen,
      title: "Constitutional Rule Store",
      description:
        "The Vault Genome (G6) is the runtime home of all Constitutional AI rules. Rules are stored, versioned, and enforced as executable constraints — not documentation.",
    },
    {
      icon: Lock,
      title: "Sovereignty Vault Integration",
      description:
        "User-defined sovereignty preferences are stored in the Vault and read at inference time. They override model defaults and operator configs with Constitutional priority.",
    },
    {
      icon: Cpu,
      title: "FDIA Enforcement Engine",
      description:
        "The Vault interfaces with JITNA's routing engine to inject A-values per request. A route that violates a constitutional rule receives A=0 before model invocation.",
    },
    {
      icon: CheckCircle2,
      title: "Audit Trail",
      description:
        "Every constitutional evaluation — pass or block — is written to an immutable Vault log. SignedAI can attest these logs for third-party compliance audits.",
    },
  ],
  th: [
    {
      icon: BookOpen,
      title: "Constitutional Rule Store",
      description:
        "Vault Genome (G6) คือบ้านของกฎ Constitutional AI ทั้งหมดในรันไทม์ กฎถูกจัดเก็บ กำหนดเวอร์ชัน และบังคับใช้เป็น Constraint ที่ปฏิบัติการได้ ไม่ใช่เอกสาร",
    },
    {
      icon: Lock,
      title: "การผสาน Sovereignty Vault",
      description:
        "การตั้งค่า Sovereignty ที่ผู้ใช้กำหนดถูกจัดเก็บใน Vault และอ่านในเวลาอนุมาน โดยแทนที่ค่าเริ่มต้นของโมเดลและ Config ของ Operator ด้วยลำดับความสำคัญตามรัฐธรรมนูญ",
    },
    {
      icon: Cpu,
      title: "FDIA Enforcement Engine",
      description:
        "Vault เชื่อมต่อกับ Routing Engine ของ JITNA เพื่อแทรกค่า A ต่อ Request เส้นทางที่ละเมิดกฎตามรัฐธรรมนูญจะได้รับ A=0 ก่อนที่จะเรียก Model",
    },
    {
      icon: CheckCircle2,
      title: "Audit Trail",
      description:
        "ทุกการประเมินตามรัฐธรรมนูญ — ผ่านหรือบล็อก — ถูกเขียนลงใน Vault Log ที่เปลี่ยนแปลงไม่ได้ SignedAI สามารถรับรอง Log เหล่านี้สำหรับการตรวจสอบการปฏิบัติตามข้อกำหนดของบุคคลที่สาม",
    },
  ],
}

// ─── Related links ────────────────────────────────────────────────────────────
const related = [
  { href: "/genome", label: "Genome System" },
  { href: "/technology/jitna", label: "JITNA Protocol" },
  { href: "/technology/rct-7-thinking", label: "RCT-7 Thinking" },
  { href: "/products/signed-ai", label: "SignedAI" },
  { href: "/solutions/enterprise-ai-memory", label: "Vault (RCTDB)" },
  { href: "/algorithms", label: "Algorithm Registry" },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function ConstitutionalAIClient({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname()
  const isTH = (propLocale ?? getLocaleFromPathname(pathname) ?? "en") === "th"

  const eq = isTH ? equationParts.th : equationParts.en
  const proh = isTH ? prohibitions.th : prohibitions.en
  const vault = isTH ? vaultFeatures.th : vaultFeatures.en

  const t = {
    badge: isTH ? "ความปลอดภัย AI" : "AI Safety",
    hero: isTH ? "Constitutional AI" : "Constitutional AI",
    heroSub: isTH
      ? "เมื่อ A = 0 Output จะเป็น 0 โดยไม่คำนึงถึงความสามารถ"
      : "When A = 0, output is always 0 — regardless of capability.",
    equationTitle: isTH ? "สมการ FDIA" : "The FDIA Equation",
    equationSub: isTH
      ? "Constitutional AI ของ RCT ถูกสร้างรูปแบบทางคณิตศาสตร์ในเลเยอร์ Genome"
      : "RCT's Constitutional AI is mathematically modelled at the Genome layer.",
    equationNote: isTH
      ? "I และ D มีกำลัง: ความสามารถที่สูงขึ้นขยาย Output แต่ A เป็น Multiplier ตัวสุดท้าย เมื่อ A = 0 Output จะพังทลายเสมอ"
      : "I and D are exponents: higher capability amplifies output, but A is the final multiplier. When A = 0, output always collapses.",
    prohibitionTitle: isTH ? "หลักการ A=0 — สิ่งต้องห้ามสมบูรณ์" : "The A=0 Principle — Absolute Prohibitions",
    prohibitionSub: isTH
      ? "สิ่งเหล่านี้ไม่ใช่แนวทางปฏิบัติ พวกมันเป็น Constraint ที่ปฏิบัติการได้ซึ่งบังคับใช้ที่เลเยอร์ Infrastructure"
      : "These are not guidelines — they are executable constraints enforced at the infrastructure layer.",
    vaultTitle: isTH ? "Vault Genome — บ้านของ Constitutional Rules" : "Vault Genome — Home of Constitutional Rules",
    vaultSub: isTH
      ? "Vault Genome (G6) เก็บและบังคับใช้กฎตามรัฐธรรมนูญทั้งหมดเป็น Runtime Constraint"
      : "The Vault Genome (G6) stores and enforces all constitutional rules as runtime constraints.",
    relatedTitle: isTH ? "สำรวจเพิ่มเติม" : "Explore Further",
  }

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Answer-first — screen-reader + crawler accessible; not shown visually */}
      <section className="sr-only">
        <p>
          {isTH
            ? "Constitutional AI ของ Delentia Labs บังคับใช้ข้อจำกัดทางจริยธรรมในระดับสมการ F = (D^I) × A — เมื่อ A = 0 ไม่มี Output ใดถูกส่งออก ทำให้ human oversight กลายเป็นข้อกำหนดทางคณิตศาสตร์ ไม่ใช่เพียงนโยบายที่ปรับได้"
            : "Delentia Labs Constitutional AI enforces ethical constraints at the equation level: F = (D^I) × A — when A = 0 no output is dispatched, making human oversight a mathematical requirement rather than a configurable policy."}
        </p>
      </section>

      {/* ── Hero ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold tracking-widest uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.badge}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4">{t.hero}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.heroSub}</p>
          </m.div>
        </div>
      </section>

      {/* ── Equation ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t.equationTitle}</h2>
            <p className="text-muted-foreground">{t.equationSub}</p>
          </div>

          {/* Equation display */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12 flex-wrap"
          >
            {["F", "=", "(D", "^", "I)", "×", "A"].map((part, i) => {
              const colorMap: Record<string, string> = {
                F: "text-warm-amber",
                "(D": "text-blue-400",
                I: "text-purple-400",
                "I)": "text-purple-400",
                A: "text-rose-400",
              }
              return (
                <span
                  key={i}
                  className={`text-6xl md:text-8xl font-mono font-black ${
                    colorMap[part] ?? "text-muted-foreground"
                  }`}
                >
                  {part}
                </span>
              )
            })}
          </m.div>

          <p className="text-center text-muted-foreground text-sm mb-14 max-w-2xl mx-auto italic">
            {t.equationNote}
          </p>

          {/* Equation parts breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            {eq.map((part, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 flex gap-5"
              >
                <span className={`text-4xl font-mono font-black ${part.color} shrink-0 w-12 text-center`}>
                  {part.symbol}
                </span>
                <div>
                  <div className={`font-semibold ${part.color} mb-1`}>{part.label}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{part.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A=0 Prohibitions ── */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <XCircle className="w-3 h-3" />
              A = 0
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-3">{t.prohibitionTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.prohibitionSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {proh.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card border border-rose-900/40 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vault Genome ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">{t.vaultTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.vaultSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {vault.map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-warm-amber/10 border border-warm-amber/20 shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-warm-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
            {t.relatedTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-warm-amber/40 transition-colors text-sm"
              >
                {r.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

