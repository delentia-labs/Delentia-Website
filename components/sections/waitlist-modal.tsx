"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { submitWaitlistAction } from "@/lib/auth/waitlist-action"
import { Terminal, RefreshCw, CheckCircle, AlertCircle, FileText, ExternalLink } from "lucide-react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  locale: "en" | "th"
}

export function WaitlistModal({ isOpen, onClose, locale }: WaitlistModalProps) {
  const isTh = locale === "th"
  const [currentStep, setCurrentStep] = useState<"email" | "intent" | "constraint" | "infra" | "processing" | "success" | "error">("email")
  const [email, setEmail] = useState("")
  const [intent, setIntent] = useState("")
  const [constraint, setConstraint] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Terminal log lines
  const [logs, setLogs] = useState<string[]>([])
  const terminalEndRef = useRef<HTMLDivElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const intentInputRef = useRef<HTMLInputElement>(null)
  const selectionInputRef = useRef<HTMLInputElement>(null)

  const startBootSequence = () => {
    setIsTyping(true)
    setCurrentStep("email")
    setEmail("")
    setIntent("")
    setConstraint("")
    setErrorMsg("")
    setLogs([])

    const bootSequences = [
      isTh 
        ? "rct@delentia-kernel:~$ ./request_access.sh"
        : "rct@delentia-kernel:~$ ./request_access.sh",
      isTh
        ? "[SYSTEM] เริ่มต้นระบบคัดกรองเจตนาระดับชั้น Kernel..."
        : "[SYSTEM] Initializing Kernel Intent Validation sequence...",
      isTh
        ? "[SYSTEM] สมการควบคุมหลัก: F = D^I * A (Human-in-the-Loop)"
        : "[SYSTEM] Active Equation: F = D^I * A (Human-in-the-Loop)"
    ]

    let currentLineIndex = 0
    let currentCharIndex = 0
    let currentLogs: string[] = []

    const typeNextChar = () => {
      if (currentLineIndex >= bootSequences.length) {
        setIsTyping(false)
        setTimeout(() => emailInputRef.current?.focus(), 100)
        return
      }

      const fullLine = bootSequences[currentLineIndex]
      
      if (currentCharIndex === 0) {
        currentLogs = [...currentLogs, ""]
        setLogs(currentLogs)
      }

      currentLogs[currentLogs.length - 1] = fullLine.substring(0, currentCharIndex + 1)
      setLogs([...currentLogs])

      currentCharIndex++

      if (currentCharIndex >= fullLine.length) {
        currentLineIndex++
        currentCharIndex = 0
        setTimeout(typeNextChar, 180)
      } else {
        setTimeout(typeNextChar, 15)
      }
    }

    setTimeout(typeNextChar, 150)
  }

  useEffect(() => {
    if (isOpen) {
      startBootSequence()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    // Auto scroll terminal to bottom on new log line
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  // Focus input when clicking terminal body
  const handleTerminalClick = () => {
    if (currentStep === "email") {
      emailInputRef.current?.focus()
    } else if (currentStep === "intent") {
      intentInputRef.current?.focus()
    } else if (currentStep === "constraint" || currentStep === "infra") {
      selectionInputRef.current?.focus()
    }
  }

  // Handle email submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(isTh ? "กรุณากรอกอีเมลที่ถูกต้อง" : "Please enter a valid email address.")
      return
    }
    setErrorMsg("")
    
    const domain = email.split("@")[1]?.toLowerCase().trim()
    const freeDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "proton.me", "protonmail.com"]
    const isFree = freeDomains.includes(domain)

    setLogs((prev) => [
      ...prev,
      isTh ? `> ป้อนอีเมล: ${email}` : `> Enter email: ${email}`,
      isTh ? "[CHECK] กำลังตรวจสอบที่อยู่อีเมล..." : "[CHECK] Verifying email address..."
    ])
    
    setTimeout(() => {
      if (isFree) {
        setLogs((prev) => [
          ...prev,
          isTh 
            ? `[SUCCESS] ยอมรับอีเมลทั่วไป (${domain}) -> กำหนดสิทธิ์ระดับผู้พัฒนา (Developer Tier)`
            : `[SUCCESS] General email accepted (${domain}) -> Routing to Developer Tier.`
        ])
      } else {
        setLogs((prev) => [
          ...prev,
          isTh 
            ? `[SUCCESS] ยอมรับอีเมลองค์กร (${domain}) -> กำหนดสิทธิ์ระดับองค์กร (Enterprise Tier)`
            : `[SUCCESS] Corporate email accepted (${domain}) -> Routing to Enterprise Tier.`
        ])
      }
      setCurrentStep("intent")
      setTimeout(() => intentInputRef.current?.focus(), 50)
    }, 600)
  }

  // Handle intent submit
  const handleIntentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (intent.trim().length < 5) {
      setErrorMsg(
        isTh 
          ? "กรุณากรอกเจตนาให้ละเอียดกว่านี้อย่างน้อย 5 ตัวอักษร" 
          : "Intent must be at least 5 characters long."
      )
      return
    }
    setErrorMsg("")
    setLogs((prev) => [
      ...prev,
      `> State primary intent: ${intent}`,
      isTh ? "[SUCCESS] เข้ารหัส Intent Vector เรียบร้อย" : "[SUCCESS] Intent Vector encoded."
    ])
    setCurrentStep("constraint")
    setTimeout(() => selectionInputRef.current?.focus(), 50)
  }

  // Handle Constraint selection
  const handleConstraintSelect = (val: string, label: string) => {
    setConstraint(val)
    setLogs((prev) => [
      ...prev,
      `> Key Constraint: ${label}`
    ])
    setCurrentStep("infra")
    setTimeout(() => selectionInputRef.current?.focus(), 50)
  }

  // Handle Infrastructure selection & submit form
  const handleInfraSelect = async (val: string, label: string) => {
    setLogs((prev) => [
      ...prev,
      `> Target Infrastructure: ${label}`,
      isTh ? "[SYSTEM] กำลังส่งเจตนาไปยังระบบตรวจสอบ FDIA..." : "[SYSTEM] Submitting intent payload to FDIA Evaluator..."
    ])
    setCurrentStep("processing")

    const res = await submitWaitlistAction({
      email,
      primaryIntent: intent,
      keyConstraint: constraint,
      infrastructure: val,
      locale
    })

    if (res.success) {
      setLogs((prev) => [
        ...prev,
        `[SUCCESS] FDIA equation evaluated: F = D^I * A -> VETOED: FALSE`,
        `[SUCCESS] Kernel access approved. Position assigned.`,
        res.message
      ])
      setCurrentStep("success")
    } else {
      setLogs((prev) => [
        ...prev,
        `[FAILED] ${res.error}`
      ])
      setErrorMsg(res.error)
      setCurrentStep("error")
    }
  }

  // Retry logic
  const handleRetry = () => {
    startBootSequence()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-zinc-800 bg-zinc-950 text-[#33ff33] font-mono shadow-2xl rounded-xl z-50">
        <DialogTitle className="sr-only">Request Kernel Access</DialogTitle>
        
        {/* macOS Style Bar */}
        <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-900/60 px-4 py-2.5 select-none">
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={onClose} className="h-3 w-3 rounded-full bg-[#ff5f56] hover:brightness-75 transition-all" aria-label="Close" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1">
            <Terminal size={11} className="text-zinc-500" />
            request_access.sh
          </div>
          <div className="w-10" />
        </div>

        {/* Terminal Body */}
        <div 
          onClick={handleTerminalClick}
          className="h-[340px] overflow-y-auto p-5 text-xs space-y-2 cursor-text scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800"
        >
          {logs.map((line, idx) => {
            let color = "text-[#33ff33]"
            if (line.startsWith("[FAILED]") || line.startsWith("Error:")) {
              color = "text-red-500 font-bold"
            } else if (line.startsWith("[SUCCESS]")) {
              color = "text-emerald-400 font-bold"
            } else if (line.startsWith("[SYSTEM]") || line.startsWith("[CHECK]")) {
              color = "text-zinc-400"
            } else if (line.startsWith(">")) {
              color = "text-[#D4A853]"
            }
            const isLastLine = idx === logs.length - 1
            return (
              <div key={idx} className={`${color} leading-relaxed break-words flex items-center`}>
                <span>{line}</span>
                {isLastLine && isTyping && (
                  <span className="inline-block h-3.5 w-1.5 bg-[#33ff33] ml-1.5 animate-pulse" />
                )}
              </div>
            )
          })}

          {/* Form Step Renderers */}
          {currentStep === "email" && !isTyping && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[#D4A853] font-bold">&gt;</span>
                <span className="text-zinc-300">
                  {isTh ? "ป้อนที่อยู่อีเมลของคุณ (Email Address):" : "Enter your email address:"}
                </span>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrorMsg("")
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-[#33ff33] caret-[#33ff33] focus:ring-0 p-0"
                  placeholder="name@example.com"
                  autoFocus
                  autoComplete="off"
                />
              </div>
              {errorMsg && (
                <div className="text-red-500 flex items-center gap-1 text-[11px] animate-pulse">
                  <AlertCircle size={12} /> {errorMsg}
                </div>
              )}
            </form>
          )}

          {currentStep === "intent" && (
            <form onSubmit={handleIntentSubmit} className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[#D4A853] font-bold">&gt;</span>
                <span className="text-zinc-300">
                  {isTh ? "วัตถุประสงค์หลัก (Primary Intent):" : "State primary intent:"}
                </span>
                <input
                  ref={intentInputRef}
                  type="text"
                  value={intent}
                  onChange={(e) => {
                    setIntent(e.target.value)
                    setErrorMsg("")
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-[#33ff33] caret-[#33ff33] focus:ring-0 p-0"
                  placeholder={isTh ? "เช่น ป้องกัน LLM Hallucination ระดับองค์กร" : "e.g., enterprise hallucination filtering"}
                  autoFocus
                  autoComplete="off"
                />
              </div>
              {errorMsg && (
                <div className="text-red-500 flex items-center gap-1 text-[11px] animate-pulse">
                  <AlertCircle size={12} /> {errorMsg}
                </div>
              )}
            </form>
          )}

          {currentStep === "constraint" && (
            <div className="space-y-2 pt-2">
              <div className="text-zinc-300">
                {isTh 
                  ? "> เลือกเงื่อนไขข้อจำกัดหลัก (Key Constraint):" 
                  : "> Select key constraint:"}
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-sm">
                {[
                  { key: "PDPA", label: isTh ? "[1] PDPA / ความเป็นส่วนตัว" : "[1] PDPA & Sovereignty" },
                  { key: "Hallucination", label: isTh ? "[2] ลดการหลอน (Hallucination)" : "[2] Hallucination Rate" },
                  { key: "Local-AI", label: isTh ? "[3] ระบบปิดออฟไลน์ (Local AI)" : "[3] Offline Local Execution" },
                  { key: "Cost", label: isTh ? "[4] ควบคุมต้นทุน (Cost Control)" : "[4] Token Cost Management" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleConstraintSelect(item.key, item.key)}
                    className="text-left py-1.5 px-3 rounded border border-zinc-800 bg-zinc-900/40 hover:border-warm-amber hover:bg-warm-amber/10 text-xs text-[#33ff33] transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === "infra" && (
            <div className="space-y-2 pt-2">
              <div className="text-zinc-300">
                {isTh 
                  ? "> เลือกสภาพแวดล้อมระบบ (Target Infrastructure):" 
                  : "> Select target infrastructure:"}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "Docker", label: "[1] Docker" },
                  { key: "Kubernetes", label: "[2] Kubernetes" },
                  { key: "Air-Gapped", label: isTh ? "[3] ระบบปิด Air-Gapped" : "[3] Air-Gapped" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleInfraSelect(item.key, item.key)}
                    className="text-left py-1.5 px-2.5 rounded border border-zinc-800 bg-zinc-900/40 hover:border-warm-amber hover:bg-warm-amber/10 text-xs text-[#33ff33] transition-all cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === "processing" && (
            <div className="flex items-center gap-2 pt-3 text-zinc-400">
              <RefreshCw className="h-4 w-4 animate-spin text-[#33ff33]" />
              <span>{isTh ? "กำลังประมวลผลสมการ FDIA..." : "Solving intent check vector..."}</span>
            </div>
          )}

          {currentStep === "success" && (
            <div className="space-y-4 pt-3 border-t border-zinc-900">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span>{isTh ? "สิทธิ์การตรวจสอบผ่านเกณฑ์ Kernel!" : "Kernel Verification Complete!"}</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                {isTh 
                  ? "ระบบได้เข้ารหัสโปรไฟล์และเจตนาของคุณเข้าสู่บัญชี Kernel เรียบร้อย ทีมสถาปนิกจะตรวจสอบ Use-case และส่งรหัสผ่านสิทธิ์ให้ทางอีเมลองค์กรของคุณ"
                  : "Your corporate credentials and intent vectors have been locked into the registry. The Architect will review and deliver access coordinates via your corporate email."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="flex items-center justify-center gap-1.5 rounded border border-zinc-800 bg-zinc-950 text-zinc-500 py-2 px-4 text-xs select-none">
                  <FileText size={14} />
                  {isTh ? "เอกสารอยู่ระหว่างปรับปรุงใหม่ (Under Review)" : "Whitepaper Under Review"}
                </div>
                <a
                  href="https://huggingface.co/spaces/Delentia/delentia-trace-ecosystem"
                  className="flex items-center justify-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 py-2 px-4 text-xs transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={14} />
                  {isTh ? "ทดสอบ Sandbox บน Spaces" : "Run HuggingFace Sandbox"}
                </a>
              </div>
            </div>
          )}

          {currentStep === "error" && (
            <div className="space-y-4 pt-3 border-t border-zinc-900">
              <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{isTh ? "การตรวจสอบสิทธิ์ล้มเหลว" : "Validation Veto Triggered"}</span>
              </div>
              <p className="text-red-400/90 text-[11px] leading-relaxed">
                {errorMsg}
              </p>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 rounded bg-red-950/80 hover:bg-red-900/80 text-red-200 border border-red-800/60 py-1.5 px-4 text-xs transition cursor-pointer"
              >
                <RefreshCw size={12} />
                {isTh ? "ลองใหม่อีกครั้ง" : "Reboot Session"}
              </button>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Status Line */}
        <div className="border-t border-zinc-900 bg-zinc-950/80 px-4 py-2 text-[10px] text-zinc-500 flex items-center justify-between select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#33ff33] animate-pulse" />
            <span>SESSION_ACTIVE</span>
          </div>
          <div>UTF-8</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
