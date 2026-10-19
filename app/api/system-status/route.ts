import { NextResponse } from "next/server"
import {
  SITE_TEST_COUNT,
  SITE_MICROSERVICE_COUNT,
  SITE_ALGORITHM_COUNT,
  SITE_UPTIME,
} from "@/lib/site-config"
import { getServerApiBaseUrl } from "@/lib/api-config"

export const revalidate = 3600

const STATIC_STATUS = {
  testCount: SITE_TEST_COUNT,
  microserviceCount: SITE_MICROSERVICE_COUNT,
  algorithmCount: SITE_ALGORITHM_COUNT,
  uptime: SITE_UPTIME,
  source: "static" as const,
}

export async function GET() {
  try {
    const apiUrl = getServerApiBaseUrl()
    const res = await fetch(`${apiUrl}/rctlabs/system/status`, {
      signal: AbortSignal.timeout(2000),
      headers: { Accept: "application/json" },
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const live = await res.json()
    return NextResponse.json(
      { ...STATIC_STATUS, ...live, source: "live" },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" } },
    )
  } catch {
    return NextResponse.json(STATIC_STATUS, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300" },
    })
  }
}
