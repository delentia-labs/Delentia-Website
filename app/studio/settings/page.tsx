"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Settings,
  Shield,
  Sliders,
  Terminal,
  Lock,
  FileCode,
  Check,
  Save,
  Copy,
  Download,
  AlertTriangle,
  Cpu,
  User,
  Key,
  Globe,
  Plus,
  Trash2,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StudioSidebar } from "@/components/studio/studio-sidebar"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

export default function ArchitectSettingsPage() {
  useRequireAuth()
  const pathname = usePathname()
  const isThai = pathname?.startsWith("/th")

  // 1. Architect Identity
  const [architectName, setArchitectName] = useState("Ittirit Saengow")
  const [architectHandle, setArchitectHandle] = useState("@slumdog_arch")
  const [workspaceId, setWorkspaceId] = useState("ws-delentia-prod-001")

  // 2. FDIA Autonomy Mode
  const [autonomyLevel, setAutonomyLevel] = useState<"strict" | "balanced" | "autonomous">("balanced")
  const [architectMultiplier, setArchitectMultiplier] = useState(0.90)
  const [minThresholdF, setMinThresholdF] = useState(0.70)
  const [enableCordScanner, setEnableCordScanner] = useState(true)

  // 3. Capability Scopes
  const [allowFileRead, setAllowFileRead] = useState(true)
  const [allowFileWrite, setAllowFileWrite] = useState(true)
  const [allowTerminalExec, setAllowTerminalExec] = useState(true)
  const [requireTerminalConfirm, setRequireTerminalConfirm] = useState(true)
  const [allowNetEgress, setAllowNetEgress] = useState(true)

  // 4. Custom Invariants
  const [invariants, setInvariants] = useState<string[]>([
    "Immutable Zero-Delete: No agent shall permanently delete database records.",
    "Cryptographic Verification: All architectural outputs must be signed via ED25519.",
    "Strict Clean Typography: Never output raw unrendered LaTeX math dollar signs ($).",
  ])
  const [newInvariant, setNewInvariant] = useState("")

  // 5. General Settings
  const [locale, setLocale] = useState<"en" | "th">(isThai ? "th" : "en")
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleAddInvariant = () => {
    if (newInvariant.trim()) {
      setInvariants([...invariants, newInvariant.trim()])
      setNewInvariant("")
    }
  }

  const handleRemoveInvariant = (idx: number) => {
    setInvariants(invariants.filter((_, i) => i !== idx))
  }

  const generatedYaml = `# ═══════════════════════════════════════════════════════════════════════════════
# DELENTIA OS — ARCHITECT GOVERNANCE & FDIA SCOPE CONFIGURATION
# Generated dynamically for: ${architectHandle} (${architectName})
# ═══════════════════════════════════════════════════════════════════════════════

schema_version: "2.1.0"
project:
  workspace_id: "${workspaceId}"
  environment: "production"

architect:
  handle: "${architectHandle}"
  name: "${architectName}"
  signature_algorithm: "ED25519"

governance:
  autonomy_level: "${autonomyLevel}"
  architect_multiplier: ${architectMultiplier.toFixed(2)}
  min_f_threshold: ${minThresholdF.toFixed(2)}
  cord_security:
    enabled: ${enableCordScanner}
    auto_veto_on_jailbreak: true
    auto_veto_on_destruction: true

capabilities:
  filesystem:
    allow_read: ${allowFileRead}
    allow_write: ${allowFileWrite}
    allow_delete: false
  terminal:
    allow_execution: ${allowTerminalExec}
    require_confirmation: ${requireTerminalConfirm}
  network:
    allow_egress: ${allowNetEgress}

custom_invariants:
${invariants.map((inv) => `  - "${inv}"`).join("\n")}
`

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(generatedYaml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <div className="flex">
        <StudioSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/40 bg-warm-amber/10 px-3 py-1 font-mono text-xs text-warm-amber mb-3">
              <Shield className="h-3.5 w-3.5" />
              <span>FDIA EQUATION : F = D^I * A GOVERNANCE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Sliders className="w-8 h-8 text-amber-500" />
              {isThai ? "ศูนย์ควบคุมขอบเขตและกฎของสถาปนิก (Architect Governance)" : "Architect Governance & Scope Control Center"}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {isThai
                ? "กำหนดค่าตัวแปร A (Human Architect Multiplier), ขอบเขตสิทธิ์ของ AI Agent และกฎความปลอดภัยเฉพาะตัวของคุณ เพื่อป้องกันไม่ให้ AI ทำงานนอกเหนือขอบเขต"
                : "Configure the 'A' variable (Human Architect Governor), tool capability whitelists, and custom safety invariants to keep autonomous agents strictly within your intended scope."}
            </p>
          </div>

          {/* Section 1: Architect Identity */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-base font-bold text-foreground">
              <User className="h-5 w-5 text-amber-500" />
              <span>{isThai ? "1. ข้อมูลสถาปนิกผู้คุมระบบ (Architect Identity)" : "1. Architect Identity & Workspace"}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">{isThai ? "ชื่อผู้ใช้งาน / องค์กร" : "Architect Name"}</label>
                <input
                  type="text"
                  value={architectName}
                  onChange={(e) => setArchitectName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-sm text-foreground focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">{isThai ? "Handle / Username" : "Architect Handle"}</label>
                <input
                  type="text"
                  value={architectHandle}
                  onChange={(e) => setArchitectHandle(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-sm text-foreground focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">{isThai ? "Workspace ID" : "Workspace ID"}</label>
                <input
                  type="text"
                  value={workspaceId}
                  onChange={(e) => setWorkspaceId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-sm text-foreground focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Section 2: FDIA Autonomy & Veto Sensitivity */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold text-foreground">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span>{isThai ? "2. ระดับความอิสระและค่าตัวคูณความปลอดภัย (A-Multiplier Settings)" : "2. FDIA Autonomy Level & A-Multiplier"}</span>
              </div>
              <div className="font-mono text-xs text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Formula: F = D^I * {architectMultiplier.toFixed(2)}
              </div>
            </div>

            {/* 3 Autonomy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => {
                  setAutonomyLevel("strict")
                  setArchitectMultiplier(0.50)
                  setMinThresholdF(0.85)
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  autonomyLevel === "strict"
                    ? "border-rose-500 bg-rose-500/10 shadow-sm ring-1 ring-rose-500"
                    : "border-border bg-background/60 hover:border-border/80"
                }`}
              >
                <div className="font-bold text-sm text-foreground mb-1">🔒 Level 1: Strict Veto (A = 0.50)</div>
                <div className="text-xs text-muted-foreground">
                  {isThai ? "ต้องขอมนุษย์อนุมัติทุกขั้นตอน เหมาะกับงานระบบการเงินหรือ Production ลับ" : "Requires human confirmation for every action. Best for high-security environments."}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAutonomyLevel("balanced")
                  setArchitectMultiplier(0.90)
                  setMinThresholdF(0.70)
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  autonomyLevel === "balanced"
                    ? "border-amber-500 bg-amber-500/10 shadow-sm ring-1 ring-amber-500"
                    : "border-border bg-background/60 hover:border-border/80"
                }`}
              >
                <div className="font-bold text-sm text-foreground mb-1">⭐ Level 2: Balanced (A = 0.90)</div>
                <div className="text-xs text-muted-foreground">
                  {isThai ? "รันโค้ดและค้นหาข้อมูลอัตโนมัติ สกัดคำสั่งเสี่ยงและถามเมื่อเจอคำสั่งทำลายระบบ" : "Auto-approves verified tasks. Vetoes destructive operations automatically."}
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAutonomyLevel("autonomous")
                  setArchitectMultiplier(1.00)
                  setMinThresholdF(0.60)
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  autonomyLevel === "autonomous"
                    ? "border-emerald-500 bg-emerald-500/10 shadow-sm ring-1 ring-emerald-500"
                    : "border-border bg-background/60 hover:border-border/80"
                }`}
              >
                <div className="font-bold text-sm text-foreground mb-1">⚡ Level 3: Autonomous (A = 1.00)</div>
                <div className="text-xs text-muted-foreground">
                  {isThai ? "ให้อิสระ Agent เต็มพิกัดภายใน Sandbox ปลอดภัย รันงานเร็วสูงสุด" : "Full autonomous execution inside isolated Docker/WASM sandboxes."}
                </div>
              </button>
            </div>

            {/* Live Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>{isThai ? "ปรับแต่งค่าตัวคูณ A ด้วยตนเอง (Custom A Value):" : "Custom Architect Multiplier (A):"}</span>
                <span className="font-bold text-amber-500 text-sm">{architectMultiplier.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="1.00"
                step="0.05"
                value={architectMultiplier}
                onChange={(e) => setArchitectMultiplier(parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </section>

          {/* Section 3: Capability & Tool Scope Whitelist */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-base font-bold text-foreground">
              <Terminal className="h-5 w-5 text-blue-500" />
              <span>{isThai ? "3. ขอบเขตสิทธิ์เครื่องมือที่อนุญาตให้ AI เรียกใช้ (A-Scopes)" : "3. Capability & Tool Scope Whitelisting"}</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-background cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm text-foreground">{isThai ? "สิทธิ์การอ่านไฟล์และตรวจสอบโค้ด (Filesystem Read)" : "Filesystem Read & Code Analysis"}</div>
                  <div className="text-xs text-muted-foreground">{isThai ? "อนุญาตให้อ่านไฟล์ใน Workspace เพื่อทำความเข้าใจโค้ด" : "Allow reading project files for code synthesis"}</div>
                </div>
                <input
                  type="checkbox"
                  checked={allowFileRead}
                  onChange={(e) => setAllowFileRead(e.target.checked)}
                  className="h-5 w-5 rounded border-border accent-amber-400"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-background cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm text-foreground">{isThai ? "สิทธิ์การแก้ไขและสร้างไฟล์โค้ด (Filesystem Write)" : "Filesystem Write & File Creation"}</div>
                  <div className="text-xs text-muted-foreground">{isThai ? "อนุญาตให้ AI แก้ไขบั๊กและเพิ่มฟีเจอร์ลงในไฟล์" : "Allow modifying code and creating new modules"}</div>
                </div>
                <input
                  type="checkbox"
                  checked={allowFileWrite}
                  onChange={(e) => setAllowFileWrite(e.target.checked)}
                  className="h-5 w-5 rounded border-border accent-amber-400"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-background cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm text-foreground">{isThai ? "สิทธิ์การรันคำสั่ง Terminal & Bash (Terminal Execution)" : "Terminal & Command Execution"}</div>
                  <div className="text-xs text-muted-foreground">{isThai ? "อนุญาตให้ AI รันคำสั่ง npm, git, pytest ในเครื่อง" : "Allow running terminal commands in sandbox"}</div>
                </div>
                <input
                  type="checkbox"
                  checked={allowTerminalExec}
                  onChange={(e) => setAllowTerminalExec(e.target.checked)}
                  className="h-5 w-5 rounded border-border accent-amber-400"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-background/50 hover:bg-background cursor-pointer transition-colors">
                <div>
                  <div className="font-semibold text-sm text-foreground">{isThai ? "ขอการยืนยันก่อนรันคำสั่งเสี่ยง (Prompt on Dangerous Bash)" : "Require Confirmation for Critical Commands"}</div>
                  <div className="text-xs text-muted-foreground">{isThai ? "หากมีคำสั่งที่เสี่ยงกระทบระบบ จะหยุดรอให้คุณกดยืนยันก่อนเสมอ" : "Intercept dangerous shell commands before execution"}</div>
                </div>
                <input
                  type="checkbox"
                  checked={requireTerminalConfirm}
                  onChange={(e) => setRequireTerminalConfirm(e.target.checked)}
                  className="h-5 w-5 rounded border-border accent-amber-400"
                />
              </label>
            </div>
          </section>

          {/* Section 4: Custom Architect Invariants */}
          <section className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-bold text-foreground">
                <FileCode className="h-5 w-5 text-purple-500" />
                <span>{isThai ? "4. กฎข้อห้ามเฉพาะโปรเจกต์ของคุณ (Custom Invariants)" : "4. Custom Project Invariants (RCT-Rules)"}</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{invariants.length} rules active</span>
            </div>

            <div className="space-y-2.5">
              {invariants.map((inv, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background font-mono text-xs text-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">#{idx + 1}</span>
                    <span>{inv}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveInvariant(idx)}
                    className="text-neutral-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {/* Add New Rule Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  value={newInvariant}
                  onChange={(e) => setNewInvariant(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddInvariant()
                  }}
                  placeholder={isThai ? "พิมพ์กฎข้อห้ามใหม่ เช่น 'ห้ามแตะไฟล์ .env' หรือ 'ห้ามรันคำสั่งแก้ไข Network'..." : "Type custom invariant e.g. 'Never expose API secrets'..."}
                  className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 font-mono text-xs text-foreground focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddInvariant}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-bold text-foreground transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{isThai ? "เพิ่มกฎ" : "Add Rule"}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Live Generated delentia.config.yaml */}
          <section className="bg-[#0d0e12] border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 font-semibold">
                <FileCode className="h-4 w-4 text-amber-400" />
                <span>delentia.config.yaml (Canonical Project Spec)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyYaml}
                  className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 font-mono text-xs font-semibold text-neutral-200 hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? (isThai ? "คัดลอกแล้ว!" : "Copied!") : (isThai ? "คัดลอก YAML" : "Copy YAML")}</span>
                </button>
              </div>
            </div>

            <pre className="overflow-x-auto p-4 rounded-xl bg-black/70 font-mono text-xs text-emerald-400 leading-relaxed max-h-72 border border-neutral-900">
              <code>{generatedYaml}</code>
            </pre>
          </section>

          {/* Save & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground font-mono">
              {isThai ? "การตั้งค่าทั้งหมดจะถูกซิงก์เข้าสู่ Master Control Plane อัตโนมัติ" : "All governance policies are automatically enforced across all subagents."}
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all shadow-md cursor-pointer ${
                saved
                  ? "bg-emerald-500 text-black shadow-emerald-500/20"
                  : "bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-amber-400/20 active:scale-95"
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saved ? (isThai ? "บันทึกและบังคับใช้กฎสำเร็จ!" : "Governance Policies Saved!") : (isThai ? "บันทึกและบังคับใช้กฎ" : "Save & Enforce Policies")}</span>
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
