"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "lucide-react"

interface AsciinemaTerminalPlayerProps {
  className?: string
}

interface AsciinemaPlayerInstance {
  dispose(): void
}

declare global {
  interface Window {
    AsciinemaPlayer?: {
      create(
        src: string | { url: string; fetchOpts?: Record<string, unknown> },
        container: HTMLDivElement,
        options: Record<string, unknown>
      ): AsciinemaPlayerInstance
    }
  }
}

const CAST_URL = "/assets/casts/dcpm_trace_simulation.cast"
const CSS_URL = "/assets/css/asciinema-player.css"
const JS_URL = "/assets/js/asciinema-player.js"

export function AsciinemaTerminalPlayer({ className }: AsciinemaTerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<AsciinemaPlayerInstance | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    // Inject CSS if not already present
    if (!document.querySelector(`link[href="${CSS_URL}"]`)) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = CSS_URL
      link.onerror = () => console.warn("[asciinema] Failed to load CSS:", CSS_URL)
      document.head.appendChild(link)
    }

    const initPlayer = () => {
      if (!active || !containerRef.current) return

      const playerModule = window.AsciinemaPlayer
      if (!playerModule) {
        setError("AsciinemaPlayer not initialized")
        return
      }

      // Cleanup previous instance
      if (playerRef.current) {
        try { playerRef.current.dispose() } catch { /* ignore */ }
        playerRef.current = null
      }

      try {
        playerRef.current = playerModule.create(
          CAST_URL,
          containerRef.current,
          {
            autoPlay: true,
            loop: true,
            speed: 1.2,
            theme: "monokai",
            fontSize: "small",
            fit: "width",
            idleTimeLimit: 2,
            preload: true,
            startAt: 0,
            cols: 110,
            rows: 35,
            terminalFontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace, 'Courier New'",
          }
        )
        if (active) setIsLoaded(true)
      } catch (err) {
        console.error("[asciinema] Player initialization failed:", err)
        if (active) setError(err instanceof Error ? err.message : "Unknown error")
      }
    }

    // Load or reuse already-loaded script
    if (window.AsciinemaPlayer) {
      initPlayer()
    } else {
      // Check if script tag already exists (loading in progress)
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${JS_URL}"]`)
      if (existing) {
        existing.addEventListener("load", initPlayer, { once: true })
        existing.addEventListener("error", () => {
          if (active) setError("Failed to load asciinema player script")
        }, { once: true })
      } else {
        const script = document.createElement("script")
        script.src = JS_URL
        script.async = true
        script.onload = () => {
          if (active) initPlayer()
        }
        script.onerror = () => {
          console.error("[asciinema] Failed to load:", JS_URL)
          if (active) setError("Failed to load player script")
        }
        document.body.appendChild(script)
      }
    }

    return () => {
      active = false
      if (playerRef.current) {
        try { playerRef.current.dispose() } catch { /* ignore */ }
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div
      className={`mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col font-mono ${className || ""}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 bg-zinc-900/40 px-4 py-2.5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1">
          <Terminal size={11} className="text-zinc-600" />
          dcpm_trace_simulation.cast
        </div>
        <div className="text-[9px] text-[#33ff33] bg-[#33ff33]/10 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold animate-pulse">
          Live Run
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="bg-zinc-950 flex-1 relative min-h-[260px] sm:min-h-[300px]">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 gap-2 p-6 text-center text-xs">
            <span className="text-base">⚠️</span>
            <span>[ERROR] Failed to load terminal cast renderer.</span>
            <span className="text-[10px] text-zinc-600">{error}</span>
          </div>
        ) : !isLoaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <div className="h-5 w-5 border-2 border-zinc-800 border-t-[#33ff33] rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-widest text-[#33ff33]/70">Booting CLI Stream...</span>
          </div>
        ) : null}

        {/* Asciinema Player Container */}
        <div
          ref={containerRef}
          className={`w-full h-full text-left transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 px-4 py-2 text-[10px] text-zinc-600 flex items-center justify-between select-none">
        <div>COLS: 110 | ROWS: 35</div>
        <div className="text-emerald-500 flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
          AUTHENTIC RUNTIME SNAPSHOT
        </div>
      </div>
    </div>
  )
}
