import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "AI Models Hub — Delentia SLMs",
    "คลังโมเดล AI — Delentia SLMs ประสิทธิภาพสูง",
    "Explore custom Delentia Small Language Models (SLMs) fine-tuned on JITNA compliance data.",
    "สำรวจโมเดลภาษาขนาดเล็ก (SLMs) ของ Delentia ที่ได้รับการปรับแต่งอย่างประณีตสำหรับข้อตกลงความปลอดภัย JITNA",
    "/models"
  )
}

export default async function ModelsHubPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const models = [
    {
      id: "delentia-slm-v0.2.8-toon",
      name: "Delentia SLM (v0.2.8-toon)",
      base: "Llama 3.1 8B",
      status: "Stable Active Run",
      scores: { jitna: "94.2%", fdia: "0.88", halu: "2.1%" },
      description: isTH
        ? "โมเดลเวอร์ชันเสถียรที่แก้ไขปัญหาหน่วยความจำ VRAM บนการ์ดจอ T4 และควบคุมผลลัพธ์ผ่าน TOON format"
        : "Stable active run resolving Tesla T4 GPU memory constraints, formatting outputs in TOON format.",
    },
    {
      id: "delentia-slm-v0.2.9-toon",
      name: "Delentia SLM (v0.2.9-toon)",
      base: "Llama 3.1 8B",
      status: "Active Release",
      scores: { jitna: "94.8%", fdia: "0.89", halu: "1.9%" },
      description: isTH
        ? "เวอร์ชันอัปเกรดที่ใช้ไลบรารี SFTConfig เพื่อแก้ไขบั๊กการบันทึก Checkpoint ใน Colab Loop"
        : "Upgraded release utilizing SFTConfig arguments to fix checkpoint serialization errors.",
    },
  ]

  return (
    <main className="relative min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {isTH ? "AI Cognitive Hub" : "AI Cognitive Hub"}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {isTH
              ? "โมเดลภาษาขนาดเล็ก (SLM) ของ Delentia ที่ได้รับการฝึกฝนเป็นพิเศษสำหรับการประมวลผล Intent Flow"
              : "Delentia Small Language Models (SLMs) fine-tuned specifically for governing Intent Flow pipelines."}
          </p>
        </div>

        {/* Model Cards List */}
        <div className="space-y-6">
          {models.map((model) => (
            <div
              key={model.id}
              className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs hover:border-gray-300 dark:hover:border-gray-700 transition"
            >
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{model.name}</h2>
                  <span className="text-xs text-gray-400 font-mono">Base: {model.base}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/40 dark:border-green-800/40">
                    {model.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{model.description}</p>
                
                {/* Radar Scores Preview */}
                <div className="flex gap-6 text-xs font-semibold text-gray-700 dark:text-gray-300 pt-2 font-mono">
                  <span>JITNA: <strong className="text-blue-600 dark:text-blue-400">{model.scores.jitna}</strong></span>
                  <span>FDIA F-Score: <strong className="text-purple-600 dark:text-purple-400">{model.scores.fdia}</strong></span>
                  <span>Hallucinations: <strong className="text-green-600 dark:text-green-400">{model.scores.halu}</strong></span>
                </div>
              </div>

              <Link
                href={`${localePrefix}/models/${model.id}`}
                className="shrink-0 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition text-center"
              >
                {isTH ? "เจาะลึกโมเดลการ์ด" : "Deep Dive Model Card"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
