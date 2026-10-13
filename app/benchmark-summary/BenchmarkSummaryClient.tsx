"use client"

import { usePathname } from "next/navigation"
import { AlertTriangle, BarChart3, CheckCircle2, FileText, Gauge, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_EVIDENCE_LAST_UPDATED, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

export default function BenchmarkSummaryClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const metrics = [
    {
      title: language === "th" ? "ไม่ได้อ้างอัตรา hallucination" : "No hallucination rate is claimed",
      description: language === "th" ? "วัดบน controlled enterprise workloads พร้อม cross-check กับ SignedAI disagreement logs และ manual validation sample." : "Measured on controlled enterprise workloads and cross-checked against SignedAI disagreement logs plus a manual validation sample.",
      href: `${localePrefix}/solutions/ai-hallucination-prevention`,
      icon: ShieldCheck,
      badge: "not claimed",
      meta: language === "th" ? "Trust metric" : "Trust metric",
      tags: ["Verification", "Consensus", "Validation"],
    },
    {
      title: language === "th" ? "FDIA: 11 จาก 12 เคสในชุดทดสอบเล็ก" : "FDIA: 11 of 12 on a tiny hand-written set",
      description: language === "th" ? "ใช้เป็น public-safe summary ของวิธีที่สมการ FDIA สัมพันธ์กับ human-evaluated ground truth ใน benchmark factual QA." : "A public-safe summary of how the FDIA equation tracks human-evaluated ground truth in the factual QA benchmark.",
      href: `${localePrefix}/methodology`,
      icon: BarChart3,
      badge: "11/12",
      meta: language === "th" ? "Method-linked metric" : "Method-linked metric",
      tags: ["FDIA", "Ground truth", "Methodology"],
    },
    {
      title: language === "th" ? "Warm recall ต่ำกว่า 50ms" : "Warm recall under 50ms",
      description: language === "th" ? "สรุป latency ฝั่ง hot-zone semantic cache โดยแยกชัดเจนจาก cold-start path ที่ใช้เวลา 3-5 วินาที." : "Summarizes hot-zone semantic cache latency while clearly separating it from the 3-5 second cold-start path.",
      href: `${localePrefix}/solutions/enterprise-ai-memory`,
      icon: Gauge,
      badge: "<50ms",
      meta: language === "th" ? "Cache behavior" : "Cache behavior",
      tags: ["Latency", "Cache", "Recall"],
    },
    {
      title: language === "th" ? "ข้อจำกัดและ caveat ถูกเปิดเผยชัด" : "Caveats are disclosed explicitly",
      description: language === "th" ? "ทุกตัวเลขในหน้านี้ถูกจัดให้อ่านคู่กับ method, caveat และ evidence lane เพื่อไม่ให้ benchmark กลายเป็น marketing claim." : "Every number on this page is paired with its method, caveat, and evidence lane so the benchmark summary does not collapse into a marketing claim.",
      href: `${localePrefix}/methodology`,
      icon: AlertTriangle,
      badge: language === "th" ? "Disclosure" : "Disclosure",
      meta: language === "th" ? "Public-safe framing" : "Public-safe framing",
      tags: ["Caveat", "Disclosure", "Public-safe"],
    },
  ]

  const routes = [
    {
      title: language === "th" ? "อ่าน methodology ต่อ" : "Continue into methodology",
      description: language === "th" ? "ใช้เมื่อทีมต้องการกรอบเต็มของการวัด การเปิดเผยข้อมูล และขอบเขตของ claim ที่เผยแพร่สาธารณะ." : "Use this when the team needs the fuller model for measurement, disclosure, and the public claim boundary.",
      href: `${localePrefix}/methodology`,
      icon: FileText,
      tags: ["Methodology", "Claims", "Review"],
    },
    {
      title: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation",
      description: language === "th" ? "ใช้เมื่อ benchmark ต้องถูกแปลไปเป็น decision path สำหรับ buyer หรือ architecture review." : "Use this when the benchmark context needs to be translated into a buyer or architecture decision path.",
      href: `${localePrefix}/evaluation`,
      icon: CheckCircle2,
      tags: ["Decision", "Buyer path", "Evaluation"],
    },
  ]

  const environment = [
    [language === "th" ? "Version" : "Version", "2.3.0 (public package)"],
    [language === "th" ? "Test date" : "Test date", "March 21, 2026"],
    [language === "th" ? "OS" : "OS", "Linux x86_64"],
    [language === "th" ? "Node.js" : "Node.js", "22.x LTS"],
    [language === "th" ? "Test runner" : "Test runner", "pytest + Hypothesis"],
    [language === "th" ? "CI/CD" : "CI/CD", "GitHub Actions"],
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Validate / Benchmark Summary" : "Validate / Benchmark Summary"}
      title={language === "th" ? "สรุป benchmark แบบ public-safe ที่อ่านคู่กับ method และ caveat" : "A public-safe benchmark summary that keeps methods and caveats visible"}
      description={language === "th" ? `หน้า Benchmark Summary ถูกจัดใหม่ให้เป็น validation layer ของ resource system โดยแยก ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} ออกจาก ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()} และอธิบายวิธีวัดพร้อมข้อจำกัดของแต่ละ metric อย่างชัดเจน.` : `The benchmark summary now behaves as the validation layer of the resource system, separating ${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} from ${SITE_ENTERPRISE_EVIDENCE_LABEL.toLowerCase()} and explaining how each metric was measured with explicit caveats.`}
      taxonomy={language === "th" ? ["Benchmark framing", "Public-safe metrics", "Measurement notes", "Caveat disclosure"] : ["Benchmark framing", "Public-safe metrics", "Measurement notes", "Caveat disclosure"]}
      accent="sage"
      actions={[
        { href: `${localePrefix}/methodology`, label: language === "th" ? "เปิด methodology" : "Open methodology", variant: "primary" },
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research archive" : "Go to research archive", variant: "secondary" },
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Hallucination" : "Hallucination", value: "not claimed", detail: language === "th" ? "controlled enterprise workload" : "controlled enterprise workload" },
        { label: language === "th" ? "FDIA accuracy" : "FDIA accuracy", value: "11 of 12", detail: language === "th" ? "ชุดทดสอบเล็กที่เขียนด้วยมือ (smoke test)" : "tiny hand-written set (a smoke test)" },
        { label: language === "th" ? "Warm recall" : "Warm recall", value: "<50ms", detail: language === "th" ? "hot-zone cache hits" : "hot-zone cache hits" },
        { label: language === "th" ? "Public SDK" : "Public SDK", value: `${SITE_PUBLIC_SDK_TESTS}`, detail: language === "th" ? `verified • updated ${SITE_EVIDENCE_LAST_UPDATED}` : `verified • updated ${SITE_EVIDENCE_LAST_UPDATED}` },
      ]}
      footerTitle={language === "th" ? "benchmark summary ควรใช้คู่กับ methodology และ evaluation เสมอ" : "The benchmark summary should always be read with methodology and evaluation"}
      footerDescription={language === "th" ? "ตัวเลขในหน้านี้มีไว้เพื่อ framing และ validation ไม่ใช่เพื่อแทนการตัดสินใจทั้งหมด ให้ใช้ร่วมกับ methodology, whitepaper และ evaluation hub ก่อนสรุปผลเชิงธุรกิจหรือ procurement." : "The numbers on this page are for framing and validation, not as a substitute for the full decision process. Pair them with methodology, whitepapers, and the evaluation hub before making business or procurement conclusions."}
      footerActions={[
        { href: `${localePrefix}/whitepaper`, label: language === "th" ? "ไปหน้า whitepaper" : "Go to whitepaper", variant: "primary" },
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "เปิด evaluation hub" : "Open evaluation hub", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Metrics" : "Metrics"}
        title={language === "th" ? "ตัวเลขหลักที่สื่อสารได้โดยไม่ตัด method ออก" : "The primary metrics without hiding the method behind them"}
        description={language === "th" ? "ใช้หน้า summary นี้เพื่อดู metric สำคัญพร้อม route ไปยัง layer ที่อธิบายวิธีวัดหรือโครงสร้างที่เกี่ยวข้อง." : "Use this summary to view the key metrics together with routes into the layers that explain the method or supporting architecture."}
      >
        <ResourceCardGrid cards={metrics} columns="two" />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Environment" : "Environment"}
        title={language === "th" ? "สภาพแวดล้อมการทดสอบที่เปิดเผยสาธารณะได้" : "The test environment that can be disclosed publicly"}
        description={language === "th" ? "ให้บริบทขั้นต่ำที่จำเป็นต่อการตีความตัวเลข โดยไม่อ้างว่าเป็น dossier เต็มรูปแบบของทุก workload." : "This provides the minimum context needed to interpret the numbers without pretending to be a full dossier for every workload."}
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {environment.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
              <div className="mt-2 text-base font-semibold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Next routes" : "Next routes"}
        title={language === "th" ? "หน้าถัดไปที่ควรใช้ประกอบการตีความ benchmark" : "The next pages to use when interpreting the benchmark"}
        description={language === "th" ? "การอ่าน benchmark ให้ครบต้องต่อกับ methodology และ evaluation ไม่เช่นนั้นตัวเลขจะขาดบริบทเชิงตัดสินใจ." : "Benchmark reading is incomplete without methodology and evaluation, otherwise the numbers lose their decision context."}
      >
        <ResourceCardGrid cards={routes} columns="two" />
      </ResourceSection>
    </ResourcePageShell>
  )
}