"use client"

import { useState, useEffect } from "react"
import { ExternalLink, X, Play, Video } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/site-config"

interface LiveStreamTickerProps {
  locale?: "en" | "th"
}

interface StreamStatus {
  isLive: boolean
  platform: "twitch" | "kick" | null
  title: string
  uptime?: string
}

export function LiveStreamTicker({ locale = "en" }: LiveStreamTickerProps) {
  const [visible, setVisible] = useState(true)
  const [status, setStatus] = useState<StreamStatus>({
    isLive: false,
    platform: null,
    title: locale === "th" 
      ? "🔴 [DAY 01] ปลุกชีพ Delentia OS 700k บรรทัด! แฮกระบบความปลอดภัย 10 เลเยอร์"
      : "🔴 [DAY 01] Building Delentia OS Live: 10-Layer Stack & 1+4 Pillars Bonsai 27B",
  })
  const [isLoading, setIsLoading] = useState(true)
  const isThai = locale === "th"

  useEffect(() => {
    let isMounted = true

    async function checkStatus() {
      try {
        const res = await fetch("/api/live-status", { cache: "no-store" })
        if (res.ok) {
          const data: StreamStatus = await res.json()
          if (isMounted) {
            setStatus(data)
            setIsLoading(false)
          }
        }
      } catch {
        if (isMounted) setIsLoading(false)
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 45000) // Re-check every 45s

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  if (!visible) return null

  const isLive = status.isLive
  const activeTitle = status.title

  return (
    <aside
      aria-label="Live Stream Status"
      className={`relative z-50 w-full border-b px-4 py-2 text-xs transition-colors duration-300 backdrop-blur-md ${
        isLive
          ? "border-red-500/40 bg-black/95 text-white shadow-[0_4px_24px_rgba(239,68,68,0.2)]"
          : "border-border/60 bg-[#0d0e12]/95 text-neutral-300 shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left Side: Live Pulse Badge & Dynamic Title */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
          {isLive ? (
            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span>LIVE NOW</span>
            </div>
          ) : (
            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800/80 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-neutral-400">
              <Video className="h-3 w-3 text-neutral-400" />
              <span>{isThai ? "OFFLINE / VOD REPLAY" : "OFFLINE / VOD"}</span>
            </div>
          )}

          <a
            href={status.platform === "kick" ? SOCIAL_LINKS.kick : SOCIAL_LINKS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate font-medium text-neutral-200 hover:text-white hover:underline transition-colors max-w-[280px] sm:max-w-md md:max-w-xl"
            title={activeTitle}
          >
            {activeTitle}
          </a>
        </div>

        {/* Right Side: Streaming Platform Badges */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Kick Badge */}
          <a
            href={SOCIAL_LINKS.kick}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              isLive && status.platform === "kick"
                ? "border-[#53FC18] bg-[#53FC18]/25 text-[#53FC18] shadow-[0_0_14px_rgba(83,252,24,0.5)] ring-1 ring-[#53FC18]"
                : "border-[#53FC18]/40 bg-[#53FC18]/10 text-[#53FC18] hover:bg-[#53FC18]/20"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full bg-[#53FC18] ${isLive && status.platform === "kick" ? "animate-ping" : ""}`} />
            <span>Kick</span>
            <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* Twitch Badge */}
          <a
            href={SOCIAL_LINKS.twitch}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-all ${
              isLive && status.platform === "twitch"
                ? "border-[#9146FF] bg-[#9146FF]/25 text-[#BF94FF] shadow-[0_0_14px_rgba(145,70,255,0.5)] ring-1 ring-[#9146FF]"
                : "border-[#9146FF]/40 bg-[#9146FF]/10 text-[#BF94FF] hover:bg-[#9146FF]/20"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full bg-[#9146FF] ${isLive && status.platform === "twitch" ? "animate-ping" : ""}`} />
            <span>Twitch</span>
            <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
          </a>

          {/* YouTube (Channel Link) */}
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-300 hover:bg-red-500/20 transition-colors"
          >
            <span>YouTube</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>

          {/* Dismiss Button */}
          <button
            onClick={() => setVisible(false)}
            aria-label="Close Live Stream Ticker"
            className="ml-1 rounded p-1 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
