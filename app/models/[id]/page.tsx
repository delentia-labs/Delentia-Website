import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"

export const revalidate = 3600

// Round 87 (claims review). This page used to show benchmark dashboards for two "Delentia SLM v0.2.x" versions:
// "JITNA compliance 94.2%", "hallucination 2.1%", "token savings 46.5%" and a radar chart. No evaluation behind
// those numbers was found, and the Hugging Face repository of v0.2 holds only a model card, no weights. The page now
// states what each repository contains. The v0.4 repository does hold weights (safetensors and GGUF files, a
// Modelfile and the author's own local benchmark script output). Delentia's agent runtime does not use any of
// these models today; its default is whichever model the owner sets (Ollama qwen2.5:7b unless changed).

export async function generateStaticParams() {
  return [{ id: "delentia-slm-jitna-v0.4" }, { id: "delentia-slm-v0.2.8-toon" }, { id: "delentia-slm-v0.2.9-toon" }]
}

type ModelDetailPageProps = {
  params: Promise<{ id: string }>
}

type Row = { en: string; th: string }

const MODELS_DATA: Record<string, { name: string; base: string; hfRepo: string; contains: Row; limits: Row[] }> = {
  "delentia-slm-jitna-v0.4": {
    name: "Delentia SLM (v0.4)",
    base: "Llama 3.1 8B",
    hfRepo: "Delentia/delentia-slm-jitna-v0.4",
    contains: {
      en: "The repository holds the merged weights (safetensors), quantised GGUF files, a Modelfile for Ollama, training configurations and the output of the author's own local benchmark script.",
      th: "รีโพมีน้ำหนักโมเดลที่รวมแล้ว (safetensors) ไฟล์ GGUF ที่ quantize แล้ว Modelfile สำหรับ Ollama ไฟล์ตั้งค่าการเทรน และผลลัพธ์จากสคริปต์ benchmark ในเครื่องของผู้พัฒนาเอง",
    },
    limits: [
      { en: "The figures in the model card come from the author's own local script and were not independently reproduced. Some are not meaningful as written: for example an adapter swap time of 0.0000 ms, and answers that took between 4 and 13 minutes to stream.", th: "ตัวเลขในโมเดลการ์ดมาจากสคริปต์ในเครื่องของผู้พัฒนาเองและยังไม่มีผู้ใดทำซ้ำอย่างอิสระ บางตัวไม่มีความหมายตามที่เขียน เช่นเวลาสลับ adapter 0.0000 ms และคำตอบที่ใช้เวลาสตรีม 4 ถึง 13 นาที" },
      { en: "The 'peer-reviewed' tag on the card is not accurate: a Zenodo upload is a publication, not a peer review.", th: "แท็ก 'peer-reviewed' บนการ์ดไม่ถูกต้อง การอัปโหลดบน Zenodo เป็นการเผยแพร่ ไม่ใช่การทบทวนโดยผู้ทรงคุณวุฒิ" },
      { en: "Delentia's agent runtime does not use this model today. Its default is the model the owner sets, Ollama qwen2.5:7b unless changed. No evaluation of this model inside the runtime has been run.", th: "รันไทม์ของ Delentia ไม่ได้ใช้โมเดลนี้ในปัจจุบัน ค่าเริ่มต้นคือโมเดลที่เจ้าของตั้ง คือ Ollama qwen2.5:7b หากไม่เปลี่ยน และยังไม่เคยประเมินโมเดลนี้ในรันไทม์" },
    ],
  },
  "delentia-slm-v0.2.8-toon": {
    name: "Delentia SLM (v0.2.8-toon)",
    base: "Llama 3.1 8B",
    hfRepo: "Delentia/delentia-slm-jitna-v0.2",
    contains: {
      en: "The Hugging Face repository for version 0.2 holds only a model card, with no weights.",
      th: "รีโพ Hugging Face ของเวอร์ชัน 0.2 มีเพียงโมเดลการ์ด ไม่มีน้ำหนักโมเดล",
    },
    limits: [
      { en: "Scores that used to be shown here (JITNA compliance, hallucination rate, token savings) had no evaluation behind them and were removed.", th: "คะแนนที่เคยแสดงที่นี่ (JITNA compliance, อัตรา hallucination, การประหยัดโทเค็น) ไม่มีการประเมินรองรับและถูกถอนแล้ว" },
      { en: "See version 0.4 for a repository that contains weights.", th: "ดูเวอร์ชัน 0.4 สำหรับรีโพที่มีน้ำหนักโมเดล" },
    ],
  },
  "delentia-slm-v0.2.9-toon": {
    name: "Delentia SLM (v0.2.9-toon)",
    base: "Llama 3.1 8B",
    hfRepo: "Delentia/delentia-slm-jitna-v0.2",
    contains: {
      en: "The Hugging Face repository for version 0.2 holds only a model card, with no weights.",
      th: "รีโพ Hugging Face ของเวอร์ชัน 0.2 มีเพียงโมเดลการ์ด ไม่มีน้ำหนักโมเดล",
    },
    limits: [
      { en: "Scores that used to be shown here had no evaluation behind them and were removed.", th: "คะแนนที่เคยแสดงที่นี่ไม่มีการประเมินรองรับและถูกถอนแล้ว" },
      { en: "See version 0.4 for a repository that contains weights.", th: "ดูเวอร์ชัน 0.4 สำหรับรีโพที่มีน้ำหนักโมเดล" },
    ],
  },
}

export async function generateMetadata({ params }: ModelDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const locale = await getRequestLocale()
  const model = MODELS_DATA[id]
  if (!model) return notFound()

  return createBilingualMetadata(
    locale,
    `Model — ${model.name}`,
    `โมเดล — ${model.name}`,
    `What the ${model.name} repository contains and what has and has not been verified. No benchmark scores are claimed.`,
    `สิ่งที่รีโพ ${model.name} มี และสิ่งที่ตรวจสอบแล้วและยังไม่ได้ตรวจสอบ ไม่อ้างคะแนน benchmark`,
    `/models/${id}`
  )
}

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const { id } = await params
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"
  const model = MODELS_DATA[id]
  if (!model) return notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 space-y-8">
        <Link href={`${localePrefix}/models`} className="text-sm text-muted-foreground hover:underline">
          {isTH ? "← โมเดลทั้งหมด" : "← All models"}
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{model.name}</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">Base: {model.base}</p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h2 className="text-lg font-bold text-foreground">{isTH ? "สิ่งที่รีโพมี" : "What the repository contains"}</h2>
          <p className="text-sm text-muted-foreground">{isTH ? model.contains.th : model.contains.en}</p>
          <a
            href={`https://huggingface.co/${model.hfRepo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-warm-amber hover:underline"
          >
            huggingface.co/{model.hfRepo}
          </a>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h2 className="text-lg font-bold text-foreground">{isTH ? "ข้อจำกัดและสิ่งที่ยังไม่ได้ตรวจสอบ" : "Limits and what is not verified"}</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {model.limits.map((row) => (
              <li key={row.en}>{isTH ? row.th : row.en}</li>
            ))}
          </ul>
        </section>

        <Link href={`${localePrefix}/benchmark`} className="inline-block text-sm font-semibold text-warm-amber hover:underline">
          {isTH ? "ดูสิ่งที่เราวัดจริง" : "See what we measured ourselves"}
        </Link>
      </div>
      <Footer locale={locale} />
    </main>
  )
}
