"use client"

import Link from "next/link"
import { m } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { useMounted } from "@/hooks/use-mounted"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

/* ─── DATA ───
 * Every number on this page comes from a script or a CI run in the public repository (delentia-labs/Delentia-OS).
 * Rule for editing: a number may be added only together with the file that produced it and the reason it is weaker than it looks.
 * Nothing here compares Delentia with another product except the memory-store test, which ran both on the same workload.
 */
const REPO = "https://github.com/delentia-labs/Delentia-OS/blob/main/"

type Result = {
  id: string
  titleEn: string
  titleTh: string
  numberEn: string
  numberTh: string
  howEn: string
  howTh: string
  limitEn: string
  limitTh: string
  source: { label: string; href: string }
}

const results: Result[] = [
  {
    id: "tests",
    titleEn: "Public test suite",
    titleTh: "ชุดทดสอบสาธารณะ",
    numberEn: `${SITE_PUBLIC_SDK_TESTS.toLocaleString("en-US")} passed, 46 skipped, 0 failed; 91.79% line coverage`,
    numberTh: `ผ่าน ${SITE_PUBLIC_SDK_TESTS.toLocaleString("en-US")} ข้าม 43 ล้มเหลว 0; ครอบคลุมบรรทัด 91.79%`,
    howEn: "GitHub Actions on the main branch, 12 Oct 2026.",
    howTh: "GitHub Actions บนสาขา main วันที่ 12 ต.ค. 2569",
    limitEn: "Shows the code does what the tests say. It does not show that a model uses the tools well.",
    limitTh: "แสดงว่าโค้ดทำงานตามที่ชุดทดสอบเขียนไว้ ไม่ได้แสดงว่าโมเดลใช้เครื่องมือได้ดี",
    source: { label: "CI run 40166394493", href: "https://github.com/delentia-labs/Delentia-OS/actions/runs/40166394493" },
  },
  {
    id: "injection-gate",
    titleEn: "Hijacked-model test (prompt injection)",
    titleTh: "ทดสอบโมเดลที่ถูกยึด (prompt injection)",
    numberEn: "21 scenarios: 18 reached a harmful side effect without the structural gate, 0 with it; 6 of 6 legitimate workflows still ran",
    numberTh: "21 สถานการณ์: 18 ไปถึงผลข้างเคียงที่เป็นอันตรายเมื่อไม่มีเกต, 0 เมื่อมีเกต; เวิร์กโฟลว์ปกติ 6 จาก 6 ยังรันได้",
    howEn: "A scripted model that obeys every instruction it reads (the worst case) is shown pages with hidden instructions. The suite later grew to 23 scenarios, still 0.",
    howTh: "โมเดลสคริปต์ที่ทำตามทุกคำสั่งที่อ่านเจอ (กรณีเลวร้ายที่สุด) ถูกให้อ่านหน้าที่ซ่อนคำสั่งไว้ ภายหลังขยายเป็น 23 สถานการณ์ ผลยังเป็น 0",
    limitEn: "A scripted worst case, not a real model. With a real local 7B model the harmful tool ran 0 times, but it read the injected page in only 11 of 18 scenarios: a small sample, not proof. Wrong-but-harmless answers are not covered.",
    limitTh: "เป็นกรณีเลวร้ายที่สคริปต์ ไม่ใช่โมเดลจริง กับโมเดลท้องถิ่น 7B จริง เครื่องมือที่เป็นอันตรายรัน 0 ครั้ง แต่โมเดลอ่านหน้าที่ฝังคำสั่งเพียง 11 จาก 18 สถานการณ์ จึงเป็นตัวอย่างเล็ก ไม่ใช่การพิสูจน์ คำตอบที่ผิดแต่ไม่เป็นอันตรายไม่ถูกครอบคลุม",
    source: { label: "scripts/measure_injection_defence.py", href: `${REPO}scripts/measure_injection_defence.py` },
  },
  {
    id: "policy",
    titleEn: "Default owner policy on labelled requests",
    titleTh: "นโยบายเจ้าของค่าเริ่มต้นกับคำขอที่ติดป้ายแล้ว",
    numberEn: "169 requests: 3 of 110 unsafe ones still ran; 6 of 59 harmless ones were stopped",
    numberTh: "169 คำขอ: คำขอไม่ปลอดภัย 3 จาก 110 ยังรันได้; คำขอไม่เป็นอันตราย 6 จาก 59 ถูกหยุด",
    howEn: "Each request goes through the real gate and the real shell sandbox; the verdict is compared with the label.",
    howTh: "ทุกคำขอผ่านเกตและแซนด์บอกซ์เชลล์จริง แล้วเทียบผลกับป้ายที่ติดไว้",
    limitEn: "The labels were written by the developers, and part of the set was used while the rules were tuned, so this is not an independent test.",
    limitTh: "ป้ายเขียนโดยผู้พัฒนา และบางส่วนของชุดถูกใช้ตอนปรับกฎ จึงไม่ใช่การทดสอบอิสระ",
    source: { label: "research/fdia_calibration_policy_argaware.json", href: `${REPO}research/fdia_calibration_policy_argaware.json` },
  },
  {
    id: "fdia-vs-d",
    titleEn: "Does the FDIA equation add anything over data quality alone?",
    titleTh: "สมการ FDIA เพิ่มอะไรเหนือคุณภาพข้อมูลอย่างเดียวหรือไม่",
    numberEn: "No evidence yet: F = D^I × A and D alone gave the same held-out result (0% unsafe allowed, 89.5% of harmless requests also stopped)",
    numberTh: "ยังไม่มีหลักฐาน: F = D^I × A กับ D อย่างเดียวให้ผลเหมือนกันบนชุดแยก (อนุญาตคำขอไม่ปลอดภัย 0%, คำขอไม่เป็นอันตรายถูกหยุดด้วย 89.5%)",
    howEn: "120 labelled requests through the real gate, comparing the full equation with D alone.",
    howTh: "120 คำขอที่ติดป้ายผ่านเกตจริง เทียบสมการเต็มกับ D อย่างเดียว",
    limitEn: "A negative finding that we publish on purpose. The human-approval and policy layers do the protective work in these tests.",
    limitTh: "เป็นผลลบที่เราเปิดเผยโดยตั้งใจ ในการทดสอบนี้ชั้นการอนุมัติโดยมนุษย์และนโยบายเป็นตัวที่ป้องกันจริง",
    source: { label: "research/fdia_calibration.json", href: `${REPO}research/fdia_calibration.json` },
  },
  {
    id: "cord",
    titleEn: "Injection screen on text it has never seen",
    titleTh: "ตัวคัดกรอง injection กับข้อความที่ไม่เคยเห็น",
    numberEn: "External labelled set: 6.7% of attacks blocked on the first look, 10% after generic additions, 23% with a small model's second opinion; 0 false blocks in 532 harmless texts. Thai holdout: 15 of 31 (48.4%) at 0 of 32 false blocks",
    numberTh: "ชุดติดป้ายภายนอก: บล็อกการโจมตีได้ 6.7% ในการดูครั้งแรก, 10% หลังเพิ่มวลีทั่วไป, 23% เมื่อใช้ความเห็นที่สองจากโมเดลเล็ก; ไม่บล็อกผิดเลยใน 532 ข้อความปกติ ชุดแยกภาษาไทย: 15 จาก 31 (48.4%) โดยบล็อกผิด 0 จาก 32",
    howEn: "Public prompt-injection test split, not copied into the repository; Thai sets written by us, holdout measured once.",
    howTh: "ชุดทดสอบ prompt-injection สาธารณะที่ไม่ได้คัดลอกเข้ารีโป ชุดภาษาไทยเขียนเอง ชุดแยกวัดครั้งเดียว",
    limitEn: "Rules catch a minority of unseen attacks. That is why the structural gate above exists instead of relying on the screen.",
    limitTh: "กฎจับการโจมตีที่ไม่เคยเห็นได้เพียงส่วนน้อย เราจึงใช้เกตเชิงโครงสร้างข้างบนแทนที่จะพึ่งตัวคัดกรอง",
    source: { label: "research/ (CORD sets and results)", href: `${REPO}research/` },
  },
  {
    id: "prompt-cost",
    titleEn: "Where the prompt tokens go",
    titleTh: "โทเค็นของพรอมต์ไปอยู่ที่ไหน",
    numberEn: "The tool menu is 94% of a prompt (7,153 of 7,637 tokens, 48 tools). Delta v2 shrinks large tool output by 48–69%, and nothing below 6,000 characters",
    numberTh: "เมนูเครื่องมือคิดเป็น 94% ของพรอมต์ (7,153 จาก 7,637 โทเค็น, 48 เครื่องมือ) Delta v2 ลดผลลัพธ์เครื่องมือขนาดใหญ่ได้ 48–69% และไม่ลดอะไรเลยถ้าต่ำกว่า 6,000 ตัวอักษร",
    howEn: "Token counts with tiktoken on the runtime's real prompts and three real 30 KB documents.",
    howTh: "นับโทเค็นด้วย tiktoken จากพรอมต์จริงของรันไทม์และเอกสารจริงขนาด 30 KB สามชุด",
    limitEn: "Counts are approximate and model-specific. The real cache hit rate has never been measured.",
    limitTh: "จำนวนโทเค็นเป็นค่าประมาณและขึ้นกับโมเดล อัตราการโดนแคชจริงยังไม่เคยวัด",
    source: { label: "scripts/measure_prompt_cost.py", href: `${REPO}scripts/measure_prompt_cost.py` },
  },
  {
    id: "delta",
    titleEn: "Delta storage versus plain compression",
    titleTh: "การเก็บแบบ Delta เทียบกับการบีบอัดธรรมดา",
    numberEn: "Structural delta saves 70–94% against raw JSON, but a snapshot plus zstd saves 96.7–99.6%, within 3% of delta plus zstd. No evidence that Delta beats ordinary compression for a stream",
    numberTh: "delta เชิงโครงสร้างประหยัด 70–94% เทียบกับ JSON ดิบ แต่ snapshot รวม zstd ประหยัด 96.7–99.6% ต่างจาก delta รวม zstd ไม่เกิน 3% ยังไม่มีหลักฐานว่า Delta ชนะการบีบอัดทั่วไปสำหรับสตรีม",
    howEn: "Byte counts on the runtime's own payloads, including the real memory table.",
    howTh: "นับไบต์บนข้อมูลจริงของรันไทม์ รวมตารางหน่วยความจำจริง",
    limitEn: "Delta wins only for random access and appending; a damaged byte costs it up to 20 ticks.",
    limitTh: "Delta ชนะเฉพาะการเข้าถึงแบบสุ่มและการต่อท้าย และไบต์ที่เสียหายทำให้เสียได้ถึง 20 ติ๊ก",
    source: { label: "research/delta_storage.json", href: `${REPO}research/delta_storage.json` },
  },
  {
    id: "memory-store",
    titleEn: "Memory store compared with LangGraph and mem0",
    titleTh: "ที่เก็บหน่วยความจำเทียบกับ LangGraph และ mem0",
    numberEn: "At 2,000 operations: Delentia 1.5 MB (sealed log), mem0 7.1 MB, LangGraph 192 MB. After each system's own delete call the person's text was still in the file for LangGraph and mem0, and gone only after Delentia's erase",
    numberTh: "ที่ 2,000 การดำเนินการ: Delentia 1.5 MB (ล็อกที่ปิดผนึก), mem0 7.1 MB, LangGraph 192 MB หลังเรียกคำสั่งลบของแต่ละระบบ ข้อความของบุคคลยังอยู่ในไฟล์ของ LangGraph และ mem0 และหายไปเฉพาะหลังใช้การลบของ Delentia",
    howEn: "One synthetic workload, default settings of mem0ai 2.2.1 and LangGraph with SqliteSaver, raw database files scanned for the text.",
    howTh: "ปริมาณงานสังเคราะห์หนึ่งชุด ค่าเริ่มต้นของ mem0ai 2.2.1 และ LangGraph กับ SqliteSaver สแกนไฟล์ฐานข้อมูลดิบหาข้อความ",
    limitEn: "One workload and default configurations. Recall quality was not measured here.",
    limitTh: "ปริมาณงานชุดเดียวและค่าเริ่มต้น ไม่ได้วัดคุณภาพการเรียกคืน",
    source: { label: "research/m6_*.json", href: `${REPO}research/` },
  },
  {
    id: "recall",
    titleEn: "Recall by meaning",
    titleTh: "การเรียกคืนตามความหมาย",
    numberEn: "30 paraphrased questions among 120 texts: Delentia word matching 7, mem0 24, Delentia with local embeddings 22. Held-out Thai set of 40: 20 with word matching, 38 with the bge-m3 embedding",
    numberTh: "คำถามเปลี่ยนถ้อยคำ 30 ข้อใน 120 ข้อความ: Delentia จับคำ 7, mem0 24, Delentia กับ embedding ภายในเครื่อง 22 ชุดแยกภาษาไทย 40 ข้อ: จับคำ 20, ใช้ embedding bge-m3 38",
    howEn: "Fixed question sets written before the runs; top-3 hit counts.",
    howTh: "ชุดคำถามที่เขียนก่อนรัน นับจำนวนที่ติดอันดับ 1–3",
    limitEn: "Synthetic data, not real users' memories. Word matching alone is weaker than mem0 here; embeddings are optional and not the default.",
    limitTh: "ข้อมูลสังเคราะห์ ไม่ใช่ความจำของผู้ใช้จริง การจับคำอย่างเดียวด้อยกว่า mem0 ในชุดนี้ embedding เป็นทางเลือกและไม่ใช่ค่าเริ่มต้น",
    source: { label: "research/ (recall datasets and results)", href: `${REPO}research/` },
  },
  {
    id: "startup",
    titleEn: "Start-up and footprint",
    titleTh: "เวลาเริ่มและทรัพยากรที่ใช้",
    numberEn: "`delentia serve` answers /health in about 2.9 s; idle memory about 471 MB; about 0.3 s of runtime overhead per governed episode",
    numberTh: "`delentia serve` ตอบ /health ภายในราว 2.9 วินาที; ใช้หน่วยความจำขณะว่างราว 471 MB; โอเวอร์เฮดของรันไทม์ราว 0.3 วินาทีต่อหนึ่งตอนที่ผ่านการกำกับดูแล",
    howEn: "Measured on one Windows PC with a scripted model.",
    howTh: "วัดบนพีซี Windows เครื่องเดียวด้วยโมเดลสคริปต์",
    limitEn: "One machine. Not a load test and not a production figure.",
    limitTh: "เครื่องเดียว ไม่ใช่การทดสอบโหลดและไม่ใช่ตัวเลขการใช้งานจริง",
    source: { label: "scripts/host_sizing.py", href: `${REPO}scripts/host_sizing.py` },
  },
  {
    id: "drill",
    titleEn: "Unattended-operation drill",
    titleTh: "ซ้อมการทำงานโดยไม่มีคนดู",
    numberEn: "8 of 8 observations hold: a scheduled read job ran by itself, a scheduled write job stopped and waited for a signature and wrote nothing, an emergency pause stopped a new job, and the audit trail the server wrote (36 rows) verified",
    numberTh: "8 จาก 8 ข้อสังเกตเป็นจริง: งานอ่านตามเวลารันเอง, งานเขียนตามเวลาหยุดรอลายเซ็นและไม่เขียนอะไร, การหยุดฉุกเฉินหยุดงานใหม่ได้ และบันทึกตรวจสอบที่เซิร์ฟเวอร์เขียน (36 แถว) ตรวจผ่าน",
    howEn: "A real `delentia serve` with the daemon on, a real clock and a scripted model, left alone for about two minutes.",
    howTh: "`delentia serve` จริงที่เปิดตัวทำงานเบื้องหลัง นาฬิกาจริง และโมเดลสคริปต์ ปล่อยไว้ราวสองนาที",
    limitEn: "Shows the code side of autonomy. It does not show that a capable model can drive it, or that it runs for days.",
    limitTh: "แสดงฝั่งโค้ดของการทำงานอัตโนมัติ ไม่ได้แสดงว่าโมเดลที่เก่งพอขับมันได้ หรือว่ามันรันได้หลายวัน",
    source: { label: "scripts/autonomy_drill.py", href: `${REPO}scripts/autonomy_drill.py` },
  },
  {
    id: "real-models",
    titleEn: "Real small local models driving the tools",
    titleTh: "โมเดลท้องถิ่นขนาดเล็กจริงที่ใช้เครื่องมือ",
    numberEn: "Simple goals completed: qwen3:8b 4 of 5, qwen2.5:7b 3 of 5, llama3.2:3b 0 of 5 (CPU only, 70–190 s per goal)",
    numberTh: "เป้าหมายง่ายที่ทำสำเร็จ: qwen3:8b 4 จาก 5, qwen2.5:7b 3 จาก 5, llama3.2:3b 0 จาก 5 (ใช้ CPU อย่างเดียว 70–190 วินาทีต่อเป้าหมาย)",
    howEn: "Five simple tool tasks on the current runtime, one run each.",
    howTh: "งานเครื่องมือแบบง่ายห้างาน บนรันไทม์ปัจจุบัน รันละครั้ง",
    limitEn: "A tiny sample of weak models. No capable hosted model has been tested yet, so we make no claim about how well the agent works with one.",
    limitTh: "ตัวอย่างเล็กมากของโมเดลที่ไม่เก่ง ยังไม่เคยทดสอบกับโมเดลที่เก่งพอบนคลาวด์ เราจึงไม่อ้างอะไรว่าเอเจนต์ทำงานได้ดีกับโมเดลเหล่านั้น",
    source: { label: "scripts/real_model_tool_probe.py", href: `${REPO}scripts/real_model_tool_probe.py` },
  },
]

const notMeasuredEn = [
  "Accuracy or hallucination rate, against any other system or model.",
  "Cost savings against a baseline in real use.",
  "How the agent performs with a capable hosted model (the planned acceptance test has not been run).",
  "Agreement between models from different vendors (the jury has only run against scripted servers).",
  "Uptime or an SLA: no public host is running.",
  "Any comparison with LangChain, AutoGPT or other agent frameworks on the same tasks. The only side-by-side test is the memory-store one above.",
  "Any independent audit of these results.",
]

const notMeasuredTh = [
  "ความแม่นยำหรืออัตราหลอน เทียบกับระบบหรือโมเดลอื่นใด",
  "การประหยัดต้นทุนเทียบกับค่าอ้างอิงในการใช้งานจริง",
  "ผลของเอเจนต์เมื่อใช้โมเดลบนคลาวด์ที่เก่งพอ (ยังไม่ได้รันการทดสอบรับรองที่วางแผนไว้)",
  "ความสอดคล้องระหว่างโมเดลจากผู้ให้บริการต่างราย (คณะลูกขุนรันกับเซิร์ฟเวอร์สคริปต์เท่านั้น)",
  "เวลาทำงานต่อเนื่องหรือ SLA: ยังไม่มีโฮสต์สาธารณะที่ทำงานอยู่",
  "การเปรียบเทียบกับ LangChain, AutoGPT หรือเฟรมเวิร์กเอเจนต์อื่นบนงานเดียวกัน การทดสอบเทียบกันเพียงอย่างเดียวคือเรื่องที่เก็บหน่วยความจำข้างบน",
  "การตรวจสอบอิสระต่อผลเหล่านี้",
]

/* ─── PAGE ─── */
export default function BenchmarkPage() {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const isEn = language === "en"

  const card = isDark ? "bg-[#1E1E1E] border-[#2A2A2A]" : "bg-white border-warm-light-gray"
  const muted = isDark ? "text-[#999]" : "text-warm-gray"
  const strong = isDark ? "text-warm-light-gray" : "text-warm-charcoal"

  return (
    <>
      <Navbar />
      <main id="main-content" className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#111]" : "bg-warm-cream"}`}>
        <section className={`py-20 px-4 text-center ${isDark ? "bg-[#0D0D0D]" : "bg-warm-cream"}`}>
          <div className="max-w-3xl mx-auto space-y-5">
            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-4xl sm:text-5xl font-bold tracking-tight ${strong}`}
            >
              {isEn ? "What we have " : "สิ่งที่เรา"}
              <span className="font-display text-warm-sage">{isEn ? "measured" : "วัดจริงแล้ว"}</span>
            </m.h1>
            <p className={`text-base sm:text-lg ${muted}`}>
              {isEn
                ? "Every number below comes from a script or a CI run in the public repository, next to the reason it is weaker than it looks. Nothing here is an independent audit."
                : "ทุกตัวเลขด้านล่างมาจากสคริปต์หรือการรัน CI ในรีโปสาธารณะ พร้อมเหตุผลว่าทำไมจึงอ่อนกว่าที่เห็น ไม่มีข้อใดเป็นการตรวจสอบอิสระ"}
            </p>
            <p className={`text-sm ${muted}`}>
              {isEn
                ? "This page replaces earlier charts (accuracy 99.7%, hallucination 0.3%, cost saving 73%, and a table against LangChain and AutoGPT) that were never backed by a measurement. Those figures are withdrawn; see "
                : "หน้านี้แทนที่แผนภูมิเดิม (ความแม่นยำ 99.7%, อัตราหลอน 0.3%, ประหยัดต้นทุน 73% และตารางเทียบกับ LangChain และ AutoGPT) ซึ่งไม่เคยมีการวัดรองรับ ตัวเลขเหล่านั้นถูกถอนแล้ว ดู "}
              <Link href="/corrections" className="underline text-warm-sage">{isEn ? "Corrections" : "การแก้ไขข้อมูล"}</Link>.
            </p>
          </div>
        </section>

        <section className="py-10 px-4" aria-label={isEn ? "Measured results" : "ผลที่วัดได้"}>
          <div className="max-w-4xl mx-auto space-y-5">
            {results.map((r) => (
              <article key={r.id} id={r.id} className={`rounded-2xl border p-6 ${card}`}>
                <h2 className={`text-lg font-semibold mb-2 ${strong}`}>{isEn ? r.titleEn : r.titleTh}</h2>
                <p className="text-base font-medium text-warm-sage mb-3">{isEn ? r.numberEn : r.numberTh}</p>
                <dl className={`text-sm space-y-2 ${muted}`}>
                  <div>
                    <dt className={`inline font-semibold ${strong}`}>{isEn ? "How measured: " : "วัดอย่างไร: "}</dt>
                    <dd className="inline">{isEn ? r.howEn : r.howTh}</dd>
                  </div>
                  <div>
                    <dt className={`inline font-semibold ${strong}`}>{isEn ? "Why it is weaker than it looks: " : "ทำไมจึงอ่อนกว่าที่เห็น: "}</dt>
                    <dd className="inline">{isEn ? r.limitEn : r.limitTh}</dd>
                  </div>
                  <div>
                    <dt className={`inline font-semibold ${strong}`}>{isEn ? "Evidence: " : "หลักฐาน: "}</dt>
                    <dd className="inline">
                      <a href={r.source.href} target="_blank" rel="noopener noreferrer" className="underline text-warm-sage break-all">{r.source.label}</a>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10 px-4" aria-label={isEn ? "Not measured" : "ยังไม่ได้วัด"}>
          <div className={`max-w-4xl mx-auto rounded-2xl border p-6 ${card}`}>
            <h2 className={`text-xl font-semibold mb-3 ${strong}`}>{isEn ? "Not measured yet" : "ยังไม่ได้วัด"}</h2>
            <ul className={`list-disc pl-5 space-y-2 text-sm ${muted}`}>
              {(isEn ? notMeasuredEn : notMeasuredTh).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-10 px-4 pb-20" aria-label={isEn ? "Reproduce" : "ทำซ้ำเอง"}>
          <div className={`max-w-4xl mx-auto rounded-2xl border p-6 ${card}`}>
            <h2 className={`text-xl font-semibold mb-3 ${strong}`}>{isEn ? "Check it yourself" : "ตรวจสอบด้วยตัวเอง"}</h2>
            <p className={`text-sm mb-3 ${muted}`}>
              {isEn
                ? "Install the runtime and run a first session that needs no model. The report says which parts are real and which part (the model) is scripted."
                : "ติดตั้งรันไทม์แล้วรันเซสชันแรกที่ไม่ต้องมีโมเดล รายงานจะบอกว่าส่วนไหนจริง และส่วนไหน (โมเดล) เป็นสคริปต์"}
            </p>
            <pre className={`rounded-lg p-4 text-sm overflow-x-auto ${isDark ? "bg-[#111] text-[#CCC]" : "bg-warm-cream text-warm-charcoal"}`}>
{`pip install delentia-os
delentia demo init
delentia demo run compare --scripted`}
            </pre>
            <a
              href="https://github.com/delentia-labs/Delentia-OS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-warm-sage underline"
            >
              {isEn ? "Source and measurement scripts" : "ซอร์สโค้ดและสคริปต์การวัด"} <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
