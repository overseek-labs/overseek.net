import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1714",
          borderRadius: 36,
        }}
      >
        <svg
          viewBox="0 0 128 128"
          width="120"
          height="120"
        >
          <path
            d="M64,22c23.2,0,42,18.3,42,42c0,24.2-18.8,43-42,43c-23.2,0-42-18.8-42-43C22,40.3,40.8,22,64,22z M64,100.3c19.3,0,34.9-15.7,34.9-36.3c0-20.1-15.6-35.4-34.9-35.4c-19.3,0-34.9,15.2-34.9,35.4C29.1,84.6,44.7,100.3,64,100.3z"
            fill="#FAFAF8"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
