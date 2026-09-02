import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Open Graph / social share image for the casting funnel. Rendered by Satori
// from JSX at build time, so it stays in sync with the brand without a binary
// asset to hand-maintain. Echoes the hero lockup.
export const alt =
  "The Documentary Project by Scalp Micro USA — Share Your Story. Transform Your Life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#090909";
const BONE = "#f0ede6";
const ACCENT = "#e8401c";
const MUTED = "#8d8880";
const BORDER = "#2a2a2a";

const fontFile = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules", pkg, "files", file));

export default async function Image() {
  const [syne800, inter600] = await Promise.all([
    fontFile("@fontsource/syne", "syne-latin-800-normal.woff"),
    fontFile("@fontsource/inter", "inter-latin-600-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage:
            "radial-gradient(1100px 620px at 78% 30%, rgba(232,64,28,0.18), rgba(232,64,28,0) 60%)",
          padding: "58px 72px",
          fontFamily: "Inter",
        }}
      >
        {/* Top row — brand + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              color: BONE,
              fontWeight: 600,
            }}
          >
            SCALP MICRO USA®
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: `1px solid ${BORDER}`,
              padding: "10px 18px",
              fontSize: 18,
              letterSpacing: 4,
              color: MUTED,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 8,
                background: ACCENT,
              }}
            />
            NOW CASTING
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 8,
              color: ACCENT,
              fontWeight: 600,
              marginBottom: 26,
            }}
          >
            THE DOCUMENTARY PROJECT
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: 84,
              lineHeight: 0.92,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", color: BONE }}>Share Your</div>
            <div style={{ display: "flex", color: BONE }}>Story.</div>
            <div style={{ display: "flex", color: ACCENT }}>Transform</div>
            <div style={{ display: "flex", color: ACCENT }}>Your Life.</div>
          </div>
        </div>

        {/* Bottom strip — proof points */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            paddingTop: 28,
            borderTop: `1px solid ${BORDER}`,
            fontSize: 20,
            letterSpacing: 3,
            color: MUTED,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>100% SPONSORED SMP</div>
          <div style={{ display: "flex", color: ACCENT }}>•</div>
          <div style={{ display: "flex" }}>DOCUMENTED ON CAMERA</div>
          <div style={{ display: "flex", color: ACCENT }}>•</div>
          <div style={{ display: "flex" }}>APPLY NOW</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Syne", data: syne800, weight: 800, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
      ],
    }
  );
}
