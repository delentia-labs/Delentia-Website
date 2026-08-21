"use client"

import { useState } from "react"
import { Radio, ExternalLink, X, Sparkles } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/site-config"

interface LiveStreamTickerProps {
  locale?: "en" | "th"
}

export function LiveStreamTicker({ locale = "en" }: LiveStreamTickerProps) {
  const [visible, setVisible] = useState(true)
  const isThai = locale === "th"

  if (!visible) return null

  return (
    <aside aria-label="Live Stream Status" className="relative z-50 w-full border-b border-red-500/30 bg-black/95 px-4 py-2 text-xs text-white backdrop-blur-md shadow-[0_4px_20px_rgba(239,68,68,0.15)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Side: Live Pulse Badge & Title */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-red-400 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            <span>LIVE NOW</span>
          </div>

          <span className="font-medium text-warm-pale hidden sm:inline">
            {isThai
              ? "🔴 [DAY 01] ปลุกชีพ Delentia OS 700k บรรทัด! แฮกระบบความปลอดภัย 10 เลเยอร์"
              : "🔴 [DAY 01] Building Delentia OS Live: 10-Layer Stack & 1+4 Pillars Bonsai 27B"}
          </span>
        </div>

        {/* Right Side: Streaming Platform Badges */}
        <div className="flex items-center gap-2">
          {/* Kick Badge */}
          <a
            href={SOCIAL_LINKS.kick}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-lg border border-[#53FC18]/40 bg-[#53FC18]/10 px-2.5 py-1 text-[11px] font-semibold text-[#53FC18] transition-all hover:bg-[#53FC18]/25 hover:shadow-[0_0_12px_rgba(83,252,24,0.4)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#53FC18]" />
            <span>Kick</span>
            <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* Twitch Badge */}
          <a
            href={SOCIAL_LINKS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-lg border border-[#9146FF]/40 bg-[#9146FF]/10 px-2.5 py-1 text-[11px] font-semibold text-[#BF94FF] transition-all hover:bg-[#9146FF]/25 hover:shadow-[0_0_12px_rgba(145,70,255,0.4)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#9146FF]" />
            <span>Twitch</span>
            <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* YouTube (Pending approval) */}
          <span
            className="hidden md:flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-warm-dim"
            title="YouTube Live approval in progress"
          >
            <span>YouTube (24h)</span>
          </span>

          {/* Dismiss Button */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close Live Stream Ticker"
            className="ml-1 rounded p-1 text-warm-dim transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
