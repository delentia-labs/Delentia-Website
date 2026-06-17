import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const { type, table, record, old_record } = payload

    // 1. Check if it's a valid waitlist_users status update from Pending to Approved
    if (
      type !== "UPDATE" ||
      table !== "waitlist_users" ||
      !record ||
      !old_record ||
      record.status !== "Approved" ||
      old_record.status !== "Pending"
    ) {
      return NextResponse.json(
        { success: true, message: "Ignored: Not a waitlist status change to Approved" },
        { status: 200 }
      )
    }

    const { email, locale = "en", tier = "Developer" } = record
    const resendApiKey = process.env.RESEND_API_KEY

    // If Resend API Key is missing, run in dry-run simulation mode
    if (!resendApiKey) {
      console.warn("[WARN] RESEND_API_KEY is missing. Skipping email delivery (dry-run mode).")
      return NextResponse.json(
        {
          success: true,
          message: "Database Webhook received. Resend API key is missing, email simulation completed successfully."
        },
        { status: 200 }
      )
    }

    // Generate a simulated unique live key coordinate
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
    const simulatedKey = `rct-kernel-live-${tier.toUpperCase()}-${randomHex}`

    // 2. Draft bilingual HTML email template
    const isTh = locale === "th"
    const subject = isTh 
      ? "ยินดีด้วย! คำขอสิทธิ์การใช้งาน Delentia OS Kernel ได้รับการอนุมัติแล้ว" 
      : "Congratulations! Your Delentia OS Kernel access has been approved"

    const htmlContent = isTh 
      ? `
        <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a;">
          <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px;">&gt; DELENTIA OS KERNEL DEPLOYMENT COORDINATOR</h2>
          <p>สวัสดีสถาปนิก,</p>
          <p>เจตจำนงของคุณได้รับการตรวจสอบความปลอดภัยผ่านสมการ FDIA ($F = D^I \\times A$) เรียบร้อยแล้ว สิทธิ์ของคุณได้รับการอนุมัติในระดับ: <strong>${tier}</strong></p>
          
          <div style="background-color: #111; border: 1px solid #33ff33; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #d4a853;">[Access Coordinate API Key]</p>
            <p style="margin: 10px 0 0 0; font-size: 16px; color: #fff;">${simulatedKey}</p>
          </div>

          <p><strong>ช่องทางติดต่อสำหรับสถาปนิกและผู้พัฒนาหลัก:</strong></p>
          <ul>
            <li>Discord ห้องลับสำหรับสถาปนิก: <a href="https://discord.gg/rctlabs" style="color: #d4a853; text-decoration: underline;">https://discord.gg/rctlabs</a></li>
            <li>เอกสารสถาปัตยกรรมและรายละเอียด TOON Protocol ได้แนบไปพร้อมกับอีเมลฉบับนี้แล้ว</li>
          </ul>

          <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
            ระบบนี้สร้างและคัดกรองอัตโนมัติโดย Delentia OS — Reverse Component Thinking Engine.
          </p>
        </div>
      `
      : `
        <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a;">
          <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px;">&gt; DELENTIA OS KERNEL DEPLOYMENT COORDINATOR</h2>
          <p>Greetings Architect,</p>
          <p>Your intent payload has passed validation under the FDIA equation ($F = D^I \\times A$). Access credentials have been unlocked under tier: <strong>${tier}</strong></p>
          
          <div style="background-color: #111; border: 1px solid #33ff33; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #d4a853;">[Access Coordinate API Key]</p>
            <p style="margin: 10px 0 0 0; font-size: 16px; color: #fff;">${simulatedKey}</p>
          </div>

          <p><strong>Secure Connection Details:</strong></p>
          <ul>
            <li>Private Architect Discord Coordinates: <a href="https://discord.gg/rctlabs" style="color: #d4a853; text-decoration: underline;">https://discord.gg/rctlabs</a></li>
            <li>The Architecture whitepaper describing TOON Protocol has been attached to this dispatch.</li>
          </ul>

          <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
            This dispatch was securely triggered and validated by Delentia OS — Reverse Component Thinking Engine.
          </p>
        </div>
      `

    // 3. Build attachments dynamically based on email domain and locale
    const origin = request.nextUrl.origin || "https://delentia.com"
    const emailDomain = email.includes("@") ? email.split("@")[1].toLowerCase().trim() : ""
    const genericDomains = [
      "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
      "icloud.com", "aol.com", "zoho.com", "mail.com", "protonmail.com",
      "proton.me", "yandex.com", "gmx.com", "mail.ru"
    ]
    const isOrg = emailDomain && !genericDomains.includes(emailDomain)

    const attachments = []
    if (isTh) {
      // General/Gmail gets only technical whitepaper. Org gets both technical and executive summary.
      attachments.push({
        filename: "delentia-technical-whitepaper-th.pdf",
        path: `${origin}/assets/technical-whitepaper-th.pdf`
      })
      if (isOrg) {
        attachments.push({
          filename: "delentia-executive-summary-th.pdf",
          path: `${origin}/assets/whitepaper-th.pdf`
        })
      }
    } else {
      attachments.push({
        filename: "delentia-technical-whitepaper-en.pdf",
        path: `${origin}/assets/technical-whitepaper-en.pdf`
      })
      if (isOrg) {
        attachments.push({
          filename: "delentia-executive-summary-en.pdf",
          path: `${origin}/assets/whitepaper.pdf`
        })
      }
    }

    // 4. Post HTTP request to Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Delentia Labs <founder@delentia.com>",
        to: [email],
        subject: subject,
        html: htmlContent,
        attachments: attachments
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Resend API request failed:", errText)
      throw new Error(`Resend API response error: ${res.status}`)
    }

    const resJson = await res.json()
    console.log("Resend email successfully sent. ID:", resJson.id)

    return NextResponse.json(
      { success: true, message: "Approved waitlist email sent successfully." },
      { status: 200 }
    )

  } catch (error) {
    const err = error as Error
    console.error("Waitlist DB webhook processing error:", err)
    return NextResponse.json(
      { success: false, error: err.message || "An unexpected error occurred during webhook processing" },
      { status: 500 }
    )
  }
}
