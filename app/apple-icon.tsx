import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * Delentia Labs — Apple Touch Icon (180×180)
 * Official Green Character Mark on crisp white rounded badge.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#FFFFFF",
          border: "10px solid #000000",
          borderRadius: 44,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 20px",
          gap: "8px",
          overflow: "hidden",
        }}
      >
        {/* Top green layer with ears and eyes */}
        <div
          style={{
            width: "100%",
            height: "38px",
            background: "#76C455",
            borderRadius: "16px 16px 8px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div style={{ width: "20px", height: "20px", background: "#221F20", borderRadius: "50%" }} />
          <div style={{ width: "20px", height: "20px", background: "#221F20", borderRadius: "50%" }} />
        </div>
        {/* Middle green layer */}
        <div
          style={{
            width: "100%",
            height: "34px",
            background: "#498F34",
            borderRadius: "10px",
          }}
        />
        {/* Bottom green layer */}
        <div
          style={{
            width: "100%",
            height: "34px",
            background: "#2F5A24",
            borderRadius: "10px",
          }}
        />
      </div>
    ),
    { ...size },
  )
}



