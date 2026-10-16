import { NextResponse } from "next/server"

/**
 * Round 81: this endpoint used to return an accuracy of 99.7%, a hallucination rate of 0.3%, a 60% cost saving, a <200 ms latency and
 * radar/bar scores against "single LLM". None of those was ever measured, and the claims were withdrawn (see /corrections).
 * Nothing on the site reads this route any more, so it answers 410 instead of serving numbers again.
 * What has been measured, with its evidence and limits, is on /benchmark.
 */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    {
      status: "withdrawn",
      message: "The figures this endpoint used to serve were not backed by a measurement and have been withdrawn.",
      measured_results: "/benchmark",
      corrections: "/corrections",
    },
    { status: 410, headers: { "Cache-Control": "public, s-maxage=3600" } }
  )
}
