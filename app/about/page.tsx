import type { Metadata } from "next"
import Link from "next/link"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/schema"
import { AboutFDIAShowcase } from "@/components/about/about-fdia-showcase"
import { AboutPageMotionBackdrop } from "@/components/about/about-page-motion-backdrop"
import { AboutPreviewCard } from "@/components/about/about-preview-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Eye, Heart, Sparkles, Target, Quote } from "lucide-react"
import { getRequestLocale } from "@/lib/request-locale"
import { pixelIcons } from "@/lib/pixel-icons"
import {
  SITE_ALGORITHM_COUNT,
  SITE_ENTERPRISE_EVIDENCE_LABEL,
  SITE_EVIDENCE_LAST_UPDATED,
  SITE_HALLUCINATION_RATE,
  SITE_MICROSERVICE_COUNT,
  SITE_PUBLIC_SDK_COVERAGE,
  SITE_PUBLIC_SDK_EVIDENCE_LABEL,
  SITE_PUBLIC_SDK_TESTS,
  SITE_TEST_COUNT,
  SITE_UPTIME,
  SITE_VERSION,
} from "@/lib/site-config"

// Force fresh server render on every navigation so x-locale header is always read.
// Without this, Next.js partial rendering may reuse a cached RSC payload when
// switching between /en/about and /th/about (both rewrite to app/about/page.tsx).
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "About Delentia Labs — Constitutional AI Platform | Thai-Built Enterprise AI Operating System",
    "เกี่ยวกับ Delentia Labs — Constitutional AI Platform ระดับองค์กร สร้างโดยคนไทย",
    // Lengthened meta descriptions for SEO (150-160 chars)
    "Delentia Labs: Constitutional AI platform with a public SDK verification lane and a separate enterprise runtime snapshot — 41 algorithms, public SDK v1.0.4b0, and benchmark disclosures with explicit scope.",
    "Delentia Labs: แพลตฟอร์ม Constitutional AI ที่แยก public SDK verification ออกจาก enterprise runtime snapshot อย่างชัดเจน — 41 algorithms, public SDK v1.0.4b0 และ benchmark disclosures ที่มีการระบุ scope.",
    "/about",
    ["Constitutional AI", "enterprise AI platform", "AI governance", "Thailand AI", "Delentia Labs", "Ittirit Saengow", "multi-LLM consensus"]
  )
}

export default async function AboutPage() {
  // --- Person/Organization Schema for SEO ---
  // This schema is injected as a <script type="application/ld+json"> block for rich results
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ittirit Saengow",
    "alternateName": "อิทธิฤทธิ์ แซ่โง้ว",
    "jobTitle": "Architect of Intent",
    "description": "Solo architect from Khlong Toei, Bangkok. Creator of Delentia Labs, FDIA equation, and the 7 Genome System.",
    "url": "https://delentia.com/about",
    "sameAs": [
      "https://github.com/ittirit720",
      "https://github.com/delentia-labs",
      "https://www.linkedin.com/in/ittirit-saengow/"
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "Delentia Labs",
      "url": "https://delentia.com"
    }
  }
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://delentia.com/${locale}` },
    { name: isTh ? "เกี่ยวกับ" : "About", url: `https://delentia.com/${locale}/about` },
  ])
  const orgSchema = getOrganizationSchema(locale)
  const runtimeFootprint = String(SITE_MICROSERVICE_COUNT)

  const journeyPhases = [
    {
      icon: "🔥",
      phase: isTh ? "โรงหลอม" : "The Forge",
      title: isTh ? "คลองเตย — จุดเริ่มต้นของทุกอย่าง" : "Khlong Toei — Where It All Began",
      desc: isTh
        ? "เติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ บันไดหนีไฟกลายเป็นห้องเรียนแรก สังเกตรูปแบบในความโกลาหล ค้นหาระเบียบในที่ที่ดูเหมือนไม่มี นี่คือจุดที่สัญชาตญาณ 'มองทะลุระบบ' ถูกหล่อหลอม"
        : "Growing up in a Khlong Toei flat community in Bangkok — the fire escape stairwell became the first classroom: observing patterns in chaos, finding order where none seemed to exist. This is where the instinct to 'see through systems' was forged.",
      period: isTh ? "รากฐาน" : "Foundation",
      impact: isTh ? "พัฒนา Systems Thinking และ Pattern Recognition" : "Developed systems thinking and pattern recognition",
    },
    {
      icon: "⚖️",
      phase: isTh ? "ทวิภาค" : "The Duality",
      title: isTh ? "สถาปัตยกรรมแห่งความคิด" : "Architecture of Thought",
      desc: isTh
        ? "เรียนสาขาการจัดการทรัพยากรอาคาร คณะสถาปัตยกรรมศาสตร์ แต่เลือกศึกษาและเรียนรู้ด้วยตนเองต่อด้าน computer - website design - SEO ทำให้เกิดการเรียนรู้และศึกษาข้ามสายความรู้ จนทำให้เกิด Systems Thinking และศิลปะของการจัดการโครงสร้างที่ซับซ้อน"
        : "Studied Facility Management at the Faculty of Architecture, while independently continuing into computers, website design, and SEO. That cross-disciplinary self-education created systems thinking and a working instinct for managing complex structures.",
      period: isTh ? "การศึกษา" : "Education",
      impact: isTh ? "เชี่ยวชาญ Systems Design และ Stakeholder Management" : "Mastered systems design and stakeholder management",
    },
    {
      icon: "🕊️",
      phase: isTh ? "จุดเปลี่ยน" : "The Turning Point",
      title: isTh ? "การเปลี่ยนแปลงและคำปฏิญาณ" : "Personal Transformation & Commitment",
      desc: isTh
        ? "ช่วงเวลาแห่งการสะท้อนตัวเองและการเติบโตทางจิตใจ นำไปสู่คำมั่นสัญญาอันลึกซึ้ง: สร้างระบบที่ช่วยให้ตัวเองหลุดจากวงจรที่ติดค้างอยู่ การเปลี่ยนแปลงส่วนตัวนี้ทำให้สมการ FDIA ตกผลึกจากความจริงของชีวิต ไม่ใช่ทฤษฎีทางวิชาการ"
        : "A period of deep reflection and personal transformation led to a profound commitment: building systems that could help me escape the cycles I was trapped in. This crystallized the FDIA equation from lived experience, not academic theory.",
      period: isTh ? "สิงหาคม 2025" : "August 2025",
      impact: isTh ? "สมการ FDIA เกิดจากความจริงส่วนตัว" : "FDIA equation born from personal truth",
    },
    {
      icon: "📱",
      phase: isTh ? "การพบครั้งแรก" : "First Contact",
      title: isTh ? "มือถือ + LLMs = ระบบใหม่" : "Mobile Phone + LLMs = New System",
      desc: isTh
        ? "การปฏิสัมพันธ์ครั้งแรกที่มีความหมายกับระบบ AI สิ่งที่คนอื่นมองว่าเป็นเครื่องมือ The Architect มองว่าเป็นผืนผ้าใบ เมล็ดพันธุ์ของ Reverse Component Thinking ถูกปลูก"
        : "The first meaningful interaction with AI systems. What others saw as a tool, the Architect saw as a canvas. Within hours, the seed of Reverse Component Thinking was planted — starting from the desired future and working backward.",
      period: "2025-06-25",
      impact: isTh ? "Reverse Component Thinking ถือกำเนิด" : "Reverse Component Thinking born",
    },
    {
      icon: "🏗️",
      phase: isTh ? "กำเนิด" : "Genesis",
      title: isTh ? "30 วันสู่ The 9 Codex" : "30-Day Documentation Sprint",
      desc: isTh
        ? "ด้วยมือถือ Android และกลุ่มดาว LLMs (GPT, Gemini, Perplexity) สร้าง Delentia OS MVP ทั้งหมดในช่วงเวลา Documentation Sprint ต่อมาพัฒนาต่อบน ROG Ally X + WSL Ubuntu + IDE อย่างเป็นระบบ ไม่มีทีม ไม่มีทุน มีแค่ Intent, Structure และ Persistence"
        : "Armed with mobile devices and LLMs (GPT, Gemini, Perplexity), built the entire Delentia OS framework in an intensive documentation sprint. Further developed on ROG Ally X + WSL Ubuntu + IDE. No team. No external funding. Just intent, structure, and persistence.",
      period: isTh ? "~30 วัน (Documentation)" : "~30 days (Documentation Phase)",
      impact: isTh ? "สร้าง 9 Codices Framework" : "9 Codices framework established",
    },
  ]

  const stats = [
    { value: String(SITE_ALGORITHM_COUNT), label: isTh ? "Algorithms" : "Algorithms", detail: isTh ? "reasoning primitives" : "reasoning primitives" },
    { value: "10", label: isTh ? "Layers" : "Layers", detail: isTh ? "operating architecture" : "operating architecture" },
    { value: "7", label: isTh ? "Genomes" : "Genomes", detail: isTh ? "system DNA" : "system DNA" },
    { value: SITE_PUBLIC_SDK_TESTS.toLocaleString(), label: isTh ? "Public SDK Tests" : "Public SDK Tests", detail: isTh ? `${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} • ${SITE_PUBLIC_SDK_COVERAGE}` : `${SITE_PUBLIC_SDK_EVIDENCE_LABEL.toLowerCase()} • ${SITE_PUBLIC_SDK_COVERAGE}` },
    { value: runtimeFootprint, label: isTh ? "Enterprise Runtime" : "Enterprise Runtime", detail: isTh ? "private snapshot" : "private snapshot" },
    { value: SITE_HALLUCINATION_RATE, label: isTh ? "Benchmark Hallucination" : "Benchmark Hallucination", detail: isTh ? "controlled workload scope" : "controlled workload scope" },
    { value: SITE_UPTIME, label: isTh ? "Design SLA Target" : "Design SLA Target", detail: isTh ? "availability design goal" : "availability design goal" },
  ]

  const proofPillars = [
    {
      title: isTh ? "Governed by design" : "Governed by design",
      description: isTh
        ? "วางระบบให้การกำกับดูแล การตรวจสอบย้อนกลับ และ intent governance อยู่ใน architecture ตั้งแต่ต้น ไม่ใช่เติมทีหลัง"
        : "Governance, traceability, and intent control are placed into the architecture from the beginning, not bolted on after launch.",
    },
    {
      title: isTh ? "Built under constraint" : "Built under constraint",
      description: isTh
        ? "ข้อจำกัดไม่ได้ทำให้ระบบเล็กลง แต่ทำให้ทุกการตัดสินใจมีน้ำหนักมากขึ้นและวัดผลได้มากขึ้น"
        : "Constraint did not shrink the system. It forced decisions to become sharper, leaner, and more measurable.",
    },
    {
      title: isTh ? "Proof before hype" : "Proof before hype",
      description: isTh
        ? "ตัวเลข test, benchmark และ runtime footprint ทำหน้าที่เป็นหลักฐาน ไม่ใช่เพียงคำโฆษณา"
        : "Public SDK tests, enterprise runtime snapshots, and benchmark numbers are shown as separate evidence lanes rather than one blended marketing claim.",
    },
  ]

  const platformHighlights = [
    {
      title: isTh ? "Linux for AI Agents" : "Linux for AI Agents",
      description: isTh
        ? "Delentia OS ถูกวางตำแหน่งเป็น Constitutional AI Operating System ที่เชื่อม architecture, orchestration, verification, memory และ governance เข้าเป็นระบบเดียว"
        : "Delentia OS is positioned as a Constitutional AI Operating System that unifies architecture, orchestration, verification, memory, and governance into one operational layer.",
      label: isTh ? "Operating pillar" : "Operating pillar",
      footer: isTh ? "ดูภาพระบบเชิงสถาปัตยกรรม" : "View the architecture lens",
      iconSrc: pixelIcons.architecture,
      color: "#89B4C8",
      bg: "#DBEAFE",
    },
    {
      title: isTh ? "Intent Loop + Memory" : "Intent Loop + Memory",
      description: isTh
        ? "ระบบ warm recall ต่ำกว่า 50ms และลดต้นทุน 60-75% จากการวนกลับมาใช้ memory เดิมก่อนคำนวณใหม่"
        : "Warm recall under 50ms and 60-75% cost reduction by routing through memory before recomputation.",
      label: isTh ? "Operating pillar" : "Operating pillar",
      footer: isTh ? "อ่านแนวคิดด้าน memory-first routing" : "Review memory-first routing",
      iconSrc: pixelIcons.database,
      color: "#7B9E87",
      bg: "#D1FAE5",
    },
    {
      title: isTh ? "Delta Engine Compression" : "Delta Engine Compression",
      description: isTh
        ? "เก็บเฉพาะ state ที่เปลี่ยนแปลง ลดภาระหน่วยความจำเฉลี่ย 74% พร้อม reconstruction ระดับต่ำกว่า 1ms"
        : "Stores only changed state, reducing memory overhead by 74% on average with sub-millisecond reconstruction.",
      label: isTh ? "Operating pillar" : "Operating pillar",
      footer: isTh ? "ดู logic การบีบอัดเชิง runtime" : "Inspect runtime compression logic",
      iconSrc: pixelIcons.formula,
      color: "#D4A853",
      bg: "#FEF3C7",
    },
  ]

  const founderSignals = [
    {
      title: isTh ? "ความกดดันกลายเป็น Systems Thinking" : "Pressure Turned into Systems Thinking",
      description: isTh
        ? "การเติบโตในคลองเตยไม่ได้ให้แค่เรื่องราว แต่มันฝึกการมอง pattern ในสภาพแวดล้อมที่ซับซ้อนและบังคับให้ทุกการตัดสินใจคุ้มค่า นี่คือฐานของ governance thinking ใน Delentia OS"
        : "Growing up in Khlong Toei did not just create a story. It trained pattern recognition under pressure and forced every decision to justify its cost. That discipline shows up directly in Delentia OS governance design.",
      label: isTh ? "Systems origin" : "Systems origin",
      footer: isTh ? "ต้นทางของ systems discipline" : "Origin of systems discipline",
      iconSrc: pixelIcons.target,
      color: "#D4A853",
      bg: "#FEF3C7",
    },
    {
      title: isTh ? "Facility Management กลายเป็น AI Governance" : "Facility Management Became AI Governance",
      description: isTh
        ? "พื้นฐานด้านการจัดการทรัพยากรอาคารหล่อหลอมวิธีคิดเรื่อง lifecycle, dependency, stakeholder และ operational control ซึ่งถูกแปลงต่อมาเป็น architecture ของ AI runtime"
        : "A Facility Management background shaped how lifecycle, dependency, stakeholder alignment, and operational control are handled. Those same instincts were later translated into AI runtime architecture.",
      label: isTh ? "Operational discipline" : "Operational discipline",
      footer: isTh ? "วิธีคิดเชิงปฏิบัติการที่แปลงเป็น runtime" : "Operational instincts translated into runtime",
      iconSrc: pixelIcons.layers,
      color: "#89B4C8",
      bg: "#DBEAFE",
    },
    {
      title: isTh ? "ข้อจำกัดกลายเป็นหลักฐานการส่งมอบ" : "Constraint Became Delivery Evidence",
      description: isTh
        ? "การเริ่มจากมือถือและเครื่องมือจำกัด แต่ขยายสู่ public engineering snapshot ที่วัดได้ ช่วยสร้าง credibility แบบที่ marketing copy เลียนแบบไม่ได้ เพราะมันมาจากข้อจำกัดจริง"
        : "Starting from a phone and limited tooling, then expanding into a measurable public engineering snapshot, creates a kind of credibility marketing copy cannot fake because it comes from real constraint.",
      label: isTh ? "Credibility signal" : "Credibility signal",
      footer: isTh ? "หลักฐานที่ชนะคำโฆษณา" : "Evidence that outlasts marketing",
      iconSrc: pixelIcons.chart,
      color: "#C4745B",
      bg: "#FEE2E2",
    },
  ]

  const genomes = [
    { id: 1, name: "Architect's Genome", role: "THE WHY", desc: isTh ? "อัตลักษณ์ ค่านิยม และเรื่องราวต้นกำเนิดของผู้สร้าง รากฐานทางปรัชญา" : "Identity, values, and origin story of the creator. The philosophical foundation.", color: "bg-warm-amber/20 text-warm-amber border-warm-amber/30" },
    { id: 2, name: "RCT Codex Genome", role: "THE CONSTITUTION", desc: isTh ? "10 Codices พื้นฐาน — กรอบรัฐธรรมนูญของระบบ" : "10 foundational codices — the constitutional framework of the system.", color: "bg-warm-sage/20 text-warm-sage border-warm-sage/30" },
    { id: 3, name: "JITNA Genome", role: "THE LANGUAGE", desc: isTh ? "Just-In-Time Nodal Assembly — ภาษาสากลของ Intent" : "Just-In-Time Nodal Assembly — the universal language of intent.", color: "bg-warm-sky/20 text-warm-sky border-warm-sky/30" },
    { id: 4, name: "ARTENT Genome", role: "THE PROTOCOL", desc: isTh ? "โปรโตคอลสถาปัตยกรรมการดำเนินงาน 7 เฟส ขับเคลื่อนด้วย Intent" : "7-phase operational architecture protocol. Intent-driven, not process-driven.", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { id: 5, name: "SignedAI Genome", role: "THE VERIFICATION", desc: isTh ? "Multi-LLM Consensus Engine พร้อม 8D Quality Scoring" : "Multi-LLM consensus engine with 8D quality scoring.", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { id: 6, name: "Vault Genome", role: "THE MEMORY", desc: isTh ? "ชั้นหน่วยความจำถาวรพร้อม schema เชิงบริบทหลายมิติ" : "Persistent memory layer with multi-dimensional contextual schema.", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    { id: 7, name: "RCT-7 Genome", role: "THE IMPROVEMENT", desc: isTh ? "วงจรปรับปรุงต่อเนื่องที่เชื่อมทุก Genome กลับสู่จุดเริ่มต้น" : "Continuous improvement cycle connecting all genomes back to the beginning.", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  ]

  const genomeBands = [
    {
      title: isTh ? "Intent Foundation" : "Intent Foundation",
      summary: isTh
        ? "ชั้นแรกอธิบายว่าระบบนี้เริ่มจากอะไร คิดอย่างไร และใช้ภาษาอะไรในการแปลง intent ให้กลายเป็นโครงสร้างที่ทำงานได้จริง"
        : "The first band explains where the system starts, how it thinks, and what language it uses to turn intent into an operational structure.",
      label: isTh ? "Why / Constitution / Language" : "Why / Constitution / Language",
      items: [genomes[0], genomes[1], genomes[2]],
    },
    {
      title: isTh ? "Governance Core" : "Governance Core",
      summary: isTh
        ? "ชั้นกลางคือกลไกที่ทำให้ Delentia OS ใช้งานในบริบทธุรกิจได้จริง ผ่านกติกา การตรวจสอบ และความทรงจำที่คงอยู่ระหว่างการทำงาน"
        : "The middle band is what makes Delentia OS usable in enterprise settings through rules, verification, and memory that persists across operations.",
      label: isTh ? "Protocol / Verification / Memory" : "Protocol / Verification / Memory",
      items: [genomes[3], genomes[4], genomes[5]],
    },
    {
      title: isTh ? "Adaptive Loop" : "Adaptive Loop",
      summary: isTh
        ? "ชั้นสุดท้ายคือวงจรที่พาระบบกลับมาปรับปรุงตัวเอง เชื่อมทุก genome ให้กลายเป็นสิ่งมีชีวิตที่พัฒนาได้ต่อเนื่อง ไม่หยุดอยู่ที่ release เดียว"
        : "The final band closes the loop, reconnecting every genome into a system that can improve continuously instead of freezing at one release state.",
      label: isTh ? "Improvement / Evolution / Compounding" : "Improvement / Evolution / Compounding",
      items: [genomes[6]],
    },
  ]

  const values = [
    { icon: Eye, title: isTh ? "Radical Honesty" : "Radical Honesty", desc: isTh ? "เรายอมรับความไม่แน่นอน ทุก Output มี Confidence Score ไม่ใช่ความแน่นอนเทียม" : "We embrace uncertainty. Every system output includes confidence scores, not false certainty." },
    { icon: Heart, title: isTh ? "Survivor's Empathy" : "Survivor's Empathy", desc: isTh ? "ออกแบบสำหรับผู้ที่มีทรัพยากรจำกัด ถ้ามันทำงานบนมือถือได้ มันทำงานได้ทุกที่" : "Designed for those with limited resources. If it works on a single phone, it works everywhere." },
    { icon: Shield, title: isTh ? "Verifiable Truth" : "Verifiable Truth", desc: isTh ? "ทุก AI Output ต้องตรวจสอบได้ โดยหลักฐาน benchmark ปัจจุบันชี้ไปที่ hallucination ระดับ 0.3% บน controlled workloads และยังอยู่ในช่วงขยายผลเชิงระบบ" : "Every AI output must be verifiable. Current benchmark evidence points to 0.3% hallucination on controlled workloads while the broader system rollout is still maturing." },
    { icon: Sparkles, title: isTh ? "Human-Centric Power" : "Human-Centric Power", desc: isTh ? "AI ไม่ใช่พระเอก พระเอกตัวจริงคือ Intent และมนุษย์ผู้ลงนามการตัดสินใจสุดท้าย" : "AI is not the hero. The real hero is the Intent behind it, and the human who signs the final decision." },
    { icon: Target, title: isTh ? "Long-Term Stewardship" : "Long-Term Stewardship", desc: isTh ? "ทุกบรรทัดโค้ดเป็นส่วนหนึ่งของสิ่งมีชีวิต เราสร้างเพื่อทศวรรษ ไม่ใช่ไตรมาส" : "Every line of code is part of a living organism. We build for decades, not quarters." },
  ]

  const valueCardPlacements = [
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-2 lg:col-start-2",
    "lg:col-span-2 lg:col-start-4",
  ]

  const timelineItems = [
    {
      phase: isTh ? "จุดเปลี่ยน" : "The turning point",
      period: isTh ? "สิงหาคม 2025" : "August 2025",
      title: isTh ? "จากข้อจำกัด สู่ระบบที่มีรัฐธรรมนูญของตัวเอง" : "From constraint into a system with its own constitution",
      capability: isTh ? "เหตุการณ์ในช่วงนี้ทำให้ผู้สร้างระบบตระหนักว่า intent ต่างหากที่ควรเป็นศูนย์กลาง ไม่ใช่ model เป็นจุดเริ่มอันแท้จริงของ FDIA equation และ Constitutional AI OS" : "Events during this period led the architect to understand that intent — not model output — should be the center of any reliable system. This became the true origin of the FDIA equation and Constitutional AI OS.",
      businessImpact: isTh ? "ระบบนี้ไม่ได้เริ่มจาก market opportunity แต่เริ่มจากความเข้าใจเชิงลึกถึงสิ่งที่ AI ควรรับผิดชอบต่อ" : "The system did not begin from a market opportunity. It began from a deep understanding of what AI should be accountable to.",
      tone: "amber",
    },
    {
      phase: isTh ? "Foundation layer" : "Foundation layer",
      period: isTh ? "ปลายปี 2025" : "Late 2025",
      title: isTh ? "จาก framework เชิงแนวคิด สู่ระบบคิดที่มีรัฐธรรมนูญของตัวเอง" : "From conceptual framework to a system with its own constitution",
      capability: isTh ? "FDIA, 7 Genome System, kernel logic และ whitepaper ทำให้ Delentia OS มีหลักคิดที่ตรวจสอบและอธิบายได้" : "FDIA, the 7 Genome System, kernel logic, and the whitepaper gave Delentia OS an explainable constitutional base.",
      businessImpact: isTh ? "ทำให้ระบบนี้ไม่เริ่มจาก prompt tricks แต่เริ่มจาก intent architecture" : "This meant the system did not begin as prompt tricks. It began as intent architecture.",
      tone: "amber",
    },
    {
      phase: isTh ? "Memory and runtime" : "Memory and runtime",
      period: isTh ? "มกราคม 2026" : "January 2026",
      title: isTh ? "เริ่มมีโครงสร้าง runtime ที่ใช้ซ้ำ ขยายต่อ และควบคุมได้" : "Reusable, controllable runtime structure started to appear",
      capability: isTh ? "DelentiaDB, universal memory schema และ OS primitives ทำให้ระบบเก็บ state, ดึงกลับ, และจัดเส้นทางการทำงานได้จริง" : "DelentiaDB, the universal memory schema, and OS primitives made it possible to store state, recall it, and route work operationally.",
      businessImpact: isTh ? "นี่คือจุดที่ Delentia OS เริ่มเปลี่ยนจากเอกสารไปสู่ operating substrate" : "This is where Delentia OS began moving from documentation into an operating substrate.",
      tone: "sage",
    },
    {
      phase: isTh ? "Cross-system integration" : "Cross-system integration",
      period: isTh ? "มกราคม 2026" : "January 2026",
      title: isTh ? "ระบบเริ่มเชื่อมข้ามบริบท ไม่ได้อยู่แบบโดดเดี่ยวอีกต่อไป" : "The system started connecting across contexts instead of living in isolation",
      capability: isTh ? "Cross-chat integration, reports, specialist studio และ frontend foundation ทำให้ Delentia OS สื่อสารกับ layer อื่นได้ดีขึ้น" : "Cross-chat integration, reports, specialist studio, and frontend foundations improved how Delentia OS interacted with adjacent layers.",
      businessImpact: isTh ? "ช่วยให้ Delentia OS เข้าใกล้สภาพของ platform มากกว่า prototype" : "It pushed Delentia OS closer to platform behavior instead of remaining a prototype.",
      tone: "sky",
    },
    {
      phase: isTh ? "Governed ecosystem" : "Governed ecosystem",
      period: isTh ? "มกราคม - กุมภาพันธ์ 2026" : "January - February 2026",
      title: isTh ? "จาก module หลายตัว สู่ ecosystem ที่มี governance, attribution และ open standard" : "From many modules to an ecosystem with governance, attribution, and an open standard",
      capability: isTh ? "การรวม 7 Genome, intent loop, open protocol และ license posture ทำให้ Delentia OS พร้อมถูกอธิบายต่อสื่อ พาร์ทเนอร์ และคนตรวจสอบภายนอก" : "The 7 Genome integration, intent loop, open protocol, and license posture made Delentia OS more legible to media, partners, and outside reviewers.",
      businessImpact: isTh ? "นี่คือช่วงที่ระบบเริ่มมี public narrative และ public trust surface" : "This is the phase where the system began forming a public narrative and public trust surface.",
      tone: "sage",
    },
    {
      phase: isTh ? "Current enterprise snapshot" : "Current enterprise snapshot",
      period: SITE_VERSION,
      title: isTh ? "snapshot ปัจจุบันแสดงให้เห็นระบบที่วัดผลและตรวจสอบได้จริง" : "The current snapshot shows a system that is measurable and reviewable",
      capability: isTh ? "snapshot ปัจจุบันแยกชัดระหว่าง public SDK ที่ตรวจได้สาธารณะ กับ enterprise runtime footprint ที่ยังเป็น private snapshot" : "The current snapshot now separates a publicly verifiable SDK lane from an enterprise runtime footprint that remains a private snapshot.",
      businessImpact: isTh ? "เป้าหมายคือให้คนอ่านรู้ทันทีว่า evidence แบบใดตรวจได้จาก public repo และ evidence แบบใดเป็น enterprise context" : "The goal is for readers to understand immediately which evidence is verifiable from the public repo and which evidence belongs to enterprise context.",
      tone: "terra",
    },
  ]

  const architectSignals = [
    {
      title: isTh ? "สำหรับลูกค้าองค์กร" : "For enterprise buyers",
      description: isTh ? "อ่านหน้า about นี้เพื่อเข้าใจว่า architecture, governance และ proof culture ของ Delentia OS เกิดจากวิธีคิดแบบไหน" : "Use this page to understand the thinking behind Delentia OS's architecture, governance, and proof culture.",
      label: isTh ? "Trust lane" : "Trust lane",
      footer: isTh ? "อ่านหน้าในฐานะ evaluation surface" : "Read this page as an evaluation surface",
      iconSrc: pixelIcons.architecture,
      color: "#89B4C8",
      bg: "#DBEAFE",
    },
    {
      title: isTh ? "สำหรับพาร์ทเนอร์" : "For partners",
      description: isTh ? "เรื่องราวของผู้สร้างช่วยอธิบายว่าเหตุใดระบบนี้จึงออกแบบให้จริงจังกับ trust, operational discipline และ long-term stewardship" : "The founder story explains why the system takes trust, operational discipline, and long-term stewardship seriously.",
      label: isTh ? "Trust lane" : "Trust lane",
      footer: isTh ? "ใช้เพื่อประเมิน stewardship ระยะยาว" : "Use it to assess long-term stewardship",
      iconSrc: pixelIcons.rocket,
      color: "#B8A9C9",
      bg: "#EDE9FE",
    },
    {
      title: isTh ? "สำหรับสื่อและการเผยแพร่" : "For media and publication",
      description: isTh ? "นี่ไม่ใช่เรื่องเล่าทั่วไปของ startup แต่เป็นกรณีศึกษาของข้อจำกัดที่ถูกแปลงเป็น constitutional system design" : "This is not a standard startup origin story. It is a case study in turning constraint into constitutional system design.",
      label: isTh ? "Trust lane" : "Trust lane",
      footer: isTh ? "วาง narrative สำหรับสื่อและ publication" : "Shape the narrative for media and publication",
      iconSrc: pixelIcons.document,
      color: "#D4A853",
      bg: "#FEF3C7",
    },
  ]

  const architectProofPoints = [
    {
      label: isTh ? "Design posture" : "Design posture",
      value: isTh ? "intent-first constitutional system design" : "intent-first constitutional system design",
    },
    {
      label: isTh ? "Engineering proof" : "Engineering proof",
      value: `${SITE_PUBLIC_SDK_TESTS.toLocaleString()} ${isTh ? "tests ที่ผ่าน" : "passing tests"}`,
    },
    {
      label: isTh ? "Runtime footprint" : "Runtime footprint",
      value: `${runtimeFootprint} ${isTh ? "runtime components" : "runtime components"}`,
    },
  ]

  const shockItems = [
    { label: "Language Paradox", title: isTh ? "ข้อจำกัดด้านภาษา กลายเป็น protocol สากล" : "Language constraint turned into a universal protocol", value: isTh ? "ไม่ได้ใช้ภาษาอังกฤษเป็นหลัก — แต่สร้างภาษา Intent สากล (JITNA)" : "Doesn't primarily use English — yet created a universal intent language (JITNA)", iconSrc: pixelIcons.jitna, color: "#7B9E87", bg: "#D1FAE5", footer: isTh ? "เปลี่ยนข้อจำกัดด้านภาษาเป็น protocol" : "Turns language constraint into protocol" },
    { label: "Resource Paradox", title: isTh ? "ทรัพยากรน้อย แต่ discipline สูง" : "Low-resource conditions, high execution discipline", value: isTh ? "สร้าง AI-grade System ผ่านมือถือ Android เครื่องเดียว" : "Built an AI-grade system through a single Android mobile phone", iconSrc: pixelIcons.brain, color: "#D4A853", bg: "#FEF3C7", footer: isTh ? "เปลี่ยนข้อจำกัดทรัพยากรเป็น discipline" : "Turns resource limits into discipline" },
    { label: "Constitution Shift", title: isTh ? "จากผู้ใช้ AI สู่ผู้ออกแบบกรอบของมัน" : "From AI user to framework author", value: isTh ? "จากผู้ใช้ AI → ผู้กำหนดกรอบ Constitutional AI ของตนเอง" : "From AI user to defining an original Constitutional AI framework", iconSrc: pixelIcons.shield, color: "#89B4C8", bg: "#DBEAFE", footer: isTh ? "จากผู้ใช้สู่ผู้ออกแบบกรอบ" : "Moves from user to framework author" },
    { label: "Scale Achievement", title: isTh ? "ระบบโตจาก narrative สู่ evidence ที่แยกชั้นชัดขึ้น" : "Scale is moving from narrative into clearly separated evidence", value: isTh ? `public SDK ตอนนี้ยืนยันได้ ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests ขณะที่ enterprise runtime footprint ${SITE_MICROSERVICE_COUNT} components และ ${SITE_TEST_COUNT.toLocaleString()} tests ถูกจัดเป็น private snapshot พร้อม benchmark notes ที่แยก scope` : `The public SDK now verifies ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests, while the ${SITE_MICROSERVICE_COUNT}-component runtime and ${SITE_TEST_COUNT.toLocaleString()} enterprise tests are framed as a private snapshot with separately scoped benchmark notes.`, iconSrc: pixelIcons.chart, color: "#C4745B", bg: "#FEE2E2", footer: isTh ? "จาก claim ปนกัน ไปสู่ evidence lanes" : "Moves from blended claims into evidence lanes" },
  ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Reverse Component Thinking (RCT)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reverse Component Thinking (RCT) is a methodology that starts from the desired outcome and works backward to define the exact components, verifications, and intent structures required to achieve it. Unlike forward-prompt engineering, RCT treats every AI interaction as a constitutional declaration traceable to a measurable business goal."
            }
          },
          {
            "@type": "Question",
            "name": "How does Delentia Labs prevent AI hallucination in enterprise deployments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Delentia Labs uses a multi-layer verification architecture: the FDIA equation decomposes intent into auditable components, SignedAI runs multi-LLM consensus scoring, and the memory layer cross-checks outputs against governed knowledge. Public pages disclose benchmark claims only with explicit scope; the current 0.3% hallucination figure is framed as controlled-workload benchmark evidence, not a universal production guarantee."
            }
          },
          {
            "@type": "Question",
            "name": "What is JITNA RFC-001 and why does it matter for enterprise AI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "JITNA RFC-001 (Just-In-Time Nodal Assembly Request for Comments 001) is an open protocol published by Delentia Labs that defines a language-agnostic standard for expressing AI intent as structured, verifiable node graphs. Enterprises benefit because JITNA-compliant systems produce auditable intent trails, enabling compliance teams to trace every AI decision back to its originating intent specification."
            }
          },
          {
            "@type": "Question",
            "name": "Is Delentia Labs suitable for large enterprise deployments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Delentia Labs is being positioned for enterprise requirements through governed routing, persistent memory, verification layers, and a separately disclosed runtime snapshot. Public evidence currently lives in the open SDK and public methodology pages, while larger runtime scale claims are clearly marked as enterprise-private snapshot data."
            }
          },
          {
            "@type": "Question",
            "name": "What makes Signed AI different from standard AI output verification?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Signed AI is Delentia Labs' multi-model consensus engine that attaches a cryptographically-inspired quality signature to every AI output. It evaluates outputs across 8 quality dimensions — accuracy, relevance, coherence, safety, completeness, timeliness, originality, and enterprise-alignment — and only releases outputs that cross a configurable consensus threshold across multiple LLMs. This creates an auditable chain of verification, not a single-model assertion."
            }
          }
        ]
      }) }} />
      <main className="relative min-h-screen bg-background" id="main-content">
        <Navbar locale={locale} />
        <div className="about-page-backdrop" aria-hidden="true">
          <div className="about-page-backdrop__mesh" />
          <div className="about-page-backdrop__grid" />
          <AboutPageMotionBackdrop />
          <div className="about-page-backdrop__orb about-page-backdrop__orb--amber" />
          <div className="about-page-backdrop__orb about-page-backdrop__orb--sage" />
          <div className="about-page-backdrop__orb about-page-backdrop__orb--terra" />
          <div className="about-page-backdrop__beam about-page-backdrop__beam--left" />
          <div className="about-page-backdrop__beam about-page-backdrop__beam--right" />
        </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="relative overflow-hidden rounded-[36px] border border-[#e6ddd0] bg-linear-to-b from-[#fffaf6] via-white to-[#fbf7f1] px-6 py-10 shadow-[0_18px_50px_rgba(84,61,31,0.08)] md:px-10 md:py-14 dark:border-border/70 dark:from-card dark:via-card dark:to-background">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/35 to-transparent opacity-80" />
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
              <Sparkles className="w-4 h-4" />
              {isTh ? "สถาปัตยกรรม Constitutional AI สำหรับองค์กร" : "Enterprise Constitutional AI Architecture"}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground text-balance md:text-6xl">
              {isTh ? "เปลี่ยน Intent ให้เป็นความจริงที่ตรวจสอบได้" : "Scaling Intent into Verifiable Truth"}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance md:text-2xl">
              {isTh
                ? "ระบบปฏิบัติการ AI ที่ออกแบบมาเพื่อการกำกับดูแล ความทรงจำองค์กร และลดการหลอนอย่างเป็นระบบ"
                : "An AI operating system built natively for strict governance, persistent enterprise memory, and systemic hallucination control."}
            </p>
            <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {isTh
                ? "สร้างขึ้นบนสมการ FDIA และสถาปัตยกรรมระดับ 10-Layer Delentia OS ไม่ใช่แค่การประกอบโมเดลเข้าด้วยกัน แต่เราออกแบบสายวิวัฒนาการใหม่ ที่ทุกผลลัพธ์ได้รับการตรวจสอบ รองรับงานระดับองค์กรที่อ่อนไหวที่สุด"
                : "Built on the FDIA equation and a 10-Layer Architecture, Delentia OS orchestrates models into a governed enterprise runtime. We engineer deterministic pathways where every output is verifiable, making AI safe for highly-regulated workflows."}
            </p>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-warm-amber">
              {isTh ? "สถาปนิกอิสระ • 41 Algorithms • Public SDK verified + Enterprise snapshot" : "Solo Architect • 41 Algorithms • Public SDK verified + Enterprise snapshot"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isTh
                ? `${SITE_PUBLIC_SDK_EVIDENCE_LABEL}: ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests • ${SITE_PUBLIC_SDK_COVERAGE} | ${SITE_ENTERPRISE_EVIDENCE_LABEL}: ${SITE_TEST_COUNT.toLocaleString()} tests / ${SITE_MICROSERVICE_COUNT} runtime components | updated ${SITE_EVIDENCE_LAST_UPDATED}`
                : `${SITE_PUBLIC_SDK_EVIDENCE_LABEL}: ${SITE_PUBLIC_SDK_TESTS.toLocaleString()} tests • ${SITE_PUBLIC_SDK_COVERAGE} | ${SITE_ENTERPRISE_EVIDENCE_LABEL}: ${SITE_TEST_COUNT.toLocaleString()} tests / ${SITE_MICROSERVICE_COUNT} runtime components | updated ${SITE_EVIDENCE_LAST_UPDATED}`}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {proofPillars.map((item) => (
              <div key={item.title} className="rounded-3xl border border-[#eee2d6] bg-white/85 p-5 text-left shadow-[0_10px_24px_rgba(84,61,31,0.04)] dark:border-border/70 dark:bg-background/35">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">{isTh ? "Proof layer" : "Proof layer"}</div>
                <h2 className="mt-3 text-xl font-bold text-foreground">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="rounded-4xl border border-[#e6ddd0] bg-white p-4 shadow-[0_16px_38px_rgba(84,61,31,0.05)] dark:border-border/70 dark:bg-card/90 md:p-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {stats.map((s, index) => (
              <div key={s.label} className={`rounded-3xl border border-[#eee2d6] bg-[#fffaf6] p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] dark:border-border/70 dark:bg-background/30 ${index === stats.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                <div className="text-2xl font-bold text-warm-amber font-mono tabular-nums md:text-3xl">{s.value}</div>
                <div className="mt-2 text-xs font-medium text-foreground md:text-sm">{s.label}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {platformHighlights.map((item) => (
            <AboutPreviewCard
              key={item.title}
              eyebrow={item.label}
              title={item.title}
              description={item.description}
              footer={item.footer}
              iconSrc={item.iconSrc}
              color={item.color}
              bg={item.bg}
              iconPlacement="inline"
            />
          ))}
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="space-y-14">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "Founder Narrative" : "Founder Narrative"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "เรื่องส่วนตัวที่หล่อระบบระดับองค์กร" : "The Personal Story Behind an Enterprise System"}
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              {isTh
                ? "ส่วนนี้ไม่ได้ถูกวางไว้เพื่อเล่าเรื่องชีวิตแบบโรแมนติก แต่เพื่ออธิบายว่าทำไมโครงสร้างของ Delentia OS จึงจริงจังกับ governance, cost, verification และ resilience ตั้งแต่ต้นทาง"
                : "This section is not here to romanticize biography. It exists to explain why Delentia OS is unusually serious about governance, cost discipline, verification, and resilience from the first design decision."}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {founderSignals.map((item) => (
              <AboutPreviewCard
                key={item.title}
                eyebrow={item.label}
                title={item.title}
                description={item.description}
                footer={item.footer}
                iconSrc={item.iconSrc}
                color={item.color}
                bg={item.bg}
                iconPlacement="inline"
              />
            ))}
          </div>

          <div className="relative mx-auto max-w-5xl rounded-4xl border border-[#eadfce] bg-[#fbf7f1] p-4 md:p-6 dark:border-border/70 dark:bg-card/60">
            <div className="space-y-5">
              {journeyPhases.map((phase, i) => (
                <div key={i} className="grid gap-4 md:grid-cols-[92px_minmax(0,1fr)] md:gap-6">
                  <div className="relative hidden md:flex md:flex-col md:items-center">
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[22px] border border-[#e6ddd0] bg-white text-2xl shadow-[0_10px_24px_rgba(84,61,31,0.06)] dark:border-border/70 dark:bg-background/50">
                      {phase.icon}
                    </div>
                    {i < journeyPhases.length - 1 ? <div className="mt-3 w-px flex-1 bg-linear-to-b from-warm-amber via-orange-300 to-warm-sage" /> : null}
                  </div>

                  <div className="group overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-white p-5 shadow-[0_12px_28px_rgba(84,61,31,0.04)] transition hover:border-warm-amber/40 hover:shadow-[0_18px_38px_rgba(84,61,31,0.07)] dark:border-border/70 dark:bg-card/90 md:p-6">
                    <div className="flex items-start gap-4 md:hidden">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] border border-[#e6ddd0] bg-[#fffaf6] text-2xl shadow-[0_8px_18px_rgba(84,61,31,0.05)] dark:border-border/70 dark:bg-background/50">
                        {phase.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-warm-amber">{phase.phase}</span>
                          <span className="ml-auto text-xs font-mono text-muted-foreground">{phase.period}</span>
                        </div>
                        <h3 className="mt-2 text-xl font-bold leading-tight text-foreground">{phase.title}</h3>
                      </div>
                    </div>

                    <div className="hidden items-start justify-between gap-4 md:flex">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-warm-amber">{phase.phase}</div>
                        <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground transition group-hover:text-warm-amber">{phase.title}</h3>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">{phase.period}</div>
                    </div>

                    <p className="mt-5 text-sm leading-8 text-muted-foreground">{phase.desc}</p>
                    <div className="mt-5 border-t border-[#eee2d6] pt-4 dark:border-border/80">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-amber">{isTh ? "สิ่งที่มันสร้าง" : "What it built"}</div>
                      <div className="mt-2 text-sm font-medium text-foreground md:text-base">{phase.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FDIA Equation ────────────────────────────────────── */}
      <AboutFDIAShowcase locale={locale} />

      {/* ── 7 Genome System ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 md:pt-12 md:pb-8">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "DNA ของระบบ" : "System DNA"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">{isTh ? "ระบบ 7 Genome" : "The 7 Genome System"}</h2>
            <p className="text-muted-foreground">
              {isTh
                ? "7 Genomes ที่เชื่อมต่อกันประกอบเป็น DNA ที่สมบูรณ์ของ Delentia OS แต่ละตัวรับผิดชอบ Domain ที่สำคัญ"
                : "Seven interconnected genomes form the complete DNA of Delentia OS — each responsible for a critical domain."}
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {genomeBands.map((band) => (
              <div key={band.title} className="group relative overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-white p-6 shadow-[0_12px_32px_rgba(84,61,31,0.045)] transition hover:-translate-y-1 hover:border-warm-amber/35 hover:shadow-[0_22px_48px_rgba(84,61,31,0.08)] dark:border-border/70 dark:bg-card/90">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/30 to-transparent opacity-70" />
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">{band.label}</div>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-foreground transition group-hover:text-warm-amber">{band.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{band.summary}</p>

                <div className="mt-6 space-y-3">
                  {band.items.map((g) => (
                    <div key={g.id} className={`rounded-2xl border p-4 ${g.color} bg-card/70`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold">G{g.id}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-80">{g.role}</span>
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-foreground">{g.name}</h4>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{g.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────── */}
      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-[36px] border border-[#e6ddd0] bg-white/78 px-6 py-10 shadow-[0_20px_52px_rgba(84,61,31,0.07)] backdrop-blur-[2px] dark:border-border/70 dark:bg-card/85 md:px-8 md:py-12">
            <div className="homepage-ambient-layer absolute inset-0 opacity-90">
              <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-20 top-10 h-56 w-56 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--terra absolute left-1/3 top-1/2 h-48 w-48 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-16 bottom-0 h-64 w-64 rounded-full" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,245,0.62),rgba(255,250,245,0.2)_30%,rgba(255,250,245,0.58)_100%)] dark:bg-[linear-gradient(180deg,rgba(20,18,16,0.24),rgba(20,18,16,0.08)_30%,rgba(20,18,16,0.26)_100%)]" />
            </div>
            <div className="relative space-y-12">
              <div className="mx-auto max-w-3xl text-center space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/20 bg-warm-amber/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-warm-amber">
                  {isTh ? "ค่านิยมหลัก" : "Core Values"}
                </div>
                <h2 className="text-4xl font-bold text-foreground">{isTh ? "สิ่งที่เราเชื่อ" : "What We Believe"}</h2>
                <p className="text-base leading-8 text-muted-foreground">
                  {isTh
                    ? "ค่านิยมเหล่านี้ไม่ใช่คำขวัญเชิงแบรนด์ แต่เป็นกฎการออกแบบที่กำหนดวิธีสร้าง ตรวจสอบ และรับผิดชอบต่อทุก output ของระบบ"
                    : "These are not brand slogans. They are design laws that shape how the system is built, verified, and held accountable for every output."}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                {values.map((v, i) => {
                  const Icon = v.icon
                  return (
                    <div key={i} className={`group relative overflow-hidden rounded-[30px] border border-[#e7ddd2] bg-white/92 p-6 shadow-[0_12px_32px_rgba(84,61,31,0.045)] transition hover:-translate-y-1 hover:border-warm-amber/35 hover:shadow-[0_22px_48px_rgba(84,61,31,0.08)] dark:border-border/70 dark:bg-card/92 ${valueCardPlacements[i]}`}>
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/35 to-transparent opacity-80" />
                      <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-[#efe1cf] bg-[#fff8ef] text-warm-amber shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] dark:border-border/70 dark:bg-background/30">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold leading-tight text-foreground transition group-hover:text-warm-amber">{v.title}</h3>
                      <p className="mt-4 text-sm leading-8 text-muted-foreground">{v.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shock Profile ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "Origin Contrasts" : "Origin Contrasts"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "เหตุผลที่เรื่องนี้ดึงความสนใจได้จริง" : "Why This Story Carries Real Public Impact"}
            </h2>
            <p className="max-w-3xl mx-auto text-base leading-8 text-muted-foreground">
              {isTh
                ? "คุณค่าของเรื่องนี้ไม่ได้อยู่ที่ความลำบากเพียงอย่างเดียว แต่อยู่ที่การเปลี่ยนข้อจำกัดให้กลายเป็นหลักฐานของ design philosophy, execution discipline และความน่าเชื่อถือที่ตรวจสอบได้"
                : "The value of this story is not difficulty for its own sake. It is the conversion of constraint into design philosophy, execution discipline, and credibility that can be externally inspected."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            {shockItems.map((item) => (
              <AboutPreviewCard
                key={item.label}
                eyebrow={item.label}
                title={item.title}
                description={item.value}
                footer={item.footer}
                iconSrc={item.iconSrc}
                color={item.color}
                bg={item.bg}
                iconPlacement="inline"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "วิวัฒนาการ" : "Evolution"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "เส้นทางจนถึงปัจจุบัน" : "The Journey So Far"}
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground">
              {isTh
                ? "ไทม์ไลน์นี้เล่าเป็นชั้นความสามารถที่เพิ่มขึ้นจริง ไม่ใช่ milestone เชิงการตลาด จึงตัด icon ออกทั้งหมดเพื่อให้โฟกัสอยู่ที่ capability, governance และผลกระทบทางธุรกิจของแต่ละช่วง"
                : "This timeline is framed as capability accumulation rather than marketing milestones, so the decorative icons are removed here to keep attention on the operational layer, governance shift, and business impact of each phase."}
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {timelineItems.map((item) => (
              <div key={item.title} className="main-page-reactive-card group relative overflow-hidden rounded-[28px] border border-[#e6ddd0] bg-white p-6 shadow-[0_12px_32px_rgba(84,61,31,0.045)] transition hover:-translate-y-1 hover:border-warm-amber/35 hover:shadow-[0_22px_48px_rgba(84,61,31,0.08)] dark:border-border/70 dark:bg-card/90">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/30 to-transparent opacity-70" />
                <div
                  className={[
                    "pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full",
                    item.tone === "amber" ? "bg-warm-amber/55" : "",
                    item.tone === "sage" ? "bg-warm-sage/55" : "",
                    item.tone === "sky" ? "bg-warm-sky/55" : "",
                    item.tone === "terra" ? "bg-warm-terracotta/55" : "",
                  ].join(" ")}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <div className="rounded-full border border-warm-amber/25 bg-warm-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">
                    {item.phase}
                  </div>
                  <div className="rounded-full border border-[#eadfce] bg-[#fffaf6] px-3 py-1 text-[11px] font-mono text-muted-foreground dark:border-border/70 dark:bg-background/35">
                    {item.period}
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-tight text-foreground transition group-hover:text-warm-amber">{item.title}</h3>

                <div className="mt-5 rounded-2xl border border-[#eee2d6] bg-[#fffaf6] p-4 dark:border-border/70 dark:bg-background/35">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{isTh ? "Capability added" : "Capability added"}</div>
                  <p className="mt-2 text-sm leading-7 text-foreground">{item.capability}</p>
                </div>

                <div className="mt-4 border-t border-[#eee2d6] pt-4 dark:border-border/80">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-amber">{isTh ? "Why it matters" : "Why it matters"}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.businessImpact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architect Profile ────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[38px] border border-[#e6ddd0] bg-white/82 px-6 py-8 shadow-[0_20px_56px_rgba(84,61,31,0.07)] backdrop-blur-[2px] dark:border-border/70 dark:bg-card/86 md:px-8 md:py-10">
            <div className="homepage-ambient-layer absolute inset-0 opacity-95">
              <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute left-0 top-0 h-72 w-72 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--blue absolute right-0 top-12 h-72 w-72 rounded-full" />
              <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute left-1/3 bottom-0 h-64 w-64 rounded-full" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,248,0.64),rgba(255,252,248,0.18)_34%,rgba(255,252,248,0.62)_100%)] dark:bg-[linear-gradient(180deg,rgba(20,18,16,0.24),rgba(20,18,16,0.08)_34%,rgba(20,18,16,0.26)_100%)]" />
            </div>

            <div className="relative space-y-8">
              <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                <div className="rounded-4xl border border-[#eadfce] bg-white/94 p-8 text-center shadow-[0_14px_36px_rgba(84,61,31,0.045)] dark:border-border/70 dark:bg-card/92">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-warm-amber/35 bg-linear-to-br from-warm-amber/30 via-white to-warm-sage/22 text-4xl shadow-[0_10px_24px_rgba(212,168,83,0.14)]">
                    🏗️
                  </div>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-warm-amber">The Architect</div>
                  <h2 className="mt-4 text-4xl font-bold text-foreground">Ittirit Saengow</h2>
                  <div className="mt-3 text-xl text-muted-foreground">อิทธิฤทธิ์ แซ่โง้ว</div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {["Survivor Architect", "Architect of Intent", "Geneticist of Cognition"].map((t) => (
                      <span key={t} className="rounded-full border border-[#eadfce] bg-[#fffaf6] px-3.5 py-1.5 text-xs font-medium text-muted-foreground dark:border-border/70 dark:bg-background/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-4xl border border-[#eadfce] bg-white/94 p-8 shadow-[0_14px_36px_rgba(84,61,31,0.045)] dark:border-border/70 dark:bg-card/92">
                  <div className="flex items-center gap-3 text-warm-amber">
                    <Quote className="h-5 w-5" />
                    <div className="text-xs font-semibold uppercase tracking-[0.2em]">{isTh ? "Founder narrative" : "Founder narrative"}</div>
                  </div>
                  <blockquote className="mt-5 text-left text-2xl font-semibold italic leading-[1.45] text-foreground md:text-[2rem]">
                    {isTh
                      ? '"AI ไม่ใช่พระเอก พระเอกตัวจริงคือ Intent ที่อยู่เบื้องหลัง และมนุษย์ผู้ลงนามการตัดสินใจสุดท้าย"'
                      : '"AI is not the hero. The real hero is the Intent behind it, and the human who signs the final decision."'}
                  </blockquote>
                  <p className="mt-6 text-base leading-8 text-muted-foreground">
                    {isTh
                      ? "ชีวประวัติในส่วนนี้ไม่ได้ถูกใช้เพื่อเล่าความลำบาก แต่เพื่ออธิบายว่าเหตุใด Delentia OS จึงถูกออกแบบให้ยึดกับโครงสร้าง การตรวจสอบย้อนกลับ และความรับผิดชอบต่อผลลัพธ์ตั้งแต่วันแรก"
                      : "The biography here is not used to dramatize hardship. It exists to explain why Delentia OS was designed around structure, traceability, and outcome accountability from the beginning."}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {architectProofPoints.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-[#eee2d6] bg-[#fffaf6] p-4 text-left dark:border-border/70 dark:bg-background/30">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-amber">{item.label}</div>
                        <div className="mt-2 text-sm font-medium leading-7 text-foreground">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 text-center">
                    <Link href="/changelog" className="text-sm font-medium text-warm-amber hover:underline underline-offset-4">
                      {isTh ? "ดู Development Changelog ทั้งหมด →" : "View full development changelog →"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {architectSignals.map((item) => (
                  <AboutPreviewCard
                    key={item.title}
                    eyebrow={item.label}
                    title={item.title}
                    description={item.description}
                    footer={item.footer}
                    iconSrc={item.iconSrc}
                    color={item.color}
                    bg={item.bg}
                    iconPlacement="inline"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
    </>
  )
}

