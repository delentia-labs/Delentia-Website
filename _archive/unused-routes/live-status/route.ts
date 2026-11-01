import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 30 // Cache for 30s to keep it snappy without rate limits

export async function GET() {
  const twitchChannel = "slumdog_arch"
  const kickChannel = "slumdog-arch"

  let isLive = false
  let platform: "twitch" | "kick" | null = null
  let title = "Delentia OS Build in Public"
  let uptime = ""

  try {
    // 1. Check Twitch Status & Title via DecAPI (reliable, zero-auth public proxy)
    const [twitchUptimeRes, twitchTitleRes] = await Promise.allSettled([
      fetch(`https://decapi.me/twitch/uptime/${twitchChannel}`, {
        headers: { "User-Agent": "Delentia-Website/1.0" },
        next: { revalidate: 30 },
      }),
      fetch(`https://decapi.me/twitch/title/${twitchChannel}`, {
        headers: { "User-Agent": "Delentia-Website/1.0" },
        next: { revalidate: 30 },
      }),
    ])

    if (twitchTitleRes.status === "fulfilled" && twitchTitleRes.value.ok) {
      const liveTitle = await twitchTitleRes.value.text()
      if (liveTitle && !liveTitle.includes("error") && liveTitle.trim().length > 0) {
        title = liveTitle.trim()
      }
    }

    if (twitchUptimeRes.status === "fulfilled" && twitchUptimeRes.value.ok) {
      const uptimeText = await twitchUptimeRes.value.text()
      if (uptimeText && !uptimeText.toLowerCase().includes("offline") && !uptimeText.toLowerCase().includes("not found")) {
        isLive = true
        platform = "twitch"
        uptime = uptimeText.trim()
      }
    }

    // 2. If not live on Twitch, check Kick Status
    if (!isLive) {
      try {
        const kickRes = await fetch(`https://kick.com/api/v1/channels/${kickChannel}`, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
          next: { revalidate: 30 },
        })
        if (kickRes.ok) {
          const kickData = await kickRes.json()
          if (kickData?.livestream) {
            isLive = true
            platform = "kick"
            if (kickData.livestream.session_title) {
              title = kickData.livestream.session_title
            }
          }
        }
      } catch {
        // Fallback gracefully
      }
    }

    return NextResponse.json({
      isLive,
      platform,
      title,
      uptime,
      channels: {
        twitch: `https://www.twitch.tv/${twitchChannel}`,
        kick: `https://kick.com/${kickChannel}`,
        youtube: "https://www.youtube.com/@Slumdog_Arch",
      },
      checkedAt: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({
      isLive: false,
      platform: null,
      title: "Delentia OS Build in Public",
      uptime: "",
      error: errorMsg,
    })
  }
}
