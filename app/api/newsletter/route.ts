import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { isPlausibleEmail } from "@/lib/email-valid"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, locale = "en", source = "footer" } = body

    // Validate email input — reject obviously invalid formats
    if (!isPlausibleEmail(email)) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address" }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase()

    // Supabase insert into waitlist table
    // If env vars are missing (e.g. local dev), skip DB and still return success
    try {
      const supabase = getSupabaseAdmin()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("waitlist").upsert(
        { email: sanitizedEmail, locale, source, subscribed_at: new Date().toISOString() },
        { onConflict: "email", ignoreDuplicates: true }
      )
      if (error) {
        // Duplicate email (already subscribed) is not a failure
        if (error.code !== "23505") {
          console.error("Supabase newsletter insert error:", error.message)
        }
      }
    } catch (dbErr) {
      // DB unavailable — log but do not surface to user
      console.error("Supabase unavailable:", dbErr)
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed! We'll keep you updated." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return NextResponse.json({ success: false, error: "An error occurred. Please try again." }, { status: 500 })
  }
}
