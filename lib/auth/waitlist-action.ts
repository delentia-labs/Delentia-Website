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

async function checkGatekeeperWithFallback(intent: string, locale: string): Promise<{ authorized: boolean; reason?: string }> {
  const hostileKeywords = ["hack", "bypass", "override", "steal", "dan", "virus", "แฮ็ค", "โจมตี", "sql", "inject"];
  const intentLower = intent.toLowerCase();
  const hasHostileKeyword = hostileKeywords.some(kw => intentLower.includes(kw));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const response = await fetch("https://delentia-delentia-gatekeeper.hf.space/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [intent]
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.data && Array.isArray(result.data) && result.data.length > 1) {
        try {
          const rctOutput = JSON.parse(result.data[1]);
          if (rctOutput.status === "REJECTED" || (rctOutput.fdia && rctOutput.fdia.A === 0)) {
            return {
              authorized: false,
              reason: locale === "th"
                ? `การตรวจสอบความปลอดภัยล้มเหลว (A=0): ${rctOutput.reason || "เจตนาที่ไม่ได้รับอนุญาต"}`
                : `Security check failed (A=0): ${rctOutput.reason || "Unauthorized intent detected."}`
            };
          }
          return { authorized: true };
        } catch (e) {
          // JSON parsing of rct_output failed, proceed to local check fallback
        }
      }
    }
  } catch (error) {
    console.warn("HF Gatekeeper Space request failed, falling back to local verification:", error);
  }

  // Fallback checking
  if (hasHostileKeyword) {
    return {
      authorized: false,
      reason: locale === "th"
        ? "การตรวจสอบความปลอดภัยล้มเหลว (A=0): ตรวจพบเจตนาที่เป็นภัยคุกคามในระบบเครื่องจำลองความปลอดภัยภายใน"
        : "Security check failed (A=0): Hostile intent detected by local safety gate."
    };
  }

  return { authorized: true };
}

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
          ? "กรุณากรอกเจตนาของคุณให้ละเอียดอย่างน้อย 5 ตัวอักษร"
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

    // 1b. Gatekeeper Cognitive Safety Check (FDIA check A=1)
    const safetyCheck = await checkGatekeeperWithFallback(primaryIntent, locale)
    if (!safetyCheck.authorized) {
      return {
        success: false,
        error: safetyCheck.reason || (locale === "th" ? "เจตนาไม่ผ่านการประเมินความปลอดภัย" : "Security policy violation.")
      }
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

      // Check if email already exists to notify the user
      const { data: existingUser, error: checkError } = await (supabase as any)
        .from("waitlist_users")
        .select("email")
        .eq("email", sanitizedEmail)
        .maybeSingle()

      if (checkError) {
        console.error("Duplicate check query error:", checkError)
      }

      if (existingUser) {
        return {
          success: false,
          error: locale === "th"
            ? "อีเมลนี้ได้ลงทะเบียนระบบ Waitlist เรียบร้อยแล้ว"
            : "This email is already registered in the waitlist."
        }
      }

      const { error } = await (supabase as any).from("waitlist_users").insert({
        email: sanitizedEmail,
        primary_intent: primaryIntent.trim(),
        key_constraint: keyConstraint,
        infrastructure: infrastructure,
        status: "Pending",
        tier: tier,
        locale: locale,
        created_at: new Date().toISOString()
      })

      if (error) {
        // Handle duplicate email specially if conflict (database level fallback)
        if (error.code === "23505" || error.message?.includes("duplicate")) {
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
