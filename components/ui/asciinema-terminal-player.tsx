"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal } from "lucide-react"

interface AsciinemaTerminalPlayerProps {
  className?: string
}

export function AsciinemaTerminalPlayer({ className }: AsciinemaTerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let active = true

    if (!containerRef.current) return

    // Create script tag
    const script = document.createElement("script")
    script.src = "https://asciinema.org/a/a32ejTeEmzl3aMfi.js"
    script.id = "asciicast-a32ejTeEmzl3aMfi"
    script.async = true
    script.dataset.autoplay = "1"
    script.dataset.loop = "1"
    script.dataset.speed = "1.2"
    script.dataset.theme = "monokai"
    script.dataset.cols = "110"
    script.dataset.rows = "35"
    script.dataset.preload = "1"

    script.onload = () => {
      if (active) setIsLoaded(true)
    }
    script.onerror = () => {
      if (active) setIsLoaded(true)
    }

    // Append script to container
    containerRef.current.appendChild(script)

    return () => {
      active = false
      // Cleanup script
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Cleanup injected player elements
      const containerId = "asciicast-container-a32ejTeEmzl3aMfi"
      const injected = document.getElementById(containerId)
      if (injected && injected.parentNode) {
        injected.parentNode.removeChild(injected)
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
      <div className="bg-zinc-950 flex-1 relative min-h-[260px] sm:min-h-[300px] flex flex-col">
        {!isLoaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-3">
            <div className="h-5 w-5 border-2 border-zinc-800 border-t-[#33ff33] rounded-full animate-spin" />
            <span className="text-[10px] uppercase tracking-widest text-[#33ff33]/70">Booting CLI Stream...</span>
          </div>
        ) : null}

        {/* Asciinema Player Script Embed Container */}
        <div
          ref={containerRef}
          className={`w-full h-full text-left transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} [&_.asciicast]:!my-0 [&_.asciicast]:!border-0 [&_iframe]:!my-0 [&_iframe]:!border-0 [&_iframe]:!min-h-[300px] [&_iframe]:!max-h-[400px]`}
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

