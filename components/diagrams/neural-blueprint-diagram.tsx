"use client"

import { m, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const ACCENT: Record<number, string> = {
  10: "#ef4444",
  9:  "#f97316",
  8:  "#eab308",
  7:  "#22c55e",
  6:  "#14b8a6",
  5:  "#06b6d4",
  4:  "#3b82f6",
  3:  "#6366f1",
  2:  "#a855f7",
  1:  "#ec4899",
}

const LAYERS = [
  { id: 10, name: "Enterprise Hardening",    nameTh: "การป้องกันระดับองค์กร",    badge: "2026.03",           features: ["JWT RS256 Auth", "RBAC Permissions", "CircuitBreaker", "Rate Limiting"],           descEn: "JWT RS256, RBAC, CircuitBreaker — security-first architecture with comprehensive access control and fault tolerance.",         descTh: "JWT RS256, RBAC, CircuitBreaker — สถาปัตยกรรมที่เน้นความปลอดภัย พร้อมการควบคุมการเข้าถึงและความทนทานต่อความผิดพลาด" },
  { id: 9,  name: "Universal Adapter",       nameTh: "Universal Adapter",         badge: "Integration",       features: ["REST API", "GraphQL", "WebSocket", "gRPC"],                                           descEn: "Seamless integration with external systems and APIs through standardized protocols.",                                           descTh: "การผสานรวมกับระบบภายนอก API และบริการของบุคคลที่สามผ่านโปรโตคอลมาตรฐาน" },
  { id: 8,  name: "Regional Language",       nameTh: "Regional Language Adapter", badge: "8 Markets",         features: ["TH/EN/JP/KR/CN", "PDPA Compliance", "Local LLMs", "Cultural Adapt."],                descEn: "Support for 8 markets with localized LLM models and compliance frameworks (PDPA, APPI, PIPA, PIPL).",                          descTh: "รองรับ 8 ตลาดพร้อมโมเดล LLM แบบ localized และกรอบการปฏิบัติตามข้อบังคับ (PDPA, APPI, PIPA, PIPL)" },
  { id: 7,  name: "FloatingAI",              nameTh: "FloatingAI",                badge: "Conversational",    features: ["Conversational AI", "KB Integration", "Context Aware", "Multi-LLM"],                  descEn: "L3 API microservice for conversational AI with real-time context awareness and knowledge-base integration.",                    descTh: "L3 API microservice สำหรับ AI สนทนาพร้อมการรับรู้บริบทแบบ real-time และการผสานรวม knowledge base" },
  { id: 6,  name: "JITNA Protocol",          nameTh: "JITNA Protocol",            badge: "RFC-001",           features: ["Intent Spec", "Validation Rules", "Action Mapping", "Traceability"],                   descEn: "Just-In-Time Natural Action language for precision intent specification, validation, and action traceability.",                  descTh: "ภาษา Just-In-Time Natural Action สำหรับการระบุเจตนาอย่างแม่นยำ การตรวจสอบ และ Traceability" },
  { id: 5,  name: "SignedAI",                nameTh: "SignedAI",                  badge: "0.3% halluc.",      features: ["Multi-LLM Voting", "ED25519 Sign", "Consensus", "Audit Trail"],                        descEn: "Multi-LLM consensus engine with ED25519 cryptographic signatures for verifiable, auditable AI outputs.",                        descTh: "Multi-LLM consensus engine พร้อม ED25519 signatures สำหรับผลลัพธ์ AI ที่ตรวจสอบได้" },
  { id: 4,  name: "RCTDB",                   nameTh: "RCTDB",                     badge: "8D Memory",         features: ["8D Schema", "Delta Compress", "Quantum Encrypt", "Time Travel"],                       descEn: "8-dimensional universal memory schema with Delta Engine compression and quantum-resistant encryption.",                          descTh: "8-dimensional universal memory schema พร้อม Delta Engine compression และ quantum-resistant encryption" },
  { id: 3,  name: "Algorithm Kernel",        nameTh: "Algorithm Kernel",          badge: "41 Algos",          features: ["9 Tiers", "41 Algorithms", "Self-Evolving", "Auto-Optimize"],                          descEn: "41-algorithm framework across 9 tiers — from basic operations to self-evolving adaptive systems.",                               descTh: "กรอบงานอัลกอริทึม 41 ตัวใน 9 tiers ตั้งแต่การดำเนินการพื้นฐานถึงระบบ self-evolving" },
  { id: 2,  name: "Kernel Services",         nameTh: "Kernel Services",           badge: "Runtime Core",      features: ["Memory Mgmt", "Context Switch", "Event Bus", "Process Sched."],                         descEn: "Core infrastructure services: memory management, context switching, event processing, and process scheduling.",                  descTh: "บริการโครงสร้างพื้นฐานหลัก: การจัดการหน่วยความจำ context switching และการประมวลผลเหตุการณ์" },
  { id: 1,  name: "OS Primitives",           nameTh: "OS Primitives",             badge: "Foundation",        features: ["Process Isolation", "Resource Alloc.", "HW Abstraction", "System Calls"],               descEn: "Foundation layer providing process isolation, resource allocation, and hardware abstraction.",                                   descTh: "ชั้นพื้นฐาน: การแยกกระบวนการ การจัดสรรทรัพยากร และ hardware abstraction" },
]

export default function NeuralBlueprintDiagram(_props: Record<string, unknown>) {
  const { language } = useLanguage()
  const isTh = language === "th"
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="w-full max-w-4xl mx-auto select-none px-2">
      {/* 3D wrapper */}
      <div style={{ perspective: "600px" }}>
        <div
          style={{
            transform: "rotateX(14deg)",
            transformOrigin: "center top",
          }}
        >
          {LAYERS.map((layer, i) => {
            const color = ACCENT[layer.id]
            const isOpen = expandedId === layer.id
            return (
              <m.div
                key={layer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.32 }}
                onClick={() => setExpandedId(isOpen ? null : layer.id)}
                className="cursor-pointer mb-1.5 rounded-lg border border-border bg-card/95 overflow-hidden"
                style={{ borderLeftWidth: "3px", borderLeftColor: color }}
                whileHover={{ scale: 1.005, transition: { duration: 0.15 } }}
              >
                {/* Header row */}
                <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold tabular-nums"
                    style={{ background: `${color}22`, color }}
                  >
                    {layer.id}
                  </span>

                  <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">
                      {isTh ? layer.nameTh : layer.name}
                    </span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded font-mono hidden sm:inline"
                      style={{ background: `${color}18`, color }}
                    >
                      {layer.badge}
                    </span>
                  </div>

                  {/* Feature pills (desktop only, collapsed) */}
                  {!isOpen && (
                    <div className="hidden md:flex items-center gap-1 shrink-0">
                      {layer.features.slice(0, 2).map((f) => (
                        <span
                          key={f}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono whitespace-nowrap"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-muted-foreground shrink-0">
                    {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </span>
                </div>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-3 pt-1 border-t border-border">
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                          {isTh ? layer.descTh : layer.descEn}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.features.map((f) => (
                            <span
                              key={f}
                              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                              style={{ background: `${color}14`, color }}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            )
          })}
        </div>
      </div>

      <p className="text-center text-[10px] text-muted-foreground mt-3 font-mono tracking-wide">
        10-Layer Constitutional AI Architecture · Delentia Labs 2026
      </p>
    </div>
  )
}
