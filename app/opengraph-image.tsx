import { ImageResponse } from "next/og"
import { headers } from "next/headers"

export const alt = "Delentia Labs - Intent Operating System"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OgImage() {
  const headerList = await headers()
  const locale = headerList.get("x-locale") === "th" ? "th" : "en"
  const title = locale === "th" ? "Delentia Labs" : "Delentia Labs"
  const subtitle = locale === "th" ? "ระบบปฏิบัติการ AI ที่เน้น Intent" : "Intent Operating System"
  const tagline = locale === "th"
    ? "โอเพนซอร์ส · ด่านความปลอดภัย · บันทึกตรวจสอบที่ลงนาม"
    : "Open source · Safety gate · Signed audit log"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0D0D 0%, #161210 50%, #1a1510 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Orbital logo mark — mirrors RCTicon.svg structure: outer ring + orbital ellipse + center mark */}
        <div
          style={{
            position: "relative",
            width: 116,
            height: 116,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              width: 116,
              height: 116,
              borderRadius: "50%",
              border: "2.5px solid #D4A953",
              boxShadow: "0 0 40px rgba(212,169,83,0.35), inset 0 0 30px rgba(212,169,83,0.06)",
            }}
          />
          {/* Orbital equatorial ellipse */}
          <div
            style={{
              position: "absolute",
              width: 116,
              height: 46,
              borderRadius: "50%",
              border: "2px solid #D4A953",
              opacity: 0.65,
              transform: "rotate(-18deg)",
            }}
          />
          {/* Secondary tilted ellipse */}
          <div
            style={{
              position: "absolute",
              width: 60,
              height: 116,
              borderRadius: "50%",
              border: "1.5px solid #D4A953",
              opacity: 0.35,
              transform: "rotate(12deg)",
            }}
          />
          {/* Center mark */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#D4A953",
              boxShadow: "0 0 16px rgba(212,169,83,0.6)",
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            color: "#f59e0b",
            margin: "12px 0 0 0",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          {subtitle}
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: 20,
            color: "#94a3b8",
            margin: "24px 0 0 0",
            maxWidth: 700,
            textAlign: "center" as const,
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </p>
      </div>
    ),
    { ...size }
  )
}

