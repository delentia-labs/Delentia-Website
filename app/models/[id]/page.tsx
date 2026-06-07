import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMLModelSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateStaticParams() {
  return [
    { id: "delentia-slm-v0.2.8-toon" },
    { id: "delentia-slm-v0.2.9-toon" },
  ]
}

type ModelDetailPageProps = {
  params: Promise<{ id: string }>
}

const MODELS_DATA = {
  "delentia-slm-v0.2.8-toon": {
    name: "Delentia SLM (v0.2.8-toon)",
    base: "Llama 3.1 8B",
    status: "Stable Active Run",
    githubRepo: "Delentia-AI-SLM",
    hfRepo: "Delentia/delentia-slm-jitna-v0.2",
    tag: "v0.2.8-toon",
    scores: {
      jitna: { val: 0.942, target: 0.94, desc: "JITNA Compliance" },
      fdia: { val: 0.88, target: 0.87, desc: "FDIA Avg F-Score" },
      halu: { val: 0.021, target: 0.028, desc: "Hallucination Rate (lower is better)" },
      toon: { val: 0.92, target: 0.90, desc: "TOON Compliance" },
      savings: { val: 46.5, target: 15.0, desc: "Token Savings %" }
    },
    specs: {
      rank: "32",
      alpha: "64",
      dropout: "0",
      precision: "bf16 (T4/A100 optimized)"
    }
  },
  "delentia-slm-v0.2.9-toon": {
    name: "Delentia SLM (v0.2.9-toon)",
    base: "Llama 3.1 8B",
    status: "Active Release",
    githubRepo: "Delentia-AI-SLM",
    hfRepo: "Delentia/delentia-slm-jitna-v0.2",
    tag: "v0.2.9-toon",
    scores: {
      jitna: { val: 0.948, target: 0.94, desc: "JITNA Compliance" },
      fdia: { val: 0.89, target: 0.87, desc: "FDIA Avg F-Score" },
      halu: { val: 0.019, target: 0.028, desc: "Hallucination Rate (lower is better)" },
      toon: { val: 0.93, target: 0.90, desc: "TOON Compliance" },
      savings: { val: 47.1, target: 15.0, desc: "Token Savings %" }
    },
    specs: {
      rank: "32",
      alpha: "64",
      dropout: "0",
      precision: "bf16 (SFTConfig optimized)"
    }
  }
}

function ModelRadarChart({ scores }: { scores: typeof MODELS_DATA["delentia-slm-v0.2.8-toon"]["scores"] }) {
  const cx = 150
  const cy = 150
  const r = 100

  const metrics = [
    { key: "jitna", label: "JITNA", val: scores.jitna.val },
    { key: "fdia", label: "FDIA F-Score", val: scores.fdia.val },
    { key: "halu", label: "Halu Control", val: (0.05 - scores.halu.val) / 0.05 },
    { key: "toon", label: "TOON", val: scores.toon.val },
    { key: "savings", label: "Token Savings", val: scores.savings.val / 100 }
  ]

  const points = metrics.map((m, i) => {
    const angle = i * 72 * Math.PI / 180 - Math.PI / 2
    const scoreVal = Math.min(1, Math.max(0, m.val))
    return {
      x: cx + r * scoreVal * Math.cos(angle),
      y: cy + r * scoreVal * Math.sin(angle),
      labelX: cx + (r + 25) * Math.cos(angle),
      labelY: cy + (r + 15) * Math.sin(angle),
      outerX: cx + r * Math.cos(angle),
      outerY: cy + r * Math.sin(angle),
      label: m.label
    }
  })

  const polyPoints = points.map(p => `${p.x},${p.y}`).join(" ")
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0]

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/60 dark:bg-card/40 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm">
      <svg width="340" height="340" className="max-w-full h-auto">
        <defs>
          <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a853" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d4a853" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {levels.map((level, levelIdx) => {
          const levelPoints = metrics.map((_, i) => {
            const angle = i * 72 * Math.PI / 180 - Math.PI / 2
            return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`
          }).join(" ")
          return (
            <polygon
              key={levelIdx}
              points={levelPoints}
              fill="none"
              stroke={level === 1.0 ? "rgba(212, 168, 83, 0.35)" : "rgba(212, 168, 83, 0.15)"}
              strokeWidth="1"
              strokeDasharray={level === 1.0 ? "" : "3,3"}
            />
          )
        })}

        {points.map((p, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.outerX}
            y2={p.outerY}
            stroke="rgba(212, 168, 83, 0.15)"
            strokeWidth="1"
          />
        ))}

        <polygon
          points={polyPoints}
          fill="url(#radarGrad)"
          stroke="#d4a853"
          strokeWidth="2"
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#d4a853"
            stroke="#fff"
            strokeWidth="1.5"
            className="drop-shadow-sm"
          />
        ))}

        {points.map((p, i) => {
          const textAnchor: "start" | "end" | "middle" =
            p.outerX > cx + 10 ? "start" : p.outerX < cx - 10 ? "end" : "middle"
          return (
            <text
              key={i}
              x={p.labelX}
              y={p.labelY}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className="text-[10px] font-semibold fill-gray-600 dark:fill-gray-400 font-sans"
            >
              {p.label}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

export async function generateMetadata({ params }: ModelDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const locale = await getRequestLocale()
  const model = MODELS_DATA[id as keyof typeof MODELS_DATA]
  if (!model) return notFound()

  return createBilingualMetadata(
    locale,
    `Model Card — ${model.name}`,
    `โมเดลการ์ด — ${model.name}`,
    `Technical specifications and performance benchmarks for ${model.name}.`,
    `ข้อกำหนดทางเทคนิคและคะแนนการรันโมเดลทดสอบประสิทธิภาพสำหรับ ${model.name}`,
    `/models/${id}`
  )
}

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const { id } = await params
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"
  const model = MODELS_DATA[id as keyof typeof MODELS_DATA]

  if (!model) {
    return notFound()
  }

  const modelSchema = getMLModelSchema({
    name: model.name,
    description: isTH
      ? `โมเดลภาษาขนาดเล็ก อ้างอิงบนฐาน: ${model.base} พร้อมการเชื่อมต่อ JITNA และสมการ FDIA`
      : `Small Language Model based on: ${model.base} with JITNA compliance and FDIA avg f-score.`,
    version: model.tag,
    hfRepo: model.hfRepo,
    license: "Apache-2.0"
  })

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelSchema) }}
      />
      <main className="relative min-h-screen bg-background" id="main-content">
        <Navbar locale={locale} />
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href={`${localePrefix}/ecosystem`} className="hover:underline">
            {isTH ? "Ecosystem" : "Ecosystem"}
          </Link>
          <span>/</span>
          <Link href={`${localePrefix}/models`} className="hover:underline">
            Models
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">{id}</span>
        </div>

        {/* Main Model Card Header */}
        <div className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight">{model.name}</h1>
              <p className="text-sm text-gray-400">
                {isTH ? `โมเดลภาษาขนาดเล็ก อ้างอิงบนฐาน: ${model.base}` : `Small Language Model based on: ${model.base}`}
              </p>
            </div>
            <a
              href={`https://huggingface.co/${model.hfRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition text-center"
            >
              {isTH ? "ดึงผ่าน Hugging Face 🧠" : "Pull on Hugging Face 🧠"}
            </a>
          </div>

          {/* Specs Table */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="space-y-1">
              <span className="text-xs text-gray-400 uppercase">{isTH ? "ความกว้างของ Rank" : "LoRA Rank (r)"}</span>
              <p className="font-bold text-sm">{model.specs.rank}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-400 uppercase">{isTH ? "ความกว้างของ Alpha" : "LoRA Alpha"}</span>
              <p className="font-bold text-sm">{model.specs.alpha}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-400 uppercase">{isTH ? "อัตราดรอปเอาท์" : "LoRA Dropout"}</span>
              <p className="font-bold text-sm">{model.specs.dropout}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-400 uppercase">{isTH ? "สเปกความแม่นยำ" : "Precision Mode"}</span>
              <p className="font-bold text-sm">{model.specs.precision}</p>
            </div>
          </div>
        </div>

        {/* Benchmark Dashboard */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">{isTH ? "แผงควบคุมประสิทธิภาพ (Benchmark Dashboard)" : "Performance Benchmarks"}</h2>
          <p className="text-sm text-gray-500">
            {isTH
              ? "คะแนนที่บันทึกได้จากการรันคัดกรองผ่านการประเมินคุณภาพของโปรเจกต์ Delentia OS:"
              : "Recorded evaluation metrics validated through the Delentia OS pipeline:"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-8 items-center">
            {/* Left side: Radar Chart */}
            <ModelRadarChart scores={model.scores} />

            {/* Right side: Detailed metric list */}
            <div className="grid gap-4">
              {Object.entries(model.scores).map(([key, score]) => {
                const isHalu = key === "halu"
                const pct = isHalu
                  ? Math.max(0, 100 - (score.val / score.target) * 100)
                  : (score.val / score.target) * 100
                
                const formattedVal = isHalu 
                  ? `${(score.val * 100).toFixed(1)}%` 
                  : key === "savings" 
                    ? `${score.val}%` 
                    : `${(score.val * 100).toFixed(1)}%`
                const formattedTarget = isHalu 
                  ? `< ${(score.target * 100).toFixed(1)}%` 
                  : key === "savings" 
                    ? `> ${score.target}%` 
                    : `> ${(score.target * 100).toFixed(1)}%`

                return (
                  <div
                    key={key}
                    className="border border-gray-100 dark:border-gray-900 rounded-2xl p-4 space-y-2 bg-gray-50/50 dark:bg-black/5"
                  >
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span>{score.desc}</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        {formattedVal} <span className="text-xs text-gray-400">({isTH ? "เป้าหมาย" : "Target"}: {formattedTarget})</span>
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isHalu && score.val <= score.target ? "bg-green-500" : isHalu ? "bg-red-500" : pct >= 100 ? "bg-green-500" : "bg-yellow-500"}`}
                        style={{ width: `${Math.min(100, Math.max(10, pct))}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Run Locally section */}
        <section className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs">
          <h2 className="text-xl font-bold">{isTH ? "คำสั่งเปิดรันบนคอมพิวเตอร์ของคุณ" : "Run Model Locally"}</h2>
          <p className="text-gray-500 text-sm">
            {isTH
              ? "หากคุณมีโปรแกรม Ollama ติดตั้งอยู่ในเครื่อง สามารถพิมพ์เรียกเพื่อใช้งานได้ทันที:"
              : "If you have Ollama installed, run this model directly on your local system:"}
          </p>
          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-3 flex items-center justify-between font-mono text-xs text-gray-800 dark:text-gray-200">
            <span>ollama run delentia-jitna-v0.2</span>
            <span className="text-[10px] text-gray-400">copy</span>
          </div>
          <div className="flex justify-center gap-3">
            <Link
              href={`${localePrefix}/playground`}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isTH ? "ไปที่หน้า Sandbox 🧪" : "Go to Playground Sandbox 🧪"}
            </Link>
          </div>
        </section>
      </div>
      <Footer locale={locale} />
    </main>
  </>
  )
}
