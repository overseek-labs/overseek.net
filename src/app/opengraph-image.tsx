import { ImageResponse } from "next/og";

export const alt = "Overseek — Engineering That Delivers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1A1714",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <svg viewBox="0 0 128 128" width="56" height="56">
            <path
              d="M64,22c23.2,0,42,18.3,42,42c0,24.2-18.8,43-42,43c-23.2,0-42-18.8-42-43C22,40.3,40.8,22,64,22z M64,100.3c19.3,0,34.9-15.7,34.9-36.3c0-20.1-15.6-35.4-34.9-35.4c-19.3,0-34.9,15.2-34.9,35.4C29.1,84.6,44.7,100.3,64,100.3z"
              fill="#FAFAF8"
            />
          </svg>
          <span style={{ color: "#A8A29E", fontSize: 24, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
            Overseek
          </span>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FAFAF8",
            lineHeight: 1.1,
            maxWidth: 800,
          }}
        >
          Engineering That Delivers
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#A8A29E",
            marginTop: 24,
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          Senior engineers building production-grade infrastructure, AI platforms, and custom software.
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 48,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 32,
          }}
        >
          {["DevOps & Cloud", "AI & Machine Learning", "Custom Software"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#6B4226" }} />
              <span style={{ color: "#6B6560", fontSize: 18 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
