import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const MODELS_DATA = {
  "delentia-slm-v0.2.8-toon": {
    name: "Delentia SLM (v0.2.8-toon)",
    base: "Llama 3.1 8B",
    scores: {
      jitna: "94.2%",
      fdia: "88.0%",
      halu: "2.1%",
      toon: "92.0%",
      savings: "46.5%"
    }
  },
  "delentia-slm-v0.2.9-toon": {
    name: "Delentia SLM (v0.2.9-toon)",
    base: "Llama 3.1 8B",
    scores: {
      jitna: "94.8%",
      fdia: "89.0%",
      halu: "1.9%",
      toon: "93.0%",
      savings: "47.1%"
    }
  }
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const model = MODELS_DATA[id as keyof typeof MODELS_DATA] || MODELS_DATA["delentia-slm-v0.2.9-toon"]

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
            <span style={{ color: "#4b5563", fontSize: 22, marginLeft: 6 }}>/ Model Card</span>
          </div>

          {/* Center */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{ fontSize: 20, color: "#f59e0b", fontWeight: 600 }}>MODEL SPECIFICATIONS</span>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#f9fafb",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {model.name}
            </h1>
            <p style={{ fontSize: 20, color: "#9ca3af", margin: 0 }}>
              Base: {model.base} · Fine-tuned for JITNA v3 intent routing
            </p>
          </div>

          {/* Bottom */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {Object.entries(model.scores).map(([label, val]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: "#f9fafb", lineHeight: 1 }}>
                  {val}
                </span>
                <span style={{ fontSize: 14, color: "#6b7280", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 16, color: "#f59e0b" }}>huggingface.co/delentia</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
