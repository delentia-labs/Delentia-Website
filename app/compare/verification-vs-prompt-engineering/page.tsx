import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowRight, CheckCircle, XCircle, MinusCircle, Lock, AlertTriangle } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Verification vs Prompt Engineering — Which Ensures AI Safety?",
    "Verification vs Prompt Engineering — อะไรทำให้ AI ปลอดภัยกว่า",
    "Prompt engineering tells models what to do. Constitutional AI verification ensures the system cannot violate constraints. Learn why verification is deterministic and why that matters for enterprise AI compliance.",
    "Prompt engineering คือการบอกโมเดลว่าควรทำอะไร ส่วน constitutional AI verification คือการทำให้ระบบไม่สามารถละเมิดข้อจำกัดได้ เรียนรู้ว่าทำไมแนวทาง verification จึง deterministic และสำคัญต่อ compliance ระดับองค์กร",
    "/compare/verification-vs-prompt-engineering",
    ["verification vs prompt engineering", "AI safety", "constitutional AI verification"]
  )
}

function CompareIcon({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") return <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
  if (value === "no") return <XCircle className="w-5 h-5 text-red-400/70 mx-auto" />
  return <MinusCircle className="w-5 h-5 text-warm-amber/60 mx-auto" />
}

const rows = [
  { feature: "Prevents prompt injection", prompt: "no", verify: "yes" },
  { feature: "Deterministic output blocking", prompt: "no", verify: "yes" },
  { feature: "Works identically across all LLMs", prompt: "no", verify: "yes" },
  { feature: "Built-in audit trail", prompt: "no", verify: "yes" },
  { feature: "Scales with context window", prompt: "no", verify: "yes" },
  { feature: "Enables multi-model consensus", prompt: "no", verify: "yes" },
  { feature: "Quick iteration for task style/format", prompt: "yes", verify: "partial" },
  { feature: "No code changes needed", prompt: "yes", verify: "no" },
  { feature: "Compliance documentation", prompt: "no", verify: "yes" },
  { feature: "PDPA Section 33 explainability", prompt: "no", verify: "yes" },
]

export default async function VerificationVsPromptEngineering() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `https://delentia.com${localePrefix}` },
    { name: "Compare", url: `https://delentia.com${localePrefix}/compare` },
    { name: "Verification vs Prompt Engineering", url: `https://delentia.com${localePrefix}/compare/verification-vs-prompt-engineering` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Why can't prompt engineering alone guarantee AI safety for enterprise compliance?",
      answer: "Prompt engineering relies on LLMs following instructions probabilistically — any model can ignore, misinterpret, or bypass instructions. Constitutional AI verification applies deterministic constraint checks that block violations regardless of model behavior, making it suitable for PDPA, GDPR, and internal governance requirements.",
    },
    {
      question: "What makes constitutional AI verification deterministic while prompt engineering is not?",
      answer: "Verification operates at the system layer above the LLM, applying formal rules that either pass or fail completely. When a verification constraint fails, the output is blocked entirely, not scored probabilistically. This creates reproducible, auditable behavior required for legal compliance.",
    },
    {
      question: "Is constitutional AI verification compatible with any LLM?",
      answer: "Yes. Delentia's verification layer is model-agnostic and works identically across GPT-4, Claude, Typhoon, and other models in the HexaCore ensemble. The same constitutional constraints apply regardless of which underlying model generates the response.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(191,160,110,0.07),transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-warm-amber/30 bg-warm-amber/8 text-warm-amber text-sm font-medium mb-6">
              <Lock className="w-4 h-4" /> Safety Architecture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 text-balance">
              Verification vs Prompt Engineering
            </h1>
            <p className="text-xl text-warm-dim max-w-2xl mx-auto mb-8">
              Prompt engineering is probabilistic. Constitutional AI verification is deterministic. For enterprise compliance, the difference is not philosophical — it is legal.
            </p>
          </div>
        </section>

        {/* Key distinction callout */}
        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-foreground mb-1">The Critical Difference</p>
              <p className="text-warm-dim text-sm leading-relaxed">
                Prompt engineering adds tokens that make certain outputs <em>more probable</em>. A model can still ignore them — especially on long conversations, adversarial inputs, or after fine-tuning.
                Constitutional AI constraints are evaluated by the <strong className="text-warm-amber">system</strong>, not the model. When A=0 in the FDIA equation, <strong className="text-foreground">F=0 — always</strong>. No model can override this.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Prompt Engineering",
                subtitle: "Instructions to the model",
                color: "border-blue-400/30 from-blue-400/8",
                titleColor: "text-blue-400",
                points: [
                  "Works at the model level (text input)",
                  "Probabilistic — model may ignore",
                  "Different prompts needed per LLM",
                  "No audit trail built-in",
                  "Vulnerable to context dilution (long conversations)",
                  "Vulnerable to prompt injection attacks",
                ],
                verdict: "✓ Excellent for task formatting & style",
                verdictColor: "text-blue-400",
              },
              {
                title: "Constitutional AI Verification",
                subtitle: "Constraints on the system",
                color: "border-warm-amber/30 from-warm-amber/8",
                titleColor: "text-warm-amber",
                points: [
                  "Works at the system level (around the model)",
                  "Deterministic — mathematically guaranteed",
                  "One constraint set, works across all 7 HexaCore models",
                  "Full audit trail (RCTDB + JITNA packet log)",
                  "Per-packet validation — no context dilution",
                  "JITNA Normalizer strips injection attempts pre-LLM",
                ],
                verdict: "✓ Required for regulated industry compliance",
                verdictColor: "text-warm-amber",
              },
            ].map(({ title, subtitle, color, titleColor, points, verdict, verdictColor }) => (
              <div key={title} className={`rounded-2xl border bg-linear-to-br ${color} to-transparent p-6`}>
                <h2 className={`text-xl font-bold ${titleColor} mb-1`}>{title}</h2>
                <p className="text-xs text-warm-dim mb-4">{subtitle}</p>
                <ul className="space-y-2 mb-6">
                  {points.map((pt) => (
                    <li key={pt} className="text-sm text-warm-dim flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">•</span> {pt}
                    </li>
                  ))}
                </ul>
                <p className={`text-sm font-semibold ${verdictColor}`}>{verdict}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature comparison table */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Feature Comparison Table</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-warm-dim font-semibold">Capability</th>
                  <th className="text-center px-4 py-4 text-blue-400 font-semibold">Prompt Engineering</th>
                  <th className="text-center px-4 py-4 text-warm-amber font-semibold">Constitutional AI</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-6 py-3 text-foreground">{row.feature}</td>
                    <td className="px-4 py-3"><CompareIcon value={row.prompt as "yes"|"no"|"partial"} /></td>
                    <td className="px-4 py-3"><CompareIcon value={row.verify as "yes"|"no"|"partial"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 bg-white/3 border-t border-white/10 flex gap-6 text-xs text-warm-dim">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Yes</span>
              <span className="flex items-center gap-1.5"><MinusCircle className="w-3.5 h-3.5 text-warm-amber/60" /> Partial</span>
              <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5 text-red-400/70" /> No</span>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
