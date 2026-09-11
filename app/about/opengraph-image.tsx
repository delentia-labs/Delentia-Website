import { ImageResponse } from "next/og"
import { SITE_ENTERPRISE_EVIDENCE_LABEL, SITE_PUBLIC_SDK_EVIDENCE_LABEL, SITE_PUBLIC_SDK_TESTS, SITE_TEST_COUNT, SITE_HEXACORE_COUNT } from "@/lib/site-config"

export const alt = "About Delentia Labs — Constitutional AI platform with separate public SDK and enterprise evidence lanes"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function AboutOgImage() {
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
        {/* Amber glow */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Sage glow bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,158,135,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Top amber strip */}
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
          {/* Top: Brand */}
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
              <span style={{ fontSize: 26, fontWeight: 800, color: "#0a0a0a" }}>R</span>
            </div>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#d1d5db" }}>Delentia Labs</span>
            <span style={{ color: "#4b5563", fontSize: 22, marginLeft: 6 }}>/ About</span>
          </div>

          {/* Center: Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 880 }}>
            <h1
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#f9fafb",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              The World&apos;s 1st
              <br />
              <span style={{ color: "#f59e0b" }}>Intent-Centric</span> AI OS
            </h1>
            <p
              style={{
                fontSize: 23,
                color: "#9ca3af",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Solo-built from Bangkok · Constitutional AI · Public SDK + Enterprise Snapshot
            </p>
          </div>

          {/* Bottom stats row */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[
              { value: SITE_PUBLIC_SDK_TESTS.toLocaleString(), label: SITE_PUBLIC_SDK_EVIDENCE_LABEL },
              { value: "0.3%", label: "Hallucination Target" },
              { value: String(SITE_HEXACORE_COUNT), label: "HexaCore Models" },
              { value: SITE_TEST_COUNT.toLocaleString(), label: SITE_ENTERPRISE_EVIDENCE_LABEL },
            ].map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b", lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 14, color: "#6b7280" }}>{stat.label}</span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 15, color: "#4b5563", fontStyle: "italic" }}>
              delentia.com/about
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

