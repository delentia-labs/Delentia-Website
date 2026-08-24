"use client"

import { useState, useEffect } from "react"
import { Activity, ShieldAlert, CheckCircle, XCircle, Cpu, Zap, Radio, Lock, Terminal } from "lucide-react"

export default function LiveStreamHudPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [fdiaScore, setFdiaScore] = useState(0.90)
  const [aGate, setAGate] = useState<"1" | "0:HOLD" | "0:VETO">("1")
  const [activeIntent, setActiveIntent] = useState("IDLE")
  const [activeAdapter, setActiveAdapter] = useState("EXECUTOR")
  const [vramUsage, setVramUsage] = useState("3.32 / 4.90 GB")
  const [pendingTicket, setPendingTicket] = useState<{
    ticket_id: string
    action: string
    risk_level: string
    reason: string
  } | null>(null)

  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  useEffect(() => {
    let ws: WebSocket | null = null
    let retryTimer: NodeJS.Timeout

    function connect() {
      try {
        ws = new WebSocket("ws://127.0.0.1:8000/ws/events")

        ws.onopen = () => {
          setIsConnected(true)
        }

        ws.onmessage = (event) => {
          try {
            const packet = JSON.parse(event.data)
            const type = packet.event_type || packet.type
            const data = packet.data || {}
            const intentId = packet.intent_id || "ACTIVE"

            setActiveIntent(intentId.substring(0, 16))

            // Animate layers
            for (let i = 1; i <= 10; i++) {
              setTimeout(() => {
                setActiveLayer(i)
                setTimeout(() => setActiveLayer(null), 300)
              }, i * 50)
            }

            if (type === "APPROVAL_REQUESTED") {
              setPendingTicket({
                ticket_id: data.ticket_id,
                action: data.action || "HIGH_RISK_ACTION",
                risk_level: data.risk_level || "HIGH",
                reason: data.reason || "Constitutional boundary gate"
              })
              setAGate("0:HOLD")
              setFdiaScore(0.00)
            }

            if (type === "APPROVAL_DECIDED") {
              setPendingTicket(null)
              if (data.status === "APPROVED") {
                setAGate("1")
                setFdiaScore(0.90)
              } else {
                setAGate("0:VETO")
                setFdiaScore(0.00)
              }
            }
          } catch (e) {
            console.error("Packet parse error:", e)
          }
        }

        ws.onclose = () => {
          setIsConnected(false)
          retryTimer = setTimeout(connect, 3000)
        }

        ws.onerror = () => {
          ws?.close()
        }
      } catch {
        retryTimer = setTimeout(connect, 3000)
      }
    }

    connect()

    return () => {
      clearTimeout(retryTimer)
      ws?.close()
    }
  }, [])

  const handleDecision = async (decision: "APPROVED" | "REJECTED") => {
    if (!pendingTicket) return
    try {
      await fetch(`http://127.0.0.1:8000/v1/approval/decide?ticket_id=${pendingTicket.ticket_id}&decision=${decision}&approver=ChiefArchitect_WebGUI`, {
        method: "POST"
      })
    } catch (e) {
      console.error("Failed to post decision:", e)
    }
  }

  const layers = [
    { num: 1, name: "RAW" },
    { num: 2, name: "CORD" },
    { num: 3, name: "FDIA" },
    { num: 4, name: "LORA" },
    { num: 5, name: "GRAPH" },
    { num: 6, name: "HEXA" },
    { num: 7, name: "TOON" },
    { num: 8, name: "SIGN" },
    { num: 9, name: "STORE" },
    { num: 10, name: "MCP" }
  ]

  return (
    <div className="w-screen h-screen bg-transparent p-6 font-mono text-white relative select-none overflow-hidden">
      {/* 1. TOP-LEFT HUD */}
      <div className="absolute top-6 left-6 w-[460px] bg-[#0a0f18]/95 border border-cyan-500/40 border-l-4 border-l-orange-500 rounded-lg p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between text-xs text-gray-400 tracking-wider mb-2">
          <span className="font-bold text-orange-500 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> DELENTIA OS v2.2.6
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"}`} />
            {isConnected ? "ONLINE" : "DISCONNECTED"}
          </span>
        </div>

        {/* FDIA Equation Display */}
        <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded px-3 py-2 my-2">
          <div className="text-lg font-bold tracking-widest">
            <span className="text-cyan-400">F</span> = D<sup className="text-orange-400 text-xs">0.95</sup> *{" "}
            <span className={aGate === "1" ? "text-green-400" : aGate === "0:HOLD" ? "text-orange-400 animate-pulse" : "text-red-400"}>
              A[{aGate}]
            </span>
          </div>
          <div className="text-sm font-bold bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded text-cyan-300">
            F = {fdiaScore.toFixed(2)}
          </div>
        </div>

        {/* VRAM & LoRA Bar */}
        <div className="grid grid-cols-2 gap-3 text-xs mt-3">
          <div className="bg-white/5 border border-white/5 rounded p-2">
            <div className="flex justify-between text-gray-400 mb-1">
              <span>VRAM METER</span>
              <span className="text-green-400 font-bold">{vramUsage}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-green-400 h-full w-[68%]" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded p-2">
            <div className="flex justify-between text-gray-400 mb-1">
              <span>ACTIVE ADAPTER</span>
              <span className="text-cyan-400 font-bold">{activeAdapter}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: 10-Layer Visualizer */}
      <div className="absolute top-6 right-6 bg-[#0a0f18]/95 border border-cyan-500/40 rounded-lg p-3 px-4 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between text-xs text-gray-400 tracking-wider mb-2">
          <span>10-LAYER COGNITIVE CORE</span>
          <span className="text-cyan-400 font-bold">{activeIntent}</span>
        </div>
        <div className="flex gap-2">
          {layers.map((l) => (
            <div
              key={l.num}
              className={`w-9 h-8 border rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                activeLayer === l.num
                  ? "bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-[0_0_12px_#00E5FF] scale-110"
                  : "bg-white/5 border-white/10 text-gray-400"
              }`}
            >
              <span>L{l.num}</span>
              <span className="text-[7px] text-gray-500">{l.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. INTERACTIVE HOLD / APPROVAL MODAL */}
      {pendingTicket && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[640px] bg-[#12141e]/98 border-2 border-orange-500 rounded-xl p-5 shadow-[0_0_50px_rgba(255,152,0,0.4)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-orange-400 font-bold text-sm flex items-center gap-2 tracking-wider">
              <ShieldAlert className="w-5 h-5 animate-bounce" /> HUMAN VETO REQUIRED (A = 0 ➔ A = 1)
            </span>
            <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-bold">
              {pendingTicket.risk_level} RISK
            </span>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-lg p-3 text-xs leading-relaxed mb-4 text-gray-300">
            <div><strong>Action:</strong> <span className="text-cyan-300">{pendingTicket.action}</span></div>
            <div><strong>Reason:</strong> <span>{pendingTicket.reason}</span></div>
            <div className="text-[10px] text-gray-500 mt-1">Ticket ID: {pendingTicket.ticket_id}</div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleDecision("REJECTED")}
              className="px-4 py-2 rounded bg-red-500/20 border border-red-500/50 text-red-300 font-bold text-xs hover:bg-red-500/40 transition"
            >
              ✕ REJECT (A = 0)
            </button>
            <button
              onClick={() => handleDecision("APPROVED")}
              className="px-5 py-2 rounded bg-green-500 text-black font-bold text-xs shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:bg-green-400 transition"
            >
              ✓ APPROVE & SIGN (A = 1)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
