import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

// Round 87 (claims review): the benchmark scores that used to be listed for the v0.2.x models (JITNA 94.2%,
// hallucination 2.1%) had no evaluation behind them, and the v0.2 Hugging Face repository holds no weights. The
// published model with weights is v0.4. See the detail pages for what each repository contains.

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Published Delentia models",
    "โมเดลที่ Delentia เผยแพร่",
    "The small language models Delentia has published on Hugging Face, what each repository contains, and what has not been verified. No benchmark scores are claimed.",
    "โมเดลภาษาขนาดเล็กที่ Delentia เผยแพร่บน Hugging Face สิ่งที่แต่ละรีโพมี และสิ่งที่ยังไม่ได้ตรวจสอบ ไม่อ้างคะแนน benchmark",
    "/models"
  )
}

export default async function ModelsHubPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const models = [
    {
      id: "delentia-slm-jitna-v0.4",
      name: "Delentia SLM (v0.4)",
      base: "Llama 3.1 8B",
      status: isTH ? "มีน้ำหนักโมเดลบน Hugging Face" : "Weights on Hugging Face",
      description: isTH
        ? "ฟายน์จูนจาก Llama 3.1 8B มี safetensors, GGUF และ Modelfile สำหรับ Ollama ตัวเลขในโมเดลการ์ดมาจากสคริปต์ของผู้พัฒนาเองและยังไม่มีการทำซ้ำอย่างอิสระ"
        : "A fine-tune of Llama 3.1 8B with safetensors, GGUF files and a Modelfile for Ollama. The figures in the model card come from the author's own script and have not been independently reproduced.",
    },
    {
      id: "delentia-slm-v0.2.9-toon",
      name: "Delentia SLM (v0.2.8 and v0.2.9)",
      base: "Llama 3.1 8B",
      status: isTH ? "โมเดลการ์ดเท่านั้น ไม่มีน้ำหนัก" : "Model card only, no weights",
      description: isTH
        ? "รีโพเวอร์ชัน 0.2 บน Hugging Face มีเพียงโมเดลการ์ด คะแนนที่เคยแสดงที่นี่ไม่มีการประเมินรองรับและถูกถอนแล้ว"
        : "The version 0.2 repository on Hugging Face holds only a model card. The scores that used to be shown here had no evaluation behind them and were withdrawn.",
    },
  ]

  return (
    <main className="relative min-h-screen bg-background" id="main-content">
      <Navbar locale={locale} />
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{isTH ? "โมเดลที่เผยแพร่" : "Published models"}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {isTH
              ? "โมเดลภาษาขนาดเล็กที่ Delentia เผยแพร่บน Hugging Face รันไทม์ของ agent ไม่ได้ใช้โมเดลเหล่านี้เป็นค่าเริ่มต้น เจ้าของเลือกโมเดลเอง"
              : "Small language models Delentia has published on Hugging Face. The agent runtime does not use them by default; the owner chooses the model."}
          </p>
        </div>

        <div className="space-y-6">
          {models.map((model) => (
            <div
              key={model.id}
              className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 dark:bg-black/10"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{model.name}</h2>
                  <span className="text-xs text-gray-400 font-mono">Base: {model.base}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {model.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{model.description}</p>
              </div>
              <Link
                href={`${localePrefix}/models/${model.id}`}
                className="shrink-0 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition text-center"
              >
                {isTH ? "ดูรายละเอียด" : "Details"}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
