import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1917",
          color: "#fdfaf6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.shortName}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#c9a876",
            letterSpacing: "0.04em",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: "rgba(253, 250, 246, 0.7)",
          }}
        >
          Wholesale &amp; Private Label Leather Manufacturing
        </div>
      </div>
    ),
    { ...size },
  );
}
