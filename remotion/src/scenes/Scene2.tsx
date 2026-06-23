import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../theme";
import { display, body, Kicker, useEnter } from "../ui";

const Pill: React.FC<{ label: string; sub: string; delay: number; accent: string; icon: string }> = ({
  label,
  sub,
  delay,
  accent,
  icon,
}) => {
  const s = useEnter(delay, 20);
  return (
    <div
      style={{
        opacity: s,
        transform: `translateX(${interpolate(s, [0, 1], [40, 0])}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: `linear-gradient(180deg, ${COLORS.panel}, #0E2034)`,
        border: `1px solid ${accent}55`,
        borderRadius: 16,
        padding: "20px 26px",
        width: 560,
        boxShadow: "0 18px 44px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          background: `${accent}22`,
          border: `1px solid ${accent}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: accent,
          fontFamily: display,
          fontWeight: 700,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: display, fontWeight: 600, fontSize: 26, color: COLORS.ink }}>{label}</div>
        <div style={{ fontFamily: body, fontSize: 18, color: COLORS.sub }}>{sub}</div>
      </div>
    </div>
  );
};

const Connector: React.FC<{ delay: number }> = ({ delay }) => {
  const s = useEnter(delay, 26);
  return (
    <svg width="120" height="320" viewBox="0 0 120 320" style={{ overflow: "visible" }}>
      {[40, 160, 280].map((y, i) => (
        <path
          key={i}
          d={`M0 160 C 60 160, 60 ${y}, 120 ${y}`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth="3"
          strokeDasharray="400"
          strokeDashoffset={interpolate(s, [0, 1], [400, 0])}
          opacity={0.7}
        />
      ))}
    </svg>
  );
};

export const Scene2: React.FC = () => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 90, left: 160 }}>
        <Kicker delay={0} color={COLORS.primarySoft}>
          The Big Picture
        </Kicker>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {/* Start */}
        <Pill label="CAP Digital Submission" sub="Member submits a digital form" delay={6} accent={COLORS.accent} icon="↦" />
        <Connector delay={16} />
        {/* Three options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <Pill label="Auto Accept — Open Case" sub="Option 1" delay={22} accent={COLORS.green} icon="1" />
          <Pill label="Auto Accept — Closed Case" sub="Option 2" delay={30} accent={COLORS.primarySoft} icon="2" />
          <Pill label="Pending Queue Routing" sub="Option 3" delay={38} accent={COLORS.amber} icon="3" />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 110, fontFamily: body, fontSize: 24, color: COLORS.sub }}>
        Every route ends with a case created in <span style={{ color: COLORS.primary, fontWeight: 600 }}>BEST</span>.
      </div>
    </AbsoluteFill>
  );
};
