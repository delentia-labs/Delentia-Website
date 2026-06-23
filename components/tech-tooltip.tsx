"use client"

import type { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const definitions = {
  FDIA: {
    en: "FDIA stands for Falsifiability-Driven Iterative Approach, the core reasoning equation behind RCT.",
    th: "FDIA คือ Falsifiability-Driven Iterative Approach ซึ่งเป็นสมการการให้เหตุผลหลักของ RCT",
  },
  JITNA: {
    en: "JITNA is the Just-In-Time Nodal Assembly protocol for composing agentic AI systems.",
    th: "JITNA คือโปรโตคอล Just-In-Time Nodal Assembly สำหรับประกอบระบบ agentic AI",
  },
  "Constitutional AI": {
    en: "Constitutional AI is an approach where model behavior is constrained by explicit principles, policies, and review loops.",
    th: "Constitutional AI คือแนวทางที่กำกับพฤติกรรมโมเดลด้วยหลักการ นโยบาย และวงจรตรวจสอบอย่างชัดเจน",
  },
  RCTDB: {
    en: "RCTDB is the persistent memory layer that stores long-term context, sessions, and structured recall.",
    th: "RCTDB คือเลเยอร์หน่วยความจำถาวรที่เก็บบริบทยาว เซสชัน และข้อมูลสำหรับการเรียกคืนอย่างเป็นระบบ",
  },
  "7 Genome": {
    en: "The 7 Genome System is the set of seven specialized subsystems that coordinate continuous cognitive improvement.",
    th: "7 Genome System คือชุดระบบย่อยเฉพาะทาง 7 ส่วนที่ทำงานร่วมกันเพื่อการพัฒนาเชิงปัญญาอย่างต่อเนื่อง",
  },
} as const

interface TechTooltipProps {
  term: keyof typeof definitions
  language: "en" | "th"
  children?: ReactNode
  className?: string
}

export default function TechTooltip({ term, language, children, className }: TechTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn("inline-flex items-center rounded-sm border-b border-dashed border-warm-amber/60 text-left font-medium text-warm-amber hover:text-warm-amber-light focus-visible:outline-none", className)}
        >
          {children ?? term}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="max-w-xs bg-warm-charcoal text-white dark:bg-white dark:text-warm-charcoal">
        {definitions[term][language]}
      </TooltipContent>
    </Tooltip>
  )
}
