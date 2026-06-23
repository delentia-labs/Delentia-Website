import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const { type, table, record, old_record } = payload

    // 1. Validate table and event type
    if (table !== "waitlist_users") {
      return NextResponse.json(
        { success: true, message: `Ignored: Webhook triggered on unsupported table "${table}"` },
        { status: 200 }
      )
    }

    if (type !== "INSERT" && type !== "UPDATE") {
      return NextResponse.json(
        { success: true, message: `Ignored: Unsupported event type "${type}"` },
        { status: 200 }
      )
    }

    // 2. Validate update event transitions (must transition status from Pending to Approved)
    if (type === "UPDATE") {
      if (
        !record ||
        !old_record ||
        record.status !== "Approved" ||
        old_record.status !== "Pending"
      ) {
        return NextResponse.json(
          { success: true, message: "Ignored: UPDATE event is not a waitlist approval transition (Pending -> Approved)" },
          { status: 200 }
        )
      }
    }

    // Validate insert event parameters (must be a valid record)
    if (type === "INSERT" && !record) {
      return NextResponse.json(
        { success: false, error: "Missing record payload for INSERT event" },
        { status: 400 }
      )
    }

    const { email, locale = "en", tier = "Developer" } = record
    const resendApiKey = 
      process.env.RESEND_API_KEY || 
      process.env.resend_api || 
      process.env.RESEND_API || 
      process.env.resend_api_key

    // Compile template based on event type
    const isTh = locale === "th"
    const isEnterprise = tier === "Enterprise"
    let subject = ""
    let htmlContent = ""
    const attachments = []

    if (type === "INSERT") {
      // Draft Welcome Email
      if (isEnterprise) {
        subject = isTh 
          ? "[Delentia OS Enterprise] คำขอสิทธิ์ติดตั้ง Kernel ระดับองค์กรได้รับการบันทึกแล้ว" 
          : "[Delentia OS Enterprise] Your Enterprise Kernel deployment request has been logged"

        htmlContent = isTh 
          ? `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; margin-top: 0;">&gt; DELENTIA OS ENTERPRISE KERNEL DEPLOYMENT REQUEST</h2>
              <p>สวัสดีสถาปนิก,</p>
              
              <div style="background-color: #1a1508; border: 1px solid #d4a853; padding: 15px; border-radius: 6px; margin: 15px 0; color: #fff;">
                <span style="color: #d4a853; font-weight: bold;">[ENTERPRISE PRIORITIZED LANE ACTIVE]</span><br/>
                คำขอนี้ได้รับการจัดลำดับความสำคัญระดับองค์กร (Enterprise Priority) และระบุสภาพแวดล้อมเป้าหมายเป็น: <strong>${record.infrastructure || "Air-Gapped"}</strong>
              </div>

              <p>เจตนาในการติดตั้ง Kernel ของคุณได้รับการลงทะเบียนในระเบียบตรวจสอบเรียบร้อยแล้ว รายละเอียดเบื้องต้นสำหรับองค์กรของคุณคือ:</p>
              
              <table style="border-collapse: collapse; width: 100%; border: 1px solid #1a1a1a; color: #fff; margin: 20px 0; font-family: monospace;">
                <tr style="background-color: #111;">
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">ฟิลด์พารามิเตอร์</th>
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">ค่าที่บันทึกสำเร็จ</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">อีเมล (Identity)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">เจตนา (Primary Intent)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.primary_intent || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">ข้อจำกัดหลัก (Key Constraint)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.key_constraint || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">สภาพแวดล้อม (Infrastructure)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.infrastructure || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">ระดับบัญชี (Assigned Tier)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; color: #d4a853; font-weight: bold;">${tier} (Enterprise Priority)</td>
                </tr>
              </table>

              <p><strong>บันทึกจากผู้สร้าง (Founder's Note):</strong></p>
              <div style="background-color: #111; border: 1px solid #1a1a1a; padding: 20px; border-radius: 6px; color: #e0e0e0; margin: 15px 0; font-style: italic;">
                "ในฐานะ Solo Founder ผมเชื่อว่าโครงสร้างพื้นฐาน AI ขององค์กรไม่ควรถูกจำกัดด้วยข้อบกพร่องเดิมๆ Delentia OS กำลังถูกพัฒนาขึ้นทีละบรรทัดด้วยความใส่ใจและเจตนาที่จะเปลี่ยนขีดจำกัดเดิม การลงทะเบียนของคุณคือกำลังใจและแรงผลักดันที่สำคัญมากในการเดินทางที่ท้าทายนี้"
              </div>

              <p><strong>กระบวนการถัดไป:</strong></p>
              <p>ขณะนี้ระบบปฏิบัติการ Delentia OS อยู่ในช่วงการพัฒนาอย่างเข้มข้น เมื่อการพัฒนาเสร็จสมบูรณ์และระบบพร้อมเปิดใช้งาน คุณจะได้รับอีเมลตอบกลับยืนยันอีกครั้ง พร้อมด้วยใบรหัสผ่านและสิทธิ์เชื่อมต่อผ่าน API Key เฉพาะบุคคลเพื่อเริ่มการติดตั้งระดับองค์กรเป็นกลุ่มแรก</p>
              <p>หากคุณมีความสนใจ มีข้อเสนอแนะ หรือต้องการร่วมงานทางวิศวกรรมสถาปัตยกรรมโดยตรง ผมยินดีที่จะแลกเปลี่ยนความคิดเห็นกับคุณ สามารถติดต่อผมได้ทันทีที่อีเมล <a href="mailto:founder@delentia.com" style="color: #d4a853; text-decoration: underline;">founder@delentia.com</a></p>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                ข้อความนี้ส่งถึงบัญชีองค์กรอย่างเป็นทางการโดย Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `
          : `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; margin-top: 0;">&gt; DELENTIA OS ENTERPRISE KERNEL DEPLOYMENT REQUEST</h2>
              <p>Greetings Architect,</p>
              
              <div style="background-color: #1a1508; border: 1px solid #d4a853; padding: 15px; border-radius: 6px; margin: 15px 0; color: #fff;">
                <span style="color: #d4a853; font-weight: bold;">[ENTERPRISE PRIORITIZED LANE ACTIVE]</span><br/>
                This request has been assigned high-priority Enterprise status. Target Infrastructure: <strong>${record.infrastructure || "Air-Gapped"}</strong>
              </div>

              <p>Your Kernel installation payload has been logged under our validation rules. Here are your details:</p>
              
              <table style="border-collapse: collapse; width: 100%; border: 1px solid #1a1a1a; color: #fff; margin: 20px 0; font-family: monospace;">
                <tr style="background-color: #111;">
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">Parameter Field</th>
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">Logged Value</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Identity (Email)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Primary Intent</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.primary_intent || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Key Constraint</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.key_constraint || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Infrastructure</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.infrastructure || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Assigned Tier</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; color: #d4a853; font-weight: bold;">${tier} (Enterprise Priority)</td>
                </tr>
              </table>

              <p><strong>Founder's Note:</strong></p>
              <div style="background-color: #111; border: 1px solid #1a1a1a; padding: 20px; border-radius: 6px; color: #e0e0e0; margin: 15px 0; font-style: italic;">
                "Building an AI operating system for enterprise environments is a challenging mission, especially as a solo founder. Every line of code in Delentia OS is crafted to push the boundaries of what is possible. Your interest and trust in this vision means everything to me."
              </div>

              <p><strong>Next Steps:</strong></p>
              <p>Delentia OS is currently under active development. Once the system is fully completed and ready for release, you will receive a follow-up confirmation email containing access credentials and a dedicated API Key for enterprise deployment.</p>
              <p>If you are interested in collaborating, sharing feedback, or working directly on the architecture, feel free to reach out to me at <a href="mailto:founder@delentia.com" style="color: #d4a853; text-decoration: underline;">founder@delentia.com</a>.</p>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                This prioritized dispatch was securely logged by Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `;
      } else {
        subject = isTh 
          ? "[Delentia OS] ได้รับคำขอเข้าร่วม Waitlist ของคุณเรียบร้อยแล้ว" 
          : "[Delentia OS] Your Waitlist application has been received"

        htmlContent = isTh 
          ? `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; margin-top: 0;">&gt; DELENTIA OS KERNEL DEPLOYMENT REQUEST</h2>
              <p>สวัสดีสถาปนิก,</p>
              <p>เจตนาในการติดตั้ง Kernel ของคุณได้รับการลงทะเบียนเรียบร้อยแล้ว รายละเอียดการรับสิทธิ์พรีวิวสำหรับนักพัฒนาคือ:</p>
              
              <table style="border-collapse: collapse; width: 100%; border: 1px solid #1a1a1a; color: #fff; margin: 20px 0; font-family: monospace;">
                <tr style="background-color: #111;">
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">ฟิลด์พารามิเตอร์</th>
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">ค่าที่บันทึกสำเร็จ</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">อีเมล (Identity)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">เจตนา (Primary Intent)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.primary_intent || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">ข้อจำกัดหลัก (Key Constraint)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.key_constraint || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">สภาพแวดล้อม (Infrastructure)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.infrastructure || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">ระดับบัญชี (Assigned Tier)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; color: #33ff33; font-weight: bold;">${tier}</td>
                </tr>
              </table>

              <p><strong>บันทึกจากผู้สร้าง (Founder's Note):</strong></p>
              <div style="background-color: #111; border: 1px solid #1a1a1a; padding: 20px; border-radius: 6px; color: #e0e0e0; margin: 15px 0; font-style: italic;">
                "ในฐานะนักพัฒนาอิสระ (Solo Founder) การได้รับความไว้วางใจจากเพื่อนร่วมทางสายเทคโนโลยีคือสิ่งที่มีค่าที่สุด Delentia OS เป็นงานสร้างสรรค์ที่ผมลงมือเขียนด้วยความตั้งใจเพื่อเอาชนะข้อจำกัดเดิมๆ การลงทะเบียนของคุณช่วยยืนยันว่าสิ่งที่ผมกำลังทุ่มเทสร้างอยู่นั้นมีคุณค่า"
              </div>

              <p><strong>กระบวนการถัดไป:</strong></p>
              <p>ขณะนี้ระบบ Delentia OS กำลังพัฒนาและทดสอบอย่างเข้มข้น เมื่อการพัฒนาเสร็จสมบูรณ์และระบบพร้อมสำหรับการเข้าใช้งานจริง คุณจะได้รับการติดต่อกลับโดยเร็วที่สุด พร้อมสิทธิ์การเชื่อมต่อผ่าน API Key เฉพาะบุคคลเพื่อการเข้าใช้งานระบบได้อย่างเต็มประสิทธิภาพ</p>
              <p>หากคุณมีความสนใจ อยากพูดคุยแลกเปลี่ยนเทคโนโลยี หรือต้องการร่วมงานและสนับสนุนโปรเจกต์นี้โดยตรง สามารถติดต่อผมได้ที่อีเมล <a href="mailto:founder@delentia.com" style="color: #d4a853; text-decoration: underline;">founder@delentia.com</a></p>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                ข้อความนี้สร้างและบันทึกอัตโนมัติโดย Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `
          : `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a; max-width: 600px; margin: 0 auto; line-height: 1.6;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; margin-top: 0;">&gt; DELENTIA OS KERNEL DEPLOYMENT REQUEST</h2>
              <p>Greetings Architect,</p>
              <p>Your Kernel installation payload has been logged. Here are your details:</p>
              
              <table style="border-collapse: collapse; width: 100%; border: 1px solid #1a1a1a; color: #fff; margin: 20px 0; font-family: monospace;">
                <tr style="background-color: #111;">
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">Parameter Field</th>
                  <th style="padding: 10px; border: 1px solid #1a1a1a; text-align: left; color: #d4a853;">Logged Value</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Identity (Email)</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Primary Intent</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.primary_intent || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Key Constraint</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.key_constraint || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Infrastructure</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a;">${record.infrastructure || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; font-weight: bold;">Assigned Tier</td>
                  <td style="padding: 10px; border: 1px solid #1a1a1a; color: #33ff33; font-weight: bold;">${tier}</td>
                </tr>
              </table>

              <p><strong>Founder's Note:</strong></p>
              <div style="background-color: #111; border: 1px solid #1a1a1a; padding: 20px; border-radius: 6px; color: #e0e0e0; margin: 15px 0; font-style: italic;">
                "As a solo developer building this project from the ground up, your support and validation keep me going. I am putting my passion and experience into creating Delentia OS to solve real developer pain points. I am thrilled to have you on this journey."
              </div>

              <p><strong>Next Steps:</strong></p>
              <p>Delentia OS is currently in active development. As soon as the system is ready, you will receive a follow-up along with a dedicated API Key for accessing the system.</p>
              <p>If you are interested, would like to collaborate, or just talk tech directly, feel free to reach out to me at <a href="mailto:founder@delentia.com" style="color: #d4a853; text-decoration: underline;">founder@delentia.com</a>.</p>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                This dispatch was securely triggered and validated by Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `;
      }
    } else {
      // Draft Approval Email
      const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase()
      const simulatedKey = `rct-kernel-live-${tier.toUpperCase()}-${randomHex}`

      if (isEnterprise) {
        subject = isTh 
          ? "[Delentia OS Enterprise] อนุมัติสิทธิ์ติดตั้ง Kernel ในระดับองค์กรเรียบร้อยแล้ว" 
          : "[Delentia OS Enterprise] Your Enterprise Kernel access credentials have been unlocked"

        htmlContent = isTh 
          ? `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px;">&gt; DELENTIA OS ENTERPRISE KERNEL DEPLOYMENT COORDINATOR</h2>
              <p>สวัสดีสถาปนิก,</p>
              <p>คำขอดึงไฟล์สิทธิ์ติดตั้ง Kernel ขององค์กรคุณได้รับการยืนยันและตรวจสอบผ่านสมการ FDIA ($F = D^I \\times A$) เรียบร้อยแล้ว สิทธิ์การใช้งานระบบที่ผ่านการอนุมัติ: <strong>Enterprise Tier</strong></p>
              
              <div style="background-color: #111; border: 1px solid #d4a853; padding: 20px; border-radius: 6px; margin: 20px 0; font-family: monospace; border-left: 5px solid #d4a853;">
                <p style="margin: 0; font-weight: bold; color: #d4a853;">[Enterprise Coordinate API Key]</p>
                <p style="margin: 10px 0 15px 0; font-size: 16px; color: #fff;">${simulatedKey}</p>
                
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #d4a853;">[Kubernetes/Helm Deployment Command]</p>
                <pre style="margin: 0; padding: 10px; background-color: #000; border: 1px solid #222; color: #33ff33; overflow-x: auto; font-family: monospace; font-size: 12px;">helm repo add delentia https://charts.delentia.com\nhelm repo update\nhelm install delentia-kernel delentia/kernel \\\n  --set licenseKey="${simulatedKey}" \\\n  --set infrastructure="${record.infrastructure || "Air-Gapped"}"</pre>
              </div>

              <p><strong>ช่องทางบริการสนับสนุนระดับ Enterprise:</strong></p>
              <ul>
                <li>ผู้ประสานงานจัดส่งสิทธิ์: <a href="mailto:founder@delentia.com" style="color: #d4a853;">founder@delentia.com</a></li>
                <li>Discord ห้องประชุมสถาปนิกพาร์ทเนอร์: <a href="https://discord.gg/rctlabs" style="color: #d4a853; text-decoration: underline;">https://discord.gg/rctlabs</a></li>
                <li>เอกสารแนบสถาปัตยกรรม (Technical Whitepaper) และเอกสารสรุป ROI ทางธุรกิจ (Executive Summary) ได้รับการเข้ารหัสความปลอดภัยและแนบมาพร้อมข้อความนี้</li>
              </ul>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                จดหมายลับระดับองค์กรนี้สร้างและยืนยันโดยระบบปฏิบัติการ Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `
          : `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px;">&gt; DELENTIA OS ENTERPRISE KERNEL DEPLOYMENT COORDINATOR</h2>
              <p>Greetings Architect,</p>
              <p>Your enterprise intent payload has successfully passed integration validation under the FDIA equation ($F = D^I \\times A$). Access coordinates are active under: <strong>Enterprise Tier</strong></p>
              
              <div style="background-color: #111; border: 1px solid #d4a853; padding: 20px; border-radius: 6px; margin: 20px 0; font-family: monospace; border-left: 5px solid #d4a853;">
                <p style="margin: 0; font-weight: bold; color: #d4a853;">[Enterprise Coordinate API Key]</p>
                <p style="margin: 10px 0 15px 0; font-size: 16px; color: #fff;">${simulatedKey}</p>
                
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #d4a853;">[Kubernetes/Helm Deployment Command]</p>
                <pre style="margin: 0; padding: 10px; background-color: #000; border: 1px solid #222; color: #33ff33; overflow-x: auto; font-family: monospace; font-size: 12px;">helm repo add delentia https://charts.delentia.com\nhelm repo update\nhelm install delentia-kernel delentia/kernel \\\n  --set licenseKey="${simulatedKey}" \\\n  --set infrastructure="${record.infrastructure || "Air-Gapped"}"</pre>
              </div>

              <p><strong>Enterprise Architecture Support:</strong></p>
              <ul>
                <li>Enterprise Coordinator Dispatch: <a href="mailto:founder@delentia.com" style="color: #d4a853;">founder@delentia.com</a></li>
                <li>Private Architect Slack/Discord Partner Channels: <a href="https://discord.gg/rctlabs" style="color: #d4a853; text-decoration: underline;">https://discord.gg/rctlabs</a></li>
                <li>Both Technical and Executive documents have been generated and attached as verified references.</li>
              </ul>

              <p style="color: #666; font-size: 10px; border-top: 1px solid #1a1a1a; padding-top: 15px; margin-top: 30px;">
                This prioritized enterprise dispatch was securely authorized by Delentia OS — Reverse Component Thinking Engine.
              </p>
            </div>
          `;
      } else {
        subject = isTh 
          ? "ยินดีด้วย! คำขอสิทธิ์การใช้งาน Delentia OS Kernel ได้รับการอนุมัติแล้ว" 
          : "Congratulations! Your Delentia OS Kernel access has been approved"

        htmlContent = isTh 
          ? `
            <div style="font-family: monospace, sans-serif; background-color: #0b0b0b; color: #33ff33; padding: 30px; border-radius: 10px; border: 1px solid #1a1a1a;">
              <h2 style="color: #d4a853; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px;">&gt; DELENTIA OS KERNEL DEPLOYMENT COORDINATOR</h2>
              <p>สวัสดีสถาปนิก,</p>
              <p>เจตนาของคุณได้รับการตรวจสอบความปลอดภัยผ่านสมการ FDIA ($F = D^I \\times A$) เรียบร้อยแล้ว สิทธิ์ของคุณได้รับการอนุมัติในระดับ: <strong>${tier}</strong></p>
              
              <div style="background-color: #111; border: 1px solid #33ff33; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold; color: #d4a853;">[Access Coordinate API Key]</p>
                <p style="margin: 10px 0 0 0; font-size: 16px; color: #fff; font-family: monospace;">${simulatedKey}</p>
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
                <p style="margin: 10px 0 0 0; font-size: 16px; color: #fff; font-family: monospace;">${simulatedKey}</p>
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
          `;
      }

      // Build attachments dynamically based on email domain and locale
      const origin = request.nextUrl.origin || "https://delentia.com"
      const emailDomain = email.includes("@") ? email.split("@")[1].toLowerCase().trim() : ""
      const genericDomains = [
        "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
        "icloud.com", "aol.com", "zoho.com", "mail.com", "protonmail.com",
        "proton.me", "yandex.com", "gmx.com", "mail.ru"
      ]
      const isOrg = (emailDomain && !genericDomains.includes(emailDomain)) || isEnterprise

      const shouldAttachWhitepapers = false // Temporarily taken down by founder request

      if (shouldAttachWhitepapers) {
        if (isTh) {
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
      }
    }

    const emailDraft = {
      from: "Delentia Labs <founder@delentia.com>",
      to: [email],
      subject: subject,
      html: htmlContent,
      attachments: attachments
    }

    // 3. Dry-run simulation mode (when RESEND_API_KEY is missing or if explicitly requested via query)
    const isDryRun = !resendApiKey || request.nextUrl.searchParams.get("dryrun") === "true"

    if (isDryRun) {
      console.warn(`[WARN] Webhook executing in dry-run mode (Resend Key missing: ${!resendApiKey}). Email dispatch simulated.`)
      return NextResponse.json(
        {
          success: true,
          message: `Database Webhook (${type}) processed successfully. Email delivery simulated.`,
          event: type,
          simulated: true,
          emailDraft
        },
        { status: 200 }
      )
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
      { 
        success: true, 
        message: `Approved waitlist email (${type}) sent successfully.`,
        simulated: false,
        emailId: resJson.id
      },
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
