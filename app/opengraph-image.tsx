import { ImageResponse } from "next/og";

export const alt = "Devendra - Full Stack Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#050505",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-150px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.12)",
          }}
        />

        {/* Availability pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <div style={{ fontSize: "22px", color: "#94a3b8" }}>
            Open to work
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "104px",
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-3px",
            lineHeight: 1,
          }}
        >
          Devendra
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: "40px",
            color: "#22d3ee",
            marginTop: "20px",
            letterSpacing: "-1px",
          }}
        >
          Full Stack Developer &amp; AI Engineer
        </div>

        {/* Domains */}
        <div
          style={{
            fontSize: "26px",
            color: "#94a3b8",
            marginTop: "36px",
            lineHeight: 1.4,
          }}
        >
          NLP · Retrieval-Augmented Generation · IoT · Speech AI
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "80px",
            display: "flex",
            gap: "28px",
            fontSize: "22px",
            color: "#64748b",
          }}
        >
          <div>github.com/Devendra673</div>
          <div>Bangalore, India</div>
        </div>
      </div>
    ),
    size
  );
}
