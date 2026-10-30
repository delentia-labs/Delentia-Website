"use client"

import { usePathname } from "next/navigation"
import { ArrowRight, BookOpen, FileSearch, ShieldCheck, Workflow } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

const researchLinks = [
  {
    hrefEn: "/en/blog/rct-ecosystem-4849-tests-methodology",
    hrefTh: "/th/blog/rct-ecosystem-4849-tests-methodology",
    labelEn: "8,585 Tests, 0 Failures: How RCT Verifies Everything",
    labelTh: "8,585 Tests, 0 Failures: วิธีที่ RCT ตรวจสอบทุกอย่าง",
    pillarEn: "Testing baseline pillar",
    pillarTh: "Testing baseline",
  },
  {
    hrefEn: "/en/blog/evaluation-harnesses-enterprise-llm",
    hrefTh: "/en/blog/evaluation-harnesses-enterprise-llm",
    labelEn: "Evaluation Harnesses for Enterprise LLMs",
    labelTh: "Evaluation Harnesses สำหรับ Enterprise LLM",
    pillarEn: "Review loop pillar",
    pillarTh: "Review loop",
  },
  {
    hrefEn: "/en/blog/fdia-equation-explained",
    hrefTh: "/th/blog/fdia-equation-explained",
    labelEn: "FDIA Equation Explained: The Mathematical Governance Foundation",
    labelTh: "สมการ FDIA: รากฐานการกำกับดูแลทางคณิตศาสตร์",
    pillarEn: "External frameworks pillar",
    pillarTh: "External frameworks",
  },
  {
    hrefEn: "/en/blog/constitutional-ai-vs-rag-comparison",
    hrefTh: "/en/blog/constitutional-ai-vs-rag-comparison",
    labelEn: "Constitutional AI vs RAG: A Disclosure Boundary Comparison",
    labelTh: "Constitutional AI vs RAG: เปรียบเทียบขอบเขตการเปิดเผยข้อมูล",
    pillarEn: "Disclosure boundary pillar",
    pillarTh: "Disclosure boundaries",
  },
] as const

export default function MethodologyClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const pillars = [
    {
      title: language === "th" ? "กรอบอ้างอิงภายนอก" : "External frameworks",
      description: language === "th" ? "ใช้ NIST AI RMF, OECD principles และกรอบสาธารณะอื่นเป็นภาษากลางของ trust, governance และ evaluation บนหน้า public site." : "Uses NIST AI RMF, OECD principles, and other public frameworks as the shared language for trust, governance, and evaluation on the public site.",
      href: `${localePrefix}/editorial-policy`,
      icon: BookOpen,
      badge: language === "th" ? "Frameworks" : "Frameworks",
      meta: language === "th" ? "Public reference layer" : "Public reference layer",
      tags: ["Governance", "Trust", "Evaluation"],
    },
    {
      title: language === "th" ? "baseline การทดสอบภายใน" : "Internal testing baselines",
      description: language === "th" ? "จัดให้การวาง positioning และตัวเลขสาธารณะไม่ขัดกับ version, test, uptime และ public-safe metrics ที่ถูกยืนยันภายในแล้ว." : "Keeps public positioning and numeric claims aligned with internally verified versions, tests, uptime, and public-safe metrics.",
      href: `${localePrefix}/benchmark-summary`,
      icon: FileSearch,
      badge: language === "th" ? "Testing" : "Testing",
      meta: language === "th" ? "Claim validation" : "Claim validation",
      tags: ["Tests", "Metrics", "Baselines"],
    },
    {
      title: language === "th" ? "ขอบเขตการเปิดเผยข้อมูล" : "Disclosure boundaries",
      description: language === "th" ? "อธิบาย capability และ buyer path ได้ชัด แต่ไม่เปิด implementation detail ที่ไม่เหมาะกับ public web หรือ procurement-stage audience." : "Explains capability and buyer paths clearly without exposing implementation detail that is unsuitable for the public web or procurement-stage audiences.",
      href: `${localePrefix}/whitepaper`,
      icon: ShieldCheck,
      badge: language === "th" ? "Disclosure" : "Disclosure",
      meta: language === "th" ? "Public-safe boundary" : "Public-safe boundary",
      tags: ["Disclosure", "Boundaries", "Public-safe"],
    },
    {
      title: language === "th" ? "วงรอบการตรวจทานและอัปเดต" : "Review and update loops",
      description: language === "th" ? "ใช้ author, reviewer, reviewed-date และ reference hygiene pattern เพื่อให้หน้า trust-sensitive มีมาตรฐานสม่ำเสมอมากขึ้น." : "Uses author, reviewer, reviewed-date, and reference hygiene patterns so trust-sensitive pages remain more consistent over time.",
      href: `${localePrefix}/blog`,
      icon: Workflow,
      badge: language === "th" ? "Review" : "Review",
      meta: language === "th" ? "Editorial operations" : "Editorial operations",
      tags: ["Review", "Editorial", "Quality"],
    },
  ]

  const routes = [
    {
      title: language === "th" ? "ดู benchmark summary" : "View benchmark summary",
      description: language === "th" ? "ใช้เพื่อดูว่าตัวเลขที่เปิดเผยสาธารณะถูกสรุปอย่างไรและมี caveat อะไรบ้าง." : "Use this to review how public metrics are summarized and what caveats accompany them.",
      href: `${localePrefix}/benchmark-summary`,
      icon: FileSearch,
      tags: ["Benchmarks", "Caveats", "Validation"],
    },
    {
      title: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation",
      description: language === "th" ? "ใช้เมื่อ framework และ disclosure logic ต้องถูกแปลไปเป็น buyer decision path." : "Use this when framework and disclosure logic need to be translated into buyer-side decision paths.",
      href: `${localePrefix}/evaluation`,
      icon: BookOpen,
      tags: ["Buyer path", "Decision", "Governance"],
    },
    {
      title: language === "th" ? "อ่าน whitepaper ประกอบ" : "Pair it with whitepaper review",
      description: language === "th" ? "ใช้เพื่อเชื่อม method layer กับ technical dossiers ที่ทีมสถาปัตยกรรมจะอ่านต่อ." : "Use this to connect the method layer to the technical dossiers architecture teams will review next.",
      href: `${localePrefix}/whitepaper`,
      icon: ShieldCheck,
      tags: ["Whitepaper", "Architecture", "Review"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Validate / Methodology" : "Validate / Methodology"}
      title={language === "th" ? "กรอบวิธีคิดสำหรับการอ้างอิง การทดสอบ และการเปิดเผยข้อมูลบน public site" : "The method layer for references, testing, and disclosure on the public site"}
      description={language === "th" ? "Methodology เป็นหน้ากลางที่อธิบายว่าข้ออ้าง การอ้างอิง benchmark และ trust-sensitive content บนเว็บไซต์ถูกกำกับอย่างไร ไม่ใช่ compliance dossier เต็มรูปแบบ." : "Methodology is the central page that explains how claims, benchmark references, and trust-sensitive content are governed on the website. It is not a full compliance dossier."}
      taxonomy={language === "th" ? ["Frameworks", "Testing baselines", "Disclosure boundaries", "Review loops"] : ["Frameworks", "Testing baselines", "Disclosure boundaries", "Review loops"]}
      accent="lavender"
      actions={[
        { href: `${localePrefix}/benchmark-summary`, label: language === "th" ? "เปิด benchmark summary" : "Open benchmark summary", variant: "primary" },
        { href: `${localePrefix}/editorial-policy`, label: language === "th" ? "ดู editorial policy" : "View editorial policy", variant: "secondary" },
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Primary role" : "Primary role", value: language === "th" ? "Validation framework" : "Validation framework", detail: language === "th" ? "for public-site trust logic" : "for public-site trust logic" },
        { label: language === "th" ? "Core pillars" : "Core pillars", value: String(pillars.length), detail: language === "th" ? "frameworks, tests, disclosure, review" : "frameworks, tests, disclosure, review" },
        { label: language === "th" ? "Audience" : "Audience", value: language === "th" ? "Evaluators + Editors" : "Evaluators + Editors", detail: language === "th" ? "buyers, architects, content owners" : "buyers, architects, content owners" },
        { label: language === "th" ? "Adjacent routes" : "Adjacent routes", value: "Bench / Eval / Whitepaper", detail: language === "th" ? "read with evidence and decision layers" : "read with evidence and decision layers" },
      ]}
      footerTitle={language === "th" ? "Methodology มีไว้กำกับการตีความ ไม่ได้แทน evidence หรือ decision path" : "Methodology governs interpretation, but it does not replace evidence or decision paths"}
      footerDescription={language === "th" ? "หลังจากเข้าใจกรอบนี้แล้ว ให้ต่อกับ benchmark summary, whitepaper และ evaluation hub เพื่อประกอบหลักฐานและการตัดสินใจให้ครบวงจร." : "After understanding this framework, continue into the benchmark summary, whitepaper, and evaluation hub so evidence and decision work stay connected."}
      footerActions={[
        { href: `${localePrefix}/benchmark-summary`, label: language === "th" ? "ไปหน้า benchmark summary" : "Go to benchmark summary", variant: "primary" },
        { href: `${localePrefix}/whitepaper`, label: language === "th" ? "ไปหน้า whitepaper" : "Go to whitepaper", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Core pillars" : "Core pillars"}
        title={language === "th" ? "องค์ประกอบหลักที่กำกับการสื่อสารและการอ้างอิง" : "The core pillars that govern communication and reference quality"}
        description={language === "th" ? "แยกเป็น 4 เสาหลักเพื่อให้ผู้อ่านเข้าใจขอบเขตการใช้งานของ methodology ได้ชัด โดยไม่ต้องอ่านเป็น policy dump ยาว ๆ." : "These four pillars make the methodology usable without turning the page into a long policy dump."}
      >
        <ResourceCardGrid cards={pillars} columns="two" />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Next routes" : "Next routes"}
        title={language === "th" ? "หน้าที่ควรเปิดต่อหลังอ่าน methodology" : "The pages worth opening after methodology"}
        description={language === "th" ? "Methodology ทำหน้าที่ดีที่สุดเมื่อใช้ร่วมกับ benchmark, whitepaper และ evaluation ตามเส้นทางงานจริง." : "Methodology works best when paired with benchmark, whitepaper, and evaluation pages along the real work path."}
      >
        <ResourceCardGrid cards={routes} />
      </ResourceSection>

      {/* Related Research — specific blog articles that validate each methodology pillar */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          {language === "th" ? "งานวิจัยที่ตรวจสอบ methodology นี้" : "Research articles that validate this methodology"}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {researchLinks.map((item) => (
            <Link
              key={item.hrefEn}
              href={language === "th" ? item.hrefTh : item.hrefEn}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4 transition-all hover:-translate-y-0.5 hover:border-warm-amber/40 hover:bg-card"
            >
              <ArrowRight size={14} className="mt-0.5 shrink-0 text-warm-amber transition-transform group-hover:translate-x-0.5" />
              <div className="space-y-1">
                <span className="text-sm font-medium leading-snug text-foreground">
                  {language === "th" ? item.labelTh : item.labelEn}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {language === "th" ? item.pillarTh : item.pillarEn}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ResourcePageShell>
  )
}