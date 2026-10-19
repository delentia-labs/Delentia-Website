import { NextResponse } from "next/server"
import { getServerApiBaseUrl } from "@/lib/api-config"
import {
  SITE_TEST_COUNT,
  SITE_MICROSERVICE_COUNT,
  SITE_ALGORITHM_COUNT,
  SITE_LAYER_COUNT,
  SITE_UPTIME,
} from "@/lib/site-config"

export const revalidate = 3600 // ISR: cache for 1 hour
const API_URL = getServerApiBaseUrl()

const FALLBACK = {
  testCount: SITE_TEST_COUNT,
  microserviceCount: SITE_MICROSERVICE_COUNT,
  algorithmCount: SITE_ALGORITHM_COUNT,
  layerCount: SITE_LAYER_COUNT,
  uptime: SITE_UPTIME,
  source: "static",
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/rctlabs/system/stats`, {
      signal: AbortSignal.timeout(3000),
      headers: { Accept: "application/json" },
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const data = await res.json()
    return NextResponse.json(
      { ...FALLBACK, ...data, source: "live" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch {
    return NextResponse.json(
      { ...FALLBACK },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  }
}
