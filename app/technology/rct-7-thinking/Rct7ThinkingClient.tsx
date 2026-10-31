"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Brain, ChevronRight, Layers } from "lucide-react"
import { SITE_PUBLIC_SDK_TESTS } from "@/lib/site-config"

const thinkingSteps = [
  {
    num: 1,
    step: "Observe",
    stepTh: "สังเกต",
    color: "#89B4C8",
    descEn: "Collect raw signals from the environment — user input, context data, system state, and historical pattern signals. No judgment yet, only structured collection of what is present.",
    descTh: "รวบรวม Signal ดิบจากสภาพแวดล้อม — Input ของผู้ใช้, ข้อมูล Context, สถานะระบบ และ Signal รูปแบบประวัติศาสตร์ ยังไม่มีการตัดสิน มีเพียงการรวบรวมสิ่งที่มีอยู่อย่างมีโครงสร้าง",
    kernelTiers: "T1–T2",
  },
  {
    num: 2,
    step: "Analyze",
    stepTh: "วิเคราะห์",
    color: "#7B9E87",
    descEn: "Decompose the observed signals into structured components — intent classification, entity extraction, constraint identification, and priority scoring via the FDIA equation F=(D^I)×A.",
    descTh: "แยกย่อย Signal ที่สังเกตออกเป็นองค์ประกอบที่มีโครงสร้าง — การจำแนก Intent, การแยก Entity, การระบุ Constraint และการให้คะแนน Priority ผ่านสมการ FDIA F=(D^I)×A",
    kernelTiers: "T3–T4",
  },
  {
    num: 3,
    step: "Deconstruct",
    stepTh: "แยกส่วน",
    color: "#D4A853",
    descEn: "Break the problem into minimal atomic sub-tasks. Identify dependencies between sub-tasks and determine which can be parallelized versus which must be sequential. Build the execution dependency graph.",
    descTh: "แยกปัญหาออกเป็น Sub-task อะตอมมิกขั้นต่ำ ระบุการพึ่งพากันระหว่าง Sub-task และกำหนดสิ่งที่สามารถทำแบบ Parallel เทียบกับสิ่งที่ต้องทำแบบ Sequential สร้าง Execution Dependency Graph",
    kernelTiers: "T4–T5",
  },
  {
    num: 4,
    step: "Reverse Reasoning",
    stepTh: "การให้เหตุผลแบบย้อนกลับ",
    color: "#C4745B",
    descEn: "Work backward from the desired outcome to identify what must be true for success. This backward chaining reveals hidden assumptions, validates feasibility, and surfaces constraint conflicts before execution.",
    descTh: "ทำงานย้อนกลับจากผลลัพธ์ที่ต้องการเพื่อระบุสิ่งที่ต้องเป็นจริงสำหรับความสำเร็จ การเชื่อมโยงแบบย้อนกลับนี้เผย Assumptions ที่ซ่อนอยู่ ตรวจสอบความเป็นไปได้ และเผย Constraint Conflicts ก่อน Execution",
    kernelTiers: "T5–T6",
  },
  {
    num: 5,
    step: "Identify Core Intent",
    stepTh: "ระบุ Intent หลัก",
    color: "#B8A9C9",
    descEn: "Distill all analysis into the single root intent — the fundamental goal that, if achieved, satisfies all downstream requirements. This is the convergence point that drives the reconstruction phase.",
    descTh: "กลั่น Analysis ทั้งหมดลงใน Intent รากเดียว — เป้าหมายพื้นฐานที่หากบรรลุได้ จะตอบสนองความต้องการปลายทางทั้งหมด นี่คือจุดลู่เข้าที่ขับเคลื่อน Reconstruction Phase",
    kernelTiers: "T6",
  },
  {
    num: 6,
    step: "Reconstruct",
    stepTh: "สร้างใหม่",
    color: "#9B7BB8",
    descEn: "Build the optimal solution path from the core intent and verified sub-tasks. Sequence atomic operations, assign model roles via JITNA, and create the final execution plan with fallback routes for every critical node.",
    descTh: "สร้างเส้นทางโซลูชันที่เหมาะสมที่สุดจาก Core Intent และ Sub-task ที่ตรวจสอบแล้ว จัดลำดับการดำเนินงานอะตอมมิก กำหนด Model Roles ผ่าน JITNA และสร้าง Execution Plan สุดท้ายพร้อม Fallback Routes สำหรับทุก Critical Node",
    kernelTiers: "T7–T8",
  },
  {
    num: 7,
    step: "Compare with Intent",
    stepTh: "เปรียบเทียบกับ Intent",
    color: "#D4A853",
    descEn: "Validate the reconstructed plan against the original core intent. Run FDIA verification — does the proposed execution F=(D^I)×A satisfy A≥1 (Authorization)? Is the delta (Δ=I−D) closed? This gate prevents misaligned execution.",
    descTh: "ตรวจสอบ Plan ที่ Reconstruct แล้วเทียบกับ Core Intent เดิม รัน FDIA Verification — Execution ที่เสนอ F=(D^I)×A ตอบสนอง A≥1 (Authorization) หรือไม่? Delta (Δ=I−D) ปิดแล้วหรือไม่? Gate นี้ป้องกัน Execution ที่ไม่ตรงกัน",
    kernelTiers: "T8–T9",
  },
]

const rctVariants = [
  {
    id: "RCT-O",
    name: "RCT-O",
    fullName: "Organizational Change",
    fullNameTh: "การเปลี่ยนแปลงองค์กร",
    steps: 7,
    descEn: "7-step full cycle for complex organizational change scenarios. All 7 thinking steps execute sequentially — most thorough variant for multi-stakeholder decisions.",
    descTh: "Full Cycle 7 ขั้นตอนสำหรับสถานการณ์การเปลี่ยนแปลงองค์กรที่ซับซ้อน ขั้นตอน Thinking ทั้ง 7 ดำเนินการตามลำดับ — Variant ที่ละเอียดที่สุดสำหรับการตัดสินใจแบบ Multi-Stakeholder",
    color: "#D4A853",
  },
  {
    id: "RCT-S",
    name: "RCT-S",
    fullName: "Systemic Analysis",
    fullNameTh: "การวิเคราะห์เชิงระบบ",
    steps: 4,
    descEn: "4-step condensed cycle: Observe → Analyze → Reconstruct → Compare. For systemic analysis where deconstruction and reverse reasoning are pre-handled by the FDIA layer.",
    descTh: "4 ขั้นตอน Condensed Cycle: Observe → Analyze → Reconstruct → Compare สำหรับการวิเคราะห์เชิงระบบที่ FDIA Layer จัดการ Deconstruction และ Reverse Reasoning ไว้ล่วงหน้าแล้ว",
    color: "#7B9E87",
  },
  {
    id: "RCT-I",
    name: "RCT-I",
    fullName: "Interpretation Mode",
    fullNameTh: "โหมดการตีความ",
    steps: 7,
    descEn: "7-step interpretive cycle — emphasis on Reverse Reasoning and Compare with Intent stages. Optimized for ambiguous inputs where meaning must be constructed from incomplete signals.",
    descTh: "Interpretive Cycle 7 ขั้นตอน — เน้น Reverse Reasoning และ Compare with Intent stages ปรับแต่งสำหรับ Input ที่ไม่ชัดเจนซึ่งความหมายต้องสร้างจาก Signal ที่ไม่สมบูรณ์",
    color: "#89B4C8",
  },
]

const kernelMapping = [
  { tier: "T1–T2", tierNameEn: "Foundation + Analysis", tierNameTh: "Foundation + Analysis", step: "Observe → Analyze", color: "#89B4C8" },
  { tier: "T3–T4", tierNameEn: "Reasoning + Orchestration", tierNameTh: "Reasoning + Orchestration", step: "Analyze → Deconstruct", color: "#7B9E87" },
  { tier: "T4–T5", tierNameEn: "Orchestration + Verification", tierNameTh: "Orchestration + Verification", step: "Deconstruct → Reverse Reason", color: "#D4A853" },
  { tier: "T5–T6", tierNameEn: "Verification + Memory", tierNameTh: "Verification + Memory", step: "Reverse Reason → Core Intent", color: "#C4745B" },
  { tier: "T7–T8", tierNameEn: "Adaptation + Synthesis", tierNameTh: "Adaptation + Synthesis", step: "Reconstruct", color: "#B8A9C9" },
  { tier: "T8–T9", tierNameEn: "Synthesis + Autonomy", tierNameTh: "Synthesis + Autonomy", step: "Compare with Intent", color: "#9B7BB8" },
]

export default function Rct7ThinkingClient({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname()
  const isTh = (propLocale ?? getLocaleFromPathname(pathname) ?? "en") === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Brain className="w-4 h-4" /> Cognitive Methodology — G7 Thinking Engine
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {isTh ? "RCT-7 Thinking" : "RCT-7 Thinking"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "กระบวนการคิด 7 ขั้นตอนของ RCT — ไม่ใช่ IntentLoop แต่เป็น Cognitive Protocol ที่ RCT-7 Mental OS ใช้ในการให้เหตุผล วางแผน และตรวจสอบ Solution ก่อน Execution"
              : "RCT's 7-step reasoning methodology — distinct from the IntentLoop, this is the cognitive protocol that RCT-7 Mental OS uses to reason, plan, and verify solutions before execution."}
          </p>
        </div>
      </section>

      {/* Distinction: Thinking vs Mental OS */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {isTh ? "RCT-7 Thinking vs RCT-7 Mental OS" : "RCT-7 Thinking vs RCT-7 Mental OS"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warm-amber inline-block" />
                {isTh ? "RCT-7 Thinking" : "RCT-7 Thinking"}
              </div>
              <p className="text-sm text-muted-foreground">
                {isTh
                  ? "Cognitive Protocol — วิธีที่ระบบ \'คิด\' เกี่ยวกับปัญหา 7 ขั้นตอนที่ทำงานภายใน Mental OS ใช้ในการวางแผน ให้เหตุผล และตรวจสอบ Analogy: อัลกอริทึมการแก้ปัญหาของมนุษย์"
                  : "Cognitive Protocol — how the system \'thinks\' about a problem. 7 steps that run inside Mental OS for planning, reasoning, and verification. Analogy: a human\'s problem-solving algorithm."}
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                {isTh ? "RCT-7 Mental OS" : "RCT-7 Mental OS"}
              </div>
              <p className="text-sm text-muted-foreground">
                {isTh
                  ? "Orchestration Engine — ระบบปฏิบัติการที่จัดการ Task Lifecycle ผ่าน 7 สถานะ (IDLE→ADAPT) Mental OS \'รัน\' Thinking Protocol ภายใน PARSE และ ROUTE states Analogy: สมองของมนุษย์เอง"
                  : "Orchestration Engine — the operating system managing Task Lifecycle via 7 states (IDLE→ADAPT). Mental OS \'runs\' the Thinking Protocol within PARSE and ROUTE states. Analogy: the human brain itself."}
              </p>
            </div>
          </div>
          <p className="text-sm mt-4">
            {isTh
              ? "กล่าวโดยย่อ: Mental OS คือ \'สมอง\' และ RCT-7 Thinking คือ \'กระบวนการคิด\' ที่สมองเดินตาม ทั้งสองทำงานร่วมกัน — Thinking Protocol ไม่มีความหมายหากไม่มี Execution Engine และในทางกลับกัน"
              : "In short: Mental OS is the \'brain\'; RCT-7 Thinking is the \'thought process\' the brain follows. Both work together — the Thinking Protocol is meaningless without an execution engine, and vice versa."}
          </p>
        </div>
      </section>

      {/* 7 Thinking Steps */}
      <section className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "7 ขั้นตอนของ RCT-7 Thinking" : "The 7 Steps of RCT-7 Thinking"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "ทุก Task ที่ซับซ้อนผ่าน 7 ขั้นตอนนี้ก่อน Execution — กระบวนการ Metacognitive ที่ p้องกัน Misalignment และ Hallucination"
              : "Every complex task passes through these 7 steps before execution — a metacognitive process that prevents misalignment and hallucination."}
          </p>
        </div>
        <div className="space-y-3">
          {thinkingSteps.map((s, i) => (
            <m.div key={s.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-border bg-card">
              <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `${s.color}18`, color: s.color }}>{s.num}</span>
                <div className="text-center">
                  <div className="text-[10px] sm:text-xs font-bold font-mono leading-tight" style={{ color: s.color }}>{s.step}</div>
                  {isTh && <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.stepTh}</div>}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? s.descTh : s.descEn}</p>
                <span className="text-xs font-mono mt-2 inline-block" style={{ color: s.color }}>Kernel: {s.kernelTiers}</span>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* 3 Variants */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              {isTh ? "3 Variants ของ RCT-7 Thinking" : "3 RCT-7 Thinking Variants"}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {isTh ? "เลือก Variant ตามความซับซ้อนและประเภทของปัญหา" : "Choose a variant based on problem complexity and type."}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {rctVariants.map((v, i) => (
              <m.div key={v.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold font-mono" style={{ color: v.color }}>{v.id}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ backgroundColor: `${v.color}15`, color: v.color }}>{v.steps} steps</span>
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{isTh ? v.fullNameTh : v.fullName}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">{isTh ? v.descTh : v.descEn}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kernel 9 Tiers Mapping */}
      <section className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4"
            style={{ backgroundColor: "#D4A85315", borderColor: "#D4A85330", color: "#D4A853" }}>
            <Layers className="w-3 h-3" /> Kernel Architecture Mapping
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            {isTh ? "Thinking Steps × Kernel 9 Tiers" : "Thinking Steps × Kernel 9 Tiers"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            {isTh
              ? "แต่ละขั้นตอนของ Thinking Protocol ทำงานที่ Kernel Tiers เฉพาะ ให้การแยกส่วนที่ชัดเจนระหว่างชั้น Cognitive"
              : "Each thinking step operates at specific Kernel Tiers, providing clean separation between cognitive layers."}
          </p>
        </div>
        <div className="space-y-2">
          {kernelMapping.map((_item, i) => (
            <m.div key={_item.tier} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
              <span className="text-xs font-bold font-mono w-12 sm:w-14 shrink-0" style={{ color: _item.color }}>{_item.tier}</span>
              <span className="text-xs text-muted-foreground w-28 sm:w-44 shrink-0 leading-snug">{isTh ? _item.tierNameTh : _item.tierNameEn}</span>
              <div className="flex items-center gap-1 text-xs text-foreground font-medium min-w-0">
                <ChevronRight size={12} className="shrink-0" style={{ color: _item.color }} />
                <span className="truncate sm:whitespace-normal">{_item.step}</span>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Performance Stats */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            {isTh ? "RCT-7 Thinking ในรันไทม์ ณ ตอนนี้" : "RCT-7 Thinking in the runtime today"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "7", label: isTh ? "ขั้นตอนการคิด" : "Thinking steps", color: "#D4A853" },
              { value: isTh ? "บางส่วน" : "Partial", label: isTh ? "สถานะของทุกขั้นตอนตอนนี้" : "Status of every step today", color: "#7B9E87" },
              { value: SITE_PUBLIC_SDK_TESTS.toLocaleString("en-US"), label: isTh ? "เทสต์ที่ผ่านใน CI สาธารณะ" : "Tests passing in public CI", color: "#89B4C8" },
              { value: isTh ? "ยังไม่มี" : "None yet", label: isTh ? "ผลกับโมเดลโฮสต์ที่เก่ง" : "Results with a strong hosted model", color: "#C4745B" },
            ].map((s, i) => (
              <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-border bg-card text-center">
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* FDIA Connection */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
          <div className="text-sm font-bold font-mono text-foreground mb-3">
            {isTh ? "FDIA × RCT-7 Thinking" : "FDIA × RCT-7 Thinking"}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {isTh
              ? "ขั้นตอนที่ 7 (Compare with Intent) รัน FDIA Verification โดยตรง: F=(D^I)×A ต้องบรรลุ A≥1 (Authorization) และ Delta (Δ=I−D) ต้องปิดก่อนที่จะอนุญาต Execution ในแบบนี้ Constitutional AI บูรณาการเข้ากับ Thinking Protocol"
              : "Step 7 (Compare with Intent) directly runs FDIA Verification: F=(D^I)×A must achieve A≥1 (Authorization) and Delta (Δ=I−D) must close before Execution is permitted. This is how Constitutional AI integrates into the Thinking Protocol."}
          </p>
          <div className="font-mono text-sm text-center p-3 rounded-lg bg-muted/30 text-foreground">
            F = (D<sup>I</sup>) × A &nbsp;|&nbsp; A=0 → F=0 (Prohibited)
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 pb-10 md:pb-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "หัวข้อที่เกี่ยวข้อง" : "Related"}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { href: "/technology/rct-7", icon: "🔄", label: isTh ? "RCT-7 Mental OS" : "RCT-7 Mental OS", desc: isTh ? "Engine ที่รัน Thinking Protocol — 7 สถานะ IntentLoop" : "The engine running the Thinking Protocol — 7-state IntentLoop" },
            { href: "/technology/constitutional-ai", icon: "⚖️", label: "Constitutional AI", desc: isTh ? "หลักการ A=0 ที่ Gate ขั้นตอนที่ 7" : "The A=0 principle that gates Step 7" },
            { href: "/technology/jitna", icon: "⚡", label: "JITNA Protocol", desc: isTh ? "Engine Routing ที่ Reconstruct phase เลือกใช้" : "The routing engine the Reconstruct phase invokes" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
