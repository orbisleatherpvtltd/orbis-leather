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
          background: "#ffffff",
        }}
      >
        <svg width={132} height={132} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="15.25" fill="none" stroke="#260701" strokeWidth="1.5" />
          <path
            d="M20 8.5v6M20 25.5v6M8.5 20h6M25.5 20h6"
            stroke="#260701"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
          <circle cx="20" cy="20" r="2.25" fill="#532c1e" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
