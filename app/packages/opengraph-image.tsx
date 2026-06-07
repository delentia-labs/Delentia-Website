import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #1a1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #f59e0b, #d97706)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "48px 64px 44px",
          }}
        >
          {/* Top */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 800, color: "#0a0a0a" }}>D</span>
            </div>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#d1d5db" }}>Delentia OS</span>
            <span style={{ color: "#4b5563", fontSize: 22, marginLeft: 6 }}>/ Packages</span>
          </div>

          {/* Center */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 20, color: "#f59e0b", fontWeight: 600 }}>DEVELOPER SDK & INTERFACE</span>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#f9fafb",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Get Started with Delentia OS
            </h1>
            <p style={{ fontSize: 20, color: "#9ca3af", margin: 0 }}>
              TypeScript edge routing and Python automation packages.
            </p>
          </div>

          {/* Code boxes */}
          <div style={{ display: "flex", gap: 24 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600, textTransform: "uppercase" }}>Python SDK</span>
              <code style={{ fontSize: 20, color: "#f9fafb", fontFamily: "monospace" }}>pip install delentia-os</code>
            </div>

            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600, textTransform: "uppercase" }}>TypeScript SDK</span>
              <code style={{ fontSize: 20, color: "#f9fafb", fontFamily: "monospace" }}>npm i @delentia/delentia-os</code>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Apache 2.0 Open Source License</span>
            <span style={{ fontSize: 16, color: "#f59e0b" }}>delentia.com/packages</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
