import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export async function GET() {
  const results: Record<string, any> = {}

  try {
    const supabase = getSupabaseAdmin()

    // Test waitlist table
    try {
      const { data, error } = await supabase.from("waitlist" as any).select("*").limit(1)
      results.waitlist = error 
        ? { success: false, code: error.code, message: error.message }
        : { success: true, count: data?.length }
    } catch (e: any) {
      results.waitlist = { success: false, error: e.message }
    }

    // Test waitlist_users table
    try {
      const { data, error } = await supabase.from("waitlist_users" as any).select("*").limit(1)
      results.waitlist_users = error 
        ? { success: false, code: error.code, message: error.message }
        : { success: true, count: data?.length }
    } catch (e: any) {
      results.waitlist_users = { success: false, error: e.message }
    }

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message })
  }

  return NextResponse.json({ success: true, results })
}
