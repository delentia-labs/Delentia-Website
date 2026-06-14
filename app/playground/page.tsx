import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import Link from "next/link"
import { getLearningResourceSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getRequestLocale } from "@/lib/request-locale"
import TraceConsoleSimulator from "@/components/demos/trace-console-simulator"

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Playground Sandbox — Colab & Kaggle Hub",
    "ห้องทดลองออนไลน์ — ศูนย์รวมเครื่องมือบน Colab และ Kaggle",
    "Run Delentia OS fine-tuning pipelines and evaluate model checkpoints using Google Colab and Kaggle datasets.",
    "สั่งรันขั้นตอนการ Fine-tune ของ Delentia OS และทดสอบประสิทธิภาพโมเดลโดยใช้ Google Colab และคลังข้อมูล Kaggle",
    "/playground"
  )
}

export default async function PlaygroundHubPage() {
  const locale = await getRequestLocale()
  const isTH = locale === "th"
  const localePrefix = isTH ? "/th" : "/en"

  const schema = getLearningResourceSchema({
    name: isTH ? "ห้องทดลองออนไลน์ Delentia OS" : "Delentia OS Playground Sandbox",
    description: isTH 
      ? "ทดสอบ and วิเคราะห์ระบบ JITNA v3, QLoRA fine-tuning และการคำนวณ FDIA" 
      : "Test and analyze JITNA v3 execution, QLoRA fine-tuning, and FDIA mathematical scoring.",
    url: `https://delentia.com/${locale}/playground`
  })

  const sandboxes = [
    {
      id: "colab",
      title: "Google Colab JITNA v3 Template 🚀",
      description: isTH
        ? "กระดานจดบันทึกสำหรับการเริ่มต้นดาวน์โหลดคลังโค้ด ติดตั้งตัวกรอง และเริ่มการ Fine-tune โมเดล QLoRA บนการ์ดจอ T4 หรือ A100"
        : "Interactive Jupyter Notebook to pull code repositories, configure libraries, and kickstart QLoRA fine-tuning on T4 or A100 GPUs.",
      buttonLabel: isTH ? "เปิดกระดาน Colab ↗" : "Launch Colab Notebook ↗",
      href: "https://colab.research.google.com/github/delentia-labs/Delentia-AI-SLM/blob/main/notebooks/colab_setup.ipynb",
    },
    {
      id: "kaggle",
      title: "Kaggle Dataset Sandbox 📊",
      description: isTH
        ? "ชุดข้อมูลชุดคำถามของ Delentia OS และสคริปต์ตรวจสอบความถูกต้องสำหรับการวิเคราะห์ความปลอดภัยและการเปรียบเทียบตรรกะระบบ"
        : "Delentia OS dataset pairs and evaluation scripts to run local model evaluations and benchmark safety compliance.",
      buttonLabel: isTH ? "ดูข้อมูลบน Kaggle ↗" : "Explore Kaggle Dataset ↗",
      href: "https://www.kaggle.com/datasets/delentialabs/delentia-os-jitna-v3",
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="relative min-h-screen bg-background" id="main-content">
        <Navbar locale={locale} />
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              {isTH ? "Data & Sandbox Hub" : "Data & Sandbox Hub"}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {isTH
                ? "เข้าทดสอบการทำงานของระบบ Delentia OS และฝึกฝนโมเดลผ่านสภาพแวดล้อมจำลองระดับคลาวด์ได้ทันที"
                : "Test Delentia OS routines and run custom model fine-tuning pipelines in secure cloud environments."}
            </p>
          </div>

          {/* Interactive Telemetry Simulator */}
          <div className="pt-4">
            <TraceConsoleSimulator language={locale} />
          </div>

          {/* Sandbox Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {sandboxes.map((box) => (
              <div
                key={box.id}
                className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between hover:border-gray-300 dark:hover:border-gray-700 transition space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs"
              >
                <div className="space-y-3">
                  <h2 className="text-xl font-bold">{box.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{box.description}</p>
                </div>

                <a
                  href={box.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-4 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                >
                  {box.buttonLabel}
                </a>
              </div>
            ))}
          </div>

          {/* Kaggle Dataset Showcase Section */}
          <section className="border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 bg-white/50 dark:bg-black/10 backdrop-blur-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{isTH ? "ชุดข้อมูล JITNA v3 บน Kaggle 🏆" : "Kaggle Dataset Showcase 🏆"}</h2>
              <a 
                href="https://www.kaggle.com/datasets/delentialabs/delentia-os-jitna-v3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://kaggle.com/static/images/open-in-kaggle.svg" alt="Open in Kaggle" className="h-4" />
              </a>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              {isTH
                ? "ชุดข้อมูลการประเมินความปลอดภัยและการประมวลผล Intent ในสถาปัตยกรรม 10 ชั้น เพื่อวิเคราะห์การทำงานของระบบประเมินความถูกต้อง (FDIA) และ SignedAI consensus"
                : "High-fidelity dataset containing intent-response pairs evaluated across the 10-layer Delentia OS model to audit FDIA correctness scores and SignedAI multi-LLM consensus thresholds."}
            </p>

            {/* Dataset details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-150 dark:border-gray-800">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase">{isTH ? "ขนาดไฟล์" : "File Size"}</span>
                <p className="font-bold text-sm">12.4 MB</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase">{isTH ? "รูปแบบไฟล์" : "Format"}</span>
                <p className="font-bold text-sm">JSON Lines (JSONL)</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase">{isTH ? "จำนวนระเบียน" : "Records"}</span>
                <p className="font-bold text-sm">12,500 pairs</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 uppercase">{isTH ? "ลิขสิทธิ์" : "License"}</span>
                <p className="font-bold text-sm">Apache 2.0</p>
              </div>
            </div>

            {/* Download and External Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href="https://www.kaggle.com/datasets/delentialabs/delentia-os-jitna-v3/download"
                className="text-xs font-semibold px-4 py-2 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
              >
                📥 {isTH ? "ดาวน์โหลดชุดข้อมูล (.jsonl)" : "Download Dataset (.jsonl)"}
              </a>
              <a 
                href="https://github.com/delentia-labs/Delentia-AI-SLM/tree/main/datasets"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
              >
                🐱 {isTH ? "ดูคลังชุดข้อมูลใน GitHub" : "View Datasets on GitHub"}
              </a>
            </div>
          </section>

          {/* License and Safety notes */}
          <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-semibold">{isTH ? "การใช้งานอย่างปลอดภัยและลิขสิทธิ์" : "Usage Policies & Licensing"}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {isTH
                ? "คลังความรู้ชุดข้อมูลสาธารณะและการตั้งค่าในแซนด์บ็อกซ์เหล่านี้เปิดให้เข้าทดสอบเพื่อการศึกษาการสร้างระบบ AI ควบคุมความปลอดภัย (Constitutional AI Evaluation) ภายใต้ลิขสิทธิ์ความรับผิดชอบร่วมกัน ห้ามมิให้นำไปใช้เพื่อประโยชน์ในทางหลอกลวงหรือโจมตีระบบโครงข่ายองค์กร"
                : "These public datasets and notebooks are provided for educational and research purposes under our unified safety guidelines. Adversarial testing or use cases threatening institutional infrastructures are strictly prohibited."}
            </p>
            <Link
              href={`${localePrefix}/models`}
              className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isTH ? "ดูผลลัพธ์ของโมเดลที่พรูฟแล้ว →" : "View verified model benchmarks →"}
            </Link>
          </div>
        </div>
        <Footer locale={locale} />
      </main>
    </>
  )
}
