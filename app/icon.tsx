import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#FFFFFF",
          border: "2px solid #000000",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3px 4px",
          gap: "1.5px",
          overflow: "hidden",
        }}
      >
        {/* Top layer with eyes */}
        <div
          style={{
            width: "100%",
            height: "7px",
            background: "#76C455",
            borderRadius: "3px 3px 2px 2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <div style={{ width: "3.5px", height: "3.5px", background: "#221F20", borderRadius: "50%" }} />
          <div style={{ width: "3.5px", height: "3.5px", background: "#221F20", borderRadius: "50%" }} />
        </div>
        {/* Middle layer */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "#498F34",
            borderRadius: "2px",
          }}
        />
        {/* Bottom layer */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "#2F5A24",
            borderRadius: "2px",
          }}
        />
      </div>
    ),
    { ...size }
  )
}

