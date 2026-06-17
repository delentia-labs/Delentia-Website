"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "lucide-react"

interface AsciinemaTerminalPlayerProps {
  className?: string
}

interface AsciinemaPlayerInstance {
  dispose(): void
}

interface AsciinemaPlayerSource {
  url: string
  fetchOpts?: Record<string, unknown>
}

interface CustomWindow extends Window {
  AsciinemaPlayer?: {
    create(
      src: string | AsciinemaPlayerSource,
      container: HTMLDivElement,
      options: Record<string, unknown>
    ): AsciinemaPlayerInstance
  }
}

export function AsciinemaTerminalPlayer({ className }: AsciinemaTerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<AsciinemaPlayerInstance | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    const cssUrl = "/assets/css/asciinema-player.css"
    const jsUrl = "/assets/js/asciinema-player.js"

    // 1. Inject CSS stylesheet if not present
    if (!document.querySelector(`link[href="${cssUrl}"]`)) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = cssUrl
      document.head.appendChild(link)
    }

    // 2. Load JS dynamically
    const initPlayer = () => {
      if (!active || !containerRef.current) return
      
      try {
        const playerModule = (window as CustomWindow).AsciinemaPlayer
        if (playerModule) {
          // Clean up old instance if exists
          if (playerRef.current) {
            try {
              playerRef.current.dispose()
            } catch {
              console.warn("Error disposing player")
            }
          }

          playerRef.current = playerModule.create(
            {
              url: "/assets/casts/dcpm_trace_simulation.cast",
              fetchOpts: {
                credentials: "same-origin"
              }
            },
            containerRef.current,
            {
              autoPlay: true,
              loop: true,
              speed: 1.2,
              theme: "monokai",
              fontSize: "11px",
              fit: "width",
              idleTimeLimit: 2,
              terminalFontFamily: "monospace, Courier New"
            }
          )
          setIsLoaded(true)
        } else {
          throw new Error("AsciinemaPlayer not found on window")
        }
      } catch (err) {
        console.error("Failed to initialize asciinema-player:", err)
        setError(true)
      }
    }

    if ((window as CustomWindow).AsciinemaPlayer) {
      initPlayer()
    } else {
      // Inject Script
      const script = document.createElement("script")
      script.src = jsUrl
      script.async = true
      script.onload = () => {
        initPlayer()
      }
      script.onerror = () => {
        setError(true)
      }
      document.body.appendChild(script)
    }

    return () => {
      active = false
      if (playerRef.current) {
        try {
          playerRef.current.dispose()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  return (
    <div className={`mx-auto w-full max-w-105 sm:max-w-115 lg:ml-auto lg:max-w-121 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col font-mono ${className || ""}`}>
      
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
      <div className="p-3 bg-zinc-950 flex-1 relative min-h-[260px] sm:min-h-[300px]">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 gap-2 p-6 text-center text-xs">
            <span>[ERROR] Failed to load terminal cast renderer.</span>
            <span className="text-[10px] text-zinc-600">Ensure casts/dcpm_trace_simulation.cast is accessible at public folder.</span>
          </div>
        ) : !isLoaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <div className="h-5 w-5 border-2 border-zinc-800 border-t-[#33ff33] rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-widest text-[#33ff33]/70">Booting CLI Stream...</span>
          </div>
        ) : null}

        {/* Player Container */}
        <div 
          ref={containerRef} 
          className={`w-full h-full text-left transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Terminal Footer Info */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 px-4 py-2 text-[10px] text-zinc-600 flex items-center justify-between select-none">
        <div>COLS: 80 | ROWS: 24</div>
        <div className="text-emerald-500 flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
          AUTHENTIC RUNTIME SNAPSHOT
        </div>
      </div>
    </div>
  )
}
