import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Branded text cards stay small (WhatsApp link previews drop large images).
// Fonts are read synchronously at module scope: async fs reads stop prerendering.
const fraunces = readFileSync(join(process.cwd(), "src/assets/fonts/Fraunces-SemiBold.ttf"));
const manrope = readFileSync(join(process.cwd(), "src/assets/fonts/Manrope-SemiBold.ttf"));
const markLight = `data:image/png;base64,${readFileSync(join(process.cwd(), "src/assets/brand/mark-light.png")).toString("base64")}`;

export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const titleSize = title.length > 48 ? 62 : title.length > 30 ? 72 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E3B3A",
          color: "#FCFAF6",
          fontFamily: "Manrope",
          padding: "56px 72px 48px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 110, top: 70, width: 150, height: 150, borderRadius: 999, background: "#E3892B", display: "flex" }} />
        <svg
          style={{ position: "absolute", left: 0, bottom: 0 }}
          width="1200"
          height="250"
          viewBox="0 0 1200 250"
        >
          <path d="M0 250V140l170-90 150 70 210-120 190 100 170-60 310 110v100z" fill="#12504D" />
          <path d="M0 250v-50l230-80 190 60 190-90 200 80 170-50 220 70v60z" fill="#082827" />
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markLight} alt="" width={84} height={58} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Fraunces", fontSize: 32 }}>DEEPAK</span>
            <span style={{ fontSize: 15, letterSpacing: 5, color: "#F3C07E", textTransform: "uppercase" }}>Tour N Travel</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880, marginBottom: 70 }}>
          <span style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#F3C07E" }}>{eyebrow}</span>
          <span style={{ fontFamily: "Fraunces", fontSize: titleSize, lineHeight: 1.05, marginTop: 14 }}>{title}</span>
          {subtitle && (
            <span style={{ fontSize: 27, lineHeight: 1.35, marginTop: 18, color: "rgba(252,250,246,0.85)" }}>{subtitle}</span>
          )}
        </div>

        <div style={{ position: "absolute", left: 72, bottom: 40, display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}>
          <span style={{ background: "#0E7A55", borderRadius: 999, padding: "8px 20px", display: "flex" }}>WhatsApp {site.phone.display}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Manrope", data: manrope, weight: 600, style: "normal" },
      ],
    },
  );
}
