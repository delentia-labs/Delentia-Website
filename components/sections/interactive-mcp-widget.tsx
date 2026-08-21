"use client"

import { useState } from "react"
import { Terminal, Shield, Zap, CheckCircle2, AlertTriangle, Play, RefreshCw, Lock } from "lucide-react"

interface InteractiveMcpWidgetProps {
  locale?: "en" | "th"
}

export function InteractiveMcpWidget({ locale = "en" }: InteractiveMcpWidgetProps) {
  const isThai = locale === "th"
  const [intentInput, setIntentInput] = useState("Deploy autonomous agent to monitor exchange logs")
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<{
    intentType: string
    shannonEntropy: number
    cordStatus: "CLEAN" | "FLAGGED"
    fdiaD: number
    fdiaI: number
    fdiaA: number
    finalF: number
    isSafe: boolean
    verdict: string
  } | null>({
    intentType: "SYSTEM_TASK_AUTOMATION",
    shannonEntropy: 2.14,
    cordStatus: "CLEAN",
    fdiaD: 0.95,
    fdiaI: 1.0,
    fdiaA: 1.0,
    finalF: 0.95,
    isSafe: true,
    verdict: "APPROVED — Human-in-the-loop Verified (F >= 0.70)",
  })

  const handleEvaluate = () => {
    setIsEvaluating(true)
    setTimeout(() => {
      const lower = intentInput.toLowerCase()
      const isDangerous = lower.includes("delete") || lower.includes("rm -rf") || lower.includes("drop table") || lower.includes("bypass")

      if (isDangerous) {
        setEvaluationResult({
          intentType: "UNAUTHORIZED_DESTRUCTION_ATTEMPT",
          shannonEntropy: 4.89,
          cordStatus: "FLAGGED",
          fdiaD: 0.20,
          fdiaI: 0.85,
          fdiaA: 0.0, // Human Architect VETO
          finalF: 0.0, // F = D^I * A = 0.2^0.85 * 0 = 0
          isSafe: false,
          verdict: "HARD VETO ACTIVATED (A = 0 -> F = 0) — Zero-Delete Gate Enforced",
        })
      } else {
        setEvaluationResult({
          intentType: "ROUTED_COGNITIVE_TASK",
          shannonEntropy: 1.88,
          cordStatus: "CLEAN",
          fdiaD: 0.92,
          fdiaI: 1.0,
          fdiaA: 1.0,
          finalF: 0.92,
          isSafe: true,
          verdict: "APPROVED — FDIA Gate Passed (F = 0.92 >= 0.70 Threshold)",
        })
      }
      setIsEvaluating(false)
    }, 600)
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,168,83,0.06),transparent_70%)] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-3 py-1 font-mono text-xs text-warm-amber mb-3">
          <Terminal className="h-3.5 w-3.5" />
          <span>DELENTIA MCP GATEWAY : PORT 8000</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {isThai ? "ทดลองสั่งงานเคอร์เนลผ่านระบบ FDIA Gate สดๆ" : "Interactive MCP Kernel & FDIA Safety Gate"}
        </h2>
        <p className="mt-2 text-base text-warm-dim max-w-2xl mx-auto">
          {isThai
            ? "ทดสอบส่ง Intent จำลองเพื่อดูการคำนวณสมการ F = D^I * A และการสแกนความปลอดภัย CORD Shannon Entropy ใน <0.6ms"
            : "Simulate an Intent to inspect real-time CORD Shannon Entropy scanning and deterministic FDIA Veto Gate enforcement."}
        </p>
      </div>

      {/* Terminal Widget Card */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#0d0e12] shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-[#16171d] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
            <span className="h-3 w-3 rounded-full bg-green-500/90" />
            <span className="ml-2 font-mono text-xs text-neutral-400">delentia_os_kernel@localhost:8000/mcp</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-6">
          {/* Input Field */}
          <div>
            <label className="block font-mono text-xs text-amber-400 font-semibold mb-2">
              &gt; {isThai ? "ป้อน Intent หรือคำสั่งที่ต้องการทดสอบ:" : "INPUT INTENT / PROMPT:"}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={intentInput}
                onChange={(e) => setIntentInput(e.target.value)}
                placeholder={isThai ? "พิมพ์คำสั่ง เช่น 'Deploy agent' หรือ 'Delete system files'..." : "Type 'Deploy agent' or 'Delete database'..."}
                className="flex-1 rounded-xl border border-neutral-700 bg-[#1a1b22] px-4 py-3 font-mono text-sm text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
              <button
                onClick={handleEvaluate}
                disabled={isEvaluating}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-mono text-sm font-bold text-neutral-950 transition-all hover:bg-amber-300 active:scale-95 disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-current" />
                    <span>Evaluate Gate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluation Dashboard */}
          {evaluationResult && (
            <div className="rounded-xl border border-neutral-800 bg-[#14151b] p-5 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <div className="text-neutral-400 mb-1">CORD Entropy H(X)</div>
                  <div className={`text-base font-bold ${evaluationResult.cordStatus === "CLEAN" ? "text-emerald-400" : "text-rose-400"}`}>
                    {evaluationResult.shannonEntropy} ({evaluationResult.cordStatus})
                  </div>
                </div>

                <div>
                  <div className="text-neutral-400 mb-1">D (Dominance) ^ I</div>
                  <div className="text-base font-bold text-amber-300">
                    {evaluationResult.fdiaD} ^ {evaluationResult.fdiaI}
                  </div>
                </div>

                <div>
                  <div className="text-neutral-400 mb-1">A (Architect Veto)</div>
                  <div className={`text-base font-bold ${evaluationResult.fdiaA === 1 ? "text-emerald-400" : "text-rose-400 font-black"}`}>
                    {evaluationResult.fdiaA === 1 ? "1.0 (APPROVED)" : "0.0 (VETOED)"}
                  </div>
                </div>

                <div>
                  <div className="text-neutral-400 mb-1">Master Score (F)</div>
                  <div className={`text-base font-bold ${evaluationResult.isSafe ? "text-emerald-400" : "text-rose-400"}`}>
                    {evaluationResult.finalF.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Verdict Bar */}
              <div className={`flex items-center gap-2.5 rounded-lg p-3.5 ${evaluationResult.isSafe ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40" : "bg-rose-950/80 text-rose-300 border border-rose-500/40"}`}>
                {evaluationResult.isSafe ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                )}
                <span className="font-semibold text-xs leading-normal">{evaluationResult.verdict}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
