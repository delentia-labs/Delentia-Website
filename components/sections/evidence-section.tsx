"use client"

import type { ReactNode } from "react"
import { m, useReducedMotion } from "framer-motion"
import { BookOpen, ExternalLink, FlaskConical, BarChart3, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { pixelIcons } from "@/lib/pixel-icons"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

const evidenceCards = [
  {
    icon: FlaskConical,
    tagEn: "Peer-Reviewed Research",
    tagTh: "งานวิจัยที่ผ่านการ peer-review",
    titleEn: "Multi-LLM Consensus Improves Precision from 73% to 94%",
    titleTh: "Multi-LLM Consensus เพิ่มความแม่นยำจาก 73% เป็น 94%",
    quoteEn:
      "In tests across 78 complex cases requiring factual accuracy and causal consistency, our ensemble validation framework improved precision from 73.1% to 93.9%.",
    quoteTh:
      "จากการทดสอบ 78 กรณีที่ต้องการความถูกต้องเชิงข้อเท็จจริงและความสอดคล้องเชิงเหตุผล — ensemble validation framework เพิ่มความแม่นยำจาก 73.1% เป็น 93.9%",
    sourceEn:
      'Naik, N. (2024). "Probabilistic Consensus through Ensemble Validation: A Framework for LLM Reliability." arXiv:2411.06535',
    sourceTh:
      'Naik, N. (2024). "Probabilistic Consensus through Ensemble Validation" — arXiv:2411.06535',
    url: "https://arxiv.org/abs/2411.06535",
    relevanceEn:
      "Delentia OS's multi-LLM orchestration applies this same ensemble consensus principle — cross-validating outputs across multiple models to dramatically reduce hallucination.",
    relevanceTh:
      "Delentia OS ใช้หลักการ ensemble consensus เดียวกันนี้ — ตรวจสอบผลลัพธ์ข้ามหลาย LLM เพื่อลด hallucination อย่างมีนัยสำคัญ",
    color: "#7B9E87",
    stat: "+28.5%",
    statLabelEn: "Precision Gain",
    statLabelTh: "ความแม่นยำที่เพิ่มขึ้น",
  },
  {
    icon: BarChart3,
    tagEn: "Industry Report",
    tagTh: "รายงานอุตสาหกรรม",
    titleEn: "88% of Organizations Now Use AI — 62% Testing AI Agents",
    titleTh: "88% ขององค์กรใช้ AI แล้ว — 62% ทดสอบ AI Agents",
    quoteEn:
      "88% of organizations use AI in at least one business function. 62% are experimenting with AI agents, and 23% are already scaling agentic AI systems across their enterprises.",
    quoteTh:
      "88% ขององค์กรใช้ AI ในอย่างน้อยหนึ่งฟังก์ชันธุรกิจ — 62% กำลังทดลอง AI agents และ 23% กำลัง scale ระบบ agentic AI ข้ามองค์กร",
    sourceEn:
      'McKinsey & Company (2025). "The State of AI: Global Survey 2025." McKinsey Digital.',
    sourceTh: 'McKinsey & Company (2025). "The State of AI: Global Survey 2025"',
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    relevanceEn:
      "Delentia OS is built for this agentic AI era — providing the orchestration infrastructure that 62% of enterprises are actively seeking.",
    relevanceTh:
      "Delentia OS ถูกสร้างมาเพื่อยุค agentic AI นี้ — ให้โครงสร้างพื้นฐาน orchestration ที่ 62% ขององค์กรกำลังค้นหา",
    color: "#D4A853",
    stat: "$1.5T",
    statLabelEn: "AI Spending 2025",
    statLabelTh: "การใช้จ่าย AI ปี 2025",
  },
  {
    icon: Shield,
    tagEn: "IEEE Transactions",
    tagTh: "IEEE Transactions",
    titleEn: "Multi-LLM Communication Reduces Bias & Hallucination",
    titleTh: "Multi-LLM Communication ลด Bias และ Hallucination",
    quoteEn:
      "Multi-LLM communication enables collective reduction of bias and hallucinations, outperforming single LLM systems in trust, accuracy, and edge intelligence deployment.",
    quoteTh:
      "การสื่อสารแบบ Multi-LLM ช่วยลด bias และ hallucinations ร่วมกัน — เหนือกว่าระบบ LLM เดี่ยวในด้านความน่าเชื่อถือ ความแม่นยำ และการ deploy edge intelligence",
    sourceEn:
      'Luo, H. et al. (2025). "Toward Edge General Intelligence with Multi-LLM: Architecture, Trust, and Orchestration." IEEE Transactions. Cited by 34.',
    sourceTh:
      'Luo, H. et al. (2025). "Toward Edge General Intelligence with Multi-LLM" — IEEE Transactions. อ้างอิง 34 ครั้ง',
    url: "https://ieeexplore.ieee.org/abstract/document/11175216/",
    relevanceEn:
      "Delentia OS's JITNA Protocol implements exactly this multi-LLM trust architecture — with cryptographic verification at every negotiation step.",
    relevanceTh:
      "JITNA Protocol ของ Delentia OS ใช้สถาปัตยกรรม multi-LLM trust นี้ — พร้อมการยืนยันด้วย cryptography ในทุกขั้นตอนการเจรจา",
    color: "#89B4C8",
    stat: "34",
    statLabelEn: "Citations",
    statLabelTh: "การอ้างอิง",
  },
]

const partners: { name: string; svg: ReactNode }[] = [
  {
    name: "OpenAI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Anthropic",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-6.258 0H11.2L17.8 20h-3.63l-1.36-3.421H6.45L5.09 20H1.49l6.079-16.48zm4.132 9.959L9.44 7.925l-2.261 5.554h4.522z" />
      </svg>
    ),
  },
  {
    name: "Google DeepMind",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 2.571c2.584 0 4.922.975 6.685 2.572l-2.36 2.36A6.81 6.81 0 0 0 12 5.571a6.858 6.858 0 0 0-6.858 6.858c0 1.904.78 3.625 2.033 4.874L4.82 19.657A9.388 9.388 0 0 1 2.57 12c0-5.205 4.224-9.429 9.43-9.429zm6.858 3.773A9.396 9.396 0 0 1 21.429 12c0 5.205-4.224 9.429-9.429 9.429a9.396 9.396 0 0 1-6.284-2.414l2.354-2.354A6.81 6.81 0 0 0 12 18.858a6.858 6.858 0 0 0 6.858-6.858 6.81 6.81 0 0 0-2.354-5.183z" />
      </svg>
    ),
  },
  {
    name: "Meta AI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.186.325.37.65.556.974l2.35 4.143c.74 1.303 1.513 2.285 2.396 2.895.985.68 2.08 1.018 3.503 1.018 1.741 0 3.155-.726 4.098-2.06.436-.613.658-1.258.772-1.98.114-.72.114-1.498 0-2.32-.114-.82-.436-1.68-.954-2.55C23.5 8.5 22.14 7 20.535 7c-1.47 0-2.75.816-3.787 2.08-.698.855-1.224 1.836-1.695 2.753l-.337.643-.337-.643c-.471-.917-.997-1.898-1.695-2.753C11.647 7.816 10.367 7 8.897 7c-.68 0-1.317.218-1.897.625A4.945 4.945 0 0 0 6.915 8.03V4.03zm0 3.077c.67 0 1.3.28 1.878.788.63.555 1.133 1.3 1.59 2.07l.203.35c.407.706.773 1.355 1.14 1.98l-1.394 2.47c-.74 1.303-1.36 2.18-1.897 2.77-.537.59-1.013.84-1.52.84-.81 0-1.37-.37-1.798-1.08-.185-.32-.317-.698-.399-1.13-.08-.433-.115-.94-.115-1.51 0-2.074.537-4.118 1.457-5.6.47-.752.955-1.948 1.855-1.948zm13.62 0c.9 0 1.385 1.196 1.855 1.949.92 1.481 1.457 3.525 1.457 5.599 0 .57-.035 1.077-.115 1.51-.082.432-.214.81-.399 1.13-.428.71-.988 1.08-1.797 1.08-.508 0-.984-.25-1.52-.84-.538-.59-1.158-1.467-1.897-2.77l-1.394-2.47c.367-.625.733-1.274 1.14-1.98l.203-.35c.457-.77.96-1.515 1.59-2.07.578-.508 1.207-.788 1.877-.788z" />
      </svg>
    ),
  },
  {
    name: "Mistral AI",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zM13.333 0h4v4h-4zm6.667 0h4v4h-4zm-6.667 6.667h4v4h-4zm6.667 0h4v4h-4zM0 13.333h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zM0 20h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm6.667 0h4v4h-4z" />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0a12 12 0 1 0 0 24A12 12 0 0 0 12 0zm0 22.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21zm-3.75-12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-3.75 8.25c-2.25 0-4.12-1.38-4.88-3.375h9.75C16.12 17.37 14.25 18.75 12 18.75z" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M3.75 6a2.25 2.25 0 1 0 0 4.5A2.25 2.25 0 0 0 3.75 6zm10.5 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zm-5.25 1.5h1.5v9h-1.5V7.5zm-6-1.25H1.5V4.5h1.5v1.75zm6 .75h1.5V4.5h-1.5V7zm6.75-.25H14.25V4.5h1.5v2.25zm-12 4H1.5v1.5h1.5v-1.5zm12 0h-1.5v1.5h1.5v-1.5zm-6 2.25H7.5V18H9v-4.5zm1.5 0H12V18h-1.5v-4.5z" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 22.525H0L12 1.475z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
]

const PIXEL_EVIDENCE = pixelIcons.evidence

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function EvidenceSection() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const prefersReducedMotion = useReducedMotion()
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()

  return (
    <section
      className="relative overflow-hidden border-t border-border bg-transparent py-16 md:py-24 transition-colors duration-300"
      aria-label="Research Evidence and Partners"
    >
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--sage absolute -left-28 top-12 h-80 w-80 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--terra homepage-ambient-orb--slow absolute right-[4%] bottom-12 h-72 w-72 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_26%,rgba(196,116,91,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_28%,rgba(196,116,91,0.03)_100%)]" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 mb-4 rounded-full border border-[#eadfd2] bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground shadow-[0_8px_18px_rgba(84,61,31,0.04)] dark:border-border/70 dark:bg-card/75">
            <BookOpen size={12} />
            {isTh ? "หลักฐานเชิงวิจัย" : "Research-Backed Evidence"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 flex items-center justify-center gap-3 text-foreground">
            <Image
              src={PIXEL_EVIDENCE}
              alt=""
              width={48}
              height={48}
              className="inline-block w-10 h-10 sm:w-12 sm:h-12 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="inline-flex items-baseline gap-2">
              <span className="font-semibold" style={{ color: "#7B9E87" }}>
                {isTh ? "พิสูจน์แล้ว" : "Proven"}
              </span>
              <span>{isTh ? "ด้วยงานวิจัย" : "by Research"}</span>
            </span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">
            {isTh
              ? "หลักการของ Delentia OS ได้รับการสนับสนุนจากงานวิจัยระดับสากลที่ผ่านการ peer-review และรายงานอุตสาหกรรมชั้นนำ"
              : "Delentia OS's principles are supported by peer-reviewed research and leading industry reports from trusted institutions."}
          </p>
        </m.div>

        {/* Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {evidenceCards.map((card, i) => {
            const Icon = card.icon
            return (
              <m.div
                key={i}
                {...cardSpotlight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.44, delay: i * 0.10, ease: [0.22, 1, 0.36, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.008 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.996 }}
                className="main-page-reactive-card group relative flex h-full flex-col rounded-3xl border border-border bg-white/90 p-6 transition-[transform,border-color,box-shadow,background-color] duration-300 hover:border-warm-amber/30 hover:bg-white dark:bg-card/90 dark:hover:bg-card"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.12),transparent_40%)]" />
                </div>

                <div className="relative z-10 mb-5 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-warm-amber/18 bg-[#fffaf6] text-muted-foreground shadow-[0_10px_20px_rgba(84,61,31,0.04)] transition-transform duration-300 group-hover:scale-105 dark:bg-[#241c14]">
                      <Icon size={16} />
                    </div>
                    <span className="inline-flex min-w-0 items-center rounded-full border border-[#eee2d6] bg-[#fffaf6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:border-border dark:bg-secondary/55">
                      {isTh ? card.tagTh : card.tagEn}
                    </span>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-[#eadfd2] bg-white/92 px-3 py-2 text-right shadow-[0_10px_20px_rgba(84,61,31,0.04)] dark:bg-background/70 dark:border-border/70">
                    <div
                      className="text-lg font-bold font-mono leading-none"
                      style={{ color: card.color }}
                    >
                      {card.stat}
                    </div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      {isTh ? card.statLabelTh : card.statLabelEn}
                    </div>
                  </div>
                </div>

                <h3 className="relative z-10 mb-4 text-base font-bold leading-snug text-foreground">
                  {isTh ? card.titleTh : card.titleEn}
                </h3>

                <blockquote className="relative z-10 mb-4 border-l-2 border-warm-amber/30 pl-3 text-xs leading-relaxed text-muted-foreground">
                  {isTh ? card.quoteTh : card.quoteEn}
                </blockquote>

                <div className="relative z-10 mb-5 rounded-xl border border-[#eee2d6] bg-[#fffaf6] px-3.5 py-3 text-[11px] leading-relaxed text-muted-foreground dark:border-border dark:bg-secondary/55">
                  <span className="font-semibold">Delentia OS:</span>{" "}
                  {isTh ? card.relevanceTh : card.relevanceEn}
                </div>

                <div className="relative z-10 mt-auto flex items-start gap-2 border-t border-dashed border-border pt-4">
                  <BookOpen
                    size={12}
                    className="mt-0.5 shrink-0 text-muted-foreground"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] leading-relaxed mb-1 text-muted-foreground">
                      {isTh ? card.sourceTh : card.sourceEn}
                    </p>
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold transition-colors hover:underline"
                      style={{ color: card.color }}
                    >
                      {isTh ? "อ่านงานวิจัยต้นฉบับ" : "Read Original Research"}
                      <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              </m.div>
            )
          })}
        </div>

        {/* Partner compatibility grid */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6 text-muted-foreground">
            {isTh ? "เทคโนโลยีที่รองรับ" : "Compatible Technologies"}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <m.div
                key={partner.name}
                {...cardSpotlight}
                whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                className="main-page-reactive-card flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 transition-[border-color,background-color,box-shadow] hover:border-warm-amber/30 hover:bg-white dark:bg-card dark:hover:bg-card"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#eee2d6] bg-[#fffaf6] text-muted-foreground transition-colors hover:text-foreground dark:border-border dark:bg-secondary">
                  {partner.svg}
                </div>
                <span className="truncate text-sm font-medium text-muted-foreground">{partner.name}</span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}
