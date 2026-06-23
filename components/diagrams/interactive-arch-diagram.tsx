"use client"

import { useState } from "react"
import { m, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  ChevronDown,
  Server,
  Database,
  Shield,
  Cpu,
  Layers,
  Brain,
  BarChart3,
  Layout,
  Briefcase,
  Cloud,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface LayerItem {
  id: number
  name: string
  desc: string
  icon: typeof Server
  microservices: string[]
  tech: string[]
}

const layersData: Record<"en" | "th", LayerItem[]> = {
  en: [
    { id: 10, name: "Solutions & Services", icon: Cloud, desc: "SaaS, enterprise applications, and packaged solutions delivered to end users.", microservices: ["Delentia Labs Platform", "Specialist Studio", "Marketplace", "Enterprise Apps"], tech: ["Next.js", "React", "Vercel"] },
    { id: 9, name: "Business Logic & Workflow", icon: Briefcase, desc: "Workflow orchestration, process automation, and domain logic coordination.", microservices: ["Workflow Orchestrator", "MOIP Planner", "Constraint Solver", "Reflexion Agent"], tech: ["BPMN", "State Machines", "Event-Driven"] },
    { id: 8, name: "User Interface & Experience", icon: Layout, desc: "Dashboards, control surfaces, and interaction systems across channels.", microservices: ["Hydra Browser", "Console Integration", "UIA Integrations"], tech: ["React 19", "Tailwind CSS", "Framer Motion"] },
    { id: 7, name: "AI & Machine Learning", icon: Brain, desc: "Inference, cognition, generation, and model coordination at the intelligence core.", microservices: ["Reasoning Engine", "Intent Router", "Planning Systems", "Adaptive Learning"], tech: ["Global Models", "Regional Models", "Thai Models", "PyTorch"] },
    { id: 6, name: "Data & Analytics", icon: BarChart3, desc: "Benchmarking, stream processing, and decision analytics over live system signals.", microservices: ["Data Fusion", "Benchmark Suite", "Confidence Scoring"], tech: ["Pandas", "Kafka", "Redis Streams"] },
    { id: 5, name: "Application & Middleware", icon: Layers, desc: "Gateways, APIs, and service-to-service coordination across the platform.", microservices: ["Gateway API", "Kernel API", "Slack Gateway", "API Proxy"], tech: ["FastAPI", "Express", "gRPC", "MCP"] },
    { id: 4, name: "Operating Systems", icon: Cpu, desc: "Runtime control, autoscaling, and execution environment management.", microservices: ["Kernel", "HRM Controller", "Adaptive Timeout", "Halting Detection"], tech: ["Docker", "Kubernetes", "Linux"] },
    { id: 3, name: "Network & Security", icon: Shield, desc: "Verification, IAM, encryption, and policy enforcement across the stack.", microservices: ["SignedAI", "GIGO Protection", "Observability"], tech: ["SHA-256", "JWT", "OAuth 2.0"] },
    { id: 2, name: "Data Management", icon: Database, desc: "Persistent memory, vector search, graph retrieval, and structured storage.", microservices: ["RCTDB", "Vector Search", "GraphRAG", "MemoryRAG"], tech: ["PostgreSQL", "Pinecone", "Neo4j"] },
    { id: 1, name: "Infrastructure & Hardware", icon: Server, desc: "Compute, storage, load balancing, and edge delivery foundations.", microservices: ["Compute Cluster", "Object Storage", "CDN Edge", "Load Balancer"], tech: ["AWS", "Cloudflare", "Vercel Edge"] },
  ],
  th: [
    { id: 10, name: "Solutions & Services", icon: Cloud, desc: "SaaS, แอปองค์กร และโซลูชันสำเร็จรูปที่ผู้ใช้ปลายทางใช้งานจริง", microservices: ["Delentia Labs Platform", "Specialist Studio", "Marketplace", "Enterprise Apps"], tech: ["Next.js", "React", "Vercel"] },
    { id: 9, name: "Business Logic & Workflow", icon: Briefcase, desc: "การประสาน workflow, process automation และตรรกะโดเมนธุรกิจ", microservices: ["Workflow Orchestrator", "MOIP Planner", "Constraint Solver", "Reflexion Agent"], tech: ["BPMN", "State Machines", "Event-Driven"] },
    { id: 8, name: "User Interface & Experience", icon: Layout, desc: "แดชบอร์ด พื้นที่ควบคุม และระบบปฏิสัมพันธ์ข้ามหลายช่องทาง", microservices: ["Hydra Browser", "Console Integration", "UIA Integrations"], tech: ["React 19", "Tailwind CSS", "Framer Motion"] },
    { id: 7, name: "AI & Machine Learning", icon: Brain, desc: "Inference, cognition, generation และการประสาน model ที่เป็นแกนปัญญาของระบบ", microservices: ["Reasoning Engine", "Intent Router", "Planning Systems", "Adaptive Learning"], tech: ["Global Models", "Regional Models", "Thai Models", "PyTorch"] },
    { id: 6, name: "Data & Analytics", icon: BarChart3, desc: "Benchmarking, stream processing และ decision analytics จากสัญญาณระบบแบบสด", microservices: ["Data Fusion", "Benchmark Suite", "Confidence Scoring"], tech: ["Pandas", "Kafka", "Redis Streams"] },
    { id: 5, name: "Application & Middleware", icon: Layers, desc: "Gateways, APIs และการเชื่อมต่อ service-to-service ของแพลตฟอร์ม", microservices: ["Gateway API", "Kernel API", "Slack Gateway", "API Proxy"], tech: ["FastAPI", "Express", "gRPC", "MCP"] },
    { id: 4, name: "Operating Systems", icon: Cpu, desc: "การควบคุม runtime, autoscaling และสภาพแวดล้อมการประมวลผล", microservices: ["Kernel", "HRM Controller", "Adaptive Timeout", "Halting Detection"], tech: ["Docker", "Kubernetes", "Linux"] },
    { id: 3, name: "Network & Security", icon: Shield, desc: "Verification, IAM, encryption และการบังคับใช้นโยบายความปลอดภัยทั้งระบบ", microservices: ["SignedAI", "GIGO Protection", "Observability"], tech: ["SHA-256", "JWT", "OAuth 2.0"] },
    { id: 2, name: "Data Management", icon: Database, desc: "Persistent memory, vector search, graph retrieval และ structured storage", microservices: ["RCTDB", "Vector Search", "GraphRAG", "MemoryRAG"], tech: ["PostgreSQL", "Pinecone", "Neo4j"] },
    { id: 1, name: "Infrastructure & Hardware", icon: Server, desc: "Compute, storage, load balancing และ edge delivery ที่เป็นรากฐานทั้งหมด", microservices: ["Compute Cluster", "Object Storage", "CDN Edge", "Load Balancer"], tech: ["AWS", "Cloudflare", "Vercel Edge"] },
  ],
}

const colorMap: Record<number, { color: string; bg: string; darkBg: string }> = {
  10: { color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15" },
  9: { color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15" },
  8: { color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15" },
  7: { color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15" },
  6: { color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15" },
  5: { color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A" },
  4: { color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A" },
  3: { color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25" },
  2: { color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25" },
  1: { color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25" },
}

export default function InteractiveArchDiagram({ language = "en" }: { language?: "en" | "th" }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const layers = layersData[language]
  const [expandedLayer, setExpandedLayer] = useState<number | null>(7)
  const [focusedIndex, setFocusedIndex] = useState(0)

  return (
    <div
      onKeyDown={(event) => {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault()
            setFocusedIndex((prev) => Math.min(prev + 1, layers.length - 1))
            break
          case "ArrowUp":
            event.preventDefault()
            setFocusedIndex((prev) => Math.max(prev - 1, 0))
            break
          case "Enter":
          case " ":
            event.preventDefault()
            setExpandedLayer((prev) => (prev === layers[focusedIndex].id ? null : layers[focusedIndex].id))
            break
          case "Escape":
            event.preventDefault()
            setExpandedLayer(null)
            break
        }
      }}
      className={`rounded-2xl border p-4 sm:p-5 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray shadow-[0_8px_30px_rgba(0,0,0,0.06)]"}`}
      role="application"
      aria-label="Interactive 10-layer architecture explorer"
      tabIndex={0}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            {language === "en" ? "Interactive Layer Explorer" : "ตัวสำรวจ Layer แบบโต้ตอบ"}
          </h3>
          <p className={`mt-1 text-xs ${isDark ? "text-warm-subtle" : "text-warm-secondary"}`}>
            {language === "en" ? "Use arrow keys or click a layer to inspect the stack." : "ใช้ปุ่มลูกศรหรือคลิกเพื่อดูรายละเอียดแต่ละชั้น"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider">
          <span className="rounded-full px-2 py-1 text-warm-sage bg-warm-sage/10">L1-L3 Foundation</span>
          <span className="rounded-full px-2 py-1 text-warm-amber bg-warm-amber/10">L4-L7 Platform</span>
          <span className="rounded-full px-2 py-1 text-warm-terracotta bg-warm-terracotta/10">L8-L10 Solutions</span>
        </div>
      </div>

      <div className="space-y-2">
        {layers.map((layer, index) => {
          const colors = colorMap[layer.id]
          const LayerIcon = layer.icon
          const isExpanded = expandedLayer === layer.id
          return (
            <m.div
              key={layer.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={prefersReducedMotion ? undefined : { duration: 0.2, delay: index * 0.015 }}
            >
              <button
                type="button"
                onClick={() => {
                  setExpandedLayer(isExpanded ? null : layer.id)
                  setFocusedIndex(index)
                }}
                onFocus={() => setFocusedIndex(index)}
                aria-expanded={isExpanded}
                className={`w-full rounded-xl border text-left transition-all duration-300 ${
                  isExpanded
                    ? "border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                    : isDark
                      ? "border-border bg-dark-900 hover:border-dark-border-hard"
                      : "border-warm-light-gray bg-warm-cream/60 hover:border-warm-light"
                }`}
                style={isExpanded ? { backgroundColor: isDark ? colors.darkBg : colors.bg } : undefined}
              >
                <div className="flex items-center gap-3 p-3.5">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: isExpanded ? "rgba(255,255,255,0.85)" : isDark ? colors.darkBg : colors.bg, color: colors.color }}
                  >
                    <LayerIcon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="rounded px-1.5 py-0.5 font-mono text-[10px] font-bold" style={{ backgroundColor: isExpanded ? "rgba(255,255,255,0.85)" : isDark ? colors.darkBg : colors.bg, color: colors.color }}>
                        L{layer.id}
                      </span>
                      <span className={`truncate text-sm font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{layer.name}</span>
                    </div>
                    <p className={`truncate text-xs ${isDark ? "text-warm-dim-alt" : "text-warm-secondary"}`}>{layer.desc}</p>
                  </div>
                  <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${isDark ? "text-warm-subtle" : "text-warm-gray"}`} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <m.div
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? { height: 0, opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/20 px-3.5 pb-3.5 pt-2.5">
                        <p className={`mb-3 text-sm leading-relaxed ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{layer.desc}</p>
                        <div className="mb-3">
                          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.color }}>
                            {language === "en" ? "Microservices" : "Microservices"}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {layer.microservices.map((service) => (
                              <span key={service} className="rounded-lg border px-2.5 py-1 text-xs font-medium" style={{ borderColor: `${colors.color}40`, backgroundColor: "rgba(255,255,255,0.76)", color: colors.color }}>
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: colors.color }}>
                            Tech Stack
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {layer.tech.map((tech) => (
                              <span key={tech} className={`rounded px-2 py-0.5 text-[10px] font-mono ${isDark ? "bg-black/20 text-warm-light-gray" : "bg-white/80 text-warm-charcoal"}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </button>
            </m.div>
          )
        })}
      </div>
    </div>
  )
}