"use server"

import { getSupabaseAdmin } from "@/lib/supabase"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const freeEmailDomains = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
  "aol.com", "icloud.com", "mail.com", "yandex.com", "proton.me", "protonmail.com"
])

export type WaitlistInput = {
  email: string
  primaryIntent: string
  keyConstraint: string
  infrastructure: string
  locale?: string
}

export type WaitlistResult = 
  | { success: true; message: string }
  | { success: false; error: string; errors?: Record<string, string> }

export async function submitWaitlistAction(input: WaitlistInput): Promise<WaitlistResult> {
  try {
    const { email, primaryIntent, keyConstraint, infrastructure, locale = "en" } = input

    // 1. Validation
    if (!email || !emailRegex.test(email.trim())) {
      return { 
        success: false, 
        error: locale === "th" 
          ? "กรุณากรอกที่อยู่อีเมลที่ถูกต้อง" 
          : "Please enter a valid email address." 
      }
    }

    const domain = email.split("@")[1]?.toLowerCase().trim()
    if (!domain) {
      return { 
        success: false, 
        error: locale === "th" 
          ? "ไม่สามารถวิเคราะห์โดเมนของอีเมลได้" 
          : "Could not parse email domain." 
      }
    }

    if (!primaryIntent || primaryIntent.trim().length < 5) {
      return {
        success: false,
        error: locale === "th"
          ? "กรุณากรอกเจตจำนงของคุณให้ละเอียดอย่างน้อย 5 ตัวอักษร"
          : "Please describe your primary intent in at least 5 characters."
      }
    }

    const validConstraints = ["PDPA", "Hallucination", "Local-AI", "Cost"]
    if (!keyConstraint || !validConstraints.includes(keyConstraint)) {
      return { success: false, error: "Invalid constraint choice." }
    }

    const validInfra = ["Docker", "Kubernetes", "Air-Gapped"]
    if (!infrastructure || !validInfra.includes(infrastructure)) {
      return { success: false, error: "Invalid infrastructure choice." }
    }

    const sanitizedEmail = email.trim().toLowerCase()
    
    // Determine tier based on domain, infrastructure and constraint
    // Free email domains are always routed to Developer tier.
    // Corporate domains are routed to Enterprise tier if they choose Air-Gapped infrastructure or PDPA key constraint.
    const isFreeEmail = freeEmailDomains.has(domain)
    const tier = isFreeEmail 
      ? "Developer" 
      : ((infrastructure === "Air-Gapped" || keyConstraint === "PDPA") ? "Enterprise" : "Developer")

    // 2. DB Ops via Supabase Admin Client
    try {
      const supabase = getSupabaseAdmin()
      const { error } = await (supabase as any).from("waitlist_users").upsert({
        email: sanitizedEmail,
        primary_intent: primaryIntent.trim(),
        key_constraint: keyConstraint,
        infrastructure: infrastructure,
        status: "Pending",
        tier: tier,
        locale: locale,
        created_at: new Date().toISOString()
      }, {
        onConflict: "email"
      })

      if (error) {
        // Handle duplicate email specially if conflict
        if (error.code === "23505") {
          return {
            success: false,
            error: locale === "th"
              ? "อีเมลนี้ได้ลงทะเบียนระบบ Waitlist เรียบร้อยแล้ว"
              : "This email is already registered in the waitlist."
          }
        }
        console.error("Database waitlist registration error:", error)
        throw new Error(error.message)
      }

    } catch (dbErr) {
      console.error("Supabase Admin client connection error:", dbErr)
      // Allow fallback in development if env keys are not present
      if (process.env.NODE_ENV !== "production") {
        return {
          success: true,
          message: locale === "th"
            ? "จำลองผลลัพธ์การพัฒนา (ข้ามฐานข้อมูล): คุณอยู่ในคิวสิทธิ์เข้าใช้งาน Kernel แล้ว"
            : "Local Preview Success (Database bypass): You are in the Kernel queue."
        }
      }
      return {
        success: false,
        error: locale === "th"
          ? "เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล กรุณาลองใหม่อีกครั้ง"
          : "Database connection failed. Please try again later."
      }
    }

    return {
      success: true,
      message: locale === "th"
        ? "ตรวจสอบ FDIA ผ่านแล้ว! คุณอยู่ในคิวสิทธิ์เข้าใช้งาน Kernel แล้ว"
        : "FDIA Check Passed. You are in the Kernel queue."
    }

  } catch (err) {
    const error = err as Error
    console.error("Waitlist submission server action error:", error)
    return {
      success: false,
      error: error.message || "An unexpected error occurred."
    }
  }
}
