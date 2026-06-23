import { ImageResponse } from "next/og"

export const alt = "RCTDB vs Vector Databases — AI Memory vs Semantic Search | Delentia Labs"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "linear-gradient(90deg, #f59e0b, #d97706)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "48px 64px 44px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#0a0a0a" }}>R</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#d1d5db" }}>Delentia Labs</span>
              <span style={{ color: "#4b5563", fontSize: 20, marginLeft: 4 }}>/ Compare</span>
            </div>
            <div style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid rgba(245,158,11,0.4)", background: "rgba(245,158,11,0.12)", fontSize: 14, fontWeight: 600, color: "#f59e0b", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Comparison Analysis
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
            <h1 style={{ fontSize: 56, fontWeight: 700, color: "#f9fafb", margin: 0, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              RCTDB vs Vector Databases
            </h1>
            <p style={{ fontSize: 24, color: "#9ca3af", margin: 0, lineHeight: 1.5 }}>
              Constitutional AI memory with full audit trail vs embedding-based semantic search — the architectural difference.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, color: "#6b7280" }}>delentia.com/compare</span>
            <span style={{ fontSize: 15, color: "#4b5563", fontStyle: "italic" }}>Evidence-based AI methodology analysis</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

