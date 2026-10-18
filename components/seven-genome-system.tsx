"use client"

import { m, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Genome {
  id: number
  name: string
  nameTh: string
  description: string
  descriptionTh: string
  color: string
  icon: string
  dna: string
}

const genomes: Genome[] = [
  {
    id: 1,
    name: "Architect",
    nameTh: "สถาปนิก",
    description: "System design and structural planning. Defines the 10-layer architecture and component relationships.",
    descriptionTh: "ออกแบบระบบและวางแผนโครงสร้าง กำหนดสถาปัตยกรรม 10 ชั้นและความสัมพันธ์ของคอมโพเนนต์",
    color: "#3b82f6",
    icon: "Building2",
    dna: "ATCG-AI-ARCH"
  },
  {
    id: 2,
    name: "ARTENT",
    nameTh: "ARTENT",
    description: "Attention-Representation-Training Engine. Manages model attention mechanisms and training pipelines.",
    descriptionTh: "Attention-Representation-Training Engine จัดการกลไก attention ของโมเดลและ training pipelines",
    color: "#8b5cf6",
    icon: "Brain",
    dna: "ATCG-AT-TRAIN"
  },
  {
    id: 3,
    name: "JITNA",
    nameTh: "JITNA",
    description: "Just-In-Time Natural Action. Intent specification language for precise AI behavior definition.",
    descriptionTh: "Just-In-Time Natural Action ภาษาระบุเจตนาสำหรับการกำหนดพฤติกรรม AI อย่างแม่นยำ",
    color: "#10b981",
    icon: "MessageSquare",
    dna: "ATCG-JITNA-ACT"
  },
  {
    id: 4,
    name: "Codex",
    nameTh: "Codex",
    description: "Knowledge encoding and rule storage. Contains the 10 Codices governing AI behavior.",
    descriptionTh: "การเข้ารหัสความรู้และการจัดเก็บกฎ ประกอบด้วย 10 Codices ที่ควบคุมพฤติกรรม AI",
    color: "#f59e0b",
    icon: "BookOpen",
    dna: "ATCG-CODEX-10C"
  },
  {
    id: 5,
    name: "SignedAI",
    nameTh: "SignedAI",
    description: "Verification by independent votes with a signed verdict (jury runner built; scoring is an idea).",
    descriptionTh: "การตรวจสอบด้วยการลงคะแนนอิสระพร้อมคำตัดสินที่ลงนาม (สร้างตัวรันคณะลูกขุนแล้ว ส่วนการให้คะแนนเป็นแนวคิด)",
    color: "#ef4444",
    icon: "Shield",
    dna: "ATCG-SIGN-AI"
  },
  {
    id: 6,
    name: "RCT Knowledge Vault",
    nameTh: "RCT Knowledge Vault",
    description: "Secure memory storage with quantum-resistant encryption. Stores sensitive context and credentials.",
    descriptionTh: "การจัดเก็บหน่วยความจำอย่างปลอดภัยด้วยการเข้ารหัสที่ทนต่อควอนตัม จัดเก็บบริบทที่ละเอียดอ่อนและข้อมูลประจำตัว",
    color: "#6366f1",
    icon: "Lock",
    dna: "ATCG-VAULT-RKV"
  },
  {
    id: 7,
    name: "RCT-7",
    nameTh: "RCT-7",
    description: "7-step process for intent-driven system development. From extraction to continuous refinement.",
    descriptionTh: "กระบวนการ 7 ขั้นตอนสำหรับการพัฒนาระบบที่ขับเคลื่อนด้วยเจตนา จากการสกัดถึงการปรับปรุงต่อเนื่อง",
    color: "#ec4899",
    icon: "GitBranch",
    dna: "ATCG-RCT7-PROC"
  }
]

export function SevenGenomeSystem({ locale = "en" }: { locale?: "en" | "th" }) {
  const [activeGenome, setActiveGenome] = useState<number | null>(null)
  const [hoveredGenome, setHoveredGenome] = useState<number | null>(null)

  const t = (en: string, th: string) => locale === "th" ? th : en

  const centerX = 200
  const centerY = 200
  const radius = 140

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {t("7 Genome System", "ระบบ 7 จีโนม")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t(
            "The complete DNA of RCT Ecosystem — each genome represents a fundamental capability that together form the constitutional AI operating system",
            "DNA ที่สมบูรณ์ของ RCT Ecosystem — แต่ละจีโนมเป็นความสามารถพื้นฐานที่รวมกันเป็น AI operating system แบบรัฐธรรมนูญ"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Circular Visualization */}
        <div className="relative aspect-square max-w-md mx-auto">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* DNA Helix Background */}
            <defs>
              <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Connection Lines */}
            {genomes.map((genome, i) => {
              const nextGenome = genomes[(i + 1) % genomes.length]
              const angle1 = (i * 360) / genomes.length - 90
              const angle2 = ((i + 1) * 360) / genomes.length - 90
              const x1 = centerX + radius * Math.cos((angle1 * Math.PI) / 180)
              const y1 = centerY + radius * Math.sin((angle1 * Math.PI) / 180)
              const x2 = centerX + radius * Math.cos((angle2 * Math.PI) / 180)
              const y2 = centerY + radius * Math.sin((angle2 * Math.PI) / 180)

              return (
                <m.line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={genome.color}
                  strokeWidth={hoveredGenome === genome.id || hoveredGenome === nextGenome.id ? 3 : 1}
                  strokeOpacity={0.4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              )
            })}

            {/* Center Hub */}
            <m.circle
              cx={centerX}
              cy={centerY}
              r={50}
              fill="url(#helixGradient)"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <m.text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-foreground font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              RCT DNA
            </m.text>

            {/* Genome Nodes */}
            {genomes.map((genome, i) => {
              const angle = (i * 360) / genomes.length - 90
              const x = centerX + radius * Math.cos((angle * Math.PI) / 180)
              const y = centerY + radius * Math.sin((angle * Math.PI) / 180)

              const isActive = activeGenome === genome.id
              const isHovered = hoveredGenome === genome.id

              return (
                <g key={genome.id}>
                  {/* Connection to center */}
                  <m.line
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={genome.color}
                    strokeWidth={isHovered || isActive ? 2 : 1}
                    strokeOpacity={0.2}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />

                  {/* Genome Circle */}
                  <m.circle
                    cx={x}
                    cy={y}
                    r={isHovered || isActive ? 35 : 30}
                    fill={genome.color}
                    fillOpacity={isHovered || isActive ? 0.2 : 0.1}
                    stroke={genome.color}
                    strokeWidth={isHovered || isActive ? 3 : 2}
                    className="cursor-pointer transition-all duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}
                    onMouseEnter={() => setHoveredGenome(genome.id)}
                    onMouseLeave={() => setHoveredGenome(null)}
                    onClick={() => setActiveGenome(isActive ? null : genome.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />

                  {/* Genome Number */}
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold pointer-events-none"
                    fill={genome.color}
                  >
                    {genome.id}
                  </text>

                  {/* DNA Label */}
                  <text
                    x={x}
                    y={y + 45}
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground pointer-events-none"
                  >
                    {genome.dna}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {activeGenome ? (
              <m.div
                key={activeGenome}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-lg border bg-card p-6"
              >
                {(() => {
                  const genome = genomes.find(g => g.id === activeGenome)!
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: genome.color }}
                        >
                          {genome.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {t(genome.name, genome.nameTh)}
                          </h3>
                          <p className="text-sm text-muted-foreground font-mono">{genome.dna}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(genome.description, genome.descriptionTh)}
                      </p>
                    </>
                  )
                })()}
              </m.div>
            ) : (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border bg-card p-6"
              >
                <h3 className="font-semibold mb-2 text-foreground">
                  {t("Select a Genome", "เลือกจีโนม")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Click on any genome in the diagram to learn more about its role in the RCT Ecosystem DNA",
                    "คลิกที่จีโนมใดก็ได้ในแผนภาพเพื่อเรียนรู้เพิ่มเติมเกี่ยวกบบทบาทของมันใน DNA ของ RCT Ecosystem"
                  )}
                </p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Genome List */}
          <div className="rounded-lg border bg-card p-4">
            <h4 className="text-sm font-medium mb-3 text-foreground">
              {t("All Genomes", "จีโนมทั้งหมด")}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {genomes.map((genome) => (
                <button
                  key={genome.id}
                  onClick={() => setActiveGenome(activeGenome === genome.id ? null : genome.id)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md text-left transition-colors",
                    activeGenome === genome.id 
                      ? "bg-accent/10 border border-accent/20" 
                      : "hover:bg-muted"
                  )}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: genome.color }}
                  >
                    {genome.id}
                  </div>
                  <span className="text-sm text-foreground">{t(genome.name, genome.nameTh)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
