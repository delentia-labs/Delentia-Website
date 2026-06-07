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
            <span style={{ color: "#4b5563", fontSize: 22, marginLeft: 6 }}>/ Ecosystem</span>
          </div>

          {/* Center */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 20, color: "#f59e0b", fontWeight: 600 }}>ORBITAL ECOSYSTEM REGISTRY</span>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#f9fafb",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Delentia OS Channel Registry
            </h1>
            <p style={{ fontSize: 20, color: "#9ca3af", margin: 0 }}>
              Discover registered JITNA adapters, memory connectors, and specialist skills.
            </p>
          </div>

          {/* Layers representation */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {["JITNA Core", "Delta Engine", "DelentiaDB", "SignedAI", "Channel Connectors"].map((layer, idx) => (
              <div
                key={layer}
                style={{
                  background: idx === 0 ? "rgba(212,168,83,0.15)" : "rgba(255,255,255,0.03)",
                  border: idx === 0 ? "1px solid #d4a853" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: idx === 0 ? "#f59e0b" : "#d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {layer}
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, color: "#6b7280" }}>10-Layer Constitutional AI Protocol</span>
            <span style={{ fontSize: 16, color: "#f59e0b" }}>delentia.com/ecosystem</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
